import { NextRequest, NextResponse } from 'next/server';

/**
 * Personal join link: temitopesaliu.com/live/k7m2x
 * Records that this registrant opened their link and asks the sheet for their own
 * Zoom join link (registration is on for the Saturday meeting, so each registrant has
 * one). Sends them straight into Zoom with it. Never blocks: if the sheet is slow or
 * down, they go to the shared link at /live, where Zoom asks for name and email once.
 */
export const dynamic = 'force-dynamic';

const ZOOM_RE = /^https:\/\/([a-z0-9-]+\.)*zoom\.us\//i;

async function ownZoomLink(code: string): Promise<string | null> {
  const url = process.env.GOOGLE_SHEETS_BRIDGE_WEBHOOK_URL;
  const secret = process.env.BRIDGE_SHEET_SECRET;
  if (!url || !secret) return null;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'join', code, secret }),
      redirect: 'follow',
      signal: AbortSignal.timeout(9000),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; zoom?: string } | null;
    const zoom = typeof data?.zoom === 'string' ? data.zoom : '';
    return ZOOM_RE.test(zoom) ? zoom : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  if (/^[a-z0-9]{4,8}$/i.test(code)) {
    const zoom = await ownZoomLink(code.toLowerCase());
    if (zoom) return NextResponse.redirect(zoom, 302);
  }
  return NextResponse.redirect(new URL('/live', req.url), 302);
}
