/**
 * The Bridge VIP price in the three currencies we sell in.
 *
 *   Nigeria          NGN, paid through Paystack
 *   United Kingdom   GBP, paid through Stripe (a fixed £47, no conversion)
 *   Everyone else    USD, paid through Stripe ($57)
 *
 * The naira price is never a straight conversion. It is the live dollar rate
 * plus a cushion of NAIRA_CUSHION_PER_USD (₦200) on every dollar, rounded UP to the
 * next NAIRA_ROUND_TO, so the price always sits above the market rate.
 * The server always works the amount out itself; the browser only says which
 * currency it wants.
 */

export type Currency = 'NGN' | 'GBP' | 'USD';
export const CURRENCIES: Currency[] = ['NGN', 'GBP', 'USD'];

export const VIP_USD = 57;
export const VIP_GBP = 47;
export const NAIRA_CUSHION_PER_USD = 200;
export const NAIRA_ROUND_TO = 1000;
/** Used only when the live rate cannot be fetched. Kept above the market rate. */
export const FALLBACK_USD_NGN = 1450;

/**
 * Stopgap while Paystack approves the account: naira buyers go to the Selar
 * product page at a fixed price. Selar cannot follow the live rate, so this
 * figure is set by hand (live rate + ₦200 per dollar on 1 Nov 2026) and must
 * match the price on Selar. Once a live Paystack key is set, Paystack takes over.
 */
export const SELAR_VIP_URL = 'https://selar.com/158377b383';
export const SELAR_VIP_NGN = 89000;

const RATE_URL = 'https://open.er-api.com/v6/latest/USD';

/** UK and the Crown Dependencies pay in pounds, Nigeria in naira, everyone else in dollars. */
export function currencyForCountry(country: string | null | undefined): Currency {
  const cc = (country || '').toUpperCase();
  if (cc === 'NG') return 'NGN';
  if (['GB', 'UK', 'IM', 'JE', 'GG'].includes(cc)) return 'GBP';
  return 'USD';
}

export function parseCurrency(value: unknown): Currency | null {
  const v = typeof value === 'string' ? value.toUpperCase() : '';
  return (CURRENCIES as string[]).includes(v) ? (v as Currency) : null;
}

/** Live USD to NGN rate, cached for 6 hours. Falls back to FALLBACK_USD_NGN. */
export async function getUsdNgnRate(): Promise<{ rate: number; live: boolean }> {
  try {
    const res = await fetch(RATE_URL, { next: { revalidate: 21600 }, signal: AbortSignal.timeout(5000) });
    const data = (await res.json()) as { result?: string; rates?: Record<string, number> };
    const rate = data?.rates?.NGN;
    if (data?.result === 'success' && typeof rate === 'number' && rate > 300 && rate < 20000) {
      return { rate, live: true };
    }
  } catch {
    // fall through to the fallback rate
  }
  return { rate: FALLBACK_USD_NGN, live: false };
}

/** $57 at (rate + ₦200) naira per dollar, rounded up to the next ₦1,000. */
export function nairaPrice(usdNgnRate: number, usd = VIP_USD): number {
  const raw = usd * (usdNgnRate + NAIRA_CUSHION_PER_USD);
  return Math.ceil(raw / NAIRA_ROUND_TO) * NAIRA_ROUND_TO;
}

export interface VipPrice {
  currency: Currency;
  /** Whole units: naira, pounds or dollars. */
  amount: number;
  /** Smallest unit for the payment provider: kobo, pence or cents. */
  amountMinor: number;
  display: string;
}

export function formatPrice(currency: Currency, amount: number): string {
  const n = amount.toLocaleString('en-GB', { maximumFractionDigits: 0 });
  return currency === 'NGN' ? `₦${n}` : currency === 'GBP' ? `£${n}` : `$${n}`;
}

export async function vipPrice(currency: Currency, testRequested = false): Promise<VipPrice> {
  let amount: number;
  if (currency === 'NGN') amount = nairaVia(testRequested) === 'selar' ? SELAR_VIP_NGN : nairaPrice((await getUsdNgnRate()).rate);
  else if (currency === 'GBP') amount = VIP_GBP;
  else amount = VIP_USD;
  return { currency, amount, amountMinor: Math.round(amount * 100), display: formatPrice(currency, amount) };
}

/**
 * Naira is shown to real buyers only with a LIVE Paystack key (sk_live_...).
 * With a test key (sk_test_...) it appears only when the page is opened with
 * ?paystack_test=1, so the checkout can be tested without any buyer seeing a
 * test-mode payment page.
 */
export function nairaEnabled(testRequested = false): boolean {
  const key = process.env.PAYSTACK_SECRET_KEY || '';
  if (key.startsWith('sk_live_')) return true;
  return testRequested && key.startsWith('sk_test_');
}

/** How naira is taken right now: Paystack when enabled, otherwise the Selar page. */
export function nairaVia(testRequested = false): 'paystack' | 'selar' {
  return nairaEnabled(testRequested) ? 'paystack' : 'selar';
}
