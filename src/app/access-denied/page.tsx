import Link from 'next/link';
import type { Metadata } from 'next';
import SiteFooter from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Access Denied | Your Human Edge',
};

export default function AccessDeniedPage() {
  return (
    <div className="ds-light simple-page access-denied-page">
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99, background: 'rgba(255,255,255,.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--ds-border, #e7e1f5)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px' }}>
        <Link href="/quiz" className="nav-logo">Your Human Edge in the AI Era</Link>
        <Link href="/quiz" className="nav-cta">Take the quiz</Link>
      </nav>

        <div style={{ minHeight: '100dvh', background: 'var(--ds-bg, #ffffff)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 28px', textAlign: 'center', paddingTop: 'calc(80px + 62px)' }}>
        <div style={{ maxWidth: '460px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
          <h1 style={{ fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)", fontSize: 'clamp(2rem,5vw,2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ds-ink, #221f1a)', marginBottom: '16px' }}>
            Access <em style={{ color: 'var(--ds-accent, #6c4fd6)' }}>Denied</em>
          </h1>
          <p style={{ fontSize: '.95rem', color: 'var(--ds-muted, #655f74)', lineHeight: 1.8, marginBottom: '14px' }}>
            This playbook is only accessible with a valid purchase link from your confirmation email. Your link may be invalid or the payment may not have completed yet.
          </p>
          <p style={{ fontSize: '.88rem', color: 'var(--ds-muted, #655f74)', lineHeight: 1.75, marginBottom: '36px', opacity: 0.8 }}>
            If you purchased and are seeing this in error, check your confirmation email for your personal access link. Still stuck? Reply to your confirmation email.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <Link href="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'var(--ds-accent, #6c4fd6)', color: '#fff', fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)", fontSize: '.92rem', fontWeight: 600, padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', transition: 'background .2s' }}>
              Back to homepage
            </Link>
            <span style={{ fontSize: '.8rem', color: 'var(--ds-muted, #655f74)', opacity: 0.7 }}>Purchase confirmation goes to your email immediately.</span>
          </div>
        </div>
      </div>

      <SiteFooter />

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
