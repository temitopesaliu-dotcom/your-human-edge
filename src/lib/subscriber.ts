/**
 * Shared utilities for free-resource email gates.
 *
 * Flow:
 *   1. Page checks cookie (server-side) or localStorage flag (client-side).
 *   2. If not subscribed, show gate → user submits email.
 *   3. POST to /api/check-subscriber first to avoid duplicate MailerLite calls.
 *   4. If already subscribed, just set localStorage flag + cookie. No MailerLite call.
 *   5. If new, POST to /api/subscribe which handles KV + MailerLite.
 */

/** localStorage key for the subscriber flag. */
export const STORAGE_KEY_SUBSCRIBED = 'yhe_subscribed';

/** Number of days the subscriber cookie lasts. */
export const SUBSCRIBER_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * Check whether the current visitor is already a known subscriber.
 * Uses localStorage as a fast client-side check.
 */
export function isLocallySubscribed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY_SUBSCRIBED) === 'true';
  } catch {
    return false;
  }
}

/**
 * Mark the user as subscribed in localStorage.
 * Called after a successful subscribe or check-subscriber response.
 */
export function markLocallySubscribed(name: string, email: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_SUBSCRIBED, 'true');
    localStorage.setItem('yhe_name', name);
    localStorage.setItem('yhe_email', email.toLowerCase());
  } catch { /* ignore */ }
}

/**
 * POST to /api/check-subscriber to see if this email is already in KV.
 * Returns `true` if already subscribed (no need to call MailerLite).
 */
export async function checkRemoteSubscriber(email: string): Promise<boolean> {
  try {
    const res = await fetch('/api/check-subscriber', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.toLowerCase() }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return !!data.subscribed;
  } catch {
    return false;
  }
}
