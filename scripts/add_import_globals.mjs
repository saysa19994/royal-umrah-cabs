import fs from 'fs';
const targetPath = 'd:/royal-umrah-cabs/src/app/globals.css';
let content = fs.readFileSync(targetPath, 'utf8');
if (!content.includes('homepage-v3.css')) {
  content = content.replace(
    '@import "../styles/luxury-subpages.css";',
    '@import "../styles/luxury-subpages.css";\n@import "../styles/homepage-v3.css";'
  );
  fs.writeFileSync(targetPath, content);
  console.log('Successfully added homepage-v3.css to globals.css');
} else {
  console.log('homepage-v3.css is already in globals.css');
}
