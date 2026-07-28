'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

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
  /** Optional transaction ID. Uses crypto.randomUUID() if not provided. */
  transactionId?: string;
  /**
   * If set, the event fires only once per user by storing this key in localStorage.
   * Use for pages users might revisit (e.g. /playbook).
   * Omit for one-shot pages (e.g. /payment-successful, /confirmation).
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
    if (dedupKey) {
      try {
        if (localStorage.getItem(dedupKey) === 'true') return;
        localStorage.setItem(dedupKey, 'true');
      } catch {
        /* localStorage unavailable — fire anyway */
      }
    }

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
