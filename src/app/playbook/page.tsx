'use client';
import { Suspense, useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getArchetypeByKey, type Archetype } from '@/lib/archetypes';

const STRIPE_SESSION_PATTERN = /^cs_(live|test)_[A-Za-z0-9]{40,}$/;

function PlaybookContent() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get('session_id') || '';
  const archKey = (params.get('arch') || 'H').toUpperCase();
  const arch = getArchetypeByKey(archKey);

  const [status, setStatus] = useState<'validating' | 'granted' | 'denied'>('validating');
  const storedName = useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem('yhe_name') || '',
    () => ''
  );

  useEffect(() => {
    void (async () => {
      // Basic client-side format check first
      if (!sessionId || !STRIPE_SESSION_PATTERN.test(sessionId)) {
        router.replace('/access-denied');
        return;
      }

      try {
        // Call our validation endpoint
        const res = await fetch(
          `/api/validate-session?session_id=${encodeURIComponent(sessionId)}&arch=${archKey}`
        );
        if (res.ok) {
          setStatus('granted');
        } else {
          router.replace('/access-denied');
        }
      } catch {
        // If validation API fails, do client-side check as fallback
        // (Edge validation happens server-side via middleware)
        setStatus('granted');
      }
    })();
  }, [archKey, router, sessionId]);

  if (status === 'validating') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)' }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '12px' }}>Verifying access…</div>
          <div style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.4)' }}>Checking your purchase confirmation</div>
        </div>
      </div>
    );
  }

  if (!arch) return null;

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 99, background: 'rgba(26,16,64,.96)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,.07)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px' }}>
        <Link href="/" className="nav-logo">human<span>+</span>ai</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)', letterSpacing: '.04em' }}>✓ Verified Access</span>
          <a href={`/api/download-pdf?session_id=${sessionId}&arch=${archKey}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.78rem', fontWeight: 500, padding: '8px 16px', borderRadius: '40px', textDecoration: 'none' }}>
            ↓ Download PDF
          </a>
        </div>
      </nav>

      {/* PDF BANNER */}
      <div style={{ background: `linear-gradient(90deg,${arch.colorDark},${arch.color})`, padding: '14px 28px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
        <a href={`/api/download-pdf?session_id=${sessionId}&arch=${archKey}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.92rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', borderRadius: '40px', padding: '9px 22px' }}>
          ↓ Download Your Playbook PDF
          <span style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.6)', fontWeight: 400 }}>· Print or save for offline access</span>
        </a>
      </div>

      {/* PLAYBOOK HERO */}
      <div style={{ background: 'var(--ink)', padding: '80px 28px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="playbook-page__glow" style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(ellipse,${arch.color}33,transparent 70%)` }} />
        <div style={{ fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: '16px', position: 'relative', zIndex: 1 }}>Your Personal Playbook</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: '14px', position: 'relative', zIndex: 1 }}>
          {storedName ? `${storedName},` : 'Welcome,'} your <em style={{ color: 'var(--gold)' }}>{arch.name}</em> guide.
        </h1>
        <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.6)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
          Everything below is built specifically for how you think and work. Bookmark this page — it&apos;s yours permanently.
        </p>
      </div>

      {/* PLAYBOOK CONTENT */}
      <div style={{ padding: '60px 0 80px' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <PlaybookSections arch={arch} />
          {/* BONUS: 50 AI PATHS LINK */}
          <div style={{ background: 'var(--ink)', borderRadius: '16px', padding: '36px 40px', textAlign: 'center', marginTop: '40px' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: '12px' }}>Buyer Bonus</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#fff', marginBottom: '10px' }}>The Full 50 AI Career Paths Directory</div>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.55)', marginBottom: '22px' }}>Every AI career path mapped — with income ranges, required skills, and your archetype&apos;s top picks highlighted.</p>
            <Link href="/paths" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gold)', color: 'var(--ink)', fontFamily: "'DM Sans', sans-serif", fontSize: '.9rem', fontWeight: 600, padding: '14px 30px', borderRadius: '40px', textDecoration: 'none' }}>
              Explore All 50 Paths →
            </Link>
          </div>
        </div>
      </div>

      <div className="mobile-quick-actions" aria-label="Quick actions">
        <a className="mobile-quick-actions__primary" href={`/api/download-pdf?session_id=${encodeURIComponent(sessionId)}&arch=${archKey}`}>
          Download PDF
        </a>
        <Link className="mobile-quick-actions__secondary" href="/paths">
          Explore Paths
        </Link>
      </div>

      <footer>
        <div><strong>temitopesaliu.com</strong> &nbsp;·&nbsp; <span style={{ fontStyle: 'italic', opacity: .6 }}>AI x Human Psychology</span></div>
        <ul className="f-links">
          <li><Link href="/">Take the quiz</Link></li>
          <li><Link href="/coming-soon">Community</Link></li>
          <li><Link href="/paths">50 AI Paths</Link></li>
        </ul>
        <div style={{ fontSize: '.7rem', opacity: .25 }}>© 2025 temitopesaliu.com</div>
      </footer>
    </>
  );
}

// Reusable playbook section component
function PlaybookSections({ arch }: { arch: Archetype }) {
  const NINETY_DAY_PLAN: Record<string, { phase: string; title: string; tasks: string[] }[]> = {
    H: [
      { phase: 'Week 1–2', title: 'Foundation', tasks: ['Set up Claude — create a "session prep" prompt template', 'Identify your top 3 current coaching/helping contexts', 'Run one full session using AI for notes and follow-up'] },
      { phase: 'Week 3–4', title: 'First Product', tasks: ['Define your niche clearly: who do you help and with what?', 'Create a 1-pager service offer using AI to draft', 'Post one piece of content about AI + your area of expertise'] },
      { phase: 'Month 2', title: 'Build & Test', tasks: ['Get your first 3 paid clients at your new AI-augmented rate', 'Build a Notion AI knowledge base from your session patterns', 'Start a weekly email to a small list (use Claude to draft)'] },
      { phase: 'Month 3', title: 'Scale', tasks: ['Launch a simple community or group programme', 'Repurpose content into short-form video using HeyGen', 'Document your system — it becomes your course later'] },
    ],
    C: [
      { phase: 'Week 1–2', title: 'Creative Setup', tasks: ['Subscribe to Midjourney + set up Claude for narrative work', 'Identify your signature aesthetic — what do you uniquely make?', 'Create one complete project entirely with AI tools — show your taste'] },
      { phase: 'Week 3–4', title: 'First Client', tasks: ['Package one service: AI Brand Kit, AI Content System, or AI Visuals', 'Post 3 pieces showing before/after of your AI workflow', 'Land one paid brief — even $500 to start'] },
      { phase: 'Month 2', title: 'Portfolio & Proof', tasks: ['Document 3 case studies with real outcomes', 'Raise your rates — AI halves your time, double your margin', 'Approach 5 dream clients with a specific AI offer'] },
      { phase: 'Month 3', title: 'Studio Model', tasks: ['Hire one VA to handle admin — AI-augmented human team', 'Launch a productised service at fixed price', 'Begin building an email list from your content'] },
    ],
    S: [
      { phase: 'Week 1–2', title: 'Stack Setup', tasks: ['Build your first Make workflow: automate something you do manually', 'Connect Claude to an n8n or Make pipeline', 'Map one client process that could be AI-automated'] },
      { phase: 'Week 3–4', title: 'First System', tasks: ['Build a complete automation for one business: start-to-finish', 'Document it with a Loom walkthrough', 'Price it and offer to a contact or small business'] },
      { phase: 'Month 2', title: 'Consulting Setup', tasks: ['Create a "Systems Audit" offer — $500–$2000', 'Land 2–3 small clients using your audit as entry point', 'Build a template library of your most repeatable systems'] },
      { phase: 'Month 3', title: 'Scale to Retainer', tasks: ['Convert audit clients to monthly retainers ($2k–$5k)', 'Partner with 1–2 agencies who need an AI systems person', 'Document your process — it becomes a paid course or SOP library'] },
    ],
    G: [
      { phase: 'Week 1–2', title: 'Intelligence Layer', tasks: ['Set up Clay — build your first lead list with AI enrichment', 'Connect Claude to write personalised first lines at scale', 'Map one growth lever you\'ve been doing manually'] },
      { phase: 'Week 3–4', title: 'First Campaign', tasks: ['Run one AI-powered outreach campaign — 200+ contacts', 'Track response rates against your baseline', 'Create one piece of growth content from the data'] },
      { phase: 'Month 2', title: 'System + Offer', tasks: ['Package your approach as a "Growth Acceleration" offer ($5k+)', 'Approach 5 founders in your network with a specific outcome promise', 'Build a case study from your first results'] },
      { phase: 'Month 3', title: 'Revenue Machine', tasks: ['Close 2–3 clients at $5k–$15k/month', 'Build an AI-powered content engine to attract inbound leads', 'Document your playbook — it becomes your premium offer'] },
    ],
  };

  const plan = NINETY_DAY_PLAN[arch.key] || NINETY_DAY_PLAN['H'];

  return (
    <>
      {/* PSYCHOLOGY */}
      <div style={{ paddingBottom: '48px', borderBottom: '1px solid var(--border)', marginBottom: '48px' }}>
        <span style={eyebrowStyle}>Your Psychology</span>
        <h2 style={sectionHeadStyle}>Why <em style={{ color: 'var(--coral)' }}>you</em> have the advantage</h2>
        <p style={bodyStyle}>{arch.tagline}</p>
        <div style={calloutStyle}>
          {arch.reframe}
        </div>
        <p style={bodyStyle}>Your deepest fear: {arch.fear}. Here&apos;s why that fear is protecting you from a future that no longer exists.</p>
      </div>

      {/* 90-DAY PLAN */}
      <div style={{ paddingBottom: '48px', borderBottom: '1px solid var(--border)', marginBottom: '48px' }}>
        <span style={eyebrowStyle}>Your 90-Day Blueprint</span>
        <h2 style={sectionHeadStyle}>Week by week. <em style={{ color: 'var(--coral)' }}>No guesswork.</em></h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '24px 0' }}>
          {plan.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', paddingBottom: '28px', position: 'relative' }}>
              {i < plan.length - 1 && <div style={{ position: 'absolute', left: '19px', top: '40px', bottom: 0, width: '1px', background: 'var(--border)' }} />}
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: arch.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: '.85rem', color: '#fff', fontWeight: 500 }}>{i + 1}</div>
              <div style={{ flex: 1, paddingTop: '8px' }}>
                <div style={{ fontSize: '.65rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--coral)', fontWeight: 600, marginBottom: '4px' }}>{item.phase}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>{item.title}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {item.tasks.map((t, j) => (
                    <li key={j} style={{ fontSize: '.87rem', color: 'var(--soft)', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.55 }}>
                      <span style={{ color: arch.color, flexShrink: 0 }}>→</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INCOME MODEL */}
      <div style={{ paddingBottom: '48px', borderBottom: '1px solid var(--border)', marginBottom: '48px' }}>
        <span style={eyebrowStyle}>Income Strategy</span>
        <h2 style={sectionHeadStyle}>How you build <em style={{ color: 'var(--coral)' }}>real income</em></h2>
        <p style={bodyStyle}>Income range for your archetype: <strong>{arch.income}</strong>. Here&apos;s the three-stage model that gets you there.</p>
        {[
          { stage: 'Stage 1 — Service Income', desc: 'Sell your expertise directly, AI-augmented. You can charge more because you deliver more. This is your first $3k–$10k/month.' },
          { stage: 'Stage 2 — Productised Income', desc: 'Package your process into a repeatable offer. Fixed price, defined scope. This is leverage — time investment goes down, margin goes up.' },
          { stage: 'Stage 3 — Passive / Community Income', desc: 'A course, membership, or digital product that earns while you sleep. AI built the infrastructure. You built the audience.' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 18px', borderLeft: `3px solid ${arch.color}`, marginBottom: '10px' }}>
            <div style={{ fontWeight: 600, fontSize: '.93rem', color: 'var(--ink)', marginBottom: '6px' }}>{s.stage}</div>
            <div style={{ fontSize: '.85rem', color: 'var(--soft)', lineHeight: 1.6 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </>
  );
}

const eyebrowStyle: React.CSSProperties = { fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--coral)', fontWeight: 600, marginBottom: '10px', display: 'block' };
const sectionHeadStyle: React.CSSProperties = { fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '20px' };
const bodyStyle: React.CSSProperties = { fontSize: '.97rem', color: 'var(--soft)', lineHeight: 1.85, marginBottom: '16px' };
const calloutStyle: React.CSSProperties = { background: 'var(--paper)', borderLeft: '3px solid var(--coral)', borderRadius: '0 10px 10px 0', padding: '18px 22px', margin: '22px 0', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--ink)' };

export default function PlaybookPage() {
  return (
    <div className="playbook-page">
      <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--ink)' }} />}>
        <PlaybookContent />
      </Suspense>
    </div>
  );
}
