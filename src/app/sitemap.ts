import { MetadataRoute } from 'next';
import { LOCALES } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    '',
    '/routes',
    '/fleet',
    '/services',
    '/pricing',
    '/about',
    '/contact',
    '/track-booking',
    '/manage-booking',
    '/guides/malaysia-umrah-transport',
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
    '/fleet/staria',
    '/fleet/yukon',
    '/fleet/camry',
    '/fleet/hiace',
    '/fleet/coaster',
  ];

  const allPaths = [...staticPages, ...dynamicRoutes, ...dynamicVehicles];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    for (const locale of LOCALES) {
      const isHome = path === '';
      const priority = isHome ? 1.0 : path.includes('/routes/') || path.includes('/guides/') ? 0.9 : 0.8;
      const changeFrequency = isHome ? 'daily' : 'weekly';

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: currentDate,
        changeFrequency: changeFrequency as any,
        priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${path}`,
            ar: `${baseUrl}/ar${path}`,
            ms: `${baseUrl}/ms${path}`,
            'x-default': `${baseUrl}/en${path}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
