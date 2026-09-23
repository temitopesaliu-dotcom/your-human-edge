import { stripe } from '@/lib/services/stripe';
import { isValidSessionId } from '@/lib/utils/products';
import { toMajorUnits } from '@/lib/services/meta-capi';

export interface PaidCheckout {
  sessionId: string;
  /** Amount actually charged, in major units (e.g. 9.99). */
  value: number;
  /** ISO code, upper case (e.g. "USD"). */
  currency: string;
}

/**
 * Confirms with Stripe that a Checkout Session was really paid and returns
 * what was charged. Used by thank-you pages so GA4 records a purchase only
 * for a real sale, at the real amount, under the Stripe session id.
 *
 * Returns null for a missing, malformed, unpaid or unreadable session, so a
 * direct visit or a made-up link never logs revenue.
 */
export async function getPaidCheckout(sessionId: string | undefined): Promise<PaidCheckout | null> {
  if (!sessionId || !isValidSessionId(sessionId)) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid' || session.amount_total == null || !session.currency) {
      return null;
    }
    return {
      sessionId,
      value: toMajorUnits(session.amount_total, session.currency),
      currency: session.currency.toUpperCase(),
    };
  } catch (err: unknown) {
    console.error(
      '[paid-checkout] Failed to retrieve Stripe session:',
      err instanceof Error ? err.message : String(err)
    );
    return null;
  }
}
