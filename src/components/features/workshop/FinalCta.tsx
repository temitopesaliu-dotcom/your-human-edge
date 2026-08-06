export default function FinalCta() {
  return (
    <section className="ws-final-cta ws-section">
      <div className="ws-container">
        <div className="ws-final-cta-inner">
          <h2>
            <span className="ws-urgent-text--on-dark">Only 50 seats.</span> $99.
            <br />
            <em>August 15, 2026 · 2pm BST.</em>
          </h2>
          <p>
            This is the room where your expertise stops being invisible.
          </p>
          <div style={{ marginBottom: "2rem" }}>
            <div className="ws-final-price-original">$157 full price</div>
            <div className="ws-final-price-current">$99</div>
            <div className="ws-final-price-badge">
              Early access — closes soon
            </div>
          </div>
          <a
            className="ws-btn-final"
            href="https://buy.stripe.com/00waEYfgbdbGaob2en3oA0r"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reserve my seat now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <div className="ws-final-trust">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            Stripe checkout. Instant confirmation. Recording included.
          </div>
        </div>
      </div>
    </section>
  );
}
