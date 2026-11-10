import sitemapFunction, { generateSitemaps } from '../src/app/sitemap.js';

// If running in ts-node or with esm, let's load sitemap.ts
async function testSitemap() {
  const { default: sitemap, generateSitemaps } = await import('../src/app/sitemap.ts');

  const sitemaps = await generateSitemaps();
  console.log('generateSitemaps() produced:', sitemaps.map(s => s.id));

  // 1. Test Arabic Sitemap
  const arSitemap = await sitemap({ id: 'ar' });
  console.log(`Arabic sitemap contains ${arSitemap.length} entries.`);

  const arCoaster = arSitemap.find(entry => entry.url.includes('/fleet/toyota-coaster'));
  if (!arCoaster) throw new Error('Arabic sitemap missing /fleet/toyota-coaster');
  console.log('✓ Arabic sitemap includes /ar/fleet/toyota-coaster');

  const arMaybach = arSitemap.find(entry => entry.url.includes('/fleet/mercedes-maybach'));
  if (arMaybach) throw new Error('Arabic sitemap improperly contains Mercedes-Maybach');
  console.log('✓ Mercedes-Maybach successfully excluded from sitemap');

  const arGuides = arSitemap.filter(entry => entry.url.includes('/guides/'));
  console.log(`✓ Arabic sitemap includes ${arGuides.length} guide entries.`);

  // 2. Test English Sitemap
  const enSitemap = await sitemap({ id: 'en' });
  console.log(`English sitemap contains ${enSitemap.length} entries.`);
  const enGuides = enSitemap.filter(entry => entry.url.includes('/guides/'));
  console.log(`✓ English sitemap includes ${enGuides.length} guide entries.`);

  // 3. Test Turkish Sitemap (non-en/ar)
  const trSitemap = await sitemap({ id: 'tr' });
  console.log(`Turkish sitemap contains ${trSitemap.length} entries.`);
  const trComprehensiveGuides = trSitemap.filter(entry => 
    entry.url.includes('/tr/guides/') && 
    !entry.url.endsWith('/tr/guides') && 
    !entry.url.includes('jeddah-airport-arrival-guide') &&
    !entry.url.includes('malaysia-umrah-transport')
  );
  if (trComprehensiveGuides.length > 0) {
    throw new Error(`Turkish sitemap improperly includes untranslated comprehensive guides: ${trComprehensiveGuides.length}`);
  }
  console.log('✓ Turkish sitemap correctly excludes untranslated comprehensive guides per condition 2!');

  // Check alternates for Arabic guide
  const sampleArGuide = arGuides.find(g => g.url.includes('jeddah-airport-to-makkah-taxi-vs-train'));
  if (sampleArGuide) {
    console.log('✓ Sample guide alternates:', Object.keys(sampleArGuide.alternates.languages));
    if (sampleArGuide.alternates.languages.tr) {
      throw new Error('Guide sitemap alternate should not include untranslated tr');
    }
  }

  console.log('\nAll Sitemap criteria successfully verified!');
}

testSitemap().catch(err => {
  console.error('Sitemap test failed:', err);
  process.exit(1);
});
