export default function Reframe() {
  return (
    <section
      className="reframe section-sm"
      id="reframe"
      aria-labelledby="reframe-heading"
    >
      <div className="container">
        <div className="section-header fade-up">
          <p className="label mb-3">A Different Way</p>
          <h2 className="heading-1" id="reframe-heading">
            The problem isn&apos;t your work ethic.
          </h2>
          <p className="body-lg mt-3">
            You&apos;ve been building a business around you, not a business
            that operates without you. Those are two different architectures.
          </p>
        </div>

        <div className="reframe-comparison fade-up delay-1">
          <div className="comparison-side old">
            <p className="comparison-side-label">Old Architecture</p>
            <div className="comparison-item">
              <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>You are the system</span>
            </div>
            <div className="comparison-item">
              <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>Knowledge lives in your head</span>
            </div>
            <div className="comparison-item">
              <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>Tools that don&apos;t talk to each other</span>
            </div>
            <div className="comparison-item">
              <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>Every task requires your attention</span>
            </div>
            <div className="comparison-item">
              <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>Growth multiplies your workload</span>
            </div>
            <div className="comparison-item">
              <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>Reactive. Chaotic. Exhausting.</span>
            </div>
          </div>

          <div className="comparison-divider" aria-hidden="true">
            <div className="comparison-divider-line"></div>
            <span className="comparison-divider-vs">vs</span>
            <div className="comparison-divider-line"></div>
          </div>

          <div className="comparison-side new">
            <p className="comparison-side-label">AI Operating System</p>
            {[
              "AI and process are the system",
              "Knowledge is documented and accessible",
              "Tools connected into one coherent layer",
              "Routine decisions handled without you",
              "Growth compounds instead of costs",
              "Proactive. Structured. Scalable.",
            ].map((text, i) => (
              <div className="comparison-item" key={i}>
                <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span dangerouslySetInnerHTML={{ __html: text }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
