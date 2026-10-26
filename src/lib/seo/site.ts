/**
 * The one official address of the site. Canonical tags, the sitemap and
 * robots.txt all build on it, so search engines see a single host.
 *
 * Hard-coded on purpose, not read from NEXT_PUBLIC_SITE_URL: a preview
 * deployment must still point Google at production, never at itself.
 * The bare domain is the live site; www is redirected to it in Vercel.
 */
export const CANONICAL_ORIGIN = 'https://temitopesaliu.com';

/**
 * Every page Google should list. Keep this in step with the canonical tags:
 * a page belongs here only if it is public, has no noindex, and does not
 * redirect.
 *
 * Deliberately left out:
 * - noindex pages: purchase confirmations, thank-you and welcome pages,
 *   course access and download pages, intake forms, the quiz gate, quiz
 *   results, and the static pages in public/ with their own noindex tag.
 * - redirecting paths: /intelligence-layer (now /expert-framework-profile)
 *   and /expert-framework, which points at /workshop while the live class
 *   is on sale. Add /expert-framework back here when that redirect is
 *   removed from next.config.ts.
 */
export const INDEXABLE_PATHS: readonly string[] = [
  '/',
  '/quiz',
  '/expert-framework-profile',
  '/paths',
  '/resources',
  '/resources/ai-for-coaches',
  '/resources/b2b-lead-acquisition-prompt',
  '/resources/the-bridge',
  '/resources/the-merge-method',
  '/workshop',
  '/story-to-income',
  '/the-blueprint-audit',
  '/the-blueprint-audit/blueprint',
  '/the-blueprint-audit/apply',
  '/demos',
  // Static pages in public/, served through rewrites in next.config.ts.
  // Their canonical tag is written by hand in each HTML head.
  '/the-business-architect-programme',
  '/get-this-built',
  '/for-lifecoaches',
];
