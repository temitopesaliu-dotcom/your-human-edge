import { INTRO_ITEMS } from "./b2b-prompt.data";

export default function Hero() {
  return (
    <div
      className="b2b-hero-pad"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(108,79,214,.08), transparent 60%), var(--ds-bg, #ffffff)',
        padding: '112px 28px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, rgba(108,79,214,.06), transparent 65%)',
        pointerEvents: 'none',
      }} aria-hidden />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase',
          color: 'var(--ds-accent, #6c4fd6)', fontWeight: 600, marginBottom: 20,
          border: '1px solid var(--ds-border, #e7e1f5)', background: 'var(--ds-tint, #f7f5fc)', padding: '5px 16px', borderRadius: 40,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--ds-accent, #6c4fd6)', display: 'inline-block',
          }} aria-hidden />
          Free Framework · For Companies
        </div>

        <h1 style={{
          fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
          fontSize: 'clamp(2rem, 6vw, 3.8rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--ds-ink, #221f1a)',
          lineHeight: 1.1,
          marginBottom: 18,
        }}>
          How to acquire B2B leads<br />
          <em style={{ color: 'var(--ds-accent, #6c4fd6)', fontStyle: 'italic' }}>systematically — and close them.</em>
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--ds-muted, #655f74)',
          maxWidth: 520,
          margin: '0 auto 36px',
          lineHeight: 1.8,
        }}>
          A master prompt that builds a complete, tailored 7-stage lead acquisition playbook for any B2B company — in under 2 minutes.
        </p>

        <div className="b2b-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {INTRO_ITEMS.map(item => (
            <div key={item.title} className="b2b-pill" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'var(--ds-tint, #f7f5fc)',
              border: '1px solid var(--ds-border, #e7e1f5)',
              borderRadius: 40, padding: '7px 16px',
              fontSize: '.78rem', color: 'var(--ds-muted, #655f74)',
            }}>
              <span aria-hidden>{item.icon}</span>
              <span><strong style={{ color: 'var(--ds-ink, #221f1a)' }}>{item.title}</strong> — {item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
