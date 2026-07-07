import AiosNav from "../../_components/AiosNav";
import AiosFooter from "../../_components/AiosFooter";
import Link from "next/link";

export const metadata = {
  title: "Application Received — AI Operating System",
  robots: "noindex, nofollow",
};

export default function ApplyConfirmationPage() {
  return (
    <>
      <AiosNav variant="confirmation" />

      <div className="confirmation-page">
        <div className="confirmation-inner">
          <div className="confirmation-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="#C8A96E" strokeWidth="1.5" />
              <path d="M15 24l7 7 11-11" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="confirmation-label">Application Received</div>

          <h1 className="heading-1 mt-3 mb-4" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Here are your next steps.
          </h1>

          <p className="body-lg mb-4" style={{ maxWidth: 480, margin: "0 auto var(--space-4)" }}>
            We&apos;ve received your application and payment. An email will
            be sent to you shortly with everything you need to know about your
            next steps.
          </p>

          <div className="confirmation-steps">
            <div className="confirmation-step">
              <div className="confirmation-step-num">1</div>
              <div>
                <div className="confirmation-step-title">
                  Check your inbox
                </div>
                <p className="confirmation-step-desc">
                  A confirmation email is on its way to the address you
                  provided. It will include details about your Blueprint Session
                  and how to schedule it. Check your spam folder if it
                  doesn&apos;t arrive within a few minutes.
                </p>
              </div>
            </div>
            <div className="confirmation-step">
              <div className="confirmation-step-num">2</div>
              <div>
                <div className="confirmation-step-title">
                  Schedule your session
                </div>
                <p className="confirmation-step-desc">
                  Use the booking link in your email to select a time that works
                  for you. Sessions are held via Zoom.
                </p>
              </div>
            </div>
            <div className="confirmation-step">
              <div className="confirmation-step-num">3</div>
              <div>
                <div className="confirmation-step-title">
                  Prepare for your Blueprint
                </div>
                <p className="confirmation-step-desc">
                  Start thinking about the processes in your business that
                  consume the most time. The more specific you can be, the more
                  actionable your Blueprint will be.
                </p>
              </div>
            </div>
          </div>

          <div className="confirmation-box">
            <div className="confirmation-box-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
                <path d="M12 8v5M12 15v0.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="confirmation-box-title">While you wait</p>
              <p className="confirmation-box-text">
                You may want to start thinking about the processes in your
                business that consume the most of your time. The more specific
                you can be about these when we connect, the more actionable
                your Blueprint will be.
              </p>
            </div>
          </div>

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
