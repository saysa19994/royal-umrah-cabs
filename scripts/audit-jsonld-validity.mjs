import fs from 'fs';

const locales = ['ar', 'en', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

console.log('--- VALIDATING JSON-LD SYNTAX ACROSS ALL 10 LOCALES ---');

let totalSchemas = 0;
let validSchemas = 0;

for (const loc of locales) {
  const htmlPath = `D:/royal-umrah-cabs/.next/server/app/${loc}/faq.html`;
  const html = fs.readFileSync(htmlPath, 'utf8');

  // Extract all application/ld+json script tags
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let count = 0;

  while ((match = regex.exec(html)) !== null) {
    count++;
    totalSchemas++;
    const jsonStr = match[1];
    try {
      const parsed = JSON.parse(jsonStr);
      validSchemas++;
      console.log(`[${loc.toUpperCase()}] Schema #${count}: Valid JSON | Type: ${parsed['@type']}`);
      if (parsed['@type'] === 'FAQPage') {
        const questionsCount = parsed.mainEntity ? parsed.mainEntity.length : 0;
        console.log(`      -> MainEntity Questions Count: ${questionsCount}`);
      }
      if (parsed['@type'] === 'BreadcrumbList') {
        const itemsCount = parsed.itemListElement ? parsed.itemListElement.length : 0;
        console.log(`      -> Breadcrumb Items Count: ${itemsCount}`);
      }
    } catch (err) {
      console.error(`❌ [${loc.toUpperCase()}] Schema #${count} JSON Parse Error:`, err.message);
    }
  }
}

console.log(`\nJSON-LD Validation Result: ${validSchemas}/${totalSchemas} valid schemas.`);
if (validSchemas === totalSchemas && totalSchemas > 0) {
  console.log('✓ ALL STRUCTURED DATA VALIDATED SUCCESSFULLY WITH ZERO SYNTAX ERRORS!');
} else {
  console.error('❌ STRUCTURED DATA VALIDATION FAILED!');
  process.exit(1);
}
