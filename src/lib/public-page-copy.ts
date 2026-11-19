import type { Locale } from '@/i18n/config';
import { getCmsPageCached } from '@/lib/cms-service';

export type PublicPageKey = 'about' | 'services' | 'contact' | 'pricing' | 'routes' | 'fleet' | 'ziyarat' | 'booking';
export type PublicCmsPage = {
  seoTitle?: string;
  seoDescription?: string;
  h1?: string;
  contentBlocks: Record<string, unknown>;
};

/** Applied only to localized, explicitly CMS-wired pages. */
export async function getPublishedPageCopy(page: PublicPageKey, locale: Locale): Promise<PublicCmsPage> {
  const saved = await getCmsPageCached(page, locale);
  const blocks = saved?.content_blocks;
  return {
    seoTitle: typeof saved?.seo_title === 'string' ? saved.seo_title.trim() : undefined,
    seoDescription: typeof saved?.seo_description === 'string' ? saved.seo_description.trim() : undefined,
    h1: typeof saved?.h1 === 'string' ? saved.h1.trim() : undefined,
    contentBlocks: blocks && typeof blocks === 'object' && !Array.isArray(blocks) ? blocks : {},
  };
}

/**
 * Only known keys may override translated dictionary fields.
 * Never accept HTML/React nodes, keys absent from the default translation,
 * or a blank override that would erase approved copy.
 */
export function mergeCmsTranslatedCopy<T extends Record<string, string>>(
  defaults: T, cms: PublicCmsPage,
): T {
  const edits: Record<string, string> = {};
  for (const [key, value] of Object.entries(cms.contentBlocks)) {
    if (Object.prototype.hasOwnProperty.call(defaults,key) &&
        typeof value === 'string' && value.trim().length > 0 && value.length <= 5000) {
      edits[key] = value;
    }
  }
  return { ...defaults, ...edits };
}
