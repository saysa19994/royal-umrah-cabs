import fs from 'fs';

let css = fs.readFileSync('src/styles/homepage-reference.css', 'utf8');

// Replace the responsive queries section at the bottom
const responsiveIndex = css.indexOf('@media (max-width: 1024px)');
if (responsiveIndex !== -1) {
  css = css.substring(0, responsiveIndex);
}

const refinedResponsive = `
/* ─────────────────────────────────────────────────────────────
   RESPONSIVE QUERIES (Mobile & Tablet Precision)
────────────────────────────────────────────────────────────── */
@media (max-width: 1180px) {
  .ref-dock-fields {
    flex-wrap: wrap;
  }
  .ref-dock-field {
    flex: 1 1 calc(50% - 8px);
  }
  .ref-dock-submit {
    flex: 1 1 100%;
  }
  .ref-fleet-cards-row {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .ref-trust-grid {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 12px;
  }
  .ref-fleet-wrapper,
  .ref-routes-wrapper,
  .ref-reviews-wrapper {
    flex-direction: column !important;
    text-align: center;
  }
  .ref-fleet-header,
  .ref-routes-header,
  .ref-reviews-header {
    text-align: center !important;
    flex: auto;
    margin-bottom: 24px;
  }
  .ref-fleet-cards-row {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
  }
  .ref-routes-cards-row {
    grid-template-columns: 1fr;
    width: 100%;
  }
  .ref-reviews-cards-row {
    grid-template-columns: 1fr;
    width: 100%;
  }
  .ref-concierge-banner {
    padding: 32px 24px;
    height: auto;
    min-height: 240px;
    justify-content: center !important;
  }
  .ref-concierge-content {
    text-align: center !important;
    margin: 0 auto;
  }
}

@media (max-width: 640px) {
  .ref-hero {
    min-height: auto;
    padding-top: 86px;
    padding-bottom: 30px;
  }
  .ref-hero-copy {
    text-align: center !important;
    margin: 0 auto;
    padding: 0 8px;
  }
  .ref-eyebrow {
    justify-content: center !important;
  }
  .ref-hero h1 {
    font-size: 26px;
    line-height: 1.35;
  }
  .ref-hero-copy > p {
    font-size: 13px;
    line-height: 1.7;
    margin: 0 auto;
  }
  .ref-booking-wrap {
    width: calc(100% - 24px);
    margin: 20px auto 0;
  }
  .ref-dock-fields {
    flex-direction: column;
    gap: 8px;
  }
  .ref-dock-field {
    width: 100%;
    flex: 1 1 100%;
    padding: 8px 12px;
  }
  .ref-dock-submit {
    width: 100%;
    height: 50px;
    font-size: 14px;
  }
  .ref-trust-strip {
    padding: 16px 0;
  }
  .ref-trust-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  .ref-trust-item {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 10px 8px;
    justify-content: flex-start;
    gap: 8px;
  }
  .ref-trust-item:last-child {
    grid-column: span 2;
    justify-content: center;
  }
  .ref-trust-text {
    font-size: 11px;
    white-space: normal;
  }
  .ref-fleet-cards-row {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .ref-concierge-banner {
    padding: 24px 16px;
  }
}
`;

css += refinedResponsive;
fs.writeFileSync('src/styles/homepage-reference.css', css, 'utf8');
console.log('Appended refined responsive CSS to src/styles/homepage-reference.css');
