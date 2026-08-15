import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';

/**
 * Business Architect Programme checkout.
 *
 * Deliberately builds the price inline with `price_data` rather than pointing
 * at a hand-made Payment Link. Three reasons:
 *   1. The old Payment Links were created for the previous $997 / $1,497
 *      pricing and live outside this codebase, so the page price and the
 *      charged price could drift apart silently. Here they cannot — the number
 *      the page renders and the number Stripe charges come from TIERS below.
 *   2. `metadata.product` is set here, so it can never be forgotten. The Stripe
 *      webhook keys off exactly this value to add the buyer to the right
 *      MailerLite group, which triggers the paid welcome email.
 *   3. STRIPE_SECRET_KEY belongs to the Glide Academy account, so no separate
 *      dashboard access is needed to change a price — it is a code change.
 *
 * payment_method_types is pinned to ['card'] on purpose: async methods (bank
 * transfer etc.) can arrive at the webhook with payment_status !== 'paid',
 * which would skip fulfilment. See the note in api/stripe-webhook/route.ts.
 */

const TIERS = {
  builder: {
    product: 'bap-builder',
    name: 'The Business Architect Programme — Builder',
    description:
      'Six-week Founding Cohort. All six tracks, live implementation sessions, weekly group Q&A, domain expert guest sessions, template and prompt library, community access, and all session recordings.',
    amount: 59700,
  },
  accelerator: {
    product: 'bap-accelerator',
    name: 'The Business Architect Programme — Accelerator',
    description:
      'Everything in Builder, plus The Builder Seat (a second full seat), two private strategy sessions, a personal proposal and architecture review, and priority 24hr feedback.',
    amount: 99700,
  },
} as const;

type TierKey = keyof typeof TIERS;

function isTierKey(value: unknown): value is TierKey {
  return value === 'builder' || value === 'accelerator';
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'bap-checkout'))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const tierRaw = (body as { tier?: unknown }).tier;

    if (!isTierKey(tierRaw)) {
      return NextResponse.json(
        { error: 'A valid tier is required.' },
        { status: 400 }
      );
    }

    const tier = TIERS[tierRaw];
    const siteUrl = resolveSiteUrl(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      // Email is collected by Stripe Checkout itself, so the buyer is not
      // asked for it twice. The webhook reads customer_details.email.
      metadata: {
        product: tier.product,
        source: 'business-architect-programme',
        tier: tierRaw,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: tier.amount,
            product_data: {
              name: tier.name,
              description: tier.description,
            },
          },
        },
      ],
      success_url: `${siteUrl}/the-business-architect-programme/welcome?session_id={CHECKOUT_SESSION_ID}&tier=${tierRaw}`,
      cancel_url: `${siteUrl}/the-business-architect-programme#pricing`,
      // No promotion codes: the page states plainly that the price never
      // drops, and Track 06 teaches premium pricing. A discount field would
      // contradict both.
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[business-architect/create-checkout] Stripe error:', message);

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'production'
            ? 'Failed to start checkout.'
            : message,
      },
      { status: 500 }
    );
  }
}
