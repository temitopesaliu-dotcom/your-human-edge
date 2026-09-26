'use client';

import { useEffect, useState } from 'react';
import type { Workbook } from '@/lib/claude-quiz/workbooks';
import { WORKBOOK_PRICE_LABEL } from '@/lib/claude-quiz/levels';

const store = {
  get(k: string): string | null {
    try { return localStorage.getItem(k); } catch { return null; }
  },
  set(k: string, v: string) {
    try { localStorage.setItem(k, v); } catch { /* storage blocked: answers just won't persist */ }
  },
};

function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState('Copy');
  return (
    <button className="cq-copy" type="button" onClick={async () => {
      try { await navigator.clipboard.writeText(text); setLabel('Copied'); } catch { setLabel('Select and copy the text'); }
      setTimeout(() => setLabel('Copy'), 1600);
    }}>{label}</button>
  );
}

export default function WorkbookClient({ workbook: w, buyerName }: { workbook: Workbook; buyerName?: string }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const ids: string[] = [];
  w.parts.forEach((p, n) => {
    (p.ex || []).forEach((_, k) => ids.push(`${w.id}-e${n}-${k}`));
    (p.days || []).forEach((_, k) => ids.push(`${w.id}-d${k}`));
  });

  useEffect(() => {
    const loaded: Record<string, string> = {};
    ids.forEach((id) => { const v = store.get('cqwb:' + id); if (v) loaded[id] = v; });
    // Deferred so the first render matches the server HTML; storage is read after hydration.
    const t = setTimeout(() => setValues(loaded), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w.id]);

  const set = (id: string, v: string) => {
    setValues((cur) => ({ ...cur, [id]: v }));
    store.set('cqwb:' + id, v);
  };
  const done = ids.filter((id) => (values[id] || '').trim() && values[id] !== '0').length;

  return (
    <>
      <section className="cq-cover">
        <div className="kick">{w.lvl}</div>
        <h1>{w.title}</h1>
        <p>{w.promise}</p>
        <div className="meta"><span>{WORKBOOK_PRICE_LABEL} · Paid</span><span>{w.time}</span><span>Fill it in as you go</span></div>
      </section>
      <p className="cq-note">
        {buyerName ? `Welcome, ${buyerName.split(' ')[0]}. ` : 'Welcome. '}
        Bookmark this page. Your answers save in this browser, and the same link is in your email so you can come back
        any time.
      </p>
      <div className="cq-wprog">
        <span>{done} of {ids.length} done</span>
        <div className="cq-bar"><i style={{ width: `${ids.length ? (done / ids.length) * 100 : 0}%` }} /></div>
      </div>
      <nav className="cq-toc">
        <h3>Inside</h3>
        {w.parts.map((p, n) => <a key={n} href={`#${w.id}-p${n}`}><span>{n + 1}</span>{p.h}</a>)}
      </nav>

      {w.parts.map((p, n) => (
        <section className="cq-part" id={`${w.id}-p${n}`} key={n}>
          <div className="cq-part-no">Part {n + 1}</div>
          <h2>{p.h}</h2>
          {p.intro && <p>{p.intro}</p>}
          {(p.lessons || []).map((l, k) =>
            l.compare ? (
              <div className="cq-compare" key={k}>
                <div className="bad"><small>Weak ask</small>{l.compare[0]}</div>
                <div className="good"><small>Strong ask</small>{l.compare[1]}</div>
              </div>
            ) : (
              <div className="cq-lesson" key={k}>
                {l.h && <h3>{l.h}</h3>}
                {l.p && <p>{l.p}</p>}
                {l.list && <ul>{l.list.map((x, j) => <li key={j} dangerouslySetInnerHTML={{ __html: x }} />)}</ul>}
              </div>
            )
          )}
          {(p.prompts || []).map(([t, body], k) => (
            <div className="cq-pw" key={k}>
              <div className="ttl">{k + 1}. {t}</div>
              <div className="cq-prompt">{body}</div>
              <CopyButton text={body} />
            </div>
          ))}
          {(p.ex || []).map((e, k) => {
            const id = `${w.id}-e${n}-${k}`;
            return (
              <div className="cq-ex" key={id}>
                <div className="lbl">Your turn</div>
                <label htmlFor={id}>{e.q}</label>
                {e.hint && <div className="hint">{e.hint}</div>}
                <textarea id={id} value={values[id] || ''} onChange={(ev) => set(id, ev.target.value)} />
              </div>
            );
          })}
          {p.days && (
            <div className="cq-days">
              {p.days.map((d, k) => {
                const id = `${w.id}-d${k}`;
                const on = values[id] === '1';
                return (
                  <label className={'cq-day' + (on ? ' done' : '')} htmlFor={id} key={id}>
                    <input type="checkbox" id={id} checked={on} onChange={(ev) => set(id, ev.target.checked ? '1' : '0')} />
                    <div><b>Day {k + 1}</b><span>{d}</span></div>
                  </label>
                );
              })}
            </div>
          )}
        </section>
      ))}

      <div className="cq-next">
        <h3>{w.next[0]}</h3>
        <p>{w.next[1]}</p>
        <p><a href="/claude-quiz" style={{ color: '#6a5acd', fontWeight: 700 }}>Retake the Claude Level Quiz →</a></p>
      </div>
      <p className="cq-foot">© 2026 Temitope Saliu · Your Human Edge · For personal use by the buyer.</p>
    </>
  );
}
