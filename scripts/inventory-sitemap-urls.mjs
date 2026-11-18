import fs from 'fs';

const locales = ['ar', 'en', 'tr', 'ms', 'id', 'ur', 'fr', 'es', 'de', 'hi'];

function extractUrls(xml) {
  const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
  return Array.from(matches, m => m[1]);
}

const inventory = {};
for (const loc of locales) {
  const p = `.next/server/app/sitemap/${loc}.xml.body`;
  if (fs.existsSync(p)) {
    const xml = fs.readFileSync(p, 'utf8');
    const urls = extractUrls(xml);
    inventory[loc] = urls;
  }
}

console.log('Sitemap counts:');
for (const [loc, urls] of Object.entries(inventory)) {
  console.log(`${loc}: ${urls.length} URLs`);
}

// Compare ar vs en vs tr
const arUrls = inventory['ar'];
const enUrls = inventory['en'];
const trUrls = inventory['tr'];

console.log('\nDiff AR vs TR (URLs in AR but not in TR when normalizing locale prefix):');
const diff = arUrls.filter(u => {
  const normalized = u.replace('/ar/', '/tr/');
  return !trUrls.includes(normalized);
});
console.log('Difference count:', diff.length);
diff.forEach(d => console.log(' -', d));

// Categorize 86 URLs in TR:
const trCats = {};
for (const u of trUrls) {
  const path = u.replace('https://duyufalrahmanvip.com/tr', '') || '/';
  let cat = 'Other Public Pages';
  if (path === '/') cat = 'Homepage';
  else if (path.startsWith('/fleet/')) cat = 'Fleet Detail Pages';
  else if (path.startsWith('/routes/')) cat = 'Commercial Route Pages';
  else if (path.startsWith('/blog/')) cat = 'Blog Articles';
  else if (path.startsWith('/ziyarat/')) cat = 'Ziyarat Pages (Sites, Tours, Hubs, Guides)';
  else if (path.startsWith('/services')) cat = 'Services Pages';
  else if (path.startsWith('/guides/')) cat = 'Comprehensive / Standalone Guides';
  else if (path.startsWith('/pilgrims/')) cat = 'Pilgrim Country Landing Pages';

  trCats[cat] = (trCats[cat] || 0) + 1;
}

console.log('\nTR Sitemap (86 URLs) Categorization:', trCats);

// Categorize 98 URLs in AR:
const arCats = {};
for (const u of arUrls) {
  const path = u.replace('https://duyufalrahmanvip.com/ar', '') || '/';
  let cat = 'Other Public Pages';
  if (path === '/') cat = 'Homepage';
  else if (path.startsWith('/fleet/')) cat = 'Fleet Detail Pages';
  else if (path.startsWith('/routes/')) cat = 'Commercial Route Pages';
  else if (path.startsWith('/blog/')) cat = 'Blog Articles';
  else if (path.startsWith('/ziyarat/')) cat = 'Ziyarat Pages (Sites, Tours, Hubs, Guides)';
  else if (path.startsWith('/services')) cat = 'Services Pages';
  else if (path.startsWith('/guides/')) cat = 'Comprehensive / Standalone Guides';
  else if (path.startsWith('/pilgrims/')) cat = 'Pilgrim Country Landing Pages';

  arCats[cat] = (arCats[cat] || 0) + 1;
}

console.log('\nAR Sitemap (98 URLs) Categorization:', arCats);
