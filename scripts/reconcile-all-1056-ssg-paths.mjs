import fs from 'fs';

const pm = JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8'));
const routes = Object.keys(pm.routes);

console.log('Total SSG routes in prerender-manifest:', routes.length);

const categoryCounts = {};
const unclassified = [];

for (const r of routes) {
  let cat = 'Unknown';
  if (r === '/') cat = 'Root Redirect / Rewrite';
  else if (r === '/_not-found') cat = 'System 404 Page';
  else if (r === '/robots.txt') cat = 'System robots.txt';
  else if (r === '/manifest.webmanifest' || r === '/icon.png' || r === '/apple-icon.png') cat = 'System Metadata & App Icons';
  else if (r.startsWith('/sitemap/')) cat = 'Statically Rendered Child Sitemaps';
  else {
    const parts = r.split('/').filter(Boolean);
    const locale = parts[0];
    const section = parts[1] || 'homepage';

    if (parts.length === 1) {
      cat = 'Localized Homepage (/ [locale])';
    } else if (section === 'routes') {
      cat = 'Commercial Intercity Routes (/routes/[slug])';
    } else if (section === 'fleet') {
      if (parts.length === 2) cat = 'Fleet Directory Index (/fleet)';
      else cat = 'Official Fleet Detail Pages (/fleet/[slug])';
    } else if (section === 'blog') {
      if (parts.length === 2) cat = 'Blog Directory Index (/blog)';
      else cat = 'Editorial Blog Articles (/blog/[slug])';
    } else if (section === 'ziyarat') {
      if (parts.length === 2) cat = 'Ziyarat Directory Index (/ziyarat)';
      else if (parts.length === 3 && (parts[2] === 'makkah' || parts[2] === 'madinah')) cat = 'Ziyarat City Hubs (/ziyarat/[city])';
      else if (parts[2] === 'tours') cat = 'Ziyarat Curated Tours (/ziyarat/tours/[slug])';
      else if (parts[2] === 'guides') cat = 'Ziyarat Guides & Etiquette (/ziyarat/guides/[slug])';
      else cat = 'Ziyarat Holy Sites & Landmarks (/ziyarat/[city]/[site])';
    } else if (section === 'pilgrims') {
      cat = 'Pilgrim Country Landing Pages (/pilgrims/[slug])';
    } else if (section === 'guides') {
      if (parts.length === 2) cat = 'Guide Directory Index (/guides)';
      else if (parts[2] === 'jeddah-airport-arrival-guide' || parts[2] === 'malaysia-umrah-transport' || parts[2] === 'makkah-to-madinah-transport-comparison') {
        cat = 'Standalone Landing Guides';
      } else {
        cat = 'Comprehensive Guides (/guides/[slug])';
      }
    } else if (section === 'services') {
      if (parts.length === 2) cat = 'Services Directory Index (/services)';
      else cat = 'Regional Service Hubs (/services/taif, /services/riyadh)';
    } else if ([
      'about', 'contact', 'cookies', 'faq', 'privacy', 'cancellation', 
      'pricing', 'manage-booking', 'safety', 'partners', 'team', 
      'reviews', 'showcase', 'track-booking', 'terms', 'design-system'
    ].includes(section)) {
      cat = `Core Static & Policy Pages (/${section})`;
    } else {
      cat = `Other: ${section}`;
      unclassified.push(r);
    }
  }

  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
}

console.log('Category Counts:');
let sum = 0;
for (const [c, cnt] of Object.entries(categoryCounts).sort((a,b) => b[1] - a[1])) {
  console.log(`  ${c}: ${cnt}`);
  sum += cnt;
}
console.log('Total categorized:', sum);
if (unclassified.length > 0) {
  console.log('Unclassified:', unclassified);
}
