import type { Locale } from '@/i18n/config';

/** Do not index English fallback text as if it were a genuinely localized page.
 * Re-enable a locale only once the full page content, metadata and FAQ have been reviewed.
 */
export const NATIVE_EDITORIAL_LOCALES = ['en', 'ar'] as const;
export function hasNativeEditorialContent(locale: Locale): boolean {
  return locale === 'ar' || locale === 'en';
}
export function editorialAlternates(locale: Locale, path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (!hasNativeEditorialContent(locale)) {
    return { canonical: `${base}/en${clean}` };
  }
  return {
    canonical: `${base}/${locale}${clean}`,
    languages: {
      ar: `${base}/ar${clean}`,
      en: `${base}/en${clean}`,
      'x-default': `${base}/en${clean}`,
    },
  };
}
export function editorialRobots(locale: Locale) {
  return { index: hasNativeEditorialContent(locale), follow: true };
}
