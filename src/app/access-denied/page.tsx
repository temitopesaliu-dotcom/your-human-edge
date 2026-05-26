import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Access Denied | Your Human Edge',
};

export default function AccessDeniedPage() {
  return (
    <div className="simple-page access-denied-page">
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99, background: 'rgba(26,16,64,.94)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,.07)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px' }}>
        <Link href="/quiz" className="nav-logo">human<span>+</span>ai</Link>
        <Link href="/quiz" className="nav-cta">Take the quiz</Link>
      </nav>

      <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 28px', textAlign: 'center' }}>
        <div style={{ maxWidth: '460px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,5vw,2.8rem)', fontWeight: 400, color: '#fff', marginBottom: '16px' }}>
            Access <em style={{ color: '#e57373' }}>Denied</em>
          </h1>
          <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.8, marginBottom: '14px' }}>
            This playbook is only accessible with a valid purchase link. Your link may be invalid, expired, or has been used from a different device.
          </p>
          <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.35)', lineHeight: 1.75, marginBottom: '36px' }}>
            If you purchased and are seeing this in error, check your confirmation email for your personal access link. Still stuck? Reply to your confirmation email.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <Link href="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'var(--coral)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.92rem', fontWeight: 600, padding: '14px 32px', borderRadius: '50px', textDecoration: 'none' }}>
              Back to homepage
            </Link>
            <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.25)' }}>Purchase confirmation goes to your email immediately.</span>
          </div>
        </div>
      </div>

      <div className="mobile-quick-actions" aria-label="Quick actions">
        <Link className="mobile-quick-actions__secondary" href="/paths">
          Explore Paths
        </Link>
        <Link className="mobile-quick-actions__primary" href="/quiz">
          Take Quiz
        </Link>
      </div>
    </div>
  );
}
