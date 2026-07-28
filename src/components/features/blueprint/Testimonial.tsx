export default function Testimonial() {
  return (
    <section className="section-sm" aria-label="Client result">
      <div className="container">
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div className="testimonial-card fade-up" style={{ background: "transparent", border: "none", padding: 0 }}>
            <div className="testimonial-quote-mark" style={{ fontSize: 80, textAlign: "center" }}>
              &ldquo;
            </div>
            <p
              className="testimonial-text"
              style={{
                fontSize: 22,
                lineHeight: 1.5,
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
              }}
            >
              The Blueprint alone was worth the $1,000. I got clarity on what to
              build and in what order. We&apos;d been spinning our wheels with
              tools for 18 months. In 90 minutes we had a clear architecture.
              That decision alone saved us months.
            </p>
            <div
              className="testimonial-author"
              style={{ justifyContent: "center", marginTop: "var(--space-5)" }}
            >
              <div className="testimonial-avatar"></div>
              <div style={{ textAlign: "left" }}>
                <p className="testimonial-name">Priya K.</p>
                <p className="testimonial-role">Founder, 12-person agency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
