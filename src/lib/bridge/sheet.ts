/**
 * Writes The Bridge quiz, free-training sign-ups and VIP buyers to the private
 * Google Sheet through its Apps Script web app (GOOGLE_SHEETS_BRIDGE_WEBHOOK_URL).
 * Never throws: saving a row must not be able to stop someone getting their
 * results, their seat or their VIP email.
 */
export type BridgeAction = Record<string, unknown> & { action: 'quiz' | 'webinar' | 'vip_buyer' };

/** Trim, cap and strip control characters from anything a visitor typed. */
export function clean(value: unknown, max = 400): string {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  return String(value).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendToBridgeSheet(payload: BridgeAction): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_BRIDGE_WEBHOOK_URL;
  const secret = process.env.BRIDGE_SHEET_SECRET;
  if (!url || !secret) {
    console.error('[bridge-sheet] GOOGLE_SHEETS_BRIDGE_WEBHOOK_URL or BRIDGE_SHEET_SECRET not set');
    return false;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ ...payload, secret }),
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!data?.ok) console.error('[bridge-sheet]', payload.action, res.status, data?.error);
    return Boolean(data?.ok);
  } catch (err) {
    console.error('[bridge-sheet]', payload.action, err instanceof Error ? err.message : String(err));
    return false;
  }
}
