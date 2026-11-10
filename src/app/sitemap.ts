import { MetadataRoute } from 'next';
import { LOCALES, Locale, getLocalizedAlternates } from '@/i18n/config';
import { ZIYARAT_SITES, ZIYARAT_TOURS, ZIYARAT_GUIDES } from '@/data/ziyarat';
import { PILGRIM_COUNTRIES } from '@/data/pilgrims';
import { BLOG_POSTS } from '@/data/blog-posts';
import { ROUTES_COMPREHENSIVE_DATA } from '@/data/routes-data';
import { COMPREHENSIVE_GUIDES } from '@/data/comprehensive-guides';

export async function generateSitemaps() {
  return LOCALES.map((locale) => ({ id: locale }));
}

export default async function sitemap({ id }: { id: string }): Promise<MetadataRoute.Sitemap> {
  const locale = (id as Locale) || 'en';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const lastmod = new Date().toISOString().slice(0, 10);

  const staticPages = [
    '',
    '/faq',
    '/booking',
    '/routes',
    '/fleet',
    '/services',
    '/services/taif',
    '/services/riyadh',
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
    '/guides/jeddah-airport-arrival-guide',
    '/guides/malaysia-umrah-transport',
    '/blog',
    ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
    '/ziyarat',
    '/ziyarat/makkah',
    '/ziyarat/madinah',
  ];

  const dynamicRoutes = Object.keys(ROUTES_COMPREHENSIVE_DATA).map(
    (slug) => '/routes/' + slug
  );

  // Authoritative verified fleet vehicles (Mercedes-Maybach intentionally excluded per strict indexing eligibility)
  const dynamicVehicles = [
    '/fleet/hyundai-staria',
    '/fleet/gmc-yukon-xl',
    '/fleet/toyota-camry',
    '/fleet/toyota-hiace',
    '/fleet/toyota-coaster',
  ];

  // Comprehensive Guides: Eligible only for fully localized versions (Arabic & English) per approved Sitemap Condition 2
  // Other language versions remain accessible on-site but are kept out of sitemaps until their body text is translated.
  const eligibleGuides =
    locale === 'ar' || locale === 'en'
      ? COMPREHENSIVE_GUIDES.map((g) => `/guides/${g.slug}`)
      : [];

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
    ...eligibleGuides,
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
      : path.startsWith('/ziyarat') || path.startsWith('/pilgrims') || path.includes('/routes/') || path.startsWith('/fleet/')
      ? 0.9
      : 0.8;
    const changeFrequency = isHome ? 'daily' : 'weekly';

    const alternates = getLocalizedAlternates(locale, path);

    // If path is a comprehensive guide, only include verified localized alternates (ar & en) to protect hreflang integrity
    let alternateLanguages = alternates.languages;
    const isCompGuide =
      path.startsWith('/guides/') &&
      path !== '/guides' &&
      path !== '/guides/jeddah-airport-arrival-guide' &&
      path !== '/guides/malaysia-umrah-transport';

    if (isCompGuide) {
      alternateLanguages = {
        ar: `${baseUrl}/ar${path}`,
        en: `${baseUrl}/en${path}`,
        'x-default': `${baseUrl}/en${path}`,
      };
    }

    return {
      url: alternates.canonical,
      lastModified: lastmod,
      changeFrequency: changeFrequency as any,
      priority,
      alternates: {
        languages: alternateLanguages,
      },
    };
  });
}
