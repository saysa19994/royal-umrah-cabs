import fs from 'fs';
import path from 'path';

const locales = ['ar', 'en', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

for (const loc of ['en', 'ms']) {
  const xmlPath = path.join('.next/server/app/sitemap', `${loc}.xml.body`);
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const urls = (xml.match(/<loc>[^<]+<\/loc>/g) || []).map(u => u.replace(/<\/?loc>/g, ''));
  
  const transportGuides = urls.filter(u => (u.includes(`/${loc}/guides/`) || u.endsWith(`/${loc}/guides`)) && !u.includes('/ziyarat/'));
  const ziyaratGuides = urls.filter(u => u.includes('/ziyarat/guides/'));
  const allZiyarat = urls.filter(u => u.includes('/ziyarat'));
  
  console.log(`=== Locale: ${loc} ===`);
  console.log('  Total URLs in sitemap:', urls.length);
  console.log('  Transportation Guides count:', transportGuides.length);
  console.log('  Transport Guides list:', transportGuides);
  console.log('  Ziyarat Guides count:', ziyaratGuides.length);
  console.log('  Total Ziyarat URLs count:', allZiyarat.length);
}
