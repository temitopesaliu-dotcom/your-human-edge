import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Minimal Paystack client for naira checkouts. The secret key lives only in the
 * PAYSTACK_SECRET_KEY environment variable and never reaches the browser.
 */
const API = 'https://api.paystack.co';

function secret(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error('PAYSTACK_SECRET_KEY is not set.');
  return key;
}

export interface PaystackInit {
  email: string;
  /** In kobo. */
  amount: number;
  reference: string;
  callbackUrl: string;
  metadata: Record<string, unknown>;
}

/** Starts a Paystack transaction and returns the hosted checkout URL. */
export async function initializePaystack(p: PaystackInit): Promise<string> {
  const res = await fetch(`${API}/transaction/initialize`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: p.email,
      amount: p.amount,
      currency: 'NGN',
      reference: p.reference,
      callback_url: p.callbackUrl,
      channels: ['card', 'bank', 'ussd', 'bank_transfer'],
      metadata: p.metadata,
    }),
    signal: AbortSignal.timeout(15_000),
  });
  const data = (await res.json().catch(() => null)) as { status?: boolean; message?: string; data?: { authorization_url?: string } } | null;
  if (!data?.status || !data.data?.authorization_url) {
    throw new Error(`Paystack initialize failed: ${res.status} ${data?.message || ''}`);
  }
  return data.data.authorization_url;
}

export interface PaystackTransaction {
  status: string;
  reference: string;
  amount: number;
  currency: string;
  customer?: { email?: string; first_name?: string | null; last_name?: string | null };
  metadata?: unknown;
}

/** Confirms a transaction with Paystack directly, so the webhook body alone is never trusted. */
export async function verifyPaystack(reference: string): Promise<PaystackTransaction | null> {
  const res = await fetch(`${API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret()}` },
    signal: AbortSignal.timeout(15_000),
  });
  const data = (await res.json().catch(() => null)) as { status?: boolean; data?: PaystackTransaction } | null;
  return data?.status && data.data ? data.data : null;
}

/** Paystack signs each webhook with HMAC SHA-512 of the raw body, keyed on the secret key. */
export function validPaystackSignature(rawBody: string, signature: string | null, key = process.env.PAYSTACK_SECRET_KEY): boolean {
  if (!signature || !key) return false;
  const expected = createHmac('sha512', key).update(rawBody).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Paystack returns metadata as an object or as a JSON string. */
export function paystackMetadata(meta: unknown): Record<string, unknown> {
  if (meta && typeof meta === 'object') return meta as Record<string, unknown>;
  if (typeof meta === 'string') {
    try { const o = JSON.parse(meta); return o && typeof o === 'object' ? o : {}; } catch { return {}; }
  }
  return {};
}
