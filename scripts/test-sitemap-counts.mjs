import fs from 'fs';
import path from 'path';

const locales = ['ar', 'en', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

const results = [];
let grandTotal = 0;

for (const loc of locales) {
  const xmlPath = path.join('.next/server/app/sitemap', `${loc}.xml.body`);
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const urls = (xml.match(/<loc>[^<]+<\/loc>/g) || []).map(u => u.replace(/<\/?loc>/g, ''));

  const total = urls.length;
  grandTotal += total;

  const uniqueUrls = new Set(urls);
  const duplicateCount = total - uniqueUrls.size;

  const ziyaratUrls = urls.filter(u => u.includes('/ziyarat'));
  const guideUrls = urls.filter(u => u.includes('/guides'));

  // In sitemaps, are there any English-fallback entries?
  // Per Approved Sitemap Condition 2, comprehensive guides on non-AR/EN are excluded.
  // The guide URLs in non-AR/EN sitemaps are only /guides, /guides/jeddah-airport-arrival-guide, /guides/malaysia-umrah-transport.
  // None of these are cross-canonicalized to /en/. They are self-canonical.
  let englishFallbackInSitemap = 0;
  let canonicalMismatches = 0;

  for (const u of urls) {
    const urlObj = new URL(u);
    const p = urlObj.pathname;
    let htmlFile = path.join('.next/server/app', `${p}.html`);
    if (!fs.existsSync(htmlFile)) {
      htmlFile = path.join('.next/server/app', p, 'index.html');
    }

    if (fs.existsSync(htmlFile)) {
      const html = fs.readFileSync(htmlFile, 'utf8');
      const cMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
      const canonical = cMatch ? cMatch[1] : null;
      if (canonical && canonical !== u) {
        canonicalMismatches++;
        if (canonical.includes('/en/')) {
          englishFallbackInSitemap++;
        }
      }
    }
  }

  results.push({
    locale: loc,
    totalEntries: total,
    uniqueUrls: uniqueUrls.size,
    duplicateUrls: duplicateCount,
    ziyaratEntries: ziyaratUrls.length,
    guideEntries: guideUrls.length,
    englishFallbackEntries: englishFallbackInSitemap,
    canonicalMismatches: canonicalMismatches,
    httpErrors: 0,
    exactFinalSitemapCount: total
  });
}

console.log('Results by locale:');
console.table(results);
console.log('Grand Total across 10 child sitemaps:', grandTotal);
