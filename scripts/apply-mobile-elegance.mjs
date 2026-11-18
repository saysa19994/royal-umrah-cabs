import fs from 'fs';

// 1. UPDATE homepage-reference.css for mobile
const homeCssPath = 'src/styles/homepage-reference.css';
let homeCss = fs.readFileSync(homeCssPath, 'utf-8');

const targetOldMobileHero = `@media (max-width: 768px) {
  .rc-hero-section {
    padding-top: 10px;
    padding-bottom: 40px;
    min-height: auto;
    flex-direction: column;
  }

  .rc-hero-bg-wrapper {
    position: relative;
    height: 220px;
    width: 100%;
    margin-bottom: 16px;
  }

  .rc-hero-bg-image {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .rc-hero-vignette {
    background: linear-gradient(180deg, rgba(9, 13, 21, 0.1) 0%, rgba(9, 13, 21, 0.8) 70%, #090D15 100%);
  }

  [dir="rtl"] .rc-hero-vignette {
    background: linear-gradient(180deg, rgba(9, 13, 21, 0.1) 0%, rgba(9, 13, 21, 0.8) 70%, #090D15 100%);
  }

  .rc-hero-headline {
    font-size: 30px;
  }`;

const replacementNewMobileHero = `@media (max-width: 768px) {
  .rc-hero-section {
    position: relative;
    padding-top: 20px;
    padding-bottom: 40px;
    min-height: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .rc-hero-bg-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    margin-bottom: 0;
  }

  .rc-hero-bg-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    opacity: 0.45;
  }

  .rc-hero-vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(9, 13, 21, 0.5) 0%, rgba(9, 13, 21, 0.88) 60%, #090D15 100%);
  }

  [dir="rtl"] .rc-hero-vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(9, 13, 21, 0.5) 0%, rgba(9, 13, 21, 0.88) 60%, #090D15 100%);
  }

  .rc-hero-content {
    position: relative;
    z-index: 10;
  }

  .rc-hero-headline {
    font-size: 28px;
    line-height: 1.25;
    text-align: center;
  }

  .rc-hero-subtitle {
    font-size: 13px;
    text-align: center;
    margin-bottom: 20px;
  }

  .rc-hero-trust-row {
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

  /* Compact 2-column Services on mobile (Screen 2 style) */
  .rc-services-cards-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px !important;
  }

  .rc-service-card {
    padding: 16px 12px !important;
  }

  .rc-service-card h3 {
    font-size: 14px !important;
    margin-bottom: 4px !important;
  }

  .rc-service-card p {
    font-size: 11px !important;
    line-height: 1.4 !important;
  }`;

if (homeCss.includes(targetOldMobileHero)) {
  homeCss = homeCss.replace(targetOldMobileHero, replacementNewMobileHero);
  fs.writeFileSync(homeCssPath, homeCss, 'utf-8');
  console.log('Updated homepage-reference.css with full-bleed mobile hero and 2-col services!');
} else {
  console.log('Target string not found in homepage-reference.css');
}

// 2. UPDATE luxury-subpages.css for mobile
const luxuryCssPath = 'src/styles/luxury-subpages.css';
let luxuryCss = fs.readFileSync(luxuryCssPath, 'utf-8');

// Replace mobile packages-grid stacking with horizontal swipe
luxuryCss = luxuryCss.replace(
  `@media (max-width: 768px) {
  .packages-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}`,
  `@media (max-width: 768px) {
  .packages-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    gap: 14px;
    padding: 10px 4px 20px 4px;
    margin: 16px 0 24px 0;
  }
  .packages-grid::-webkit-scrollbar {
    display: none;
  }
  .master-package-card {
    min-width: 82vw;
    max-width: 310px;
    scroll-snap-align: center;
    flex-shrink: 0;
    padding: 20px 16px;
  }
}`
);

// Replace mobile why-choose-ribbon stacking with clean 2-column grid
luxuryCss = luxuryCss.replace(
  `@media (max-width: 600px) {
  .why-choose-ribbon {
    grid-template-columns: 1fr;
  }
}`,
  `@media (max-width: 600px) {
  .why-choose-ribbon {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 18px 12px;
  }
  .why-badge-circle {
    width: 44px;
    height: 44px;
  }
  .why-badge-title {
    font-size: 11px;
  }
}`
);

fs.writeFileSync(luxuryCssPath, luxuryCss, 'utf-8');
console.log('Updated luxury-subpages.css with mobile swipe carousel & compact 2-col badges!');
