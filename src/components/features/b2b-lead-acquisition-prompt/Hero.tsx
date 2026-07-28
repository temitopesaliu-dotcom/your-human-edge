import { INTRO_ITEMS } from "./b2b-prompt.data";

export default function Hero() {
  return (
    <div
      className="b2b-hero-pad"
      style={{
        background: 'linear-gradient(135deg, #1a1040 0%, #2d1b6e 100%)',
        padding: '112px 28px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, rgba(15,110,86,.2), transparent 65%)',
        pointerEvents: 'none',
      }} aria-hidden />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase',
          color: '#c8940a', fontWeight: 500, marginBottom: 20,
          border: '1px solid rgba(200,148,10,.25)', padding: '5px 16px', borderRadius: 40,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#c8940a', display: 'inline-block',
          }} aria-hidden />
          Free Framework · For Companies
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 6vw, 3.8rem)',
          fontWeight: 400,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: 18,
        }}>
          How to acquire B2B leads<br />
          <em style={{ color: '#c8940a', fontStyle: 'italic' }}>systematically — and close them.</em>
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,.6)',
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
              background: 'rgba(255,255,255,.07)',
              border: '1px solid rgba(255,255,255,.1)',
              borderRadius: 40, padding: '7px 16px',
              fontSize: '.78rem', color: 'rgba(255,255,255,.75)',
            }}>
              <span aria-hidden>{item.icon}</span>
              <span><strong style={{ color: '#fff' }}>{item.title}</strong> — {item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
