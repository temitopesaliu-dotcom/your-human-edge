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
 * a page belongs here only if it is public and has no noindex.
 *
 * Deliberately left out (noindex): purchase confirmations, thank-you and
 * welcome pages, course access and download pages, intake forms, the quiz
 * gate and quiz results, and the static pages in public/ that carry their
 * own noindex meta tag.
 */
export const INDEXABLE_PATHS: readonly string[] = [
  '/',
  '/quiz',
  '/intelligence-layer',
  '/paths',
  '/resources',
  '/resources/ai-for-coaches',
  '/resources/b2b-lead-acquisition-prompt',
  '/resources/the-bridge',
  '/resources/the-merge-method',
  '/expert-framework',
  '/story-to-income',
  '/workshop',
  '/the-blueprint-audit',
  '/the-blueprint-audit/blueprint',
  '/the-blueprint-audit/apply',
  '/the-business-architect-programme',
  '/demos',
  // Static pages in public/, served through rewrites in next.config.ts.
  // Their canonical tag is written by hand in each HTML head.
  '/get-this-built',
  '/for-lifecoaches',
];
