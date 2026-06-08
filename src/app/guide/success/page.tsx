import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { validatePurchaseAccess } from '@/lib/purchase-access';
import { isValidSessionId } from '@/lib/products';
import { SITE_DISPLAY } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Purchase Confirmed | Your Human Edge',
  robots: 'noindex, nofollow',
};

type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function GuideSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id || '';

  if (!isValidSessionId(sessionId)) {
    redirect('/guide');
  }

  const access = await validatePurchaseAccess(sessionId, 'paths-guide');
  if (!access.ok) {
    redirect('/guide');
  }

  const firstName = (access.name || '').split(' ')[0] || 'there';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '62px',
        background: 'var(--warm)',
      }}
    >
      <nav>
        <Link href="/paths" className="nav-logo">
          Your Human Edge in the AI Era
        </Link>
      </nav>

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px 80px',
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            width: '100%',
            textAlign: 'center',
            background: '#fff',
            borderRadius: '18px',
            border: '1px solid var(--border)',
            padding: '48px 40px',
            boxShadow: '0 12px 48px rgba(26,16,64,.1)',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#E1F5EE',
              color: 'var(--teal)',
              fontSize: '1.6rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontWeight: 700,
            }}
            aria-hidden
          >
            ✓
          </div>

          <p
            style={{
              fontSize: '.7rem',
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: 'var(--teal)',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            Payment confirmed
          </p>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem,5vw,2.4rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: 'var(--ink)',
              marginBottom: '16px',
            }}
          >
            You&apos;re all set, {firstName}.
          </h1>

          <p
            style={{
              fontSize: '.95rem',
              color: 'var(--soft)',
              lineHeight: 1.8,
              marginBottom: '28px',
            }}
          >
            Your <strong style={{ color: 'var(--ink)' }}>50 AI Paths step-by-step guide</strong> is on its way to{' '}
            <strong style={{ color: 'var(--ink)' }}>{access.email || 'your inbox'}</strong>. It usually arrives within a
            minute — check spam if you don&apos;t see it.
          </p>

          <div
            style={{
              background: 'var(--paper)',
              borderRadius: '12px',
              padding: '20px 24px',
              marginBottom: '28px',
              textAlign: 'left',
              borderLeft: '3px solid var(--coral)',
            }}
          >
            <p
              style={{
                fontSize: '.82rem',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: 'var(--soft)',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              While you wait
            </p>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                fontSize: '.9rem',
                color: 'var(--soft)',
                lineHeight: 1.7,
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                <Link href="/paths" style={{ color: 'var(--purple)', fontWeight: 500 }}>
                  Browse the 50 paths directory →
                </Link>
              </li>
              <li>
                <Link href="/quiz" style={{ color: 'var(--purple)', fontWeight: 500 }}>
                  Take the free archetype quiz →
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="/paths"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--coral)',
              color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '.92rem',
              fontWeight: 600,
              padding: '14px 32px',
              borderRadius: '40px',
              textDecoration: 'none',
            }}
          >
            Back to 50 AI paths
          </Link>

          <p style={{ fontSize: '.75rem', color: 'var(--soft)', marginTop: '20px', opacity: 0.7 }}>
            Wrong email? Reply to your confirmation message and we&apos;ll help.
          </p>
        </div>
      </main>

      <footer>
        <div className="footer-brand">human<span>+</span>ai</div>
        <span style={{ opacity: 0.25, fontSize: '.7rem' }}>© 2025</span>
      </footer>
    </div>
  );
}
