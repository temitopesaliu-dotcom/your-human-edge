'use client';

import Link from 'next/link';
import { SITE_DISPLAY } from '@/lib/site';

export default function GuideClient() {
  return (
    <div className="guide-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '62px' }}>
      <nav>
        <Link href="/paths" className="nav-logo">human<span>+</span>ai</Link>
        <Link href="/paths" className="nav-cta" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.25)' }}>
          ← Back to paths
        </Link>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📖</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '.7rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: '18px', padding: '5px 16px', border: '1px solid rgba(200,148,10,.4)', borderRadius: '40px' }}>
            Step-by-step guide
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,5vw,2.8rem)', fontWeight: 400, lineHeight: 1.15, color: 'var(--ink)', marginBottom: '16px' }}>
            Coming <em style={{ color: 'var(--coral)' }}>soon</em>
          </h1>
          <p style={{ fontSize: '.95rem', color: 'var(--soft)', lineHeight: 1.8, maxWidth: '400px', margin: '0 auto 32px' }}>
            The full step-by-step implementation guide for all 50 AI career paths is being crafted. It&apos;ll be free when it lands.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <Link href="/paths" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'var(--ink)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.92rem', fontWeight: 600, padding: '14px 32px', borderRadius: '50px', textDecoration: 'none' }}>
              Browse the 50 paths →
            </Link>
            <Link href="/quiz" style={{ fontSize: '.88rem', color: 'var(--soft)', textDecoration: 'underline' }}>
              Take the free archetype quiz
            </Link>
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
