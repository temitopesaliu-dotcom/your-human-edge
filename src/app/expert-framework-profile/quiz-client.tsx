'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import {
  BUYERS, BUYER_OTHER, CLIENTS_FROM, COUNTRIES, DOMAINS, DOMAIN_EXAMPLES, DOMAIN_OTHER, DOMAIN_SHORT,
  PAID, SELL, SITUATIONS, YEARS,
} from '@/lib/efp/data';

type Win = Window & { fbq?: (...args: unknown[]) => void; gtag?: (...args: unknown[]) => void };

const SAMPLES = [
  { tab: 'Sales', acc: '#b45309', gap: 'One founder’s first sales playbook is worth $7,500. He’s been building them by the hour.', brand: 'The Founder Sales Playbook', navcta: 'Book a Teardown', kicker: 'Sales systems for founder-led startups', h1: 'You’re still the only one who can close. I’ll build the system so you don’t have to be.', lede: 'A 6-week engagement that turns how you sell into a playbook your first sales hire can run.', band: [['12%→31%', 'win rate in two quarters'], ['6 wks', 'to a written playbook'], ['8+ yrs', 'closing B2B deals'], ['1', 'playbook your hire can run']], peek: [['Entry', '$1,500'], ['Core', '$7,500'], ['Premium', '$3,000 / month']] },
  { tab: 'HR & L&D', acc: '#0f766e', gap: 'One cohort of her programme is worth ₦2.8M to one company.', brand: 'The First 90 Days Manager Lab', navcta: 'Book the Diagnostic', kicker: 'Manager development for fast-growing companies', h1: 'Your best performers just became managers. I’ll make sure their teams don’t pay for it.', lede: 'A 6-week in-company programme that turns first-time managers into leaders people stay for.', band: [['6', 'managers coached'], ['30%→8%', 'attrition in 12 months'], ['6 wks', 'programme'], ['1', 'report for the CEO']], peek: [['Entry', '₦450,000'], ['Core', '₦2,800,000'], ['Premium', '₦1.2M / month']] },
  { tab: 'Finance', acc: '#1d4ed8', gap: 'The £38k he found is worth more than his first ten clients will pay him.', brand: 'Profit Clarity Partner', navcta: 'Book an X-Ray', kicker: 'Finance partner for owner-run businesses', h1: 'You’re busy and you’re selling. I’ll show you where the money’s going, and how to keep it.', lede: 'A done-with-you finance partner who finds the leaks and helps you plug them.', band: [['£38k', 'recovered for one client'], ['2 wks', 'to your real profit'], ['15+ yrs', 'in finance'], ['1', 'page dashboard']], peek: [['Entry', '£650'], ['Core', '£2,400'], ['Premium', '£750 / month']] },
];

const LOG = ['Reading your 10 answers', 'Mapping your expert layer', 'Naming your offer', 'Writing your homepage', 'Pricing your offer', 'Mapping your buyer', 'Finding your 12 companies', 'Putting your name on it'];

interface A {
  domain: number | null; domainOther: string; years: number | null; situation: number | null;
  country: string; countryQuery: string; city: string; clientsFrom: number | null;
  buyer: number | null; buyerOther: string; problem: string; tried: string; result: string; noResultYet: boolean;
  paid: number | null; sellFirst: number | null; firstName: string; lastName: string; email: string; consent: boolean;
}
const EMPTY: A = {
  domain: null, domainOther: '', years: null, situation: null, country: '', countryQuery: '', city: '', clientsFrom: null,
  buyer: null, buyerOther: '', problem: '', tried: '', result: '', noResultYet: false, paid: null, sellFirst: null,
  firstName: '', lastName: '', email: '', consent: false,
};

const TOTAL = 10;
const txt = (s: string) => s.trim();

function Options({ options, value, onPick, label }: { options: readonly string[]; value: number | null; onPick: (i: number) => void; label: string }) {
  return (
    <div className="efp-opts" role="radiogroup" aria-label={label}>
      {options.map((o, i) => (
        <button type="button" key={o} className="efp-opt" role="radio" aria-checked={value === i} onClick={() => onPick(i)}>
          <span className="efp-r" />{o}
        </button>
      ))}
    </div>
  );
}

export default function QuizClient() {
  const [sample, setSample] = useState(0);
  const [step, setStep] = useState(0);
  const [a, setA] = useState<A>(EMPTY);
  const [phase, setPhase] = useState<'quiz' | 'building' | 'error'>('quiz');
  const [done, setDone] = useState(0);
  const [error, setError] = useState('');
  const [listOpen, setListOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [countryBad, setCountryBad] = useState(false);
  const meta = useRef<{ utm: Record<string, string>; referrer: string }>({ utm: {}, referrer: '' });
  const quizRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    (['source', 'medium', 'campaign'] as const).forEach((k) => { const v = p.get(`utm_${k}`); if (v) utm[k] = v; });
    meta.current = { utm, referrer: document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : '' };
  }, []);

  const set = useCallback(<K extends keyof A>(k: K, v: A[K]) => setA((prev) => ({ ...prev, [k]: v })), []);

  const matches = useMemo(() => {
    const v = a.countryQuery.trim().toLowerCase();
    if (v.length < 2 || a.country === a.countryQuery) return [];
    const starts = COUNTRIES.filter((c) => c.toLowerCase().startsWith(v));
    return (starts.length ? starts : COUNTRIES.filter((c) => c.toLowerCase().includes(v))).slice(0, 8);
  }, [a.countryQuery, a.country]);

  const pickCountry = (c: string) => { setA((p) => ({ ...p, country: c, countryQuery: c })); setListOpen(false); setActive(-1); setCountryBad(false); };

  const valid = (s: number): boolean => {
    switch (s) {
      case 0: return a.domain !== null && (a.domain !== DOMAIN_OTHER || txt(a.domainOther).length > 1);
      case 1: return a.years !== null;
      case 2: return a.situation !== null;
      case 3: return !!a.country && txt(a.city).length > 1 && a.clientsFrom !== null;
      case 4: return a.buyer !== null && (a.buyer !== BUYER_OTHER || txt(a.buyerOther).length > 1);
      case 5: return txt(a.problem).length > 3;
      case 6: return txt(a.tried).length > 3;
      case 7: return a.noResultYet || txt(a.result).length > 3;
      case 8: return a.paid !== null;
      case 9: return a.sellFirst !== null;
      case 10: return txt(a.firstName).length > 0 && txt(a.lastName).length > 0 && /\S+@\S+\.\S+/.test(a.email) && a.consent;
      default: return false;
    }
  };

  const ex = (k: 0 | 1 | 2) => {
    const d = a.domain;
    if (d === null || d === DOMAIN_OTHER) return { l: 'Example', x: DOMAIN_EXAMPLES[DOMAIN_EXAMPLES.length - 1][k] };
    return { l: `Example from ${DOMAIN_SHORT[d]}`, x: DOMAIN_EXAMPLES[d][k] };
  };

  const submit = async () => {
    setPhase('building'); setDone(0); setError('');
    const timer = window.setInterval(() => setDone((d) => Math.min(d + 1, LOG.length - 1)), 2600);
    try {
      const payload = (attempt: number) => JSON.stringify({
          attempt,
          domain: a.domain, domainOther: a.domainOther, years: a.years, situation: a.situation,
          country: a.country, city: a.city, clientsFrom: a.clientsFrom, buyer: a.buyer, buyerOther: a.buyerOther,
          problem: a.problem, tried: a.tried, result: a.result, noResultYet: a.noResultYet,
          paid: a.paid, sellFirst: a.sellFirst, firstName: a.firstName, lastName: a.lastName, email: a.email, consent: a.consent,
          utm: meta.current.utm, referrer: meta.current.referrer,
        });
      const post = (attempt: number) => fetch('/api/efp/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload(attempt) });
      let res = await post(1);
      // If the AI could not finish, try once more quietly before asking the person to retry.
      if (res.status === 502) res = await post(2);
      const data = (await res.json().catch(() => ({}))) as { code?: string; submissionId?: string; error?: string };
      window.clearInterval(timer);
      if (!res.ok || !data.code) throw new Error(data.error || 'Something went wrong. Please try again.');
      setDone(LOG.length);
      const w = window as Win;
      w.fbq?.('track', 'Lead', { content_name: 'Expert Framework Profile' }, { eventID: data.submissionId });
      w.gtag?.('event', 'efp_submit', { quiz_version: 'efp-v1' });
      window.setTimeout(() => window.location.assign(`/expert-framework-profile/results/${data.code}`), 500);
    } catch (e) {
      window.clearInterval(timer);
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setPhase('error');
    }
  };

  const next = () => {
    if (!valid(step)) return;
    if (step < TOTAL) { setStep(step + 1); quizRef.current?.scrollIntoView({ block: 'start' }); return; }
    void submit();
  };

  const onCountryKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setListOpen(true); setActive((i) => Math.min(matches.length - 1, i + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    else if (e.key === 'Enter' && matches.length) { e.preventDefault(); pickCountry(matches[active >= 0 ? active : 0]); }
    else if (e.key === 'Escape') setListOpen(false);
  };

  const s = SAMPLES[sample];
  const isGate = step === TOTAL;
  const header = (q: string, help: string, example: { l: string; x: string }) => (
    <>
      <p className="efp-qn">{isGate ? 'Almost there' : `Question ${step + 1} of ${TOTAL}`}</p>
      <h3>{q} <span className="efp-req" aria-hidden="true">*</span></h3>
      <p className="efp-help">{help}</p>
      <p className="efp-ex"><b>{example.l}:</b> {example.x}</p>
      <p className="efp-help" style={{ fontSize: 12.5, margin: '0 0 16px' }}>* Required</p>
    </>
  );

  const body = () => {
    switch (step) {
      case 0: return (<>
        {header('What is the primary domain you work in?', 'Pick the closest match. This shapes every part of your build, including the examples on the next questions.', { l: 'Example', x: 'Someone who runs payroll, hiring and training for a company picks “HR / People / Talent / L&D”.' })}
        <Options options={DOMAINS} value={a.domain} onPick={(i) => set('domain', i)} label="Primary domain" />
        {a.domain === DOMAIN_OTHER && <input className="efp-mt" type="text" aria-label="Your field" placeholder="Type your field, e.g. Marine engineering" value={a.domainOther} onChange={(e) => set('domainOther', e.target.value)} />}
      </>);
      case 1: return (<>
        {header('How many years have you been doing this?', 'Your experience sets the prices in your build.', { l: 'Example', x: 'If you’ve worked in finance since 2012, pick “13 to 20 years”.' })}
        <Options options={YEARS} value={a.years} onPick={(i) => set('years', i)} label="Years" />
      </>);
      case 2: return (<>
        {header('Which best describes where you are right now?', 'Your offer is shaped around the time and freedom you actually have.', { l: 'Example', x: 'A nurse with a full-time job who wants to teach on the side picks “Employed full-time, want something on the side”.' })}
        <Options options={SITUATIONS} value={a.situation} onPick={(i) => set('situation', i)} label="Where you are right now" />
      </>);
      case 3: return (<>
        {header('Where are you based, and where do you want clients from?', 'Your prices are shown in your country’s currency, and your 12 companies are matched to where you are.', { l: 'Example', x: 'Manchester, United Kingdom. Clients from across my country.' })}
        <label className="efp-fl" htmlFor="efp-country">Country <span className="efp-req" aria-hidden="true">*</span></label>
        <div className="efp-combo">
          <input id="efp-country" type="text" role="combobox" aria-expanded={listOpen && matches.length > 0} aria-controls="efp-clist" aria-autocomplete="list" autoComplete="off"
            placeholder="Start typing, e.g. Ni…" value={a.countryQuery}
            onChange={(e) => { const v = e.target.value; setA((p) => ({ ...p, countryQuery: v, country: p.country === v ? p.country : '' })); setListOpen(true); setActive(-1); setCountryBad(false); }}
            onKeyDown={onCountryKey}
            onBlur={() => { const m = COUNTRIES.find((c) => c.toLowerCase() === a.countryQuery.trim().toLowerCase()); if (m) pickCountry(m); else { setListOpen(false); if (a.countryQuery.trim() && !a.country) setCountryBad(true); } }} />
          {listOpen && matches.length > 0 && (
            <ul id="efp-clist" className="efp-clist" role="listbox">
              {matches.map((c, i) => <li key={c} role="option" aria-selected={i === active} onMouseDown={(e) => { e.preventDefault(); pickCountry(c); }}>{c}</li>)}
            </ul>
          )}
        </div>
        <p className={`efp-cstat${countryBad ? ' efp-bad' : ''}`} aria-live="polite">{a.country ? `✓ ${a.country}` : countryBad ? 'Pick your country from the list.' : ''}</p>
        <label className="efp-fl" htmlFor="efp-city">City or town <span className="efp-req" aria-hidden="true">*</span></label>
        <input id="efp-city" type="text" autoComplete="address-level2" placeholder="e.g. Manchester" value={a.city} onChange={(e) => set('city', e.target.value)} />
        <p className="efp-fl">Where do your clients come from? <span className="efp-req" aria-hidden="true">*</span></p>
        <Options options={CLIENTS_FROM} value={a.clientsFrom} onPick={(i) => set('clientsFrom', i)} label="Where clients come from" />
      </>);
      case 4: return (<>
        {header('Who usually brings you this kind of problem?', 'Pick the one that brings it to you most. This decides who your build is selling to.', { l: 'Example', x: 'A bookkeeper whose clients are mostly restaurant and salon owners picks “Small business owners”. An aviation consultant who mostly trains flight schools picks “Other” and types “Flight schools”.' })}
        <Options options={BUYERS} value={a.buyer} onPick={(i) => set('buyer', i)} label="Who brings you the problem" />
        {a.buyer === BUYER_OTHER && <input className="efp-mt" type="text" aria-label="Who brings you the problem" placeholder="Who? e.g. Flight schools, airports" value={a.buyerOther} onChange={(e) => set('buyerOther', e.target.value)} />}
      </>);
      case 5: return (<>
        {header('When someone pulls you aside for help, what problem do they bring?', 'Use their words if you can.', ex(0))}
        <textarea aria-label="The problem in their words" placeholder="Describe the problem in their words…" value={a.problem} onChange={(e) => set('problem', e.target.value)} />
      </>);
      case 6: return (<>
        {header('What have they usually already tried before they come to you?', 'Think about what they say they’ve already spent time or money on.', ex(1))}
        <textarea aria-label="What they have already tried" placeholder="What didn’t work for them…" value={a.tried} onChange={(e) => set('tried', e.target.value)} />
      </>);
      case 7: return (<>
        {header('What’s the best result you’ve ever got someone?', 'Add a number if you have one. If you don’t have a result yet, tick the box below.', ex(2))}
        <textarea aria-label="Your best result" placeholder="The result, and what changed…" value={a.result} disabled={a.noResultYet} onChange={(e) => set('result', e.target.value)} />
        <button type="button" className="efp-optn" role="checkbox" aria-checked={a.noResultYet} onClick={() => set('noResultYet', !a.noResultYet)}><span className="efp-r" />I don’t have a result yet</button>
        {a.noResultYet && <p className="efp-help efp-mt">No problem. Your build will lead with your years in the field and what you’ll deliver, and won’t claim a result you haven’t had.</p>}
      </>);
      case 8: return (<>
        {header('Has anyone ever paid you for this outside your job?', 'No wrong answer. This sets where your pricing starts.', { l: 'Example', x: 'A finance professional who has helped friends’ businesses for free picks “Only helped people for free”.' })}
        <Options options={PAID} value={a.paid} onPick={(i) => set('paid', i)} label="Paid outside your job" />
      </>);
      case 9: return (<>
        {header('If this worked, what would you rather sell first?', 'Pick one. Your offer and your three prices are built around it.', { l: 'Example', x: 'A finance professional who would rather audit than coach picks “Project or audit”.' })}
        <Options options={SELL} value={a.sellFirst} onPick={(i) => set('sellFirst', i)} label="What to sell first" />
      </>);
      default: return (<>
        {header('What name should go on your build?', 'Your build appears on the next screen. We’ll also email you a copy.', { l: 'Example', x: 'Ada Okafor. Your website preview becomes www.adaokafor.com.' })}
        <label className="efp-fl" htmlFor="efp-name">First name <span className="efp-req" aria-hidden="true">*</span></label>
        <input id="efp-name" type="text" autoComplete="given-name" required value={a.firstName} onChange={(e) => set('firstName', e.target.value)} />
        <label className="efp-fl" htmlFor="efp-last">Last name <span className="efp-req" aria-hidden="true">*</span></label>
        <input id="efp-last" type="text" autoComplete="family-name" required value={a.lastName} onChange={(e) => set('lastName', e.target.value)} />
        <label className="efp-fl" htmlFor="efp-email">Email <span className="efp-req" aria-hidden="true">*</span></label>
        <input id="efp-email" type="email" autoComplete="email" required value={a.email} onChange={(e) => set('email', e.target.value)} />
        <label className="efp-consent"><input type="checkbox" checked={a.consent} onChange={(e) => set('consent', e.target.checked)} /> <span>Send me my build by email, and store my answers so this can improve. <span className="efp-req" aria-hidden="true">*</span></span></label>
      </>);
    }
  };

  return (
    <>
      <div className="efp-nav" role="navigation"><div className="efp-wrap"><b>Expert Framework Profile</b><a href="/resources">Free resources</a></div></div>

      <header className="efp-hero efp-wrap">
        <span className="efp-pill">Free profile assessment</span>
        <h1><span className="efp-soft">You have spent years getting good at something.</span> You have not spent a single day getting paid <em>what it is actually worth.</em></h1>
        <p className="efp-lede">Answer 10 questions and watch your expertise become an offer, a website with your name on it, three prices and 12 companies to send it to.</p>
        <div className="efp-facts"><div><b>5 min</b><span>to complete</span></div><div><b>10</b><span>questions</span></div><div><b>1</b><span>personalised build</span></div><div><b>Free</b><span>always</span></div></div>
        <a className="efp-btn" href="#quiz">Build my profile</a>
      </header>

      <section className="efp-wrap" aria-labelledby="efp-sample-h">
        <h2 id="efp-sample-h" className="efp-h2">This is what you&apos;ll get</h2>
        <p className="efp-sub">Here&apos;s an example. Pick one to look around.</p>
        <div className="efp-switch">
          {SAMPLES.map((x, i) => <button type="button" key={x.tab} aria-pressed={i === sample} onClick={() => setSample(i)}>{x.tab}</button>)}
          <a href="#quiz">Check yours</a>
        </div>
        <div className="efp-stagewrap">
          <div className="efp-browser" style={{ ['--acc' as string]: s.acc }}>
            <div className="efp-chrome"><div className="efp-dots"><i /><i /><i /></div><div className="efp-url">www.yourname.com</div></div>
            <div className="efp-gapline"><h3>{s.gap}</h3></div>
            <div className="efp-site" style={{ margin: '18px 30px 0', borderRadius: 14, border: '1px solid var(--ln)', overflow: 'hidden' }}>
              <div className="efp-snav"><b>{s.brand}</b><span className="efp-chip">{s.navcta}</span></div>
              <div className="efp-shero"><p className="efp-kick">{s.kicker}</p><h4>{s.h1}</h4><p>{s.lede}</p></div>
              <div className="efp-band">{s.band.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}</div>
            </div>
            <div className="efp-tiers" style={{ padding: '20px 30px 170px' }}>
              {s.peek.map(([t, p]) => <div className="efp-tier" key={t}><span className="efp-tag">{t}</span><div className="efp-price">{p}</div></div>)}
            </div>
          </div>
          <div className="efp-veil"><p>Yours will have your name, your offer, your prices and your 12 companies.</p><a className="efp-btn" href="#quiz">Build mine</a></div>
        </div>
      </section>

      <section className="efp-wrap" aria-labelledby="efp-in-h">
        <h2 id="efp-in-h" className="efp-h2">What&apos;s in your build</h2>
        <div className="efp-items">
          <div><b>Your offer</b><span>Named and shaped from what people already come to you for.</span></div>
          <div><b>Your website</b><span>A homepage preview with your name and your buyer&apos;s words.</span></div>
          <div><b>Your buyer</b><span>Who they are, what they want and what they&apos;re tired of.</span></div>
          <div><b>Three prices</b><span>Entry, core and premium, in your country&apos;s currency.</span></div>
          <div><b>12 companies</b><span>Large, medium and small, matched to your offer and city.</span></div>
        </div>
      </section>

      <section className="efp-quizsec" id="quiz" ref={quizRef} aria-label="The Expert Framework Profile">
        <div className="efp-wrap">
          <div className="efp-card">
            <div className="efp-bar">
              <div className="efp-track"><i style={{ width: `${phase === 'quiz' ? (isGate ? 100 : (step / TOTAL) * 100) : 100}%` }} /></div>
              <span>{phase !== 'quiz' ? 'Building' : isGate ? 'Last step' : `${step + 1} of ${TOTAL}`}</span>
            </div>
            {phase === 'quiz' ? (
              <>
                <div className="efp-body">{body()}</div>
                <div className="efp-nav2">
                  <button type="button" className="efp-back" style={{ visibility: step ? 'visible' : 'hidden' }} onClick={() => setStep(Math.max(0, step - 1))}>Back</button>
                  <button type="button" className="efp-next" disabled={!valid(step)} onClick={next}>{isGate ? 'Build my profile' : 'Continue'}</button>
                </div>
              </>
            ) : (
              <div className="efp-body" aria-live="polite">
                <p className="efp-qn">Building {a.firstName.trim().split(' ')[0]}&apos;s profile</p>
                <h3>{phase === 'error' ? 'That didn’t go through.' : 'This takes about 20 seconds.'}</h3>
                {phase === 'building' && <ul className="efp-log">{LOG.map((l, i) => <li key={l} className={i < done ? 'efp-done' : ''}>{l}</li>)}</ul>}
                {phase === 'error' && (<>
                  <p className="efp-err">{error}</p>
                  <div className="efp-ctarow"><button type="button" className="efp-next" onClick={() => void submit()}>Try again</button></div>
                </>)}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="efp-footer" role="contentinfo"><div className="efp-wrap">2026 Temitope Saliu. The Expert Framework Profile is proprietary methodology. All rights reserved.</div></div>
    </>
  );
}
