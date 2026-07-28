export default function About() {
  return (
    <section className="ws-about-section ws-section">
      <div className="ws-container">
        <div className="ws-about-inner">
          <div className="ws-about-img-wrap">
            <img
              src="/PHOTO-2026-06-19-12-56-31.jpg"
              alt="Temitope Saliu"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div className="ws-about-img-tag">
              <div className="ws-about-img-tag-name">Temitope Saliu</div>
              <div className="ws-about-img-tag-role">
                Solutions Architect, Strategist and Teacher
              </div>
            </div>
          </div>
          <div className="ws-about-content">
            <div className="ws-section-eyebrow">Who is running this</div>
            <h2>
              The system she wished existed when she started.
            </h2>
            <p>
              Temitope Saliu sits at the intersection of people, marketing &
              technology — building concepts & solutions architecture, GTM
              strategy for brands to increase revenue with the right people,
              structure and systems.
            </p>
            <p>
              In 2017, she sold a gold chain to fund her first digital
              marketing course.{" "}
              <strong>
                That decision — and everything built from it — is why she
                understands exactly what it costs to bet on yourself before
                anyone else does.
              </strong>{" "}
              The Intelligence Layer is the structured methodology she built
              from that journey.
            </p>
            <p>
              She does not teach AI basics. She teaches ambitious people how
              to take what they already know and build something the market
              will pay a premium for.
            </p>
            <div className="ws-creds-grid">
              {[
                "Google & Meta Elite Trainer — Trained 3000 professionals & Business Owners.",
                "1 of 20 Google Digital Skills Partners",
                "1 of 5 Microsoft Developer Programme Partner",
                "USAID & Peace Corp Education Curriculum Developer & Trainer for Peace Ambassadors",
                "Women Economic Forum Iconic Award Winner",
                "UK Global Exceptional Talent",
              ].map((cred) => (
                <div className="ws-cred-item" key={cred}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {cred}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
