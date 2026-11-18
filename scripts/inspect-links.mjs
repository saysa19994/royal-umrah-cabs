import fs from 'fs';

const html = fs.readFileSync('.next/server/app/en/guides/makkah-to-madinah-transport-comparison.html', 'utf8');

const headMatch = html.match(/<head>([\s\S]*?)<\/head>/);
if (headMatch) {
  const head = headMatch[1];
  const links = head.match(/<link[^>]+>/g) || [];
  console.log('All <link> tags in <head>:');
  for (const l of links) {
    if (l.includes('canonical') || l.includes('alternate') || l.includes('hreflang')) {
      console.log(' ', l);
    }
  }
} else {
  console.log('No <head> tag found, checking all <link> tags:');
  const links = html.match(/<link[^>]+>/g) || [];
  for (const l of links) {
    if (l.includes('canonical') || l.includes('alternate') || l.includes('hreflang')) {
      console.log(' ', l);
    }
  }
}
