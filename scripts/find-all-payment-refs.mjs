import fs from 'fs';
import path from 'path';

const searchRegex = /(credit\s*card|debit\s*card|card\s*payment|pos\s*terminal|\bpos\b|mada\b|visa\b|mastercard|بطاق|شبكة|\bkartla\b|\bkredi\s*kart|\bcarte\b|\btarjeta\b|\bkarte\b|bank\s*transfer|تحويل\s*بنكي|bank\s*card|kart\s*ile|con\s*tarjeta|par\s*carte|mit\s*karte|بالبطاقة)/i;

const ignoredDirs = ['.git', '.next', 'node_modules', '.vercel'];

const results = [];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (ignoredDirs.includes(f)) continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (stat.isFile() && (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.json') || f.endsWith('.mjs') || f.endsWith('.js'))) {
      if (f.includes('test-phone-security') || f.includes('test-pricing') || f.includes('package-lock.json')) continue;
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (searchRegex.test(line)) {
          results.push({
            file: full.replace(/\\/g, '/'),
            line: idx + 1,
            text: line.trim()
          });
        }
      });
    }
  }
}

walk('D:/royal-umrah-cabs/src');
walk('D:/royal-umrah-cabs/scripts');

console.log(`Found ${results.length} occurrences across files:`);
const byFile = {};
results.forEach(r => {
  byFile[r.file] = byFile[r.file] || [];
  byFile[r.file].push(r);
});

for (const [file, items] of Object.entries(byFile)) {
  console.log(`\n=== ${file} (${items.length}) ===`);
  items.slice(0, 5).forEach(i => console.log(`  Line ${i.line}: ${i.text.slice(0, 100)}`));
  if (items.length > 5) console.log(`  ... and ${items.length - 5} more`);
}
