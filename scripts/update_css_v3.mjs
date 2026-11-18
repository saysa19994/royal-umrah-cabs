import fs from 'fs';

let css = fs.readFileSync('d:/royal-umrah-cabs/src/styles/homepage-v3.css', 'utf8');

// Replace the old fleet section CSS with the new 5-fleet showcase CSS
const oldFleetRegex = /\/\* Fleet \*\/[\s\S]*?\/\* Services \*\//;

const newFleetCSS = `/* 5 Approved Fleet Showcase */
    .fleet-tabs-bar {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 24px;
      scrollbar-width: none;
    }
    .fleet-tabs-bar::-webkit-scrollbar { display: none; }
    .fleet-tab-btn {
      padding: 10px 20px;
      border: 1px solid var(--line);
      border-radius: 9999px;
      background: var(--white);
      color: var(--navy);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }
    .fleet-tab-btn:hover {
      border-color: var(--bronze);
      color: var(--bronze);
    }
    .fleet-tab-btn.is-active {
      background: var(--navy);
      color: #fff;
      border-color: var(--navy);
      box-shadow: 0 4px 14px rgba(16,24,39,0.12);
    }

    /* Desktop Featured Showcase Panel */
    .fleet-featured-panel {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 36px;
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 32px;
      box-shadow: var(--shadow);
      align-items: center;
    }
    .fleet-panel-visual {
      position: relative;
      border-radius: 12px;
      overflow: hidden;
      background: #EAE6DE;
      aspect-ratio: 16/10;
    }
    .fleet-main-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .fleet-photo-toggle {
      position: absolute;
      bottom: 14px;
      inset-inline-start: 14px;
      display: flex;
      gap: 6px;
      background: rgba(16,24,39,0.75);
      backdrop-filter: blur(8px);
      padding: 4px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.15);
      z-index: 2;
    }
    .fleet-photo-toggle .toggle-btn {
      padding: 6px 12px;
      font-size: 11px;
      font-weight: 600;
      color: rgba(255,255,255,0.75);
      background: transparent;
      border: 0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .fleet-photo-toggle .toggle-btn.active {
      background: var(--bronze);
      color: #fff;
    }
    .fleet-cat-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--bronze);
      margin-bottom: 8px;
    }
    .fleet-detail-title {
      font-size: clamp(26px, 2.5vw, 36px);
      line-height: 1.15;
      margin: 0 0 12px;
    }
    .fleet-summary-text {
      color: var(--muted);
      font-size: 14px;
      line-height: 1.65;
      margin: 0 0 20px;
    }
    .fleet-capacity-row {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }
    .cap-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 8px;
      background: #F7F5F0;
      border: 1px solid var(--line);
      font-size: 12px;
      color: var(--navy);
    }
    .cap-pill strong {
      color: var(--navy);
      font-weight: 700;
    }
    .fleet-features-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 16px;
      padding-top: 16px;
      border-top: 1px solid var(--line);
      margin-bottom: 24px;
    }
    .fleet-feat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #374151;
    }
    .fleet-panel-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--line);
    }
    .fleet-price-col .price-label {
      display: block;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      margin-bottom: 2px;
    }
    .fleet-price-col .price-val {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 26px;
      font-weight: 600;
      color: var(--navy);
    }
    .fleet-book-btn {
      white-space: nowrap;
      min-height: 48px;
      padding: 0 24px;
      font-size: 14px;
    }

    /* Mobile 5-Vehicle Horizontal Snap Carousel */
    .fleet-carousel-scroll {
      display: flex;
      gap: 14px;
      overflow-x: auto;
      overflow-y: hidden;
      margin-inline: -18px;
      padding: 4px 18px 16px;
      scroll-snap-type: x mandatory;
      scroll-padding-inline: 18px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .fleet-carousel-scroll::-webkit-scrollbar { display: none; }
    .fleet-mobile-card {
      flex: 0 0 85%;
      max-width: 340px;
      scroll-snap-align: center;
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(16,24,39,0.06);
      transition: border-color 0.2s ease, transform 0.2s ease;
    }
    .fleet-mobile-card.active-card {
      border-color: var(--bronze);
    }
    .mobile-card-img {
      position: relative;
      aspect-ratio: 16/10;
      background: #EAE6DE;
      overflow: hidden;
    }
    .mobile-card-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .mobile-badge {
      position: absolute;
      top: 10px;
      inset-inline-start: 10px;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(16,24,39,0.85);
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      backdrop-filter: blur(6px);
    }
    .mobile-card-body {
      padding: 16px;
    }
    .mobile-veh-title {
      font-size: 18px;
      margin: 0 0 8px;
      font-weight: 600;
    }
    .mobile-veh-specs {
      display: flex;
      align-items: center;
      gap: 14px;
      font-size: 11px;
      color: var(--muted);
      margin-bottom: 14px;
    }
    .mobile-card-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--line);
    }
    .mobile-price {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 19px;
      font-weight: 600;
      color: var(--navy);
    }
    .mobile-book-btn {
      font-size: 12px;
      min-height: 42px;
      padding: 0 16px;
    }
    .fleet-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #D5CEBF;
      border: 0;
      padding: 0;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .fleet-dot.is-active {
      width: 24px;
      border-radius: 4px;
      background: var(--bronze);
    }
    .fleet-all {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-top: 26px;
      padding: 18px 0;
      border-block: 1px solid var(--line);
    }
    .fleet-all p { margin: 0; color: var(--muted); font-size: 13px; }
    .fleet-all strong { color: var(--navy); }
    .fleet-cta { white-space: nowrap; }

    /* Services */`;

css = css.replace(oldFleetRegex, newFleetCSS);

// Desktop RTL Hero Vehicle Visibility Refinement
const rtlHeroRules = `
    /* Desktop Hero Video & Vehicle Visibility */
    @media (min-width: 761px) {
      .hero {
        position: relative;
        min-height: 740px;
        display: flex;
        align-items: center;
        overflow: hidden;
        background: #0D1728;
        color: #fff;
        padding: 130px 0 110px;
      }
      .hero video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: right 54%;
        z-index: 0;
      }
      /* Position hero text on the left in both RTL and LTR so the Mercedes-Maybach / luxury van on the right is 100% visible and unblocked */
      html[dir="rtl"] .hero-content {
        margin-left: 48px !important;
        margin-right: auto !important;
        max-width: 580px;
        text-align: right;
      }
      html[dir="rtl"] .hero-shade {
        background: linear-gradient(90deg, rgba(16,24,39,0.92) 0%, rgba(16,24,39,0.78) 42%, rgba(16,24,39,0.2) 75%, transparent 100%),
                    linear-gradient(0deg, rgba(16,24,39,0.6) 0%, transparent 40%) !important;
      }
      html[dir="ltr"] .hero-content {
        margin-right: auto !important;
        margin-left: 48px !important;
        max-width: 580px;
        text-align: left;
      }
      html[dir="ltr"] .hero-shade {
        background: linear-gradient(90deg, rgba(16,24,39,0.92) 0%, rgba(16,24,39,0.78) 42%, rgba(16,24,39,0.2) 75%, transparent 100%),
                    linear-gradient(0deg, rgba(16,24,39,0.6) 0%, transparent 40%) !important;
      }
      .hero h1 {
        text-shadow: 0 3px 20px rgba(0,0,0,0.75);
      }
      .hero-copy {
        text-shadow: 0 1px 12px rgba(0,0,0,0.8);
      }
    }
`;

css += '\n' + rtlHeroRules;

fs.writeFileSync('d:/royal-umrah-cabs/src/styles/homepage-v3.css', css, 'utf8');
console.log('homepage-v3.css updated successfully!');
