/**
 * Single source of truth for AI Archetype Playbook pricing.
 *
 * Anchor price is £39. For the launch window a Stripe coupon is applied
 * automatically at checkout so the buyer pays £9.99 — no promo code to
 * remember, no code to type, and the discount is visible on the Stripe page.
 *
 * When the window closes the coupon stops being applied (and Stripe would
 * reject it anyway, because it has a redeem_by date), so the price reverts
 * to a genuine £39.
 *
 * Stripe (Glide Academy, acct_1OrPJrKaNmUNiD4v, live mode):
 *   price  price_1U3QXgKaNmUNiD4vDyhOYwDN   £39.00 GBP, tax_behavior=inclusive
 *   coupon playbook-launch                  -£29.01 GBP, once, redeem_by 2026-08-26
 */

export const PLAYBOOK_LIST_PRICE_LABEL = "£39";
export const PLAYBOOK_LAUNCH_PRICE_LABEL = "£9.99";

/** ISO timestamp the launch window closes. Override without a redeploy via env. */
export const PLAYBOOK_LAUNCH_ENDS_AT =
  process.env.NEXT_PUBLIC_PLAYBOOK_LAUNCH_ENDS_AT || "2026-08-26T23:59:59Z";

export function isLaunchWindowOpen(now: Date = new Date()): boolean {
  const end = Date.parse(PLAYBOOK_LAUNCH_ENDS_AT);
  if (Number.isNaN(end)) return false;
  return now.getTime() < end;
}

/** Whole days left in the launch window (minimum 0). */
export function launchDaysLeft(now: Date = new Date()): number {
  const end = Date.parse(PLAYBOOK_LAUNCH_ENDS_AT);
  if (Number.isNaN(end)) return 0;
  return Math.max(0, Math.ceil((end - now.getTime()) / 86_400_000));
}

/** e.g. "26 August" — used in the on-page launch banner. */
export function launchEndsLabel(): string {
  const end = new Date(PLAYBOOK_LAUNCH_ENDS_AT);
  if (Number.isNaN(end.getTime())) return "";
  return end.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/London",
  });
}

/** The price the buyer actually pays right now. */
export function currentPriceLabel(now: Date = new Date()): string {
  return isLaunchWindowOpen(now)
    ? PLAYBOOK_LAUNCH_PRICE_LABEL
    : PLAYBOOK_LIST_PRICE_LABEL;
}
