'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/services/analytics';
import { claimPurchase, purchaseDedupKey } from '@/lib/utils/purchase-dedup';

interface PurchaseItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

interface PurchaseTrackerProps {
  /** Product SKU / item ID (e.g. 'stadium-live', 'playbook', 'blueprint-audit') */
  productId: string;
  productName: string;
  value: number;
  /** ISO currency code — defaults to USD */
  currency?: string;
  /**
   * Stripe Checkout Session id. Always pass it when the page has one: GA4
   * drops a second purchase with the same transaction_id, so a buyer who
   * reopens their link on another device is not counted twice.
   * Falls back to crypto.randomUUID() only for legacy pages with no session.
   */
  transactionId?: string;
  /**
   * Browser-side de-dupe key, used only when there is no transactionId.
   * Every purchase is de-duped: with a transactionId the key is per
   * transaction; without one it falls back to this, then to the product id.
   */
  dedupKey?: string;
}

/**
 * Fires a GA4 `purchase` event on mount.
 * Renders nothing — safe to drop anywhere in the component tree.
 */
export default function PurchaseTracker({
  productId,
  productName,
  value,
  currency = 'USD',
  transactionId,
  dedupKey,
}: PurchaseTrackerProps) {
  useEffect(() => {
    const key = purchaseDedupKey({ transactionId, dedupKey, productId });
    let storage: Storage | null = null;
    try {
      storage = window.localStorage;
    } catch {
      /* access itself can throw when storage is blocked */
    }
    if (!claimPurchase(key, storage)) return;

    const items: PurchaseItem[] = [
      { item_id: productId, item_name: productName, price: value, quantity: 1 },
    ];

    trackEvent('purchase', {
      transaction_id: transactionId ?? crypto.randomUUID(),
      value,
      currency,
      items,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
