import fs from 'fs';
import path from 'path';

function searchFiles(dir, pattern) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      searchFiles(full, pattern);
    } else if (f.name.endsWith('.tsx') || f.name.endsWith('.ts')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('robots') && c.includes('canonical')) {
        console.log('Found in:', full);
      }
    }
  }
}

searchFiles('src/app/[locale]', '');
