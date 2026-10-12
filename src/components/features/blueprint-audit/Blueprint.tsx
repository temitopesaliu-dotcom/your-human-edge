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
            Business Operating System Audit.
          </h2>
          <p className="body-lg mt-3">
            A consulting engagement with one
            purpose: clarity on exactly what your business operating system
            should look like and a plan for it.
          </p>
        </div>

        <div className="blueprint-grid">
          <div className="blueprint-info fade-up delay-1">
            <h3 className="heading-3 mb-3">
              What the Audit covers.
            </h3>
            <p className="body-md mb-4">
              In two hours, we map your business, identify the AI opportunities
              that matter, and design your first system around the way you
              actually work. Not a generic template.
            </p>

            <p className="label mb-3">What you receive</p>
            <div className="deliverables-list">
              {[
                "2-hour strategy session with Temitope",
                "A clear AI roadmap in priority order",
                "A recommended tool stack",
                "Your first system designed step by step",
                "Who should build it and what it should cost",
                "Summary document of your next steps",
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
              Why two prices
              </p>
              <p className="blueprint-why-text">Founder-led businesses with up to 20 people book the AI Strategy Session at $500.
                Companies with 21 or more people, or $2M+ in revenue, book the Leadership session at $1,500, for you and up to three of your leaders.
                The Blueprint quiz tells you which one fits before you pay anything.</p>
            </div>
          </div>

          <div className="blueprint-pricing-card fade-up delay-2">
            <p className="label mb-4">AI Strategy Session</p>
            <div className="price-row" style={{ marginBottom: "var(--space-3)" }}>
              <p className="price-prefix">From</p>
              <div>
                <span className="price-currency">$</span>
                <span className="price-amount">500</span>
              </div>
            </div>
            <p className="body-sm mb-4">$500 for founder-led businesses. $1,500 for leadership teams. Comes off your Full Solutions Architecture if you continue within 30 days.</p>

            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "var(--space-4)",
                marginBottom: "var(--space-4)",
              }}
            >
              {[
                "2 hours, one-to-one",
                "Summary document of next steps",
                "Your first system designed",
                "Pay, then pick your time",
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
              Get My Blueprint
            </Link>

            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "var(--text-3)",
                marginTop: "var(--space-3)",
              }}
            >
              Free. About three minutes.
              <br />
              Your best next step is shown on the spot.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
