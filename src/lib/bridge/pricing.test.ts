import { describe, it, expect } from 'vitest';
import { createHmac } from 'crypto';
import { currencyForCountry, nairaPrice, parseCurrency, formatPrice } from './pricing';
import { validPaystackSignature, paystackMetadata } from '../services/paystack';

describe('Bridge pricing', () => {
  it('maps countries to the three currencies', () => {
    expect(currencyForCountry('NG')).toBe('NGN');
    expect(currencyForCountry('GB')).toBe('GBP');
    expect(currencyForCountry('JE')).toBe('GBP');
    for (const cc of ['DE', 'CA', 'AU', 'US', '', null]) expect(currencyForCountry(cc)).toBe('USD');
  });
  it('adds ₦200 per dollar and rounds up to the next ₦1,000', () => {
    expect(nairaPrice(1345.49)).toBe(89000); // 57 × 1545.49 = 88,093
    expect(nairaPrice(1800)).toBe(114000); // 57 × 2000 = 114,000 exactly
  });
  it('accepts only NGN, GBP or USD', () => {
    expect(parseCurrency('ngn')).toBe('NGN');
    expect(parseCurrency('CAD')).toBeNull();
    expect(parseCurrency(undefined)).toBeNull();
  });
  it('formats prices', () => {
    expect(formatPrice('NGN', 106000)).toBe('₦106,000');
    expect(formatPrice('GBP', 47)).toBe('£47');
    expect(formatPrice('USD', 57)).toBe('$57');
  });
});

describe('Paystack webhook signature', () => {
  const key = 'sk_test_example';
  const body = '{"event":"charge.success"}';
  const sig = createHmac('sha512', key).update(body).digest('hex');
  it('accepts a correct signature', () => expect(validPaystackSignature(body, sig, key)).toBe(true));
  it('rejects a wrong or missing one', () => {
    expect(validPaystackSignature(body, 'x'.repeat(128), key)).toBe(false);
    expect(validPaystackSignature(body + ' ', sig, key)).toBe(false);
    expect(validPaystackSignature(body, null, key)).toBe(false);
  });
  it('reads metadata as object or string', () => {
    expect(paystackMetadata('{"product":"bridge-vip"}').product).toBe('bridge-vip');
    expect(paystackMetadata({ product: 'bridge-vip' }).product).toBe('bridge-vip');
    expect(paystackMetadata('nope')).toEqual({});
  });
});

describe('naira switch', () => {
  it('needs a live key for real buyers, test key only on request', async () => {
    const { nairaEnabled } = await import('./pricing');
    const old = process.env.PAYSTACK_SECRET_KEY;
    process.env.PAYSTACK_SECRET_KEY = 'sk_test_x';
    expect(nairaEnabled()).toBe(false);
    expect(nairaEnabled(true)).toBe(true);
    process.env.PAYSTACK_SECRET_KEY = 'sk_live_x';
    expect(nairaEnabled()).toBe(true);
    delete process.env.PAYSTACK_SECRET_KEY;
    expect(nairaEnabled(true)).toBe(false);
    if (old !== undefined) process.env.PAYSTACK_SECRET_KEY = old;
  });
});

describe('Selar stopgap', () => {
  it('uses Selar at the fixed price until Paystack is live', async () => {
    const { nairaVia, vipPrice, SELAR_VIP_NGN } = await import('./pricing');
    const old = process.env.PAYSTACK_SECRET_KEY;
    process.env.PAYSTACK_SECRET_KEY = 'sk_test_x';
    expect(nairaVia()).toBe('selar');
    expect((await vipPrice('NGN')).amount).toBe(SELAR_VIP_NGN);
    expect(nairaVia(true)).toBe('paystack');
    process.env.PAYSTACK_SECRET_KEY = 'sk_live_x';
    expect(nairaVia()).toBe('paystack');
    if (old !== undefined) process.env.PAYSTACK_SECRET_KEY = old; else delete process.env.PAYSTACK_SECRET_KEY;
  });
});
