import { NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';

/**
 * Founder rate status for /the-business-architect-programme (Cohort 2).
 *
 * The page shows the $997 founder rate until it closes, then switches to the
 * $1,599 standard rate. It closes at the earlier of:
 *   1. Saturday, November 7, 2026, 23:59 London time (GMT, so 23:59:59Z), or
 *   2. 6 completed checkouts on the founder Payment Link (Stripe enforces the
 *      limit itself and deactivates the link), or
 *   3. the founder Payment Link being switched off by hand (the kill switch).
 *
 * The page also checks the date in the browser, so if this route fails the
 * deadline still holds. Seats left come from Stripe, never a made-up number.
 */
export const dynamic = 'force-dynamic';

const FOUNDER_LINK_ID = 'plink_1UTkbHKaNmUNiD4vqJgHbMuu';
const FOUNDER_CLOSES_AT = Date.UTC(2026, 10, 7, 23, 59, 59);

export async function GET() {
  const beforeDeadline = Date.now() < FOUNDER_CLOSES_AT;
  let open = beforeDeadline;
  let seatsLeft: number | null = null;

  try {
    const link = await stripe.paymentLinks.retrieve(FOUNDER_LINK_ID);
    const sold = link.restrictions?.completed_sessions?.count ?? 0;
    const limit = link.restrictions?.completed_sessions?.limit ?? 6;
    seatsLeft = Math.max(0, limit - sold);
    open = beforeDeadline && link.active && seatsLeft > 0;
  } catch (err) {
    // Stripe unreachable: fall back to the date rule only, show no seat count.
    console.error('[founder-status] Stripe lookup failed', err);
  }

  return NextResponse.json(
    { open, seatsLeft: open ? seatsLeft : 0 },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60' } },
  );
}
