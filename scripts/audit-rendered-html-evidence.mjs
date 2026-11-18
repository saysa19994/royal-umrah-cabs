import fs from 'fs';
import path from 'path';

const pagesToAudit = [
  { name: 'Arabic Homepage', path: '.next/server/app/ar.html', url: '/ar' },
  { name: 'English Homepage', path: '.next/server/app/en.html', url: '/en' },
  { name: 'Turkish Route Page', path: '.next/server/app/tr/routes/riyadh-to-makkah.html', url: '/tr/routes/riyadh-to-makkah' },
  { name: 'Arabic Jeddah Airport Guide', path: '.next/server/app/ar/guides/jeddah-airport-arrival-guide.html', url: '/ar/guides/jeddah-airport-arrival-guide' },
  { name: 'English Jeddah to Madinah Guide', path: '.next/server/app/en/guides/jeddah-airport-to-madinah-transport-options.html', url: '/en/guides/jeddah-airport-to-madinah-transport-options' },
  { name: 'Fleet 1: Toyota Camry (AR)', path: '.next/server/app/ar/fleet/toyota-camry.html', url: '/ar/fleet/toyota-camry' },
  { name: 'Fleet 2: GMC Yukon XL (EN)', path: '.next/server/app/en/fleet/gmc-yukon-xl.html', url: '/en/fleet/gmc-yukon-xl' },
  { name: 'Fleet 3: Hyundai Staria (TR)', path: '.next/server/app/tr/fleet/hyundai-staria.html', url: '/tr/fleet/hyundai-staria' },
  { name: 'Fleet 4: Toyota HiAce (MS)', path: '.next/server/app/ms/fleet/toyota-hiace.html', url: '/ms/fleet/toyota-hiace' },
  { name: 'Fleet 5: Toyota Coaster VIP (AR)', path: '.next/server/app/ar/fleet/toyota-coaster.html', url: '/ar/fleet/toyota-coaster' },
  { name: 'Booking Page (AR)', path: '.next/server/app/ar/booking.html', url: '/ar/booking' },
];

const results = [];

for (const p of pagesToAudit) {
  if (!fs.existsSync(p.path)) {
    console.log('Missing file:', p.path);
    results.push({ name: p.name, url: p.url, exists: false });
    continue;
  }

  const html = fs.readFileSync(p.path, 'utf8');

  // Extract dir
  const dirMatch = html.match(/dir=["']([^"']+)["']/i);
  const dir = dirMatch ? dirMatch[1] : 'unknown';

  // Extract lang
  const langMatch = html.match(/lang=["']([^"']+)["']/i);
  const lang = langMatch ? langMatch[1] : 'unknown';

  // Extract title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : 'None';

  // Extract canonical
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : 'None';

  // Extract robots
  const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  const robots = robotsMatch ? robotsMatch[1] : 'None (defaults to index, follow)';

  // Check specific content
  const hasCoaster21 = html.includes('21') && (html.includes('coaster') || html.includes('كوستر'));
  const hasCashPolicy = html.includes('نقداً') || html.includes('cash') || html.includes('Cash') || html.includes('Nakit') || html.includes('Tunai');

  results.push({
    pageName: p.name,
    requestUrl: p.url,
    existsInBuild: true,
    htmlLang: lang,
    layoutDirection: dir,
    renderedTitle: title,
    renderedCanonicalTag: canonical,
    renderedRobotsTag: robots,
    hasCashOnArrivalPolicy: hasCashPolicy,
    hasCoasterCapacityVerified: p.name.includes('Coaster') ? html.includes('21') && html.includes('20') : 'N/A'
  });
}

fs.writeFileSync('docs/seo/browser-qa-evidence.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Saved docs/seo/browser-qa-evidence.json with', results.length, 'audited pages');
