export type ProductType = 'playbook' | 'paths-guide' | 'stadium-live' | 'stadium-6weeks';

export const PLAYBOOK_ACCESS_COOKIE = 'yhe_access';
export const GUIDE_ACCESS_COOKIE = 'yhe_guide_access';
export const PURCHASE_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

export const STRIPE_SESSION_PATTERN = /^cs_(live|test)_[A-Za-z0-9]{40,}$/;

export function accessCookieForProduct(product: ProductType): string {
  return product === 'paths-guide' ? GUIDE_ACCESS_COOKIE : PLAYBOOK_ACCESS_COOKIE;
}

export function isValidSessionId(sessionId: string): boolean {
  return STRIPE_SESSION_PATTERN.test(sessionId);
}

export function normalizeProduct(raw: string | undefined): ProductType {
  if (raw === 'paths-guide') return 'paths-guide';
  if (raw === 'stadium-live') return 'stadium-live';
  if (raw === 'stadium-6weeks') return 'stadium-6weeks';
  return 'playbook';
}

