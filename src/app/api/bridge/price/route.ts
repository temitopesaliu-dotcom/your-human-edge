import { NextRequest, NextResponse } from 'next/server';
import { currencyForCountry, nairaEnabled, parseCurrency, vipPrice, type Currency } from '@/lib/bridge/pricing';

/**
 * The Bridge VIP price for this visitor. Nigeria sees naira, the UK sees
 * pounds, everyone else sees dollars. ?currency= overrides it (the page's
 * "Change currency" link). Naira falls back to dollars until Paystack is set up.
 */
export async function GET(req: NextRequest) {
  const country = req.headers.get('x-vercel-ip-country') || '';
  const wanted = parseCurrency(req.nextUrl.searchParams.get('currency')) || currencyForCountry(country);
  const options: Currency[] = nairaEnabled() ? ['NGN', 'GBP', 'USD'] : ['GBP', 'USD'];
  const currency: Currency = options.includes(wanted) ? wanted : 'USD';
  const price = await vipPrice(currency);
  const all = await Promise.all(options.map((c) => vipPrice(c)));
  return NextResponse.json(
    { country, ...price, options: all.map((p) => ({ currency: p.currency, display: p.display })) },
    { headers: { 'Cache-Control': 'private, no-store' } },
  );
}
