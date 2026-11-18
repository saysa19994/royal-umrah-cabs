import fs from 'fs';

const filePath = 'd:/royal-umrah-cabs/src/app/globals.css';
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  '@import "../styles/homepage-reference.css";',
  '@import "../styles/saudi-hospitality.css";'
);

content = content.replace(
  '--color-bg: #090D15;',
  '--color-bg: #F7F5F0;'
);

content = content.replace(
  '--color-bg-alt: #101725;',
  '--color-bg-alt: #FFFFFF;'
);

content = content.replace(
  '--color-surface: #101725;',
  '--color-surface: #FFFFFF;'
);

content = content.replace(
  '--color-ink: #F6F3ED;',
  '--color-ink: #26332E;'
);

content = content.replace(
  '--color-ink-muted: #AEB7C4;',
  '--color-ink-muted: #73796F;'
);

content = content.replace(
  '--color-body: #AEB7C4;',
  '--color-body: #26332E;'
);

content = content.replace(
  '--color-gold: #D6A13A;',
  '--color-gold: #354B3F;'
);

content = content.replace(
  '--color-gold-dark: #A97B27;',
  '--color-gold-dark: #293B32;'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('globals.css updated successfully with D01 tokens!');
