import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';

/**
 * The Story to Income Blueprint checkout.
 *
 * Low-ticket digital product, sold direct from Instagram with no free
 * lead-magnet step in front of it. The launch experiment is deliberately
 * testing knowledge-to-purchase speed, so the funnel is one page and one
 * checkout.
 *
 * Price is built inline with `price_data` rather than a Payment Link for the
 * same reason as the Business Architect route: the number the page renders
 * and the number Stripe charges both come from PRICE_CENTS below, so they
 * cannot drift apart. When the launch price rises from $9.99 to $27 after the
 * first 10 sales, that is a one-line change here plus the copy on the page.
 * There is deliberately no automatic threshold logic: the price rise is a
 * manual decision, made once the sales count says so, not on a timer.
 *
 * payment_method_types is pinned to ['card'] on purpose: async methods can
 * reach the webhook with payment_status !== 'paid', which would skip
 * fulfilment. See the note in api/stripe-webhook/route.ts.
 */

const PRICE_CENTS = 999;

const PRODUCT = {
  product: 'story-to-income',
  name: 'The Story to Income Blueprint (Using AI)',
  description:
    'A 15-page PDF: four AI prompts for finding your content lane, building your offer, writing awareness stories and writing conversion scripts, plus the comment-to-inbox automation setup, the filming approach and the full tool stack.',
} as const;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'story-to-income-checkout'))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const siteUrl = resolveSiteUrl(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      // Deliberately no allow_promotion_codes. A discount box on a low-ticket
      // impulse buy sends people off to hunt for a code they will not find,
      // and makes the ones without a code feel overcharged. It was switched on
      // only long enough to run a paid end-to-end test, then switched back off.
      // Adaptive Pricing off so a buyer outside the US sees the same number
      // the page showed them, rather than a converted amount carrying
      // Stripe's own conversion fee.
      adaptive_pricing: { enabled: false },
      // metadata.product is what the webhook and the download page both key
      // off. Without it the purchase completes and delivers nothing.
      metadata: {
        product: PRODUCT.product,
        source: 'story-to-income',
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: PRICE_CENTS,
            product_data: {
              name: PRODUCT.name,
              description: PRODUCT.description,
            },
          },
        },
      ],
      success_url: `${siteUrl}/story-to-income/download?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/story-to-income#get-it`,
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
    console.error('[story-to-income/create-checkout] Stripe error:', message);

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
