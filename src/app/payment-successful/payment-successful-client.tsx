'use client';

const TIME_ZONES = [
  { label: 'UK (BST)', time: '16:00 (4 PM)', gold: true },
  { label: 'GMT / UTC', time: '15:00 (3 PM)', gold: false },
  { label: 'Lagos (WAT)', time: '16:00 (4 PM)', gold: false },
  { label: 'Johannesburg (CAT)', time: '17:00 (5 PM)', gold: false },
  { label: 'Nairobi (EAT)', time: '18:00 (6 PM)', gold: false },
  { label: 'Mumbai (IST)', time: '20:30 (8:30 PM)', gold: false },
  { label: 'New York (EDT)', time: '11:00 (11 AM)', gold: false },
  { label: 'Chicago (CDT)', time: '10:00 (10 AM)', gold: false },
  { label: 'Los Angeles (PDT)', time: '08:00 (8 AM)', gold: false },
  { label: 'Sydney (AEST)', time: '01:00 (1 AM) next day', gold: false },
];

export default function PaymentSuccessfulClient() {
  return (
    <div style={{
      background: '#F6F1E4',
      fontFamily: "'Literata', Georgia, serif",
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div
        style={{
          maxWidth: '620px',
          width: '100%',
          background: '#14171F',
          color: '#F6F1E4',
          borderRadius: '20px',
          padding: '48px 40px 40px',
          textAlign: 'center',
          border: '1px solid rgba(242, 169, 60, 0.3)',
          boxShadow: '0 20px 60px rgba(20, 23, 31, 0.5)',
        }}
      >
        {/* Check icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: '#2E7D5B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            border: '3px solid #F2A93C',
          }}
          aria-hidden
        >
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#F6F1E4" strokeWidth="3">
            <polyline points="4 13 9 18 20 7" />
          </svg>
        </div>

        <h1 style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: '34px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: '#F2A93C',
          marginBottom: '8px',
        }}>
          Payment Confirmed
        </h1>

        <p style={{
          fontFamily: "'Literata', serif",
          fontStyle: 'italic',
          fontSize: '16px',
          color: 'rgba(246, 241, 228, 0.7)',
          marginBottom: '28px',
        }}>
          You&apos;re in. See you at the stadium.
        </p>

        <div style={{
          width: '60px',
          height: '2px',
          background: '#F2A93C',
          margin: '0 auto 24px',
          opacity: 0.5,
        }} aria-hidden />

        <p style={{
          fontSize: '16px',
          lineHeight: 1.7,
          color: 'rgba(246, 241, 228, 0.9)',
        }}>
          A confirmation email has been sent to your inbox.
          <br />
          Your training will take place on{' '}
          <strong style={{ color: '#F2A93C', fontWeight: 600 }}>July 12, 2026</strong> at{' '}
          <strong style={{ color: '#F2A93C', fontWeight: 600 }}>4:00 PM (UK time)</strong>
          <span style={{ display: 'block', fontSize: '14px', color: 'rgba(246,241,228,0.5)', marginTop: '4px' }}>
            (15:00 GMT / UTC)
          </span>
        </p>

        {/* Time zone grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px 20px',
          margin: '24px 0 28px',
          textAlign: 'left',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '12px',
          padding: '18px 22px',
          border: '1px solid rgba(246, 241, 228, 0.08)',
        }}>
          {TIME_ZONES.map((tz) => (
            <div key={tz.label}>
              <span style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: '11px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'rgba(246, 241, 228, 0.4)',
              }}>
                {tz.label}
              </span>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '14px',
                color: tz.gold ? '#F2A93C' : '#F6F1E4',
                fontWeight: 500,
              }}>
                {tz.time}
              </div>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '13px',
          color: 'rgba(246, 241, 228, 0.4)',
          fontStyle: 'italic',
          borderTop: '1px solid rgba(246, 241, 228, 0.06)',
          paddingTop: '20px',
          marginTop: '6px',
        }}>
          A calendar invite with the link will follow shortly.
        </p>
      </div>
    </div>
  );
}
