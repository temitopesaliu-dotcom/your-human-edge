// Lightweight KV-backed rate limiter.
// Uses a fixed 60-second window per IP. Each call increments a counter
// stored in Redis with the window boundary baked into the key, so
// expiry is automatic and no cleanup job is needed.

import { kv } from '@vercel/kv';

/**
 * Returns true if the request is within the allowed limit.
 * Returns false if the caller should be rate-limited (429).
 *
 * @param identifier  Usually the client IP address.
 * @param limit       Max requests per window.
 * @param windowSecs  Window size in seconds (default 60).
 * @param prefix      A namespace prefix so different API routes have
 *                    independent counters (e.g. 'subscribe', 'track').
 */

export async function rateLimit(
  identifier: string,
  limit = 10,
  windowSecs = 60,
  prefix = 'default'
): Promise<boolean> {
  // Sanitise the identifier so it is safe as a Redis key segment.
  const safe = identifier.replace(/[^a-zA-Z0-9:.]/g, '_').slice(0, 64);
  const window = Math.floor(Date.now() / (windowSecs * 1000));
  const key = `rl:${prefix}:${safe}:${window}`;

  try {
    const count = await kv.incr(key);
    // Set expiry only on the first increment to avoid resetting the TTL.
    if (count === 1) {
      await kv.expire(key, windowSecs * 2); // 2× window ensures key is always cleaned up
    }
    return count <= limit;
  } catch {
    // If KV is unavailable, fail open rather than blocking legitimate users.
    return true;
  }
}

/** Convenience helper: extract the best available client IP from Next.js headers. */
export function getClientIp(headers: Headers): string {
  // Check a variety of common headers (Vercel, Cloudflare, Fastly, proxies).
  const candidates = [
    headers.get('x-forwarded-for'),
    headers.get('x-real-ip'),
    headers.get('cf-connecting-ip'),
    headers.get('x-client-ip'),
    headers.get('fastly-client-ip'),
    headers.get('true-client-ip'),
  ];

  for (const h of candidates) {
    if (!h) continue;
    const part = h.split(',')[0]?.trim();
    if (part) return part;
  }

  return 'unknown';
}

