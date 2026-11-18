import fs from 'fs';
import path from 'path';

const locales = ['ar', 'en', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];
let totalUrls = 0;
let selfCanonicalCount = 0;
const nonSelfCanonical = [];
const sitemapUrlRecords = [];

for (const loc of locales) {
  const xmlPath = path.join('.next/server/app/sitemap', `${loc}.xml.body`);
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const urls = (xml.match(/<loc>[^<]+<\/loc>/g) || []).map(u => u.replace(/<\/?loc>/g, ''));
  totalUrls += urls.length;
  
  for (const url of urls) {
    const u = new URL(url);
    const p = u.pathname;
    let htmlFile = path.join('.next/server/app', `${p}.html`);
    if (!fs.existsSync(htmlFile)) {
      htmlFile = path.join('.next/server/app', p, 'index.html');
    }

    let canonical = null;
    let robots = null;
    let isSelfCanonical = false;
    let fileFound = false;

    if (fs.existsSync(htmlFile)) {
      fileFound = true;
      const html = fs.readFileSync(htmlFile, 'utf8');
      const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
      canonical = canonicalMatch ? canonicalMatch[1] : null;

      const robotsMatch = html.match(/<meta name="robots" content="([^"]+)"/);
      robots = robotsMatch ? robotsMatch[1] : 'index, follow (default)';

      if (canonical === url) {
        selfCanonicalCount++;
        isSelfCanonical = true;
      } else {
        nonSelfCanonical.push({ url, canonical, file: htmlFile });
      }
    } else {
      nonSelfCanonical.push({ url, canonical: 'HTML_NOT_FOUND', file: htmlFile });
    }

    sitemapUrlRecords.push({
      locale: loc,
      url,
      path: p,
      fileFound,
      canonical,
      isSelfCanonical,
      robots
    });
  }
}

console.log('Total URLs across 10 child sitemaps:', totalUrls);
console.log('Self-canonical matches:', selfCanonicalCount);
console.log('Non-self canonical:', nonSelfCanonical.length);
if (nonSelfCanonical.length > 0) {
  console.log('Sample non-self canonical:', nonSelfCanonical.slice(0, 10));
}

// Write summary JSON
const summary = {
  totalSitemapUrls: totalUrls,
  selfCanonicalUrls: selfCanonicalCount,
  nonSelfCanonicalUrls: nonSelfCanonical.length,
  perLocaleBreakdown: {}
};

for (const loc of locales) {
  const locRecords = sitemapUrlRecords.filter(r => r.locale === loc);
  summary.perLocaleBreakdown[loc] = {
    total: locRecords.length,
    selfCanonical: locRecords.filter(r => r.isSelfCanonical).length,
    nonSelfCanonical: locRecords.filter(r => !r.isSelfCanonical).length
  };
}

fs.writeFileSync('scripts/sitemap-audit-debug.json', JSON.stringify(summary, null, 2), 'utf8');
