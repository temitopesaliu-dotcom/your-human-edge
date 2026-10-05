'use client';

import { useState, useEffect } from 'react';
import './live-class-popup.css';

// Same popup pattern as the workshop's LiveClassPopup, but with its own
// storage key so the two promotions don't suppress each other.
const POPUP_STORAGE_KEY = 'yhe_expert_framework_popup_last_shown_at';
const REAPPEAR_AFTER_MS = 24 * 60 * 60 * 1000; // once dismissed/shown, wait a day before showing again

export default function ExpertFrameworkPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const lastShownAt = (() => {
      try { return Number(localStorage.getItem(POPUP_STORAGE_KEY)) || 0; } catch { return 0; }
    })();
    const dueToReappear = Date.now() - lastShownAt > REAPPEAR_AFTER_MS;
    const timer = setTimeout(() => {
      if (dueToReappear) {
        setVisible(true);
        try { localStorage.setItem(POPUP_STORAGE_KEY, String(Date.now())); } catch { /* ignore */ }
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    setVisible(false);
  }

  function handleGo() {
    setVisible(false);
    window.location.href = '/expert-framework';
  }

  if (!visible) return null;

  return (
    <>
      <div className="lcp-backdrop" onClick={handleDismiss} aria-hidden />
      <div className="lcp-card" role="dialog" aria-modal="true" aria-label="The Expert Framework, self-paced course">
        <div className="lcp-img-side">
          <div className="lcp-img-wrapper">
            <img
              src="/PHOTO-2026-06-19-12-56-31.jpg"
              alt="Temitope Saliu"
              className="lcp-img"
            />
          </div>
        </div>

        <div className="lcp-content">
          <button type="button" className="lcp-close" onClick={handleDismiss} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <p className="lcp-label">Self-Paced Course</p>
          <h2 className="lcp-title">The Expert Framework</h2>

          <p className="lcp-date-line">
            From expertise to a live offer — watch the working session in under
            an hour. One payment, lifetime access.
          </p>

          <button type="button" className="lcp-cta" onClick={handleGo}>Get the course →</button>
        </div>
      </div>
    </>
  );
}
