/**
 * Single source of truth for the workshop checkout link.
 *
 * Every CTA on /workshop must import WORKSHOP_CHECKOUT_HREF.
 * Do NOT hardcode a buy.stripe.com URL in a component — that is exactly how
 * the Nav/Hero/FinalCta links drifted apart after the $99 price change.
 */
export const WORKSHOP_CHECKOUT_HREF =
  "https://buy.stripe.com/7sY9AU7NJ6NifIvg5d3oA0u";
