import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';

// 1. UPDATE TAILWIND.CONFIG.TS
const tailwindPath = path.join(projectRoot, 'tailwind.config.ts');
let tailwindContent = fs.readFileSync(tailwindPath, 'utf8');

tailwindContent = tailwindContent.replace(/bg:\s*'#FDFBF7'/, "bg: '#090D15'");
tailwindContent = tailwindContent.replace(/'bg-alt':\s*'#F7F3EB'/, "'bg-alt': '#101725'");
tailwindContent = tailwindContent.replace(/alabaster:\s*'#F8FAFC'/, "alabaster: '#0E1420'");
tailwindContent = tailwindContent.replace(/surface:\s*'#FFFFFF'/, "surface: '#101725'");
tailwindContent = tailwindContent.replace(/'surface-warm':\s*'#FAF7F2'/, "'surface-warm': '#141D2C'");
tailwindContent = tailwindContent.replace(/border:\s*'#E2DCD2'/, "border: 'rgba(255, 255, 255, 0.08)'");
tailwindContent = tailwindContent.replace(/'border-strong':\s*'#D5CDBF'/, "'border-strong': 'rgba(214, 161, 58, 0.35)'");
tailwindContent = tailwindContent.replace(/ink:\s*'#1E293B'/, "ink: '#F6F3ED'");
tailwindContent = tailwindContent.replace(/'ink-muted':\s*'#64748B'/, "'ink-muted': '#AEB7C4'");
tailwindContent = tailwindContent.replace(/body:\s*'#334155'/, "body: '#AEB7C4'");
tailwindContent = tailwindContent.replace(/mutedText:\s*'#c9d1e3'/, "mutedText: '#AEB7C4'");

// Update royal tokens
tailwindContent = tailwindContent.replace(/ivory:\s*'#F7F5F0'/, "ivory: '#090D15'");
tailwindContent = tailwindContent.replace(/white:\s*'#FFFFFF'/, "white: '#101725'");
tailwindContent = tailwindContent.replace(/textPrimary:\s*'#182235'/, "textPrimary: '#F6F3ED'");
tailwindContent = tailwindContent.replace(/textSecondary:\s*'#687386'/, "textSecondary: '#AEB7C4'");
tailwindContent = tailwindContent.replace(/champagne:\s*'#C5A15D'/, "champagne: '#D6A13A'");

// Update gold tokens
tailwindContent = tailwindContent.replace(/DEFAULT:\s*'#C5A15D'/, "DEFAULT: '#D6A13A'");
tailwindContent = tailwindContent.replace(/softGold:\s*'#e8c766'/, "softGold: '#E5B14B'");
tailwindContent = tailwindContent.replace(/dark:\s*'#9E7A32'/, "dark: '#A97B27'");
tailwindContent = tailwindContent.replace(/soft:\s*'#FBF7ED'/, "soft: 'rgba(214, 161, 58, 0.12)'");
tailwindContent = tailwindContent.replace(/line:\s*'#E8E3DA'/, "line: 'rgba(214, 161, 58, 0.28)'");

fs.writeFileSync(tailwindPath, tailwindContent, 'utf8');
console.log('✓ tailwind.config.ts updated with royal luxury tokens');

// 2. CREATE LUXURY SUBPAGES STYLESHEET
const luxurySubpagesCssPath = path.join(projectRoot, 'src/styles/luxury-subpages.css');
const luxurySubpagesCss = `/* ==========================================================================
   DUYUF AL RAHMAN VIP — ROYAL LUXURY SUBPAGES DESIGN SYSTEM
   Dark Midnight Navy (#090D15), Royal Navy Surface (#101725), Champagne Gold (#D6A13A)
   ========================================================================== */

/* Universal Dark Luxury Root Overrides */
:root {
  --ink: #F6F3ED;
  --navy: #090D15;
  --navy-2: #101725;
  --ivory: #090D15;
  --paper: #101725;
  --stone: #141D2C;
  --bronze: #A97B27;
  --gold: #D6A13A;
  --gold-light: #E5B14B;
  --muted: #AEB7C4;
  --line: rgba(255, 255, 255, 0.08);
  --shadow: 0 18px 50px rgba(0, 0, 0, 0.5);
}

/* Page Heroes Across Subpages */
.page-hero,
.page-hero-light,
.about-hero,
.blog-hero {
  background: #090D15 !important;
  color: #F6F3ED !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 50px 0 40px;
}

.page-hero h1,
.about-hero h1,
.blog-hero h1 {
  color: #F6F3ED !important;
  font-family: var(--font-cinzel), var(--font-playfair), 'Amiri', serif;
}

.page-hero h1 em,
.about-hero h1 em,
.blog-hero h1 em {
  color: #D6A13A !important;
  font-style: normal;
}

.page-hero p,
.about-hero p,
.blog-hero p {
  color: #AEB7C4 !important;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #AEB7C4;
  margin-bottom: 20px;
}

.breadcrumbs a {
  color: #AEB7C4;
  transition: color 0.2s ease;
}

.breadcrumbs a:hover {
  color: #D6A13A;
}

.breadcrumbs span {
  color: rgba(214, 161, 58, 0.6);
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 0.15em;
  color: #D6A13A !important;
  font-weight: 700;
  text-transform: uppercase;
  display: block;
  margin-bottom: 12px;
}

/* Filter Pills */
.filter-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.filter-row span {
  font-size: 12px;
  color: #AEB7C4;
  font-weight: 600;
}

.filter-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter {
  padding: 8px 18px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  background: #141D2C;
  color: #AEB7C4;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
  cursor: pointer;
}

.filter:hover {
  border-color: rgba(214, 161, 58, 0.4);
  color: #F6F3ED;
}

.filter.active {
  background: #D6A13A;
  color: #090D15;
  border-color: #D6A13A;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(214, 161, 58, 0.3);
}

/* Vehicle Cards in Fleet Catalog */
.fleet-directory {
  background: #090D15;
  padding: 40px 0 60px;
}

.fleet-grid-large {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

@media (max-width: 640px) {
  .fleet-grid-large {
    grid-template-columns: 1fr;
  }
}

.vehicle-card {
  background: #101725;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.vehicle-card:hover {
  border-color: rgba(214, 161, 58, 0.45);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(214, 161, 58, 0.1);
  transform: translateY(-2px);
}

.vehicle-card-image {
  position: relative;
  height: 220px;
  background: linear-gradient(180deg, #141D2C 0%, #101725 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.vehicle-index {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #D6A13A;
  background: rgba(9, 13, 21, 0.7);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(214, 161, 58, 0.2);
}

[dir="rtl"] .vehicle-index {
  right: auto;
  left: 14px;
}

.vehicle-card-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-kicker {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #D6A13A;
  margin-bottom: 6px;
}

.vehicle-card-body h2 {
  font-size: 20px;
  font-weight: 700;
  color: #F6F3ED;
  margin: 0 0 8px 0;
}

.vehicle-card-body p {
  font-size: 13px;
  color: #AEB7C4;
  line-height: 1.6;
  margin: 0 0 16px 0;
  flex: 1;
}

.vehicle-specs {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
  color: #AEB7C4;
  margin-bottom: 18px;
}

.vehicle-specs strong {
  color: #F6F3ED;
}

.vehicle-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.text-link {
  font-size: 12px;
  font-weight: 700;
  color: #D6A13A;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s ease;
}

.text-link:hover {
  color: #E5B14B;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn-dark {
  background: #141D2C;
  color: #F6F3ED;
  border-color: rgba(214, 161, 58, 0.3);
}

.btn-dark:hover {
  background: #D6A13A;
  color: #090D15;
  border-color: #D6A13A;
}

.btn-gold {
  background: #D6A13A;
  color: #090D15;
}

.btn-gold:hover {
  background: #E5B14B;
}

/* Bespoke Concierge Band */
.concierge-band,
.concierge-light {
  background: linear-gradient(180deg, #101725 0%, #090D15 100%) !important;
  border-top: 1px solid rgba(214, 161, 58, 0.2);
  border-bottom: 1px solid rgba(214, 161, 58, 0.2);
  padding: 60px 0;
  color: #F6F3ED;
}

.concierge-inner {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  align-items: center;
}

@media (max-width: 900px) {
  .concierge-inner {
    grid-template-columns: 1fr;
  }
}

.concierge-inner h2 {
  font-size: 32px;
  color: #F6F3ED;
  margin: 0 0 14px 0;
  font-family: var(--font-cinzel), var(--font-playfair), serif;
}

.concierge-inner h2 em {
  color: #D6A13A;
  font-style: normal;
}

.concierge-inner p {
  font-size: 14px;
  color: #AEB7C4;
  line-height: 1.7;
  margin-bottom: 24px;
}

.concierge-vehicles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.concierge-vehicles a {
  background: #141D2C;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.concierge-vehicles a:hover {
  border-color: #D6A13A;
  transform: translateY(-2px);
}

/* Comparison Matrix Table */
.spec-comparison-section {
  background: #090D15;
  padding: 60px 0;
  color: #F6F3ED;
}

.spec-table-container {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #101725;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
  text-align: start;
  font-size: 13px;
}

.spec-table th {
  background: #141D2C;
  color: #D6A13A;
  padding: 14px 16px;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  white-space: nowrap;
}

.spec-table td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #AEB7C4;
}

.spec-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.spec-table strong {
  color: #F6F3ED;
}
`;

fs.writeFileSync(luxurySubpagesCssPath, luxurySubpagesCss, 'utf8');
console.log('✓ src/styles/luxury-subpages.css created');

// 3. UPDATE GLOBALS.CSS
const globalsPath = path.join(projectRoot, 'src/app/globals.css');
let globalsContent = fs.readFileSync(globalsPath, 'utf8');

// Ensure import exists
if (!globalsContent.includes('luxury-subpages.css')) {
  globalsContent = globalsContent.replace(
    /@import "\.\.\/styles\/homepage-reference\.css";/,
    '@import "../styles/homepage-reference.css";\n@import "../styles/luxury-subpages.css";'
  );
}

// Update :root defaults
globalsContent = globalsContent.replace(/--color-bg:\s*#F7F5F0;/, '--color-bg: #090D15;');
globalsContent = globalsContent.replace(/--color-bg-alt:\s*#FFFFFF;/, '--color-bg-alt: #101725;');
globalsContent = globalsContent.replace(/--color-surface:\s*#FFFFFF;/, '--color-surface: #101725;');
globalsContent = globalsContent.replace(/--color-border:\s*#E8E3DA;/, '--color-border: rgba(255, 255, 255, 0.08);');
globalsContent = globalsContent.replace(/--color-border-strong:\s*#D5CDBF;/, '--color-border-strong: rgba(214, 161, 58, 0.35);');
globalsContent = globalsContent.replace(/--color-ink:\s*#182235;/, '--color-ink: #F6F3ED;');
globalsContent = globalsContent.replace(/--color-ink-muted:\s*#687386;/, '--color-ink-muted: #AEB7C4;');
globalsContent = globalsContent.replace(/--color-body:\s*#182235;/, '--color-body: #AEB7C4;');
globalsContent = globalsContent.replace(/--color-gold:\s*#C5A15D;/, '--color-gold: #D6A13A;');
globalsContent = globalsContent.replace(/--color-gold-dark:\s*#B5904C;/, '--color-gold-dark: #A97B27;');

fs.writeFileSync(globalsPath, globalsContent, 'utf8');
console.log('✓ src/app/globals.css updated with luxury tokens & import');
