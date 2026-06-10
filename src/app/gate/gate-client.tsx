'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ARCHETYPES, type ArchetypeKey } from '@/lib/archetypes';
import { SITE_DISPLAY } from '@/lib/site';
import {
  markLocallySubscribed,
} from '@/lib/subscriber';

const TEASERS: Record<ArchetypeKey, string[]> = {
  H: [
    'You lead with empathy — and that is rarer than any technical skill.',
    'Your archetype is the one AI cannot replicate.',
    'You see people. AI handles everything that slows that down.',
  ],
  C: [
    'Your creativity is your edge. AI is your production studio.',
    'You have always seen things others miss. Now the tools are finally catching up.',
    'Your archetype does not use AI. It collaborates with AI.',
  ],
  S: [
    'You see the machinery behind everything. AI is the most powerful machine ever built.',
    'Your archetype does not just use AI — you design what AI does.',
    'Others see tasks. You see systems. That changes everything.',
  ],
  G: [
    'You were already moving fast. AI just removed every remaining speed limit.',
    'Your archetype does not wait for the market. You create it.',
    'Growth is your native language. AI gives it a new dialect.',
  ],
};

function GateContent() {
  const router = useRouter();
  const params = useSearchParams();
  const archKey = ((params.get('arch') || 'H').toUpperCase()) as ArchetypeKey;
  const arch = ARCHETYPES[archKey] || ARCHETYPES['H'];
  const teaser = TEASERS[archKey][archKey.charCodeAt(0) % TEASERS[archKey].length];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    track('gate_view', { archetype: archKey });
  }, [archKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim()) { setError('Please fill in both fields.'); return; }
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), name: name.trim(), archetype: archKey, source: 'quiz' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      // Set subscriber flag so other gates (e.g. /paths) recognise them.
      markLocallySubscribed(name.trim(), email.trim().toLowerCase());

      localStorage.setItem('yhe_arch', archKey);
      localStorage.setItem('yhe_arch_name', arch.name);

      track('email_captured', { archetype: archKey });
      router.push(`/results/${arch.slug}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="gate-page">
      <nav style={{ background: 'rgba(26,16,64,.96)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,.07)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px', position: 'sticky', top: 0, zIndex: 99 }}>
        <Link href="/quiz" className="nav-logo">Your Human Edge in the AI Era</Link>
      </nav>

      <div style={{ background: 'var(--ink)', padding: '52px 24px 48px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '.7rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: '18px', padding: '5px 16px', border: '1px solid rgba(200,148,10,.4)', borderRadius: '40px' }}>Almost there</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,6vw,3rem)', fontWeight: 400, lineHeight: 1.1, color: '#fff', marginBottom: '10px' }}>
          Your archetype<br />is <em style={{ color: 'var(--gold)' }}>ready.</em>
        </h1>
        <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.55)', maxWidth: '380px', margin: '0 auto', lineHeight: 1.75 }}>
          You are about to discover exactly which corner of AI was built for the way you think, create, and move through the world.
        </p>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', minHeight: '60vh' }}>
        <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid var(--border)', padding: '44px 38px', boxShadow: '0 12px 48px rgba(26,16,64,.12)', maxWidth: '460px', width: '100%' }}>
          <div style={{ background: 'var(--paper)', borderRadius: '10px', padding: '16px 20px', marginBottom: '28px', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.08rem', fontStyle: 'italic', color: 'var(--ink)', borderLeft: '3px solid var(--coral)', lineHeight: 1.7 }}>
            {teaser}
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '.74rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--soft)', fontWeight: 500, marginBottom: '6px', display: 'block' }}>First name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your first name" required aria-label="First name"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1.5px solid var(--border)', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--ink)', background: 'var(--warm)', outline: 'none', transition: 'border-color .2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--coral)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ fontSize: '.74rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--soft)', fontWeight: 500, marginBottom: '6px', display: 'block' }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required aria-label="Email address"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1.5px solid var(--border)', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'var(--ink)', background: 'var(--warm)', outline: 'none', transition: 'border-color .2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--coral)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'} />
            </div>
            {error && <div style={{ color: '#c0392b', fontSize: '.82rem', background: '#fdf0ea', padding: '8px 12px', borderRadius: '8px', textAlign: 'center' }}>{error}</div>}
            <button type="submit" disabled={loading} aria-label="Submit to view archetype results"
              style={{ width: '100%', padding: '15px', background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '40px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem', fontWeight: 600, opacity: loading ? .6 : 1, marginTop: '4px', transition: 'transform .2s, box-shadow .2s' }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = '0 4px 12px rgba(201,79,42,.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = 'none')}>
              {loading ? 'Unlocking your archetype…' : 'Show me my archetype →'}
            </button>
          </form>
          <p style={{ fontSize: '.72rem', color: 'var(--soft)', marginTop: '10px', opacity: .6, textAlign: 'center' }}>No spam. Just your results + insights on AI and human psychology.</p>
        </div>
      </div>

      <footer>
        <div className="footer-brand">human<span>+</span>ai</div>
        <span style={{ opacity: .25, fontSize: '.7rem' }}>© 2026</span>
      </footer>
    </div>
  );
}

export default function GateClient() {
  return (
    <Suspense>
      <GateContent />
    </Suspense>
  );
}

function track(event: string, data?: Record<string, unknown>) {
  try {
    const payload = JSON.stringify({ event, data, page: '/gate', ts: Date.now() });
    if (navigator?.sendBeacon) navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
  } catch {}
}
