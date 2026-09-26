'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { LEVELS, QUESTIONS, levelFromNumber, type QuizLevel } from '@/lib/claude-quiz/levels';
import { trackEvent } from '@/lib/services/analytics';
import ResultView from './result-view';

type Screen = 'intro' | 'q' | 'gate' | 'result';

interface Result {
  level: QuizLevel;
  chatPct: number;
  coworkPct: number;
  emailed: boolean;
}

export default function QuizClient() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => QUESTIONS.map(() => null));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const go = (s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0 });
  };

  const next = useCallback(() => {
    if (answers[i] === null) return;
    if (i < QUESTIONS.length - 1) setI(i + 1);
    else {
      trackEvent('claude_quiz_complete');
      go('gate');
    }
  }, [answers, i]);

  const choose = (k: number) => {
    const copy = [...answers];
    copy[i] = k;
    setAnswers(copy);
    const at = i;
    setTimeout(() => {
      setI((cur) => (cur === at && at < QUESTIONS.length - 1 ? at + 1 : cur));
      if (at === QUESTIONS.length - 1) {
        trackEvent('claude_quiz_complete');
        go('gate');
      }
    }, 260);
  };

  useEffect(() => {
    if (screen !== 'q') return;
    const onKey = (e: KeyboardEvent) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) choose(n - 1);
      if (e.key === 'Enter') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fn = name.trim();
    const em = email.trim();
    if (!fn) return setErr('Add your first name so we know who the result is for.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return setErr("That email doesn't look right. Check it and try again.");
    setErr('');
    setSending(true);
    try {
      const res = await fetch('/api/claude-quiz/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fn, email: em, answers }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSending(false);
        return setErr(data.error || 'Something went wrong. Try again.');
      }
      const level = levelFromNumber(data.level) ?? LEVELS[0];
      trackEvent('generate_lead', { source: 'claude-quiz', claude_level: level.n });
      setResult({ level, chatPct: data.chatPct, coworkPct: data.coworkPct, emailed: !!data.emailed });
      setSending(false);
      go('result');
    } catch {
      setSending(false);
      setErr('Network problem. Check your connection and try again.');
    }
  };

  const retake = () => {
    setAnswers(QUESTIONS.map(() => null));
    setI(0);
    setResult(null);
    go('intro');
  };

  const q = QUESTIONS[i];
  const pct = Math.round((i / QUESTIONS.length) * 100);

  return (
    <div className="cq-page">
      <div className="cq-wrap">
        <div className="cq-brand">
          <Link href="/"><b>Temitope Saliu</b> · Your Human Edge</Link>
          <span>Claude Level Quiz</span>
        </div>

        {screen === 'intro' && (
          <section className="cq-screen cq-stack cq-intro">
            <span className="cq-eyebrow">Free · 2 minutes · 10 questions</span>
            <h1>Where are you<br />with <em>Claude</em>?</h1>
            <p className="cq-lede">
              Most people use a fraction of what Claude can do and don&apos;t know it. Answer honestly and you&apos;ll see
              your level in Chat and in Cowork, what&apos;s holding you back, and the exact next step to take.
            </p>
            <div className="cq-facts"><span>No tech skills needed</span><span>Instant result</span><span>Personal next steps</span></div>
            <div>
              <button className="cq-btn" type="button" onClick={() => { trackEvent('claude_quiz_start'); setI(0); go('q'); }}>
                Start the quiz →
              </button>
            </div>
            <div className="cq-levels" aria-label="The four levels">
              {LEVELS.map((l) => <div key={l.n}><small>Level {l.n}</small>{l.short}</div>)}
            </div>
          </section>
        )}

        {screen === 'q' && (
          <section className="cq-screen cq-stack cq-q" key={i}>
            <div className="cq-progress"><span>Question {i + 1} of {QUESTIONS.length}</span><span>{pct}%</span></div>
            <div className="cq-bar"><i style={{ width: `${pct}%` }} /></div>
            <div className="cq-area">{q.area === 'chat' ? 'Claude Chat' : q.area === 'cowork' ? 'Claude Cowork' : 'Big picture'}</div>
            <h2>{q.q}</h2>
            <div className="cq-opts" role="radiogroup">
              {q.o.map((t, k) => (
                <button key={t} type="button" role="radio" aria-checked={answers[i] === k}
                  className={'cq-opt' + (answers[i] === k ? ' sel' : '')} onClick={() => choose(k)}>
                  <span className="cq-dot" /><span>{t}</span>
                </button>
              ))}
            </div>
            <div className="cq-nav">
              <button className="cq-link" type="button" onClick={() => (i > 0 ? setI(i - 1) : go('intro'))}>← Back</button>
              <button className="cq-btn" type="button" disabled={answers[i] === null} onClick={next}>
                {i === QUESTIONS.length - 1 ? 'See my result' : 'Next'}
              </button>
            </div>
          </section>
        )}

        {screen === 'gate' && (
          <section className="cq-screen">
            <div className="cq-card cq-gate cq-stack">
              <span className="cq-eyebrow" style={{ alignSelf: 'center' }}>Result ready</span>
              <h2>Where should we send your result?</h2>
              <p>You&apos;ll see it on the next screen, and get a copy by email with your next steps.</p>
              <form onSubmit={submit} noValidate>
                <label htmlFor="cq-fn">First name</label>
                <input id="cq-fn" autoComplete="given-name" placeholder="e.g. Ada" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="cq-em">Email</label>
                <input id="cq-em" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="cq-err" role="alert">{err}</div>
                <button className="cq-btn" type="submit" disabled={sending}>{sending ? 'Working out your level…' : 'Show my result →'}</button>
              </form>
              <p className="cq-fine">Occasional emails on using AI well. Unsubscribe anytime.</p>
              <button className="cq-link" type="button" onClick={() => { setI(QUESTIONS.length - 1); go('q'); }}>← Change my answers</button>
            </div>
          </section>
        )}

        {screen === 'result' && result && (
          <ResultView level={result.level} name={name.trim()} email={email.trim()} chatPct={result.chatPct}
            coworkPct={result.coworkPct} emailed={result.emailed} onRetake={retake} />
        )}
      </div>
    </div>
  );
}
