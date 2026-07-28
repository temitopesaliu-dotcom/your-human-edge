import Link from "next/link";
import { INVESTMENT_POINTS, PRICING_INCLUDES } from "./blueprint.data";

export default function Investment() {
  return (
    <section className="section-sm" id="investment" aria-labelledby="investment-heading">
      <div className="container">
        <div className="blueprint-grid">
          <div className="fade-up">
            <p className="label mb-3">The Investment</p>
            <h2 className="heading-1" id="investment-heading">
              $1,000 for a consulting session with a written deliverable.
            </h2>
            <p className="body-lg mt-4 mb-5">
              Most businesses spend weeks — and tens of thousands of dollars —
              building AI tools that don&apos;t connect or deliver results. The
              Blueprint costs $1,000 and gives you a complete, written
              architecture for your AI OS before a single tool is built.
            </p>

            {INVESTMENT_POINTS.map((point, i) => (
              <div className={`investment-point ${i < 2 ? "mb-4" : ""}`} key={i}>
                <div className="investment-point-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#C8A96E" strokeWidth="1.3" />
                    <path d="M9 12l2 2 4-4" stroke="#C8A96E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="investment-point-title">{point.title}</p>
                  <p className="body-sm" style={{ color: "var(--text-2)" }}>
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="blueprint-pricing-card fade-up delay-1">
            <p className="label mb-4">AI Operating System Blueprint</p>
            <div style={{ marginBottom: "var(--space-3)" }}>
              <span className="price-currency">$</span>
              <span className="price-amount">1,000</span>
            </div>
            <p className="body-sm mb-5" style={{ color: "var(--text-2)" }}>
              One consulting engagement. One written deliverable. Credited in
              full if you proceed.
            </p>

            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "var(--space-4)",
                marginBottom: "var(--space-5)",
              }}
            >
              {PRICING_INCLUDES.map((item, i) => (
                <div className={`deliverable-item ${i < 7 ? "mb-2" : ""}`} key={i}>
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#C8A96E" strokeWidth="1.2" />
                    <path d="M5 8l2 2 4-4" stroke="#C8A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 13, color: "var(--text-2)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/the-blueprint-audit/apply"
              className="btn btn-primary btn-lg btn-arrow"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Apply to Book Your Blueprint
            </Link>
            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "var(--text-3)",
                marginTop: "var(--space-3)",
              }}
            >
              Not all applications are accepted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
