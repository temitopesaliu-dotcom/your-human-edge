import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community — Coming Soon | Your Human Edge',
};

export default function ComingSoonPage() {
  return (
    <div className="simple-page coming-soon-page">
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99, background: 'rgba(26,16,64,.94)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,.07)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px' }}>
        <Link href="/quiz" className="nav-logo">human<span>+</span>ai</Link>
        <Link href="/quiz" className="nav-cta">Take the quiz</Link>
      </nav>

      <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 28px', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div className="coming-soon-page__glow coming-soon-page__glow--primary" style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(83,74,183,.25),transparent 70%)', pointerEvents: 'none' }} />
        <div className="coming-soon-page__glow coming-soon-page__glow--secondary" style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(15,110,86,.18),transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ textAlign: 'center', maxWidth: '540px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200,148,10,.12)', border: '1px solid rgba(200,148,10,.35)', borderRadius: '40px', padding: '7px 18px', fontSize: '.72rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '28px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 2s ease-in-out infinite' }} />
            Coming Soon
            <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem,6vw,3.8rem)', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: '20px' }}>
            The <em style={{ color: 'var(--gold)' }}>community</em><br />is being built.
          </h1>

          <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.55)', lineHeight: 1.85, marginBottom: '16px' }}>
            Live sessions, peer accountability, and archetype-specific working groups. The place where the quiz becomes a career.
          </p>
          <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.35)', lineHeight: 1.75, marginBottom: '44px' }}>
            A small founding cohort launches first. Take the quiz to get notified when it opens.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <Link href="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'var(--coral)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem', fontWeight: 600, padding: '15px 34px', borderRadius: '50px', textDecoration: 'none' }}>
              Take the quiz & get notified →
            </Link>
            <Link href="/paths" style={{ fontSize: '.84rem', color: 'rgba(255,255,255,.4)', textDecoration: 'none' }}>
              Or explore all 50 AI Career Paths
            </Link>
          </div>

          {/* Four archetype blobs */}
          <div className="coming-soon-page__blobs" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '60px', flexWrap: 'wrap' }}>
            {[
              { key: 'H', name: 'Human Bridge', color: '#0f6e56', emoji: '🌉' },
              { key: 'C', name: 'Creative Amplifier', color: '#c94f2a', emoji: '🎨' },
              { key: 'S', name: 'Systems Architect', color: '#534ab7', emoji: '⚙️' },
              { key: 'G', name: 'Growth Catalyst', color: '#1565C0', emoji: '🚀' },
            ].map(a => (
              <div key={a.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', padding: '14px 18px', borderRadius: '12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }}>
                <span style={{ fontSize: '1.4rem' }}>{a.emoji}</span>
                <span style={{ fontSize: '.7rem', color: a.color, fontWeight: 600, letterSpacing: '.06em' }}>{a.name}</span>
              </div>
            ))}
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
