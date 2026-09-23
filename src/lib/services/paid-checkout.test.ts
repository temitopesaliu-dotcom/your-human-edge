import { beforeEach, describe, expect, it, vi } from 'vitest';

const retrieve = vi.fn();
vi.mock('@/lib/services/stripe', () => ({
  stripe: { checkout: { sessions: { retrieve: (...a: unknown[]) => retrieve(...a) } } },
}));

import { getPaidCheckout } from './paid-checkout';

const SESSION = `cs_live_${'a'.repeat(58)}`;

describe('getPaidCheckout', () => {
  beforeEach(() => {
    retrieve.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('returns what Stripe actually charged for a paid session', async () => {
    retrieve.mockResolvedValue({ payment_status: 'paid', amount_total: 999, currency: 'gbp' });
    await expect(getPaidCheckout(SESSION)).resolves.toEqual({
      sessionId: SESSION,
      value: 9.99,
      currency: 'GBP',
    });
  });

  it('ignores a direct visit with no session id, without calling Stripe', async () => {
    await expect(getPaidCheckout(undefined)).resolves.toBeNull();
    await expect(getPaidCheckout('not-a-session')).resolves.toBeNull();
    expect(retrieve).not.toHaveBeenCalled();
  });

  it('ignores an unpaid or declined checkout', async () => {
    retrieve.mockResolvedValue({ payment_status: 'unpaid', amount_total: 999, currency: 'usd' });
    await expect(getPaidCheckout(SESSION)).resolves.toBeNull();
  });

  it('returns null rather than crashing the page when Stripe errors', async () => {
    retrieve.mockRejectedValue(new Error('network'));
    await expect(getPaidCheckout(SESSION)).resolves.toBeNull();
  });

  it('records a 100%-discount checkout at its real value of zero', async () => {
    retrieve.mockResolvedValue({ payment_status: 'paid', amount_total: 0, currency: 'usd' });
    await expect(getPaidCheckout(SESSION)).resolves.toMatchObject({ value: 0 });
  });
});
