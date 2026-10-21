import { NextResponse } from 'next/server';
import { LOCALES } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const lastmod = new Date().toISOString().slice(0, 10);

  const sitemapsXml = LOCALES.map(
    (locale) => `  <sitemap>
    <loc>${baseUrl}/sitemap/${locale}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXml}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
