import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { setSession } from '@/lib/kv';
import { addBuyerToMailerLite } from '@/lib/mailer';
import { type ArchetypeKey } from '@/lib/archetypes';

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not set.');
  }

  return new Stripe(apiKey);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  let stripeEvent: Stripe.Event;
  try {
    const rawBody = await req.text();
    const stripe = getStripe();
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[webhook] Signature failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;

    if (session.payment_status === 'paid') {
      const archetype = (session.metadata?.archetype || 'H') as ArchetypeKey;
      const buyerEmail = session.customer_email || session.customer_details?.email || '';
      const buyerName = session.customer_details?.name || '';
      const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const siteUrl = envUrl && !/localhost|127\.0\.0\.1/.test(envUrl) ? envUrl : 'https://temitopesaliu.vercel.app';
      const accessLink = `${siteUrl}/playbook?session_id=${session.id}&arch=${archetype}`;

      // Write validated session to KV
      try {
        const existing = await import('@/lib/kv').then(m => m.getSession(session.id));
        if (!existing) {
          await setSession(session.id, {
            createdAt: Date.now(),
            visitCount: 0,
            lastVisit: null,
            firstIP: '',
            lastIP: '',
            email: buyerEmail,
            name: buyerName,
            archetype,
            paid: true,
            webhookSource: true,
          });
        }
      } catch (e) {
        console.error('[webhook] KV write error:', e);
      }

      // Add to MailerLite buyers group — a MailerLite automation
      // triggered on "joins group" sends the purchase confirmation email
      // using {$fields.access_link} as the dynamic playbook URL.
      if (buyerEmail) {
        await addBuyerToMailerLite(buyerEmail, buyerName, archetype, accessLink).catch(() => {});
      }
    }
  }

  return NextResponse.json({ received: true });
}
