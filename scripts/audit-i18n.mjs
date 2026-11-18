import fs from 'fs';

// Check middleware or i18n
const configFiles = [
  'D:/royal-umrah-cabs/src/i18n.ts',
  'D:/royal-umrah-cabs/src/i18n/request.ts',
  'D:/royal-umrah-cabs/src/i18n/routing.ts',
  'D:/royal-umrah-cabs/src/middleware.ts',
  'D:/royal-umrah-cabs/next.config.mjs'
];

for (const f of configFiles) {
  if (fs.existsSync(f)) {
    console.log(`\n=== ${f} ===`);
    console.log(fs.readFileSync(f, 'utf8').slice(0, 1000));
  }
}

// Check messages dir
if (fs.existsSync('D:/royal-umrah-cabs/messages')) {
  console.log('\n=== Messages Directory ===');
  console.log(fs.readdirSync('D:/royal-umrah-cabs/messages'));
} else if (fs.existsSync('D:/royal-umrah-cabs/src/messages')) {
  console.log('\n=== src/messages Directory ===');
  console.log(fs.readdirSync('D:/royal-umrah-cabs/src/messages'));
}
