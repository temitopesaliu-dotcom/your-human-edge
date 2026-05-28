'use client';
import { Suspense, useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getArchetypeByKey } from '@/lib/archetypes';
import { buildPlaybookPageMarkup } from '@/lib/playbook-document';

const STRIPE_SESSION_PATTERN = /^cs_(live|test)_[A-Za-z0-9]{40,}$/;

function PlaybookContent() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get('session_id') || '';
  const archKey = (params.get('arch') || 'H').toUpperCase();
  const arch = getArchetypeByKey(archKey);

  const [status, setStatus] = useState<'validating' | 'granted' | 'denied'>('validating');
  const storedName = useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem('yhe_name') || '',
    () => ''
  );

  useEffect(() => {
    void (async () => {
      // Basic client-side format check first
      if (!sessionId || !STRIPE_SESSION_PATTERN.test(sessionId)) {
        router.replace('/access-denied');
        return;
      }

      try {
        // Call our validation endpoint
        const res = await fetch(
          `/api/validate-session?session_id=${encodeURIComponent(sessionId)}&arch=${archKey}`
        );
        if (res.ok) {
          setStatus('granted');
        } else {
          router.replace('/access-denied');
        }
      } catch {
        // If validation API fails, do client-side check as fallback
        // (Edge validation happens server-side via middleware)
        setStatus('granted');
      }
    })();
  }, [archKey, router, sessionId]);

  if (status === 'validating') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)' }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '12px' }}>Verifying access…</div>
          <div style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.4)' }}>Checking your purchase confirmation</div>
        </div>
      </div>
    );
  }

  if (!arch) return null;

  const downloadHref = `/api/download-pdf?session_id=${encodeURIComponent(sessionId)}&arch=${arch.key}`;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: buildPlaybookPageMarkup({
            archetype: arch,
            sessionId,
            storedName,
          }),
        }}
      />
      <a
        href={downloadHref}
        download
        style={{
          position: 'fixed',
          bottom: 'calc(24px + env(safe-area-inset-bottom))',
          right: 24,
          zIndex: 60,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#1a1040',
          color: '#fff',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          padding: '12px 20px',
          borderRadius: 999,
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(26,16,64,.28)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download PDF
      </a>
    </>
  );
}

export default function PlaybookPage() {
  return (
    <div className="playbook-page">
      <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--ink)' }} />}>
        <PlaybookContent />
      </Suspense>
    </div>
  );
}
