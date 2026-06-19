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
  gateType: 'coach' | 'company';
  setGateType: (v: 'coach' | 'company') => void;
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
    <div className="egate-backdrop">
      <div className="egate-card">
        {gatePhase === 'checking' ? (
          <>
            <div className="egate-icon" aria-hidden>🔍</div>
            <div className="egate-label">Checking your access</div>
            <div className="egate-desc" style={{ marginBottom: '8px' }}>Just a moment…</div>
            <div className="egate-spinner" />
          </>
        ) : (
          <>
            <div className="egate-icon" aria-hidden>📋</div>
            <div className="egate-label">Free access</div>
            <h2 className="egate-title">{title}</h2>
            <p className="egate-desc">{description}</p>

            <form onSubmit={onSubmit} className="egate-form">
              <div>
                <label className="form-label">First name</label>
                <input
                  className="form-input"
                  type="text"
                  value={gateName}
                  onChange={e => setGateName(e.target.value)}
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
                  value={gateEmail}
                  onChange={e => setGateEmail(e.target.value)}
                  placeholder="you@email.com"
                  autoComplete='email'
                  inputMode='email'
                  required
                  aria-label="Email address"
                />
              </div>
              <div>
                <label className="form-label">I&apos;m signing up as</label>
                <div className="egate-type-group">
                  <button
                    type="button"
                    className={`egate-type-btn${gateType === 'coach' ? ' egate-type-btn--active' : ''}`}
                    onClick={() => setGateType('coach')}
                  >
                    Coach
                  </button>
                  <button
                    type="button"
                    className={`egate-type-btn${gateType === 'company' ? ' egate-type-btn--active' : ''}`}
                    onClick={() => setGateType('company')}
                  >
                    Company / Organisation
                  </button>
                </div>
              </div>
              {gateError && <div className="form-error">{gateError}</div>}
              <button
                type="submit"
                className="btn-submit"
                disabled={gateSubmitting}
                aria-label="Unlock free access"
              >
                {gateSubmitting ? 'Just a moment…' : 'Unlock free access →'}
              </button>
            </form>
            <p className="egate-disclaimer">No spam. Unsubscribe anytime. Same access across all free resources.</p>
          </>
        )}
      </div>
    </div>
  );
}

