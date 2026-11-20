import { getLocalizedAlternates, type Locale } from '@/i18n/config';

/**
 * Editorially verified localization policy for blog articles.
 *
 * The two articles below have full Arabic and English bodies. Their other
 * locale files currently spread the English article and replace its title,
 * so they must not be presented as translated/indexable pages.
 *
 * When a full locale-native article is published, update this policy only
 * after reviewing its paragraphs, headings, FAQs and page metadata.
 */
export const BLOG_NATIVE_ONLY_SLUGS = [
  'makkah-to-taif-private-transfer',
  'riyadh-to-makkah-private-transfer',
] as const;

const nativeOnly = new Set<string>(BLOG_NATIVE_ONLY_SLUGS);

/**
 * The following eleven articles have full native-language editorial source
 * files for all ten site languages. New articles are not automatically
 * indexable until their individual language versions are reviewed.
 */
export const BLOG_FULLY_LOCALIZED_SLUGS = [
  'vip-umrah-transport-jeddah-to-makkah',
  'private-transfer-makkah-to-madinah',
  'makkah-to-jeddah-airport-transfer',
  'vip-car-with-driver-saudi-arabia',
  'vehicle-capacity-passengers-luggage',
  'transport-planning-makkah-madinah-jeddah',
  'jeddah-airport-pickup-umrah',
  'hourly-vs-point-to-point-car-booking',
  'umrah-car-booking-checklist',
  'madinah-ziyarat-private-car-guide',
  'elderly-friendly-umrah-transport',
] as const;

const fullyLocalized = new Set<string>(BLOG_FULLY_LOCALIZED_SLUGS);

export function hasIndexableBlogTranslation(slug: string, locale: Locale): boolean {
  if (fullyLocalized.has(slug)) return true;
  return nativeOnly.has(slug) && (locale === 'ar' || locale === 'en');
}

export function getBlogLocalizedAlternates(locale: Locale, slug: string) {
  const path = `/blog/${slug}`;
  if (fullyLocalized.has(slug)) {
    return getLocalizedAlternates(locale, path);
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const canonical = `${baseUrl}/${locale}${path}`;
  if (!hasIndexableBlogTranslation(slug, locale)) {
    // An untranslated page is accessible to visitors, self-canonical, noindex,
    // and is absent from hreflang and XML sitemaps.
    return { canonical };
  }

  return {
    canonical,
    languages: {
      ar: `${baseUrl}/ar${path}`,
      en: `${baseUrl}/en${path}`,
      'x-default': `${baseUrl}/en${path}`,
    },
  };
}
