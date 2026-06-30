'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useEmailGate } from '@/lib/use-email-gate';
import EmailGateOverlay from '@/components/email-gate-overlay';
import SiteNav from '@/components/site-nav';

/* ─── Step data ─────────────────────────────────────────── */
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

/* ─── Sub-components ──────────────────────────────────────── */
function StepCard({ step, defaultOpen = false }: { step: typeof STEPS[0] & { toolkit?: string[]; toolkitLabel?: string }; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      border: `1px solid ${open ? '#4A90D9' : 'rgba(10,31,61,0.12)'}`,
      borderRadius: 4,
      marginBottom: 20,
      background: '#fff',
      overflow: 'hidden',
      transition: 'border-color 0.2s ease',
    }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', listStyle: 'none', cursor: 'pointer',
          padding: '26px 28px', display: 'flex', alignItems: 'center',
          gap: 22, background: 'none', border: 'none', textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <div style={{
          fontFamily: "'Archivo Black', sans-serif", fontSize: 34,
          WebkitTextStroke: open ? '0' : '1.5px #4A90D9',
          color: open ? '#4A90D9' : 'transparent',
          width: 56, flexShrink: 0, lineHeight: 1,
        }}>{step.num}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4A90D9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            {step.eyebrow}
          </div>
          <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: '#0A1F3D', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
            {step.title}
          </div>
        </div>
        <div style={{
          width: 30, height: 30, border: `1px solid ${open ? '#4A90D9' : 'rgba(10,31,61,0.12)'}`,
          borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', transition: 'transform 0.25s ease, background 0.2s ease',
          transform: open ? 'rotate(45deg)' : 'none',
          background: open ? '#4A90D9' : 'transparent',
          color: open ? '#fff' : '#0A1F3D', fontSize: 16,
        }} aria-hidden>+</div>
      </button>
      {open && (
        <div style={{ padding: '0 28px 32px 106px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32 }}
          className="mm-step-body"
        >
          <div>
            <p style={{ fontSize: 16, color: '#0A1F3D', fontWeight: 600, marginBottom: 12 }}>{step.lead}</p>
            <p style={{ fontSize: 15, color: '#3C4863', lineHeight: 1.7, marginBottom: 12 }}>{step.body}</p>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.03em', color: '#0A1F3D', background: '#DCEAFB', borderLeft: '3px solid #4A90D9', padding: '10px 14px', textTransform: 'uppercase' }}>
              {step.quote}
            </div>
          </div>
          {step.toolkit && (
            <div style={{ background: '#F7F9FC', border: '1px solid rgba(10,31,61,0.12)', borderRadius: 4, padding: '18px 20px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4A90D9', marginBottom: 10 }}>{step.toolkitLabel}</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {step.toolkit.map((item, i) => (
                  <li key={i} style={{ fontSize: 13.5, color: '#3C4863', paddingLeft: 18, position: 'relative', marginBottom: 9 }}>
                    <span style={{ position: 'absolute', left: 0, top: 0, color: '#4A90D9', fontWeight: 700, fontSize: 12 }}>✓</span>
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
    <div style={{ border: `1px solid ${open ? '#4A90D9' : 'rgba(10,31,61,0.12)'}`, borderRadius: 4, marginBottom: 20, background: '#fff', overflow: 'hidden', transition: 'border-color 0.2s ease' }}>
      <button type="button" onClick={() => setOpen(o => !o)} style={{ width: '100%', cursor: 'pointer', padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 22, background: 'none', border: 'none', textAlign: 'left' }} aria-expanded={open}>
        <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 34, WebkitTextStroke: open ? '0' : '1.5px #4A90D9', color: open ? '#4A90D9' : 'transparent', width: 56, flexShrink: 0, lineHeight: 1 }}>4</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4A90D9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{STEP_4.eyebrow}</div>
          <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: '#0A1F3D', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{STEP_4.title}</div>
        </div>
        <div style={{ width: 30, height: 30, border: `1px solid ${open ? '#4A90D9' : 'rgba(10,31,61,0.12)'}`, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.25s ease, background 0.2s ease', transform: open ? 'rotate(45deg)' : 'none', background: open ? '#4A90D9' : 'transparent', color: open ? '#fff' : '#0A1F3D', fontSize: 16 }} aria-hidden>+</div>
      </button>
      {open && (
        <div style={{ padding: '0 28px 32px 106px' }} className="mm-step-body">
          <p style={{ fontSize: 16, color: '#0A1F3D', fontWeight: 600, marginBottom: 12 }}>{STEP_4.lead}</p>
          <p style={{ fontSize: 15, color: '#3C4863', lineHeight: 1.7, marginBottom: 12 }}>{STEP_4.body}</p>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.03em', color: '#0A1F3D', background: '#DCEAFB', borderLeft: '3px solid #4A90D9', padding: '10px 14px', textTransform: 'uppercase', marginBottom: 20 }}>{STEP_4.quote}</div>
          <div style={{ background: '#fff', border: '1px solid rgba(10,31,61,0.12)', borderLeft: '4px solid #4A90D9', padding: 28, fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, lineHeight: 1.9, color: '#16243C' }}>
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
    <span style={{ background: '#DCEAFB', padding: '1px 6px', borderRadius: 2, color: '#0A1F3D', fontWeight: 600 }}>{children}</span>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export default function MergeMethodClient() {
  const {
    gatePhase, gateName, setGateName, gateEmail, setGateEmail,
    gateType, setGateType, gateError, gateSubmitting, handleGateSubmit,
  } = useEmailGate('the-merge-method');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        .mm-root { font-family: 'Archivo', sans-serif; background: #F7F9FC; color: #16243C; min-height: 100dvh; -webkit-font-smoothing: antialiased; }
        .mm-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100dvh; gap: 16px; }
        .mm-loading-spin { width: 40px; height: 40px; border-radius: 50%; border: 3px solid var(--border); border-top-color: #4A90D9; animation: mm-spin .8s linear infinite; }
        @keyframes mm-spin { to { transform: rotate(360deg); } }
        .mm-loading p { font-size: .88rem; color: var(--soft); }
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

        {/* ── HERO ── */}
        <header style={{ background: 'linear-gradient(180deg, #061327, #0A1F3D 80%)', backgroundImage: 'radial-gradient(circle at 85% 10%, rgba(74,144,217,0.35), transparent 45%), linear-gradient(180deg, #061327, #0A1F3D 80%)', color: '#fff', padding: '72px 0 64px', position: 'relative', overflow: 'hidden' }}>
          <div className="mm-wrap">
            <div className="mm-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 48, alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8BB8E8', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 24, height: 1, background: '#8BB8E8', display: 'inline-block' }} aria-hidden />
                  Lead Acquisition Framework
                </div>
                <h1 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(40px, 7vw, 76px)', lineHeight: 0.96, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
                  THE <span style={{ color: '#8BB8E8' }}>MERGE</span><br />METHOD
                </h1>
                <div style={{ fontSize: 15, color: '#DCEAFB', marginTop: 18, fontWeight: 500, letterSpacing: '0.02em' }}>by Temitope Saliu</div>
                <p style={{ marginTop: 36, maxWidth: 620, fontSize: 19, color: '#E7EEF8', fontWeight: 400, lineHeight: 1.6 }}>
                  I don&apos;t pitch. I merge. I find their exact systematic loophole, reverse engineer a custom case study of how to fix it, and personalize the breakdown completely and directly to the decision maker, relentlessly.
                </p>
                <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', gap: 32, flexWrap: 'wrap', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8BB8E8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <span>5 Steps</span>
                  <span>No Cold Pitching</span>
                  <span>Built To Use Today</span>
                </div>
              </div>
              <div>
                <div style={{ border: '1px solid rgba(139,184,232,0.35)', borderRadius: 6, padding: 10, background: 'rgba(255,255,255,0.03)', boxShadow: '0 30px 70px rgba(0,0,0,0.45)' }}>
                  <Image
                    src="/PHOTO-2026-06-30-14-06-40.jpg"
                    alt="The Merge Method framework by Temitope Saliu"
                    width={400}
                    height={400}
                    style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 3 }}
                  />
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8BB8E8', marginTop: 14, textAlign: 'center' }}>The original framework</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── WHY THIS WORKS ── */}
        <section style={{ background: '#fff', borderTop: '1px solid rgba(10,31,61,0.12)', borderBottom: '1px solid rgba(10,31,61,0.12)' }}>
          <div className="mm-wrap" style={{ padding: '64px 24px 0' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#4A90D9', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>Why This Works</div>
            <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(26px, 4vw, 38px)', color: '#0A1F3D', textTransform: 'uppercase', lineHeight: 1.05 }}>Pitches Get Ignored. Proof Gets Read.</h2>
            <p style={{ marginTop: 14, maxWidth: 640, fontSize: 16, color: '#4A5670', lineHeight: 1.7 }}>Most outreach leads with what you sell. The Merge leads with what&apos;s broken in their world, and proof you already fixed it. That single reversal changes whether the message gets read.</p>
          </div>
          <div className="mm-wrap" style={{ paddingTop: 32, paddingBottom: 48 }}>
            <div className="mm-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(10,31,61,0.12)', border: '1px solid rgba(10,31,61,0.12)' }}>
              {WHY_CARDS.map(c => (
                <div key={c.num} style={{ background: '#fff', padding: '28px 24px' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#4A90D9', marginBottom: 10 }}>{c.num}</div>
                  <h3 style={{ fontSize: 16, color: '#0A1F3D', marginBottom: 8, fontWeight: 800 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: '#5A6685', lineHeight: 1.6 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FIVE STEPS ── */}
        <section style={{ padding: '64px 0' }}>
          <div className="mm-wrap">
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#4A90D9', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>The Framework + The Toolkit</div>
              <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(26px, 4vw, 38px)', color: '#0A1F3D', textTransform: 'uppercase', lineHeight: 1.05 }}>Five Steps. Open Each One.</h2>
              <p style={{ marginTop: 14, maxWidth: 640, fontSize: 16, color: '#4A5670', lineHeight: 1.7 }}>Every step below has the method on the left and the exact toolkit to execute it on the right: where to look, what to ask, what to build.</p>
            </div>
            {STEPS.map((s, i) => <StepCard key={s.num} step={s} defaultOpen={i === 0} />)}
            <Step4Card />
            <StepCard step={STEP_5} />
          </div>
        </section>

        {/* ── WORKSHEET ── */}
        <section style={{ background: '#061327', color: '#fff', backgroundImage: 'radial-gradient(circle at 10% 90%, rgba(74,144,217,0.25), transparent 50%)', padding: '64px 0 56px' }}>
          <div className="mm-wrap">
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#8BB8E8', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>Worksheet</div>
            <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(26px, 4vw, 38px)', color: '#fff', textTransform: 'uppercase', lineHeight: 1.05 }}>Run This Before You Reach Out</h2>
            <p style={{ marginTop: 14, maxWidth: 640, fontSize: 16, color: '#DCEAFB', lineHeight: 1.7 }}>Four prompts. Answer them before you send anything. If you can&apos;t fill these in yet, you&apos;re not ready to merge. Go back to Step 1.</p>
            <div className="mm-ws-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 32 }}>
              {WORKSHEET.map(w => (
                <div key={w.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 4, padding: 22 }}>
                  <h4 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8BB8E8', marginBottom: 12 }}>{w.title}</h4>
                  <div style={{ borderBottom: '1px dashed rgba(255,255,255,0.25)', padding: '10px 0', fontSize: 14, color: '#C8D6EC' }}>
                    <span style={{ color: '#fff', fontWeight: 600, display: 'block', marginBottom: 6 }}>{w.q}</span>
                    _____________________________
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULT ── */}
        <section style={{ background: '#DCEAFB', borderTop: '1px solid rgba(10,31,61,0.12)' }}>
          <div className="mm-wrap">
            <div className="mm-result-inner" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28, alignItems: 'center', padding: '36px 0' }}>
              <svg width="56" height="56" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <polygon points="10,10 30,10 50,55 70,10 90,10 90,90 70,90 70,40 50,80 30,40 30,90 10,90" fill="#0A1F3D" />
              </svg>
              <div>
                <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: '#0A1F3D', textTransform: 'uppercase', marginBottom: 14 }}>The Result Of The Merge</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {['They see the flaw they couldn\'t.', 'They understand the fix they didn\'t have.', 'They trust the person who showed them — because it was built for them.'].map((li, i) => (
                    <li key={i} style={{ fontSize: 14, color: '#0A1F3D', marginBottom: 6, paddingLeft: 20, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#4A90D9' }} aria-hidden>○</span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: '#0A1F3D', textTransform: 'uppercase', lineHeight: 1.2, maxWidth: 220 }}>
                That&apos;s when the merge creates momentum.
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  );
}
