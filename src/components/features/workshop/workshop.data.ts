/**
 * Single source of truth for the workshop date and pricing.
 *
 * WORKSHOP_PRICE_NEXT is what the NEXT cohort pays. It is deliberately not a
 * struck-through "full price": nobody has paid $299 yet, so presenting it as a
 * discount off an established price would be a claim we cannot support. Framed
 * as the next cohort's price it is a promise we control and can keep.
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
export const WORKSHOP_PRICE_NEXT = "$299";

export const WORKSHOP_DATE = "November 7, 2026 · 2pm London GMT";
export const WORKSHOP_DATE_SHORT = "November 7, 2026";
export const WORKSHOP_DATE_DAY = "November 7th";

/**
 * The exact moment the class starts, as a UTC instant. LocalTime uses it to
 * tell each visitor what time that is where they are. London is on GMT
 * (UTC+0) on 7 November, so 2pm London = 14:00 UTC. If the date or time
 * changes, change this line together with WORKSHOP_DATE above.
 */
export const WORKSHOP_START_ISO = "2026-11-07T14:00:00Z";
