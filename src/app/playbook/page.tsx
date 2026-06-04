import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getArchetypeByKey } from '@/lib/archetypes';
import { buildPlaybookPageMarkup } from '@/lib/playbook-document';
import { validatePlaybookAccess } from '@/lib/playbook-access';
import {
  accessCookieForProduct,
  isValidSessionId,
  PURCHASE_COOKIE_MAX_AGE,
} from '@/lib/products';

export const metadata: Metadata = {
  title: 'Your AI Career Playbook | Your Human Edge',
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
  const sessionId =
    (params.session_id && isValidSessionId(params.session_id)
      ? params.session_id
      : '') || cookieStore.get(playbookCookie)?.value || '';

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

  cookieStore.set(playbookCookie, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: PURCHASE_COOKIE_MAX_AGE,
    path: '/',
  });

  const html = buildPlaybookPageMarkup({
    archetype: arch,
    storedName: access.name,
  });

  return (
    <div
      className="playbook-page"
      role="main"
      aria-label="AI Career Playbook"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
