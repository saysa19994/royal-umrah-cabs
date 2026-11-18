import fs from 'fs';

const locales = ['ar', 'en', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

for (const loc of locales) {
  const p = `.next/server/app/${loc}/guides/makkah-to-madinah-transport-comparison.html`;
  if (fs.existsSync(p)) {
    const html = fs.readFileSync(p, 'utf8');
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    const robotsMatch = html.match(/<meta name="robots" content="([^"]+)"/);
    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const hreflangs = html.match(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g) || [];
    
    // Check main body text
    const hasDoorToDoor = html.includes('Door-to-Door Convenience');
    
    // Check Arabic text in body
    const arabicMatches = html.match(/[\u0600-\u06FF]+/g) || [];
    
    console.log(`=== Locale: ${loc} ===`);
    console.log('  Title:', titleMatch ? titleMatch[1] : 'NONE');
    console.log('  H1:', h1Match ? h1Match[1] : 'NONE');
    console.log('  Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');
    console.log('  Robots:', robotsMatch ? robotsMatch[1] : 'default (index, follow)');
    console.log('  Hreflang count:', hreflangs.length);
    console.log('  English sections present:', hasDoorToDoor);
    console.log('  Arabic words in page:', arabicMatches.length);
  } else {
    console.log(`=== Locale: ${loc} === NOT FOUND`);
  }
}
