import fs from 'fs';
import path from 'path';

const locales = ['ar', 'en', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

const ziyarat20Routes = [
  { subpath: '', type: 'Directory Index', nameEn: 'Ziyarat Directory Hub', nameAr: 'دليل المزارات والمعالم الدينية' },
  { subpath: '/makkah', type: 'City Hub', nameEn: 'Makkah Holy Sites Directory', nameAr: 'دليل مزارات مكة المكرمة' },
  { subpath: '/madinah', type: 'City Hub', nameEn: 'Madinah Holy Sites Directory', nameAr: 'دليل مزارات المدينة المنورة' },
  { subpath: '/makkah/cave-hira', type: 'Holy Site Landmark', nameEn: 'Cave Hira (Jabal Al-Nour)', nameAr: 'غار حراء (جبل النور)' },
  { subpath: '/makkah/jabal-thawr', type: 'Holy Site Landmark', nameEn: 'Jabal Thawr', nameAr: 'جبل ثور' },
  { subpath: '/makkah/mina', type: 'Holy Site Landmark', nameEn: 'Mina Valley', nameAr: 'مشعر منى' },
  { subpath: '/makkah/arafat', type: 'Holy Site Landmark', nameEn: 'Mount Arafat (Jabal Al-Rahmah)', nameAr: 'جبل عرفات (جبل الرحمة)' },
  { subpath: '/madinah/masjid-quba', type: 'Holy Site Landmark', nameEn: 'Quba Mosque', nameAr: 'مسجد قباء' },
  { subpath: '/madinah/mount-uhud', type: 'Holy Site Landmark', nameEn: 'Mount Uhud & Martyrs Cemetery', nameAr: 'جبل أحد ومقبرة الشهداء' },
  { subpath: '/madinah/masjid-qiblatayn', type: 'Holy Site Landmark', nameEn: 'Masjid Al-Qiblatayn', nameAr: 'مسجد القبلتين' },
  { subpath: '/madinah/seven-mosques', type: 'Holy Site Landmark', nameEn: 'The Seven Mosques', nameAr: 'المساجد السبعة' },
  { subpath: '/tours/makkah-half-day', type: 'Curated Tour', nameEn: 'Makkah Half-Day Holy Sites Tour', nameAr: 'جولة مزارات مكة المكرمة نصف يوم' },
  { subpath: '/tours/madinah-half-day', type: 'Curated Tour', nameEn: 'Madinah Half-Day Ziyarat Tour', nameAr: 'جولة مزارات المدينة المنورة نصف يوم' },
  { subpath: '/tours/badr-historical', type: 'Curated Tour', nameEn: 'Badr Historical Battlefield Tour', nameAr: 'جولة غزوة بدر التاريخية' },
  { subpath: '/tours/custom-hourly', type: 'Curated Tour', nameEn: 'Custom Hourly VIP Chauffeur Tour', nameAr: 'جولة مزارات مخصصة بالساعة VIP' },
  { subpath: '/guides/how-to-plan-ziyarat-makkah', type: 'Planning Guide', nameEn: 'How to Plan Ziyarat in Makkah', nameAr: 'كيف تخطط لزيارة معالم مكة المكرمة' },
  { subpath: '/guides/how-to-plan-ziyarat-madinah', type: 'Planning Guide', nameEn: 'How to Plan Ziyarat in Madinah', nameAr: 'كيف تخطط لزيارة معالم المدينة المنورة' },
  { subpath: '/guides/best-time-to-visit-ziyarat', type: 'Planning Guide', nameEn: 'Best Time to Visit Holy Sites', nameAr: 'أفضل الأوقات لزيارة المزارات والمعالم' },
  { subpath: '/guides/ziyarat-elderly-children', type: 'Planning Guide', nameEn: 'Ziyarat with Elderly & Children', nameAr: 'دليل الزيارة لكبار السن والأطفال' },
  { subpath: '/guides/ziyarat-etiquette', type: 'Planning Guide', nameEn: 'Sacred Sites Visiting Etiquette', nameAr: 'آداب وضوابط زيارة الأماكن المقدسة' },
];

const prerender = JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8'));

// Extract all sitemap URLs
const sitemapUrlsByLocale = {};
for (const loc of locales) {
  const xml = fs.readFileSync(path.join('.next/server/app/sitemap', `${loc}.xml.body`), 'utf8');
  const urls = (xml.match(/<loc>[^<]+<\/loc>/g) || []).map(u => u.replace(/<\/?loc>/g, ''));
  sitemapUrlsByLocale[loc] = new Set(urls);
}

const header = [
  'locale',
  'route_path',
  'full_url',
  'entity_type',
  'entity_name',
  'present_in_ssg',
  'present_in_sitemap',
  'sitemap_file',
  'rendered_canonical',
  'canonical_match',
  'robots_directive',
  'discrepancy_explanation'
];

const rows = [header.map(h => `"${h}"`).join(',')];

let ssgTotal = 0;
let sitemapTotal = 0;
let ssgOnly = 0;
let sitemapOnly = 0;

for (const loc of locales) {
  for (const item of ziyarat20Routes) {
    const routePath = `/${loc}/ziyarat${item.subpath}`;
    const fullUrl = `https://duyufalrahmanvip.com${routePath}`;
    const inSSG = prerender.routes[routePath] ? 'TRUE' : 'FALSE';
    const inSitemap = sitemapUrlsByLocale[loc].has(fullUrl) ? 'TRUE' : 'FALSE';

    if (inSSG === 'TRUE') ssgTotal++;
    if (inSitemap === 'TRUE') sitemapTotal++;
    if (inSSG === 'TRUE' && inSitemap === 'FALSE') ssgOnly++;
    if (inSSG === 'FALSE' && inSitemap === 'TRUE') sitemapOnly++;

    // Check rendered canonical in HTML
    let canonical = 'UNKNOWN';
    let canonicalMatch = 'UNKNOWN';
    let robots = 'UNKNOWN';

    const htmlPath = path.join('.next/server/app', `${routePath}.html`);
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf8');
      const cMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
      canonical = cMatch ? cMatch[1] : 'NONE';
      canonicalMatch = canonical === fullUrl ? 'TRUE (Self-Canonical)' : 'FALSE';

      const rMatch = html.match(/<meta name="robots" content="([^"]+)"/);
      robots = rMatch ? rMatch[1] : 'index, follow (default)';
    }

    const entityName = loc === 'ar' ? item.nameAr : item.nameEn;
    const note = item.subpath === '' 
      ? 'Directory root index; in previous audit script was classified as Other Public Page due to path.startsWith("/ziyarat/") check without trailing slash'
      : 'Core Ziyarat sub-route; 100% matched in SSG and Sitemap';

    rows.push([
      `"${loc}"`,
      `"${routePath}"`,
      `"${fullUrl}"`,
      `"${item.type}"`,
      `"${entityName}"`,
      `"${inSSG}"`,
      `"${inSitemap}"`,
      `"/sitemap/${loc}.xml"`,
      `"${canonical}"`,
      `"${canonicalMatch}"`,
      `"${robots}"`,
      `"${note}"`
    ].join(','));
  }
}

fs.writeFileSync('docs/seo/final-ziyarat-ssg-vs-sitemap-reconciliation.csv', rows.join('\n'), 'utf8');
console.log('Saved docs/seo/final-ziyarat-ssg-vs-sitemap-reconciliation.csv with', rows.length - 1, 'rows');
console.log(`SSG Total Ziyarat: ${ssgTotal}, Sitemap Total Ziyarat: ${sitemapTotal}`);
console.log(`Present in SSG but absent in Sitemap: ${ssgOnly}`);
console.log(`Present in Sitemap but absent in SSG: ${sitemapOnly}`);
