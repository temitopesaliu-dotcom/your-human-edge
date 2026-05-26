import { NextRequest, NextResponse } from 'next/server';
import { access } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { getSession } from '@/lib/kv';
import { getArchetypeByKey } from '@/lib/archetypes';
import { buildPlaybookDocumentHtml } from '@/lib/playbook-document';

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
  let storedName = sessionRecord?.name || '';

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
        storedName = storedName || s.customer_details?.name || s.customer_name || '';
      }
    } catch { /* deny */ }
  }

  if (!isPaid) {
    return new NextResponse('Payment not confirmed.', { status: 403 });
  }

  const htmlContent = buildPlaybookDocumentHtml({
    archetype,
    sessionId,
    storedName,
  });
  // Dynamically import puppeteer (not available at build time in all envs)
  try {
    const chromiumModule = await import('@sparticuz/chromium');
    const chromium = 'default' in chromiumModule ? chromiumModule.default : chromiumModule;
    const puppeteerModule = await import('puppeteer-core');
    const puppeteer = 'default' in puppeteerModule ? puppeteerModule.default : puppeteerModule;
    let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;

    const browserExecutable = await resolveBrowserExecutablePath(chromium);
    if (!browserExecutable) {
      return htmlFallbackResponse(htmlContent);
    }

    try {
      browser = await puppeteer.launch(
        browserExecutable.isLocal
          ? {
              executablePath: browserExecutable.path,
              args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
              headless: true,
            }
          : {
              args: chromium.args,
              executablePath: browserExecutable.path,
              headless: true,
            }
      );

      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'load', timeout: 20000 });
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '16mm', bottom: '16mm', left: '12mm', right: '12mm' },
      });

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
    } finally {
      await browser?.close().catch(() => {});
    }
  } catch (err: unknown) {
    console.error('[download-pdf] PDF error:', err instanceof Error ? err.message : String(err));
    return htmlFallbackResponse(htmlContent);
  }
}

function htmlFallbackResponse(htmlContent: string) {
  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store',
    },
  });
}

async function resolveBrowserExecutablePath(
  chromium: { executablePath: () => Promise<string> }
): Promise<{ path: string; isLocal: boolean } | null> {
  const configuredPath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    process.env.CHROME_PATH ||
    process.env.GOOGLE_CHROME_BIN;

  if (configuredPath) {
    try {
      await access(configuredPath, fsConstants.X_OK);
      return { path: configuredPath, isLocal: true };
    } catch {
      // Fall back to known local candidates and Chromium's packaged path.
    }
  }

  const localCandidates = process.platform === 'darwin'
    ? [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
      ]
    : [];

  for (const candidate of localCandidates) {
    try {
      await access(candidate, fsConstants.X_OK);
      return { path: candidate, isLocal: true };
    } catch {
      // Try the next browser candidate.
    }
  }

  if (process.env.VERCEL || process.env.AWS_REGION || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const path = await chromium.executablePath().catch(() => null);
    return path ? { path, isLocal: false } : null;
  }

  const path = await chromium.executablePath().catch(() => null);
  return path ? { path, isLocal: false } : null;
}
