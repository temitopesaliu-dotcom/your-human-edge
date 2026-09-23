import { describe, expect, it } from 'vitest';
import { claimPurchase, purchaseDedupKey, type KeyValueStore } from './purchase-dedup';

function memoryStore(): KeyValueStore & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v),
  };
}

describe('purchaseDedupKey', () => {
  it('keys on the Stripe session when there is one', () => {
    expect(purchaseDedupKey({ transactionId: 'cs_live_abc', dedupKey: 'x', productId: 'p' })).toBe(
      'ga_purchase_cs_live_abc'
    );
  });

  it('falls back to the dedupKey, then the product id', () => {
    expect(purchaseDedupKey({ dedupKey: 'legacy', productId: 'p' })).toBe('legacy');
    expect(purchaseDedupKey({ productId: 'stadium-live' })).toBe('ga_purchase_stadium-live');
  });
});

describe('claimPurchase', () => {
  it('fires once, then blocks every repeat of the same purchase', () => {
    const store = memoryStore();
    const key = purchaseDedupKey({ transactionId: 'cs_live_1', productId: 'playbook' });
    expect(claimPurchase(key, store)).toBe(true);
    expect(claimPurchase(key, store)).toBe(false);
    expect(claimPurchase(key, store)).toBe(false);
  });

  it('still counts a second, genuinely separate purchase of the same product', () => {
    const store = memoryStore();
    const first = purchaseDedupKey({ transactionId: 'cs_live_1', productId: 'playbook' });
    const second = purchaseDedupKey({ transactionId: 'cs_live_2', productId: 'playbook' });
    expect(claimPurchase(first, store)).toBe(true);
    expect(claimPurchase(second, store)).toBe(true);
  });

  it('fires when storage is missing or throws, leaving GA4 to de-dupe on transaction_id', () => {
    expect(claimPurchase('k', null)).toBe(true);
    const broken: KeyValueStore = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    };
    expect(claimPurchase('k', broken)).toBe(true);
  });
});
