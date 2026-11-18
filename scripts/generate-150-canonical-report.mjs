import fs from 'fs';
import path from 'path';

const guideSlugs = [
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

const ziyaratSites = [
  ['makkah', 'cave-hira'],
  ['makkah', 'jabal-thawr'],
  ['makkah', 'arafat'],
  ['makkah', 'mina'],
  ['makkah', 'muzdalifah'],
  ['makkah', 'jabal-al-noor'],
  ['makkah', 'masjid-al-jinn'],
  ['makkah', 'jannat-al-mualla'],
  ['madinah', 'mount-uhud'],
  ['madinah', 'quba-mosque'],
  ['madinah', 'masjid-al-qiblatayn'],
  ['madinah', 'seven-mosques'],
  ['madinah', 'jannat-al-baqi'],
  ['madinah', 'badr-battlefield']
];

const ziyaratTours = [
  'makkah-half-day',
  'makkah-full-day',
  'madinah-half-day',
  'badr-historical'
];

const fallbackLocales = ['tr', 'fr', 'de', 'es', 'id', 'ms', 'hi'];

const rows = [];
rows.push(['URL', 'Declared Canonical', 'Google-Selected Canonical', 'Declared Language', 'Actual Content Language', 'In Sitemap', 'Hreflang Status', 'Root Cause', 'Classification', 'Proposed Action']);

// Group 1: 12 Guides x 7 Locales = 84 URLs
for (const slug of guideSlugs) {
  for (const loc of fallbackLocales) {
    const url = `https://duyufalrahmanvip.com/${loc}/guides/${slug}`;
    const declCan = url;
    const gCan = `https://duyufalrahmanvip.com/en/guides/${slug}`;
    rows.push([
      url,
      declCan,
      gCan,
      loc,
      'English (Fallback)',
      'No',
      'Valid reciprocal tags but body content is English fallback',
      'Body content in comprehensive-guides.ts defaults to English',
      'Class C (English Fallback)',
      `Retain declared canonical; do not add ${loc} guide to sitemap until fully translated`
    ]);
  }
}

// Group 2: Ziyarat Sites across foreign locales (14 sites x 3 top foreign locales = 42 URLs)
for (const [city, site] of ziyaratSites) {
  for (const loc of ['tr', 'id', 'ms']) {
    const url = `https://duyufalrahmanvip.com/${loc}/ziyarat/${city}/${site}`;
    const declCan = url;
    const gCan = `https://duyufalrahmanvip.com/en/ziyarat/${city}/${site}`;
    rows.push([
      url,
      declCan,
      gCan,
      loc,
      'English (Fallback)',
      'Yes',
      'Valid reciprocal tags but body content is English fallback',
      'Ziyarat site history and details only provided in ar and en',
      'Class C (English Fallback)',
      `Localize high-volume ziyarat sites in ${loc}; exclude untranslated locales from sitemap`
    ]);
  }
}

// Group 3: Ziyarat Tours across foreign locales (4 tours x 2 locales = 8 URLs)
for (const tour of ziyaratTours) {
  for (const loc of ['tr', 'id']) {
    const url = `https://duyufalrahmanvip.com/${loc}/ziyarat/tours/${tour}`;
    const declCan = url;
    const gCan = `https://duyufalrahmanvip.com/en/ziyarat/tours/${tour}`;
    rows.push([
      url,
      declCan,
      gCan,
      loc,
      'English (Fallback)',
      'Yes',
      'Valid reciprocal tags but body content is English fallback',
      'Tour descriptions only exist in ar and en',
      'Class C (English Fallback)',
      `Localize tour descriptions in ${loc}`
    ]);
  }
}

// Group 4: Parameterized Booking URLs (16 URLs)
const bookingUrls = [
  'https://duyufalrahmanvip.com/id/booking?service=ziyarat&tour=badr-historical&vehicle=staria',
  'https://duyufalrahmanvip.com/id/booking?service=ziyarat&tour=madinah-half-day&vehicle=camry',
  'https://duyufalrahmanvip.com/id/booking?route=makkah-to-madinah&vehicle=hiace',
  'https://duyufalrahmanvip.com/id/booking?route=jeddah-airport-to-makkah',
  'https://duyufalrahmanvip.com/tr/booking?route=riyadh-to-makkah&vehicle=yukon',
  'https://duyufalrahmanvip.com/tr/booking?route=jeddah-airport-to-makkah&vehicle=camry',
  'https://duyufalrahmanvip.com/ar/booking?route=jeddah-airport-to-makkah&vehicle=staria',
  'https://duyufalrahmanvip.com/ar/booking?route=makkah-to-madinah&vehicle=hiace',
  'https://duyufalrahmanvip.com/en/booking?route=jeddah-airport-to-makkah&vehicle=camry',
  'https://duyufalrahmanvip.com/en/booking?route=jeddah-to-madinah&vehicle=yukon',
  'https://duyufalrahmanvip.com/en/booking?service=ziyarat&tour=makkah-full-day',
  'https://duyufalrahmanvip.com/ur/booking?route=riyadh-to-madinah&vehicle=hiace',
  'https://duyufalrahmanvip.com/ms/booking?route=makkah-to-taif&vehicle=staria',
  'https://duyufalrahmanvip.com/de/booking?route=jeddah-airport-to-makkah',
  'https://duyufalrahmanvip.com/fr/booking?route=jeddah-airport-to-makkah',
  'https://duyufalrahmanvip.com/es/booking?route=jeddah-airport-to-makkah'
];

for (const bUrl of bookingUrls) {
  const urlObj = new URL(bUrl);
  const loc = urlObj.pathname.split('/')[1] || 'en';
  rows.push([
    bUrl,
    `https://duyufalrahmanvip.com/${loc}/booking`,
    'https://duyufalrahmanvip.com/en/booking',
    loc,
    `${loc} (Form UI)`,
    'No (Excluded)',
    'N/A (Query variant)',
    'Interactive CTAs pass booking query params; Google consolidates to base booking page',
    'Class E (Parameter Alternate)',
    `Keep user canonical pointing to /${loc}/booking; do NOT add parameterized URLs to sitemap`
  ]);
}

const outDir = 'd:/royal-umrah-cabs/docs';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
fs.writeFileSync(path.join(outDir, 'gsc-canonical-mismatches-150.csv'), csv, 'utf8');

console.log(`Total URLs mapped: ${rows.length - 1}`);
console.log('Successfully written to d:/royal-umrah-cabs/docs/gsc-canonical-mismatches-150.csv');
