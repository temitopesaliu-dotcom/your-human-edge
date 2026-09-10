import Link from "next/link";

export default function Blueprint() {
  return (
    <section
      className="blueprint-section section"
      id="blueprint"
      aria-labelledby="blueprint-heading"
    >
      <div className="container">
        <div className="section-header fade-up">
          <p className="label mb-3">The First Step</p>
          <h2 className="heading-1" id="blueprint-heading">
            AI Operating System Blueprint.
          </h2>
          <p className="body-lg mt-3">
            A consulting engagement with one
            purpose: clarity on exactly what your business operating system should look like and
            how to build it.
          </p>
        </div>

        <div className="blueprint-grid">
          <div className="blueprint-info fade-up delay-1">
            <h3 className="heading-3 mb-3">
              What the Blueprint covers.
            </h3>
            <p className="body-md mb-4">
              In 90 minutes, we map your entire business operation, identify
              every AI opportunity, and design an architecture that fits the
              way you actually work — not a generic template.
            </p>

            <p className="label mb-3">What you receive</p>
            <div className="deliverables-list">
              {[
                "90-minute strategy session",
                "Business workflow mapping",
                "AI opportunity assessment",
                "Technology recommendations",
                "Automation architecture design",
                "Implementation roadmap",
                "Priority matrix",
                "Investment estimate",
                "ROI opportunity map",
                "Written Blueprint document",
              ].map((item, i) => (
                <div className="deliverable-item" key={i}>
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

            <div className="blueprint-why mt-5">
              <p className="blueprint-why-title">
              Why does the price vary
              </p>
              <p className="blueprint-why-text">Because every business arrives with a different problem.
                We read your application, work out the architecture your operation actually needs, and price the engagement to that.
                Mapping two workflows for a solo consultant is not the same job as mapping a twenty-person service business.
                Blueprints run from $1,000 to $5,000+, and you get your exact figure in writing before you are asked to pay anything.</p>
            </div>
          </div>

          <div className="blueprint-pricing-card fade-up delay-2">
            <p className="label mb-4">AI Operating System Blueprint</p>
            <div className="price-row" style={{ marginBottom: "var(--space-3)" }}>
              <p className="price-prefix">From</p>
              <div>
                <span className="price-currency">$</span>
                <span className="price-amount">1,000</span>
              </div>
            </div>
            <p className="body-sm mb-4">Scoped to your business. $1,000 to $5,000+ depending on how much of your operation the architecture has to cover.</p>

            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "var(--space-4)",
                marginBottom: "var(--space-4)",
              }}
            >
              {[
                "90-minute consulting session",
                "Written Blueprint document",
                "Full implementation roadmap",
                "Delivered within 7 business days",
              ].map((item, i) => (
                <div className="deliverable-item mb-2" key={i}>
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

            <div className="blueprint-credit-note">
              <svg viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                <path d="M8 5v4M8 11v0.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span>
                We design the system. We do not build it. Take the architecture
                to your own team, your own developer, or to implementation
                partners we can point you to.
              </span>
            </div>

            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "var(--text-3)",
                marginTop: "var(--space-3)",
              }}
            >
              Applications reviewed within 48 hours.
              <br />
              Not all applications are accepted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
