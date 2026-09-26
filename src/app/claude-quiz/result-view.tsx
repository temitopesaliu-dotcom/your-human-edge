'use client';

import { useState } from 'react';
import { LEVELS, WORKBOOK_PRICE_LABEL, type QuizLevel } from '@/lib/claude-quiz/levels';
import { trackEvent } from '@/lib/services/analytics';

interface Props {
  level: QuizLevel;
  name?: string;
  email?: string;
  chatPct?: number;
  coworkPct?: number;
  /** true: just emailed · false: email failed · undefined: arrived from the email link */
  emailed?: boolean;
  onRetake?: () => void;
}

export default function ResultView({ level, name, email, chatPct, coworkPct, emailed, onRetake }: Props) {
  const [copyLabel, setCopyLabel] = useState('Copy prompt');
  const [buying, setBuying] = useState(false);
  const [buyErr, setBuyErr] = useState('');

  const hasScores = typeof chatPct === 'number' && typeof coworkPct === 'number';
  const gap = hasScores ? chatPct! - coworkPct! : 0;
  const gapNote =
    gap >= 20
      ? 'Your Chat skills are well ahead of your Cowork use. That gap is where your biggest time savings are.'
      : gap <= -20
        ? "You're using Cowork more than you're getting from Chat. Sharper conversations will make your handoffs better too."
        : 'Your Chat and Cowork skills are fairly even. Level up both together.';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(level.qp);
      setCopyLabel('Copied');
    } catch {
      setCopyLabel('Select the text above and copy it');
    }
    setTimeout(() => setCopyLabel('Copy prompt'), 1800);
  };

  const buy = async () => {
    setBuying(true);
    setBuyErr('');
    trackEvent('begin_checkout', { item_id: level.product, value: 9.99, currency: 'USD', source: 'claude-quiz' });
    try {
      const res = await fetch('/api/claude-quiz/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: level.n, email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch {
      setBuyErr("Checkout didn't open. Try again in a moment.");
      setBuying(false);
    }
  };

  const title = (name ? `${name}, you're ` : "You're ") + level.name.replace(/^The /, 'the ') + '.';

  return (
    <section className="cq-screen cq-stack">
      <div className="cq-res-head">
        <div className="cq-res-tag">Level {level.n} of 4</div>
        <h2>{title}</h2>
        <p>{level.sum}</p>
      </div>

      {emailed === true && <p className="cq-sent">We&apos;ve also sent this result to {email}. Check your inbox (and promotions tab).</p>}
      {emailed === false && <p className="cq-sent">Your result is below. We couldn&apos;t email a copy just now, so bookmark this page.</p>}

      <div className="cq-ladder">
        {LEVELS.map((l) => (
          <div key={l.n} className={'cq-rung' + (l.n === level.n ? ' here' : l.n === level.n + 1 ? ' next' : '')}>
            <small>Level {l.n}</small>
            {l.short}
          </div>
        ))}
      </div>

      {hasScores && (
        <>
          <div className="cq-scores">
            <div className="cq-score">
              <div className="lbl">Claude Chat</div>
              <div className="val">{chatPct}%</div>
              <div className="cq-meter"><i style={{ width: `${chatPct}%` }} /></div>
            </div>
            <div className="cq-score">
              <div className="lbl">Claude Cowork</div>
              <div className="val">{coworkPct}%</div>
              <div className="cq-meter"><i style={{ width: `${coworkPct}%` }} /></div>
            </div>
          </div>
          <p className="cq-fine">{gapNote}</p>
        </>
      )}

      <div className="cq-cols">
        <div className="cq-col">
          <h3>Where you are</h3>
          <ul>{level.now.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="cq-col to">
          <h3>Where you need to be</h3>
          <ul>{level.nxt.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>

      <div className="cq-quickwin">
        <h3>Try this today</h3>
        <p>{level.qw}</p>
        <div className="cq-prompt">{level.qp}</div>
        <button className="cq-copy" type="button" onClick={copy}>{copyLabel}</button>
      </div>

      <div className="cq-offer" id="workbook">
        <div className="kick">Your next step</div>
        <h3>{level.workbook}</h3>
        <p>{level.workbookDesc}</p>
        <ul>{level.workbookList.map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="row">
          <span className="price">{WORKBOOK_PRICE_LABEL}</span>
          <button className="cq-btn" type="button" onClick={buy} disabled={buying}>
            {buying ? 'Opening checkout…' : 'Get my workbook →'}
          </button>
        </div>
        {buyErr && <p className="cq-err" role="alert">{buyErr}</p>}
        <small>One-time payment in USD · Instant access online · Link also sent to your email · All sales are final (non-refundable)</small>
      </div>

      <p className="cq-others">
        Not quite right? Other levels:{' '}
        {LEVELS.filter((l) => l.n !== level.n).map((l, i, arr) => (
          <span key={l.n}>
            <a href={`/claude-quiz/result/${l.slug}`}>{l.short}</a>
            {i < arr.length - 1 ? ' · ' : ''}
          </span>
        ))}
      </p>

      <div>
        {onRetake ? (
          <button className="cq-link" type="button" onClick={onRetake}>↺ Retake the quiz</button>
        ) : (
          <a className="cq-link" href="/claude-quiz">↺ Take the quiz</a>
        )}
      </div>
    </section>
  );
}
