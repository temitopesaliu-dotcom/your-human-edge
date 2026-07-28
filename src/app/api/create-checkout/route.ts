import { NextRequest, NextResponse } from 'next/server';
import { ARCHETYPE_SLUGS, type ArchetypeKey } from '@/lib/utils/archetypes';
import { rateLimit, getClientIp } from '@/lib/services/rate-limit';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';

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
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'create-checkout'))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const email = (body.email || '').trim();
    const siteUrl = resolveSiteUrl(req);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    // Default: archetype playbook ($5.99 quiz funnel)
    const archetypeRaw = (body.archetype || 'H').trim();
    const normalized = (NAME_TO_KEY[archetypeRaw] || archetypeRaw.toUpperCase()) as string;
    const archetypeKey: ArchetypeKey = ['H', 'C', 'S', 'G'].includes(normalized)
      ? (normalized as ArchetypeKey)
      : 'H';

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: 'STRIPE_PRICE_ID is not set.' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      metadata: {
        product: 'playbook',
        archetype: archetypeKey,
        source: 'quiz-funnel',
      },
      line_items: [{ price: priceId, quantity: 1 }],
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

