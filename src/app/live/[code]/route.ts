import { NextRequest, NextResponse } from 'next/server';
import { sendToBridgeSheet } from '@/lib/bridge/sheet';

/**
 * Personal join link: temitopesaliu.com/live/k7m2x
 * Records that this registrant opened their link, then sends them straight to
 * the Zoom redirect at /live. Never blocks: if the sheet is slow or down the
 * person still reaches Zoom.
 */
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  if (/^[a-z0-9]{4,8}$/i.test(code)) {
    await Promise.race([
      sendToBridgeSheet({ action: 'join', code: code.toLowerCase() }).catch(() => false),
      new Promise((r) => setTimeout(r, 2500)),
    ]);
  }
  return NextResponse.redirect(new URL('/live', req.url), 302);
}
