import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { clean, EMAIL_RE } from '@/lib/bridge/sheet';
import { currencyForCountry, nairaEnabled, parseCurrency, vipPrice, type Currency } from '@/lib/bridge/pricing';
import { initializePaystack } from '@/lib/services/paystack';

/**
 * The Bridge VIP checkout. One button on the page; the currency decides the provider:
 *
 *   NGN  Paystack (card, bank transfer, USSD), price = live rate + ₦200 per dollar
 *   GBP  Stripe, charged in pounds (£47, no conversion)
 *   USD  Stripe, charged in dollars ($57)
 *
 * The browser only sends which currency it is showing. The amount is always
 * worked out here. Stripe: card only, because async methods can reach the
 * webhook unpaid; Adaptive Pricing off so the buyer pays the price shown.
 * metadata.product = 'bridge-vip' is what both webhooks key off.
 */
const DESCRIPTION = 'VIP live Q&A class with Temitope, the replay of the free training, and the prompt pack. One payment, no subscription, non-refundable.';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'bridge-checkout').catch(() => true))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const email = clean(body.email, 200).toLowerCase();
    const name = clean(body.name, 80);
    const sid = clean(body.sid, 40);
    const siteUrl = resolveSiteUrl(req).replace(/\/$/, '');

    let currency: Currency = parseCurrency(body.currency) || currencyForCountry(req.headers.get('x-vercel-ip-country'));
    if (currency === 'NGN' && !nairaEnabled(body.paystack_test === true)) currency = 'USD';
    const price = await vipPrice(currency);

    if (currency === 'NGN') {
      if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'email_required' }, { status: 400 });
      const url = await initializePaystack({
        email,
        amount: price.amountMinor,
        reference: `bvip_${Date.now()}_${randomBytes(4).toString('hex')}`,
        callbackUrl: `${siteUrl}/thebridge-vip-confirmed`,
        metadata: {
          product: 'bridge-vip',
          source: 'bridge',
          bridge_sid: sid,
          name,
          cancel_action: `${siteUrl}/thebridge-registered`,
        },
      });
      return NextResponse.json({ url, currency, display: price.display });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      adaptive_pricing: { enabled: false },
      allow_promotion_codes: true,
      ...(EMAIL_RE.test(email)
        ? { customer_email: email, payment_intent_data: { receipt_email: email } }
        : {}),
      metadata: { product: 'bridge-vip', source: 'bridge', bridge_sid: sid },
      line_items: [{
        quantity: 1,
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: price.amountMinor,
          product_data: { name: 'The Bridge VIP', description: DESCRIPTION },
        },
      }],
      success_url: `${siteUrl}/thebridge-vip-confirmed`,
      cancel_url: `${siteUrl}/thebridge-registered`,
    });
    if (!session.url) return NextResponse.json({ error: 'Stripe did not return a checkout URL.' }, { status: 502 });
    return NextResponse.json({ url: session.url, currency, display: price.display });
  } catch (err) {
    console.error('[bridge/create-checkout] error:', err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: 'Failed to start checkout.' }, { status: 500 });
  }
}
