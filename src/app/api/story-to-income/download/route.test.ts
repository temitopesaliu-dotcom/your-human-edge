import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const validatePurchaseAccess = vi.fn();
vi.mock('@/lib/services/purchase-access', () => ({
  validatePurchaseAccess: (...args: unknown[]) => validatePurchaseAccess(...args),
}));

const VALID_SESSION = `cs_test_${'a'.repeat(45)}`;

function get(url: string) {
  return import('./route').then((m) => m.GET(new NextRequest(url)));
}

const paid = {
  ok: true as const,
  sessionId: VALID_SESSION,
  product: 'story-to-income' as const,
  archetype: 'H' as const,
  name: 'Buyer',
  email: 'buyer@example.com',
};

describe('GET /api/story-to-income/download', () => {
  beforeEach(() => {
    validatePurchaseAccess.mockReset();
  });

  it('serves the PDF to a verified buyer', async () => {
    validatePurchaseAccess.mockResolvedValue(paid);
    const res = await get(
      `https://x.test/api/story-to-income/download?session_id=${VALID_SESSION}`
    );
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('application/pdf');
    expect(res.headers.get('content-disposition')).toContain('attachment');
    // Real PDF bytes, not an error page dressed up as a 200.
    const body = Buffer.from(await res.arrayBuffer());
    expect(body.subarray(0, 4).toString()).toBe('%PDF');
    expect(body.byteLength).toBeGreaterThan(10_000);
  });

  it('never caches the file in a shared cache', async () => {
    validatePurchaseAccess.mockResolvedValue(paid);
    const res = await get(
      `https://x.test/api/story-to-income/download?session_id=${VALID_SESSION}`
    );
    expect(res.headers.get('cache-control')).toContain('no-store');
    expect(res.headers.get('cache-control')).toContain('private');
  });

  it('refuses when the session is missing', async () => {
    const res = await get('https://x.test/api/story-to-income/download');
    expect(res.status).toBe(403);
    expect(validatePurchaseAccess).not.toHaveBeenCalled();
  });

  it('refuses a malformed session without calling Stripe', async () => {
    const res = await get('https://x.test/api/story-to-income/download?session_id=nope');
    expect(res.status).toBe(403);
    expect(validatePurchaseAccess).not.toHaveBeenCalled();
  });

  it('refuses a well formed session that did not pay', async () => {
    validatePurchaseAccess.mockResolvedValue({ ok: false });
    const res = await get(
      `https://x.test/api/story-to-income/download?session_id=${VALID_SESSION}`
    );
    expect(res.status).toBe(403);
    expect(await res.text()).not.toContain('%PDF');
  });

  it('checks the session against this product, not just any purchase', async () => {
    validatePurchaseAccess.mockResolvedValue(paid);
    await get(`https://x.test/api/story-to-income/download?session_id=${VALID_SESSION}`);
    expect(validatePurchaseAccess).toHaveBeenCalledWith(VALID_SESSION, 'story-to-income');
  });
});
