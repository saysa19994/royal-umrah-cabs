import fs from 'fs';

const filePath = 'd:/royal-umrah-cabs/src/components/layout/FloatingUI.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const isExcludedPage =[\s\S]*?pathname\.startsWith\('\/admin'\);/;
const replacement = `const isExcludedPage =
    pathname.includes('/booking') ||
    pathname.includes('/confirmation') ||
    pathname.startsWith('/admin') ||
    pathname === '/' ||
    pathname === '/' + locale ||
    pathname === '/' + locale + '/' ||
    pathname.endsWith('/' + locale) ||
    pathname.endsWith('/' + locale + '/');`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content);
  console.log('Successfully updated isExcludedPage in FloatingUI.tsx');
} else {
  console.log('Regex did not match in FloatingUI.tsx');
}
