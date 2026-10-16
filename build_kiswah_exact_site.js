const fs = require('fs');

const html = `<!DOCTYPE html>
<html lang="en" dir="ltr" class="scroll-smooth">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"/>
  <title>Royal Umrah Cabs | Premium Umrah Chauffeur &amp; Luxury Pilgrim Transport</title>
  <meta name="description" content="Official luxury Umrah private taxi and chauffeur transport in Makkah, Madinah, and Jeddah Airport (KAIA). Direct licensed operator, fixed transparent rates, Nusuk compliant. 24/7 VIP assistance."/>
  
  <!-- Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🕋</text></svg>"/>

  <!-- Preconnect and Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet"/>

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            bg: '#fdfcf8',
            surface: '#fffefb',
            'surface-alt': '#f5f0e6',
            'surface-sunken': '#f1eadb',
            border: '#eae2d1',
            'border-strong': '#d9ceb6',
            ink: '#15140f',
            'ink-muted': '#726c60',
            body: '#413d35',
            muted: '#726c60',
            gold: '#e2a336',
            'gold-strong': '#c4881f',
            'gold-soft': '#f7e7c4',
            'gold-line': '#ebd8ad',
            'gold-deep': '#b07714',
            charcoal: '#15140f',
            whatsapp: '#25d366',
            'whatsapp-strong': '#1e9e52'
          },
          fontFamily: {
            display: ['Cormorant Garamond', 'Amiri', 'Georgia', 'serif'],
            body: ['Manrope', 'Tajawal', 'ui-sans-serif', 'sans-serif'],
            arabic: ['Tajawal', 'Amiri', 'sans-serif']
          },
          borderRadius: {
            btn: '8px'
          },
          boxShadow: {
            xs: '0 1px 2px rgba(21, 20, 15, 0.04)',
            sm: '0 2px 8px rgba(21, 20, 15, 0.06)',
            md: '0 8px 24px rgba(21, 20, 15, 0.08)',
            lg: '0 16px 48px rgba(21, 20, 15, 0.12)',
            gold: '0 8px 24px rgba(226, 163, 54, 0.22)'
          }
        }
      }
    }
  </script>

  <!-- International SEO and Hreflang -->
  <link rel="canonical" href="https://royal-umrah-cabs.vercel.app/"/>
  <link rel="alternate" hreflang="en" href="https://royal-umrah-cabs.vercel.app/"/>
  <link rel="alternate" hreflang="ar" href="https://royal-umrah-cabs.vercel.app/?lang=ar"/>
  <link rel="alternate" hreflang="ms-MY" href="https://royal-umrah-cabs.vercel.app/?lang=ms"/>
  <link rel="alternate" hreflang="ur" href="https://royal-umrah-cabs.vercel.app/?lang=ur"/>
  <link rel="alternate" hreflang="fr" href="https://royal-umrah-cabs.vercel.app/?lang=fr"/>
  <link rel="alternate" hreflang="x-default" href="https://royal-umrah-cabs.vercel.app/"/>

  <style>
    :root {
      --color-bg: #fdfcf8;
      --color-surface: #fffefb;
      --color-surface-alt: #f5f0e6;
      --color-surface-sunken: #f1eadb;
      --color-border: #eae2d1;
      --color-border-strong: #d9ceb6;
      --font-display: 'Cormorant Garamond', 'Amiri', Georgia, serif;
      --font-body: 'Manrope', 'Tajawal', sans-serif;
      --color-ink: #15140f;
      --color-body: #413d35;
      --color-muted: #726c60;
      --color-gold: #e2a336;
      --color-gold-strong: #c4881f;
      --color-gold-soft: #f7e7c4;
      --color-gold-line: #ebd8ad;
      --color-charcoal: #15140f;
      --color-whatsapp: #25d366;
      --color-whatsapp-strong: #1e9e52;
      --radius-btn: 8px;
    }
    body {
      background-color: var(--color-bg);
      color: var(--color-body);
      font-family: var(--font-body);
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-display);
      color: var(--color-ink);
    }
    .btn-primary, .btn-gold {
      border-radius: var(--radius-btn);
      background-color: var(--color-gold);
      color: var(--color-ink);
      font-weight: 600;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .btn-primary:hover, .btn-gold:hover {
      background-color: var(--color-gold-strong);
      color: #ffffff;
      transform: translateY(-1px);
    }
    .btn-secondary, .btn-outline {
      border-radius: var(--radius-btn);
      border: 1.5px solid var(--color-border-strong);
      color: var(--color-ink);
      background: transparent;
      font-weight: 600;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .btn-secondary:hover, .btn-outline:hover {
      background-color: var(--color-gold-soft);
      border-color: var(--color-gold);
    }
    .btn-whatsapp {
      border-radius: var(--radius-btn);
      background-color: var(--color-whatsapp);
      color: #ffffff;
      font-weight: 600;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .btn-whatsapp:hover {
      background-color: var(--color-whatsapp-strong);
      transform: translateY(-1px);
    }
    .card, .glass-card {
      border-radius: var(--radius-btn);
      border: 1px solid var(--color-border);
      background-color: var(--color-surface);
      box-shadow: 0 2px 8px rgba(21, 20, 15, 0.05);
      transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    }
    .card:hover, .glass-card:hover {
      box-shadow: 0 10px 30px rgba(21, 20, 15, 0.09);
      border-color: var(--color-gold-line);
    }
    .text-gradient-gold {
      background: linear-gradient(135deg, #c4881f 0%, #e2a336 50%, #b07714 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    [dir="rtl"] {
      font-family: 'Tajawal', 'Amiri', sans-serif;
    }
    [dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3 {
      font-family: 'Amiri', 'Tajawal', serif;
    }
    .custom-scroll::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: var(--color-border-strong);
      border-radius: 4px;
    }
  </style>

  <!-- Structured Data (Schema.org) for Google & GEO -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "@id": "https://royal-umrah-cabs.vercel.app/#service",
        "name": "Royal Umrah Cabs - Luxury Pilgrim Transport",
        "serviceType": "Umrah Chauffeur & Private Taxi Service",
        "areaServed": [
          {"@type": "City", "name": "Makkah"},
          {"@type": "City", "name": "Madinah"},
          {"@type": "City", "name": "Jeddah"},
          {"@type": "Country", "name": "Saudi Arabia"},
          {"@type": "Country", "name": "Malaysia"}
        ],
        "provider": {
          "@type": "LocalBusiness",
          "name": "Royal Umrah Cabs",
          "telephone": "+966548707332",
          "priceRange": "$$",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "12480"
          }
        }
      }
    ]
  }
  </script>
</head>
<body class="bg-bg text-body antialiased selection:bg-gold-soft selection:text-ink">

  <!-- TOP TRUST STRIP -->
  <div class="bg-charcoal text-white text-[12px] md:text-[13px] py-2 px-4 border-b border-white/10">
    <div class="container mx-auto flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 text-gold font-medium">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
          <span data-i18n="top_licensed">Licensed Saudi Transport · TGA &amp; Nusuk Authorized</span>
        </span>
        <span class="hidden md:inline text-white/30">|</span>
        <span class="hidden md:inline text-white/80" data-i18n="top_pilgrims">15,000+ Happy Pilgrims Served</span>
      </div>
      <div class="flex items-center gap-4 text-white/90">
        <span class="hidden sm:inline flex items-center gap-1 text-gold">
          ★ 4.9/5 <span class="text-white/60 text-xs">Google &amp; TripAdvisor</span>
        </span>
        <a href="/track-booking.html" class="hover:text-gold transition-colors flex items-center gap-1">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span data-i18n="top_track">Track Booking</span>
        </a>
        <a href="https://wa.me/966548707332" target="_blank" class="hover:text-gold transition-colors flex items-center gap-1 font-semibold text-whatsapp">
          <span>WhatsApp 24/7</span>
        </a>
      </div>
    </div>
  </div>

  <!-- MAIN NAVIGATION -->
  <nav class="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border shadow-xs transition-all duration-150 py-3.5">
    <div class="container mx-auto px-4 flex items-center justify-between">
      <!-- LOGO -->
      <a href="/" class="flex items-center gap-2.5 group">
        <div class="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold-strong font-display font-bold text-xl group-hover:scale-105 transition-transform">
          🕋
        </div>
        <div class="flex flex-col">
          <span class="text-xl md:text-2xl font-display font-bold tracking-wide uppercase text-ink group-hover:text-gold transition-colors leading-tight">
            Royal Umrah
          </span>
          <span class="text-[11px] font-bold text-gold-strong tracking-[0.16em] uppercase leading-none">
            Luxury Transport
          </span>
        </div>
      </a>

      <!-- DESKTOP NAV LINKS -->
      <div class="hidden lg:flex items-center gap-6 font-medium text-[15px] text-body">
        <a href="#how-it-works" class="hover:text-gold transition-colors py-1" data-i18n="nav_steps">How It Works</a>
        <a href="#fleet" class="hover:text-gold transition-colors py-1" data-i18n="nav_fleet">Step Inside</a>
        <a href="#services" class="hover:text-gold transition-colors py-1" data-i18n="nav_services">Services</a>
        <a href="#booking-section" class="hover:text-gold transition-colors py-1 text-gold-strong font-semibold" data-i18n="nav_rates">Rates &amp; Booking</a>
        <a href="#why-us" class="hover:text-gold transition-colors py-1" data-i18n="nav_why">Why Us</a>
        <a href="#reviews" class="hover:text-gold transition-colors py-1" data-i18n="nav_reviews">Reviews</a>
        <a href="#faq" class="hover:text-gold transition-colors py-1" data-i18n="nav_faq">FAQ</a>
      </div>

      <!-- SWITCHERS & CTAs -->
      <div class="flex items-center gap-2.5">
        <!-- CURRENCY SWITCHER -->
        <div class="relative">
          <select id="currency-switcher" onchange="window.appEngine.setCurrency(this.value)" class="h-9 px-2.5 pr-7 text-xs font-semibold rounded-btn border border-border-strong bg-surface text-ink cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold appearance-none">
            <option value="SAR">SAR (ر.س)</option>
            <option value="USD">USD ($)</option>
            <option value="MYR">MYR (RM)</option>
            <option value="GBP">GBP (£)</option>
            <option value="EUR">EUR (€)</option>
            <option value="EGP">EGP (ج.م)</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"></path></svg>
          </div>
        </div>

        <!-- LANGUAGE SWITCHER -->
        <div class="relative">
          <select id="lang-switcher" onchange="window.appEngine.setLanguage(this.value)" class="h-9 px-2.5 pr-7 text-xs font-semibold rounded-btn border border-border-strong bg-surface text-ink cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold appearance-none">
            <option value="en">English</option>
            <option value="ar">العربية</option>
            <option value="ms">B. Melayu</option>
            <option value="ur">اردو</option>
            <option value="fr">Français</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted">
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"></path></svg>
          </div>
        </div>

        <!-- QUICK BOOK BUTTON -->
        <a href="#booking-section" class="hidden sm:inline-flex btn-primary h-9 px-4 text-xs tracking-wider uppercase font-bold" data-i18n="btn_book_now">
          Book Now
        </a>

        <!-- MOBILE MENU BUTTON -->
        <button type="button" onclick="window.appEngine.toggleMobileMenu()" class="lg:hidden p-2 rounded-btn border border-border text-ink hover:bg-surface-alt">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </div>

    <!-- MOBILE DROPDOWN -->
    <div id="mobile-menu" class="hidden lg:hidden px-4 pt-3 pb-4 border-t border-border mt-2 bg-surface">
      <div class="flex flex-col gap-2.5 text-[15px] font-medium">
        <a href="#how-it-works" onclick="window.appEngine.toggleMobileMenu()" class="py-1 hover:text-gold">How It Works</a>
        <a href="#fleet" onclick="window.appEngine.toggleMobileMenu()" class="py-1 hover:text-gold">Step Inside (Fleet)</a>
        <a href="#services" onclick="window.appEngine.toggleMobileMenu()" class="py-1 hover:text-gold">Services</a>
        <a href="#booking-section" onclick="window.appEngine.toggleMobileMenu()" class="py-1 text-gold-strong font-bold">Rates &amp; Booking</a>
        <a href="#why-us" onclick="window.appEngine.toggleMobileMenu()" class="py-1 hover:text-gold">Why Us</a>
        <a href="#reviews" onclick="window.appEngine.toggleMobileMenu()" class="py-1 hover:text-gold">Reviews</a>
        <a href="#faq" onclick="window.appEngine.toggleMobileMenu()" class="py-1 hover:text-gold">FAQ</a>
        <div class="pt-2 border-t border-border flex items-center justify-between">
          <a href="/track-booking.html" class="text-xs text-muted">Track Booking</a>
          <a href="/admin.html" class="text-xs text-muted">Admin Portal</a>
          <a href="/partner.html" class="text-xs text-muted">B2B Agencies</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- SECTION 1: HERO (KISWAH IDENTICAL ARCHITECTURE) -->
  <section class="w-full relative">
    <div class="relative w-full min-h-[540px] sm:min-h-[600px] md:min-h-[680px] lg:h-[840px] flex flex-col justify-end lg:justify-center pt-20 pb-16 lg:pb-32 overflow-hidden">
      <!-- HERO IMAGE & OVERLAYS -->
      <div class="absolute inset-0 w-full h-full">
        <img src="assets/images/yukon_exterior.jpg" alt="Royal Umrah Cabs - Premium Pilgrim Transport" class="w-full h-full object-cover object-[center_25%]"/>
        <div class="absolute inset-0 bg-gradient-to-l rtl:bg-gradient-to-r from-black/85 via-black/55 to-black/40 z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#15140f] via-transparent to-black/30 z-10"></div>
      </div>

      <!-- HERO COPY -->
      <div class="container mx-auto relative z-20 px-4 w-full">
        <div class="w-full lg:w-[58%] max-w-[680px] flex flex-col gap-4 text-start">
          <p class="text-gold font-semibold uppercase tracking-[0.14em] text-[12px] md:text-[13px] flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span data-i18n="hero_eyebrow">Private Umrah &amp; Hajj Transport</span>
          </p>
          <h1 class="font-display font-semibold text-[32px] sm:text-[44px] md:text-[58px] leading-[1.08] text-white tracking-[-0.01em]">
            <span data-i18n="hero_title_1">Premium Umrah Chauffeur &amp;</span><br/>
            <span class="text-gold" data-i18n="hero_title_2">Luxury Pilgrim Transport</span>
          </h1>
          <p class="text-white/85 text-[15px] sm:text-lg leading-relaxed max-w-xl font-light" data-i18n="hero_desc">
            Experience peace of mind with our dedicated private Umrah taxi service across Makkah, Madinah, and Jeddah. Professional drivers, fixed rates, and guaranteed comfort for the Guests of Allah.
          </p>

          <!-- CTAS -->
          <div class="flex flex-row flex-wrap gap-3 mt-3 w-full">
            <a href="#booking-section" class="btn-primary h-12 px-8 text-base font-bold shadow-gold min-w-[180px]" data-i18n="hero_btn_book">
              Book Your Journey
            </a>
            <a href="#fleet" class="btn-outline h-12 px-8 text-base font-semibold text-white border-white/40 hover:bg-white/10 hover:border-white min-w-[160px]" data-i18n="hero_btn_fleet">
              Explore Fleet
            </a>
          </div>

          <!-- TRUST ROW -->
          <div class="flex flex-wrap items-center gap-y-2 gap-x-6 mt-4 text-[13px] md:text-[14px] text-white/90">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
              <span>Licensed Saudi Transport</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>Free Flight Tracking</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span>Fixed Prices, No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FLOATING BOOKING CARD (KISWAH EXACT POSITIONING) -->
    <div id="booking-widget" class="relative z-30 px-4 -mt-20 md:-mt-28 mb-12">
      <div class="container mx-auto">
        <div class="w-full bg-surface rounded-xl shadow-lg p-6 lg:p-8 border border-border">
          <form onsubmit="window.appEngine.handleQuickWidgetSubmit(event)" class="flex flex-col gap-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- PICKUP -->
              <div class="w-full relative">
                <label class="block text-[13px] font-semibold text-muted mb-1.5" data-i18n="widget_pickup">From (Pickup)</label>
                <div class="relative">
                  <select id="quick-pickup" class="w-full h-12 pl-10 pr-4 rounded-btn border border-border-strong bg-surface text-ink font-body text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold appearance-none">
                    <option value="JED_AIRPORT" selected>Jeddah Airport (KAIA)</option>
                    <option value="MAKKAH_HOTEL">Makkah Hotel</option>
                    <option value="MADINAH_HOTEL">Madinah Hotel</option>
                    <option value="MED_AIRPORT">Madinah Airport (MED)</option>
                    <option value="JEDDAH_HOTEL">Jeddah Hotel</option>
                  </select>
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gold">📍</span>
                </div>
              </div>

              <!-- DROPOFF -->
              <div class="w-full relative">
                <label class="block text-[13px] font-semibold text-muted mb-1.5" data-i18n="widget_dropoff">To (Dropoff)</label>
                <div class="relative">
                  <select id="quick-dropoff" class="w-full h-12 pl-10 pr-4 rounded-btn border border-border-strong bg-surface text-ink font-body text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold appearance-none">
                    <option value="MAKKAH_HOTEL" selected>Makkah Hotel</option>
                    <option value="MADINAH_HOTEL">Madinah Hotel</option>
                    <option value="JED_AIRPORT">Jeddah Airport (KAIA)</option>
                    <option value="MED_AIRPORT">Madinah Airport (MED)</option>
                    <option value="JEDDAH_HOTEL">Jeddah Hotel</option>
                  </select>
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gold">🏁</span>
                </div>
              </div>

              <!-- DATE & TIME -->
              <div class="w-full relative">
                <label class="block text-[13px] font-semibold text-muted mb-1.5" data-i18n="widget_date">Date &amp; Time</label>
                <div class="grid grid-cols-2 gap-2">
                  <input type="date" id="quick-date" class="h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink font-body text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold"/>
                  <input type="time" id="quick-time" value="14:00" class="h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink font-body text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold"/>
                </div>
              </div>

              <!-- VEHICLE -->
              <div class="w-full relative">
                <label class="block text-[13px] font-semibold text-muted mb-1.5" data-i18n="widget_vehicle">Vehicle Class</label>
                <div class="relative">
                  <select id="quick-vehicle" class="w-full h-12 pl-10 pr-4 rounded-btn border border-border-strong bg-surface text-ink font-body text-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-gold appearance-none">
                    <option value="STARIA" selected>Hyundai Staria VIP (7 Seats)</option>
                    <option value="YUKON">GMC Yukon XL VIP (7 Seats)</option>
                    <option value="CAMRY">Toyota Camry (4 Seats)</option>
                    <option value="HIACE">Toyota HiAce VIP (10 Seats)</option>
                  </select>
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gold">🚗</span>
                </div>
              </div>
            </div>

            <!-- BUTTON & SUMMARY STRIP -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-border">
              <div class="text-[13px] text-muted flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 font-body">
                <span>✓ Fixed prices</span>
                <span>✓ Pay upon arrival</span>
                <span>✓ Nusuk licensed</span>
                <span>✓ Free flight tracking</span>
              </div>
              <button type="submit" class="btn-primary w-full sm:w-auto h-12 px-8 text-[15px] font-bold shadow-sm" data-i18n="widget_submit">
                Get Prices &amp; Book Now →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 2: TRUST BAR (EXACT KISWAH ARCHITECTURE) -->
  <section class="bg-surface-alt border-y border-border py-6 md:py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 text-ink">
        <!-- STAT 1 -->
        <a href="#reviews" class="flex flex-col items-center sm:items-start text-center sm:text-start group">
          <div class="flex items-center gap-1.5 text-gold text-sm font-bold mb-1">
            <span>★★★★★</span>
            <span class="text-ink font-extrabold text-base">4.9 / 5</span>
          </div>
          <span class="font-semibold text-base md:text-lg group-hover:text-gold-strong transition-colors duration-150" data-i18n="trust_reviews_title">Reviews</span>
          <span class="text-xs md:text-sm text-muted" data-i18n="trust_reviews_sub">Read what pilgrims say</span>
        </a>

        <!-- STAT 2 -->
        <div class="flex flex-col items-center sm:items-start text-center sm:text-start sm:border-s border-border sm:ps-12">
          <span class="text-2xl md:text-3xl font-display font-bold text-gold-strong leading-tight">15,000+</span>
          <span class="text-xs md:text-sm font-medium text-muted uppercase tracking-wider" data-i18n="trust_pilgrims_title">Pilgrims Served Safely</span>
          <span class="text-xs text-muted" data-i18n="trust_pilgrims_sub">Makkah, Madinah &amp; Jeddah</span>
        </div>

        <!-- STAT 3 -->
        <div class="flex flex-col items-center sm:items-start text-center sm:text-start sm:border-s border-border sm:ps-12">
          <div class="flex items-center gap-2.5">
            <svg class="w-7 h-7 text-gold-strong shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
            <div>
              <span class="block font-semibold text-sm md:text-base" data-i18n="trust_nusuk_title">Nusuk &amp; TGA Approved</span>
              <span class="block text-xs md:text-sm text-muted" data-i18n="trust_nusuk_sub">Ministry of Hajj &amp; Umrah</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 3: YOUR JOURNEY IN 3 SIMPLE STEPS -->
  <section id="how-it-works" class="bg-bg overflow-hidden relative border-t border-border py-12 md:py-16 lg:py-20">
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-8 md:mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold-strong text-xs font-bold uppercase tracking-widest border border-gold/20 mb-3">
          <span class="w-2 h-2 rounded-full bg-gold"></span>
          <span data-i18n="steps_tag">Simple &amp; Professional</span>
        </div>
        <h2 class="text-[30px] md:text-5xl font-semibold text-ink leading-tight tracking-tight font-display">
          <span data-i18n="steps_title_1">Your Journey in</span><br/>
          <span class="text-gradient-gold" data-i18n="steps_title_2">3 Simple Steps</span>
        </h2>
        <p class="mt-4 text-ink-muted text-base md:text-lg leading-relaxed font-light" data-i18n="steps_desc">
          Experience the gold standard of Umrah transport. Streamlined for your comfort and peace of mind.
        </p>
      </div>

      <!-- 3 CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative md:px-4">
        <!-- STEP 1 -->
        <div class="card p-6 md:p-8 flex flex-col items-center text-center relative group">
          <div class="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold-strong mb-5 relative">
            <span class="text-2xl">📅</span>
            <div class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center border-2 border-surface">1</div>
          </div>
          <h3 class="text-xl font-semibold text-ink mb-2" data-i18n="step1_title">Search &amp; Schedule</h3>
          <p class="text-ink-muted text-sm leading-relaxed" data-i18n="step1_desc">
            Choose your pickup location, destination, and travel date. Our transparent booking system gives you guaranteed fixed prices.
          </p>
        </div>

        <!-- STEP 2 -->
        <div class="card p-6 md:p-8 flex flex-col items-center text-center relative group">
          <div class="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold-strong mb-5 relative">
            <span class="text-2xl">🚘</span>
            <div class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center border-2 border-surface">2</div>
          </div>
          <h3 class="text-xl font-semibold text-ink mb-2" data-i18n="step2_title">Select VIP Vehicle</h3>
          <p class="text-ink-muted text-sm leading-relaxed" data-i18n="step2_desc">
            Pick from our modern fleet: VIP GMC Yukon XL, Family Hyundai Staria, Toyota Camry, or HiAce. Clear capacity, clean cabins.
          </p>
        </div>

        <!-- STEP 3 -->
        <div class="card p-6 md:p-8 flex flex-col items-center text-center relative group">
          <div class="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold-strong mb-5 relative">
            <span class="text-2xl">📱</span>
            <div class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center border-2 border-surface">3</div>
          </div>
          <h3 class="text-xl font-semibold text-ink mb-2" data-i18n="step3_title">Instant Confirmation</h3>
          <p class="text-ink-muted text-sm leading-relaxed" data-i18n="step3_desc">
            Receive your booking confirmation instantly via WhatsApp with live chauffeur tracking. Pay conveniently upon arrival.
          </p>
        </div>
      </div>

      <div class="mt-8 md:mt-12 text-center">
        <a href="#booking-section" class="btn-primary h-12 px-8 text-base font-bold shadow-sm" data-i18n="steps_btn">
          Book Your Ride Now →
        </a>
        <p class="mt-3 text-xs md:text-sm font-medium text-ink-muted uppercase tracking-wider">
          No Prepayment Required · Pay Upon Arrival
        </p>
      </div>
    </div>
  </section>

  <!-- SECTION 4: STEP INSIDE - INTERIOR SHOWCASE (EXACT KISWAH ARCHITECTURE) -->
  <section id="fleet" class="bg-surface py-12 md:py-16 lg:py-20 border-t border-border">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto mb-8 md:mb-12">
        <p class="text-gold-strong font-semibold uppercase tracking-[0.14em] text-xs md:text-sm mb-2" data-i18n="fleet_eyebrow">The Interior Experience</p>
        <h2 class="text-[30px] md:text-5xl font-semibold text-ink leading-tight font-display" data-i18n="fleet_title">Step Inside</h2>
        <p class="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light" data-i18n="fleet_desc">
          Every journey begins in comfort. Explore the cabin and exterior of each vehicle in our dedicated Umrah fleet.
        </p>
      </div>

      <!-- VEHICLE SELECTION PILLS -->
      <div class="flex items-center justify-center gap-2 flex-wrap mb-8">
        <button type="button" onclick="window.appEngine.showFleet('STARIA')" id="tab-staria" class="px-4 py-2 rounded-btn text-sm font-semibold border border-gold bg-gold text-ink transition-all">
          Hyundai Staria VIP
        </button>
        <button type="button" onclick="window.appEngine.showFleet('YUKON')" id="tab-yukon" class="px-4 py-2 rounded-btn text-sm font-semibold border border-border-strong bg-surface text-ink hover:border-gold transition-all">
          GMC Yukon XL
        </button>
        <button type="button" onclick="window.appEngine.showFleet('CAMRY')" id="tab-camry" class="px-4 py-2 rounded-btn text-sm font-semibold border border-border-strong bg-surface text-ink hover:border-gold transition-all">
          Toyota Camry
        </button>
        <button type="button" onclick="window.appEngine.showFleet('HIACE')" id="tab-hiace" class="px-4 py-2 rounded-btn text-sm font-semibold border border-border-strong bg-surface text-ink hover:border-gold transition-all">
          Toyota HiAce VIP
        </button>
      </div>

      <!-- ACTIVE VEHICLE DISPLAY CARD -->
      <div class="card p-6 lg:p-8 max-w-5xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- PHOTO CONTAINER & TOGGLE -->
          <div class="lg:col-span-7 flex flex-col gap-3">
            <div class="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border shadow-sm bg-black/5">
              <img id="fleet-main-img" src="assets/images/staria_interior.jpg" alt="Hyundai Staria VIP Cabin" class="w-full h-full object-cover transition-opacity duration-300"/>
              <div class="absolute top-3 left-3 bg-charcoal/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-medium" id="fleet-view-badge">
                Interior Cabin View
              </div>
            </div>
            <!-- PHOTO TOGGLES -->
            <div class="flex items-center justify-center gap-3">
              <button type="button" onclick="window.appEngine.toggleFleetView('int')" id="btn-view-int" class="px-3 py-1.5 rounded-btn text-xs font-semibold bg-gold text-ink border border-gold">
                💺 Interior View
              </button>
              <button type="button" onclick="window.appEngine.toggleFleetView('ext')" id="btn-view-ext" class="px-3 py-1.5 rounded-btn text-xs font-semibold bg-surface-alt text-ink border border-border hover:border-gold">
                🚗 Exterior View
              </button>
            </div>
          </div>

          <!-- DETAILS & SPECS -->
          <div class="lg:col-span-5 flex flex-col gap-4 text-start">
            <div>
              <span class="text-gold-strong font-bold uppercase tracking-widest text-xs" id="fleet-category">PREMIUM FAMILY VAN</span>
              <h3 class="text-2xl md:text-3xl font-display font-bold text-ink mt-1" id="fleet-name">Hyundai Staria VIP</h3>
              <p class="text-sm text-ink-muted mt-2 leading-relaxed" id="fleet-desc">
                Space that breathes with you. Spacious panoramic cabin with individual executive reclining seats, dual-zone AC, and generous luggage capacity.
              </p>
            </div>

            <!-- SPECS GRID -->
            <div class="grid grid-cols-2 gap-3 py-3 border-y border-border text-sm">
              <div class="flex items-center gap-2">
                <span class="text-gold">👥</span>
                <span id="fleet-seats">Up to 7 Seats</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gold">🧳</span>
                <span id="fleet-bags">5-6 Large Bags</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gold">📶</span>
                <span>Complimentary WiFi</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gold">❄️</span>
                <span>Chilled Zamzam Water</span>
              </div>
            </div>

            <!-- RATE & QUICK SELECT -->
            <div class="flex items-center justify-between pt-2">
              <div>
                <span class="text-xs text-muted block">Estimated Route Price</span>
                <span class="text-2xl font-display font-bold text-ink" id="fleet-price">SAR 450</span>
              </div>
              <button type="button" onclick="window.appEngine.selectFleetAndScroll()" class="btn-primary h-11 px-6 text-sm font-bold">
                Book This Car
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 5: OUR CORE SERVICES (EXACT KISWAH ARCHITECTURE) -->
  <section id="services" class="py-12 md:py-16 lg:py-20 relative overflow-hidden bg-bg border-t border-border">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-4xl mx-auto mb-8 md:mb-12">
        <span class="text-gold-strong font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 block">Our Core Services</span>
        <h2 class="text-[30px] md:text-5xl font-semibold text-ink tracking-tight font-display">
          Premium Transport for <span class="text-gradient-gold">Your Spiritual Journey</span>
        </h2>
        <p class="mt-3 text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
          Comprehensive travel solutions designed for the Guests of Allah. From airport arrivals to intercity transfers, we ensure every mile is comfortable, safe, and dignified.
        </p>
      </div>

      <!-- 3 SERVICE CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- SERVICE 1: INTERCITY -->
        <article class="card overflow-hidden flex flex-col group">
          <div class="relative h-48 sm:h-56 overflow-hidden">
            <img src="assets/images/yukon_exterior.jpg" alt="Intercity Transport" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-start">
              <p class="text-gold text-xs font-bold uppercase tracking-widest mb-1">Makkah • Madinah • Jeddah</p>
              <h3 class="text-xl md:text-2xl font-display font-bold text-white">Intercity Transport</h3>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-1 text-start">
            <p class="text-ink-muted text-sm leading-relaxed mb-4">
              Direct highway transfer between Makkah, Madinah, and Jeddah. Complimentary stops at historical Miqat stations (Bir Ali / Qarn al-Manazil) for Ihram.
            </p>
            <div class="mt-auto pt-3 border-t border-border flex items-center justify-between">
              <span class="text-xs font-bold text-gold-strong">From SAR 450</span>
              <a href="#booking-section" class="text-ink hover:text-gold text-sm font-semibold flex items-center gap-1">
                Book Intercity →
              </a>
            </div>
          </div>
        </article>

        <!-- SERVICE 2: AIRPORT -->
        <article class="card overflow-hidden flex flex-col group">
          <div class="relative h-48 sm:h-56 overflow-hidden">
            <img src="assets/images/staria_exterior.jpg" alt="Airport Transfers" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-start">
              <p class="text-gold text-xs font-bold uppercase tracking-widest mb-1">Jeddah KAIA • Madinah MED</p>
              <h3 class="text-xl md:text-2xl font-display font-bold text-white">Airport Transport</h3>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-1 text-start">
            <p class="text-ink-muted text-sm leading-relaxed mb-4">
              Seamless terminal pickup with digital nameplate meet &amp; greet, 60 minutes free wait time, flight delay tracking, and luggage assistance.
            </p>
            <div class="mt-auto pt-3 border-t border-border flex items-center justify-between">
              <span class="text-xs font-bold text-gold-strong">From SAR 190</span>
              <a href="#booking-section" class="text-ink hover:text-gold text-sm font-semibold flex items-center gap-1">
                Book Airport →
              </a>
            </div>
          </div>
        </article>

        <!-- SERVICE 3: HOTEL & ZIYARAT -->
        <article class="card overflow-hidden flex flex-col group">
          <div class="relative h-48 sm:h-56 overflow-hidden">
            <img src="assets/images/hiace_exterior.jpg" alt="Hotel & Ziyarat Tours" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-start">
              <p class="text-gold text-xs font-bold uppercase tracking-widest mb-1">Door-to-Door • Holy Sites</p>
              <h3 class="text-xl md:text-2xl font-display font-bold text-white">Ziyarat &amp; Tours</h3>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-1 text-start">
            <p class="text-ink-muted text-sm leading-relaxed mb-4">
              Explore the blessed landmarks of Islam in Makkah (Cave of Hira, Thawr, Mina) and Madinah (Mount Uhud, Quba, Qiblatayn) with knowledgeable chauffeurs.
            </p>
            <div class="mt-auto pt-3 border-t border-border flex items-center justify-between">
              <span class="text-xs font-bold text-gold-strong">From SAR 250</span>
              <a href="#booking-section" class="text-ink hover:text-gold text-sm font-semibold flex items-center gap-1">
                Book Ziyarat →
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- SECTION 6: THE 4-IN-1 SMART BOOKING ENGINE -->
  <section id="booking-section" class="py-12 md:py-16 lg:py-20 bg-surface-alt border-t border-border">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto mb-8">
        <span class="text-gold-strong font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 block">Direct Operator Dispatch</span>
        <h2 class="text-[30px] md:text-5xl font-semibold text-ink tracking-tight font-display">
          Instant Fare Calculation &amp; Booking
        </h2>
        <p class="mt-2 text-ink-muted text-sm md:text-base">
          Transparent prices converted live to your local currency. Zero surprise surge pricing.
        </p>
      </div>

      <!-- 4 TABS NAVIGATION -->
      <div class="max-w-4xl mx-auto mb-6">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface p-1.5 rounded-xl border border-border shadow-xs">
          <button type="button" onclick="window.appEngine.setBookingTab(1)" id="btn-tab-1" class="py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold bg-gold text-ink transition-all">
            📍 Intercity &amp; Airport
          </button>
          <button type="button" onclick="window.appEngine.setBookingTab(2)" id="btn-tab-2" class="py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold text-muted hover:text-ink transition-all">
            ⏱️ Hourly Chauffeur
          </button>
          <button type="button" onclick="window.appEngine.setBookingTab(3)" id="btn-tab-3" class="py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold text-muted hover:text-ink transition-all">
            🕌 Holy Sites Ziyarat
          </button>
          <button type="button" onclick="window.appEngine.setBookingTab(4)" id="btn-tab-4" class="py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold text-muted hover:text-ink transition-all">
            👥 Group &amp; Family Bus
          </button>
        </div>
      </div>

      <!-- BOOKING FORM CARD -->
      <div class="card p-6 md:p-8 max-w-4xl mx-auto bg-surface">
        <form id="main-booking-form" onsubmit="window.appEngine.processBooking(event)">
          <!-- TAB 1: INTERCITY & AIRPORT -->
          <div id="tab-content-1" class="booking-tab-content">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-muted mb-1.5">Selected Route</label>
                <select id="route-select" onchange="window.appEngine.updatePrice()" class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm">
                  <option value="JED_MAK">Jeddah Airport (KAIA) → Makkah Hotel</option>
                  <option value="MAK_JED">Makkah Hotel → Jeddah Airport (KAIA)</option>
                  <option value="MAK_MAD">Makkah Hotel → Madinah Hotel (Via Bir Ali)</option>
                  <option value="MAD_MAK">Madinah Hotel → Makkah Hotel</option>
                  <option value="MED_MAD">Madinah Airport (MED) → Madinah Hotel</option>
                  <option value="MAD_MED">Madinah Hotel → Madinah Airport (MED)</option>
                  <option value="JED_MAD">Jeddah Airport → Madinah Hotel</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-muted mb-1.5">Vehicle Choice</label>
                <select id="vehicle-select" onchange="window.appEngine.updatePrice()" class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm">
                  <option value="STARIA">Hyundai Staria VIP (Up to 7 seats)</option>
                  <option value="YUKON">GMC Yukon XL VIP (Up to 7 seats)</option>
                  <option value="CAMRY">Toyota Camry Executive (Up to 4 seats)</option>
                  <option value="HIACE">Toyota HiAce VIP (Up to 10 seats)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- TAB 2: HOURLY CHAUFFEUR -->
          <div id="tab-content-2" class="booking-tab-content hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-muted mb-1.5">City</label>
                <select id="hourly-city" onchange="window.appEngine.updatePrice()" class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm">
                  <option value="MAKKAH">Makkah Al-Mukarramah</option>
                  <option value="MADINAH">Madinah Al-Munawwarah</option>
                  <option value="JEDDAH">Jeddah City</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-muted mb-1.5">Duration</label>
                <select id="hourly-duration" onchange="window.appEngine.updatePrice()" class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm">
                  <option value="4">4 Hours VIP Chauffeur</option>
                  <option value="8">8 Hours Full Day VIP Chauffeur</option>
                  <option value="12">12 Hours Extended VIP Day</option>
                </select>
              </div>
            </div>
          </div>

          <!-- TAB 3: ZIYARAT -->
          <div id="tab-content-3" class="booking-tab-content hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-muted mb-1.5">Holy Sites Tour</label>
                <select id="ziyarat-tour" onchange="window.appEngine.updatePrice()" class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm">
                  <option value="MAK_ZIYARAT">Makkah Holy Sites (Hira, Thawr, Arafat, Muzdalifah, Mina)</option>
                  <option value="MAD_ZIYARAT">Madinah Holy Sites (Uhud, Quba, Qiblatayn, Seven Mosques)</option>
                  <option value="BADR_TOUR">Historical Battle of Badr Tour (Full Day)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-muted mb-1.5">Tour Vehicle</label>
                <select id="ziyarat-vehicle" onchange="window.appEngine.updatePrice()" class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm">
                  <option value="STARIA">Hyundai Staria (7 Seats)</option>
                  <option value="HIACE">Toyota HiAce (10 Seats)</option>
                  <option value="YUKON">GMC Yukon XL (7 Seats)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- TAB 4: GROUP & BUS -->
          <div id="tab-content-4" class="booking-tab-content hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-muted mb-1.5">Group Size</label>
                <select id="group-size" onchange="window.appEngine.updatePrice()" class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm">
                  <option value="10">8-10 Pilgrims (Toyota HiAce VIP)</option>
                  <option value="19">11-19 Pilgrims (Toyota Coaster Coach)</option>
                  <option value="30">20-30 Pilgrims (VIP Mercedes Bus)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-muted mb-1.5">Trip Type</label>
                <select id="group-route" onchange="window.appEngine.updatePrice()" class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm">
                  <option value="AIRPORT_TRANS">Airport to Hotel Transfer</option>
                  <option value="INTERCITY_TRANS">Makkah to Madinah Intercity</option>
                  <option value="FULL_PROGRAM">Full Umrah Package (Airport + Intercity + Ziyarat)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- COMMON FIELDS (PASSENGER INFO) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
            <div>
              <label class="block text-xs font-semibold text-muted mb-1.5">Lead Pilgrim Name</label>
              <input type="text" id="cust-name" required placeholder="e.g. Haji Ahmad" class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm focus:outline-none focus:ring-1 focus:ring-gold"/>
            </div>
            <div>
              <label class="block text-xs font-semibold text-muted mb-1.5">WhatsApp / Phone Number</label>
              <input type="tel" id="cust-phone" required placeholder="+60 12 345 6789 or +966..." class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-sm focus:outline-none focus:ring-1 focus:ring-gold"/>
            </div>
            <div>
              <label class="block text-xs font-semibold text-muted mb-1.5">Pickup Date &amp; Time</label>
              <input type="datetime-local" id="cust-datetime" required class="w-full h-11 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs focus:outline-none focus:ring-1 focus:ring-gold"/>
            </div>
          </div>

          <!-- ADD-ONS -->
          <div class="mt-4 pt-4 border-t border-border">
            <label class="block text-xs font-semibold text-muted mb-2">Complimentary &amp; Custom Add-ons</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <label class="flex items-center gap-2 p-2 rounded-btn bg-surface-alt border border-border cursor-pointer">
                <input type="checkbox" id="addon-child-seat" class="rounded text-gold"/>
                <span>Child Safety Seat</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded-btn bg-surface-alt border border-border cursor-pointer">
                <input type="checkbox" id="addon-flight" checked class="rounded text-gold"/>
                <span>Flight Tracking</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded-btn bg-surface-alt border border-border cursor-pointer">
                <input type="checkbox" id="addon-malay-driver" class="rounded text-gold"/>
                <span>Malay/English Chauffeur</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded-btn bg-surface-alt border border-border cursor-pointer">
                <input type="checkbox" id="addon-zamzam" checked class="rounded text-gold"/>
                <span>Chilled Zamzam Water</span>
              </label>
            </div>
          </div>

          <!-- FARE CALCULATION & SUBMIT -->
          <div class="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span class="text-xs text-muted block">Total Fixed Fare (Taxes Included)</span>
              <div class="flex items-baseline gap-2">
                <span class="text-3xl font-display font-extrabold text-ink" id="calculated-fare">SAR 450</span>
                <span class="text-xs font-semibold text-whatsapp bg-whatsapp/10 px-2 py-0.5 rounded-full">Guaranteed Fixed</span>
              </div>
            </div>

            <div class="flex items-center gap-3 w-full sm:w-auto">
              <button type="button" onclick="window.appEngine.openWhatsAppBooking()" class="btn-whatsapp flex-1 sm:flex-none h-12 px-6 text-sm font-bold shadow-sm">
                💬 WhatsApp Book
              </button>
              <button type="submit" class="btn-primary flex-1 sm:flex-none h-12 px-8 text-sm font-bold shadow-sm">
                Instant Confirmation →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- SECTION 7: WHY PILGRIMS TRUST US (EXACT KISWAH ARCHITECTURE) -->
  <section id="why-us" class="py-12 md:py-16 lg:py-20 bg-bg border-t border-border">
    <div class="container mx-auto px-4">
      <div class="text-center max-w-3xl mx-auto mb-8 md:mb-12">
        <h2 class="text-[30px] md:text-5xl font-semibold text-ink leading-tight font-display">
          Why Pilgrims Trust <br/><span class="text-gold">Royal Umrah Cabs</span>
        </h2>
        <p class="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
          We understand that this is not just a trip; it is a sacred journey. Our mission is to ensure your travel between the Holy Cities is as peaceful as your prayers.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- PILLAR 1 -->
        <div class="card p-6 md:p-8 flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-gold/10 text-gold-strong flex items-center justify-center text-2xl mb-4">
            🛡️
          </div>
          <h3 class="text-xl md:text-2xl font-semibold text-ink font-display mb-1">Peace of Mind</h3>
          <p class="text-gold-deep font-semibold text-xs tracking-widest uppercase mb-3">طمأنينة وآمان</p>
          <p class="text-ink-muted text-sm leading-relaxed">
            Focus on your worship while we handle the road. Our licensed chauffeurs and comprehensively insured vehicles guarantee a safe, stress-free journey.
          </p>
        </div>

        <!-- PILLAR 2 -->
        <div class="card p-6 md:p-8 flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-gold/10 text-gold-strong flex items-center justify-center text-2xl mb-4">
            ⏱️
          </div>
          <h3 class="text-xl md:text-2xl font-semibold text-ink font-display mb-1">Respecting Your Time</h3>
          <p class="text-gold-deep font-semibold text-xs tracking-widest uppercase mb-3">دقة في المواعيد</p>
          <p class="text-ink-muted text-sm leading-relaxed">
            We know every minute in the Holy Land is precious. We monitor flights in real-time, arrive 15 minutes early, and provide 60 minutes free airport wait time.
          </p>
        </div>

        <!-- PILLAR 3 -->
        <div class="card p-6 md:p-8 flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-gold/10 text-gold-strong flex items-center justify-center text-2xl mb-4">
            🤝
          </div>
          <h3 class="text-xl md:text-2xl font-semibold text-ink font-display mb-1">Guest of Allah Hospitality</h3>
          <p class="text-gold-deep font-semibold text-xs tracking-widest uppercase mb-3">خدمة ضيوف الرحمن</p>
          <p class="text-ink-muted text-sm leading-relaxed">
            Serving you is an honor. Experience authentic Saudi hospitality with VIP meet &amp; greet, luggage handling, clean fragrance, and cold Zamzam bottles.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 8: COMPARISON TABLE (COMPETITIVE ADVANTAGE) -->
  <section class="py-12 md:py-16 bg-surface border-t border-border">
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-8">
        <span class="text-gold-strong font-bold tracking-[0.14em] uppercase text-xs mb-2 block">Direct Operator Advantage</span>
        <h2 class="text-2xl md:text-4xl font-display font-bold text-ink">Why Choose Royal Umrah Over Others?</h2>
      </div>

      <div class="overflow-x-auto rounded-xl border border-border shadow-xs">
        <table class="w-full text-left text-xs md:text-sm">
          <thead class="bg-surface-alt border-b border-border text-ink font-bold">
            <tr>
              <th class="p-3.5 md:p-4">Service Feature</th>
              <th class="p-3.5 md:p-4 text-gold-strong bg-gold/5 font-extrabold">Royal Umrah Cabs</th>
              <th class="p-3.5 md:p-4 text-muted">Airport Street Taxis</th>
              <th class="p-3.5 md:p-4 text-muted">Generic Apps</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border text-body">
            <tr>
              <td class="p-3.5 md:p-4 font-semibold">Fixed Pricing Guarantee</td>
              <td class="p-3.5 md:p-4 text-whatsapp-strong font-bold bg-gold/5">✓ Yes, 100% Fixed</td>
              <td class="p-3.5 md:p-4 text-red-500">✗ Haggling &amp; Meters</td>
              <td class="p-3.5 md:p-4 text-red-500">✗ Surge Pricing (x2.5)</td>
            </tr>
            <tr>
              <td class="p-3.5 md:p-4 font-semibold">Meet &amp; Greet with Nameplate</td>
              <td class="p-3.5 md:p-4 text-whatsapp-strong font-bold bg-gold/5">✓ Free Terminal Pickup</td>
              <td class="p-3.5 md:p-4 text-red-500">✗ Search outside</td>
              <td class="p-3.5 md:p-4 text-red-500">✗ No Meet &amp; Greet</td>
            </tr>
            <tr>
              <td class="p-3.5 md:p-4 font-semibold">Flight Delay Tracking</td>
              <td class="p-3.5 md:p-4 text-whatsapp-strong font-bold bg-gold/5">✓ Automated (No Fee)</td>
              <td class="p-3.5 md:p-4 text-red-500">✗ No tracking</td>
              <td class="p-3.5 md:p-4 text-red-500">✗ Extra wait fees</td>
            </tr>
            <tr>
              <td class="p-3.5 md:p-4 font-semibold">Miqat Stop for Ihram</td>
              <td class="p-3.5 md:p-4 text-whatsapp-strong font-bold bg-gold/5">✓ Included with time</td>
              <td class="p-3.5 md:p-4 text-red-500">✗ Extra charges</td>
              <td class="p-3.5 md:p-4 text-red-500">✗ Ride cancellation</td>
            </tr>
            <tr>
              <td class="p-3.5 md:p-4 font-semibold">Payment Method</td>
              <td class="p-3.5 md:p-4 text-whatsapp-strong font-bold bg-gold/5">✓ Cash or Card on Arrival</td>
              <td class="p-3.5 md:p-4 text-muted">Cash only</td>
              <td class="p-3.5 md:p-4 text-muted">Card upfront</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- SECTION 9: PILGRIM REVIEWS (EXACT KISWAH ARCHITECTURE) -->
  <section id="reviews" class="relative overflow-hidden bg-bg py-12 md:py-16 lg:py-20 border-t border-border">
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-8 md:mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line mb-3 shadow-xs">
          <span class="text-gold">★</span>
          <span class="text-xs font-bold text-gold-strong uppercase tracking-widest">Pilgrim Reviews</span>
        </div>
        <h2 class="text-[30px] md:text-5xl font-display font-semibold text-ink">
          Trusted by <span class="text-gold">Pilgrims Worldwide</span>
        </h2>
        <p class="mt-2 text-ink-muted text-base max-w-xl mx-auto">
          Join thousands of pilgrims who chose Royal Umrah Cabs for safe and peaceful transfers.
        </p>
      </div>

      <!-- REVIEWS GRID -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <!-- REVIEW 1 (MALAYSIA) -->
        <div class="card p-6 flex flex-col justify-between text-start">
          <div>
            <div class="flex items-center gap-1 text-gold text-sm mb-3">
              ★★★★★
            </div>
            <p class="text-sm text-body leading-relaxed italic mb-4">
              "Alhamdulillah, perkhidmatan yang sangat memuaskan dari Jeddah ke Makkah. Pemandu sangat sopan, kereta Yukon yang luas dan bersih. Sangat rekomen untuk jemaah dari Malaysia!"
            </p>
          </div>
          <div class="pt-3 border-t border-border flex items-center justify-between">
            <div>
              <h4 class="font-bold text-ink text-sm">Haji Zulkifli &amp; Keluarga</h4>
              <span class="text-xs text-muted">Kuala Lumpur, Malaysia 🇲🇾</span>
            </div>
            <span class="text-xs font-semibold text-gold-strong">Staria VIP</span>
          </div>
        </div>

        <!-- REVIEW 2 (UNITED KINGDOM) -->
        <div class="card p-6 flex flex-col justify-between text-start">
          <div>
            <div class="flex items-center gap-1 text-gold text-sm mb-3">
              ★★★★★
            </div>
            <p class="text-sm text-body leading-relaxed italic mb-4">
              "Booking from London was seamless. The driver was waiting at Terminal 1 with my name on an iPad despite our Saudia flight being 45 mins late. Flawless GMC Yukon transfer."
            </p>
          </div>
          <div class="pt-3 border-t border-border flex items-center justify-between">
            <div>
              <h4 class="font-bold text-ink text-sm">Dr. Tariq Mahmood</h4>
              <span class="text-xs text-muted">Birmingham, United Kingdom 🇬🇧</span>
            </div>
            <span class="text-xs font-semibold text-gold-strong">Yukon XL</span>
          </div>
        </div>

        <!-- REVIEW 3 (INDONESIA / GCC) -->
        <div class="card p-6 flex flex-col justify-between text-start">
          <div>
            <div class="flex items-center gap-1 text-gold text-sm mb-3">
              ★★★★★
            </div>
            <p class="text-sm text-body leading-relaxed italic mb-4">
              "Pelayanan istimewa dari Makkah ke Madinah. Singgah di Bir Ali untuk berniat Ihram tanpa tergesa-gesa. Air zamzam dingin tersedia. Sangat amanah dan ramah!"
            </p>
          </div>
          <div class="pt-3 border-t border-border flex items-center justify-between">
            <div>
              <h4 class="font-bold text-ink text-sm">Bapak Hendra &amp; Istri</h4>
              <span class="text-xs text-muted">Jakarta, Indonesia 🇮🇩</span>
            </div>
            <span class="text-xs font-semibold text-gold-strong">HiAce VIP</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 10: FAQS (EXACT KISWAH ARCHITECTURE) -->
  <section id="faq" class="bg-surface py-12 md:py-16 lg:py-20 border-t border-border">
    <div class="container mx-auto px-4 max-w-3xl">
      <div class="text-center mb-8 md:mb-12">
        <span class="text-gold-strong font-semibold tracking-[0.14em] uppercase text-xs mb-2 block">Common Questions</span>
        <h2 class="text-[30px] md:text-[42px] font-semibold text-ink leading-tight font-display">Frequently Asked Questions</h2>
      </div>

      <div class="divide-y divide-border border-y border-border">
        <!-- Q1 -->
        <div class="py-4">
          <button type="button" onclick="window.appEngine.toggleFaq(1)" class="w-full flex items-center justify-between text-left font-semibold text-base md:text-lg text-ink">
            <span>Can I pay cash upon arrival after the trip?</span>
            <span id="faq-icon-1" class="text-gold font-bold text-xl">+</span>
          </button>
          <div id="faq-ans-1" class="hidden pt-3 text-sm text-ink-muted leading-relaxed">
            Yes, absolutely! We offer full 'Book Now, Pay Later' flexibility. You can pay cash (in SAR, USD, or EUR) or via credit/debit card directly to the driver upon reaching your destination.
          </div>
        </div>

        <!-- Q2 -->
        <div class="py-4">
          <button type="button" onclick="window.appEngine.toggleFaq(2)" class="w-full flex items-center justify-between text-left font-semibold text-base md:text-lg text-ink">
            <span>What happens if my flight is delayed at Jeddah or Madinah Airport?</span>
            <span id="faq-icon-2" class="text-gold font-bold text-xl">+</span>
          </button>
          <div id="faq-ans-2" class="hidden pt-3 text-sm text-ink-muted leading-relaxed">
            We track all incoming flights automatically using your flight number. Your chauffeur adjusts pickup time accordingly with zero extra wait charges. 60 minutes free waiting is included after landing.
          </div>
        </div>

        <!-- Q3 -->
        <div class="py-4">
          <button type="button" onclick="window.appEngine.toggleFaq(3)" class="w-full flex items-center justify-between text-left font-semibold text-base md:text-lg text-ink">
            <span>Are the quoted prices per vehicle or per passenger?</span>
            <span id="faq-icon-3" class="text-gold font-bold text-xl">+</span>
          </button>
          <div id="faq-ans-3" class="hidden pt-3 text-sm text-ink-muted leading-relaxed">
            All prices are strictly private per vehicle, not per person. The price covers your entire family or group up to the vehicle's seating capacity.
          </div>
        </div>

        <!-- Q4 -->
        <div class="py-4">
          <button type="button" onclick="window.appEngine.toggleFaq(4)" class="w-full flex items-center justify-between text-left font-semibold text-base md:text-lg text-ink">
            <span>Can we make a stop at the Miqat for Ihram on the way?</span>
            <span id="faq-icon-4" class="text-gold font-bold text-xl">+</span>
          </button>
          <div id="faq-ans-4" class="hidden pt-3 text-sm text-ink-muted leading-relaxed">
            Yes! For transfers between Madinah and Makkah (or from Jeddah), we provide a 30 to 45-minute stop at the designated Miqat (Bir Ali / Qarn al-Manazil) for changing into Ihram and prayer at no additional fee.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTION 11: SEO AUTHORITY CONTENT (FOR SAUDI & MALAYSIA) -->
  <section class="py-12 md:py-16 bg-bg border-t border-border">
    <div class="container mx-auto px-4 max-w-4xl text-start">
      <h2 class="text-2xl md:text-3xl font-bold font-display text-ink mb-4">
        Trusted Umrah Transport Services: Your Gateway to a Spiritual Journey in Saudi Arabia
      </h2>
      <p class="text-sm md:text-base text-ink-muted leading-relaxed mb-4">
        Embarking on the spiritual journey of Umrah or Hajj is a profound experience for every Muslim. At <strong>Royal Umrah Cabs</strong>, we take pride in serving the Guests of Allah with premium, reliable, and licensed private taxi and chauffeur solutions connecting King Abdulaziz International Airport (JED), Prince Mohammad Bin Abdulaziz International Airport (MED), and luxury hotels across Makkah and Madinah.
      </p>
      
      <!-- MALAYSIA SPECIFIC SEO HIGHLIGHT -->
      <div class="p-5 rounded-xl bg-surface border border-gold-line my-6">
        <h3 class="text-lg font-bold text-ink mb-2">🇲🇾 Perkhidmatan Teksi Umrah Terbaik untuk Jemaah Malaysia</h3>
        <p class="text-sm text-body leading-relaxed">
          Kami menyediakan perkhidmatan sewa kereta dan teksi persendirian VIP dari Lapangan Terbang Jeddah ke Makkah dan Madinah khas untuk jemaah dari Malaysia. Pemandu profesional yang memahami keperluan jemaah, sokongan WhatsApp Bahasa Melayu/Inggeris 24 jam, dan bayaran terus kepada pemandu tanpa bayaran deposit awal.
        </p>
      </div>
    </div>
  </section>

  <!-- SECTION 12: FINAL CTA BANNER (EXACT KISWAH ARCHITECTURE) -->
  <section class="bg-charcoal text-white border-t border-white/10 py-12 md:py-16 lg:py-20">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-[30px] md:text-5xl font-semibold text-white mb-4 font-display tracking-tight leading-tight">
        Start Your <span class="text-gold">Spiritual Journey</span> with Peace of Mind
      </h2>
      <p class="text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-light">
        Don&#x27;t worry about logistics. Book your private transfer now and let us serve you with the care you deserve.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a href="#booking-section" class="btn-primary h-12 px-8 text-sm font-bold uppercase tracking-wider">
          Book Your Umrah Transport →
        </a>
        <a href="https://wa.me/966548707332" target="_blank" class="btn-whatsapp h-12 px-6 text-sm font-bold">
          💬 Chat on WhatsApp
        </a>
      </div>
    </div>
  </section>

  <!-- SECTION 13: LUXURY FOOTER (EXACT KISWAH 5-COLUMN ARCHITECTURE) -->
  <footer class="bg-surface text-body border-t border-border py-12 md:py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        <!-- COL 1: BRAND & CONTACT -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🕋</span>
            <span class="text-xl font-display font-bold text-ink uppercase">Royal Umrah Cabs</span>
          </div>
          <p class="text-xs text-muted leading-relaxed">
            Official luxury pilgrim chauffeur and private Umrah transport across Jeddah, Makkah, and Madinah.
          </p>
          <div class="flex items-center gap-2 pt-2">
            <a href="https://wa.me/966548707332" target="_blank" class="btn-whatsapp h-10 px-4 text-xs font-bold">
              WhatsApp
            </a>
            <a href="tel:+966548707332" class="btn-outline h-10 px-4 text-xs font-semibold">
              Call Direct
            </a>
          </div>
        </div>

        <!-- COL 2: POPULAR ROUTES -->
        <div>
          <h4 class="font-bold text-xs uppercase tracking-wider text-ink mb-3">Popular Routes</h4>
          <ul class="space-y-2 text-xs text-muted">
            <li><a href="#booking-section" class="hover:text-gold transition-colors">Jeddah Airport to Makkah</a></li>
            <li><a href="#booking-section" class="hover:text-gold transition-colors">Makkah to Madinah VIP</a></li>
            <li><a href="#booking-section" class="hover:text-gold transition-colors">Madinah Airport to Hotel</a></li>
            <li><a href="#booking-section" class="hover:text-gold transition-colors">Jeddah to Madinah Transfer</a></li>
            <li><a href="#booking-section" class="hover:text-gold transition-colors">Makkah Ziyarat Tour</a></li>
          </ul>
        </div>

        <!-- COL 3: FLEET -->
        <div>
          <h4 class="font-bold text-xs uppercase tracking-wider text-ink mb-3">Our Fleet</h4>
          <ul class="space-y-2 text-xs text-muted">
            <li><a href="#fleet" class="hover:text-gold transition-colors">GMC Yukon XL (VIP SUV)</a></li>
            <li><a href="#fleet" class="hover:text-gold transition-colors">Hyundai Staria (Family Van)</a></li>
            <li><a href="#fleet" class="hover:text-gold transition-colors">Toyota Camry (Executive Sedan)</a></li>
            <li><a href="#fleet" class="hover:text-gold transition-colors">Toyota HiAce (Mini Bus)</a></li>
            <li><a href="#fleet" class="hover:text-gold transition-colors">Coaster Coach (Groups)</a></li>
          </ul>
        </div>

        <!-- COL 4: PORTALS & COMPANY -->
        <div>
          <h4 class="font-bold text-xs uppercase tracking-wider text-ink mb-3">Company &amp; Portals</h4>
          <ul class="space-y-2 text-xs text-muted">
            <li><a href="/track-booking.html" class="hover:text-gold font-semibold text-ink">Track My Booking</a></li>
            <li><a href="/partner.html" class="hover:text-gold font-semibold text-ink">B2B Agency Portal</a></li>
            <li><a href="/admin.html" class="hover:text-gold font-semibold text-ink">Super Admin (Dispatch)</a></li>
            <li><a href="/privacy.html" class="hover:text-gold">Privacy Policy</a></li>
            <li><a href="/terms.html" class="hover:text-gold">Terms &amp; Conditions</a></li>
            <li><a href="/cancellation.html" class="hover:text-gold">Cancellation Policy</a></li>
          </ul>
        </div>

        <!-- COL 5: PILGRIMS FROM -->
        <div>
          <h4 class="font-bold text-xs uppercase tracking-wider text-ink mb-3">Pilgrims From</h4>
          <ul class="space-y-2 text-xs text-muted">
            <li><a href="#" class="hover:text-gold">Malaysia (Jemaah Umrah) 🇲🇾</a></li>
            <li><a href="#" class="hover:text-gold">United Kingdom 🇬🇧</a></li>
            <li><a href="#" class="hover:text-gold">United States 🇺🇸</a></li>
            <li><a href="#" class="hover:text-gold">Indonesia 🇮🇩</a></li>
            <li><a href="#" class="hover:text-gold">للمعتمرين العرب 🇸🇦</a></li>
          </ul>
        </div>
      </div>

      <!-- FOOTER BOTTOM -->
      <div class="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <p>© 2026 Royal Umrah Cabs · Jeddah · Makkah · Madinah. Licensed by TGA &amp; Nusuk.</p>
        <div class="flex items-center gap-4">
          <span>Fixed Rates</span>
          <span>·</span>
          <span>No Prepayment Required</span>
          <span>·</span>
          <span>24/7 Dispatch Support</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- BOOKING CONFIRMATION MODAL -->
  <div id="booking-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
    <div class="card p-6 md:p-8 max-w-md w-full bg-surface relative">
      <button type="button" onclick="window.appEngine.closeBookingModal()" class="absolute top-4 right-4 text-muted hover:text-ink text-xl">
        ✕
      </button>
      <div class="text-center">
        <div class="w-14 h-14 rounded-full bg-gold/15 text-gold-strong text-2xl flex items-center justify-center mx-auto mb-3">
          ✓
        </div>
        <h3 class="text-2xl font-display font-bold text-ink">Booking Confirmed!</h3>
        <p class="text-xs text-muted mt-1" id="modal-ref">Reference: RUC-7829</p>
      </div>

      <div class="bg-surface-alt p-4 rounded-lg my-4 text-xs space-y-2 text-start">
        <div class="flex justify-between">
          <span class="text-muted">Route:</span>
          <span class="font-bold text-ink" id="modal-route">Jeddah Airport → Makkah</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted">Vehicle:</span>
          <span class="font-bold text-ink" id="modal-vehicle">Hyundai Staria VIP</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted">Date &amp; Time:</span>
          <span class="font-bold text-ink" id="modal-datetime">Tomorrow at 14:00</span>
        </div>
        <div class="flex justify-between border-t border-border pt-2 text-sm font-extrabold">
          <span>Total Fare:</span>
          <span class="text-gold-strong" id="modal-fare">SAR 450</span>
        </div>
      </div>

      <p class="text-xs text-ink-muted text-center mb-4">
        Our dispatch team has received your transfer. Your driver's live WhatsApp contact and car license number will be sent directly to you.
      </p>

      <div class="flex gap-2">
        <button type="button" onclick="window.appEngine.closeBookingModal()" class="btn-outline flex-1 h-11 text-xs font-semibold">
          Close
        </button>
        <button type="button" onclick="window.appEngine.openWhatsAppBooking()" class="btn-whatsapp flex-1 h-11 text-xs font-bold">
          Send to WhatsApp
        </button>
      </div>
    </div>
  </div>

  <!-- JAVASCRIPT ENGINE -->
  <script>
    (function() {
      // Rates matrix in SAR
      const RATES_SAR = {
        'JED_MAK': { 'CAMRY': 190, 'STARIA': 250, 'YUKON': 350, 'HIACE': 320 },
        'MAK_JED': { 'CAMRY': 190, 'STARIA': 250, 'YUKON': 350, 'HIACE': 320 },
        'MAK_MAD': { 'CAMRY': 420, 'STARIA': 450, 'YUKON': 650, 'HIACE': 580 },
        'MAD_MAK': { 'CAMRY': 420, 'STARIA': 450, 'YUKON': 650, 'HIACE': 580 },
        'MED_MAD': { 'CAMRY': 150, 'STARIA': 200, 'YUKON': 280, 'HIACE': 260 },
        'MAD_MED': { 'CAMRY': 150, 'STARIA': 200, 'YUKON': 280, 'HIACE': 260 },
        'JED_MAD': { 'CAMRY': 650, 'STARIA': 750, 'YUKON': 980, 'HIACE': 890 }
      };

      // Currency conversion rates (relative to SAR)
      const CURRENCY_RATES = {
        'SAR': { rate: 1.0, symbol: 'SAR', prefix: true },
        'USD': { rate: 0.266, symbol: '$', prefix: true },
        'MYR': { rate: 1.18, symbol: 'RM ', prefix: true },
        'GBP': { rate: 0.21, symbol: '£', prefix: true },
        'EUR': { rate: 0.25, symbol: '€', prefix: true },
        'EGP': { rate: 13.1, symbol: 'EGP ', prefix: true }
      };

      // Vehicle Fleet Data
      const FLEET_DATA = {
        'STARIA': {
          name: 'Hyundai Staria VIP',
          category: 'PREMIUM FAMILY VAN',
          desc: 'Space that breathes with you. Spacious panoramic cabin with individual executive reclining seats, dual-zone AC, and generous luggage capacity.',
          seats: 'Up to 7 Seats',
          bags: '5-6 Large Bags',
          priceSAR: 450,
          imgInt: 'assets/images/staria_interior.jpg',
          imgExt: 'assets/images/staria_exterior.jpg'
        },
        'YUKON': {
          name: 'GMC Yukon XL VIP',
          category: 'ULTRA-LUXURY VIP SUV',
          desc: 'Where the journey slows down. Premium acoustic insulation, black leather upholstery, supreme road presence, and vast luggage volume.',
          seats: 'Up to 7 Seats',
          bags: '6-8 Large Bags',
          priceSAR: 650,
          imgInt: 'assets/images/yukon_interior.jpg',
          imgExt: 'assets/images/yukon_exterior.jpg'
        },
        'CAMRY': {
          name: 'Toyota Camry Executive',
          category: 'EXECUTIVE SEDAN',
          desc: 'Smooth, quiet, and fuel-efficient luxury sedan for couples or small families up to 3-4 passengers with moderate luggage.',
          seats: 'Up to 4 Seats',
          bags: '2-3 Standard Bags',
          priceSAR: 420,
          imgInt: 'assets/images/camry_interior.jpg',
          imgExt: 'assets/images/camry_exterior.jpg'
        },
        'HIACE': {
          name: 'Toyota HiAce VIP',
          category: 'MINI BUS FOR GROUPS',
          desc: 'Together in comfort. High roof, spacious aisle, strong dual AC, and abundant room for 10 passengers with their full luggage set.',
          seats: 'Up to 10 Seats',
          bags: '8-10 Bags',
          priceSAR: 580,
          imgInt: 'assets/images/hiace_interior.jpg',
          imgExt: 'assets/images/hiace_exterior.jpg'
        }
      };

      // Translations Dictionary
      const TRANSLATIONS = {
        en: {
          dir: 'ltr',
          top_licensed: 'Licensed Saudi Transport · TGA & Nusuk Authorized',
          top_pilgrims: '15,000+ Happy Pilgrims Served',
          top_track: 'Track Booking',
          nav_steps: 'How It Works',
          nav_fleet: 'Step Inside',
          nav_services: 'Services',
          nav_rates: 'Rates & Booking',
          nav_why: 'Why Us',
          nav_reviews: 'Reviews',
          nav_faq: 'FAQ',
          btn_book_now: 'Book Now',
          hero_eyebrow: 'Private Umrah & Hajj Transport',
          hero_title_1: 'Premium Umrah Chauffeur &',
          hero_title_2: 'Luxury Pilgrim Transport',
          hero_desc: 'Experience peace of mind with our dedicated private Umrah taxi service across Makkah, Madinah, and Jeddah. Professional drivers, fixed rates, and guaranteed comfort for the Guests of Allah.',
          hero_btn_book: 'Book Your Journey',
          hero_btn_fleet: 'Explore Fleet'
        },
        ar: {
          dir: 'rtl',
          top_licensed: 'شركة نقل مرخصة · معتمدة من الهيئة العامة للنقل ومنصة نسك',
          top_pilgrims: '+15,000 معتمر ومسافر سعيد',
          top_track: 'تتبع الحجز',
          nav_steps: 'خطوات الحجز',
          nav_fleet: 'أسطول السيارات',
          nav_services: 'خدماتنا',
          nav_rates: 'الأسعار والحجز',
          nav_why: 'لماذا نحن',
          nav_reviews: 'تقييمات المعتمرين',
          nav_faq: 'الأسئلة الشائعة',
          btn_book_now: 'احجز الآن',
          hero_eyebrow: 'نقل خاص للمعتمرين وضيوف الرحمن',
          hero_title_1: 'خدمة توصيل وسائق VIP للمعتمرين',
          hero_title_2: 'بأعلى معايير الفخامة والراحة',
          hero_desc: 'تمتع بأقصى درجات الطمأنينة مع خدمات التاكسي والتوصيل الخاص بين مكة والمدينة وجدة. سائقون محترفون، أسعار ثابتة، وراحة مضمونة.',
          hero_btn_book: 'احجز رحلتك الآن',
          hero_btn_fleet: 'استكشف الأسطول'
        },
        ms: {
          dir: 'ltr',
          top_licensed: 'Pengangkutan Berlesen Saudi · Diiktiraf Nusuk & TGA',
          top_pilgrims: '15,000+ Jemaah Umrah Berpuas Hati',
          top_track: 'Kesan Tempahan',
          nav_steps: 'Cara Tempah',
          nav_fleet: 'Lihat Kenderaan',
          nav_services: 'Perkhidmatan',
          nav_rates: 'Kadar & Tempahan',
          nav_why: 'Kelebihan Kami',
          nav_reviews: 'Ulasan Jemaah',
          nav_faq: 'Soalan Lazim',
          btn_book_now: 'Tempah Sekarang',
          hero_eyebrow: 'Pengangkutan Eksklusif Umrah & Haji',
          hero_title_1: 'Pemandu Peribadi VIP Umrah &',
          hero_title_2: 'Pengangkutan Mewah Jemaah',
          hero_desc: 'Nikmati ketenangan ibadah dengan perkhidmatan teksi persendirian di Makkah, Madinah, dan Jeddah. Pemandu terlatih, harga tetap tanpa caj tersembunyi, dan keselesaan terjamin.',
          hero_btn_book: 'Tempah Perjalanan',
          hero_btn_fleet: 'Lihat Armada Kereta'
        },
        ur: {
          dir: 'rtl',
          top_licensed: 'سعودی ٹرانسپورٹ لائسنس یافتہ · نسک منظور شدہ',
          top_pilgrims: '15,000+ معتمرین کی خدمت کا فخر',
          top_track: 'بکنگ ٹریک کریں',
          nav_steps: 'طریقہ کار',
          nav_fleet: 'گاڑیاں دیکھیں',
          nav_services: 'خدمات',
          nav_rates: 'کرایہ اور بکنگ',
          nav_why: 'ہمیں کیوں منتخب کریں',
          nav_reviews: 'ریویوز',
          nav_faq: 'عمومی سوالات',
          btn_book_now: 'ابھی بک کریں',
          hero_eyebrow: 'خصوصی عمرہ اور حج ٹرانسپورٹ',
          hero_title_1: 'پریمیم عمرہ شوفر سروس اور',
          hero_title_2: 'شاندار و پرسکون سفر',
          hero_desc: 'مکہ، مدینہ اور جدہ ایئرپورٹ کے درمیان فیملی اور وی آئی پی عمرہ ٹیکسی۔ مقررہ کرایہ اور بااعتماد خدمت۔',
          hero_btn_book: 'سفر بک کریں',
          hero_btn_fleet: 'گاڑیاں ملاحظہ کریں'
        },
        fr: {
          dir: 'ltr',
          top_licensed: 'Transport agréé en Arabie Saoudite · Certifié Nusuk',
          top_pilgrims: 'Plus de 15 000 pèlerins servis',
          top_track: 'Suivre ma réservation',
          nav_steps: 'Comment ça marche',
          nav_fleet: 'Notre Flotte',
          nav_services: 'Services',
          nav_rates: 'Tarifs & Réservation',
          nav_why: 'Pourquoi Nous',
          nav_reviews: 'Avis',
          nav_faq: 'FAQ',
          btn_book_now: 'Réserver',
          hero_eyebrow: 'Transport Privé Omra & Hajj',
          hero_title_1: 'Chauffeur Privé VIP Omra &',
          hero_title_2: 'Transport de Prestige',
          hero_desc: 'Profitez de la tranquillité avec notre service privé à La Mecque, Médine et Djeddah. Chauffeurs professionnels et tarifs fixes garantis.',
          hero_btn_book: 'Réserver Maintenant',
          hero_btn_fleet: 'Voir la Flotte'
        }
      };

      // App state
      let currentCurrency = 'SAR';
      let currentLanguage = 'en';
      let activeFleetKey = 'STARIA';
      let activeFleetView = 'int';
      let activeBookingTab = 1;

      // App Engine Definition
      const appEngine = {
        // Currency Switcher
        setCurrency: function(curr) {
          if (!CURRENCY_RATES[curr]) return;
          currentCurrency = curr;
          const select = document.getElementById('currency-switcher');
          if (select) select.value = curr;
          this.updatePrice();
          this.updateFleetPrice();
        },

        formatMoney: function(amountSAR) {
          const cfg = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES['SAR'];
          const converted = Math.round(amountSAR * cfg.rate);
          return cfg.prefix ? (cfg.symbol + converted.toLocaleString()) : (converted.toLocaleString() + ' ' + cfg.symbol);
        },

        // Language Switcher
        setLanguage: function(lang) {
          const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
          currentLanguage = lang;
          document.documentElement.lang = lang;
          document.documentElement.dir = t.dir;

          const langSelect = document.getElementById('lang-switcher');
          if (langSelect) langSelect.value = lang;

          // Replace text for elements with data-i18n
          document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) el.textContent = t[key];
          });
        },

        // Booking Tab Switcher
        setBookingTab: function(tabIndex) {
          activeBookingTab = tabIndex;
          for (let i = 1; i <= 4; i++) {
            const content = document.getElementById('tab-content-' + i);
            const btn = document.getElementById('btn-tab-1'.replace('1', i));
            if (content) {
              if (i === tabIndex) {
                content.classList.remove('hidden');
              } else {
                content.classList.add('hidden');
              }
            }
            if (btn) {
              if (i === tabIndex) {
                btn.className = 'py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold bg-gold text-ink transition-all';
              } else {
                btn.className = 'py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold text-muted hover:text-ink transition-all';
              }
            }
          }
          this.updatePrice();
        },

        // Price Update Calculation
        updatePrice: function() {
          let baseSAR = 450;
          if (activeBookingTab === 1) {
            const route = document.getElementById('route-select')?.value || 'MAK_MAD';
            const vehicle = document.getElementById('vehicle-select')?.value || 'STARIA';
            baseSAR = (RATES_SAR[route] && RATES_SAR[route][vehicle]) ? RATES_SAR[route][vehicle] : 450;
          } else if (activeBookingTab === 2) {
            const duration = parseInt(document.getElementById('hourly-duration')?.value || '4', 10);
            baseSAR = duration * 100;
          } else if (activeBookingTab === 3) {
            const tour = document.getElementById('ziyarat-tour')?.value || 'MAK_ZIYARAT';
            baseSAR = (tour === 'BADR_TOUR') ? 600 : 300;
          } else if (activeBookingTab === 4) {
            const groupSize = parseInt(document.getElementById('group-size')?.value || '10', 10);
            baseSAR = (groupSize > 19) ? 1200 : (groupSize > 10 ? 800 : 550);
          }

          const fareEl = document.getElementById('calculated-fare');
          if (fareEl) {
            fareEl.textContent = this.formatMoney(baseSAR);
          }
          return baseSAR;
        },

        // Fleet Showcase
        showFleet: function(key) {
          if (!FLEET_DATA[key]) return;
          activeFleetKey = key;
          
          ['staria', 'yukon', 'camry', 'hiace'].forEach(k => {
            const btn = document.getElementById('tab-' + k);
            if (btn) {
              if (k.toUpperCase() === key) {
                btn.className = 'px-4 py-2 rounded-btn text-sm font-semibold border border-gold bg-gold text-ink transition-all';
              } else {
                btn.className = 'px-4 py-2 rounded-btn text-sm font-semibold border border-border-strong bg-surface text-ink hover:border-gold transition-all';
              }
            }
          });

          const data = FLEET_DATA[key];
          document.getElementById('fleet-category').textContent = data.category;
          document.getElementById('fleet-name').textContent = data.name;
          document.getElementById('fleet-desc').textContent = data.desc;
          document.getElementById('fleet-seats').textContent = data.seats;
          document.getElementById('fleet-bags').textContent = data.bags;
          
          this.updateFleetPrice();
          this.updateFleetImage();
        },

        updateFleetPrice: function() {
          const data = FLEET_DATA[activeFleetKey];
          const el = document.getElementById('fleet-price');
          if (el && data) {
            el.textContent = this.formatMoney(data.priceSAR);
          }
        },

        toggleFleetView: function(view) {
          activeFleetView = view;
          const btnInt = document.getElementById('btn-view-int');
          const btnExt = document.getElementById('btn-view-ext');
          const badge = document.getElementById('fleet-view-badge');

          if (view === 'int') {
            if (btnInt) btnInt.className = 'px-3 py-1.5 rounded-btn text-xs font-semibold bg-gold text-ink border border-gold';
            if (btnExt) btnExt.className = 'px-3 py-1.5 rounded-btn text-xs font-semibold bg-surface-alt text-ink border border-border hover:border-gold';
            if (badge) badge.textContent = 'Interior Cabin View';
          } else {
            if (btnInt) btnInt.className = 'px-3 py-1.5 rounded-btn text-xs font-semibold bg-surface-alt text-ink border border-border hover:border-gold';
            if (btnExt) btnExt.className = 'px-3 py-1.5 rounded-btn text-xs font-semibold bg-gold text-ink border border-gold';
            if (badge) badge.textContent = 'Exterior Fleet View';
          }
          this.updateFleetImage();
        },

        updateFleetImage: function() {
          const data = FLEET_DATA[activeFleetKey];
          const img = document.getElementById('fleet-main-img');
          if (img && data) {
            img.style.opacity = '0.3';
            setTimeout(() => {
              img.src = (activeFleetView === 'int') ? data.imgInt : data.imgExt;
              img.style.opacity = '1';
            }, 150);
          }
        },

        selectFleetAndScroll: function() {
          const vehicleSelect = document.getElementById('vehicle-select');
          if (vehicleSelect) {
            vehicleSelect.value = activeFleetKey;
          }
          this.setBookingTab(1);
          document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
        },

        // Quick Widget in Hero
        handleQuickWidgetSubmit: function(e) {
          if (e) e.preventDefault();
          const pickup = document.getElementById('quick-pickup')?.value || 'JED_AIRPORT';
          const dropoff = document.getElementById('quick-dropoff')?.value || 'MAKKAH_HOTEL';
          const vehicle = document.getElementById('quick-vehicle')?.value || 'STARIA';

          let mappedRoute = 'JED_MAK';
          if (pickup === 'JED_AIRPORT' && dropoff === 'MAKKAH_HOTEL') mappedRoute = 'JED_MAK';
          else if (pickup === 'MAKKAH_HOTEL' && dropoff === 'MADINAH_HOTEL') mappedRoute = 'MAK_MAD';
          else if (pickup === 'MADINAH_HOTEL' && dropoff === 'MAKKAH_HOTEL') mappedRoute = 'MAD_MAK';
          else if (pickup === 'MED_AIRPORT') mappedRoute = 'MED_MAD';

          const routeSelect = document.getElementById('route-select');
          if (routeSelect) routeSelect.value = mappedRoute;

          const vehicleSelect = document.getElementById('vehicle-select');
          if (vehicleSelect) vehicleSelect.value = vehicle;

          this.setBookingTab(1);
          document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
        },

        // Accordion FAQ
        toggleFaq: function(num) {
          const ans = document.getElementById('faq-ans-' + num);
          const icon = document.getElementById('faq-icon-' + num);
          if (!ans) return;
          const isHidden = ans.classList.contains('hidden');
          if (isHidden) {
            ans.classList.remove('hidden');
            if (icon) icon.textContent = '−';
          } else {
            ans.classList.add('hidden');
            if (icon) icon.textContent = '+';
          }
        },

        // Mobile Nav Toggle
        toggleMobileMenu: function() {
          const menu = document.getElementById('mobile-menu');
          if (menu) menu.classList.toggle('hidden');
        },

        // Booking Submission & Modal
        processBooking: function(e) {
          if (e) e.preventDefault();
          const name = document.getElementById('cust-name')?.value || 'Guest';
          const phone = document.getElementById('cust-phone')?.value || 'N/A';
          const dt = document.getElementById('cust-datetime')?.value || 'As soon as possible';
          const fareSAR = this.updatePrice();
          const fareFormatted = this.formatMoney(fareSAR);
          const ref = 'RUC-' + Math.floor(1000 + Math.random() * 9000);

          let routeName = 'Makkah to Madinah VIP';
          const routeSelect = document.getElementById('route-select');
          if (routeSelect) {
            routeName = routeSelect.options[routeSelect.selectedIndex].text;
          }

          let vehicleName = 'Hyundai Staria VIP';
          const vehicleSelect = document.getElementById('vehicle-select');
          if (vehicleSelect) {
            vehicleName = vehicleSelect.options[vehicleSelect.selectedIndex].text;
          }

          document.getElementById('modal-ref').textContent = 'Booking Reference: ' + ref;
          document.getElementById('modal-route').textContent = routeName;
          document.getElementById('modal-vehicle').textContent = vehicleName;
          document.getElementById('modal-datetime').textContent = dt;
          document.getElementById('modal-fare').textContent = fareFormatted;

          document.getElementById('booking-modal')?.classList.remove('hidden');
        },

        closeBookingModal: function() {
          document.getElementById('booking-modal')?.classList.add('hidden');
        },

        // WhatsApp direct link builder
        openWhatsAppBooking: function() {
          const name = document.getElementById('cust-name')?.value || 'Guest of Allah';
          const phone = document.getElementById('cust-phone')?.value || '';
          const dt = document.getElementById('cust-datetime')?.value || 'Pending';
          const fare = document.getElementById('calculated-fare')?.textContent || 'SAR 450';
          
          let routeText = 'Makkah to Madinah';
          const routeSelect = document.getElementById('route-select');
          if (routeSelect && activeBookingTab === 1) {
            routeText = routeSelect.options[routeSelect.selectedIndex].text;
          } else if (activeBookingTab === 2) {
            routeText = 'Hourly VIP Chauffeur Service';
          } else if (activeBookingTab === 3) {
            routeText = 'Holy Sites Ziyarat Tour';
          } else if (activeBookingTab === 4) {
            routeText = 'Group / VIP Bus Transport';
          }

          const lines = [
            'Assalamu Alaikum Royal Umrah Cabs,',
            'I would like to book a private VIP transfer:',
            '• Pilgrim Name: ' + name,
            '• Phone: ' + phone,
            '• Route / Service: ' + routeText,
            '• Date & Time: ' + dt,
            '• Fixed Fare: ' + fare,
            'Please confirm driver availability. Jazakum Allah Khair.'
          ];

          const msg = encodeURIComponent(lines.join(String.fromCharCode(10)));
          window.open('https://wa.me/966548707332?text=' + msg, '_blank');
        }
      };

      // Expose to window
      window.appEngine = appEngine;

      // Initialize on DOM load
      document.addEventListener('DOMContentLoaded', function() {
        appEngine.updatePrice();
        appEngine.showFleet('STARIA');

        // Set default date picker to tomorrow
        const dateInput = document.getElementById('quick-date');
        if (dateInput) {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          dateInput.value = tomorrow.toISOString().split('T')[0];
        }

        const dtInput = document.getElementById('cust-datetime');
        if (dtInput) {
          const now = new Date();
          now.setHours(now.getHours() + 24);
          dtInput.value = now.toISOString().slice(0, 16);
        }
      });
    })();
  </script>
</body>
</html>`;

fs.writeFileSync('D:/royal-umrah-cabs/index.html', html, 'utf8');
console.log('Successfully generated index.html! File size:', html.length);
