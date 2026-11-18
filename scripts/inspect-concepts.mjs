import fs from 'fs';

const dir = 'D:/royal-umrah-cabs/design-concepts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort();

console.log(`Found ${files.length} concept files:`);
for (const f of files) {
  const content = fs.readFileSync(`${dir}/${f}`, 'utf8');
  const title = content.match(/<title>(.*?)<\/title>/)?.[1] || 'No Title';
  console.log(`- ${f} (${content.length} bytes): ${title}`);
}
