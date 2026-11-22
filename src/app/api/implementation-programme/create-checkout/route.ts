import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';

/**
 * Implementation and Accountability Programme: monthly subscription checkout.
 *
 * Why this is a custom route and not a Stripe Payment Link: a Payment Link
 * cannot anchor charges to a calendar date. Here the subscription starts on a
 * trial that ends at FIRST_CHARGE, so the first charge lands on 1 Dec 2026 and
 * every later charge falls on the 1st. The six-charge cap is set by the Stripe
 * webhook (cancel_at), because Checkout cannot set an end date itself.
 *
 * Prices are inline (price_data) so the number on the page and the number
 * charged cannot drift. USD and GBP are separate fixed prices: no conversion.
 *
 * GBP buyers are offered Bacs Direct Debit as well as card. If Bacs is not
 * enabled on the Stripe account the session falls back to card only.
 */

export const FIRST_CHARGE_UTC = Date.UTC(2026, 11, 1, 0, 0, 0); // 1 Dec 2026
// Enrolment closes 48h before the first charge (Stripe needs trial_end to be
// at least 48 hours away). After that a later start would shift the whole
// billing day, so the route refuses rather than guess.
const ENROLMENT_CLOSES_UTC = FIRST_CHARGE_UTC - 49 * 60 * 60 * 1000;

const PRICES = {
  usd: { currency: 'usd', amount: 25000, label: '$250' },
  gbp: { currency: 'gbp', amount: 19000, label: '£190' },
} as const;

type CurrencyKey = keyof typeof PRICES;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'iap-checkout'))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = (await req.json().catch(() => ({}))) as {
      currency?: unknown;
      accepted?: unknown;
    };

    if (body.currency !== 'usd' && body.currency !== 'gbp') {
      return NextResponse.json({ error: 'Choose USD or GBP.' }, { status: 400 });
    }
    if (body.accepted !== true) {
      return NextResponse.json(
        { error: 'Please accept the programme terms first.' },
        { status: 400 },
      );
    }
    if (Date.now() > ENROLMENT_CLOSES_UTC) {
      return NextResponse.json(
        { error: 'Enrolment for the 1 December start has closed. Message Temitope.' },
        { status: 410 },
      );
    }

    const key: CurrencyKey = body.currency;
    const price = PRICES[key];
    const siteUrl = resolveSiteUrl(req);
    const acceptedAt = new Date().toISOString();

    const base = {
      mode: 'subscription' as const,
      adaptive_pricing: { enabled: false },
      billing_address_collection: 'required' as const,
      name_collection: { individual: { enabled: true } },
      metadata: {
        product: 'implementation-programme',
        source: 'implementation-programme',
        currency: key,
        terms_accepted: 'yes',
        terms_accepted_at: acceptedAt,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: price.currency,
            unit_amount: price.amount,
            recurring: { interval: 'month' as const },
            product_data: {
              name: 'Implementation and Accountability Programme',
              description:
                'Six months of weekly accountability and implementation support. Charged on the 1st of each month, 1 December 2026 to 1 May 2027.',
            },
          },
        },
      ],
      subscription_data: {
        trial_end: Math.floor(FIRST_CHARGE_UTC / 1000),
        trial_settings: {
          end_behavior: { missing_payment_method: 'cancel' as const },
        },
        description:
          'Implementation and Accountability Programme: 6 monthly payments',
        metadata: {
          product: 'implementation-programme',
          terms_accepted_at: acceptedAt,
        },
      },
      custom_text: {
        submit: {
          message: `Nothing is charged today. ${price.label} is charged on the 1st of each month from 1 December 2026, six payments in total, then it stops by itself. Payments are non-refundable.`,
        },
      },
      success_url: `${siteUrl}/implementation-programme/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/implementation-programme#pay`,
    };

    const create = (types: Array<'card' | 'bacs_debit'>) =>
      stripe.checkout.sessions.create({ ...base, payment_method_types: types });

    let session;
    if (key === 'gbp') {
      try {
        session = await create(['card', 'bacs_debit']);
      } catch (err) {
        console.warn(
          '[iap-checkout] Bacs unavailable, falling back to card:',
          err instanceof Error ? err.message : String(err),
        );
        session = await create(['card']);
      }
    } else {
      session = await create(['card']);
    }

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a checkout URL.' },
        { status: 502 },
      );
    }
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error('[iap-checkout] failed:', err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 });
  }
}
