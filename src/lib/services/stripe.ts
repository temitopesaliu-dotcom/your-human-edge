import Stripe from 'stripe';

/**
 * Shared Stripe client — instantiated once at module scope.
 * Throws immediately at startup if STRIPE_SECRET_KEY is missing,
 * so misconfiguration is caught before any request reaches the route.
 */
export const stripe = (() => {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) throw new Error('STRIPE_SECRET_KEY is not set.');
  return new Stripe(apiKey);
})();
