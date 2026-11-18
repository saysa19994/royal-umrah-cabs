import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';

const cssCode = `/* ==========================================================================
   DUYUF AL RAHMAN VIP — MASTER CINEMATIC DESIGN SYSTEM
   Faithful recreation of official master reference mockup
   ========================================================================== */

.rc-master-page {
  background-color: #090D15;
  color: #FFFFFF;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  overflow-x: hidden;
  position: relative;
  width: 100%;
}

.rc-container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 01: HERO SECTION
────────────────────────────────────────────────────────────── */
.rc-hero-section {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 70px;
  background-color: #090D15;
  overflow: hidden;
}

.rc-hero-bg-wrapper {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.rc-hero-bg-image {
  position: absolute;
  right: 0;
  top: 0;
  width: 62%;
  height: 100%;
}

[dir="rtl"] .rc-hero-bg-image {
  right: auto;
  left: 0;
  transform: scaleX(-1);
}

.rc-hero-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #090D15 35%, rgba(9, 13, 21, 0.85) 55%, rgba(9, 13, 21, 0.2) 100%);
}

[dir="rtl"] .rc-hero-vignette {
  background: linear-gradient(-90deg, #090D15 35%, rgba(9, 13, 21, 0.85) 55%, rgba(9, 13, 21, 0.2) 100%);
}

.rc-hero-content-col {
  max-width: 980px;
  position: relative;
  z-index: 10;
}

.rc-hero-headline {
  font-family: var(--font-cinzel), 'Amiri', 'Playfair Display', serif;
  font-size: 52px;
  line-height: 1.15;
  font-weight: 500;
  margin-bottom: 14px;
}

.rc-hero-white {
  color: #FFFFFF;
}

.rc-hero-gold {
  color: #D6A13A;
  background: linear-gradient(135deg, #FFFFFF 0%, #D6A13A 60%, #B88523 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.rc-hero-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.85);
  max-width: 540px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.rc-hero-trust-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 22px;
  margin-bottom: 28px;
}

.rc-trust-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(16, 23, 37, 0.6);
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(214, 161, 58, 0.2);
}

/* Stepper Console Dock */
.rc-stepper-console {
  background: rgba(16, 23, 37, 0.95);
  border: 1px solid rgba(214, 161, 58, 0.35);
  border-radius: 18px;
  padding: 22px 26px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  width: 100%;
}

.rc-console-tag-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.rc-console-tag {
  padding: 3px 14px;
  border: 1px solid rgba(214, 161, 58, 0.5);
  border-radius: 9999px;
  color: #D6A13A;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(214, 161, 58, 0.08);
}

.rc-stepper-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 22px;
}

.rc-step-node {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.rc-step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
}

.rc-step-active .rc-step-num {
  background: #D6A13A;
  color: #090D15;
}

.rc-step-active .rc-step-label {
  color: #D6A13A;
  font-weight: 600;
}

.rc-step-line {
  height: 1px;
  width: 44px;
  background: rgba(255, 255, 255, 0.2);
}

.rc-line-active {
  background: rgba(214, 161, 58, 0.6);
}

.rc-form-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr)) auto;
  gap: 12px;
  align-items: flex-end;
}

.rc-field-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rc-field-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.7);
}

.rc-input-box {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  height: 44px;
  padding: 0 10px;
  transition: all 0.2s;
}

.rc-input-box:hover {
  border-color: rgba(214, 161, 58, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.rc-select, .rc-input {
  width: 100%;
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 500;
  appearance: none;
  outline: none;
  cursor: pointer;
}

.rc-select option {
  background-color: #101725;
  color: #FFFFFF;
}

.rc-chevron {
  position: absolute;
  right: 10px;
  pointer-events: none;
  width: 14px;
  height: 14px;
  color: #D6A13A;
}

[dir="rtl"] .rc-chevron {
  right: auto;
  left: 10px;
}

.rc-btn-search {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 22px;
  background: #D6A13A;
  color: #090D15;
  font-size: 13px;
  font-weight: 700;
  border-radius: 8px;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.rc-btn-search:hover {
  background: #E5B24E;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(214, 161, 58, 0.4);
}

.rc-form-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 14px;
}

.rc-feedback-alert {
  margin-top: 10px;
  font-size: 12px;
  color: #F87171;
  text-align: center;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 02: OUR FLEET ("CHOOSE YOUR CLASS")
────────────────────────────────────────────────────────────── */
.rc-fleet-section {
  padding: 70px 0;
  background-color: #090D15;
}

.rc-section-header-center {
  text-align: center;
  margin-bottom: 36px;
}

.rc-eyebrow-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 10px;
}

.rc-eyebrow-line {
  width: 36px;
  height: 1px;
  background: #D6A13A;
}

.rc-eyebrow-text {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #D6A13A;
}

.rc-h2-light {
  font-family: var(--font-cinzel), 'Amiri', 'Playfair Display', serif;
  font-size: 34px;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 6px;
}

.rc-p-light {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.rc-carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.rc-carousel-nav {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(214, 161, 58, 0.12);
  border: 1px solid #D6A13A;
  color: #D6A13A;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.rc-carousel-nav:hover {
  background: #D6A13A;
  color: #090D15;
}

.rc-fleet-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
  width: 100%;
}

.rc-car-card {
  position: relative;
  background: #101725;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s;
}

.rc-car-card:hover {
  border-color: rgba(214, 161, 58, 0.4);
  transform: translateY(-2px);
}

.rc-card-featured {
  border: 2px solid #D6A13A;
  box-shadow: 0 0 25px rgba(214, 161, 58, 0.25);
  background: #131B2E;
}

.rc-badge-popular {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #D6A13A;
  color: #090D15;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.rc-car-img-wrap {
  width: 100%;
  height: 100px;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rc-car-img {
  max-height: 100%;
  width: auto;
  object-fit: contain;
}

.rc-car-title {
  font-size: 15px;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 4px;
}

.rc-car-specs {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
}

.rc-spec-divider {
  color: rgba(255, 255, 255, 0.3);
}

.rc-car-price {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
}

.rc-price-amount {
  color: #D6A13A;
  font-weight: 700;
  margin-left: 4px;
}

[dir="rtl"] .rc-price-amount {
  margin-left: 0;
  margin-right: 4px;
}

.rc-btn-book-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 12px;
  background: #D6A13A;
  color: #090D15;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
  transition: all 0.2s;
  text-decoration: none;
}

.rc-btn-book-card:hover {
  background: #E5B24E;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 03: PREMIUM TRANSPORTATION SERVICES
────────────────────────────────────────────────────────────── */
.rc-services-section {
  padding: 60px 0;
  background-color: #090D15;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.rc-services-header {
  margin-bottom: 28px;
}

.rc-services-split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: center;
}

.rc-services-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.rc-srv-card {
  background: rgba(16, 23, 37, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.2s;
}

.rc-srv-card:hover {
  border-color: rgba(214, 161, 58, 0.45);
}

.rc-srv-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(214, 161, 58, 0.12);
  border: 1px solid rgba(214, 161, 58, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}

.rc-srv-title {
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 3px;
}

.rc-srv-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.4;
}

.rc-services-visual-wrap {
  position: relative;
  width: 100%;
  height: 290px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.rc-services-visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(9, 13, 21, 0.1) 0%, rgba(9, 13, 21, 0.4) 100%);
}

/* ─────────────────────────────────────────────────────────────
   SECTION 04: POPULAR ROUTES & WHY CHOOSE US (WARM SANDSTONE #F7F4EE)
────────────────────────────────────────────────────────────── */
.rc-sandstone-section {
  padding: 60px 0;
  background-color: #F7F4EE;
  color: #090D15;
}

.rc-sandstone-split-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.85fr;
  gap: 40px;
  align-items: flex-start;
}

.rc-h2-dark {
  font-family: var(--font-cinzel), 'Amiri', 'Playfair Display', serif;
  font-size: 30px;
  font-weight: 600;
  color: #090D15;
  margin-bottom: 4px;
}

.rc-p-dark {
  font-size: 13px;
  color: #555555;
  margin-bottom: 20px;
}

.rc-routes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rc-route-white-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.2s;
  text-decoration: none;
}

.rc-route-white-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.rc-route-thumb {
  position: relative;
  width: 64px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.rc-route-info {
  flex: 1;
}

.rc-route-name {
  font-size: 14px;
  font-weight: 600;
  color: #090D15;
  margin-bottom: 3px;
}

.rc-route-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #777777;
}

.rc-route-fare-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rc-route-fare-val {
  font-size: 14px;
  font-weight: 700;
  color: #D6A13A;
}

.rc-route-arrow-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #D6A13A;
  color: #090D15;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}

.rc-why-col {
  position: relative;
  padding: 8px;
}

.rc-why-watermark {
  position: absolute;
  right: -10px;
  bottom: -20px;
  pointer-events: none;
  opacity: 0.65;
  z-index: 0;
}

[dir="rtl"] .rc-why-watermark {
  right: auto;
  left: -10px;
}

.rc-why-checklist {
  position: relative;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.rc-why-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 500;
  color: #222222;
}

.rc-why-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(214, 161, 58, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 05: FREQUENTLY ASKED QUESTIONS & UMRAH CTA CARD
────────────────────────────────────────────────────────────── */
.rc-faq-section {
  padding: 60px 0;
  background-color: #090D15;
}

.rc-faq-split-grid {
  display: grid;
  grid-template-columns: 1.35fr 0.8fr;
  gap: 36px;
  align-items: flex-start;
}

.rc-faq-accordion-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 18px;
}

.rc-faq-pill {
  background: rgba(16, 23, 37, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 13px 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.rc-faq-pill:hover {
  border-color: rgba(214, 161, 58, 0.4);
}

.rc-faq-pill-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.rc-faq-q {
  font-size: 13px;
  font-weight: 600;
  color: #FFFFFF;
}

.rc-faq-toggle-icon {
  color: #D6A13A;
  flex-shrink: 0;
}

.rc-faq-pill-body {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.rc-umrah-cta-card {
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(214, 161, 58, 0.3);
  display: flex;
  align-items: flex-end;
  padding: 22px;
}

.rc-cta-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(9, 13, 21, 0.25) 0%, rgba(9, 13, 21, 0.9) 85%);
}

.rc-cta-card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.rc-cta-card-title {
  font-family: var(--font-cinzel), 'Amiri', 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 600;
  color: #FFFFFF;
}

.rc-cta-card-sub {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  margin-bottom: 4px;
}

.rc-btn-gold-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 18px;
  background: #D6A13A;
  color: #090D15;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
  width: fit-content;
  text-decoration: none;
  transition: all 0.2s;
}

.rc-btn-gold-cta:hover {
  background: #E5B24E;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 06: FLOATING WHATSAPP BUTTON (MOBILE ONLY)
────────────────────────────────────────────────────────────── */
.rc-floating-whatsapp {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #25D366;
  color: #FFFFFF;
  border-radius: 9999px;
  padding: 9px 16px;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  transition: transform 0.2s;
}

.rc-floating-whatsapp:hover {
  transform: scale(1.04);
}

.rc-wa-icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rc-wa-text {
  font-size: 13px;
  font-weight: 700;
}

/* ─────────────────────────────────────────────────────────────
   RESPONSIVE MEDIA QUERIES (MOBILE 390px & TABLET 768px)
────────────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .rc-hero-headline {
    font-size: 40px;
  }
  .rc-form-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .rc-form-action {
    grid-column: span 3;
  }
  .rc-fleet-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .rc-services-split-grid {
    grid-template-columns: 1fr;
  }
  .rc-sandstone-split-grid {
    grid-template-columns: 1fr;
  }
  .rc-faq-split-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
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
    font-size: 32px;
  }

  .rc-hero-subtitle {
    font-size: 13px;
  }

  .rc-hero-trust-row {
    gap: 10px;
  }

  .rc-trust-badge {
    font-size: 11px;
    padding: 4px 10px;
  }

  .rc-stepper-console {
    padding: 16px;
    border-radius: 14px;
  }

  .rc-stepper-header {
    margin-bottom: 16px;
  }

  .rc-form-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .rc-form-action {
    grid-column: span 1;
  }

  .rc-btn-search {
    width: 100%;
  }

  /* Fleet Carousel Single Card on Mobile */
  .rc-carousel-nav {
    display: none;
  }

  .rc-fleet-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 12px;
    padding-bottom: 10px;
  }

  .rc-car-card {
    min-width: 85%;
    scroll-snap-align: center;
  }

  .rc-carousel-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 14px;
  }

  .rc-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .rc-dot-active {
    background: #D6A13A;
    width: 20px;
    border-radius: 9999px;
  }

  .rc-services-cards-grid {
    grid-template-columns: 1fr;
  }

  .rc-faq-accordion-grid {
    grid-template-columns: 1fr;
  }
}
`;

fs.writeFileSync(path.join(projectRoot, 'src/styles/homepage-reference.css'), cssCode, 'utf8');
console.log('homepage-reference.css written successfully');
`;

const scriptPath = path.join(projectRoot, 'scripts/build-master-mockup-css.mjs');
fs.writeFileSync(scriptPath, cssCode, 'utf8');
