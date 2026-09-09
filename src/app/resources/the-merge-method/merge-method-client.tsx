'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useEmailGate } from '@/hooks/use-email-gate';
import EmailGateOverlay from '@/components/email-gate-overlay';
import SiteNav from '@/components/site-nav';

const STEPS = [
  {
    num: 1,
    eyebrow: 'Find The Loophole',
    title: 'Map Their System, Expose The Flaw',
    lead: 'No assumptions. Only proof.',
    body: 'Before you say a word to a prospect, you map how their system actually works — not how they say it works. You\'re hunting for the pattern they rely on that\'s quietly broken, and you don\'t move to outreach until you can prove the flaw with evidence, not opinion.',
    quote: 'No assumptions. Only proof.',
    toolkitLabel: 'Where To Look',
    toolkit: [
      'Job postings — what role are they hiring to patch this gap?',
      'Public reviews / G2 / Glassdoor for repeated complaints',
      'Their own content — what do they claim vs. what shows up live',
      'LinkedIn comments under their posts or their competitors\'',
      'Support forums, Reddit threads, industry Slack/Discord groups',
    ],
  },
  {
    num: 2,
    eyebrow: 'Reverse Engineer',
    title: 'Deconstruct The Broken System',
    lead: 'I don\'t guess solutions. I build them.',
    body: 'Once the loophole is exposed, you don\'t call it out and walk away. You figure out how to fix it. Deconstruct the broken process, identify the actual root cause (not the symptom), engineer the correct solution, then stress test it from every angle before you bring it to them.',
    quote: 'I don\'t guess solutions. I build them.',
    toolkitLabel: 'Questions To Force Root Cause',
    toolkit: [
      'What\'s the first point where this breaks — not where it\'s noticed?',
      'What would they have to change upstream to actually fix this?',
      'What\'s the cheapest version of the fix that still proves the point?',
      'Where would my fix fail if I tested it against their worst case?',
    ],
  },
  {
    num: 3,
    eyebrow: 'Custom Case Study',
    title: 'Build It Using Their Real Context',
    lead: 'Not generic. 100% their story.',
    body: 'This is the proof artifact. Build a short case study using their industry, their numbers, their real context — not a template with the name swapped in. Show exactly how the fix works inside their environment, specifically enough that it would be hard to fake and impossible to ignore.',
    quote: 'Not generic. 100% their story.',
    toolkitLabel: 'Case Study Skeleton',
    toolkit: [
      'The loophole — named, specific, theirs',
      'What it\'s costing them (time, leads, money, trust)',
      'The fix — mapped to their exact system, not a generic playbook',
      'The proof — a number, a mockup, a before/after',
      'One line: "here\'s what this looks like applied to you"',
    ],
  },
];

const STEP_4 = {
  num: 4,
  eyebrow: 'Personalise The Breakdown',
  title: 'Make It About Their Outcome, Not Mine',
  lead: 'This isn\'t a pitch. It\'s a message for them.',
  body: 'Tailor every word, every example, every point to the decision maker\'s actual priorities. Speak their language, not corporate fluff. The breakdown should read like it was written for one person, because it was.',
  quote: 'This isn\'t a pitch. It\'s a message for them.',
};

const STEP_5 = {
  num: 5,
  eyebrow: 'Relentless Follow Through',
  title: 'Close The Gap Between Insight And Action',
  lead: 'Relentless is my standard. Results are the goal.',
  body: 'One message rarely closes a deal. Follow up with precision, address objections before they\'re even raised, and keep showing up with value — not pressure — until the gap between insight and action closes.',
  quote: 'Relentless is my standard. Results are the goal.',
  toolkitLabel: 'Follow-Through Cadence',
  toolkit: [
    'Day 0: send the breakdown — no ask attached',
    'Day 3: add one more proof point or angle they hadn\'t considered',
    'Day 7: pre-empt their likely objection directly',
    'Day 14: short, low-pressure check-in — door left open',
    'Ongoing: keep showing up with value, not reminders',
  ],
};

const WHY_CARDS = [
  {
    num: '01',
    title: 'It\'s specific, not generic',
    body: 'You\'re not selling a category of fix. You\'re naming the exact loophole in their system, which proves you actually looked.',
  },
  {
    num: '02',
    title: 'It\'s proof, not promise',
    body: 'A custom case study built for them is evidence. Evidence doesn\'t need to be sold. It just needs to be seen.',
  },
  {
    num: '03',
    title: 'It\'s relentless, not random',
    body: 'One message is a guess. A structured follow-through closes the gap between "interesting" and "let\'s talk."',
  },
];

const WORKSHEET = [
  { title: 'The Loophole', q: 'What\'s the exact, named flaw in their system?' },
  { title: 'The Cost', q: 'What is this loophole actually costing them?' },
  { title: 'The Fix', q: 'What\'s the smallest proof I can build that this fix works?' },
  { title: 'The Decision Maker', q: 'Who specifically receives this, and what do they care about?' },
];

function StepCard({ step, defaultOpen = false }: { step: typeof STEPS[0] & { toolkit?: string[]; toolkitLabel?: string }; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      border: `1px solid ${open ? 'var(--ds-accent)' : 'var(--ds-border)'}`,
      borderRadius: 12,
      marginBottom: 16,
      background: 'var(--ds-surface)',
      boxShadow: 'var(--ds-shadow-card)',
      overflow: 'hidden',
      transition: 'border-color 0.2s ease',
    }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', listStyle: 'none', cursor: 'pointer',
          padding: '24px 26px', display: 'flex', alignItems: 'center',
          gap: 22, background: 'none', border: 'none', textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <div style={{
          fontFamily: 'var(--ds-font)', fontSize: 34, fontWeight: 700,
          WebkitTextStroke: open ? '0' : '1.5px var(--ds-accent)',
          color: open ? 'var(--ds-accent)' : 'transparent',
          width: 56, flexShrink: 0, lineHeight: 1,
        }}>{step.num}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--ds-font)', fontSize: 11, fontWeight: 600, color: 'var(--ds-accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 5 }}>
            {step.eyebrow}
          </div>
          <div style={{ fontFamily: 'var(--ds-font)', fontSize: 19, fontWeight: 700, color: 'var(--ds-ink)', letterSpacing: '-0.01em' }}>
            {step.title}
          </div>
        </div>
        <div style={{
          width: 30, height: 30, border: `1px solid ${open ? 'var(--ds-accent)' : 'var(--ds-border)'}`,
          borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', transition: 'transform 0.25s ease, background 0.2s ease',
          transform: open ? 'rotate(45deg)' : 'none',
          background: open ? 'var(--ds-accent)' : 'transparent',
          color: open ? '#fff' : 'var(--ds-ink)', fontSize: 16,
        }} aria-hidden>+</div>
      </button>
      {open && (
        <div style={{ padding: '0 26px 30px 104px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32 }}
          className="mm-step-body"
        >
          <div>
            <p style={{ fontSize: 16, color: 'var(--ds-ink)', fontWeight: 600, marginBottom: 12 }}>{step.lead}</p>
            <p style={{ fontSize: 15, color: 'var(--ds-body)', lineHeight: 1.7, marginBottom: 12 }}>{step.body}</p>
            <div style={{ fontFamily: 'var(--ds-font)', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--ds-accent-dark)', background: 'var(--ds-accent-soft)', borderLeft: '3px solid var(--ds-accent)', padding: '10px 14px', borderRadius: '0 8px 8px 0' }}>
              {step.quote}
            </div>
          </div>
          {step.toolkit && (
            <div style={{ background: 'var(--ds-tint)', border: '1px solid var(--ds-border)', borderRadius: 10, padding: '18px 20px' }}>
              <div style={{ fontFamily: 'var(--ds-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ds-accent)', marginBottom: 10 }}>{step.toolkitLabel}</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {step.toolkit.map((item, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: 'var(--ds-body)', paddingLeft: 18, position: 'relative', marginBottom: 9, lineHeight: 1.55 }}>
                    <span style={{ position: 'absolute', left: 0, top: 0, color: 'var(--ds-accent)', fontWeight: 700, fontSize: 12 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Step 4 — has script skeleton instead of toolkit list ── */
function Step4Card() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${open ? 'var(--ds-accent)' : 'var(--ds-border)'}`, borderRadius: 12, marginBottom: 16, background: 'var(--ds-surface)', boxShadow: 'var(--ds-shadow-card)', overflow: 'hidden', transition: 'border-color 0.2s ease' }}>
      <button type="button" onClick={() => setOpen(o => !o)} style={{ width: '100%', cursor: 'pointer', padding: '24px 26px', display: 'flex', alignItems: 'center', gap: 22, background: 'none', border: 'none', textAlign: 'left' }} aria-expanded={open}>
        <div style={{ fontFamily: 'var(--ds-font)', fontSize: 34, fontWeight: 700, WebkitTextStroke: open ? '0' : '1.5px var(--ds-accent)', color: open ? 'var(--ds-accent)' : 'transparent', width: 56, flexShrink: 0, lineHeight: 1 }}>4</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--ds-font)', fontSize: 11, fontWeight: 600, color: 'var(--ds-accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 5 }}>{STEP_4.eyebrow}</div>
          <div style={{ fontFamily: 'var(--ds-font)', fontSize: 19, fontWeight: 700, color: 'var(--ds-ink)', letterSpacing: '-0.01em' }}>{STEP_4.title}</div>
        </div>
        <div style={{ width: 30, height: 30, border: `1px solid ${open ? 'var(--ds-accent)' : 'var(--ds-border)'}`, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.25s ease, background 0.2s ease', transform: open ? 'rotate(45deg)' : 'none', background: open ? 'var(--ds-accent)' : 'transparent', color: open ? '#fff' : 'var(--ds-ink)', fontSize: 16 }} aria-hidden>+</div>
      </button>
      {open && (
        <div style={{ padding: '0 26px 30px 104px' }} className="mm-step-body">
          <p style={{ fontSize: 16, color: 'var(--ds-ink)', fontWeight: 600, marginBottom: 12 }}>{STEP_4.lead}</p>
          <p style={{ fontSize: 15, color: 'var(--ds-body)', lineHeight: 1.7, marginBottom: 12 }}>{STEP_4.body}</p>
          <div style={{ fontFamily: 'var(--ds-font)', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--ds-accent-dark)', background: 'var(--ds-accent-soft)', borderLeft: '3px solid var(--ds-accent)', padding: '10px 14px', borderRadius: '0 8px 8px 0', marginBottom: 20 }}>{STEP_4.quote}</div>
          <div style={{ background: 'var(--ds-tint)', border: '1px solid var(--ds-border)', borderLeft: '4px solid var(--ds-accent)', borderRadius: '0 10px 10px 0', padding: 26, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13.5, lineHeight: 1.9, color: 'var(--ds-ink)' }}>
            I noticed{' '}<Blank>[specific loophole, named precisely]</Blank>{' '}is happening in{' '}<Blank>[their system/process]</Blank>.<br /><br />
            It&apos;s likely costing{' '}<Blank>[concrete cost — time/leads/revenue]</Blank>.<br /><br />
            I built{' '}<Blank>[short case study/mockup]</Blank>{' '}showing exactly how to fix it, using{' '}<Blank>[their real numbers/context]</Blank>.<br /><br />
            Here&apos;s what it looks like applied directly to{' '}<Blank>[their company name]</Blank>:{' '}<Blank>[link or attachment]</Blank>
          </div>
        </div>
      )}
    </div>
  );
}

function Blank({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: 'var(--ds-accent-soft)', padding: '1px 6px', borderRadius: 4, color: 'var(--ds-accent-dark)', fontWeight: 600 }}>{children}</span>
  );
}

export default function MergeMethodClient() {
  const {
    gatePhase, gateName, setGateName, gateEmail, setGateEmail,
    gateType, setGateType, gateError, gateSubmitting, handleGateSubmit,
  } = useEmailGate('the-merge-method');

  return (
    <>
      <style>{`
        .mm-root { font-family: var(--ds-font); background: var(--ds-bg); color: var(--ds-ink); min-height: 100dvh; -webkit-font-smoothing: antialiased; }
        .mm-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100dvh; gap: 16px; }
        .mm-loading-spin { width: 40px; height: 40px; border-radius: 50%; border: 3px solid var(--ds-border); border-top-color: var(--ds-accent); animation: mm-spin .8s linear infinite; }
        @keyframes mm-spin { to { transform: rotate(360deg); } }
        .mm-loading p { font-size: .88rem; color: var(--ds-muted); }
        .mm-wrap { max-width: 920px; margin: 0 auto; padding: 0 24px; }
        @media (max-width: 720px) {
          .mm-step-body { grid-template-columns: 1fr !important; padding: 0 24px 28px 24px !important; }
          .mm-hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .mm-why-grid { grid-template-columns: 1fr !important; }
          .mm-ws-grid { grid-template-columns: 1fr !important; }
          .mm-result-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {gatePhase === null && (
        <div className="mm-loading">
          <div className="mm-loading-spin" />
          <p>Loading resource…</p>
        </div>
      )}

      <EmailGateOverlay
        gatePhase={gatePhase}
        title="The Merge Method"
        description="Enter your details below to unlock this free resource — and get notified when new resources drop."
        gateName={gateName} setGateName={setGateName}
        gateEmail={gateEmail} setGateEmail={setGateEmail}
        gateType={gateType} setGateType={setGateType}
        gateError={gateError}
        gateSubmitting={gateSubmitting}
        onSubmit={handleGateSubmit}
      />

      <div className="mm-root">
        <SiteNav />

        <header style={{ background: 'linear-gradient(180deg, var(--ds-tint), var(--ds-bg))', padding: '72px 0 64px', position: 'relative', overflow: 'hidden' }}>
          <div className="mm-wrap">
            <div className="mm-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 48, alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--ds-font)', fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ds-accent)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 24, height: 1, background: 'var(--ds-accent)', display: 'inline-block' }} aria-hidden />
                  Lead Acquisition Framework
                </div>
                <h1 style={{ fontFamily: 'var(--ds-font)', fontSize: 'clamp(38px, 6.5vw, 64px)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.02em', color: 'var(--ds-ink)' }}>
                  The <span style={{ color: 'var(--ds-accent)' }}>Merge</span><br />Method
                </h1>
                <div style={{ fontSize: 15, color: 'var(--ds-muted)', marginTop: 18, fontWeight: 500, letterSpacing: '0.02em' }}>by Temitope Saliu</div>
                <p style={{ marginTop: 32, maxWidth: 620, fontSize: 19, color: 'var(--ds-body)', fontWeight: 400, lineHeight: 1.6 }}>
                  I don&apos;t pitch. I merge. I find their exact systematic loophole, reverse engineer a custom case study of how to fix it, and personalize the breakdown completely and directly to the decision maker, relentlessly.
                </p>
                <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--ds-border)', display: 'flex', gap: 32, flexWrap: 'wrap', fontFamily: 'var(--ds-font)', fontSize: 12, fontWeight: 600, color: 'var(--ds-accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <span>5 Steps</span>
                  <span>No Cold Pitching</span>
                  <span>Built To Use Today</span>
                </div>
              </div>
              <div>
                <div style={{ border: '1px solid var(--ds-border)', borderRadius: 14, padding: 10, background: '#fff', boxShadow: 'var(--ds-shadow-pop)' }}>
                  <Image
                    src="/PHOTO-2026-06-30-14-06-40.jpg"
                    alt="The Merge Method framework by Temitope Saliu"
                    width={400}
                    height={400}
                    style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 8 }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--ds-font)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ds-muted)', marginTop: 14, textAlign: 'center' }}>The original framework</div>
              </div>
            </div>
          </div>
        </header>

        <section style={{ background: 'var(--ds-bg)', borderTop: '1px solid var(--ds-border)', borderBottom: '1px solid var(--ds-border)' }}>
          <div className="mm-wrap" style={{ padding: '64px 24px 0' }}>
            <div style={{ fontFamily: 'var(--ds-font)', fontSize: 12, fontWeight: 600, color: 'var(--ds-accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>Why This Works</div>
            <h2 style={{ fontFamily: 'var(--ds-font)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, color: 'var(--ds-ink)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Pitches Get Ignored. Proof Gets Read.</h2>
            <p style={{ marginTop: 14, maxWidth: 640, fontSize: 16, color: 'var(--ds-muted)', lineHeight: 1.7 }}>Most outreach leads with what you sell. The Merge leads with what&apos;s broken in their world, and proof you already fixed it. That single reversal changes whether the message gets read.</p>
          </div>
          <div className="mm-wrap" style={{ paddingTop: 32, paddingBottom: 48 }}>
            <div className="mm-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {WHY_CARDS.map(c => (
                <div key={c.num} style={{ background: 'var(--ds-tint)', border: '1px solid var(--ds-border)', borderRadius: 12, padding: '28px 24px' }}>
                  <div style={{ fontFamily: 'var(--ds-font)', fontSize: 12, fontWeight: 700, color: 'var(--ds-accent)', marginBottom: 10 }}>{c.num}</div>
                  <h3 style={{ fontSize: 16, color: 'var(--ds-ink)', marginBottom: 8, fontWeight: 700 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--ds-muted)', lineHeight: 1.6 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 0' }}>
          <div className="mm-wrap">
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'var(--ds-font)', fontSize: 12, fontWeight: 600, color: 'var(--ds-accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>The Framework + The Toolkit</div>
              <h2 style={{ fontFamily: 'var(--ds-font)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, color: 'var(--ds-ink)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Five Steps. Open Each One.</h2>
              <p style={{ marginTop: 14, maxWidth: 640, fontSize: 16, color: 'var(--ds-muted)', lineHeight: 1.7 }}>Every step below has the method on the left and the exact toolkit to execute it on the right: where to look, what to ask, what to build.</p>
            </div>
            {STEPS.map((s, i) => <StepCard key={s.num} step={s} defaultOpen={i === 0} />)}
            <Step4Card />
            <StepCard step={STEP_5} />
          </div>
        </section>

        <section style={{ background: 'var(--ds-tint)', borderTop: '1px solid var(--ds-border)', borderBottom: '1px solid var(--ds-border)', padding: '64px 0 56px' }}>
          <div className="mm-wrap">
            <div style={{ fontFamily: 'var(--ds-font)', fontSize: 12, fontWeight: 600, color: 'var(--ds-accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>Worksheet</div>
            <h2 style={{ fontFamily: 'var(--ds-font)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 700, color: 'var(--ds-ink)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Run This Before You Reach Out</h2>
            <p style={{ marginTop: 14, maxWidth: 640, fontSize: 16, color: 'var(--ds-muted)', lineHeight: 1.7 }}>Four prompts. Answer them before you send anything. If you can&apos;t fill these in yet, you&apos;re not ready to merge. Go back to Step 1.</p>
            <div className="mm-ws-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 32 }}>
              {WORKSHEET.map(w => (
                <div key={w.title} style={{ background: 'var(--ds-surface)', border: '1px solid var(--ds-border)', borderRadius: 12, padding: 22, boxShadow: 'var(--ds-shadow-card)' }}>
                  <h4 style={{ fontFamily: 'var(--ds-font)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ds-accent)', marginBottom: 12 }}>{w.title}</h4>
                  <div style={{ borderBottom: '1px dashed rgba(34, 31, 26, 0.25)', padding: '10px 0', fontSize: 14, color: 'var(--ds-muted)' }}>
                    <span style={{ color: 'var(--ds-ink)', fontWeight: 600, display: 'block', marginBottom: 6 }}>{w.q}</span>
                    _____________________________
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--ds-accent-soft)' }}>
          <div className="mm-wrap">
            <div className="mm-result-inner" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28, alignItems: 'center', padding: '36px 0' }}>
              <svg width="56" height="56" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <polygon points="10,10 30,10 50,55 70,10 90,10 90,90 70,90 70,40 50,80 30,40 30,90 10,90" fill="#221f1a" />
              </svg>
              <div>
                <h3 style={{ fontFamily: 'var(--ds-font)', fontSize: 18, fontWeight: 700, color: 'var(--ds-ink)', marginBottom: 14 }}>The Result Of The Merge</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {['They see the flaw they couldn\'t.', 'They understand the fix they didn\'t have.', 'They trust the person who showed them — because it was built for them.'].map((li, i) => (
                    <li key={i} style={{ fontSize: 14, color: 'var(--ds-ink)', marginBottom: 6, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--ds-accent)' }} aria-hidden>○</span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ fontFamily: 'var(--ds-font)', fontSize: 18, fontWeight: 700, color: 'var(--ds-ink)', lineHeight: 1.25, maxWidth: 220 }}>
                That&apos;s when the merge creates momentum.
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  );
}
