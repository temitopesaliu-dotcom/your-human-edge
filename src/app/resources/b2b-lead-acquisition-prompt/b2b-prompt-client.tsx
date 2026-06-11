'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  isLocallySubscribed,
  markLocallySubscribed,
  checkRemoteSubscriber,
} from '@/lib/subscriber';

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

  // ── Gate state ──
  const [gatePhase, setGatePhase] = useState<'gate' | 'checking' | 'content'>('gate');
  const [gateName, setGateName] = useState('');
  const [gateEmail, setGateEmail] = useState('');
  const [gateType, setGateType] = useState<'individual' | 'company'>('individual');
  const [gateError, setGateError] = useState('');
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // ── On mount, check if the user is already subscribed ──
  useEffect(() => {
    // Fast path: already confirmed subscribed in this browser
    if (isLocallySubscribed()) {
      setGatePhase('content');
      return;
    }

    // Fallback: check if we have a stored email to verify remotely
    const storedEmail = (() => {
      try { return localStorage.getItem('yhe_email'); } catch { return null; }
    })();
    if (!storedEmail) return; // no email → keep gate visible

    setGatePhase('checking');
    checkRemoteSubscriber(storedEmail).then(subscribed => {
      if (!mountedRef.current) return;
      if (subscribed) {
        const storedName = (() => {
          try { return localStorage.getItem('yhe_name') || ''; } catch { return ''; }
        })();
        markLocallySubscribed(storedName, storedEmail);
        setGatePhase('content');
      } else {
        try {
          localStorage.removeItem('yhe_subscribed');
          localStorage.removeItem('yhe_name');
          localStorage.removeItem('yhe_email');
        } catch { /* ignore */ }
        setGatePhase('gate');
      }
    }).catch(() => {
      if (!mountedRef.current) return;
      setGatePhase('gate');
    });
  }, []);

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGateError('');
    const name = gateName.trim();
    const email = gateEmail.trim().toLowerCase();
    if (!name || !email) { setGateError('Please fill in both fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGateError('Please enter a valid email address.');
      return;
    }
    setGateSubmitting(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, archetype: 'H', source: 'b2b-prompt', isCompany: gateType === 'company' }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong.');
      }
      if (!mountedRef.current) return;
      markLocallySubscribed(name, email);
      setGatePhase('content');
    } catch (err: unknown) {
      if (!mountedRef.current) return;
      setGateError(err instanceof Error ? err.message : 'Something went wrong.');
      setGateSubmitting(false);
    }
  }

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(PROMPT_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);

  return (
    <>
      {/* ── Gate overlay ── */}
      {gatePhase !== 'content' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(10,10,15,.92)', backdropFilter: 'blur(8px)',
          padding: '16px',
        }}>
          <div style={{
            background: '#fff', borderRadius: '18px',
            border: '1px solid var(--border)',
            padding: '44px 36px', maxWidth: '460px', width: '100%',
            boxShadow: '0 24px 80px rgba(0,0,0,.5)',
            textAlign: 'center',
            maxHeight: '90vh', overflowY: 'auto',
            boxSizing: 'border-box',
          }}>
            {gatePhase === 'checking' ? (
              <>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: '#fdf0ea', color: 'var(--coral)',
                  fontSize: '1.5rem', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 18px',
                }} aria-hidden>🔍</div>
                <div style={{
                  fontSize: '.68rem', letterSpacing: '.16em', textTransform: 'uppercase',
                  color: 'var(--coral)', fontWeight: 600, marginBottom: '10px',
                }}>
                  Checking your access
                </div>
                <div style={{
                  fontSize: '.88rem', color: 'var(--soft)', lineHeight: 1.7,
                  marginBottom: '8px',
                }}>
                  Just a moment…
                </div>
                <div style={{
                  margin: '16px auto 0', width: 32, height: 32,
                  border: '3px solid var(--border)', borderTopColor: 'var(--coral)',
                  borderRadius: '50%', animation: 'b2b-spin .7s linear infinite',
                }} />
              </>
            ) : (
              <>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: '#fdf0ea', color: 'var(--coral)',
                  fontSize: '1.5rem', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 18px',
                }} aria-hidden>📋</div>
                <div style={{
                  fontSize: '.68rem', letterSpacing: '.16em', textTransform: 'uppercase',
                  color: 'var(--coral)', fontWeight: 600, marginBottom: '10px',
                }}>
                  Free access
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.4rem,4vw,1.8rem)', fontWeight: 400,
                  lineHeight: 1.2, color: 'var(--ink)', marginBottom: '10px',
                }}>
                  B2B Lead Acquisition Prompt
                </h2>
                <p style={{
                  fontSize: '.88rem', color: 'var(--soft)', lineHeight: 1.7,
                  marginBottom: '24px',
                }}>
                  Enter your details below to unlock this free resource — and get notified when new resources drop.
                </p>

                <form onSubmit={handleGateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{
                      fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase',
                      color: 'var(--soft)', fontWeight: 500, marginBottom: '5px', display: 'block',
                    }}>
                      First name
                    </label>
                    <input
                      type="text" value={gateName} onChange={e => setGateName(e.target.value)}
                      placeholder="Your first name" required aria-label="First name"
                      style={{
                        width: '100%', padding: '13px 16px', borderRadius: '10px',
                        border: '1.5px solid var(--border)', fontFamily: "'DM Sans', sans-serif",
                        fontSize: '1rem', color: 'var(--ink)', background: 'var(--warm)',
                        outline: 'none',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={{
                      fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase',
                      color: 'var(--soft)', fontWeight: 500, marginBottom: '5px', display: 'block',
                    }}>
                      Email address
                    </label>
                    <input
                      type="email" value={gateEmail} onChange={e => setGateEmail(e.target.value)}
                      placeholder="you@email.com" required aria-label="Email address"
                      style={{
                        width: '100%', padding: '13px 16px', borderRadius: '10px',
                        border: '1.5px solid var(--border)', fontFamily: "'DM Sans', sans-serif",
                        fontSize: '1rem', color: 'var(--ink)', background: 'var(--warm)',
                        outline: 'none',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--coral)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={{
                      fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase',
                      color: 'var(--soft)', fontWeight: 500, marginBottom: '5px', display: 'block',
                    }}>
                      I'm signing up as
                    </label>
                    <div style={{
                      display: 'flex', gap: '8px', width: '100%',
                      maxWidth: '100%', boxSizing: 'border-box',
                    }}>
                      <button
                        type="button"
                        onClick={() => setGateType('individual')}
                        style={{
                          flex: 1, padding: '11px 16px', borderRadius: '10px',
                          border: `1.5px solid ${gateType === 'individual' ? 'var(--coral)' : 'var(--border)'}`,
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '.95rem', fontWeight: gateType === 'individual' ? 600 : 400,
                          color: gateType === 'individual' ? '#fff' : 'var(--ink)',
                          background: gateType === 'individual' ? 'var(--coral)' : 'var(--warm)',
                          cursor: 'pointer', outline: 'none',
                          boxSizing: 'border-box', transition: 'all .15s',
                          lineHeight: 1.2,
                        }}
                      >
                        Individual
                      </button>
                      <button
                        type="button"
                        onClick={() => setGateType('company')}
                        style={{
                          flex: 1, padding: '11px 16px', borderRadius: '10px',
                          border: `1.5px solid ${gateType === 'company' ? 'var(--coral)' : 'var(--border)'}`,
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '.95rem', fontWeight: gateType === 'company' ? 600 : 400,
                          color: gateType === 'company' ? '#fff' : 'var(--ink)',
                          background: gateType === 'company' ? 'var(--coral)' : 'var(--warm)',
                          cursor: 'pointer', outline: 'none',
                          boxSizing: 'border-box', transition: 'all .15s',
                          lineHeight: 1.2,
                        }}
                      >
                        Company / Organisation
                      </button>
                    </div>
                  </div>
                  {gateError && (
                    <div style={{
                      color: '#c0392b', fontSize: '.82rem',
                      background: '#fdf0ea', padding: '8px 12px',
                      borderRadius: '8px', textAlign: 'center',
                    }}>{gateError}</div>
                  )}
                  <button type="submit" disabled={gateSubmitting} aria-label="Unlock the free resource"
                    style={{
                      width: '100%', padding: '15px', background: 'var(--coral)', color: '#fff',
                      border: 'none', borderRadius: '40px', cursor: gateSubmitting ? 'not-allowed' : 'pointer',
                      fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem', fontWeight: 600,
                      opacity: gateSubmitting ? .6 : 1, marginTop: '4px',
                    }}>
                    {gateSubmitting ? 'Just a moment…' : 'Unlock free access →'}
                  </button>
                </form>
                <p style={{
                  fontSize: '.7rem', color: 'var(--soft)', marginTop: '14px', opacity: .6,
                }}>
                  No spam. Unsubscribe anytime. Same access across all free resources.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes b2b-spin { to { transform: rotate(360deg); } }
      `}</style>

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
    </>
  );
}


