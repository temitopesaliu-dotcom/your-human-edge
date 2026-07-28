import { STAGES } from "./b2b-prompt.data";

export default function StagesSection() {
  return (
    <div style={{ marginBottom: '4rem' }}>
      <div style={{
        fontSize: '.68rem', fontWeight: 600, letterSpacing: '.18em',
        textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem',
      }}>
        What you get
      </div>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
        fontWeight: 500, color: 'var(--ink)', marginBottom: '0.6rem', lineHeight: 1.15,
      }}>
        The prompt builds all 7 stages
      </h2>
      <p style={{
        fontSize: '.92rem', color: 'var(--soft)', lineHeight: 1.75,
        marginBottom: '1.8rem', maxWidth: 580,
      }}>
        Paste the prompt, fill in your product details, and the AI outputs a full operational playbook tailored to your business. Here is what each stage covers.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {STAGES.map(s => (
          <div key={s.num} className="b2b-stage-card">
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(15,110,86,.08)',
              border: '1.5px solid rgba(15,110,86,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.05rem', fontWeight: 600, color: 'var(--teal)',
              fontFamily: "'Cormorant Garamond', serif",
              flexShrink: 0,
            }}>
              {s.num}
            </div>
            <div>
              <div style={{
                fontSize: '.9rem', fontWeight: 600, color: 'var(--ink)',
                marginBottom: 4, lineHeight: 1.3,
              }}>
                {s.name}
              </div>
              <div style={{ fontSize: '.82rem', color: 'var(--soft)', lineHeight: 1.65 }}>
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
