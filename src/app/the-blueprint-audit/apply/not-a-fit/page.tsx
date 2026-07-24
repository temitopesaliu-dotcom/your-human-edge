import AiosNav from "../../_components/AiosNav";
import AiosFooter from "../../_components/AiosFooter";
import Link from "next/link";

export const metadata = {
  title: "Not the Right Fit — AI Operating System",
  robots: "noindex, nofollow",
};

export default function NotAFitPage() {
  return (
    <>
      <AiosNav variant="confirmation" />

      <div className="confirmation-page">
        <div className="confirmation-inner">
          <div
            className="confirmation-icon"
            aria-hidden="true"
            style={{ opacity: 0.6 }}
          >
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="23" stroke="#C8A96E" strokeWidth="1.5" />
              <path d="M24 14v12M24 29v3" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div
            className="confirmation-label"
            style={{ color: "var(--text-2)" }}
          >
            Honest Assessment
          </div>

          <h1 className="heading-1 mt-3 mb-4" style={{ maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
            This isn&apos;t the right fit — yet.
          </h1>

          <p className="body-lg mb-4" style={{ maxWidth: 520, margin: "0 auto var(--space-4)" }}>
            Based on the investment range you indicated, this engagement
            likely isn&apos;t the right match for where you are right now.
            That&apos;s not a judgment — it&apos;s just practical.
          </p>

          <p className="body-md mb-6" style={{ maxWidth: 520, margin: "0 auto var(--space-6)", color: "var(--text-2)" }}>
            Our implementation projects start at $2,500 and the Blueprint
            Session is $1,000 — credited in full if you proceed. If these
            numbers aren&apos;t in the right range today, we&apos;d rather
            tell you now than waste your time.
          </p>

          <div className="not-fit-options">
            <div className="not-fit-option">
              <h3 className="not-fit-option-title">
                Come back when the timing is right
              </h3>
              <p className="not-fit-option-desc">
                Business conditions change. If you come back when you&apos;re
                ready to invest in infrastructure, the door is open. Bookmark
                this page or follow us to stay in touch.
              </p>
            </div>

            <div className="not-fit-option">
              <h3 className="not-fit-option-title">
                Start with what you have
              </h3>
              <p className="not-fit-option-desc">
                If budget is the constraint right now, the best use of your
                time is building basic process documentation — mapping out
                your workflows in writing. That foundation will make any
                future AI implementation faster and more effective.
              </p>
            </div>

            <div className="not-fit-option">
              <h3 className="not-fit-option-title">
                Explore no-code tools independently
              </h3>
              <p className="not-fit-option-desc">
                Tools like Zapier, Make (Integromat), and Notion can automate
                meaningful workflows without a large investment. They have
                learning curves, but they&apos;re accessible starting points
                for smaller budgets.
              </p>
            </div>
          </div>

          <div
            className="confirmation-box"
            style={{ textAlign: "left", marginTop: "var(--space-6)" }}
          >
            <div className="confirmation-box-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
                <path d="M12 8v5M12 15v0.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="confirmation-box-title">
                Not about budget? Applied by mistake?
              </p>
              <p className="confirmation-box-text">
                If you selected a budget range that doesn&apos;t reflect your
                actual situation, or if you have a specific scenario you&apos;d
                like us to consider, reach out directly. We&apos;re willing to
                assess exceptions.
              </p>
            </div>
          </div>

          <div className="confirmation-actions" style={{ marginTop: "var(--space-6)" }}>
            <Link href="/the-blueprint-audit" className="btn btn-outline">
              ← Back to home
            </Link>
            <Link href="/the-blueprint-audit/apply" className="btn btn-primary">
              Reapply with updated info
            </Link>
          </div>
        </div>
      </div>

      <AiosFooter variant="confirmation" />
    </>
  );
}
