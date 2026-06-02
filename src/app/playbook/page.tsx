'use client';
import { Suspense, useEffect, useSyncExternalStore } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getArchetypeByKey } from '@/lib/archetypes';
import { buildPlaybookPageMarkup } from '@/lib/playbook-document';

const STRIPE_SESSION_PATTERN = /^cs_(live|test)_[A-Za-z0-9]{40,}$/;

const noopSubscribe = () => () => {};
const getServerEmpty = () => '';

function PlaybookContent() {
  const router = useRouter();
  const params = useSearchParams();
  const sessionId = params.get('session_id') || '';
  const archKey = (params.get('arch') || 'H').toUpperCase();
  const arch = getArchetypeByKey(archKey);
  const sessionLooksValid = STRIPE_SESSION_PATTERN.test(sessionId);

  const storedName = useSyncExternalStore(
    noopSubscribe,
    () => localStorage.getItem('yhe_name') || '',
    getServerEmpty
  );

  useEffect(() => {
    if (!sessionLooksValid) {
      router.replace('/access-denied');
      return;
    }

    let cancelled = false;

    async function validate() {
      try {
        const qs = new URLSearchParams({ session_id: sessionId, arch: archKey });
        const res = await fetch(`/api/validate-session?${qs.toString()}`, { cache: 'no-store' });
        if (cancelled) return;
        if (res.status === 403) router.replace('/access-denied');
      } catch {
        // Network error — leave the page as-is.
      }
    }

    void validate();

    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) void validate();
    }
    window.addEventListener('pageshow', onPageShow);

    return () => {
      cancelled = true;
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [archKey, router, sessionId, sessionLooksValid]);

  if (!arch || !sessionLooksValid) return null;

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
