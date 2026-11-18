import fs from 'fs';
import path from 'path';

const rootDir = 'D:/royal-umrah-cabs/src';

function searchDir(dir, filterFn, actionFn) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.next') {
      searchDir(full, filterFn, actionFn);
    } else if (entry.isFile() && filterFn(entry.name)) {
      actionFn(full);
    }
  }
}

console.log('=== 1. Checking new-tab booking links ===');
searchDir(rootDir, name => name.endsWith('.tsx') || name.endsWith('.ts'), file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('booking') && line.includes('_blank')) {
      console.log(`${file}:${idx + 1} -> ${line.trim()}`);
    }
  });
});

console.log('\n=== 2. Checking booking email handling and false-success ===');
searchDir(rootDir, name => name.endsWith('.tsx') || name.endsWith('.ts'), file => {
  if (file.includes('email') || file.includes('booking')) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('customer_email') || line.includes('passenger_email') || line.includes('sendBookingEmails')) {
        console.log(`${file}:${idx + 1} -> ${line.trim()}`);
      }
    });
  }
});
