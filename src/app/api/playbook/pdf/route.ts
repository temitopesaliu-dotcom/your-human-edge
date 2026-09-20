import { NextRequest } from 'next/server';
import { validatePlaybookAccess } from '@/lib/services/playbook-access';
import { accessCookieForProduct, isValidSessionId } from '@/lib/utils/products';
import {
  refuseProtectedPdf,
  serveProtectedPdf,
  type ProtectedPdfKey,
} from '@/lib/services/protected-file';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The only way to obtain a premium archetype playbook PDF.
 *
 * These four files used to sit under /pdfs/, served by the CDN to anyone with
 * the URL. They now live outside public/ and are released only after the same
 * Stripe verification /playbook performs.
 *
 * The archetype is taken from the validated purchase, never from the request,
 * so a buyer cannot request a playbook they did not pay for by changing a
 * query parameter.
 */
export async function GET(req: NextRequest) {
  const cookieSessionId = req.cookies.get(accessCookieForProduct('playbook'))?.value || '';
  const paramSessionId = req.nextUrl.searchParams.get('session_id') || '';
  const sessionId = isValidSessionId(cookieSessionId)
    ? cookieSessionId
    : isValidSessionId(paramSessionId)
      ? paramSessionId
      : '';

  if (!sessionId) return refuseProtectedPdf();

  const access = await validatePlaybookAccess(sessionId);
  if (!access.ok) return refuseProtectedPdf();

  return serveProtectedPdf(`playbook-${access.archetype}` as ProtectedPdfKey, 'inline');
}
