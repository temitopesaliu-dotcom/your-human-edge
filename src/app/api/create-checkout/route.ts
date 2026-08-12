import { NextRequest, NextResponse } from 'next/server';
import { ARCHETYPE_SLUGS, type ArchetypeKey } from '@/lib/utils/archetypes';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { isValidEmail } from '@/lib/utils/validation';

/**
 * Live Stripe objects on the Glide Academy account (acct_1OrPJrKaNmUNiD4v) -
 * the account STRIPE_SECRET_KEY belongs to. Prices from the other Glide
 * account will NOT resolve here.
 *   price_1U3QXgKaNmUNiD4vDyhOYwDN  GBP 39.00, tax inclusive
 *   playbook-999                    -GBP 29.01, once, no expiry
 */
const PLAYBOOK_FALLBACK_PRICE_ID = 'price_1U3QXgKaNmUNiD4vDyhOYwDN';
const PLAYBOOK_FALLBACK_COUPON_ID = 'playbook-999';

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

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    // Default: archetype playbook ($9.99 quiz funnel)
    const archetypeRaw = (body.archetype || 'H').trim();
    const normalized = (NAME_TO_KEY[archetypeRaw] || archetypeRaw.toUpperCase()) as string;
    const archetypeKey: ArchetypeKey = ['H', 'C', 'S', 'G'].includes(normalized)
      ? (normalized as ArchetypeKey)
      : 'H';

    // Fall back to the known-good live price so a mis-set env var cannot take
    // checkout down again (STRIPE_PRICE_ID once held a payment-link URL, which
    // Stripe rejected with "No such price").
    const envPriceId = process.env.STRIPE_PRICE_ID;
    const priceId =
      envPriceId && envPriceId.startsWith('price_')
        ? envPriceId
        : PLAYBOOK_FALLBACK_PRICE_ID;

    if (envPriceId && !envPriceId.startsWith('price_')) {
      console.error(
        '[create-checkout] STRIPE_PRICE_ID is not a price id (%s) — using fallback.',
        envPriceId
      );
    }

    // The discount is always applied so the buyer never has to find or type a
    // code, and the page price always matches what Stripe charges.
    const couponId = process.env.STRIPE_PLAYBOOK_COUPON_ID || PLAYBOOK_FALLBACK_COUPON_ID;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      metadata: {
        product: 'playbook',
        archetype: archetypeKey,
        source: 'quiz-funnel',
        pricing: 'standard',
      },
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/playbook?session_id={CHECKOUT_SESSION_ID}&arch=${archetypeKey}`,
      cancel_url: `${siteUrl}/results/${ARCHETYPE_SLUGS[archetypeKey] || 'human-bridge'}#upgrade`,
      discounts: [{ coupon: couponId }],
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

