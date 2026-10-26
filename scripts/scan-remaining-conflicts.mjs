import fs from 'fs';
import path from 'path';

const searchRegex = /(credit\s*card|debit\s*card|card\s*payment|pos\s*terminal|\bin-car\s*pos\b|mada\b|visa\b|mastercard|بالبطاقة|بالبطاقات|شبكة|\bkartla\b|\bkredi\s*kart|\bcarte\s*bancaire|\btarjeta\b|\bmit\s*karte\b|bank\s*transfer|تحويل\s*بنكي|bank\s*card|kart\s*ile|con\s*tarjeta|par\s*carte)/i;

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
    } else if (stat.isFile() && (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.json'))) {
      if (f.includes('test-') || f.includes('package-lock.json')) continue;
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        // Exclude admin pages (which have settings toggles for online_card_payment_enabled)
        if (full.includes('src/app/admin/settings') || full.includes('src/app/api/admin/settings')) return;
        // Exclude AI chat safety notice ("we never ask for card numbers")
        if (line.includes('safetyNotice') || line.includes('NEVER collect')) return;
        // Exclude lucide icon import "CreditCard" if used as layout icon
        if (line.includes("import {") && line.includes("CreditCard")) return;
        
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

console.log(`Remaining matches: ${results.length}`);
results.forEach(r => {
  console.log(`${r.file}:${r.line} -> ${r.text.slice(0, 120)}`);
});
