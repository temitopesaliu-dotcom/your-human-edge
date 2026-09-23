import AiosNav from "../../_components/AiosNav";
import AiosFooter from "../../_components/AiosFooter";
import Link from "next/link";
import PurchaseTracker from "@/components/purchase-tracker";
import { getPaidCheckout } from "@/lib/services/paid-checkout";
import PriorityPayButton from "@/components/features/blueprint-apply/PriorityPayButton";

export const metadata = {
  title: "Application Received — AI Operating System",
  robots: "noindex, nofollow",
};

const DISCOVERY_POINTS = [
  "Understand your business and desired outcome",
  "Clarify your workflows and systems",
  "Assess complexity and AI opportunities",
  "Determine what your architecture needs to cover",
  "Scope the work required",
];

function WhatHappensNext() {
  return (
    <div className="confirmation-steps" style={{ margin: "var(--space-6) 0" }}>
      <div style={{ textAlign: "center" }}>
        <h2 className="heading-2">What Happens Next?</h2>
        <p className="body-md mt-2">
          Your meeting is a discovery and scoping session to:
        </p>
      </div>
      {DISCOVERY_POINTS.map((point, i) => (
        <div className="confirmation-step" key={point}>
          <div className="confirmation-step-num">{i + 1}</div>
          <div>
            <p className="confirmation-step-desc">{point}</p>
          </div>
        </div>
      ))}
      <p className="body-md" style={{ textAlign: "center", paddingTop: "var(--space-2)" }}>
        After the session, you&apos;ll receive your final Solution Architecture scope and
        investment before the architecture work begins.
      </p>
    </div>
  );
}

export default async function ApplyConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; email?: string }>;
}) {
  const params = await searchParams;
  // `paid` drives what the buyer sees and stays as it was, so a slow Stripe
  // lookup can never show a real buyer the "pay now" button again.
  const paid = Boolean(params.session_id);
  // GA4 is stricter: only a checkout Stripe confirms as paid is recorded.
  const verified = paid ? await getPaidCheckout(params.session_id) : null;
  const applicantEmail = params.email || null;

  return (
    <>
      {verified && (
        <PurchaseTracker
          productId="blueprint-audit"
          productName="Blueprint Audit"
          value={verified.value}
          currency={verified.currency}
          transactionId={verified.sessionId}
        />
      )}
      <AiosNav variant="confirmation" />

      <div className="confirmation-page">
        <div className="confirmation-inner">
          <div className="confirmation-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="#C8A96E" strokeWidth="1.5" />
              <path d="M15 24l7 7 11-11" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="confirmation-label">
            {paid ? "Payment Confirmed" : "Application Received"}
          </div>

          <h1 className="heading-1 mt-3 mb-4" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            {paid ? "Your Priority Access is secured." : "Here are your next steps."}
          </h1>

          {paid ? (
            <>
              <p className="body-lg mb-4" style={{ maxWidth: 520, margin: "0 auto var(--space-4)" }}>
                Thank you for applying for the AI Solution Architecture. We&apos;ll review your
                application and contact you within 48 hours if your business is a fit.
              </p>
              <WhatHappensNext />
              <p className="body-sm" style={{ color: "var(--text-3)" }}>
                Your $1,000 Priority Access payment is fully credited toward your final
                Solution Architecture fee. A receipt and next steps are on their way to
                your inbox.
              </p>
            </>
          ) : (
            <>
              <p className="body-lg mb-4" style={{ maxWidth: 520, margin: "0 auto var(--space-4)" }}>
                Thank you for submitting your application for AI Solution Architecture.
                We&apos;ll review your application and contact you within 48 hours if your
                business is a fit.
              </p>

              <WhatHappensNext />

              <div className="confirmation-box" style={{ marginBottom: "var(--space-4)" }}>
                <div>
                  <p className="confirmation-box-title">Want Priority Access?</p>
                  <p className="confirmation-box-text">
                    Skip the standard review process and secure a $1,000 Priority Access +
                    Architecture Discovery Fee to meet with Temitope Saliu within 48 hours.
                  </p>
                  <p className="confirmation-box-text">
                    Your $1,000 payment is fully credited toward your final Solution
                    Architecture fee. For example, if your architecture is scoped at $3,500,
                    your $1,000 payment is applied toward the total, and the remaining $2,500
                    is due before the architecture work begins.
                  </p>
                  <PriorityPayButton className="mt-3" email={applicantEmail} />
                </div>
              </div>

              <div className="confirmation-box" style={{ marginBottom: "var(--space-6)" }}>
                <div>
                  <p className="confirmation-box-title">What You Receive</p>
                  <p className="confirmation-box-text">
                    A comprehensive audit design architecture covering the systems,
                    workflows, AI opportunities, technology requirements, and implementation
                    roadmap for your business, delivered within 7 business days of payment of
                    the remaining balance.
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="confirmation-actions">
            <Link href="/the-blueprint-audit" className="btn btn-outline">
              ← Back to home
            </Link>
            <Link href="/the-blueprint-audit/blueprint" className="btn btn-ghost">
              Review what&apos;s included
            </Link>
          </div>
        </div>
      </div>

      <AiosFooter variant="confirmation" />
    </>
  );
}
