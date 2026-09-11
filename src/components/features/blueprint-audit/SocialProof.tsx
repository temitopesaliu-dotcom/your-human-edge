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
              text: "For the first time i have a full visual representation of a full operating system for my business in one place.",
              name: "Sarah M.",
              role: "Executive Coach, 1:1 Practice",
            },
            {
              text: "You get so used to carrying a burden, you almost forget you're carrying one until Temi built my operating system and the weight fell right off. We now have so much time to do so many other things we've always wanted to do.",
              name: "James O.",
              role: "Strategy Consultant",
            },
            {
              text: "The thinking behind the architecture is strong and we can clearly see how this can become a foundational operating system for the institution as we continue to scale.",
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
              number: "48hrs",
              label: "Application to decision",
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
