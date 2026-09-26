import Link from 'next/link';
import PurchaseTracker from '@/components/purchase-tracker';
import { validatePurchaseAccess } from '@/lib/services/purchase-access';
import { getPaidCheckout } from '@/lib/services/paid-checkout';
import { levelFromNumber } from '@/lib/claude-quiz/levels';
import { WORKBOOKS } from '@/lib/claude-quiz/workbooks';
import WorkbookClient from './workbook-client';
import '../claude-quiz.css';

export const metadata = {
  title: 'Your Claude Workbook | Temitope Saliu',
  robots: 'noindex, nofollow',
};

/**
 * Post-payment delivery for the four Claude workbooks.
 *
 * The Stripe session is verified server-side against the product for the
 * requested level before any workbook content renders, so the URL is useless
 * to anyone who has not paid for that level. The buyer's link (also emailed
 * via the MailerLite buyers automation) keeps working on any device because
 * it is re-verified on every visit.
 */
export default async function ClaudeWorkbookPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; level?: string }>;
}) {
  const { session_id: sessionId, level: levelParam } = await searchParams;
  const level = levelFromNumber(levelParam);
  const access =
    sessionId && level ? await validatePurchaseAccess(sessionId, level.product) : { ok: false as const };

  if (!access.ok || !level) {
    return (
      <div className="cq-page">
        <div className="cq-wrap">
          <div className="cq-card cq-stack">
            <h2 style={{ fontSize: 26 }}>We couldn&apos;t verify that payment</h2>
            <p>
              This page needs the link from your checkout or your email to open the workbook. If you&apos;ve just paid,
              nothing is lost: your Stripe receipt is proof of purchase.
            </p>
            <p>
              Reply to your receipt email or write to <b>hello@temitopesaliu.com</b> and we&apos;ll send your link
              straight to you.
            </p>
            <p><Link href="/claude-quiz" style={{ color: '#6a5acd', fontWeight: 700 }}>Take the Claude Level Quiz</Link></p>
          </div>
        </div>
      </div>
    );
  }

  const paid = await getPaidCheckout(access.sessionId);
  const workbook = WORKBOOKS[level.n - 1];

  return (
    <div className="cq-page">
      <PurchaseTracker
        productId={level.product}
        productName={level.workbook}
        value={paid?.value ?? 9.99}
        currency={paid?.currency ?? 'USD'}
        transactionId={access.sessionId}
      />
      <div className="cq-wrap cq-wrap-wide">
        <div className="cq-brand">
          <Link href="/"><b>Temitope Saliu</b> · Your Human Edge</Link>
          <span>Paid · {level.short}</span>
        </div>
        <WorkbookClient workbook={workbook} buyerName={access.name} />
      </div>
    </div>
  );
}
