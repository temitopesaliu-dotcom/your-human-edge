/**
 * Decides whether a GA4 `purchase` event may fire for this browser.
 *
 * Why this exists: GA4 counted single sales twice. Each page load minted a
 * fresh random transaction_id, so a buyer reopening their thank-you or
 * playbook link looked like a new sale. The fix has two layers:
 *
 *  1. transaction_id is the Stripe Checkout Session id. GA4 drops a second
 *     purchase with a transaction_id it has already seen, which covers a
 *     buyer reopening the link on another device or browser.
 *  2. This browser-side guard, keyed on that same id, so the duplicate is
 *     never even sent from the same browser.
 */

export interface PurchaseDedupInput {
  transactionId?: string;
  dedupKey?: string;
  productId: string;
}

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** Storage key for this purchase. Per transaction when we have one. */
export function purchaseDedupKey({ transactionId, dedupKey, productId }: PurchaseDedupInput): string {
  if (transactionId) return `ga_purchase_${transactionId}`;
  return dedupKey ?? `ga_purchase_${productId}`;
}

/**
 * Returns true exactly once per key. If storage is unavailable (private
 * mode, blocked cookies) it returns true: GA4's transaction_id check still
 * stops the duplicate on its side.
 */
export function claimPurchase(key: string, storage: KeyValueStore | null | undefined): boolean {
  if (!storage) return true;
  try {
    if (storage.getItem(key) === 'true') return false;
    storage.setItem(key, 'true');
  } catch {
    /* storage threw — fall through and fire */
  }
  return true;
}
