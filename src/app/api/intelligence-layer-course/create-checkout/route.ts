import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';

/**
 * The Expert Framework (self-paced) checkout.
 *
 * The workshop recording, re-sold as a self-study course: same material as
 * the live Intelligence Framework + AI working session, delivered as a private
 * video watched on this site. Delivery is a payment-checked page, not an
 * emailed link: the buyer lands on /expert-framework/access the
 * moment Stripe clears, and the page verifies the session with Stripe
 * server-side before the video player is ever rendered.
 *
 * Price is built inline with `price_data` so the number the page renders and
 * the number Stripe charges both come from PRICE_CENTS below and cannot
 * drift apart (same arrangement as workshop and story-to-income).
 *
 * payment_method_types is pinned to ['card'] on purpose: async methods can
 * reach the webhook with payment_status !== 'paid', which would skip
 * fulfilment. See the note in api/stripe-webhook/route.ts.
 */

export const COURSE_AMOUNT = 15700; // $157.00 USD

/**
 * UTM tags forwarded from the sales page URL, so each sale in Stripe records
 * which email (or post) sent the buyer. Same contract as story-to-income.
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

/**
 * Coupon support.
 *
 * Codes are created in the Stripe Dashboard (Promotion codes), not here, so
 * expiry, redemption caps and percent/amount-off all live in one place. Two
 * ways to apply one:
 *
 *   1. Manual: the session sets allow_promotion_codes, so Stripe Checkout
 *      shows the "Add promotion code" box and the buyer types the code.
 *   2. Pre-applied: a ?coupon=CODE param (email links, stories) is resolved
 *      to its Stripe promotion-code id here and sent as `discounts`, so the
 *      discount is already on the session when the buyer lands. Stripe
 *      forbids combining `discounts` with `allow_promotion_codes`, so a
 *      pre-applied session shows no box — stacking two codes is impossible.
 *
 * Note: this checkout prices with inline price_data, so each session gets an
 * ad-hoc product. Coupons restricted to a specific product will NOT match;
 * create the coupon without product restrictions (or duration-only).
 */
const COUPON_VALUE = /^[A-Za-z0-9][A-Za-z0-9_-]{0,39}$/;

function cleanCoupon(body: unknown): string | undefined {
  if (!body || typeof body !== 'object') return undefined;
  const raw = (body as Record<string, unknown>).coupon;
  if (typeof raw !== 'string') return undefined;
  const v = raw.trim();
  return COUPON_VALUE.test(v) ? v : undefined;
}

/** Resolve a promotion-code string to its Stripe id. A lookup that fails
 *  for any reason (network, unknown code) never blocks checkout — the buyer
 *  just gets the manual box instead of a pre-applied discount. */
async function resolvePromotionCode(code: string): Promise<string | null> {
  try {
    const codes = await stripe.promotionCodes.list({ code, active: true, limit: 1 });
    return codes.data[0]?.id ?? null;
  } catch (err: unknown) {
    console.error(
      '[intelligence-layer-course/create-checkout] promotion code lookup failed:',
      err instanceof Error ? err.message : String(err)
    );
    return null;
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'il-course-checkout'))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const siteUrl = resolveSiteUrl(req);
    const body = await req.json().catch(() => null);
    const utm = cleanUtm(body);
    const coupon = cleanCoupon(body);
    // Carried to the access page so the GA4 purchase event can name the
    // campaign too, not only Stripe.
    const campaignParam = utm.utm_campaign
      ? `&c=${encodeURIComponent(utm.utm_campaign)}`
      : '';

    // Coupon provisioning — exactly one of the two mechanisms, never both
    // (Stripe forbids `discounts` together with `allow_promotion_codes`).
    //   - a ?coupon=CODE that resolves → discounts: pre-applied, no entry box
    //   - otherwise → allow_promotion_codes: Stripe shows the entry box
    // An unknown or expired code falls through to the entry box, so a stale
    // email link degrades to the manual flow instead of blocking checkout.
    const promoCodeId = coupon ? await resolvePromotionCode(coupon) : null;
    const discountParams = promoCodeId
      ? { discounts: [{ promotion_code: promoCodeId }] }
      : { allow_promotion_codes: true };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      // Adaptive Pricing off so a buyer outside the US sees the same $157 the
      // page showed them, rather than a converted amount carrying Stripe's
      // own conversion fee. Same decision as workshop and story-to-income.
      adaptive_pricing: { enabled: false },
      // Exactly one coupon mechanism lands here — see discountParams above.
      ...discountParams,
      // metadata.product is what the webhook and the access page both key
      // off. Without it the purchase completes and delivers nothing.
      metadata: {
        product: 'intelligence-layer-course',
        source: 'intelligence-layer-course',
        ...utm,
        // Record which code was actually applied, for campaign analysis.
        // (Only when pre-applied; manually typed codes are visible in
        // Stripe's own session record.)
        ...(promoCodeId ? { coupon } : {}),
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: COURSE_AMOUNT,
            product_data: {
              name: 'The Expert Framework, Self-Paced',
              description:
                'The full Expert Framework + AI workshop as a private, self-paced video course. Watch on demand, work through the same builds live attendees did, at your own speed.',
            },
          },
        },
      ],
      success_url: `${siteUrl}/expert-framework/access?session_id={CHECKOUT_SESSION_ID}${campaignParam}`,
      cancel_url: `${siteUrl}/expert-framework#get-it`,
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
    console.error('[intelligence-layer-course/create-checkout] Stripe error:', message);

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
