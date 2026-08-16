/**
 * Single source of truth for the workshop date and pricing.
 *
 * Every CTA on /workshop must use WorkshopCheckoutButton (or startWorkshopCheckout).
 * Do NOT hardcode a buy.stripe.com URL in a component — that is exactly how
 * the Nav/Hero/FinalCta links drifted apart after the $99 price change.
 *
 * The charged amount lives in src/app/api/workshop/create-checkout/route.ts.
 * WORKSHOP_PRICE below is the display price and MUST match it. Changing one
 * without the other is the bug this file exists to prevent.
 */

export const WORKSHOP_PRICE = "$157";
export const WORKSHOP_PRICE_FULL = "$299";

export const WORKSHOP_DATE = "September 26, 2026 · 2pm BST";
export const WORKSHOP_DATE_SHORT = "September 26, 2026";
export const WORKSHOP_DATE_DAY = "September 26th";
