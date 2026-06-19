'use client';

import { useState, useEffect } from 'react';

const TIME_ZONES = [
  { label: 'UK (BST)', time: '16:00 (4 PM)', gold: true },
  { label: 'GMT / UTC', time: '15:00 (3 PM)', gold: false },
  { label: 'Lagos (WAT)', time: '16:00 (4 PM)', gold: false },
  { label: 'Johannesburg (CAT)', time: '17:00 (5 PM)', gold: false },
  { label: 'Nairobi (EAT)', time: '18:00 (6 PM)', gold: false },
  { label: 'Mumbai (IST)', time: '20:30 (8:30 PM)', gold: false },
  { label: 'New York (EDT)', time: '11:00 (11 AM)', gold: false },
  { label: 'Chicago (CDT)', time: '10:00 (10 AM)', gold: false },
  { label: 'Los Angeles (PDT)', time: '08:00 (8 AM)', gold: false },
  { label: 'Sydney (AEST)', time: '01:00 (1 AM) next day', gold: false },
];

const POPUP_STORAGE_KEY = 'yhe_live_class_popup_dismissed';

/**
 * Navigate to Gate 6 pricing section. Handles the case where content
 * isn't rendered yet (behind email gate) by polling for it.
 */
function navigateToPricing() {
  const tryNav = () => {
    // Click the Gate 6 nav button
    const gBtns = document.querySelectorAll<HTMLButtonElement>('.gatebtn');
    if (gBtns.length >= 6) gBtns[5]?.click();

    const wrap = document.querySelector<HTMLElement>('.as-pricing-wrap');
    if (wrap) {
      wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return true;
    }
    return false;
  };

  // Try immediately
  if (tryNav()) return;

  // Keep trying for up to 5s (content may be behind email gate)
  const poll = setInterval(() => {
    if (tryNav()) clearInterval(poll);
  }, 200);
  setTimeout(() => clearInterval(poll), 5000);
}

export default function LiveClassPopup() {
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
    navigateToPricing();
  }

  if (!visible) return null;

  return (
    <>
      <div className="lcp-backdrop" onClick={handleDismiss} aria-hidden />
      <div className="lcp-card" role="dialog" aria-modal="true" aria-label="Live class">
        <button type="button" className="lcp-close" onClick={handleDismiss} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <p className="lcp-label">Live Online Training</p>
        <h2 className="lcp-title">AI for Teachers &amp; Coaches</h2>

        <p className="lcp-date-line">Saturday, 12 July 2026 · 4:00 PM BST</p>

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
          width: min(92vw, 400px);
          background: #fff;
          color: #1C1A17;
          border-radius: 14px;
          padding: 28px 24px 22px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.15);
          animation: lcp-u .25s;
          font-family: 'DM Sans', system-ui, sans-serif;
        }
        @keyframes lcp-u {
          from { opacity:0; transform:translate(-50%,-50%) translateY(10px) }
          to { opacity:1; transform:translate(-50%,-50%) translateY(0) }
        }

        .lcp-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0,0,0,0.07);
          border: none;
          color: #777;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .lcp-close:hover { background: rgba(0,0,0,0.14); color: #222; }

        .lcp-label {
          font-size: 12px;
          font-weight:700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: black;
          margin: 0 0 4px;
        }
        .lcp-title {
          font-size: clamp(18px, 3.6vw, 24px);
          font-weight: 700;
          margin: 0 0 8px;
          line-height: 1.2;
        }
        .lcp-date-line {
          font-size: 13px;
          color: #666;
          margin: 0 0 14px;
        }

        .lcp-tz-grid {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 16px;
        }
        .lcp-tz-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 8px;
          border-radius: 4px;
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
          border-left: 3px solid #E8A23B;
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
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          padding: 11px 20px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: background .2s;
        }
        .lcp-cta:hover { background: #333; }
      `}</style>
    </>
  );
}
