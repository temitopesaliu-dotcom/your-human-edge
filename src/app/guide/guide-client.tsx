'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SITE_DISPLAY } from '@/lib/site';

const INCLUDES = [
  'Full step-by-step implementation guide for all 50 AI career paths',
  'Five category playbooks with 4-step launch plans each',
  'Delivered to your inbox immediately after purchase',
  'Keep the email — yours to revisit anytime',
];

export default function GuideClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const storedEmail = localStorage.getItem('yhe_email');
      const storedName = localStorage.getItem('yhe_name');
      if (storedEmail) setEmail(storedEmail);
      if (storedName) setName(storedName);
    } catch { /* ignore */ }
  }, []);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setBuying(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          name: name.trim(),
          product: 'paths-guide',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Checkout unavailable.');
      }
      window.location.href = data.url;
    } catch (err: unknown) {
      setBuying(false);
      setError(err instanceof Error ? err.message : 'Checkout unavailable. Please try again.');
    }
  }

  return (
    <div className="guide-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '62px' }}>
      <nav>
        <Link href="/paths" className="nav-logo">human<span>+</span>ai</Link>
        <Link href="/paths" className="nav-cta" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.25)' }}>
          ← Back to paths
        </Link>
      </nav>

      <div style={{ background: 'var(--ink)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '.7rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: '16px', padding: '5px 16px', border: '1px solid rgba(200,148,10,.4)', borderRadius: '40px' }}>
          Full implementation guide
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,6vw,3rem)', fontWeight: 400, lineHeight: 1.1, color: '#fff', marginBottom: '12px' }}>
          Turn 50 paths into a<br /><em style={{ color: 'var(--gold)' }}>clear action plan.</em>
        </h1>
        <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.55)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.75 }}>
          The free directory shows what&apos;s possible. This guide shows exactly how to launch — category by category, step by step.
        </p>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', maxWidth: '920px', width: '100%', alignItems: 'start' }}>
          <div style={{ background: '#fff', borderRadius: '18px', border: '1px solid var(--border)', padding: '36px 32px', boxShadow: '0 12px 48px rgba(26,16,64,.1)' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 500, marginBottom: '16px', color: 'var(--ink)' }}>What you get</h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {INCLUDES.map((item) => (
                <li key={item} style={{ fontSize: '.9rem', color: 'var(--soft)', padding: '8px 0 8px 28px', position: 'relative', lineHeight: 1.55 }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--teal)', fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: '.8rem', color: 'var(--soft)', marginTop: '20px', fontStyle: 'italic', lineHeight: 1.6 }}>
              Already took the quiz? Your archetype playbook is a separate product — this guide covers all 50 paths across every personality type.
            </p>
          </div>

          <div style={{ background: 'var(--ink)', borderRadius: '18px', padding: '36px 32px', color: '#fff', boxShadow: '0 12px 48px rgba(26,16,64,.15)' }}>
            <div style={{ fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: '8px' }}>One-time purchase</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 600, color: 'var(--gold)', lineHeight: 1, marginBottom: '4px' }}>$19.99</div>


            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: '6px', display: 'block' }}>First name (optional)</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your first name" aria-label="First name"
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)', color: '#fff', outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: '6px', display: 'block' }}>Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required aria-label="Email address"
                  style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.08)', color: '#fff', outline: 'none' }} />
              </div>
              {error && <div style={{ color: '#ffcdd2', fontSize: '.82rem', background: 'rgba(192,57,43,.2)', padding: '8px 12px', borderRadius: '8px', textAlign: 'center' }}>{error}</div>}
              <button type="submit" disabled={buying} aria-label="Purchase step-by-step guide for $19.99"
                style={{ width: '100%', padding: '16px', background: 'var(--coral)', color: '#fff', border: 'none', borderRadius: '40px', cursor: buying ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem', fontWeight: 600, opacity: buying ? 0.65 : 1, marginTop: '4px' }}>
                {buying ? 'Redirecting to checkout…' : 'Get the full guide — $19.99 →'}
              </button>
            </form>
            <p style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.35)', marginTop: '12px', textAlign: 'center' }}>
              Secure Stripe checkout · Full guide emailed right after payment
            </p>
          </div>
        </div>
      </div>

      <footer>
        <strong>{SITE_DISPLAY}</strong>
        <ul className="f-links">
          <li><Link href="/paths">50 AI Paths</Link></li>
          <li><Link href="/quiz">Take the quiz</Link></li>
        </ul>
        <span style={{ fontSize: '.7rem', opacity: 0.25 }}>© 2025</span>
      </footer>
    </div>
  );
}
