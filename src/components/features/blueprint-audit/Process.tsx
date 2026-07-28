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
          <div className="timeline-step" data-default>
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
              We review your application and determine whether this
              engagement makes sense. If it does, you receive an acceptance
              email with next steps. If not, we tell you clearly why and
              point you toward better options.
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
              $1,000 — Credited to implementation
            </span>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">4</div>
            <p className="timeline-step-label">Within 5 Business Days</p>
            <h3 className="timeline-step-title">Roadmap Delivery</h3>
            <p className="timeline-step-desc">
              You receive a written Blueprint document with your workflow map,
              AI architecture, technology recommendations, priority matrix and
              implementation roadmap.
            </p>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">5</div>
            <p className="timeline-step-label">Your Decision</p>
            <h3 className="timeline-step-title">Proposal</h3>
            <p className="timeline-step-desc">
              If you choose to proceed with implementation, you receive a
              scoped proposal with timeline and investment. No pressure. The
              Blueprint has value whether or not you continue.
            </p>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">6</div>
            <p className="timeline-step-label">The Build</p>
            <h3 className="timeline-step-title">Implementation</h3>
            <p className="timeline-step-desc">
              We build your AI Operating System to specification. Projects
              typically run 4–10 weeks depending on scope. You have visibility
              throughout. Most implementations range from $3,500–$10,000+
              depending on complexity.
            </p>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">7</div>
            <p className="timeline-step-label">Ongoing</p>
            <h3 className="timeline-step-title">
              AI Optimization Partnership
            </h3>
            <p className="timeline-step-desc">
              Monthly improvements, new automations, performance reviews and
              quarterly strategy. Your operating system evolves as your
              business does.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
