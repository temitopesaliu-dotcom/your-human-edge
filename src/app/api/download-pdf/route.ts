import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/kv';
import { getArchetypeByKey } from '@/lib/archetypes';
import path from 'path';
import fs from 'fs';

const STRIPE_SESSION_PATTERN = /^cs_(live|test)_[A-Za-z0-9]{40,}$/;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id') || '';
  const arch = (searchParams.get('arch') || 'H').toUpperCase();

  if (!STRIPE_SESSION_PATTERN.test(sessionId)) {
    return new NextResponse('Invalid session.', { status: 403 });
  }

  const archetype = getArchetypeByKey(arch);
  if (!archetype) return new NextResponse('Invalid archetype.', { status: 400 });

  // Verify payment
  let isPaid = false;
  const sessionRecord = await getSession(sessionId).catch(() => null);

  if (sessionRecord?.paid) {
    isPaid = true;
  } else {
    // Fallback: check directly with Stripe
    try {
      const stripeRes = await fetch(
        `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            'Stripe-Version': '2023-10-16',
          },
        }
      );
      if (stripeRes.ok) {
        const s = await stripeRes.json();
        isPaid = s.payment_status === 'paid';
      }
    } catch { /* deny */ }
  }

  if (!isPaid) {
    return new NextResponse('Payment not confirmed.', { status: 403 });
  }

  // Find playbook HTML file
  const fileMap: Record<string, string> = {
    H: 'playbook-human-bridge.html',
    C: 'playbook-creative-amplifier.html',
    S: 'playbook-systems-architect.html',
    G: 'playbook-growth-catalyst.html',
  };

  const htmlPath = path.join(process.cwd(), 'src', 'playbook-assets', fileMap[arch] || fileMap['H']);

  let htmlContent: string;
  try {
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  } catch {
    return new NextResponse('Playbook file not found.', { status: 500 });
  }

  // Replace relative URLs
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://temitopesaliu.com';
  htmlContent = htmlContent
    .replace(/href="(?!http|\/\/|data:)([^"]+)"/g, `href="${siteUrl}/$1"`)
    .replace(/src="(?!http|\/\/|data:)([^"]+)"/g, `src="${siteUrl}/$1"`);

  // Dynamically import puppeteer (not available at build time in all envs)
  try {
    const chromiumModule = await import('@sparticuz/chromium');
    const chromium = 'default' in chromiumModule ? chromiumModule.default : chromiumModule;
    const puppeteerModule = await import('puppeteer-core');
    const puppeteer = 'default' in puppeteerModule ? puppeteerModule.default : puppeteerModule;

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'load', timeout: 20000 });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '16mm', bottom: '16mm', left: '12mm', right: '12mm' },
    });
    await browser.close();

    const safeName = archetype.name.replace(/\s+/g, '-').toLowerCase();
    const pdfArrayBuffer = pdfBuffer.buffer.slice(
      pdfBuffer.byteOffset,
      pdfBuffer.byteOffset + pdfBuffer.byteLength
    ) as ArrayBuffer;
    return new NextResponse(pdfArrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="your-human-edge-${safeName}-playbook.pdf"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (err: unknown) {
    console.error('[download-pdf] PDF error:', err instanceof Error ? err.message : String(err));
    return new NextResponse('PDF generation failed. Use browser print instead.', { status: 500 });
  }
}
