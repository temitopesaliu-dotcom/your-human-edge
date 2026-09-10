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
            A defined path. No ambiguity. No wasted time on either side.<br></br>
            Most implementations range from $3,500-$10,000+ depending on complexity.
          </p>
        </div>

        <div className="timeline fade-up delay-1">
          <div className="timeline-step">
            <div className="timeline-number">1</div>
            <p className="timeline-step-label">First Step</p>
            <h3 className="timeline-step-title">Application</h3>
            <p className="timeline-step-desc">
              You complete a focused application that gives us the context
              needed to assess fit. No lengthy forms. No guesswork.
            </p>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">2</div>
            <p className="timeline-step-label">Within 48 hours</p>
            <h3 className="timeline-step-title">Review & Decision</h3>
            <p className="timeline-step-desc">
              We read your application properly and work out the architecture
              your situation needs. If it is a fit, you receive an acceptance
              email with your exact price and how to book. If it is not, we
              tell you clearly why and point you toward better options. Nothing
              is charged before you have that decision in writing.
            </p>
          </div>
          <div className="timeline-step highlight" data-default>
            <div className="timeline-number">3</div>
            <p className="timeline-step-label">The Starting Point</p>
            <h3 className="timeline-step-title">Blueprint Session</h3>
            <p className="timeline-step-desc">
              A focused 90-minute strategy session where we map your business,
              identify AI opportunities, and design the architecture of your
              operating system. This is a consulting engagement, not a sales
              call.
            </p>
            <span className="timeline-step-badge">
              From $1,000 — priced to your scope
            </span>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">4</div>
            <p className="timeline-step-label">Within 5 Business Days</p>
            <h3 className="timeline-step-title">Architecture Delivery</h3>
            <p className="timeline-step-desc">
              You receive a written Blueprint document with your workflow map,
              AI architecture, technology recommendations, priority matrix, the
              build sequence, and a costed estimate for the build itself.
            </p>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">5</div>
            <p className="timeline-step-label">Your Build, Your Way</p>
            <h3 className="timeline-step-title">Handover</h3>
            <p className="timeline-step-desc">
              You own the architecture. Take it to your own team, your own
              developer, or ask us to point you to implementation partners who
              build to this kind of specification. Either way you leave with a
              plan you can hand to anyone — not a dependency on us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
