export default function Process() {
  return (
    <section
      className="process section"
      id="how-it-works"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <div className="section-header centered fade-up">
          <p className="label mb-3">The Process</p>
          <h2 className="heading-1" id="process-heading">
            From first conversation to running system.
          </h2>
          <p className="body-lg mt-3">
            A defined path. No ambiguity. No wasted time on either side.
          </p>
        </div>

        <div className="timeline fade-up delay-1">
          <div className="timeline-step">
            <div className="timeline-number">1</div>
            <p className="timeline-step-label">About three minutes</p>
            <h3 className="timeline-step-title">Your Blueprint</h3>
            <p className="timeline-step-desc">
              Tap through three short steps about your business. You get a
              first-draft architecture on the spot: where the time goes, the
              systems to build first, and your best next step.
            </p>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">2</div>
            <p className="timeline-step-label">Straight after</p>
            <h3 className="timeline-step-title">Book Your Session</h3>
            <p className="timeline-step-desc">
              If a session fits, you pay and pick your time in one go. Then a
              few questions about your business so the two hours start with
              architecture, not warm-up.
            </p>
          </div>
          <div className="timeline-step highlight" data-default>
            <div className="timeline-number">3</div>
            <p className="timeline-step-label">The Starting Point</p>
            <h3 className="timeline-step-title">AI Strategy Session</h3>
            <p className="timeline-step-desc">
              Two focused hours on your real business. We map where time and
              money leak, design your first system, and decide who should
              build it. You leave with a summary document of your next steps.
            </p>
            <span className="timeline-step-badge">
              From $500 · 2 hours
            </span>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">4</div>
            <p className="timeline-step-label">Within 7 Business Days</p>
            <h3 className="timeline-step-title">Full Solutions Architecture</h3>
            <p className="timeline-step-desc">
              If you continue: your workflow map, solutions architecture for
              every priority system, priority matrix, investment estimate and
              ROI map. From $2,500, less your session fee.
            </p>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">5</div>
            <p className="timeline-step-label">Your Plan, Your Way</p>
            <h3 className="timeline-step-title">Handover</h3>
            <p className="timeline-step-desc">
              You own the architecture. Your team or a recommended partner
              builds it, and Temitope can oversee the build so it lands the
              way it was designed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
