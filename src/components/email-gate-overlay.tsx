'use client';
import type { GatePhase } from '@/lib/use-email-gate';

type Props = {
  gatePhase: GatePhase;
  title: string;
  description: string;
  gateName: string;
  setGateName: (v: string) => void;
  gateEmail: string;
  setGateEmail: (v: string) => void;
  gateType: 'individual' | 'company';
  setGateType: (v: 'individual' | 'company') => void;
  gateError: string;
  gateSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export default function EmailGateOverlay({
  gatePhase, title, description, gateName, setGateName, gateEmail, setGateEmail,
  gateType, setGateType, gateError, gateSubmitting, onSubmit,
}: Props) {
  if (gatePhase === null || gatePhase === 'content') return null;

  return (
    <>
      <style>{`@keyframes egate-spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(26,16,64,.86)', backdropFilter: 'blur(8px)',
        padding: '16px',
      }}>
        <div style={{
          background: '#fff', borderRadius: '18px',
          border: '1px solid var(--border)',
          padding: '44px 36px', maxWidth: '460px', width: '100%',
          boxShadow: '0 24px 80px rgba(0,0,0,.4)',
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
              <div style={{ fontSize: '.88rem', color: 'var(--soft)', lineHeight: 1.7, marginBottom: '8px' }}>
                Just a moment…
              </div>
              <div style={{
                margin: '16px auto 0', width: 32, height: 32,
                border: '3px solid var(--border)', borderTopColor: 'var(--coral)',
                borderRadius: '50%', animation: 'egate-spin .7s linear infinite',
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
                {title}
              </h2>
              <p style={{ fontSize: '.88rem', color: 'var(--soft)', lineHeight: 1.7, marginBottom: '24px' }}>
                {description}
              </p>

              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{
                    fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase',
                    color: 'var(--soft)', fontWeight: 500, marginBottom: '5px', display: 'block',
                  }}>First name</label>
                  <input
                    type="text" value={gateName} onChange={e => setGateName(e.target.value)}
                    placeholder="Your first name" required aria-label="First name"
                    style={{
                      width: '100%', padding: '13px 16px', borderRadius: '10px',
                      border: '1.5px solid var(--border)', fontFamily: "'DM Sans', sans-serif",
                      fontSize: '1rem', color: 'var(--ink)', background: 'var(--warm)', outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase',
                    color: 'var(--soft)', fontWeight: 500, marginBottom: '5px', display: 'block',
                  }}>Email address</label>
                  <input
                    type="email" value={gateEmail} onChange={e => setGateEmail(e.target.value)}
                    placeholder="you@email.com" required aria-label="Email address"
                    style={{
                      width: '100%', padding: '13px 16px', borderRadius: '10px',
                      border: '1.5px solid var(--border)', fontFamily: "'DM Sans', sans-serif",
                      fontSize: '1rem', color: 'var(--ink)', background: 'var(--warm)', outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase',
                    color: 'var(--soft)', fontWeight: 500, marginBottom: '5px', display: 'block',
                  }}>I&apos;m signing up as</label>
                  <div style={{ display: 'flex', gap: '8px', width: '100%', boxSizing: 'border-box' }}>
                    <button type="button" onClick={() => setGateType('individual')} style={{
                      flex: 1, padding: '11px 16px', borderRadius: '10px',
                      border: `1.5px solid ${gateType === 'individual' ? 'var(--coral)' : 'var(--border)'}`,
                      fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem',
                      fontWeight: gateType === 'individual' ? 600 : 400,
                      color: gateType === 'individual' ? '#fff' : 'var(--ink)',
                      background: gateType === 'individual' ? 'var(--coral)' : 'var(--warm)',
                      cursor: 'pointer', outline: 'none', boxSizing: 'border-box', transition: 'all .15s', lineHeight: 1.2,
                    }}>Individual</button>
                    <button type="button" onClick={() => setGateType('company')} style={{
                      flex: 1, padding: '11px 16px', borderRadius: '10px',
                      border: `1.5px solid ${gateType === 'company' ? 'var(--coral)' : 'var(--border)'}`,
                      fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem',
                      fontWeight: gateType === 'company' ? 600 : 400,
                      color: gateType === 'company' ? '#fff' : 'var(--ink)',
                      background: gateType === 'company' ? 'var(--coral)' : 'var(--warm)',
                      cursor: 'pointer', outline: 'none', boxSizing: 'border-box', transition: 'all .15s', lineHeight: 1.2,
                    }}>Company / Organisation</button>
                  </div>
                </div>
                {gateError && (
                  <div style={{
                    color: '#c0392b', fontSize: '.82rem',
                    background: '#fdf0ea', padding: '8px 12px',
                    borderRadius: '8px', textAlign: 'center',
                  }}>{gateError}</div>
                )}
                <button type="submit" disabled={gateSubmitting} aria-label="Unlock free access"
                  style={{
                    width: '100%', padding: '15px', background: 'var(--coral)', color: '#fff',
                    border: 'none', borderRadius: '40px', cursor: gateSubmitting ? 'not-allowed' : 'pointer',
                    fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem', fontWeight: 600,
                    opacity: gateSubmitting ? .6 : 1, marginTop: '4px',
                  }}>
                  {gateSubmitting ? 'Just a moment…' : 'Unlock free access →'}
                </button>
              </form>
              <p style={{ fontSize: '.7rem', color: 'var(--soft)', marginTop: '14px', opacity: .6 }}>
                No spam. Unsubscribe anytime. Same access across all free resources.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
