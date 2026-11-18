import fs from 'fs';
import path from 'path';

const projectRoot = 'd:/royal-umrah-cabs';

// ---------------------------------------------------------------------------
// 1. REBUILD src/styles/luxury-subpages.css
// ---------------------------------------------------------------------------
const luxuryCssPath = path.join(projectRoot, 'src/styles/luxury-subpages.css');
let luxuryCss = fs.readFileSync(luxuryCssPath, 'utf8');

// Replace the :root block at top
const newLuxuryRoot = `/* Universal Master Design Tokens — Dual-Theme Powered */
:root,
[data-theme="light"] {
  --ink: #101827;
  --navy: #101827;
  --navy-2: #243247;
  --ivory: #F7F5F0;
  --paper: #FFFFFF;
  --stone: #E5E0D6;
  --bronze: #A77B3E;
  --gold: #A77B3E;
  --gold-light: #B88B4E;
  --muted: #64748B;
  --line: #E5E0D6;
  --sand: #F0EDE5;
  --shadow: 0 10px 30px -5px rgba(16, 24, 39, 0.06);
}

[data-theme="dark"],
.dark {
  --ink: #F7F5F0;
  --navy: #F7F5F0;
  --navy-2: #182436;
  --ivory: #0A0F18;
  --paper: #111A27;
  --stone: #1F2B3D;
  --bronze: #C5A15D;
  --gold: #C5A15D;
  --gold-light: #D4AF37;
  --muted: #94A3B8;
  --line: #1F2B3D;
  --sand: #182436;
  --shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.45);
}`;

luxuryCss = luxuryCss.replace(/\/\* Universal Master Design Tokens \*\/[\s\S]*?:root\s*\{[\s\S]*?\}/, newLuxuryRoot);

// Replace hardcoded values across luxury-subpages.css
luxuryCss = luxuryCss
  .replaceAll('#F7F5F0', 'var(--ivory)')
  .replaceAll('#FFFFFF', 'var(--paper)')
  .replaceAll('#F0ECE4', 'var(--sand)')
  .replaceAll('#FDFBF7', 'var(--sand)')
  .replaceAll('#101827', 'var(--ink)')
  .replaceAll('#243247', 'var(--navy-2)')
  .replaceAll('#334155', 'var(--muted)')
  .replaceAll('#64748B', 'var(--muted)')
  .replaceAll('#E5E0D6', 'var(--stone)')
  .replaceAll('#A77B3E', 'var(--bronze)')
  .replaceAll('#8E672F', 'var(--gold-light)');

fs.writeFileSync(luxuryCssPath, luxuryCss, 'utf8');
console.log('Successfully updated luxury-subpages.css');

// ---------------------------------------------------------------------------
// 2. REBUILD src/styles/homepage-v3.css
// ---------------------------------------------------------------------------
const homeCssPath = path.join(projectRoot, 'src/styles/homepage-v3.css');
let homeCss = fs.readFileSync(homeCssPath, 'utf8');

const newHomeRoot = `:root,
[data-theme="light"] {
  --ivory: #F7F5F0;
  --white: #FFFFFF;
  --navy: #101827;
  --bronze: #A77B3E;
  --bronze-soft: #C6A66A;
  --ink: #101827;
  --muted: #64748B;
  --line: #E5E0D6;
  --sand: #F0EDE5;
  --max: 1240px;
  --shadow: 0 18px 48px rgba(16,24,39,.09);
  --radius: 18px;
}

[data-theme="dark"],
.dark {
  --ivory: #0A0F18;
  --white: #111A27;
  --navy: #F7F5F0;
  --bronze: #C5A15D;
  --bronze-soft: #D4AF37;
  --ink: #F7F5F0;
  --muted: #94A3B8;
  --line: #1F2B3D;
  --sand: #182436;
  --shadow: 0 18px 48px rgba(0,0,0,.45);
  --radius: 18px;
}`;

homeCss = homeCss.replace(/:root\s*\{[\s\S]*?--radius:18px;\s*\}/, newHomeRoot);

// Fix remaining hardcoded values in homepage-v3.css
homeCss = homeCss
  .replaceAll('background: #FFFFFF !important;', 'background: var(--white) !important;')
  .replaceAll('background: #FDFCF9 !important;', 'background: var(--sand) !important;')
  .replaceAll('border: 1px solid #E5E1D8 !important;', 'border: 1px solid var(--line) !important;')
  .replaceAll('border-inline-end: 1px solid #E5E1D8 !important;', 'border-inline-end: 1px solid var(--line) !important;')
  .replaceAll('color: #555E6D !important;', 'color: var(--muted) !important;')
  .replaceAll('color: #101827 !important;', 'color: var(--navy) !important;')
  .replaceAll('border:1px solid #E6E0D5;border-radius:14px;background:#fff;', 'border:1px solid var(--line);border-radius:14px;background:var(--white);')
  .replaceAll('background:#fff;', 'background:var(--white);')
  .replaceAll('background: #fff;', 'background: var(--white);')
  .replaceAll('background:#F7F5F0;', 'background:var(--ivory);')
  .replaceAll('background: #F7F5F0;', 'background: var(--ivory);');

// WCAG AAA card & final CTA dual theme
homeCss = homeCss.replace(
  /\.service-card--photo\s*\{[\s\S]*?color:\s*#FFFFFF\s*!important;\s*\}/,
  `.service-card--photo {
  color: #FFFFFF !important;
  border: 1px solid var(--line) !important;
  background: var(--white) !important;
}`
);

homeCss = homeCss.replace(
  /\.final-cta\s*\{[\s\S]*?color:\s*#FFFFFF\s*!important;\s*\}/,
  `.final-cta {
  background: var(--white) !important;
  color: var(--navy) !important;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}`
);

fs.writeFileSync(homeCssPath, homeCss, 'utf8');
console.log('Successfully updated homepage-v3.css');
