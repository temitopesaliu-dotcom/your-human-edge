import type { MetadataRoute } from 'next';
import { CANONICAL_ORIGIN, INDEXABLE_PATHS } from '@/lib/seo/site';

/**
 * Served at /sitemap.xml. Lists public pages only; the list itself lives in
 * src/lib/seo/site.ts so it sits next to the rules for what is left out.
 * No lastModified: a made-up date is worse for crawling than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.map((path) => ({
    // Same form as the canonical tags, so the two never disagree.
    url: path === '/' ? CANONICAL_ORIGIN : `${CANONICAL_ORIGIN}${path}`,
  }));
}
