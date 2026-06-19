'use client';

import { useEffect, useState } from 'react';
import { PromptCard } from './prompt-card';

interface Gate02FloorProps {
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

function storageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem('ai-for-coaches-' + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function storageSet(key: string, val: unknown) {
  try { localStorage.setItem('ai-for-coaches-' + key, JSON.stringify(val)); } catch {}
}

export function Gate02Floor({ copiedId, onCopy }: Gate02FloorProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => storageGet('platform-checklist', {}));
  const [streakDays, setStreakDays] = useState<{ days: number; done: boolean[] }>(() => storageGet('streak-data', { days: 30, done: [] }));

  const commitDays = streakDays.days || 30;
  const doneArr: boolean[] = streakDays.done || [];

  useEffect(() => {
    storageSet('platform-checklist', checked);
  }, [checked]);

  useEffect(() => {
    storageSet('streak-data', streakDays);
  }, [streakDays]);

  const handleCheck = (platform: string) => {
    setChecked(prev => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handleCommitChange = (days: number) => {
    const oldDone = streakDays.done || [];
    const newDone = new Array(days).fill(false).map((_, i) => !!oldDone[i]);
    setStreakDays({ days, done: newDone });
  };

  const toggleDay = (idx: number) => {
    const updated = [...doneArr];
    updated[idx] = !updated[idx];
    setStreakDays(prev => ({ ...prev, done: updated }));
  };

  const resetStreak = () => {
    setStreakDays(prev => ({ ...prev, done: new Array(prev.days).fill(false) }));
  };

  const totalDone = doneArr.filter(Boolean).length;
  let best = 0, run = 0;
  for (let i = 0; i < commitDays; i++) {
    if (doneArr[i]) { run++; best = Math.max(best, run); }
    else { run = 0; }
  }
  const pct = Math.round((totalDone / commitDays) * 100);

  const PLATFORMS = [
    { key: 'tiktok', label: 'TikTok' },
    { key: 'instagram', label: 'Instagram Reels' },
    { key: 'youtube', label: 'YouTube Shorts' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'threads', label: 'Threads / X' },
  ];

  return (
    <div>
      <div className="as-panel-head">
        <div>
          <h2 className="as-display">Open the floor</h2>
          <p className="as-sub">New accounts, daily reps, and the mindset that makes the algorithm trust you.</p>
        </div>
      </div>

      <div className="as-section-label">Step 1 — open your accounts</div>
      <div className="as-checklist">
        {PLATFORMS.map((p) => (
          <label key={p.key} className="as-check">
            <input
              type="checkbox"
              checked={!!checked[p.key]}
              onChange={() => handleCheck(p.key)}
            />
            <span>{p.label}</span>
          </label>
        ))}
      </div>

      <div className="as-section-label">Step 2 — the mindset</div>
      <div className="as-text-block">
        <p>
          Nobody goes viral on day one. The algorithm tests new accounts — it shows your first posts to small batches and watches what happens.{' '}
          <strong>Daily, unremarkable posting for 30–90 days is what builds the trust score</strong> that eventually gets one video shown to thousands.{' '}
          Consistency isn&apos;t the boring part before the strategy works — it <em>is</em> the strategy.
        </p>
      </div>

      <div className="as-section-label">Step 3 — pick your runway and start the streak</div>
      <div className="as-commit-wrap">
        <div className="as-commit">
          {[30, 60, 90].map((d) => (
            <button
              key={d}
              type="button"
              className={commitDays === d ? 'active' : ''}
              onClick={() => handleCommitChange(d)}
            >
              {d} days
            </button>
          ))}
        </div>
        <div className="as-stats">
          <div className="as-stat"><div className="n">{best}</div><div className="l">Best streak</div></div>
          <div className="as-stat"><div className="n">{totalDone}</div><div className="l">Days posted</div></div>
          <div className="as-stat"><div className="n">{pct}%</div><div className="l">Of plan complete</div></div>
        </div>
        <div className="as-grid">
          {Array.from({ length: commitDays }).map((_, i) => (
            <div
              key={i}
              className={`as-day${doneArr[i] ? ' done' : ''}`}
              onClick={() => toggleDay(i)}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <button type="button" className="as-reset" onClick={resetStreak}>Reset my streak tracker</button>
      </div>

      <div className="as-section-label" style={{ marginTop: 34 }}>Prompt template</div>
      <PromptCard
        id="p4"
        name="04 — Build my day-by-day content calendar"
        copiedId={copiedId}
        onCopy={onCopy}
        text={`I'm a [your role] teaching [your topic] to [your audience].

Build me a [30/60/90]-day content calendar for [platform(s)]. For each day give me just:
- The day number
- A one-line topic or hook idea
- The content type (story, quick tip, myth-bust, Q&A, behind-the-scenes, testimonial)

Rotate evenly through 4 content types: a personal story, a quick teaching tip, a myth I'm correcting, and a question from my audience. Don't write full scripts yet — just the day-by-day topic list.`}
      />
    </div>
  );
}
