import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Paid PDFs are deliberately NOT in public/. Anything under public/ is served
 * by the CDN with no auth check at all, so a single shared link would hand the
 * product to everyone. These files live in private-assets/ instead and are only
 * ever reachable through a route handler that has already verified payment.
 *
 * next.config.ts must list private-assets/ under outputFileTracingIncludes for
 * each route that reads from here, otherwise the files are not bundled into the
 * serverless function and reads fail in production while passing locally.
 */
const PRIVATE_DIR = path.join(process.cwd(), 'private-assets', 'pdfs');

/**
 * Fixed allowlist. Callers pass a key, never a filename, so a caller can never
 * be tricked into reading an arbitrary path.
 */
export const PROTECTED_PDFS = {
  'story-to-income': {
    file: 'story-to-income-blueprint.pdf',
    downloadName: 'The-Story-to-Income-Blueprint.pdf',
  },
  'playbook-H': {
    file: 'Human_Bridge_Premium_Playbook.pdf',
    downloadName: 'Human-Bridge-Premium-Playbook.pdf',
  },
  'playbook-C': {
    file: 'Creative_Amplifier_Premium_Playbook.pdf',
    downloadName: 'Creative-Amplifier-Premium-Playbook.pdf',
  },
  'playbook-S': {
    file: 'Systems_Architect_Premium_Playbook.pdf',
    downloadName: 'Systems-Architect-Premium-Playbook.pdf',
  },
  'playbook-G': {
    file: 'Growth_Catalyst_Premium_Playbook.pdf',
    downloadName: 'Growth-Catalyst-Premium-Playbook.pdf',
  },
} as const;

export type ProtectedPdfKey = keyof typeof PROTECTED_PDFS;

type Disposition = 'inline' | 'attachment';

/**
 * Stream a protected PDF as a Response. Only call this after the caller has
 * verified payment. `no-store` is required: a shared or proxy cache holding
 * this body would recreate the exact hole this route exists to close.
 */
export async function serveProtectedPdf(
  key: ProtectedPdfKey,
  disposition: Disposition = 'inline'
): Promise<Response> {
  const entry = PROTECTED_PDFS[key];
  if (!entry) return new Response('Not found', { status: 404 });

  let bytes: Buffer;
  try {
    bytes = await readFile(path.join(PRIVATE_DIR, entry.file));
  } catch (err: unknown) {
    console.error(
      `[protected-file] Failed to read ${entry.file}:`,
      err instanceof Error ? err.message : String(err)
    );
    return new Response('File unavailable', { status: 500 });
  }

  return new Response(new Uint8Array(bytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(bytes.byteLength),
      'Content-Disposition': `${disposition}; filename="${entry.downloadName}"`,
      'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

/** Uniform refusal. Deliberately terse: it should not help anyone probe. */
export function refuseProtectedPdf(): Response {
  return new Response('Payment required', {
    status: 403,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
