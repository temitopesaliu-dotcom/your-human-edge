import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const validatePlaybookAccess = vi.fn();
vi.mock('@/lib/services/playbook-access', () => ({
  validatePlaybookAccess: (...args: unknown[]) => validatePlaybookAccess(...args),
}));

const VALID_SESSION = `cs_test_${'b'.repeat(45)}`;

function get(url: string, cookie?: string) {
  const req = new NextRequest(url, cookie ? { headers: { cookie } } : undefined);
  return import('./route').then((m) => m.GET(req));
}

const paidAs = (archetype: 'H' | 'C' | 'S' | 'G') => ({
  ok: true as const,
  sessionId: VALID_SESSION,
  archetype,
  name: 'Buyer',
  email: 'buyer@example.com',
});

describe('GET /api/playbook/pdf', () => {
  beforeEach(() => {
    validatePlaybookAccess.mockReset();
  });

  it('serves the playbook to a verified buyer holding the access cookie', async () => {
    validatePlaybookAccess.mockResolvedValue(paidAs('H'));
    const res = await get('https://x.test/api/playbook/pdf', `yhe_access=${VALID_SESSION}`);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('application/pdf');
    const body = Buffer.from(await res.arrayBuffer());
    expect(body.subarray(0, 4).toString()).toBe('%PDF');
  });

  it('picks the file from the verified purchase, not from the request', async () => {
    validatePlaybookAccess.mockResolvedValue(paidAs('G'));
    // The caller asks for a different archetype. It must be ignored.
    const res = await get(
      'https://x.test/api/playbook/pdf?archetype=H',
      `yhe_access=${VALID_SESSION}`
    );
    expect(res.status).toBe(200);
    expect(res.headers.get('content-disposition')).toContain('Growth-Catalyst');
  });

  it('falls back to a session id in the query when no cookie is present', async () => {
    validatePlaybookAccess.mockResolvedValue(paidAs('C'));
    const res = await get(`https://x.test/api/playbook/pdf?session_id=${VALID_SESSION}`);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-disposition')).toContain('Creative-Amplifier');
  });

  it('refuses with no cookie and no session', async () => {
    const res = await get('https://x.test/api/playbook/pdf');
    expect(res.status).toBe(403);
    expect(validatePlaybookAccess).not.toHaveBeenCalled();
  });

  it('refuses a malformed cookie without calling Stripe', async () => {
    const res = await get('https://x.test/api/playbook/pdf', 'yhe_access=forged');
    expect(res.status).toBe(403);
    expect(validatePlaybookAccess).not.toHaveBeenCalled();
  });

  it('refuses a well formed session that did not pay', async () => {
    validatePlaybookAccess.mockResolvedValue({ ok: false });
    const res = await get('https://x.test/api/playbook/pdf', `yhe_access=${VALID_SESSION}`);
    expect(res.status).toBe(403);
    expect(await res.text()).not.toContain('%PDF');
  });
});
