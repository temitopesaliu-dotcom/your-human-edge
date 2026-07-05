'use client';

import { useState, useEffect } from 'react';

const TIME_ZONES = [
  { label: 'UK (BST)', time: '14:00 (2 PM)', gold: true },
  { label: 'GMT / UTC', time: '13:00 (1 PM)', gold: false },
  { label: 'Lagos (WAT)', time: '14:00 (2 PM)', gold: false },
  { label: 'Johannesburg (CAT)', time: '15:00 (3 PM)', gold: false },
  { label: 'Nairobi (EAT)', time: '16:00 (4 PM)', gold: false },
  { label: 'Mumbai (IST)', time: '19:30 (7:30 PM)', gold: false },
  { label: 'New York (EDT)', time: '09:00 (9 AM)', gold: false },
  { label: 'Chicago (CDT)', time: '08:00 (8 AM)', gold: false },
  { label: 'Los Angeles (PDT)', time: '06:00 (6 AM)', gold: false },
  { label: 'Sydney (AEST)', time: '23:00 (11 PM)', gold: false },
];

const POPUP_STORAGE_KEY = 'yhe_live_class_popup_dismissed';

function navigateToPricing() {
  const tryNav = () => {
    const gBtns = document.querySelectorAll<HTMLButtonElement>('.gatebtn');
    if (gBtns.length >= 6) gBtns[5]?.click();

    const wrap = document.querySelector<HTMLElement>('.as-pricing-wrap');
    if (wrap) {
      wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return true;
    }
    return false;
  };

  if (tryNav()) return;

  const poll = setInterval(() => {
    if (tryNav()) clearInterval(poll);
  }, 200);
  setTimeout(() => clearInterval(poll), 5000);
}

interface LiveClassPopupProps {
  onRegister?: () => void;
}

export default function LiveClassPopup({ onRegister }: LiveClassPopupProps = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = (() => {
      try { return localStorage.getItem(POPUP_STORAGE_KEY) === 'true'; } catch { return false; }
    })();
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    setVisible(false);
    try { localStorage.setItem(POPUP_STORAGE_KEY, 'true'); } catch { /* ignore */ }
  }

  function handleRegister() {
    setVisible(false);
    if (onRegister) {
      onRegister();
    } else {
      navigateToPricing();
    }
  }

  if (!visible) return null;

  return (
    <>
      <div className="lcp-backdrop" onClick={handleDismiss} aria-hidden />
      <div className="lcp-card" role="dialog" aria-modal="true" aria-label="Live class">
        {/* Image side with label stacked above image */}
        <div className="lcp-img-side">
          <div className="lcp-img-wrapper">
            <img
              src="/PHOTO-2026-06-19-12-56-31.jpg"
              alt="Live class host"
              className="lcp-img"
            />
          </div>
        </div>

        {/* Content side */}
        <div className="lcp-content">
          <button type="button" className="lcp-close" onClick={handleDismiss} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <p className="lcp-label">Live Online Training</p>
          <h2 className="lcp-title">Your Intelligence Layer + AI</h2>

          <p className="lcp-date-line">Saturday, 25 July 2026 · 2:00 PM BST</p>

          <div className="lcp-tz-grid">
            {TIME_ZONES.map(tz => (
              <div key={tz.label} className={'lcp-tz-row' + (tz.gold ? ' hl' : '')}>
                <span>{tz.label}</span>
                <span className="lcp-tz-val">{tz.time}</span>
              </div>
            ))}
          </div>

          <button type="button" className="lcp-cta" onClick={handleRegister}>Register now →</button>
        </div>
      </div>

      <style>{`
        .lcp-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(2px);
          z-index: 9998;
          animation: lcp-f .2s;
        }
        @keyframes lcp-f { from { opacity:0 } to { opacity:1 } }

        .lcp-card {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
          width: min(94vw, 720px);
          max-height: 90vh;
          display: flex;
          flex-direction: row;
          background: #fff;
          color: #1C1A17;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18);
          animation: lcp-u .3s;
          font-family: 'DM Sans', system-ui, sans-serif;
        }
        @keyframes lcp-u {
          from { opacity:0; transform:translate(-50%,-50%) translateY(12px) }
          to { opacity:1; transform:translate(-50%,-50%) translateY(0) }
        }

        .lcp-img-side {
          flex-shrink: 0;
          width: 280px;
          background: #f9f8f7;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start; /* stack from the top */
          padding: 12px 16px 16px 16px; /* reduced top padding */
          min-height: 360px;
        }

        .lcp-img-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.4px;
          color: #1C1A17;
          text-transform: uppercase;
          margin-bottom: 4px; /* tiny gap – almost hugging the image */
          text-align: center;
          background: none;
          padding: 0;
          line-height: 1.2;
        }

        .lcp-img-wrapper {
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          min-height: 0;
        }

        .lcp-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          max-height: 340px;
        }

        .lcp-content {
          flex: 1;
          padding: 28px 30px 26px 28px;
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          justify-content: center;
        }

        .lcp-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.06);
          border: none;
          color: #777;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .lcp-close:hover { background: rgba(0,0,0,0.12); color: #222; }

        .lcp-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          color: black;
          margin: 0 0 6px;
        }
        .lcp-title {
          font-size: clamp(20px, 3.2vw, 28px);
          font-weight: 700;
          margin: 0 0 6px;
          line-height: 1.2;
        }
        .lcp-date-line {
          font-size: 14px;
          color: #666;
          margin: 0 0 14px;
        }

        .lcp-tz-grid {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 18px;
        }
        .lcp-tz-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 13px;
        }
        .lcp-tz-row span { color: #555; }
        .lcp-tz-val {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #888;
        }
        .lcp-tz-row.hl {
          background: #FFF6E6;
          border-left: 4px solid #E8A23B;
        }
        .lcp-tz-row.hl .lcp-tz-val {
          color: #C98A2E;
          font-weight: 600;
        }

        .lcp-cta {
          display: block;
          width: 100%;
          text-align: center;
          background: #1C1A17;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 14px 20px;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          transition: background .2s, transform .1s;
          margin-top: auto;
        }
        .lcp-cta:hover { background: #333; }
        .lcp-cta:active { transform: scale(0.97); }
      `}</style>
    </>
  );
}
