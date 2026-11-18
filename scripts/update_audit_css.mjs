import fs from 'fs';

const cssPath = 'd:/royal-umrah-cabs/src/styles/homepage-v3.css';
let css = fs.readFileSync(cssPath, 'utf8').replace(/\r\n/g, '\n');

const additionalRules = `
    /* ================================================================ */
    /* AUDIT REFINEMENTS: TABLET 768PX & COLOR CONTRAST (WCAG AAA)      */
    /* ================================================================ */

    /* Tablet 768px clean 2-column booking layout */
    @media (min-width: 641px) and (max-width: 900px) {
      .booking-shell {
        max-width: 720px;
        margin: -20px auto 0;
        padding-top: 14px;
        position: relative;
        z-index: 10;
      }
      .booking-panel {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 12px !important;
        padding: 22px 20px !important;
        border-radius: 14px !important;
        background: #FFFFFF !important;
        border: 1px solid var(--line) !important;
        box-shadow: 0 12px 36px rgba(16,24,39,0.09) !important;
      }
      .booking-panel .field {
        padding: 10px 14px !important;
        border: 1px solid #E5E1D8 !important;
        border-radius: 9px !important;
        background: #FDFCF9 !important;
        border-inline-end: 1px solid #E5E1D8 !important;
      }
      .booking-panel .field:nth-child(1) { grid-column: 1 !important; }
      .booking-panel .field:nth-child(2) { grid-column: 2 !important; }
      .booking-panel .field:nth-child(3) { grid-column: 1 !important; }
      .booking-panel .field:nth-child(4) { grid-column: 2 !important; }
      .booking-panel .field:nth-child(5) { grid-column: 1 / -1 !important; }
      .booking-panel .field label {
        font-size: 11px !important;
        color: #555E6D !important;
        margin-bottom: 4px !important;
      }
      .booking-panel .field select,
      .booking-panel .field input {
        font-size: 14px !important;
        color: #101827 !important;
        font-weight: 600 !important;
      }
      .booking-submit {
        grid-column: 1 / -1 !important;
        width: 100% !important;
        height: 52px !important;
        font-size: 15px !important;
        font-weight: 700 !important;
        margin-top: 4px !important;
        border-radius: 9px !important;
      }
      .booking-assurance {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        gap: 12px !important;
        padding: 14px 4px 0 !important;
        font-size: 11px !important;
        color: #555E6D !important;
      }
      .booking-assurance strong {
        color: #101827 !important;
      }
    }

    /* WCAG AAA Accessible Contrast for Dark Navy Service Card */
    .service-card--photo {
      color: #FFFFFF !important;
      border: 0 !important;
      background: #101827 !important;
    }
    .service-card--photo:before {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      background: linear-gradient(0deg, rgba(16,24,39,0.96) 0%, rgba(16,24,39,0.82) 55%, rgba(16,24,39,0.45) 100%) !important;
      z-index: 0 !important;
    }
    .service-card--photo h3 {
      color: #FFFFFF !important;
      text-shadow: 0 2px 10px rgba(0,0,0,0.6) !important;
    }
    .service-card--photo p {
      color: #F7F5F0 !important;
      font-weight: 400 !important;
    }
    .service-card--photo .service-number {
      color: #E5C378 !important;
      font-weight: 700 !important;
    }
    .service-card--photo .text-link {
      color: #F2D288 !important;
      font-weight: 600 !important;
      text-decoration: underline !important;
      text-underline-offset: 4px !important;
    }
    .service-card--photo .text-link:hover {
      color: #FFFFFF !important;
    }

    /* WCAG AAA Contrast in Final CTA Section */
    .final-cta {
      background: #101827 !important;
      color: #FFFFFF !important;
    }
    .final-cta .eyebrow {
      color: #E5C378 !important;
      font-weight: 700 !important;
      letter-spacing: 0.16em !important;
      text-shadow: 0 1px 4px rgba(0,0,0,0.4) !important;
    }
    .final-cta h2 {
      color: #FFFFFF !important;
    }
    .final-cta p {
      color: #E2E8F0 !important;
    }
`;

css += additionalRules;
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated homepage-v3.css with tablet layout and contrast rules');
