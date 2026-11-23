import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';

/**
 * The Consistent Execution Room: ongoing monthly alumni membership.
 *
 * Custom route rather than a Payment Link because a Payment Link cannot
 * anchor billing to a calendar day. Every charge lands on the 1st:
 *   - Joining before the 1 Dec 2026 start: nothing today, first charge 1 Dec.
 *   - Joining after that: a prorated charge today for the rest of the month,
 *     then the full amount on the 1st.
 * No end date: the membership runs until the member cancels.
 *
 * USD and GBP are separate fixed prices, no conversion. GBP members are also
 * offered Bacs Direct Debit; if Bacs is not enabled the session falls back to
 * card only.
 */

const LAUNCH_UTC = Date.UTC(2026, 11, 1); // 1 Dec 2026
const MIN_LEAD_MS = 49 * 60 * 60 * 1000; // Stripe needs trial_end 48h+ ahead

const PRICES = {
  usd: { currency: 'usd', amount: 25000, label: '$250' },
  gbp: { currency: 'gbp', amount: 20000, label: '£200' },
} as const;

type CurrencyKey = keyof typeof PRICES;

function nextFirstOfMonthUtc(now: number): number {
  const d = new Date(now);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'cer-checkout'))) {
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
        { error: 'Please accept the membership terms first.' },
        { status: 400 },
      );
    }

    const key: CurrencyKey = body.currency;
    const price = PRICES[key];
    const siteUrl = resolveSiteUrl(req);
    const now = Date.now();
    const acceptedAt = new Date(now).toISOString();
    const beforeLaunch = now < LAUNCH_UTC - MIN_LEAD_MS;

    const timing = beforeLaunch
      ? { trial_end: Math.floor(LAUNCH_UTC / 1000) }
      : {
          billing_cycle_anchor: Math.floor(nextFirstOfMonthUtc(now) / 1000),
          proration_behavior: 'create_prorations' as const,
        };

    const submitMessage = beforeLaunch
      ? `Nothing is charged today. ${price.label} is charged on 1 December 2026 and on the 1st of every month after that, until you cancel. Payments are non-refundable.`
      : `Today you pay for the rest of this month only. After that, ${price.label} is charged on the 1st of every month until you cancel. Payments are non-refundable.`;

    const base = {
      mode: 'subscription' as const,
      adaptive_pricing: { enabled: false },
      billing_address_collection: 'required' as const,
      name_collection: { individual: { enabled: true } },
      metadata: {
        product: 'consistent-execution-room',
        source: 'consistent-execution-room',
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
              name: 'The Consistent Execution Room',
              description:
                'Monthly alumni membership: implementation, accountability, strategic guidance and a community of builders. Billed on the 1st of each month.',
            },
          },
        },
      ],
      subscription_data: {
        ...timing,
        description: 'The Consistent Execution Room: monthly membership',
        metadata: {
          product: 'consistent-execution-room',
          terms_accepted_at: acceptedAt,
        },
      },
      custom_text: { submit: { message: submitMessage } },
      success_url: `${siteUrl}/consistent-execution-room/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/consistent-execution-room#join`,
    };

    const create = (types: Array<'card' | 'bacs_debit'>) =>
      stripe.checkout.sessions.create({ ...base, payment_method_types: types });

    let session;
    if (key === 'gbp') {
      try {
        session = await create(['card', 'bacs_debit']);
      } catch (err) {
        console.warn(
          '[cer-checkout] Bacs unavailable, falling back to card:',
          err instanceof Error ? err.message : String(err),
        );
        session = await create(['card']);
      }
    } else {
      session = await create(['card']);
    }

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a checkout URL.' }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error('[cer-checkout] failed:', err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 });
  }
}
