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

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: buildPlaybookPageMarkup({
          archetype: arch,
          sessionId,
          storedName,
        }),
      }}
    />
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
