import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { clean, EMAIL_RE } from '@/lib/bridge/sheet';

/**
 * The Bridge VIP: one $57 payment for the live Q&A class after the free training.
 *
 * The price is built inline so the page and the charge cannot drift apart.
 * Card only, because async methods can reach the webhook unpaid and skip
 * fulfilment. Adaptive Pricing is off so everyone pays the USD price shown.
 * metadata.product is what the Stripe webhook keys off.
 */
const VIP_AMOUNT_CENTS = 5700;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'bridge-checkout').catch(() => true))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const email = clean(body.email, 200).toLowerCase();
    const siteUrl = resolveSiteUrl(req).replace(/\/$/, '');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      adaptive_pricing: { enabled: false },
      allow_promotion_codes: true,
      ...(EMAIL_RE.test(email)
        ? { customer_email: email, payment_intent_data: { receipt_email: email } }
        : {}),
      metadata: { product: 'bridge-vip', source: 'bridge', bridge_sid: clean(body.sid, 40) },
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: VIP_AMOUNT_CENTS,
          product_data: {
            name: 'The Bridge VIP',
            description: 'VIP live Q&A class with Temitope, the replay of the free training, and the prompt pack. One payment, no subscription, non-refundable.',
          },
        },
      }],
      success_url: `${siteUrl}/bridge?vip=1#thanks`,
      cancel_url: `${siteUrl}/bridge#thanks`,
    });
    if (!session.url) return NextResponse.json({ error: 'Stripe did not return a checkout URL.' }, { status: 502 });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[bridge/create-checkout] Stripe error:', err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: 'Failed to start checkout.' }, { status: 500 });
  }
}
