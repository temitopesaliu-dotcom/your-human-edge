import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';

/**
 * Intelligence Layer Workshop checkout.
 *
 * Replaces the hard-coded buy.stripe.com Payment Link, which was created for
 * the old $99 price. Two problems with that arrangement:
 *   1. The page price and the charged price lived in different systems, so a
 *      price change on the page silently disagreed with Stripe.
 *   2. The link's metadata could not be verified from the codebase, and the
 *      webhook keys off metadata.product to add the buyer to MailerLite. Set
 *      here, it cannot be forgotten.
 *
 * The price lives in WORKSHOP_PRICE below — change it here, and the page
 * follows automatically via workshop.data.ts.
 *
 * payment_method_types is pinned to ['card'] on purpose: async methods can
 * reach the webhook with payment_status !== 'paid', which skips fulfilment.
 */

const WORKSHOP_AMOUNT = 15700; // $157.00 USD

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'workshop-checkout'))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const siteUrl = resolveSiteUrl(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      // Adaptive Pricing off: Stripe would otherwise offer a converted local
      // amount carrying its own ~3.75% conversion fee, so a UK buyer sees a
      // different headline number to the one on the page. Everyone now pays
      // the USD price as shown; their bank handles conversion at its own rate.
      adaptive_pricing: { enabled: false },
      // Stripe Checkout collects the email; the webhook reads
      // customer_details.email. No second email field on our side.
      metadata: {
        product: 'intelligence-layer-workshop',
        source: 'workshop-page',
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: WORKSHOP_AMOUNT,
            product_data: {
              name: 'The Intelligence Layer + AI — Live Working Session',
              description:
                '3-hour live working session on Zoom. Your Intelligence Layer mapped live, AI infrastructure built in the session, a 90-day GTM plan, all working templates, and the recording within 72 hours.',
            },
          },
        },
      ],
      success_url: `${siteUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/workshop`,
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
    console.error('[workshop/create-checkout] Stripe error:', message);

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
