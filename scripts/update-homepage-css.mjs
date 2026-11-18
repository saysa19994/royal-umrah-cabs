import fs from 'fs';

const cssContent = `/* ==========================================================================
   DUYUF ALRAHMAN VIP - LUXURY HOMEPAGE MASTER STYLESHEET
   Accurately matching reference mockup (media_1793826774223_515d2c63.jpg)
   ========================================================================== */

:root {
  --ref-midnight: #090D15;
  --ref-surface: #101725;
  --ref-elevated: #141D2C;
  --ref-gold: #D6A13A;
  --ref-gold-hover: #E5B14B;
  --ref-gold-dark: #A97B27;
  --ref-gold-line: rgba(214, 161, 58, 0.3);
  --ref-sandstone: #F7F5F0;
  --ref-warm-white: #F6F3ED;
  --ref-silver: #AEB7C4;
}

.ref-homepage {
  color: #fff;
  background: var(--ref-midnight);
  width: 100%;
  overflow-x: hidden;
  font-family: inherit;
}

.ref-page-shell {
  width: min(1320px, calc(100% - 48px));
  margin-inline: auto;
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
────────────────────────────────────────────────────────────── */
.ref-hero {
  min-height: 680px;
  position: relative;
  color: #fff;
  background: var(--ref-midnight);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  isolation: isolate;
  padding-top: 100px;
  padding-bottom: 70px;
}

.ref-hero-image {
  position: absolute;
  inset: 0;
  z-index: -3;
  background-image: url('/assets/images/reference/hero-gmc-saudi.jpg');
  background-position: center 46%;
  background-size: cover;
}

.ref-hero-shade {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(180deg, rgba(9, 13, 21, 0.4) 0%, rgba(9, 13, 21, 0.85) 80%, #090D15 100%),
    radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2), rgba(9, 13, 21, 0.75));
}

[dir="rtl"] .ref-hero-shade {
  background:
    linear-gradient(270deg, rgba(9, 13, 21, 0.3) 0%, rgba(9, 13, 21, 0.75) 50%, #090D15 100%),
    linear-gradient(180deg, transparent 60%, #090D15 100%);
}

[dir="ltr"] .ref-hero-shade {
  background:
    linear-gradient(90deg, rgba(9, 13, 21, 0.3) 0%, rgba(9, 13, 21, 0.75) 50%, #090D15 100%),
    linear-gradient(180deg, transparent 60%, #090D15 100%);
}

.ref-hero-content {
  display: flex;
  align-items: center;
  padding-top: 20px;
  width: 100%;
}

[dir="rtl"] .ref-hero-content {
  justify-content: flex-start;
}

[dir="ltr"] .ref-hero-content {
  justify-content: flex-start;
}

.ref-hero-copy {
  max-width: 580px;
}

[dir="rtl"] .ref-hero-copy {
  text-align: right;
}

[dir="ltr"] .ref-hero-copy {
  text-align: left;
}

.ref-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ref-gold);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

[dir="rtl"] .ref-eyebrow {
  justify-content: flex-start;
}

[dir="ltr"] .ref-eyebrow {
  justify-content: flex-start;
}

.ref-eyebrow-line {
  width: 32px;
  height: 1px;
  background: var(--ref-gold);
  opacity: 0.7;
}

.ref-hero h1 {
  font-size: clamp(32px, 3.8vw, 54px);
  line-height: 1.3;
  font-weight: 700;
  margin: 0 0 16px;
  color: #fff;
}

.ref-hero h1 span.gold {
  color: var(--ref-gold);
}

.ref-hero-copy > p {
  max-width: 500px;
  margin: 0;
  color: #c9d2dc;
  font-size: 14px;
  line-height: 1.9;
}

/* ─────────────────────────────────────────────────────────────
   FLOATING BOOKING CONSOLE (Single Sleek Dock from Mockup)
────────────────────────────────────────────────────────────── */
.ref-booking-wrap {
  width: min(1320px, calc(100% - 48px));
  margin: 40px auto 0;
  position: relative;
  z-index: 10;
}

.ref-booking-dock {
  background: rgba(16, 23, 37, 0.94);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(214, 161, 58, 0.35);
  border-radius: 10px;
  padding: 10px 14px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), 0 0 25px rgba(214, 161, 58, 0.12);
}

.ref-dock-fields {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.ref-dock-field {
  flex: 1;
  min-width: 0;
  background: rgba(20, 29, 44, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: border-color 0.2s;
}

.ref-dock-field:focus-within {
  border-color: var(--ref-gold);
}

.ref-dock-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--ref-gold);
  font-weight: 600;
  margin-bottom: 2px;
}

.ref-dock-field select,
.ref-dock-field input {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  outline: none;
  width: 100%;
  padding: 0;
  cursor: pointer;
}

.ref-dock-field select option {
  background: var(--ref-surface);
  color: #fff;
}

.ref-dock-submit {
  min-height: 48px;
  height: 48px;
  padding: 0 22px;
  background: var(--ref-gold);
  color: #090D15;
  font-size: 13px;
  font-weight: 700;
  border-radius: 6px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(214, 161, 58, 0.35);
}

.ref-dock-submit:hover {
  background: var(--ref-gold-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(214, 161, 58, 0.45);
}

.ref-booking-feedback {
  margin: 6px 4px 0;
  font-size: 11px;
  color: #fca5a5;
}

/* ─────────────────────────────────────────────────────────────
   TRUST / ADVANTAGES STRIP
────────────────────────────────────────────────────────────── */
.ref-trust-strip {
  background: var(--ref-midnight);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 24px 0;
}

.ref-trust-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
}

.ref-trust-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 6px 16px;
  border-inline-start: 1px solid rgba(255, 255, 255, 0.1);
}

.ref-trust-item:first-child {
  border-inline-start: none;
}

.ref-trust-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ref-trust-text {
  font-size: 12px;
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
}

/* ─────────────────────────────────────────────────────────────
   FLEET SHOWCASE (Deep Midnight Navy with 5 Dark Luxury Cards)
────────────────────────────────────────────────────────────── */
.ref-fleet-section {
  background: linear-gradient(180deg, var(--ref-midnight) 0%, #0d131f 100%);
  padding: 70px 0;
}

.ref-fleet-wrapper {
  display: flex;
  align-items: center;
  gap: 32px;
}

[dir="rtl"] .ref-fleet-wrapper {
  flex-direction: row-reverse;
}

[dir="ltr"] .ref-fleet-wrapper {
  flex-direction: row;
}

.ref-fleet-header {
  flex: 0 0 240px;
}

[dir="rtl"] .ref-fleet-header {
  text-align: right;
}

[dir="ltr"] .ref-fleet-header {
  text-align: left;
}

.ref-section-kicker {
  color: var(--ref-gold);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: block;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.ref-fleet-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  line-height: 1.35;
  margin: 0 0 8px;
}

.ref-fleet-header p {
  font-size: 12px;
  color: #8c97a5;
  line-height: 1.6;
  margin: 0 0 16px;
}

.ref-fleet-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.ref-fleet-btn:hover {
  border-color: var(--ref-gold);
  color: var(--ref-gold);
}

.ref-fleet-cards-row {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.ref-vehicle-card-luxury {
  background: var(--ref-surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px 10px 14px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  position: relative;
}

.ref-vehicle-card-luxury:hover {
  border-color: rgba(214, 161, 58, 0.45);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45), 0 0 18px rgba(214, 161, 58, 0.15);
  transform: translateY(-4px);
}

.ref-vehicle-img-wrap {
  height: 110px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background: radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.06), transparent 70%);
}

.ref-vehicle-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: center;
}

.ref-vehicle-content h3 {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 6px;
  white-space: nowrap;
}

.ref-vehicle-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 10px;
  color: #b0bac5;
  margin-bottom: 6px;
}

.ref-vehicle-badges b {
  color: #fff;
}

.ref-vehicle-desc {
  font-size: 10px;
  color: #8c97a5;
  margin: 0 0 10px;
  line-height: 1.4;
  white-space: nowrap;
}

.ref-vehicle-book-pill {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
  font-size: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.ref-vehicle-book-pill:hover {
  background: var(--ref-gold);
  border-color: var(--ref-gold);
  color: #090D15;
}

/* ─────────────────────────────────────────────────────────────
   POPULAR ROUTES (Warm Sandstone Band matching Mockup)
────────────────────────────────────────────────────────────── */
.ref-routes-section {
  background: var(--ref-sandstone);
  color: #172332;
  padding: 64px 0;
}

.ref-routes-wrapper {
  display: flex;
  align-items: center;
  gap: 32px;
}

[dir="rtl"] .ref-routes-wrapper {
  flex-direction: row-reverse;
}

[dir="ltr"] .ref-routes-wrapper {
  flex-direction: row;
}

.ref-routes-header {
  flex: 0 0 240px;
}

[dir="rtl"] .ref-routes-header {
  text-align: right;
}

[dir="ltr"] .ref-routes-header {
  text-align: left;
}

.ref-routes-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #172332;
  margin: 0 0 8px;
}

.ref-routes-header p {
  font-size: 12px;
  color: #64748b;
  margin: 0 0 16px;
  line-height: 1.6;
}

.ref-routes-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  color: #1e293b;
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.ref-routes-btn:hover {
  border-color: #0f172a;
  color: #0f172a;
}

.ref-routes-cards-row {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.ref-route-card-mockup {
  height: 220px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  color: #fff;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.ref-route-card-mockup:hover {
  transform: translateY(-4px);
}

.ref-route-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
  z-index: 1;
}

.ref-route-badge-float {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  width: 26px;
  height: 26px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.ref-route-info {
  position: relative;
  z-index: 2;
  text-align: center;
}

.ref-route-info h3 {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 6px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.ref-route-fare-pill {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 9999px;
  background: rgba(16, 23, 37, 0.85);
  border: 1px solid rgba(214, 161, 58, 0.4);
  color: var(--ref-gold);
  font-size: 11px;
  font-weight: 700;
}

/* ─────────────────────────────────────────────────────────────
   ROYAL CONCIERGE BANNER
────────────────────────────────────────────────────────────── */
.ref-concierge-section {
  background: var(--ref-midnight);
  padding: 50px 0;
}

.ref-concierge-banner {
  height: 260px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(214, 161, 58, 0.3);
  display: flex;
  align-items: center;
  padding: 0 48px;
}

[dir="rtl"] .ref-concierge-banner {
  justify-content: flex-end;
}

[dir="ltr"] .ref-concierge-banner {
  justify-content: flex-start;
}

.ref-concierge-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(270deg, rgba(9, 13, 21, 0.95) 0%, rgba(9, 13, 21, 0.75) 45%, rgba(9, 13, 21, 0.2) 100%),
    radial-gradient(circle at 80% 50%, rgba(214, 161, 58, 0.12), transparent 50%);
  z-index: 1;
}

[dir="ltr"] .ref-concierge-overlay {
  background:
    linear-gradient(90deg, rgba(9, 13, 21, 0.95) 0%, rgba(9, 13, 21, 0.75) 45%, rgba(9, 13, 21, 0.2) 100%),
    radial-gradient(circle at 20% 50%, rgba(214, 161, 58, 0.12), transparent 50%);
}

.ref-concierge-content {
  position: relative;
  z-index: 2;
  max-width: 440px;
}

[dir="rtl"] .ref-concierge-content {
  text-align: right;
}

[dir="ltr"] .ref-concierge-content {
  text-align: left;
}

.ref-concierge-content h2 {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
  line-height: 1.35;
}

.ref-concierge-content p {
  font-size: 12px;
  color: #cbd5e1;
  margin: 0 0 16px;
  line-height: 1.6;
}

.ref-concierge-whatsapp-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 9999px;
  background: rgba(214, 161, 58, 0.18);
  border: 1px solid var(--ref-gold);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.ref-concierge-whatsapp-btn:hover {
  background: var(--ref-gold);
  color: #090D15;
}

/* ─────────────────────────────────────────────────────────────
   CUSTOMER REVIEWS (Warm Sandstone Band matching Mockup)
────────────────────────────────────────────────────────────── */
.ref-reviews-section {
  background: var(--ref-sandstone);
  color: #172332;
  padding: 60px 0;
}

.ref-reviews-wrapper {
  display: flex;
  align-items: center;
  gap: 32px;
}

[dir="rtl"] .ref-reviews-wrapper {
  flex-direction: row-reverse;
}

[dir="ltr"] .ref-reviews-wrapper {
  flex-direction: row;
}

.ref-reviews-header {
  flex: 0 0 200px;
}

[dir="rtl"] .ref-reviews-header {
  text-align: right;
}

[dir="ltr"] .ref-reviews-header {
  text-align: left;
}

.ref-reviews-header h2 {
  font-size: 22px;
  font-weight: 700;
  color: #172332;
  margin: 0 0 6px;
}

.ref-reviews-header p {
  font-size: 11px;
  color: #64748b;
  margin: 0;
}

.ref-reviews-cards-row {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.ref-review-card-mockup {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px 18px 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.ref-review-quote-gold {
  color: var(--ref-gold);
  font-size: 28px;
  line-height: 1;
  font-family: serif;
  margin-bottom: 6px;
}

.ref-review-body {
  font-size: 12px;
  color: #334155;
  line-height: 1.7;
  margin: 0 0 16px;
  flex: 1;
  font-weight: 500;
}

.ref-review-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ref-review-avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid var(--ref-gold);
}

.ref-review-profile strong {
  font-size: 12px;
  color: #0f172a;
}

/* ─────────────────────────────────────────────────────────────
   PRE-FOOTER CTA BANNER (Cinematic Highway SUV Banner)
────────────────────────────────────────────────────────────── */
.ref-final-banner {
  height: 240px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ref-final-banner-overlay {
  position: absolute;
  inset: 0;
  background: rgba(9, 13, 21, 0.65);
  z-index: 1;
}

.ref-final-banner-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.ref-final-banner-content h2 {
  font-size: clamp(20px, 2.6vw, 32px);
  font-weight: 700;
  color: #fff;
  margin: 0 0 18px;
}

.ref-final-gold-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 28px;
  border-radius: 9999px;
  background: var(--ref-gold);
  color: #090D15;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(214, 161, 58, 0.35);
  transition: all 0.2s ease;
}

.ref-final-gold-btn:hover {
  background: var(--ref-gold-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(214, 161, 58, 0.5);
}

/* ─────────────────────────────────────────────────────────────
   RESPONSIVE QUERIES
────────────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .ref-dock-fields {
    flex-wrap: wrap;
  }
  .ref-dock-field {
    flex: 1 1 calc(50% - 8px);
  }
  .ref-dock-submit {
    flex: 1 1 100%;
  }
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
  }
  .ref-fleet-cards-row {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .ref-hero {
    min-height: auto;
    padding-top: 80px;
    padding-bottom: 40px;
  }
  .ref-dock-field {
    flex: 1 1 100%;
  }
  .ref-trust-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .ref-trust-item {
    border-inline-start: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 8px 0;
  }
  .ref-fleet-cards-row {
    grid-template-columns: 1fr;
  }
  .ref-routes-cards-row {
    grid-template-columns: 1fr;
  }
  .ref-reviews-cards-row {
    grid-template-columns: 1fr;
  }
  .ref-concierge-banner {
    padding: 24px;
    height: auto;
    min-height: 240px;
  }
}
`;

fs.writeFileSync('src/styles/homepage-reference.css', cssContent, 'utf8');
console.log('Successfully updated src/styles/homepage-reference.css');
