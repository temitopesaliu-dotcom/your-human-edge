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

        <div className="testimonials-grid" style={{ gridTemplateColumns: "minmax(0, 720px)", justifyContent: "center" }}>
          {[
            {
              text: "The thinking behind the architecture is strong and we can clearly see how this can become a foundational operating system for the institution as we continue to scale.",
              name: "Olori",
              role: "Founder of a training institute, trade and export expert",
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
            { number: "3 min", label: "Your free AI blueprint" },
            { number: "2 hrs", label: "Strategy session with Temitope" },
            { number: "7 days", label: "Full solutions architecture delivered" },
            { number: "30 days", label: "To put your session fee toward the architecture" },
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
