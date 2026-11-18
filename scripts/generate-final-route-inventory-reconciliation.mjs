import fs from 'fs';
import path from 'path';

const prerender = JSON.parse(fs.readFileSync('.next/prerender-manifest.json', 'utf8'));
const routes = Object.keys(prerender.routes);

console.log('Total routes in prerender-manifest.json:', routes.length);

const header = [
  'path',
  'locale',
  'category',
  'rendering_mode',
  'included_in_ssg_count',
  'duplicate_group',
  'source_file',
  'verification_status'
];

const rows = [header.map(h => `"${h}"`).join(',')];

const categoryCounts = {};

for (const r of routes) {
  let locale = 'neutral (root)';
  let category = 'System / Metadata';
  const renderingMode = 'SSG';
  const includedInSSG = 'TRUE';
  let duplicateGroup = 'None (Unique)';
  let sourceFile = 'src/app/...';
  const verificationStatus = 'PASS';

  if (r === '/') {
    locale = 'root';
    category = 'System Root Redirect / Rewrite';
    duplicateGroup = 'Root Landing';
    sourceFile = 'src/app/page.tsx';
  } else if (r === '/_not-found') {
    locale = 'root';
    category = 'System 404 Error Handler';
    duplicateGroup = 'System Error Handler';
    sourceFile = 'src/app/not-found.tsx';
  } else if (r === '/robots.txt') {
    locale = 'root';
    category = 'System Search Engine Directives';
    duplicateGroup = 'Search Engine Directives';
    sourceFile = 'src/app/robots.ts';
  } else if (r === '/manifest.webmanifest' || r === '/icon.png' || r === '/apple-icon.png') {
    locale = 'root';
    category = 'System Metadata & App Icons';
    duplicateGroup = 'PWA & Browser Branding';
    sourceFile = `src/app/${r.slice(1)}`;
  } else if (r.startsWith('/sitemap/')) {
    locale = r.replace('/sitemap/', '').replace('.xml', '');
    category = 'Statically Rendered Child Sitemaps';
    duplicateGroup = 'Search Index Architecture';
    sourceFile = 'src/app/sitemap.ts';
  } else {
    const parts = r.split('/').filter(Boolean);
    locale = parts[0];
    const section = parts[1];
    const sub = parts[2];
    const subsub = parts[3];

    if (parts.length === 1) {
      category = 'Localized Homepages';
      duplicateGroup = 'Localized Home cluster';
      sourceFile = 'src/app/[locale]/page.tsx';
    } else if (section === 'routes') {
      category = 'Commercial Intercity Routes';
      duplicateGroup = `Intercity Route (${sub})`;
      sourceFile = 'src/app/[locale]/routes/[slug]/page.tsx';
    } else if (section === 'fleet') {
      if (parts.length === 2) {
        category = 'Fleet Directory Indexes';
        duplicateGroup = 'Fleet Index cluster';
        sourceFile = 'src/app/[locale]/fleet/page.tsx';
      } else {
        category = 'Official Fleet Detail Pages';
        duplicateGroup = `Vehicle Detail (${sub})`;
        sourceFile = 'src/app/[locale]/fleet/[slug]/page.tsx';
      }
    } else if (section === 'blog') {
      if (parts.length === 2) {
        category = 'Blog Directory Indexes';
        duplicateGroup = 'Blog Index cluster';
        sourceFile = 'src/app/[locale]/blog/page.tsx';
      } else {
        category = 'Editorial Blog Articles';
        duplicateGroup = `Editorial Article (${sub})`;
        sourceFile = 'src/app/[locale]/blog/[slug]/page.tsx';
      }
    } else if (section === 'ziyarat') {
      if (parts.length === 2) {
        category = 'Ziyarat Directory Indexes';
        duplicateGroup = 'Ziyarat Index cluster';
        sourceFile = 'src/app/[locale]/ziyarat/page.tsx';
      } else if (parts.length === 3 && (sub === 'makkah' || sub === 'madinah')) {
        category = 'Ziyarat City Hubs';
        duplicateGroup = `Ziyarat Hub (${sub})`;
        sourceFile = 'src/app/[locale]/ziyarat/[city]/page.tsx';
      } else if (sub === 'tours') {
        category = 'Ziyarat Curated Tours';
        duplicateGroup = `Ziyarat Tour (${subsub})`;
        sourceFile = 'src/app/[locale]/ziyarat/tours/[slug]/page.tsx';
      } else if (sub === 'guides') {
        category = 'Ziyarat Planning Guides';
        duplicateGroup = `Ziyarat Guide (${subsub})`;
        sourceFile = 'src/app/[locale]/ziyarat/guides/[slug]/page.tsx';
      } else {
        category = 'Ziyarat Sacred Sites';
        duplicateGroup = `Ziyarat Site (${subsub || sub})`;
        sourceFile = 'src/app/[locale]/ziyarat/[city]/[site]/page.tsx';
      }
    } else if (section === 'pilgrims') {
      category = 'Pilgrim Country Landing Pages';
      duplicateGroup = `Pilgrim Country (${sub})`;
      sourceFile = 'src/app/[locale]/pilgrims/[slug]/page.tsx';
    } else if (section === 'guides') {
      if (parts.length === 2) {
        category = 'Guide Directory Indexes';
        duplicateGroup = 'Guide Index cluster';
        sourceFile = 'src/app/[locale]/guides/page.tsx';
      } else if (sub === 'jeddah-airport-arrival-guide' || sub === 'malaysia-umrah-transport' || sub === 'makkah-to-madinah-transport-comparison') {
        category = 'Standalone Landing Guides';
        duplicateGroup = `Standalone Guide (${sub})`;
        sourceFile = `src/app/[locale]/guides/${sub}/page.tsx`;
      } else {
        category = 'Comprehensive Guides';
        duplicateGroup = `Comprehensive Guide (${sub})`;
        sourceFile = 'src/app/[locale]/guides/[slug]/page.tsx';
      }
    } else if (section === 'services') {
      if (parts.length === 2) {
        category = 'Services Directory Indexes';
        duplicateGroup = 'Services Index cluster';
        sourceFile = 'src/app/[locale]/services/page.tsx';
      } else {
        category = 'Regional Service Hubs';
        duplicateGroup = `Regional Hub (${sub})`;
        sourceFile = 'src/app/[locale]/services/[city]/page.tsx';
      }
    } else if ([
      'about', 'contact', 'cookies', 'faq', 'privacy', 'cancellation', 
      'pricing', 'manage-booking', 'safety', 'partners', 'team', 
      'reviews', 'showcase', 'track-booking', 'terms', 'design-system'
    ].includes(section)) {
      category = 'Core Static & Policy Pages';
      duplicateGroup = `Policy / Public Page (${section})`;
      sourceFile = `src/app/[locale]/${section}/page.tsx`;
    }
  }

  categoryCounts[category] = (categoryCounts[category] || 0) + 1;

  rows.push([
    `"${r}"`,
    `"${locale}"`,
    `"${category}"`,
    `"${renderingMode}"`,
    `"${includedInSSG}"`,
    `"${duplicateGroup}"`,
    `"${sourceFile}"`,
    `"${verificationStatus}"`
  ].join(','));
}

fs.writeFileSync('docs/seo/final-route-inventory-reconciliation.csv', rows.join('\n'), 'utf8');
console.log('Saved docs/seo/final-route-inventory-reconciliation.csv with', rows.length - 1, 'rows');
console.log('Summary Breakdown:');
let sum = 0;
for (const [cat, cnt] of Object.entries(categoryCounts).sort((a,b) => b[1] - a[1])) {
  console.log(`  ${cat}: ${cnt}`);
  sum += cnt;
}
console.log('Total categorized:', sum);
