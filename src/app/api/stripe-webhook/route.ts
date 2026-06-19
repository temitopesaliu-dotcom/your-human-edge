import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSession, setSession } from '@/lib/kv';
import { addBuyerToMailerLite, addPathsGuideBuyerToMailerLite, addStadiumBuyerToMailerLite } from '@/lib/mailer';
import { type ArchetypeKey } from '@/lib/archetypes';
import { normalizeProduct } from '@/lib/products';
import { stripe } from '@/lib/stripe';

/** Extract archetype from metadata, or fall back to parsing the success_url.
 *  Covers API-created sessions (metadata.archetype) and
 *  Payment Link sessions (arch param in success_url). */
function extractArchetype(session: Stripe.Checkout.Session): ArchetypeKey {
  const fromMeta = session.metadata?.archetype?.toUpperCase();
  if (fromMeta && ['H', 'C', 'S', 'G'].includes(fromMeta)) {
    return fromMeta as ArchetypeKey;
  }
  try {
    const url = new URL(session.success_url ?? '');
    const arch = url.searchParams.get('arch')?.toUpperCase();
    if (arch && ['H', 'C', 'S', 'G'].includes(arch)) {
      return arch as ArchetypeKey;
    }
  } catch { /* malformed URL — fall back to 'H' */ }
  return 'H';
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET is not set.');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let stripeEvent: Stripe.Event;
  try {
    const rawBody = await req.text();
    stripeEvent = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[webhook] Signature failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;

    if (session.payment_status === 'paid') {
      // NOTE: payment_method_types is restricted to ['card'] in
      // create-checkout to prevent async payment methods (bank transfer, etc.)
      // where payment_status may be 'unpaid' at webhook time.
      // If payment methods are ever expanded, add a listener for
      // payment_intent.succeeded as a secondary confirmation event.
      const product = normalizeProduct(session.metadata?.product);
      const archetype = extractArchetype(session);
      const buyerEmail = session.customer_email || session.customer_details?.email || '';
      const buyerName = session.customer_details?.name || '';
      const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
      const siteUrl = (envUrl && !/localhost|127\.0\.0\.1/.test(envUrl)
        ? envUrl
        : 'https://temitopesaliu.com'
        ).replace(/\/$/, '');

      const accessLink = `${siteUrl}/playbook?session_id=${session.id}&arch=${archetype}`;

  // Persist the session record so repeat visits can skip the Stripe API call.
  // This is an optimization, not an access requirement: if KV is unavailable we
  // log and continue, because /api/validate-session falls back to a live Stripe
  // lookup when the record is missing (see purchase-access.ts), so the buyer's
  // access is preserved. Returning 500 here would only burn Stripe's retry
  // budget without changing the outcome.
  try {
    const existing = await getSession(session.id);
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
        product,
        paid: true,
        webhookSource: true,
      });
    }
  } catch (e) {
    console.error('[webhook] KV write failed — continuing (Stripe fallback covers access):', e);
  }
      if (buyerEmail && product === 'playbook') {
        try {
          await addBuyerToMailerLite(buyerEmail, buyerName, archetype, accessLink);
        } catch (err: unknown) {
          console.error('[webhook] addBuyerToMailerLite failed:', err instanceof Error ? err.message : String(err));
        }
      }

      if (buyerEmail && product === 'paths-guide') {
        try {
          await addPathsGuideBuyerToMailerLite(buyerEmail, buyerName);
        } catch (err: unknown) {
          console.error('[webhook] addPathsGuideBuyerToMailerLite failed:', err instanceof Error ? err.message : String(err));
        }
      }

      if (buyerEmail && product === 'stadium-live') {
        try {
          await addStadiumBuyerToMailerLite(buyerEmail, buyerName, 'live-class');
        } catch (err: unknown) {
          console.error('[webhook] addStadiumBuyerToMailerLite (live) failed:', err instanceof Error ? err.message : String(err));
        }
      }

      if (buyerEmail && product === 'stadium-6weeks') {
        try {
          await addStadiumBuyerToMailerLite(buyerEmail, buyerName, '6-weeks');
        } catch (err: unknown) {
          console.error('[webhook] addStadiumBuyerToMailerLite (6-weeks) failed:', err instanceof Error ? err.message : String(err));
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
