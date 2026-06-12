'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ARCHETYPES, type ArchetypeKey } from '@/lib/archetypes';
import { markLocallySubscribed } from '@/lib/subscriber';
import { track } from '@/lib/analytics';

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
  const VALID_ARCH_KEYS: ArchetypeKey[] = ['H', 'C', 'S', 'G'];
  const rawArch = (params.get('arch') || '').toUpperCase();
  const archKey: ArchetypeKey = VALID_ARCH_KEYS.includes(rawArch as ArchetypeKey)
    ? (rawArch as ArchetypeKey)
    : 'H';
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
      <nav className="nav--sticky">
        <Link href="/quiz" className="nav-logo">Your Human Edge in the AI Era</Link>
      </nav>

      <div className="dark-hero">
        <div className="eyebrow eyebrow--gold">Almost there</div>
        <h1>
          Your archetype<br />is <em style={{ color: 'var(--gold)' }}>ready.</em>
        </h1>
        <p>
          You are about to discover exactly which corner of AI was built for the way you think, create, and move through the world.
        </p>
      </div>

      <div className="gate-form-section">
        <div className="form-card">
          <div className="teaser-block">{teaser}</div>
          <form onSubmit={handleSubmit} className="form-group">
            <div>
              <label className="form-label">First name</label>
              <input
                className="form-input"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your first name"
                required
                aria-label="First name"
              />
            </div>
            <div>
              <label className="form-label">Email address</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                autoComplete='email'
                inputMode='email'
                aria-label="Email address"
              />
            </div>
            {error && <div className="form-error">{error}</div>}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
              aria-label="Submit to view archetype results"
            >
              {loading ? 'Unlocking your archetype…' : 'Show me my archetype →'}
            </button>
          </form>
          <p className="form-disclaimer">No spam. Just your results + insights on AI and human psychology.</p>
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
