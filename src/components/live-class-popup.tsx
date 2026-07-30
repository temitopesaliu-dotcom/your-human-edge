'use client';

import { useState, useEffect } from 'react';
import './live-class-popup.css';

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
        <div className="lcp-img-side">
          <div className="lcp-img-wrapper">
            <img
              src="/PHOTO-2026-06-19-12-56-31.jpg"
              alt="Live class host"
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

          <p className="lcp-label">Live Online Training</p>
          <h2 className="lcp-title">Your Intelligence Layer + AI</h2>

          <p className="lcp-date-line">Next cohort — August 15, 2026 · 2pm BST.</p>

          <button type="button" className="lcp-cta" onClick={handleRegister}>Register now →</button>
        </div>
      </div>
    </>
  );
}
