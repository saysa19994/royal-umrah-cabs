import fs from 'fs';

const content = fs.readFileSync('src/data/ziyarat.ts', 'utf8');

// Parse ZIYARAT_SITES
function extractArray(name) {
  const start = content.indexOf(`export const ${name}`);
  if (start === -1) return [];
  const nextExport = content.indexOf('export const', start + 20);
  const block = nextExport === -1 ? content.slice(start) : content.slice(start, nextExport);
  const slugs = [];
  const matches = block.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  for (const m of matches) {
    slugs.push(m[1]);
  }
  return slugs;
}

console.log('ZIYARAT_SITES:', extractArray('ZIYARAT_SITES'));
console.log('ZIYARAT_TOURS:', extractArray('ZIYARAT_TOURS'));
console.log('ZIYARAT_GUIDES:', extractArray('ZIYARAT_GUIDES'));
