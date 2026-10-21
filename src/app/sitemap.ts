import { MetadataRoute } from 'next';
import { LOCALES, Locale, getLocalizedAlternates } from '@/i18n/config';
import { ZIYARAT_SITES, ZIYARAT_TOURS, ZIYARAT_GUIDES } from '@/data/ziyarat';
import { PILGRIM_COUNTRIES } from '@/data/pilgrims';

export async function generateSitemaps() {
  return LOCALES.map((locale) => ({ id: locale }));
}

export default async function sitemap({ id }: { id: string }): Promise<MetadataRoute.Sitemap> {
  const locale = (id as Locale) || 'en';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const lastmod = new Date().toISOString().slice(0, 10);

  const staticPages = [
    '',
    '/booking',
    '/routes',
    '/fleet',
    '/services',
    '/pricing',
    '/about',
    '/team',
    '/safety',
    '/partners',
    '/contact',
    '/privacy',
    '/terms',
    '/cancellation',
    '/cookies',
    '/guides',
    '/guides/malaysia-umrah-transport',
    '/guides/jeddah-airport-arrival-guide',
    '/guides/makkah-to-madinah-transport-comparison',
    '/ziyarat',
    '/ziyarat/makkah',
    '/ziyarat/madinah',
  ];

  const dynamicRoutes = [
    '/routes/jeddah-airport-to-makkah',
    '/routes/makkah-to-jeddah-airport',
    '/routes/makkah-to-madinah',
    '/routes/madinah-to-makkah',
    '/routes/madinah-airport-to-hotel',
    '/routes/jeddah-to-madinah',
  ];

  const dynamicVehicles = [
    '/fleet/hyundai-staria',
    '/fleet/gmc-yukon-xl',
    '/fleet/toyota-camry',
    '/fleet/toyota-hiace',
  ];

  // Dynamic Ziyarat Sites
  const ziyaratSitePaths = Object.values(ZIYARAT_SITES).map(
    (s) => `/ziyarat/${s.city}/${s.slug}`
  );

  // Dynamic Ziyarat Tours
  const ziyaratTourPaths = Object.values(ZIYARAT_TOURS).map(
    (t) => `/ziyarat/tours/${t.slug}`
  );

  // Dynamic Ziyarat Guides
  const ziyaratGuidePaths = Object.values(ZIYARAT_GUIDES).map(
    (g) => `/ziyarat/guides/${g.slug}`
  );

  // Dynamic Country Landing Pages (strictly exclude noindex pages like greece, and draft/unverified markets)
  const pilgrimCountryPaths = Object.values(PILGRIM_COUNTRIES)
    .filter((c) => !c.noindex)
    .map((c) => `/pilgrims/${c.slug}`);

  const allPaths = [
    ...staticPages,
    ...dynamicRoutes,
    ...dynamicVehicles,
    ...ziyaratSitePaths,
    ...ziyaratTourPaths,
    ...ziyaratGuidePaths,
    ...pilgrimCountryPaths,
  ];

  return allPaths.map((path) => {
    const isHome = path === '';
    const priority = isHome
      ? 1.0
      : path.startsWith('/ziyarat') || path.startsWith('/pilgrims') || path.includes('/routes/')
      ? 0.9
      : 0.8;
    const changeFrequency = isHome ? 'daily' : 'weekly';

    const alternates = getLocalizedAlternates(locale, path);

    return {
      url: alternates.canonical,
      lastModified: lastmod,
      changeFrequency: changeFrequency as any,
      priority,
      alternates: {
        languages: alternates.languages,
      },
    };
  });
}
