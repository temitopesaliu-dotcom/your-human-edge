import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';

/**
 * The Storytelling to Income checkout.
 *
 * Low-ticket digital product, sold direct from Instagram with no free
 * lead-magnet step in front of it. The launch experiment is deliberately
 * testing knowledge-to-purchase speed, so the funnel is one page and one
 * checkout.
 *
 * Price is built inline with `price_data` rather than a Payment Link for the
 * same reason as the Business Architect route: the number the page renders
 * and the number Stripe charges both come from PRICE_CENTS below, so they
 * cannot drift apart. The page says the launch price is rising to $27, but the
 * price only changes when Temitope says so: a one-line change here plus the
 * copy on the page.
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
  name: 'Storytelling to Income (Using AI)',
  description:
    'A 15-page PDF: four AI prompts for finding your content lane, building your offer, writing awareness stories and writing conversion scripts, plus the comment-to-inbox automation setup, the filming approach and the full tool stack.',
} as const;

/**
 * UTM tags forwarded from the sales page URL, so each sale in Stripe records
 * which email (or post) sent the buyer. Values are lowercased and limited to
 * a short slug so nothing arbitrary from a URL ends up in Stripe metadata.
 */
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;
const UTM_VALUE = /^[a-z0-9][a-z0-9_-]{0,39}$/;

function cleanUtm(body: unknown): Partial<Record<(typeof UTM_KEYS)[number], string>> {
  const out: Partial<Record<(typeof UTM_KEYS)[number], string>> = {};
  if (!body || typeof body !== 'object') return out;
  for (const key of UTM_KEYS) {
    const raw = (body as Record<string, unknown>)[key];
    if (typeof raw !== 'string') continue;
    const v = raw.trim().toLowerCase();
    if (UTM_VALUE.test(v)) out[key] = v;
  }
  return out;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'story-to-income-checkout'))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const siteUrl = resolveSiteUrl(req);
    const utm = cleanUtm(await req.json().catch(() => null));
    // Carried to the download page so the GA4 purchase event can name the
    // campaign too, not only Stripe.
    const campaignParam = utm.utm_campaign
      ? `&c=${encodeURIComponent(utm.utm_campaign)}`
      : '';

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
        ...utm,
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
      success_url: `${siteUrl}/story-to-income/download?session_id={CHECKOUT_SESSION_ID}${campaignParam}`,
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
