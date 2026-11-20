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

export function hasIndexableBlogTranslation(slug: string, locale: Locale): boolean {
  return !nativeOnly.has(slug) || locale === 'ar' || locale === 'en';
}

export function getBlogLocalizedAlternates(locale: Locale, slug: string) {
  const path = `/blog/${slug}`;
  if (!nativeOnly.has(slug)) {
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
