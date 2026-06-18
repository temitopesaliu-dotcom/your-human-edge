import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getArchetypeByKey } from '@/lib/archetypes';
import { validatePlaybookAccess } from '@/lib/playbook-access';
import {
  accessCookieForProduct,
  isValidSessionId,
} from '@/lib/products';
import PlaybookPdfViewer from '@/components/playbook-pdf-viewer';

export const metadata: Metadata = {
  title: 'Your Premium AI Career Playbook | Your Human Edge',
  description:
    'Access your personalized AI career playbook with archetype-specific strategies, income pathways, and 90-day action plan.',
  robots: 'noindex, nofollow',
};

type PageProps = {
  searchParams: Promise<{ session_id?: string; arch_verified?: string }>;
};

export default async function PlaybookPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const playbookCookie = accessCookieForProduct('playbook');
  const existingCookie = cookieStore.get(playbookCookie)?.value || '';
  const sessionIdFromParams =
    params.session_id && isValidSessionId(params.session_id)
      ? params.session_id
      : '';

  // ── arch_verified short-circuit ───────────────────────────────────────────
  // The set-playbook-cookie route handler redirects here with arch_verified +
  // session_id after validating the Stripe session. We MUST re-validate the
  // session_id here — arch_verified is a client-controlled query param and on
  // its own proves nothing. The archetype is taken from the validated access
  // result, never from the URL.
  const validKeys = ['H', 'C', 'S', 'G'] as const;
  const archVerified = params.arch_verified as string | undefined;
  if (archVerified) {
    if (!validKeys.includes(archVerified as typeof validKeys[number])) {
      redirect('/access-denied');
    }
    // The session_id that the route handler validated moments ago. A missing
    // or invalid one means this is a direct, unauthenticated hit — deny.
    const sid = isValidSessionId(sessionIdFromParams) ? sessionIdFromParams : '';
    if (!sid) {
      redirect('/access-denied');
    }
    const access = await validatePlaybookAccess(sid);
    if (!access.ok) {
      redirect('/access-denied');
    }
    const arch = getArchetypeByKey(access.archetype);
    if (!arch) {
      redirect('/access-denied');
    }
    return (
      <div style={{ minHeight: '100dvh' }}>
        <PlaybookPdfViewer
          archetypeKey={arch.key}
          userName={access.name || undefined}
          userEmail={access.email || undefined}
        />
      </div>
    );
  }

  // ── Normal flow (no arch_verified) ────────────────────────────────────────
  // If we have a session_id in the URL but no cookie yet, redirect through
  // the route handler to set the cookie (can't do it from a Server Component).
  if (sessionIdFromParams && !existingCookie) {
    redirect(`/api/set-playbook-cookie?session_id=${sessionIdFromParams}`);
  }

  const sessionId = sessionIdFromParams || existingCookie;

  if (!sessionId || !isValidSessionId(sessionId)) {
    redirect('/access-denied');
  }

  const access = await validatePlaybookAccess(sessionId);
  if (!access.ok) {
    redirect('/access-denied');
  }

  const arch = getArchetypeByKey(access.archetype);
  if (!arch) {
    redirect('/access-denied');
  }

  return (
    <div style={{ minHeight: '100dvh' }}>
      <PlaybookPdfViewer
        archetypeKey={arch.key}
        userName={access.name || undefined}
        userEmail={access.email || undefined}
      />
    </div>
  );
}

