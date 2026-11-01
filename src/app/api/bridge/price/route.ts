import { NextRequest, NextResponse } from 'next/server';
import { currencyForCountry, nairaVia, parseCurrency, vipPrice, type Currency } from '@/lib/bridge/pricing';

/**
 * The Bridge VIP price for this visitor. Nigeria sees naira, the UK sees
 * pounds, everyone else sees dollars. ?currency= overrides it (the page's
 * "Change currency" link). Naira goes to Selar at a fixed price until Paystack is live.
 */
export async function GET(req: NextRequest) {
  const country = req.headers.get('x-vercel-ip-country') || '';
  const wanted = parseCurrency(req.nextUrl.searchParams.get('currency')) || currencyForCountry(country);
  const test = req.nextUrl.searchParams.get('paystack_test') === '1';
  const options: Currency[] = ['NGN', 'GBP', 'USD'];
  const currency: Currency = options.includes(wanted) ? wanted : 'USD';
  const price = await vipPrice(currency, test);
  const all = await Promise.all(options.map((c) => vipPrice(c, test)));
  return NextResponse.json(
    { country, ...price, naira_via: nairaVia(test), options: all.map((p) => ({ currency: p.currency, display: p.display })) },
    { headers: { 'Cache-Control': 'private, no-store' } },
  );
}
