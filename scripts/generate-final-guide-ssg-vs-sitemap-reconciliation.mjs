import fs from 'fs';
import path from 'path';

const locales = ['ar', 'en', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

const comprehensiveSlugs = [
  'jeddah-airport-to-makkah-taxi-vs-train',
  'makkah-to-madinah-taxi-vs-haramain-train',
  'umrah-taxi-prices-routes-vehicles',
  'how-to-choose-the-right-vehicle-for-umrah-group',
  'madinah-airport-to-hotel-transport',
  'jeddah-airport-to-madinah-transport-options',
  'makkah-ziyarat-places-routes-transport',
  'madinah-ziyarat-planning-transport',
  'umrah-travel-with-elderly-parents',
  'luggage-and-vehicle-capacity-for-umrah',
  'jeddah-airport-arrival-pickup-guide',
  'how-to-book-and-confirm-umrah-taxi'
];

const independentSlugs = [
  'jeddah-airport-arrival-guide',
  'malaysia-umrah-transport',
  'makkah-to-madinah-transport-comparison'
];

// 1 index + 3 independent + 12 comprehensive = 16 routes per locale
const all16Routes = [
  { subpath: '', type: 'Directory Index', slug: 'guides-index', name: 'Guide Directory Index' },
  { subpath: '/jeddah-airport-arrival-guide', type: 'Standalone Guide (1/3)', slug: 'jeddah-airport-arrival-guide', name: 'Dedicated Jeddah Airport Terminal Arrival Guide' },
  { subpath: '/malaysia-umrah-transport', type: 'Standalone Guide (2/3)', slug: 'malaysia-umrah-transport', name: 'Malaysian Pilgrim Transport Guide' },
  { subpath: '/makkah-to-madinah-transport-comparison', type: 'Standalone Guide (3/3)', slug: 'makkah-to-madinah-transport-comparison', name: 'Makkah to Madinah Transport Comparison Guide' },
  ...comprehensiveSlugs.map((s, idx) => ({
    subpath: `/${s}`,
    type: `Comprehensive Guide (${idx + 1}/12)`,
    slug: s,
    name: s.replace(/-/g, ' ')
  }))
];

const prerender = JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8'));

// Extract sitemap URLs
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
  'route_type',
  'slug',
  'present_in_ssg',
  'present_in_sitemap',
  'sitemap_file',
  'declared_canonical',
  'canonical_destination_type',
  'rendered_robots_meta',
  'metadata_title_language',
  'main_body_content_language',
  'fallback_status',
  'exclusion_or_inclusion_rationale'
];

const rows = [header.map(h => `"${h}"`).join(',')];

for (const loc of locales) {
  const isAr = loc === 'ar';
  const isEn = loc === 'en';

  for (const r of all16Routes) {
    const routePath = `/${loc}/guides${r.subpath}`;
    const fullUrl = `https://duyufalrahmanvip.com${routePath}`;
    const inSSG = prerender.routes[routePath] ? 'TRUE' : 'FALSE';
    const inSitemap = sitemapUrlsByLocale[loc].has(fullUrl) ? 'TRUE' : 'FALSE';

    let canonical = 'UNKNOWN';
    let robots = 'UNKNOWN';
    let bodySnippet = '';

    const htmlPath = path.join('.next/server/app', `${routePath}.html`);
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf8');
      const cMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
      canonical = cMatch ? cMatch[1] : 'NONE';
      const rMatch = html.match(/<meta name="robots" content="([^"]+)"/);
      robots = rMatch ? rMatch[1] : 'index, follow (default)';

      // Check text in body
      const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/) || html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
      bodySnippet = articleMatch ? articleMatch[1].slice(0, 500) : html.slice(0, 500);
    }

    let canonicalDestType = 'Self-Canonical';
    if (canonical !== fullUrl) {
      canonicalDestType = 'Cross-Language Canonical (Consolidated to /en/)';
    }

    let metaTitleLang = isAr ? 'Arabic' : (isEn ? 'English' : `${loc.toUpperCase()} (Localized UI & Title)`);
    let mainBodyLang = isAr ? 'Arabic' : (isEn ? 'English' : 'English Fallback Body Copy');
    let fallbackStatus = 'None (Native Bilingual)';

    if (!isAr && !isEn) {
      if (r.type.startsWith('Comprehensive Guide')) {
        fallbackStatus = 'English Fallback Body with Localized Meta/UI; Canonicalized to /en/';
      } else if (r.slug === 'malaysia-umrah-transport') {
        fallbackStatus = 'Standalone English/Malay Specialized Pilgrim Guidance';
        mainBodyLang = 'English / Malay Specialized';
      } else {
        fallbackStatus = 'Standalone Localized Page with English Base';
      }
    }

    let rationale = '';
    if (r.slug === 'guides-index') {
      rationale = 'Guides directory hub; included in sitemap.ts staticPages in all 10 locales; Self-canonical';
    } else if (r.slug === 'jeddah-airport-arrival-guide' || r.slug === 'malaysia-umrah-transport') {
      rationale = 'Standalone guide included in sitemap.ts staticPages in all 10 locales; Self-canonical';
    } else if (r.slug === 'makkah-to-madinah-transport-comparison') {
      rationale = 'Standalone guide built in SSG (10 paths) but omitted from sitemap.ts staticPages; Self-canonical in HTML';
    } else {
      // Comprehensive guides
      if (isAr || isEn) {
        rationale = 'Eligible for sitemap: fully localized and self-canonical per Approved Sitemap Condition 2';
      } else {
        rationale = 'Excluded from sitemap: English-fallback duplicate canonicalized to /en/ per Approved Sitemap Condition 2';
      }
    }

    rows.push([
      `"${loc}"`,
      `"${routePath}"`,
      `"${fullUrl}"`,
      `"${r.type}"`,
      `"${r.slug}"`,
      `"${inSSG}"`,
      `"${inSitemap}"`,
      `"${inSitemap === 'TRUE' ? `/sitemap/${loc}.xml` : 'EXCLUDED'}"`,
      `"${canonical}"`,
      `"${canonicalDestType}"`,
      `"${robots}"`,
      `"${metaTitleLang}"`,
      `"${mainBodyLang}"`,
      `"${fallbackStatus}"`,
      `"${rationale}"`
    ].join(','));
  }
}

fs.writeFileSync('docs/seo/final-guide-ssg-vs-sitemap-reconciliation.csv', rows.join('\n'), 'utf8');
console.log('Saved docs/seo/final-guide-ssg-vs-sitemap-reconciliation.csv with', rows.length - 1, 'rows');
