import type { Locale } from '@/i18n/config';
import { getCmsPageCached } from '@/lib/cms-service';
import type { CityServiceContent } from '@/data/services-cities-data';

export type PublicPageKey = 'about' | 'services' | 'contact' | 'pricing' | 'routes' | 'fleet' | 'ziyarat' | 'booking' | 'faq' | 'riyadh' | 'taif';
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

/** Editorial-only CMS overrides for the Riyadh and Taif service hubs.
 * Fares, routes, fleet capacities, operational claims and booking policies are
 * deliberately excluded from this allowlist.
 */
export function mergeCityHubCmsCopy(
  defaults: CityServiceContent, cms: PublicCmsPage,
): CityServiceContent {
  const editableFields: (keyof CityServiceContent)[] = [
    'heroBadge', 'heroSubtitle', 'overviewTitle', 'routesTitle',
    'routesSubtitle', 'fleetTitle', 'fleetSubtitle', 'featuresTitle',
    'faqsTitle', 'ctaTitle',
  ];
  const edits: Partial<CityServiceContent> = {};
  for (const key of editableFields) {
    const value = cms.contentBlocks[key];
    if (typeof value === 'string' && value.trim().length > 0 && value.length <= 3000) {
      // Each selected field is a simple string; never replace structured
      // route definitions, the FAQ entries or the payment-language CTA.
      (edits as Record<string, string>)[key] = value.trim();
    }
  }
  return {
    ...defaults,
    ...edits,
    metaTitle: cms.seoTitle || defaults.metaTitle,
    metaDescription: cms.seoDescription || defaults.metaDescription,
    heroTitle: cms.h1 || defaults.heroTitle,
  };
}
