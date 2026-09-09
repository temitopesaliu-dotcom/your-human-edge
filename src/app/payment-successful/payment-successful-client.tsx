'use client';

import PurchaseTracker from '@/components/purchase-tracker';
import SiteFooter from '@/components/site-footer';

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
    <>
      <PurchaseTracker
        productId="stadium-live"
        productName="AI Stadium Live Class"
        value={97}
        dedupKey="purchase-tracked-stadium-live"
      />
      <div
        style={{
          background: 'var(--ds-bg, #ffffff)',
          fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
          color: 'var(--ds-ink, #221f1a)',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div
          style={{
            maxWidth: '620px',
            width: '100%',
            marginBottom: '40px',
            background: 'var(--ds-surface, #ffffff)',
            color: 'var(--ds-ink, #221f1a)',
            borderRadius: '14px',
            padding: '48px 40px 40px',
            textAlign: 'center',
            border: '1px solid var(--ds-border, #e7e1f5)',
            boxShadow: 'var(--ds-shadow-pop, 0 18px 50px rgba(20, 10, 50, 0.08))',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'var(--ds-accent-soft, #f1edfd)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              border: '3px solid var(--ds-accent, #6c4fd6)',
            }}
            aria-hidden
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ds-accent, #6c4fd6)"
              strokeWidth="3"
            >
              <polyline points="4 13 9 18 20 7" />
            </svg>
          </div>

          <h1
            style={{
              fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
              fontSize: '32px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--ds-ink, #221f1a)',
              marginBottom: '8px',
            }}
          >
            Payment Confirmed
          </h1>

          <p
            style={{
              fontStyle: 'italic',
              fontSize: '16px',
              color: 'var(--ds-muted, #655f74)',
              marginBottom: '28px',
            }}
          >
            You&apos;re in. See you at the live class.
          </p>

          <div
            style={{
              width: '60px',
              height: '2px',
              background: 'var(--ds-accent, #6c4fd6)',
              margin: '0 auto 24px',
              opacity: 0.5,
            }}
            aria-hidden
          />

          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--ds-body, #3a352c)',
            }}
          >
            A confirmation email has been sent to your inbox.
            <br />
            Your training will take place on{' '}
            <strong style={{ color: 'var(--ds-accent, #6c4fd6)', fontWeight: 600 }}>
              July 12, 2026
            </strong>{' '}
            at{' '}
            <strong style={{ color: 'var(--ds-accent, #6c4fd6)', fontWeight: 600 }}>
              4:00 PM (UK time)
            </strong>
            <span
              style={{
                display: 'block',
                fontSize: '14px',
                color: 'var(--ds-muted, #655f74)',
                marginTop: '4px',
              }}
            >
              (15:00 GMT / UTC)
            </span>
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px 20px',
              margin: '24px 0 28px',
              textAlign: 'left',
              background: 'var(--ds-tint, #f7f5fc)',
              borderRadius: '12px',
              padding: '18px 22px',
              border: '1px solid var(--ds-border, #e7e1f5)',
            }}
          >
            {TIME_ZONES.map((tz) => (
              <div key={tz.label}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'var(--ds-muted, #655f74)',
                  }}
                >
                  {tz.label}
                </span>
                <div
                  style={{
                    fontSize: '14px',
                    color: tz.gold ? 'var(--ds-accent, #6c4fd6)' : 'var(--ds-ink, #221f1a)',
                    fontWeight: 500,
                  }}
                >
                  {tz.time}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: '13px',
              color: 'var(--ds-muted, #655f74)',
              fontStyle: 'italic',
              borderTop: '1px solid var(--ds-border, #e7e1f5)',
              paddingTop: '20px',
              marginTop: '6px',
            }}
          >
            A calendar invite with the link will follow shortly.
          </p>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
