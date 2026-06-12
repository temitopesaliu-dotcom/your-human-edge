'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useEmailGate } from '@/lib/use-email-gate';
import EmailGateOverlay from '@/components/email-gate-overlay';

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
      <style>{`
        @keyframes b2b-spin { to { transform: rotate(360deg); } }
        .b2b-stage-card {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 16px;
          align-items: start;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.1rem 1.3rem;
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
        }
        .b2b-stage-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px rgba(26,16,64,.09);
          border-color: var(--teal);
        }
        .b2b-step-row { display: flex; gap: 16px; align-items: flex-start; }
        .b2b-prompt-box {
          background: var(--paper);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 2rem;
          margin-bottom: 4rem;
        }
        @media (max-width: 640px) {
          .b2b-hero-pad { padding: 96px 20px 48px !important; }
          .b2b-content-pad { padding: 36px 16px 80px !important; }
          .b2b-prompt-box { padding: 1.4rem !important; }
          .b2b-pills { gap: 8px !important; }
          .b2b-pill { font-size: .72rem !important; }
        }
      `}</style>

      {/* ── Nothing rendered until mount resolves gate phase ── */}
      {gatePhase === null && null}


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
      {/* ════════════════════════════════════════
          PAGE SHELL — uses site design system
          ════════════════════════════════════════ */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        background: 'var(--warm)',
        color: 'var(--ink)',
        minHeight: '100vh',
      }}>

        {/* ── NAV ── */}
        <nav>
          <Link href="/quiz" className="nav-logo">
            Your Human Edge in the AI Era
          </Link>
          <ul className="nav-links">
            <li><Link href="/quiz">Home</Link></li>
            <li><Link href="/resources">Resources</Link></li>
          </ul>
          <Link href="/quiz" className="nav-cta">Find my archetype</Link>
        </nav>

        {/* ════════════════════════════════════════
            HERO
            ════════════════════════════════════════ */}
        <div
          className="b2b-hero-pad"
          style={{
            background: 'linear-gradient(135deg, #1a1040 0%, #2d1b6e 100%)',
            padding: '112px 28px 64px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* teal radial glow — matches resources page purple glow style */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 30%, rgba(15,110,86,.2), transparent 65%)',
            pointerEvents: 'none',
          }} aria-hidden />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
            {/* Eyebrow — same style as resources page */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase',
              color: '#c8940a', fontWeight: 500, marginBottom: 20,
              border: '1px solid rgba(200,148,10,.25)', padding: '5px 16px', borderRadius: 40,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#c8940a', display: 'inline-block',
              }} aria-hidden />
              Free Framework · For Companies
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 6vw, 3.8rem)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 18,
            }}>
              How to acquire B2B leads<br />
              <em style={{ color: '#c8940a', fontStyle: 'italic' }}>systematically — and close them.</em>
            </h1>

            <p style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,.6)',
              maxWidth: 520,
              margin: '0 auto 36px',
              lineHeight: 1.8,
            }}>
              A master prompt that builds a complete, tailored 7-stage lead acquisition playbook for any B2B company — in under 2 minutes.
            </p>

            {/* Feature pills */}
            <div className="b2b-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {INTRO_ITEMS.map(item => (
                <div key={item.title} className="b2b-pill" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: 'rgba(255,255,255,.07)',
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: 40, padding: '7px 16px',
                  fontSize: '.78rem', color: 'rgba(255,255,255,.75)',
                }}>
                  <span aria-hidden>{item.icon}</span>
                  <span><strong style={{ color: '#fff' }}>{item.title}</strong> — {item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            CONTENT
            ════════════════════════════════════════ */}
        <div
          className="b2b-content-pad"
          style={{ maxWidth: 860, margin: '0 auto', padding: '56px 28px 100px' }}
        >

          {/* ── 7 STAGES ── */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{
              fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em',
              textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem',
            }}>
              What you get
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 500, color: 'var(--ink)', marginBottom: '0.6rem', lineHeight: 1.15,
            }}>
              The prompt builds all 7 stages
            </h2>
            <p style={{
              fontSize: '.92rem', color: 'var(--soft)', lineHeight: 1.75,
              marginBottom: '1.8rem', maxWidth: 580,
            }}>
              Paste the prompt, fill in your product details, and the AI outputs a full operational playbook tailored to your business. Here is what each stage covers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STAGES.map(s => (
                <div key={s.num} className="b2b-stage-card">
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(15,110,86,.08)',
                    border: '1.5px solid rgba(15,110,86,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.05rem', fontWeight: 600, color: 'var(--teal)',
                    fontFamily: "'Cormorant Garamond', serif",
                    flexShrink: 0,
                  }}>
                    {s.num}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '.9rem', fontWeight: 600, color: 'var(--ink)',
                      marginBottom: 4, lineHeight: 1.3,
                    }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize: '.82rem', color: 'var(--soft)', lineHeight: 1.65 }}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── THE PROMPT BOX ── */}
          <div className="b2b-prompt-box">
            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              marginBottom: '1.2rem', flexWrap: 'wrap', gap: 12,
            }}>
              <div>
                <div style={{
                  fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em',
                  textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 4,
                }}>
                  The master prompt
                </div>
                <p style={{ fontSize: '.82rem', color: 'var(--soft)', margin: 0, lineHeight: 1.6 }}>
                  Fill in the 8 bracketed fields. Paste into any AI assistant.
                </p>
              </div>
              <button
                onClick={handleCopy}
                style={{
                  fontSize: '.82rem', fontWeight: 600,
                  padding: '10px 22px',
                  border: copied ? '1.5px solid var(--teal)' : '1.5px solid var(--border)',
                  borderRadius: 40,
                  background: copied ? 'rgba(15,110,86,.08)' : '#fff',
                  color: copied ? 'var(--teal)' : 'var(--ink)',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!copied) {
                    e.currentTarget.style.background = 'var(--ink)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'var(--ink)';
                  }
                }}
                onMouseLeave={e => {
                  if (!copied) {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = 'var(--ink)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }
                }}
              >
                {copied ? '✓ Copied!' : 'Copy prompt'}
              </button>
            </div>

            <pre style={{
              background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '1.6rem 1.8rem',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 12.5,
              color: 'var(--soft)',
              lineHeight: 1.9,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              overflow: 'auto',
              maxHeight: 560,
            }}>
              {PROMPT_TEXT}
            </pre>
          </div>

          {/* ── HOW TO USE ── */}
          <div>
            <div style={{
              fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em',
              textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem',
            }}>
              How to use this
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 500, color: 'var(--ink)', marginBottom: '0.6rem', lineHeight: 1.15,
            }}>
              Four steps from blank page to working system
            </h2>
            <p style={{
              fontSize: '.92rem', color: 'var(--soft)', lineHeight: 1.75,
              marginBottom: '1.8rem', maxWidth: 580,
            }}>
              From blank page to working lead acquisition system.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {HOW_STEPS.map(h => (
                <div key={h.step} className="b2b-step-row">
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(216,90,48,.08)',
                    border: '1.5px solid rgba(216,90,48,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', fontWeight: 600, color: 'var(--coral)',
                    fontFamily: "'Cormorant Garamond', serif",
                    flexShrink: 0, marginTop: 2,
                  }}>
                    {h.step}
                  </div>
                  <div>
                    <div style={{ fontSize: '.9rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
                      {h.title}
                    </div>
                    <div style={{ fontSize: '.82rem', color: 'var(--soft)', lineHeight: 1.65 }}>
                      {h.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer>
          <div className="footer-brand">human<span>+</span>ai</div>
          <ul className="f-links">
            <li><Link href="/quiz">Take the quiz</Link></li>
            <li><Link href="/resources">Resources</Link></li>
          </ul>
          <div style={{ fontSize: '.7rem', opacity: 0.25 }}>
            &copy; 2026
          </div>
        </footer>
      </div>
    </>
  );
}
