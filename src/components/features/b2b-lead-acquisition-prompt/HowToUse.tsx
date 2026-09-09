import { HOW_STEPS } from "./b2b-prompt.data";

export default function HowToUse() {
  return (
    <div>
      <div style={{
        fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em',
        textTransform: 'uppercase', color: 'var(--ds-accent, #6c4fd6)', marginBottom: '0.5rem',
      }}>
        How to use this
      </div>
      <h2 style={{
        fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
        fontWeight: 700, color: 'var(--ds-ink, #221f1a)', marginBottom: '0.6rem', lineHeight: 1.15,
      }}>
        Four steps from blank page to working system
      </h2>
      <p style={{
        fontSize: '.92rem', color: 'var(--soft)', lineHeight: 1.75,
        marginBottom: '1.8rem', maxWidth: 580,
      }}>
        From blank page to working lead acquisition system.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {HOW_STEPS.map(h => (
          <div key={h.step} className="b2b-step-row">
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--ds-accent-soft, #f1edfd)',
              border: '1.5px solid rgba(108,79,214,.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', fontWeight: 600, color: 'var(--ds-accent, #6c4fd6)',
              fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
              flexShrink: 0, marginTop: 2,
            }}>
              {h.step}
            </div>
            <div>
              <div style={{ fontSize: '.9rem', fontWeight: 600, color: 'var(--ds-ink, #221f1a)', marginBottom: 4 }}>
                {h.title}
              </div>
              <div style={{ fontSize: '.82rem', color: 'var(--ds-muted, #655f74)', lineHeight: 1.65 }}>
                {h.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
