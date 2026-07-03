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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[9998] animate-[lcp-f_0.2s_ease]"
        onClick={handleDismiss}
        aria-hidden
        style={{ animation: 'lcp-f 0.2s ease' }}
      />

      {/* Card */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[min(92vw,400px)] bg-white text-[#1C1A17] rounded-[14px] px-6 pt-7 pb-[22px] shadow-[0_16px_48px_rgba(0,0,0,0.15)] font-[DM_Sans,system-ui,sans-serif]"
        role="dialog"
        aria-modal="true"
        aria-label="Live class"
        style={{ animation: 'lcp-u 0.25s ease' }}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-[10px] right-[10px] bg-black/[0.07] hover:bg-black/[0.14] hover:text-[#222] border-none text-[#777] w-[30px] h-[30px] rounded-full cursor-pointer flex items-center justify-center transition-[background,color] duration-200"
          onClick={handleDismiss}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <p className="text-[12px] font-bold tracking-[1.6px] uppercase text-black mb-1">
          Live Online Training
        </p>
        <h2 className="text-[clamp(18px,3.6vw,24px)] font-bold mb-2 leading-tight">
          AI for Teachers &amp; Coaches
        </h2>

        <p className="text-[13px] text-[#666] mb-[14px]">
          Saturday, 12 July 2026 · 4:00 PM BST
        </p>

        {/* Timezone grid */}
        <div className="flex flex-col gap-[2px] mb-4">
          {TIME_ZONES.map(tz => (
            <div
              key={tz.label}
              className={`flex items-center justify-between px-2 py-1 rounded text-[13px] ${
                tz.gold
                  ? 'bg-[#FFF6E6] border-l-[3px] border-[#E8A23B]'
                  : ''
              }`}
            >
              <span className="text-[#555]">{tz.label}</span>
              <span className={`font-mono text-[12px] ${tz.gold ? 'text-[#C98A2E] font-semibold' : 'text-[#888]'}`}>
                {tz.time}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="block w-full text-center bg-[#1C1A17] hover:bg-[#333] text-white text-[14px] font-semibold tracking-[0.6px] uppercase px-5 py-[11px] border-none rounded-[30px] cursor-pointer transition-[background] duration-200"
          onClick={handleRegister}
        >
          Register now →
        </button>
      </div>

      {/* Keyframe animations — minimal, can't be expressed in Tailwind */}
      <style>{`
        @keyframes lcp-f { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lcp-u {
          from { opacity: 0; transform: translate(-50%, -50%) translateY(10px) }
          to   { opacity: 1; transform: translate(-50%, -50%) translateY(0) }
        }
      `}</style>
    </>
  );
}
