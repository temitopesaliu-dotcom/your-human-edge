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
  searchParams: Promise<{ session_id?: string; arch?: string }>;
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
    <div style={{ minHeight: '100vh' }}>
      <PlaybookPdfViewer
        archetypeKey={arch.key}
        userName={access.name || undefined}
        userEmail={access.email || undefined}
      />
    </div>
  );
}
