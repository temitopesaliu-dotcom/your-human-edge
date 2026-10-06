import type { MetadataRoute } from 'next';
import { CANONICAL_ORIGIN } from '@/lib/seo/site';

/**
 * Served at /robots.txt. Crawling is open on purpose, including private
 * pages such as confirmations and personal results: those carry a noindex
 * tag, and Google can only obey that tag on a page it is allowed to read.
 * Blocking them here would keep the tag unseen and could leave the bare URL
 * in search results. Only the API, which has no pages, is closed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${CANONICAL_ORIGIN}/sitemap.xml`,
    host: CANONICAL_ORIGIN,
  };
}
