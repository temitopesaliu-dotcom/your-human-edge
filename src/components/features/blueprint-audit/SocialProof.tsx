export default function SocialProof() {
  return (
    <section
      className="social-proof section"
      id="proof"
      aria-labelledby="proof-heading"
    >
      <div className="container">
        <div className="section-header centered fade-up">
          <p className="label mb-3">Client Results</p>
          <h2 className="heading-1" id="proof-heading">
            From dependency to operational freedom.
          </h2>
        </div>

        <div className="testimonials-grid">
          {[
            {
              text: "Before this, I was answering the same 12 client questions every week. Now the AI handles all of them. I get notified only when something genuinely needs me. I got back 8 hours a week from day one.",
              name: "Sarah M.",
              role: "Executive Coach, 1:1 Practice",
            },
            {
              text: "My onboarding used to take me 3 hours per new client. Scheduling, contracts, emails, intake, kickoff. Now it's fully automated. I join the kickoff call and everything is already done. Game-changing for a solo consultant.",
              name: "James O.",
              role: "Strategy Consultant",
            },
            {
              text: "The Blueprint alone was worth the $1,000. I got clarity on what to build and in what order. We'd been spinning our wheels with tools for 18 months. In 90 minutes we had a clear architecture. That decision alone saved us months.",
              name: "Priya K.",
              role: "Founder, 12-person agency",
            },
          ].map((t, i) => (
            <div
              className={`testimonial-card fade-up${i > 0 ? ` delay-${i}` : ""}`}
              key={i}
            >
              <div className="testimonial-quote-mark" aria-hidden="true">
                &ldquo;
              </div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true"></div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="metrics-strip fade-up delay-1">
          {[
            { number: "8hrs", label: "Avg. weekly time recovered" },
            { number: "72hrs", label: "Avg. onboarding time → 20 min" },
            {
              number: "80%",
              label: "Of support queries resolved by AI",
            },
            {
              number: "4–10wk",
              label: "Typical implementation timeline",
            },
          ].map((m, i) => (
            <div className="metric-item" key={i}>
              <div className="metric-number">{m.number}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
