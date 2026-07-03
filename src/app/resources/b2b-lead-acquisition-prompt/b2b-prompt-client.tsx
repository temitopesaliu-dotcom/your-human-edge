'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useEmailGate } from '@/lib/use-email-gate';
import EmailGateOverlay from '@/components/email-gate-overlay';
import SiteNav from '@/components/site-nav';

const PROMPT_TEXT = `You are a B2B lead acquisition strategist. Build me a complete, actionable lead acquisition framework for the following business:

BUSINESS: [Your company name]
PRODUCT: [What your product does in one sentence]
WEBSITE: [Your website URL]
TARGET SECTORS: [List the 3 to 5 industries or customer types you are targeting]
TARGET DECISION-MAKER: [Job title of the person who buys your product]
CORE PAIN YOU SOLVE: [The specific problem your product eliminates]
GEOGRAPHY: [Countries or cities you are targeting]
BUDGET: [Monthly budget for tools and outreach]

Build a 7-stage framework covering:

STAGE 1 -- RESEARCH: How to build a precise target list of companies and named decision-makers for this product. Include specific tools, search criteria, and how to prioritise which companies to approach first based on pain score.

STAGE 2 -- ENRICH: How to verify every contact's email and phone number before writing any copy. Include confidence thresholds, fallback methods, and how to handle contacts that cannot be verified.

STAGE 3 -- PERSONALISE: How to write one unique, personalised cold email per contact at scale using AI. Include the system prompt to use, the three email angles (Week 1: data angle, Week 2: competitor loss angle, Week 3: ROI angle), and the non-negotiable email rules (plain text only, CTA with website link on every email, no campaign language, under 120 words).

STAGE 4 -- SEND: How to send cold outreach from a real business email address in a way that feels personal and 1-to-1. Include sending infrastructure recommendation, daily volume limits, send day and time, domain warmup requirements, and the 3-email sequence structure with timing.

STAGE 5 -- FOLLOW UP FAST: How to ensure every inbound lead is contacted within 5 minutes. Include what to say in the first contact, how to route different reply types (positive, negative, out-of-office, question), and how to escalate warm signals immediately.

STAGE 6 -- TRACK: What metrics to measure weekly and what actions to take based on the data. Include the 5 core metrics, what good performance looks like for this sector, and the weekly review process that decides what to cut and what to scale.

STAGE 7 -- CLOSE AND STOP: How to convert a warm lead into a booked demo and a closed deal, and how to ensure all outreach stops permanently the moment a deal is Won, Lost, or Opted Out. Include the kill switch mechanism and what happens to lost deals after 90 days.

For each stage, provide:
-- The exact actions to take in sequence
-- The specific tools to use and why
-- The human decisions that must stay human
-- The automation that can run without human intervention
-- The quality checks that prevent errors from reaching prospects

Format the output as a detailed operational playbook, not a slide deck or summary.
Tone: direct, practical, no buzzwords. Write like a sales ops professional, not a marketing consultant.`;

const STAGES = [
  {
    num: 1,
    name: 'Research — Build a precise target list',
    desc: 'Identify the exact companies and the specific decision-makers whose KPIs are hurt by the problem you solve. Tools, search criteria, and how to rank targets by pain score.',
  },
  {
    num: 2,
    name: 'Enrich — Verify before you write',
    desc: 'Verify every email address and phone number before a single word of copy is written. Confidence thresholds, fallback methods, and how to handle unverifiable contacts.',
  },
  {
    num: 3,
    name: 'Personalise — One email per person, not per segment',
    desc: 'Use AI to write a unique, personalised cold email for every contact at scale. Three-angle sequence across three weeks. The non-negotiable email rules that protect deliverability.',
  },
  {
    num: 4,
    name: 'Send — From a real inbox, not a platform',
    desc: 'Send outreach from a real business email address in plain text. Sending infrastructure, daily limits, timing, domain warmup, and the 3-email sequence structure.',
  },
  {
    num: 5,
    name: 'Follow up fast — The first to call wins the deal',
    desc: 'Contact every inbound lead within 5 minutes. After 30 minutes, conversion probability drops 80%. How to route replies, handle OOO responses, and escalate positive signals immediately.',
  },
  {
    num: 6,
    name: 'Track — Measure what matters, cut what does not',
    desc: 'The 5 core metrics to review every week. What good looks like at each stage. The weekly review process that decides what to cut and what to double down on.',
  },
  {
    num: 7,
    name: 'Close and stop — Kill switch on Won',
    desc: 'Convert a warm lead into a booked demo and a closed deal. When a deal is Won, Lost, or Opted Out, all outreach stops permanently and instantly. No exceptions.',
  },
];

const INTRO_ITEMS = [
  { icon: '⚡', title: 'Works in any AI', desc: 'Claude, ChatGPT, Gemini — paste and go' },
  { icon: '🎯', title: 'Any sector', desc: 'Adapt to your industry and target buyers' },
  { icon: '📋', title: 'Operational output', desc: 'A playbook, not a slide deck' },
  { icon: '🔁', title: '7 stages', desc: 'Research to close — nothing skipped' },
];

const HOW_STEPS = [
  { step: 1, title: 'Copy the prompt above', desc: 'Hit the Copy button. The full prompt is now in your clipboard.' },
  { step: 2, title: 'Paste into any AI assistant', desc: 'Claude, ChatGPT, Gemini, or any other. Works with all of them.' },
  { step: 3, title: 'Fill in the 8 fields', desc: 'Replace each bracketed value with your product, sector, decision-maker, pain, geography, and budget. The more specific you are, the more actionable the output.' },
  { step: 4, title: 'Get your playbook', desc: 'The AI outputs a complete 7-stage operational playbook tailored to your business. Hand it to someone on day 1. They can be running the system by day 5.' },
];

export default function B2BPromptClient() {
  const [copied, setCopied] = useState(false);

  const {
    gatePhase, gateName, setGateName, gateEmail, setGateEmail,
    gateType, setGateType, gateError, gateSubmitting, handleGateSubmit,
  } = useEmailGate('b2b-prompt');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(PROMPT_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);

  return (
    <>
      {/* Loading state while gate phase resolves */}
      {gatePhase === null && (
        <div className="flex flex-col items-center justify-center min-h-dvh gap-4">
          <div className="w-10 h-10 rounded-full border-[3px] border-[var(--border)] border-t-[var(--teal)] animate-egate-spin" />
          <p className="text-[0.88rem] text-[var(--soft)]">Loading resource…</p>
        </div>
      )}

      <EmailGateOverlay
        gatePhase={gatePhase}
        title="B2B Lead Acquisition Prompt"
        description="Enter your details below to unlock this free resource — and get notified when new resources drop."
        gateName={gateName}
        setGateName={setGateName}
        gateEmail={gateEmail}
        setGateEmail={setGateEmail}
        gateType={gateType}
        setGateType={setGateType}
        gateError={gateError}
        gateSubmitting={gateSubmitting}
        onSubmit={handleGateSubmit}
      />

      {/* Page shell */}
      <div className="font-body bg-[var(--warm)] text-[var(--ink)] min-h-dvh">

        {/* Nav */}
        <SiteNav />

        {/* Hero */}
        <div className="bg-gradient-to-br from-[#1a1040] to-[#2d1b6e] pt-28 pb-16 px-7 text-center relative overflow-hidden">
          {/* Teal radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(15,110,86,.2), transparent 65%)' }}
            aria-hidden
          />

          <div className="relative z-10 max-w-[700px] mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[0.68rem] tracking-[.2em] uppercase text-[#c8940a] font-medium mb-5 border border-[rgba(200,148,10,.25)] px-4 py-[5px] rounded-[40px]">
              <span className="w-[6px] h-[6px] rounded-full bg-[#c8940a] inline-block" aria-hidden />
              Free Framework · For Companies
            </div>

            <h1 className="font-display text-[clamp(2rem,6vw,3.8rem)] font-normal text-white leading-[1.1] mb-[18px]">
              How to acquire B2B leads<br />
              <em className="text-[#c8940a] italic">systematically — and close them.</em>
            </h1>

            <p className="text-base text-white/60 max-w-[520px] mx-auto mb-9 leading-[1.8]">
              A master prompt that builds a complete, tailored 7-stage lead acquisition playbook for any B2B company — in under 2 minutes.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2.5 justify-center">
              {INTRO_ITEMS.map(item => (
                <div
                  key={item.title}
                  className="inline-flex items-center gap-[7px] bg-white/[0.07] border border-white/10 rounded-[40px] px-4 py-[7px] text-[0.78rem] text-white/75"
                >
                  <span aria-hidden>{item.icon}</span>
                  <span><strong className="text-white">{item.title}</strong> — {item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[860px] mx-auto px-7 pt-14 pb-24 max-sm:px-4 max-sm:pt-9 max-sm:pb-20">

          {/* 7 Stages */}
          <div className="mb-16">
            <div className="text-[0.68rem] font-semibold tracking-[.18em] uppercase text-[var(--teal)] mb-2">
              What you get
            </div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium text-[var(--ink)] mb-[0.6rem] leading-[1.15]">
              The prompt builds all 7 stages
            </h2>
            <p className="text-[0.92rem] text-[var(--soft)] leading-[1.75] mb-7 max-w-[580px]">
              Paste the prompt, fill in your product details, and the AI outputs a full operational playbook tailored to your business. Here is what each stage covers.
            </p>

            <div className="flex flex-col gap-2.5">
              {STAGES.map(s => (
                <div
                  key={s.num}
                  className="grid gap-4 items-start bg-white border border-[var(--border)] rounded-[14px] px-5 py-[1.1rem] transition-[transform,box-shadow,border-color] duration-[220ms] ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_36px_rgba(26,16,64,.09)] hover:border-[var(--teal)]"
                  style={{ gridTemplateColumns: '44px 1fr' }}
                >
                  <div className="w-11 h-11 rounded-full bg-[rgba(15,110,86,.08)] border-[1.5px] border-[rgba(15,110,86,.2)] flex items-center justify-center text-[1.05rem] font-semibold text-[var(--teal)] font-display flex-shrink-0">
                    {s.num}
                  </div>
                  <div>
                    <div className="text-[0.9rem] font-semibold text-[var(--ink)] mb-1 leading-[1.3]">
                      {s.name}
                    </div>
                    <div className="text-[0.82rem] text-[var(--soft)] leading-[1.65]">
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prompt box */}
          <div className="bg-[var(--paper)] border border-[var(--border)] rounded-[18px] p-8 mb-16 max-sm:p-[1.4rem]">
            <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
              <div>
                <div className="text-[0.68rem] font-semibold tracking-[.18em] uppercase text-[var(--teal)] mb-1">
                  The master prompt
                </div>
                <p className="text-[0.82rem] text-[var(--soft)] m-0 leading-[1.6]">
                  Fill in the 8 bracketed fields. Paste into any AI assistant.
                </p>
              </div>
              <button
                onClick={handleCopy}
                className={`text-[0.82rem] font-semibold px-[22px] py-[10px] rounded-[40px] cursor-pointer font-body transition-all duration-200 flex-shrink-0 whitespace-nowrap hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] ${
                  copied
                    ? 'border-[1.5px] border-[var(--teal)] bg-[rgba(15,110,86,.08)] text-[var(--teal)]'
                    : 'border-[1.5px] border-[var(--border)] bg-white text-[var(--ink)]'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy prompt'}
              </button>
            </div>

            <pre className="bg-white border border-[var(--border)] rounded-xl px-[1.8rem] py-[1.6rem] font-mono text-[12.5px] text-[var(--soft)] leading-[1.9] whitespace-pre-wrap break-words m-0 overflow-auto max-h-[560px] max-sm:max-h-[360px] max-sm:text-[11px]">
              {PROMPT_TEXT}
            </pre>
          </div>

          {/* How to use */}
          <div>
            <div className="text-[0.68rem] font-semibold tracking-[.18em] uppercase text-[var(--teal)] mb-2">
              How to use this
            </div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium text-[var(--ink)] mb-[0.6rem] leading-[1.15]">
              Four steps from blank page to working system
            </h2>
            <p className="text-[0.92rem] text-[var(--soft)] leading-[1.75] mb-7 max-w-[580px]">
              From blank page to working lead acquisition system.
            </p>

            <div className="flex flex-col gap-5">
              {HOW_STEPS.map(h => (
                <div key={h.step} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-[rgba(216,90,48,.08)] border-[1.5px] border-[rgba(216,90,48,.2)] flex items-center justify-center text-base font-semibold text-[var(--coral)] font-display flex-shrink-0 mt-[2px]">
                    {h.step}
                  </div>
                  <div>
                    <div className="text-[0.9rem] font-semibold text-[var(--ink)] mb-1">
                      {h.title}
                    </div>
                    <div className="text-[0.82rem] text-[var(--soft)] leading-[1.65]">
                      {h.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <div className="footer-brand">human<span>+</span>ai</div>
          <ul className="f-links">
            <li><Link href="/quiz">Take the quiz</Link></li>
            <li><Link href="/resources">Resources</Link></li>
          </ul>
          <div className="text-[.7rem] opacity-25">
            &copy; 2026
          </div>
        </footer>
      </div>
    </>
  );
}
