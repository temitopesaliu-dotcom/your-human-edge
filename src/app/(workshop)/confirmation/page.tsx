export default function WorkshopConfirmationPage() {
  return (
    <>
      <style>{`
        :root {
          --white: #FFFFFF;
          --alabaster: #F8F7FC;
          --grain: #F5F5F3;
          --footer-bg: #EFECE6;
          --border: #E4E2ED;
          --purple: #7C3AED;
          --purple-light: #EDE9FD;
          --purple-mid: #C4B5FD;
          --green: #00A86B;
          --green-light: #E6F7F1;
          --text: #4A3E3D;
          --text-muted: #7A6E6D;
          --text-light: #A89E9D;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 20px;
          --shadow-lg: 0 12px 40px rgba(74,62,61,0.12), 0 4px 12px rgba(74,62,61,0.06);
          --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--text); line-height: 1.6; min-height: 100vh; }

        .ws-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,255,255,0.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 max(2rem, calc((100vw - 1100px)/2)); height: 60px; display: flex; align-items: center; justify-content: space-between; }
        .ws-nav-logo { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--text); text-decoration: none; }
        .ws-nav-logo span { color: var(--purple); }

        .ws-confirm-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 2rem 80px;
          background: var(--white);
          position: relative;
          overflow: hidden;
        }
        .ws-confirm-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 30%, #EDE9FD 0%, transparent 70%);
          pointer-events: none;
        }

        .ws-confirm-card {
          position: relative;
          z-index: 1;
          max-width: 560px;
          width: 100%;
          text-align: center;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 56px 48px;
        }

        .ws-confirm-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--green-light);
          border: 1px solid #B2E8D5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
          color: var(--green);
        }
        .ws-confirm-icon svg { width: 36px; height: 36px; }

        .ws-confirm-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 16px;
          letter-spacing: -0.5px;
          line-height: 1.25;
        }

        .ws-confirm-date {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--purple-light);
          border: 1px solid var(--purple-mid);
          border-radius: 999px;
          padding: 6px 18px;
          font-size: 13px;
          font-weight: 600;
          color: var(--purple);
          margin-bottom: 24px;
        }

        .ws-confirm-text {
          font-size: 16px;
          color: var(--text-muted);
          line-height: 1.75;
          margin-bottom: 32px;
        }

        .ws-confirm-divider {
          width: 48px;
          height: 2px;
          background: var(--border);
          margin: 0 auto 32px;
          border-radius: 1px;
        }

        .ws-confirm-email-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: var(--grain);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 16px 18px;
          text-align: left;
        }
        .ws-confirm-email-note svg { width: 18px; height: 18px; color: var(--purple); flex-shrink: 0; margin-top: 1px; }
        .ws-confirm-email-note p { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin: 0; }

        .ws-site-footer { background: var(--footer-bg); padding: 10px 0 32px; }
        .ws-footer-copy { font-size: 12px; color: var(--text-light); width: 100%; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
        .ws-container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

        @media (max-width: 600px) {
          .ws-confirm-card { padding: 40px 24px; }
          .ws-confirm-title { font-size: 24px; }
        }
      `}</style>

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
    </>
  );
}
