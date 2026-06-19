'use client';

import { useEffect, useState, useMemo } from 'react';
import { PromptCard } from './prompt-card';

interface Gate04PayoutProps {
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'NGN', symbol: '₦', rate: 1530 },
  { code: 'GHS', symbol: 'GH₵', rate: 14.5 },
  { code: 'KES', symbol: 'KSh', rate: 129 },
  { code: 'ZAR', symbol: 'R', rate: 18.5 },
  { code: 'INR', symbol: '₹', rate: 83 },
  { code: 'CAD', symbol: 'C$', rate: 1.37 },
  { code: 'AUD', symbol: 'A$', rate: 1.52 },
];

function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem('ai-for-coaches-' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function storageSet(key: string, val: unknown) {
  try { localStorage.setItem('ai-for-coaches-' + key, JSON.stringify(val)); } catch {}
}

const MON_BASE = {
  dp: [9, 197, 'per buyer'] as const,
  cm: [19, 99, 'per member / month'] as const,
  ss: [50, 500, '+ per session'] as const,
};

export function Gate04Payout({ copiedId, onCopy }: Gate04PayoutProps) {
  const [currencyCode, setCurrencyCode] = useState(() => storageGet('gate4-currency', 'USD'));

  useEffect(() => {
    storageSet('gate4-currency', currencyCode);
  }, [currencyCode]);

  const currency = useMemo(
    () => CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0],
    [currencyCode]
  );

  const r = (n: number) => Math.round(n * currency.rate).toLocaleString();

  return (
    <div>
      <div className="as-panel-head">
        <div>
          <h2 className="as-display">Pick your payout</h2>
          <p className="as-sub">Three ways to turn one offer into income — pick one to start, stack later.</p>
        </div>
      </div>

      <div className="as-currency-wrap">
        <span className="label">Show prices in</span>
        <select
          className="currency-select"
          value={currencyCode}
          onChange={e => setCurrencyCode(e.target.value)}
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
          ))}
        </select>
      </div>

      <div className="as-mon">
        <div className="as-mon-card">
          <div className="mh">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M8 9h8M8 13h5" />
            </svg>
            <h3>Digital products</h3>
          </div>
          <div className="mrange">{currency.symbol}{r(MON_BASE.dp[0])} – {currency.symbol}{r(MON_BASE.dp[1])} {MON_BASE.dp[2]}</div>
          <p>A template, mini-course, or guide. Build once, sell on repeat, lowest ongoing effort.</p>
          <div className="mtool">Launch with: <strong className="mtool-highlight">Stripe, Seller, Nestuge</strong></div>
        </div>
        <div className="as-mon-card">
          <div className="mh">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
              <circle cx="8" cy="9" r="3" /><circle cx="17" cy="9" r="3" />
              <path d="M3 19c0-3 2.5-5 5-5s5 2 5 5M13 19c0-2.5 2-4.5 4.5-4.5S22 16.5 22 19" />
            </svg>
            <h3>Online community</h3>
          </div>
          <div className="mrange">{currency.symbol}{r(MON_BASE.cm[0])} – {currency.symbol}{r(MON_BASE.cm[1])} {MON_BASE.cm[2]}</div>
          <p>A paid space for ongoing access to you. Recurring revenue, needs steady weekly presence.</p>
          <div className="mtool">Launch with: <strong className="mtool-highlight">Telegram, Whatsapp</strong></div>
        </div>
        <div className="as-mon-card">
          <div className="mh">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
            </svg>
            <h3>1:1 sessions</h3>
          </div>
          <div className="mrange">{currency.symbol}{r(MON_BASE.ss[0])} – {currency.symbol}{r(MON_BASE.ss[1])}{MON_BASE.ss[2]}</div>
          <p>Coaching or consulting calls. Highest price per hour, zero production needed — can start today.</p>
          <div className="mtool">Launch with: <strong className="mtool-highlight">Calendly + a booking link</strong></div>
        </div>
      </div>

      <div className="as-section-label">Prompt templates</div>
      <PromptCard
        id="p7"
        name="07 — Package my knowledge into a digital product"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`My offer is [paste your offer from Gate 03].

Turn this into a digital product outline: a title, a table of contents with 5-8 modules/sections, and for each section, 3 bullet points of exactly what's inside. Keep it something I could realistically create in one weekend using slides, a PDF, or short recorded videos.`}
      />
      <PromptCard
        id="p8"
        name="08 — Write my community launch post"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`I'm opening a paid community called [name] for [audience] who want [outcome].

Write me: 1) a launch post announcing it with the price, what's inside, and a deadline or cap on spots, 2) a welcome message for new members, and 3) three "first week" discussion prompts I can post on day 1, 2, and 3 to get members talking.`}
      />
      <PromptCard
        id="p9"
        name="09 — Build my 1:1 session structure"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`I want to offer 1:1 [coaching/consulting] calls in [topic] at $[price] per [session length].

Write me: a simple session structure (what happens in the first 10 minutes, the middle, and the last 5 minutes), 3 outcomes I should promise on my booking page, and a short script for how I introduce pricing if someone asks "how much" in a DM.`}
      />
    </div>
  );
}
