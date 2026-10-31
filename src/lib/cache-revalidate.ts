import { revalidateTag, revalidatePath } from 'next/cache';

export interface RevalidationReport {
  success: boolean;
  purgedTags: string[];
  failedTags: { tag: string; error: string }[];
  revalidatedPaths: string[];
  failedPaths: { path: string; error: string }[];
  timestamp: string;
}

/**
 * Universal targeted on-demand cache revalidation.
 * Invalidates specific Next.js 15.5.28 Data Cache tags and targeted localized route segments.
 * Eliminates broad layout flushes (e.g. revalidatePath('/', 'layout')) to protect Vercel ISR quota.
 */
export function revalidateSite(tags: string[] = []): RevalidationReport {
  const defaultTags = [
    'site_fleet',
    'site_prices',
    'site_settings',
    'site_faqs',
    'site_reviews',
    'site_blog',
    'site_cms',
    'site_media',
  ];

  const targetTags = tags.length > 0 ? tags : defaultTags;

  const report: RevalidationReport = {
    success: true,
    purgedTags: [],
    failedTags: [],
    revalidatedPaths: [],
    failedPaths: [],
    timestamp: new Date().toISOString(),
  };

  // 1. Invalidate requested cache tags
  for (const tag of targetTags) {
    try {
      revalidateTag(tag);
      report.purgedTags.push(tag);
      // Support legacy site_pricing call if site_prices was targeted
      if (tag === 'site_prices') {
        try { revalidateTag('site_pricing'); } catch {}
      }
    } catch (err: any) {
      report.success = false;
      const errorMsg = err?.message || String(err);
      report.failedTags.push({ tag, error: errorMsg });
      console.error(`[CacheRevalidate] Failed to revalidateTag("${tag}"):`, errorMsg);
    }
  }

  // 2. Targeted path revalidations based on invalidated domains
  const pathsToRevalidate: string[] = [];

  if (targetTags.includes('site_fleet') || targetTags.includes('site_settings')) {
    pathsToRevalidate.push('/[locale]');
    pathsToRevalidate.push('/[locale]/fleet');
  }

  if (targetTags.includes('site_prices')) {
    pathsToRevalidate.push('/[locale]/pricing');
    pathsToRevalidate.push('/[locale]/routes');
  }

  for (const p of pathsToRevalidate) {
    try {
      revalidatePath(p, 'page');
      report.revalidatedPaths.push(p);
    } catch (err: any) {
      report.success = false;
      const errorMsg = err?.message || String(err);
      report.failedPaths.push({ path: p, error: errorMsg });
      console.error(`[CacheRevalidate] Failed to revalidatePath("${p}", "page"):`, errorMsg);
    }
  }

  return report;
}
