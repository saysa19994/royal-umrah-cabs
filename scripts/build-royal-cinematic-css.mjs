import fs from 'fs';

const cssCode = `/* ==========================================================================
   ROYAL CINEMATIC LUXURY — MASTER HOMEPAGE DESIGN
   Midnight Navy (#090D15) • Royal Navy (#101725) • Champagne Gold (#D6A13A)
   Warm Sandstone (#F7F5F0) Selective Contrast
   ========================================================================== */

:root {
  --rc-midnight: #090D15;
  --rc-surface: #101725;
  --rc-elevated: #141D2C;
  --rc-gold: #D6A13A;
  --rc-gold-light: #F3E5AB;
  --rc-gold-hover: #E5B14B;
  --rc-gold-dark: #A97B27;
  --rc-gold-glow: rgba(214, 161, 58, 0.35);
  --rc-sandstone: #F7F5F0;
  --rc-sandstone-card: #FFFFFF;
  --rc-sandstone-border: #E8E2D5;
  --rc-silver: #AEB7C4;
  --rc-border-dark: rgba(255, 255, 255, 0.08);
}

.royal-cinematic-page {
  background: var(--rc-midnight);
  color: #fff;
  width: 100%;
  overflow-x: hidden;
  font-family: inherit;
}

.rc-container {
  width: min(1320px, calc(100% - 48px));
  margin-inline: auto;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 01: IMMERSIVE TWILIGHT HERO
────────────────────────────────────────────────────────────── */
.rc-hero {
  min-height: 740px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 110px;
  padding-bottom: 50px;
  isolation: isolate;
  background: var(--rc-midnight);
}

.rc-hero-bg-wrap {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
}

.rc-hero-vignette {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(9, 13, 21, 0.45) 0%, rgba(9, 13, 21, 0.75) 60%, #090D15 100%),
    radial-gradient(ellipse at 50% 30%, rgba(0, 0, 0, 0.1) 0%, rgba(9, 13, 21, 0.85) 85%);
}

[dir="rtl"] .rc-hero-vignette {
  background:
    linear-gradient(270deg, rgba(9, 13, 21, 0.35) 0%, rgba(9, 13, 21, 0.8) 55%, #090D15 100%),
    linear-gradient(180deg, transparent 50%, #090D15 100%);
}

[dir="ltr"] .rc-hero-vignette {
  background:
    linear-gradient(90deg, rgba(9, 13, 21, 0.35) 0%, rgba(9, 13, 21, 0.8) 55%, #090D15 100%),
    linear-gradient(180deg, transparent 50%, #090D15 100%);
}

.rc-hero-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.rc-hero-text {
  max-width: 680px;
  padding-top: 20px;
}

[dir="rtl"] .rc-hero-text {
  text-align: right;
  margin-inline-start: 0;
}

[dir="ltr"] .rc-hero-text {
  text-align: left;
  margin-inline-end: 0;
}

.rc-gold-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--rc-gold);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 18px;
}

.rc-gem-line {
  width: 32px;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, var(--rc-gold), transparent);
}

.rc-hero-h1 {
  font-size: clamp(34px, 4.4vw, 58px);
  line-height: 1.25;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  margin: 0 0 18px;
  display: flex;
  flex-direction: column;
}

.rc-h1-gold {
  color: var(--rc-gold);
  background: linear-gradient(135deg, #FBF2D5 0%, #D6A13A 60%, #A97B27 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.rc-hero-sub {
  font-size: 15px;
  line-height: 1.9;
  color: #cad3dd;
  max-width: 580px;
  margin: 0;
}

/* RESERVATION DOCK */
.rc-reservation-dock {
  width: 100%;
  margin-top: 50px;
  position: relative;
  z-index: 10;
}

.rc-dock-form {
  background: rgba(16, 23, 37, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(214, 161, 58, 0.4);
  border-radius: 12px;
  padding: 14px 18px 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55), 0 0 30px rgba(214, 161, 58, 0.15);
}

.rc-dock-grid {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rc-dock-cell {
  flex: 1;
  min-width: 0;
  background: rgba(20, 29, 44, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s;
}

.rc-dock-cell:focus-within {
  border-color: var(--rc-gold);
  box-shadow: 0 0 0 1px rgba(214, 161, 58, 0.3);
}

.rc-cell-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--rc-gold);
  margin-bottom: 3px;
}

.rc-dock-cell select,
.rc-dock-cell input {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  outline: none;
  width: 100%;
  cursor: pointer;
  padding: 0;
}

.rc-dock-cell select option {
  background: var(--rc-surface);
  color: #fff;
}

.rc-dock-action {
  flex-shrink: 0;
}

.rc-btn-gold {
  min-height: 52px;
  height: 52px;
  padding: 0 26px;
  background: linear-gradient(135deg, #E5B14B 0%, #D6A13A 50%, #A97B27 100%);
  color: #090D15;
  font-size: 14px;
  font-weight: 800;
  border-radius: 8px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 18px rgba(214, 161, 58, 0.4);
  transition: all 0.25s ease;
  text-decoration: none;
}

.rc-btn-gold:hover {
  background: linear-gradient(135deg, #FBF2D5 0%, #E5B14B 50%, #D6A13A 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(214, 161, 58, 0.55);
}

.rc-btn-lg {
  min-height: 48px;
  height: 48px;
  padding: 0 24px;
}

.rc-btn-xl {
  min-height: 54px;
  height: 54px;
  padding: 0 36px;
  font-size: 15px;
  border-radius: 9999px;
}

.rc-dock-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #cad3dd;
  font-size: 11px;
  font-weight: 500;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.rc-feedback-alert {
  margin: 6px 0 0;
  font-size: 12px;
  color: #f87171;
  text-align: center;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 02: THE ROYAL STANDARDS STRIP
────────────────────────────────────────────────────────────── */
.rc-standards-strip {
  background: var(--rc-midnight);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 24px 0;
}

.rc-standards-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
}

.rc-standard-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 6px 16px;
  border-inline-start: 1px solid rgba(255, 255, 255, 0.12);
}

.rc-standard-item:first-child {
  border-inline-start: none;
}

.rc-standard-text {
  font-size: 12px;
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 03: THE FLEET SHOWROOM (CONFIGURATOR)
────────────────────────────────────────────────────────────── */
.rc-fleet-showroom {
  background: linear-gradient(180deg, var(--rc-midnight) 0%, #0d1422 100%);
  padding: 85px 0;
}

.rc-section-header {
  margin-bottom: 36px;
}

.rc-center {
  text-align: center;
}

.rc-kicker {
  color: var(--rc-gold);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 8px;
}

.rc-kicker-dark {
  color: #A97B27;
}

.rc-kicker-gold {
  color: var(--rc-gold);
}

.rc-h2-light {
  font-size: clamp(26px, 3.2vw, 40px);
  font-weight: 800;
  color: #fff;
  line-height: 1.3;
  margin: 0 0 10px;
}

.rc-p-light {
  font-size: 14px;
  color: #94a3b8;
  max-width: 620px;
  margin-inline: auto;
  line-height: 1.7;
}

/* Showroom Tabs */
.rc-fleet-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.rc-fleet-tab-btn {
  background: rgba(20, 29, 44, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  padding: 10px 22px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rc-fleet-tab-btn:hover {
  color: #fff;
  border-color: rgba(214, 161, 58, 0.4);
}

.rc-tab-active {
  background: rgba(214, 161, 58, 0.15) !important;
  border-color: var(--rc-gold) !important;
  color: var(--rc-gold) !important;
  box-shadow: 0 0 16px rgba(214, 161, 58, 0.2);
}

/* Stage */
.rc-showroom-stage {
  background: var(--rc-surface);
  border: 1px solid rgba(214, 161, 58, 0.3);
  border-radius: 14px;
  padding: 36px 40px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
}

.rc-stage-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  align-items: center;
}

.rc-stage-visual {
  position: relative;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  background: #090D15;
}

.rc-stage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.rc-stage-dossier {
  display: flex;
  flex-direction: column;
}

[dir="rtl"] .rc-stage-dossier {
  text-align: right;
}

[dir="ltr"] .rc-stage-dossier {
  text-align: left;
}

.rc-stage-category {
  color: var(--rc-gold);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

.rc-stage-title {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 12px;
}

.rc-stage-desc {
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.8;
  margin: 0 0 24px;
}

.rc-capacity-row {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
}

.rc-cap-box {
  flex: 1;
  background: rgba(20, 29, 44, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.rc-cap-box strong {
  display: block;
  font-size: 15px;
  color: #fff;
}

.rc-cap-box small {
  display: block;
  font-size: 10px;
  color: #94a3b8;
}

.rc-stage-actions {
  display: flex;
  gap: 14px;
  align-items: center;
}

.rc-btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 22px;
  min-height: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.rc-btn-outline:hover {
  border-color: var(--rc-gold);
  color: var(--rc-gold);
}

/* Mini Cards Row */
.rc-fleet-mini-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.rc-mini-card {
  background: rgba(16, 23, 37, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease;
}

.rc-mini-card:hover {
  border-color: rgba(214, 161, 58, 0.4);
  transform: translateY(-3px);
}

.rc-mini-active {
  border-color: var(--rc-gold) !important;
  box-shadow: 0 0 16px rgba(214, 161, 58, 0.25);
}

.rc-mini-img-wrap {
  height: 90px;
  position: relative;
  background: #090D15;
}

.rc-mini-meta {
  padding: 10px 12px;
  text-align: center;
}

.rc-mini-meta h4 {
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
}

.rc-mini-meta span {
  font-size: 10px;
  color: #94a3b8;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 04: PILGRIMAGE CORRIDORS (WARM SANDSTONE CONTRAST)
────────────────────────────────────────────────────────────── */
.rc-corridors-section {
  background: var(--rc-sandstone);
  color: #172332;
  padding: 85px 0;
}

.rc-h2-dark {
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 800;
  color: #172332;
  line-height: 1.3;
  margin: 0 0 10px;
}

.rc-p-dark {
  font-size: 14px;
  color: #64748b;
  max-width: 620px;
  margin-inline: auto;
  line-height: 1.7;
}

.rc-corridors-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 36px;
}

.rc-corridor-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--rc-sandstone-border);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.rc-corridor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14);
}

.rc-card-visual {
  height: 180px;
  position: relative;
}

.rc-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
}

.rc-time-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(9, 13, 21, 0.75);
  backdrop-filter: blur(8px);
  color: #F3E5AB;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  border: 1px solid rgba(214, 161, 58, 0.3);
}

.rc-card-details {
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.rc-card-details h3 {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px;
  line-height: 1.4;
}

.rc-card-fare {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.rc-card-fare small {
  font-size: 11px;
  color: #64748b;
}

.rc-card-fare strong {
  font-size: 18px;
  font-weight: 800;
  color: #A97B27;
}

.rc-corridors-footer {
  text-align: center;
}

.rc-btn-sandstone {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  border-radius: 9999px;
  background: #172332;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.rc-btn-sandstone:hover {
  background: #090D15;
  color: var(--rc-gold);
}

/* ─────────────────────────────────────────────────────────────
   SECTION 05: THE ROYAL CONCIERGE BANNER
────────────────────────────────────────────────────────────── */
.rc-concierge-section {
  background: var(--rc-midnight);
  padding: 80px 0;
}

.rc-concierge-architectural-card {
  position: relative;
  min-height: 340px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(214, 161, 58, 0.35);
  display: flex;
  align-items: center;
  padding: 40px 56px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}

[dir="rtl"] .rc-concierge-architectural-card {
  justify-content: flex-end;
}

[dir="ltr"] .rc-concierge-architectural-card {
  justify-content: flex-start;
}

.rc-concierge-glass-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(270deg, rgba(9, 13, 21, 0.95) 0%, rgba(9, 13, 21, 0.8) 50%, rgba(9, 13, 21, 0.25) 100%),
    radial-gradient(circle at 80% 50%, rgba(214, 161, 58, 0.12), transparent 50%);
  z-index: 1;
}

[dir="ltr"] .rc-concierge-glass-overlay {
  background:
    linear-gradient(90deg, rgba(9, 13, 21, 0.95) 0%, rgba(9, 13, 21, 0.8) 50%, rgba(9, 13, 21, 0.25) 100%),
    radial-gradient(circle at 20% 50%, rgba(214, 161, 58, 0.12), transparent 50%);
}

.rc-concierge-copy {
  position: relative;
  z-index: 2;
  max-width: 520px;
}

[dir="rtl"] .rc-concierge-copy {
  text-align: right;
}

[dir="ltr"] .rc-concierge-copy {
  text-align: left;
}

.rc-concierge-copy h2 {
  font-size: clamp(24px, 2.8vw, 36px);
  font-weight: 800;
  color: #fff;
  line-height: 1.3;
  margin: 0 0 12px;
}

.rc-concierge-copy p {
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.8;
  margin: 0 0 24px;
}

.rc-btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  border-radius: 9999px;
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.2) 0%, rgba(37, 211, 102, 0.4) 100%);
  border: 1px solid #25D366;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.25);
  transition: all 0.25s ease;
}

.rc-btn-whatsapp:hover {
  background: #25D366;
  color: #090D15;
  box-shadow: 0 6px 26px rgba(37, 211, 102, 0.45);
}

/* ─────────────────────────────────────────────────────────────
   SECTION 06: PILLARS OF SAUDI HOSPITALITY
────────────────────────────────────────────────────────────── */
.rc-pillars-section {
  background: var(--rc-sandstone);
  color: #172332;
  padding: 85px 0;
  border-top: 1px solid var(--rc-sandstone-border);
}

.rc-pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.rc-pillar-card {
  background: #fff;
  border-radius: 12px;
  padding: 36px 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--rc-sandstone-border);
}

[dir="rtl"] .rc-pillar-card {
  text-align: right;
}

[dir="ltr"] .rc-pillar-card {
  text-align: left;
}

.rc-pillar-num {
  font-size: 32px;
  font-weight: 800;
  font-family: serif;
  color: #A97B27;
  display: block;
  margin-bottom: 12px;
}

.rc-pillar-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 10px;
}

.rc-pillar-card p {
  font-size: 13px;
  color: #64748b;
  line-height: 1.8;
  margin: 0;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 07: TESTIMONIALS (WARM SANDSTONE)
────────────────────────────────────────────────────────────── */
.rc-testimonials-section {
  background: var(--rc-sandstone);
  color: #172332;
  padding: 85px 0;
  border-top: 1px solid var(--rc-sandstone-border);
}

.rc-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.rc-testimonial-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px 28px 26px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--rc-sandstone-border);
  display: flex;
  flex-direction: column;
}

.rc-quote-mark {
  font-size: 40px;
  line-height: 1;
  color: var(--rc-gold);
  font-family: serif;
  margin-bottom: 8px;
}

.rc-testimonial-quote {
  font-size: 13px;
  line-height: 1.8;
  color: #334155;
  margin: 0 0 20px;
  flex: 1;
  font-weight: 500;
}

.rc-author-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rc-author-avatar {
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid var(--rc-gold);
}

.rc-author-row strong {
  display: block;
  font-size: 13px;
  color: #0f172a;
}

.rc-author-row small {
  display: block;
  font-size: 11px;
  color: #64748b;
}

/* ─────────────────────────────────────────────────────────────
   SECTION 08: PRE-FOOTER HORIZON BANNER
────────────────────────────────────────────────────────────── */
.rc-horizon-banner {
  height: 300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rc-horizon-overlay {
  position: absolute;
  inset: 0;
  background: rgba(9, 13, 21, 0.65);
  z-index: 1;
}

.rc-horizon-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.rc-horizon-content h2 {
  font-size: clamp(22px, 3vw, 36px);
  font-weight: 800;
  color: #fff;
  margin: 0 0 22px;
  letter-spacing: -0.01em;
}

/* ─────────────────────────────────────────────────────────────
   RESPONSIVE DESIGN (DESKTOP, TABLET, MOBILE)
────────────────────────────────────────────────────────────── */
@media (max-width: 1180px) {
  .rc-dock-grid {
    flex-wrap: wrap;
  }
  .rc-dock-cell {
    flex: 1 1 calc(50% - 10px);
  }
  .rc-dock-action {
    flex: 1 1 100%;
  }
  .rc-btn-gold {
    width: 100%;
  }
  .rc-stage-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .rc-stage-visual {
    height: 300px;
  }
  .rc-corridors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 840px) {
  .rc-standards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .rc-standard-item {
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 10px;
    justify-content: flex-start;
  }
  .rc-standard-item:last-child {
    grid-column: span 2;
    justify-content: center;
  }
  .rc-fleet-mini-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .rc-pillars-grid {
    grid-template-columns: 1fr;
  }
  .rc-testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .rc-hero {
    min-height: auto;
    padding-top: 90px;
    padding-bottom: 30px;
  }
  .rc-hero-text {
    text-align: center !important;
    margin: 0 auto;
  }
  .rc-gold-badge {
    justify-content: center;
  }
  .rc-hero-h1 {
    font-size: 26px;
    line-height: 1.35;
  }
  .rc-hero-sub {
    font-size: 13px;
    line-height: 1.7;
    margin: 0 auto;
  }
  .rc-reservation-dock {
    margin-top: 30px;
  }
  .rc-dock-grid {
    flex-direction: column;
    gap: 8px;
  }
  .rc-dock-cell {
    width: 100%;
    flex: 1 1 100%;
  }
  .rc-showroom-stage {
    padding: 20px 16px;
  }
  .rc-stage-visual {
    height: 220px;
  }
  .rc-stage-title {
    font-size: 24px;
  }
  .rc-capacity-row {
    flex-direction: column;
    gap: 8px;
  }
  .rc-stage-actions {
    flex-direction: column;
    width: 100%;
  }
  .rc-stage-actions a {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
  .rc-fleet-mini-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .rc-corridors-grid {
    grid-template-columns: 1fr;
  }
  .rc-concierge-architectural-card {
    padding: 24px 20px;
  }
  .rc-concierge-copy {
    text-align: center !important;
  }
}
`;

fs.writeFileSync('src/styles/homepage-reference.css', cssCode, 'utf8');
console.log('Successfully written new Royal Cinematic CSS to src/styles/homepage-reference.css');
