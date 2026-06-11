'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';

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

// ── Styles ──
const theme = {
  bg: '#0A0A0F',
  surface: '#111118',
  card: '#16161F',
  border: '#22222E',
  borderBr: '#2E2E40',
  white: '#F0F0F8',
  muted: '#7070A0',
  mutedBr: '#9090B8',
  accent: '#6B6BFF',
  accentDim: '#2A2A60',
  accentGlow: 'rgba(107,107,255,0.06)',
  green: '#22C97A',
};

export default function B2BPromptClient() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(PROMPT_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);

  return (
    <div
      style={{
        background: theme.bg,
        color: theme.white,
        minHeight: '100vh',
      }}
    >
      {/* ── NAV (matches site-wide styles from globals.css) ── */}
      <nav>
        <Link href="/quiz" className="nav-logo">
          Your Human Edge in the AI Era
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/quiz">Home</Link>
          </li>
          <li>
            <Link href="/resources">Resources</Link>
          </li>
        </ul>
        <Link href="/quiz" className="nav-cta">
          Find my archetype
        </Link>
      </nav>

      {/* ── HERO ── */}
      <div
        style={{
          padding: '7rem 2rem 4rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(107,107,255,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
          aria-hidden
        />
        <span
          style={{
            display: 'inline-block',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: theme.accent,
            border: `0.5px solid ${theme.accentDim}`,
            borderRadius: 99,
            padding: '5px 14px',
            marginBottom: '1.5rem',
            background: theme.accentGlow,
          }}
        >
          Free Framework
        </span>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 'clamp(2rem, 5.5vw, 3.5rem)',
            fontWeight: 700,
            color: theme.white,
            lineHeight: 1.18,
            marginBottom: '1.2rem',
            maxWidth: 720,
            margin: '0 auto 1.2rem',
          }}
        >
          How to acquire B2B leads<br />
          <span
            style={{
              background: 'linear-gradient(90deg, #8B8BFF, #B0B0FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            systematically and convert them
          </span>
        </h1>
        <p
          style={{
            fontSize: 16,
            color: theme.muted,
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          A master prompt that builds a complete, tailored 7-stage lead acquisition playbook for any B2B company — in under 2 minutes.
        </p>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        {/* ── INTRO STRIP ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 10,
            marginBottom: '4rem',
          }}
        >
          {INTRO_ITEMS.map((item) => (
            <div
              key={item.title}
              style={{
                background: theme.card,
                border: `0.5px solid ${theme.border}`,
                borderRadius: 10,
                padding: '1rem 1.1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: theme.accentGlow,
                  border: `0.5px solid ${theme.accentDim}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  flexShrink: 0,
                }}
                aria-hidden
              >
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: theme.white, marginBottom: 2 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 11, color: theme.muted, lineHeight: 1.4 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── WHAT THE PROMPT BUILDS ── */}
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: theme.accent, marginBottom: '0.4rem' }}>
          What you get
        </div>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            color: theme.white,
            marginBottom: '0.5rem',
          }}
        >
          The prompt builds all 7 stages
        </h2>
        <p
          style={{
            fontSize: 13,
            color: theme.muted,
            lineHeight: 1.65,
            marginBottom: '2rem',
            maxWidth: 580,
          }}
        >
          Paste the prompt, fill in your product details, and the AI outputs a full operational playbook tailored to your business. Here is what each stage covers.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: '4rem' }}>
          {STAGES.map((s) => (
            <div
              key={s.num}
              style={{
                display: 'grid',
                gridTemplateColumns: '36px 1fr',
                gap: 12,
                alignItems: 'start',
                background: theme.card,
                border: `0.5px solid ${theme.border}`,
                borderRadius: 10,
                padding: '0.9rem 1.1rem',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.borderBr;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: theme.accentGlow,
                  border: `1px solid ${theme.accentDim}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  color: theme.accent,
                  fontFamily: "Georgia, serif",
                  flexShrink: 0,
                }}
              >
                {s.num}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: theme.white, marginBottom: 3 }}>
                  {s.name}
                </div>
                <div style={{ fontSize: 12, color: theme.muted, lineHeight: 1.55 }}>
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── THE PROMPT BOX ── */}
        <div
          style={{
            background: theme.surface,
            border: `0.5px solid ${theme.borderBr}`,
            borderRadius: 16,
            padding: '2rem',
            marginBottom: '4rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.2rem',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: theme.accent, marginBottom: 2 }}>
                The master prompt
              </div>
              <p style={{ fontSize: 12, color: theme.muted, margin: 0 }}>
                Fill in the 8 bracketed fields. Paste into any AI assistant.
              </p>
            </div>
            <button
              onClick={handleCopy}
              style={{
                fontSize: 12,
                fontWeight: 700,
                padding: '8px 18px',
                border: copied ? `0.5px solid ${theme.green}` : `0.5px solid ${theme.accent}`,
                borderRadius: 8,
                background: copied ? 'rgba(34,201,122,0.1)' : theme.accentGlow,
                color: copied ? theme.green : theme.accent,
                cursor: 'pointer',
                fontFamily: "'Trebuchet MS', sans-serif",
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!copied) {
                  e.currentTarget.style.background = theme.accent;
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (!copied) {
                  e.currentTarget.style.background = theme.accentGlow;
                  e.currentTarget.style.color = theme.accent;
                }
              }}
            >
              {copied ? 'Copied!' : 'Copy prompt'}
            </button>
          </div>

          <pre
            style={{
              background: theme.bg,
              border: `0.5px solid ${theme.border}`,
              borderRadius: 10,
              padding: '1.6rem 1.8rem',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 12.5,
              color: theme.mutedBr,
              lineHeight: 1.9,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
              overflow: 'auto',
              maxHeight: 600,
            }}
          >
            {PROMPT_TEXT}
          </pre>
        </div>

        {/* ── HOW TO USE ── */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: theme.accent, marginBottom: '0.4rem' }}>
            How to use this
          </div>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: theme.white,
              marginBottom: '0.5rem',
            }}
          >
            Four steps
          </h2>
          <p
            style={{
              fontSize: 13,
              color: theme.muted,
              lineHeight: 1.65,
              marginBottom: '1.5rem',
              maxWidth: 580,
            }}
          >
            From blank page to working lead acquisition system.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {HOW_STEPS.map((h) => (
              <div key={h.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: theme.accentGlow,
                    border: `0.5px solid ${theme.accentDim}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color: theme.accent,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {h.step}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: theme.white, marginBottom: 2 }}>
                    {h.title}
                  </div>
                  <span style={{ fontSize: 12, color: theme.muted, lineHeight: 1.55 }}>
                    {h.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER (matches site-wide styles from globals.css) ── */}
      <footer>
        <div className="footer-brand">human<span>+</span>ai</div>
        <ul className="f-links">
          <li>
            <Link href="/quiz">Take the quiz</Link>
          </li>
          <li>
            <Link href="/resources">Resources</Link>
          </li>
        </ul>
        <div style={{ fontSize: '.7rem', opacity: 0.25 }}>
          &copy; 2026
        </div>
      </footer>
    </div>
  );
}


