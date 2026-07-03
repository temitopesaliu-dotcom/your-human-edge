import "../workshop.css";

export default function WorkshopConfirmationPage() {
  return (
    <div className="ws-root">
      
      {/* NAV */}
      <nav className="ws-nav">
        <a href="/" className="ws-nav-logo">
          Your Intelligence Layer + AI<span>.</span>
        </a>
      </nav>

      <section className="ws-confirm-section">
        <div className="ws-confirm-card">
          <div className="ws-confirm-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="ws-confirm-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            July 25th · 2PM London BST.
          </div>

          <h1 className="ws-confirm-title">
            Well done betting on yourself.
          </h1>

          <p className="ws-confirm-text">
            See you July 25th.
          </p>

          <div className="ws-confirm-divider" />

          <div className="ws-confirm-email-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <p>An email will be sent to you in due time with everything you need for the workshop.</p>
          </div>
        </div>
      </section>

      <footer className="ws-site-footer">
        <div>
        <div className="ws-footer-copy">
          2026 Temitope Saliu. The Intelligence Layer is a proprietary
          methodology. All rights reserved.
        </div>
        </div>
      </footer>
    </div>
  );
}
