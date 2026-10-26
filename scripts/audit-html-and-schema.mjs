import fs from 'fs';

const locales = ['ar', 'en', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

console.log('--- AUDITING SERVER-RENDERED HTML FOR ALL 10 LOCALES ---');

for (const loc of locales) {
  const htmlPath = `D:/royal-umrah-cabs/.next/server/app/${loc}/faq.html`;
  if (!fs.existsSync(htmlPath)) {
    console.error(`Missing HTML for: ${loc}`);
    continue;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dict = JSON.parse(
    fs.readFileSync(`D:/royal-umrah-cabs/src/i18n/dictionaries/${loc}.json`, 'utf8')
  );

  let qFound = 0;
  let aFound = 0;
  for (let i = 1; i <= 12; i++) {
    if (html.includes(dict.faq[`q${i}`])) qFound++;
    if (html.includes(dict.faq[`a${i}`])) aFound++;
  }

  const hasFaqJsonLd = html.includes('"@type":"FAQPage"');
  const hasBreadcrumbJsonLd = html.includes('"@type":"BreadcrumbList"');
  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
  const canonicalUrl = canonicalMatch ? canonicalMatch[1] : null;

  // Count hreflang tags
  const hreflangMatches = [...html.matchAll(/<link[^>]*hrefLang="([^"]*)"[^>]*href="([^"]*)"/g)];
  const isRtl = loc === 'ar' || loc === 'ur';
  const hasRtlDir = html.includes('dir="rtl"');

  console.log(`\n[${loc.toUpperCase()}]`);
  console.log(`  - Questions in HTML: ${qFound}/12`);
  console.log(`  - Answers in HTML: ${aFound}/12`);
  console.log(`  - FAQPage Schema: ${hasFaqJsonLd ? 'YES' : 'NO'}`);
  console.log(`  - BreadcrumbList Schema: ${hasBreadcrumbJsonLd ? 'YES' : 'NO'}`);
  console.log(`  - Canonical URL: ${canonicalUrl}`);
  console.log(`  - Hreflang Tags Count: ${hreflangMatches.length}`);
  console.log(`  - RTL Behavior: Expected ${isRtl ? 'RTL' : 'LTR'}, Detected ${hasRtlDir ? 'RTL' : 'LTR'}`);
}
