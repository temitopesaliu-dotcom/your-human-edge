export function GateHero() {
  return (
    <div className="as-hero" style={{
      background: 'var(--stadium)',
      color: 'var(--chalk)',
      padding: '56px 32px 40px',
      position: 'relative',
      textAlign: 'center',
    }}>
      <div className="as-display as-hero-ai" style={{
        color: 'var(--floodlight)',
        fontSize: 'clamp(90px, 22vw, 180px)',
        lineHeight: 0.8,
        textShadow: '0 0 60px rgba(242, 169, 60, 0.45)',
      }}>
        AI
      </div>
      <div style={{
        fontFamily: "'Literata', serif",
        fontStyle: 'italic',
        color: 'rgba(246, 241, 228, 0.65)',
        fontSize: 'clamp(16px, 3vw, 22px)',
        margin: '2px 0 6px',
      }}>
        for
      </div>
      <div className="as-display" style={{
        color: 'var(--chalk)',
        fontSize: 'clamp(24px, 4.6vw, 42px)',
        lineHeight: 1.15,
        maxWidth: 640,
        margin: '0 auto',
      }}>
        Teachers, Coaches, Trainers, Facilitators.
      </div>

      <div className="as-capacity" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        margin: '36px auto 0',
        maxWidth: 560,
        borderTop: '1px solid var(--line-dark)',
        paddingTop: 24,
      }}>
        <div className="as-cap-item" style={{ borderLeft: 'none', paddingLeft: 0 }}>
          <div className="as-display" style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(22px, 4vw, 34px)',
            color: 'var(--floodlight)',
            lineHeight: 1,
          }}>
            30
          </div>
          <div className="as-label" style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: 'rgba(246, 241, 228, 0.6)',
            marginTop: 6,
          }}>
            A classroom
          </div>
        </div>
        <div className="as-cap-item" style={{ borderLeft: '1px solid var(--line-dark)', paddingLeft: 14 }}>
          <div className="as-display" style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(22px, 4vw, 34px)',
            color: 'var(--floodlight)',
            lineHeight: 1,
          }}>
            2,000
          </div>
          <div className="as-label" style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: 'rgba(246, 241, 228, 0.6)',
            marginTop: 6,
          }}>
            A lecture hall
          </div>
        </div>
        <div className="as-cap-item" style={{ borderLeft: '1px solid var(--line-dark)', paddingLeft: 14 }}>
          <div className="as-display" style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(22px, 4vw, 34px)',
            color: 'var(--floodlight)',
            lineHeight: 1,
          }}>
            50,000+
          </div>
          <div className="as-label" style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: 'rgba(246, 241, 228, 0.6)',
            marginTop: 6,
          }}>
            A stadium — what AI opens up
          </div>
        </div>
      </div>
    </div>
  );
}
