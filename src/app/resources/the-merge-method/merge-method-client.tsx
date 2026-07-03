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
type StepData = typeof STEPS[0] & { toolkit?: string[]; toolkitLabel?: string };

function StepCard({ step, defaultOpen = false }: { step: StepData; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`border rounded-[4px] mb-5 bg-white overflow-hidden transition-[border-color] duration-200 ${open ? 'border-[#4A90D9]' : 'border-[rgba(10,31,61,0.12)]'}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full cursor-pointer px-7 py-[26px] flex items-center gap-[22px] bg-transparent border-none text-left"
        aria-expanded={open}
      >
        <div
          className="font-['Archivo_Black',sans-serif] text-[34px] w-14 flex-shrink-0 leading-none"
          style={{
            WebkitTextStroke: open ? '0' : '1.5px #4A90D9',
            color: open ? '#4A90D9' : 'transparent',
          }}
        >
          {step.num}
        </div>
        <div className="flex-1">
          <div className="font-mono text-[11px] text-[#4A90D9] uppercase tracking-[0.1em] mb-1">
            {step.eyebrow}
          </div>
          <div className="font-['Archivo_Black',sans-serif] text-[20px] text-[#0A1F3D] uppercase tracking-[-0.01em]">
            {step.title}
          </div>
        </div>
        <div
          className={`w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center transition-[transform,background] duration-[250ms] ease text-base ${
            open
              ? 'border border-[#4A90D9] rotate-45 bg-[#4A90D9] text-white'
              : 'border border-[rgba(10,31,61,0.12)] bg-transparent text-[#0A1F3D]'
          }`}
          aria-hidden
        >
          +
        </div>
      </button>
      {open && (
        <div className="px-7 pb-8 pl-[106px] mm-step-body grid gap-8" style={{ gridTemplateColumns: '1.1fr 0.9fr' }}>
          <div>
            <p className="text-base text-[#0A1F3D] font-semibold mb-3">{step.lead}</p>
            <p className="text-[15px] text-[#3C4863] leading-[1.7] mb-3">{step.body}</p>
            <div className="font-mono text-[12px] tracking-[0.03em] text-[#0A1F3D] bg-[#DCEAFB] border-l-[3px] border-[#4A90D9] px-[14px] py-[10px] uppercase">
              {step.quote}
            </div>
          </div>
          {step.toolkit && (
            <div className="bg-[#F7F9FC] border border-[rgba(10,31,61,0.12)] rounded-[4px] px-5 py-[18px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#4A90D9] mb-[10px]">{step.toolkitLabel}</div>
              <ul className="list-none p-0 m-0">
                {step.toolkit.map((item, i) => (
                  <li key={i} className="text-[13.5px] text-[#3C4863] pl-[18px] relative mb-[9px]">
                    <span className="absolute left-0 top-0 text-[#4A90D9] font-bold text-[12px]">✓</span>
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
    <div className={`border rounded-[4px] mb-5 bg-white overflow-hidden transition-[border-color] duration-200 ${open ? 'border-[#4A90D9]' : 'border-[rgba(10,31,61,0.12)]'}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full cursor-pointer px-7 py-[26px] flex items-center gap-[22px] bg-transparent border-none text-left"
        aria-expanded={open}
      >
        <div
          className="font-['Archivo_Black',sans-serif] text-[34px] w-14 flex-shrink-0 leading-none"
          style={{
            WebkitTextStroke: open ? '0' : '1.5px #4A90D9',
            color: open ? '#4A90D9' : 'transparent',
          }}
        >
          4
        </div>
        <div className="flex-1">
          <div className="font-mono text-[11px] text-[#4A90D9] uppercase tracking-[0.1em] mb-1">{STEP_4.eyebrow}</div>
          <div className="font-['Archivo_Black',sans-serif] text-[20px] text-[#0A1F3D] uppercase tracking-[-0.01em]">{STEP_4.title}</div>
        </div>
        <div
          className={`w-[30px] h-[30px] rounded-full flex-shrink-0 flex items-center justify-center transition-[transform,background] duration-[250ms] ease text-base ${
            open
              ? 'border border-[#4A90D9] rotate-45 bg-[#4A90D9] text-white'
              : 'border border-[rgba(10,31,61,0.12)] bg-transparent text-[#0A1F3D]'
          }`}
          aria-hidden
        >
          +
        </div>
      </button>
      {open && (
        <div className="px-7 pb-8 pl-[106px] mm-step-body">
          <p className="text-base text-[#0A1F3D] font-semibold mb-3">{STEP_4.lead}</p>
          <p className="text-[15px] text-[#3C4863] leading-[1.7] mb-3">{STEP_4.body}</p>
          <div className="font-mono text-[12px] tracking-[0.03em] text-[#0A1F3D] bg-[#DCEAFB] border-l-[3px] border-[#4A90D9] px-[14px] py-[10px] uppercase mb-5">{STEP_4.quote}</div>
          <div className="bg-white border border-[rgba(10,31,61,0.12)] border-l-4 border-l-[#4A90D9] p-7 font-mono text-[13.5px] leading-[1.9] text-[#16243C]">
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
    <span className="bg-[#DCEAFB] px-[6px] py-[1px] rounded-[2px] text-[#0A1F3D] font-semibold">{children}</span>
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
      {/* Minimal styles: font import + responsive grid override */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        @media (max-width: 720px) {
          .mm-step-body { grid-template-columns: 1fr !important; padding: 0 24px 28px 24px !important; }
          .mm-hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .mm-why-grid  { grid-template-columns: 1fr !important; }
          .mm-ws-grid   { grid-template-columns: 1fr !important; }
          .mm-result-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {gatePhase === null && (
        <div className="flex flex-col items-center justify-center min-h-dvh gap-4">
          <div className="w-10 h-10 rounded-full border-[3px] border-[var(--border)] border-t-[#4A90D9] animate-egate-spin" />
          <p className="text-[0.88rem] text-[var(--soft)]">Loading resource…</p>
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

      <div className="font-['Archivo',sans-serif] bg-[#F7F9FC] text-[#16243C] min-h-dvh [-webkit-font-smoothing:antialiased]">
        <SiteNav />

        {/* ── HERO ── */}
        <header
          className="text-white pt-[72px] pb-16 relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 85% 10%, rgba(74,144,217,0.35), transparent 45%), linear-gradient(180deg, #061327, #0A1F3D 80%)',
          }}
        >
          <div className="max-w-[920px] mx-auto px-6">
            <div className="mm-hero-grid grid gap-12 items-center" style={{ gridTemplateColumns: '1.15fr 0.85fr' }}>
              <div>
                <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-[#8BB8E8] mb-[18px] flex items-center gap-[10px]">
                  <span className="w-6 h-px bg-[#8BB8E8] inline-block" aria-hidden />
                  Lead Acquisition Framework
                </div>
                <h1 className="font-['Archivo_Black',sans-serif] text-[clamp(40px,7vw,76px)] leading-[0.96] tracking-[-0.01em] uppercase">
                  THE <span className="text-[#8BB8E8]">MERGE</span><br />METHOD
                </h1>
                <div className="text-[15px] text-[#DCEAFB] mt-[18px] font-medium tracking-[0.02em]">by Temitope Saliu</div>
                <p className="mt-9 max-w-[620px] text-[19px] text-[#E7EEF8] leading-[1.6]">
                  I don&apos;t pitch. I merge. I find their exact systematic loophole, reverse engineer a custom case study of how to fix it, and personalize the breakdown completely and directly to the decision maker, relentlessly.
                </p>
                <div className="mt-10 pt-6 border-t border-white/15 flex gap-8 flex-wrap font-mono text-[12px] text-[#8BB8E8] uppercase tracking-[0.06em]">
                  <span>5 Steps</span>
                  <span>No Cold Pitching</span>
                  <span>Built To Use Today</span>
                </div>
              </div>
              <div>
                <div className="border border-[rgba(139,184,232,0.35)] rounded-[6px] p-[10px] bg-white/[0.03] shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
                  <Image
                    src="/PHOTO-2026-06-30-14-06-40.jpg"
                    alt="The Merge Method framework by Temitope Saliu"
                    width={400}
                    height={400}
                    className="block w-full h-auto rounded-[3px]"
                  />
                </div>
                <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[#8BB8E8] mt-[14px] text-center">The original framework</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── WHY THIS WORKS ── */}
        <section className="bg-white border-t border-b border-[rgba(10,31,61,0.12)]">
          <div className="max-w-[920px] mx-auto px-6 pt-16 pb-0">
            <div className="font-mono text-[12px] text-[#4A90D9] uppercase tracking-[0.14em] mb-[10px]">Why This Works</div>
            <h2 className="font-['Archivo_Black',sans-serif] text-[clamp(26px,4vw,38px)] text-[#0A1F3D] uppercase leading-[1.05]">Pitches Get Ignored. Proof Gets Read.</h2>
            <p className="mt-[14px] max-w-[640px] text-base text-[#4A5670] leading-[1.7]">Most outreach leads with what you sell. The Merge leads with what&apos;s broken in their world, and proof you already fixed it. That single reversal changes whether the message gets read.</p>
          </div>
          <div className="max-w-[920px] mx-auto px-6 pt-8 pb-12">
            <div className="mm-why-grid grid gap-px bg-[rgba(10,31,61,0.12)] border border-[rgba(10,31,61,0.12)]" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              {WHY_CARDS.map(c => (
                <div key={c.num} className="bg-white px-6 py-7">
                  <div className="font-mono text-[12px] text-[#4A90D9] mb-[10px]">{c.num}</div>
                  <h3 className="text-base text-[#0A1F3D] mb-2 font-extrabold">{c.title}</h3>
                  <p className="text-[14px] text-[#5A6685] leading-[1.6]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FIVE STEPS ── */}
        <section className="py-16">
          <div className="max-w-[920px] mx-auto px-6">
            <div className="mb-10">
              <div className="font-mono text-[12px] text-[#4A90D9] uppercase tracking-[0.14em] mb-[10px]">The Framework + The Toolkit</div>
              <h2 className="font-['Archivo_Black',sans-serif] text-[clamp(26px,4vw,38px)] text-[#0A1F3D] uppercase leading-[1.05]">Five Steps. Open Each One.</h2>
              <p className="mt-[14px] max-w-[640px] text-base text-[#4A5670] leading-[1.7]">Every step below has the method on the left and the exact toolkit to execute it on the right: where to look, what to ask, what to build.</p>
            </div>
            {STEPS.map((s, i) => <StepCard key={s.num} step={s} defaultOpen={i === 0} />)}
            <Step4Card />
            <StepCard step={STEP_5} />
          </div>
        </section>

        {/* ── WORKSHEET ── */}
        <section
          className="text-white py-16 pb-14"
          style={{ background: 'radial-gradient(circle at 10% 90%, rgba(74,144,217,0.25), transparent 50%), #061327' }}
        >
          <div className="max-w-[920px] mx-auto px-6">
            <div className="font-mono text-[12px] text-[#8BB8E8] uppercase tracking-[0.14em] mb-[10px]">Worksheet</div>
            <h2 className="font-['Archivo_Black',sans-serif] text-[clamp(26px,4vw,38px)] text-white uppercase leading-[1.05]">Run This Before You Reach Out</h2>
            <p className="mt-[14px] max-w-[640px] text-base text-[#DCEAFB] leading-[1.7]">Four prompts. Answer them before you send anything. If you can&apos;t fill these in yet, you&apos;re not ready to merge. Go back to Step 1.</p>
            <div className="mm-ws-grid grid gap-4 mt-8" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
              {WORKSHEET.map(w => (
                <div key={w.title} className="bg-white/[0.04] border border-white/[0.14] rounded-[4px] p-[22px]">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8BB8E8] mb-3">{w.title}</h4>
                  <div className="border-b border-dashed border-white/25 py-[10px] text-[14px] text-[#C8D6EC]">
                    <span className="text-white font-semibold block mb-[6px]">{w.q}</span>
                    _____________________________
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULT ── */}
        <section className="bg-[#DCEAFB] border-t border-[rgba(10,31,61,0.12)]">
          <div className="max-w-[920px] mx-auto px-6">
            <div className="mm-result-inner grid gap-7 items-center py-9" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
              <svg width="56" height="56" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <polygon points="10,10 30,10 50,55 70,10 90,10 90,90 70,90 70,40 50,80 30,40 30,90 10,90" fill="#0A1F3D" />
              </svg>
              <div>
                <h3 className="font-['Archivo_Black',sans-serif] text-[18px] text-[#0A1F3D] uppercase mb-[14px]">The Result Of The Merge</h3>
                <ul className="list-none p-0 m-0">
                  {['They see the flaw they couldn\'t.', 'They understand the fix they didn\'t have.', 'They trust the person who showed them — because it was built for them.'].map((li, i) => (
                    <li key={i} className="text-[14px] text-[#0A1F3D] mb-[6px] pl-5 relative">
                      <span className="absolute left-0 text-[#4A90D9]" aria-hidden>○</span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="font-['Archivo_Black',sans-serif] text-[18px] text-[#0A1F3D] uppercase leading-[1.2] max-w-[220px]">
                That&apos;s when the merge creates momentum.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
