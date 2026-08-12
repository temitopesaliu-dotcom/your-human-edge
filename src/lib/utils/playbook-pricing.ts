/**
 * Single source of truth for AI Archetype Playbook pricing.
 *
 * £39 is the anchor. The buyer pays £9.99, applied automatically by a Stripe
 * coupon at checkout — no promo code to remember, no code to type, and the
 * discount is visible on the Stripe page.
 *
 * There is deliberately NO expiry. If you ever want the price to revert to
 * £39, remove the coupon from the checkout session in
 * src/app/api/create-checkout/route.ts — do not rely on a coupon redeem_by
 * date, because the page would keep advertising £9.99 while Stripe charged
 * £39.
 *
 * Stripe (Glide Academy, acct_1OrPJrKaNmUNiD4v, live mode):
 *   price  price_1U3QXgKaNmUNiD4vDyhOYwDN   £39.00 GBP, tax_behavior=inclusive
 *   coupon playbook-999                     -£29.01 GBP, once, no expiry
 */

export const PLAYBOOK_LIST_PRICE_LABEL = "£39";
export const PLAYBOOK_PRICE_LABEL = "£9.99";

/** Kept as an alias so older imports keep working. */
export const PLAYBOOK_LAUNCH_PRICE_LABEL = PLAYBOOK_PRICE_LABEL;

/** The price the buyer actually pays. */
export function currentPriceLabel(): string {
  return PLAYBOOK_PRICE_LABEL;
}
