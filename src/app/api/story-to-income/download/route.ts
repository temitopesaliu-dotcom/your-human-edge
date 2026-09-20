import { NextRequest } from 'next/server';
import { validatePurchaseAccess } from '@/lib/services/purchase-access';
import { isValidSessionId } from '@/lib/utils/products';
import { refuseProtectedPdf, serveProtectedPdf } from '@/lib/services/protected-file';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The only way to obtain The Story to Income Blueprint PDF.
 *
 * The file used to sit at /downloads/story-to-income-blueprint.pdf, which the
 * CDN served to anyone who had the URL. One buyer sharing that link gave the
 * product away permanently. The file now lives outside public/ and is released
 * only after the same Stripe verification the download page performs.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id') || '';
  if (!isValidSessionId(sessionId)) return refuseProtectedPdf();

  const access = await validatePurchaseAccess(sessionId, 'story-to-income');
  if (!access.ok) return refuseProtectedPdf();

  return serveProtectedPdf('story-to-income', 'attachment');
}
