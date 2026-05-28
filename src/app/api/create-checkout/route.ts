import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ARCHETYPE_SLUGS, type ArchetypeKey } from '@/lib/archetypes';

function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error('STRIPE_SECRET_KEY is not set. Add it to .env.local or Vercel environment variables.');
  }

  return new Stripe(apiKey);
}

function resolveSiteUrl(req: NextRequest): string {
  const origin = req.headers.get('origin');
  if (origin && !/localhost|127\.0\.0\.1/.test(origin)) return origin;

  const forwardedHost = req.headers.get('x-forwarded-host');
  const forwardedProto = req.headers.get('x-forwarded-proto') || 'https';
  if (forwardedHost && !/localhost|127\.0\.0\.1/.test(forwardedHost)) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !/localhost|127\.0\.0\.1/.test(envUrl)) return envUrl;

  if (process.env.NODE_ENV === 'development') return 'http://localhost:3000';
  return 'https://temitopesaliu.vercel.app';
}

// Map full archetype names back to keys (KPI #3 fix)
const NAME_TO_KEY: Record<string, ArchetypeKey> = {
  'The Human Bridge': 'H',
  'Human Bridge': 'H',
  'The Creative Amplifier': 'C',
  'Creative Amplifier': 'C',
  'The Systems Architect': 'S',
  'Systems Architect': 'S',
  'The Growth Catalyst': 'G',
  'Growth Catalyst': 'G',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim();
    const archetypeRaw = (body.archetype || 'H').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    // Normalise archetype — accepts key (H/C/S/G) or full name
    const normalized = (NAME_TO_KEY[archetypeRaw] || archetypeRaw.toUpperCase()) as string;
    const archetypeKey: ArchetypeKey = ['H', 'C', 'S', 'G'].includes(normalized)
      ? (normalized as ArchetypeKey)
      : 'H';

    const siteUrl = resolveSiteUrl(req);
    const stripe = getStripe();

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json(
        { error: 'STRIPE_PRICE_ID is not set.' },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      metadata: {
        archetype: archetypeKey,   // always store SHORT key (H/C/S/G)
        source: 'quiz-funnel',
      },
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // KPI #3: success_url carries short archetype key for correct playbook routing
      success_url: `${siteUrl}/playbook?session_id={CHECKOUT_SESSION_ID}&arch=${archetypeKey}`,
      cancel_url: `${siteUrl}/results/${ARCHETYPE_SLUGS[archetypeKey] || 'human-bridge'}#upgrade`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[create-checkout] Stripe error:', message);

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'production'
            ? 'Failed to create checkout session.'
            : message,
      },
      { status: 500 }
    );
  }
}
