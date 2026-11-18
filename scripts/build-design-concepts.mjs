import fs from 'fs';
import path from 'path';

const outDir = 'd:\\royal-umrah-cabs\\design-concepts';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// ---------------------------------------------------------------------------
// PALETTE DEFINITIONS ACCORDING TO PROMPT
// ---------------------------------------------------------------------------
const CONCEPTS = {
  a: {
    id: 'concept-a',
    title: 'Concept A — Desert Modernism',
    arTitle: 'المفهوم الأول: الحداثة الصحراوية المعمارية',
    subtitle: 'Contemporary Saudi Architectural Luxury • Limestone & Deep Olive & Aged Copper',
    bg: '#F3EFE5',
    cardBg: '#FBF9F4',
    textPrimary: '#292821',
    textSecondary: '#6E695F',
    accentPrimary: '#34483B',      // Deep Olive
    accentPrimaryLight: '#435C4C',
    accentSecondary: '#B77C4D',    // Aged Copper
    accentSecondaryLight: '#C98F62',
    border: '#DCCDB6',             // Soft Sand
    borderLight: '#E8DEC0',
    heroOverlay: 'rgba(41, 40, 33, 0.72)',
    heroBg: '#292821',
    logoSvg: '/assets/brand/logo-concept-a-olive-copper.svg',
    logoReverseSvg: '/assets/brand/logo-concept-a-reverse.svg',
    fontPrimary: "'Plus Jakarta Sans', sans-serif",
    fontSerif: "'Amiri', serif",
    fontDisplay: "'Cinzel', 'Playfair Display', serif",
    tagline: 'مستوحى من عمارة الدرعية والعلا والحجر الجيري الطبيعي والنخيل الخالد',
  },
  b: {
    id: 'concept-b',
    title: 'Concept B — Royal Editorial',
    arTitle: 'المفهوم الثاني: الصالون الملكي التحريري',
    subtitle: 'High-End Hospitality Publishing • Royal Burgundy & Antique Bronze & Espresso',
    bg: '#F8F4EC',
    cardBg: '#FFFFFF',
    textPrimary: '#302825',        // Espresso
    textSecondary: '#736B66',
    accentPrimary: '#542E32',      // Royal Burgundy
    accentPrimaryLight: '#6B3C41',
    accentSecondary: '#B38B62',    // Antique Bronze
    accentSecondaryLight: '#C79F76',
    border: '#E8DDCF',             // Champagne Cream
    borderLight: '#EFE6DA',
    heroOverlay: 'rgba(48, 40, 37, 0.78)',
    heroBg: '#302825',
    logoSvg: '/assets/brand/logo-concept-b-burgundy-bronze.svg',
    logoReverseSvg: '/assets/brand/logo-concept-b-reverse.svg',
    fontPrimary: "'DM Sans', sans-serif",
    fontSerif: "'Playfair Display', Georgia, serif",
    fontDisplay: "'Playfair Display', Georgia, serif",
    tagline: 'مستوحى من جماليات المجلات الفاخرة وصالونات كبار الشخصيات والبرونز العتيق',
  },
  c: {
    id: 'concept-c',
    title: 'Concept C — Cinematic Sandstone',
    arTitle: 'المفهوم الثالث: الأفق الصحراوي السينمائي',
    subtitle: 'Dramatic Luxury Travel • Sandstone & Deep Espresso & Burnt Terracotta',
    bg: '#E8DCC9',
    cardBg: '#F8F5EF',
    textPrimary: '#29251F',        // Deep Espresso
    textSecondary: '#6B655B',
    accentPrimary: '#B96746',      // Burnt Terracotta
    accentPrimaryLight: '#CB7959',
    accentSecondary: '#78806A',    // Muted Olive
    accentSecondaryLight: '#8C957C',
    border: '#D8CBB6',             // Soft Sandstone border
    borderLight: '#E2D7C5',
    heroOverlay: 'rgba(41, 37, 31, 0.75)',
    heroBg: '#29251F',
    logoSvg: '/assets/brand/logo-concept-c-sandstone-terracotta.svg',
    logoReverseSvg: '/assets/brand/logo-concept-c-reverse.svg',
    fontPrimary: "'Plus Jakarta Sans', sans-serif",
    fontSerif: "'Amiri', serif",
    fontDisplay: "'Cinzel', Georgia, serif",
    tagline: 'مستوحى من ألوان الغروب في الكثبان الذهبية، وتدرجات الحجر الرملي وحرارة الضيافة',
  }
};

// ---------------------------------------------------------------------------
// HTML GENERATOR
// ---------------------------------------------------------------------------
function generateConceptHTML(key, isMobile = false) {
  const c = CONCEPTS[key];
  const viewportWidth = isMobile ? '390px' : '1440px';
  const containerClass = isMobile ? 'max-w-[390px] mx-auto px-4' : 'max-w-[1400px] mx-auto px-10';

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=${isMobile ? '390, user-scalable=no' : '1440, initial-scale=1.0'}">
  <title>${c.title} | Duyuf Alrahman VIP</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@600;700;800&family=DM+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: ${c.bg};
      --card-bg: ${c.cardBg};
      --text-main: ${c.textPrimary};
      --text-sub: ${c.textSecondary};
      --accent: ${c.accentPrimary};
      --accent-secondary: ${c.accentSecondary};
      --border: ${c.border};
      --hero-bg: ${c.heroBg};
    }
    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: ${c.fontPrimary};
      -webkit-font-smoothing: antialiased;
    }
    .font-arabic-display { font-family: 'IBM Plex Sans Arabic', ${c.fontSerif}; }
    .font-luxury-display { font-family: ${c.fontDisplay}; }
    .font-serif-body { font-family: ${c.fontSerif}; }
    
    /* Interactive Map Styles */
    .map-city-pin {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }
    .map-city-pin:hover, .map-city-pin.active {
      transform: scale(1.25);
      filter: drop-shadow(0 8px 16px rgba(0,0,0,0.25));
    }
    .route-path {
      stroke-dasharray: 6 4;
      animation: dashMove 30s linear infinite;
    }
    @keyframes dashMove {
      to { stroke-dashoffset: -1000; }
    }
  </style>
</head>
<body class="${isMobile ? 'w-[390px]' : 'w-[1440px]'} mx-auto overflow-x-hidden antialiased">

  <!-- ===================================================================
       CONCEPT IDENTITY STRIP (REVIEW HEADER)
  ==================================================================== -->
  <aside class="bg-[#1C1B18] text-[#F3EFE5] px-6 py-2.5 text-xs border-b border-white/10 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-[${c.accentSecondary}] text-white">
        ${c.id.toUpperCase()}
      </span>
      <strong class="font-luxury-display tracking-wider">${c.title}</strong>
      <span class="text-white/40 hidden md:inline">•</span>
      <span class="text-white/70 text-[11px] hidden md:inline">${c.tagline}</span>
    </div>
    <div class="flex items-center gap-3 text-[11px]">
      <a href="index.html" class="text-[${c.accentSecondaryLight}] hover:underline font-bold">← مقارنة المفاهيم الثلاثة</a>
      <span class="text-white/20">|</span>
      <a href="${c.id}-${isMobile ? 'desktop' : 'mobile'}.html" class="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-colors">
        ${isMobile ? 'عرض نسخة سطح المكتب (1440px)' : 'عرض نسخة الجوال (390px)'}
      </a>
    </div>
  </aside>

  <!-- ===================================================================
       1. TOP ROYAL BAR & NAVIGATION
  ==================================================================== -->
  <header class="sticky top-0 z-50 bg-[${c.cardBg}]/95 backdrop-blur-md border-b border-[${c.border}] transition-all">
    <!-- Sub-topline -->
    <div class="border-b border-[${c.border}]/50 px-6 py-1.5 text-[11px] text-[${c.textSecondary}] flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[${c.accentPrimary}]"></span>
        <span>خدمة سيارات خاصة فاخرة لضيوف الرحمن على مدار الساعة • الدفع نقداً 100% للسائق عند الوصول</span>
      </div>
      <div class="flex items-center gap-4">
        <span>المملكة العربية السعودية</span>
        <span>•</span>
        <span class="font-bold text-[${c.accentPrimary}]">SAR (الريال السعودي)</span>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="${containerClass} py-4 flex items-center justify-between">
      <!-- Brand Logo -->
      <a href="#" class="flex items-center gap-3.5 group">
        <img src="${c.logoSvg}" alt="Duyuf Alrahman VIP" class="h-11 w-auto object-contain">
      </a>

      ${!isMobile ? `
      <!-- Desktop Nav Links -->
      <nav class="flex items-center gap-7 text-xs font-bold text-[${c.textPrimary}]">
        <a href="#hero" class="hover:text-[${c.accentSecondary}] transition-colors pb-1 border-b-2 border-[${c.accentSecondary}]">الرئيسية</a>
        <a href="#fleet" class="hover:text-[${c.accentSecondary}] transition-colors pb-1 border-b-2 border-transparent">أسطول النخبة</a>
        <a href="#pricing" class="hover:text-[${c.accentSecondary}] transition-colors pb-1 border-b-2 border-transparent">جدول الأسعار</a>
        <a href="#map" class="hover:text-[${c.accentSecondary}] transition-colors pb-1 border-b-2 border-transparent">خريطة المسارات</a>
        <a href="#booking" class="hover:text-[${c.accentSecondary}] transition-colors pb-1 border-b-2 border-transparent">نظام الحجز</a>
        <a href="#reviews" class="hover:text-[${c.accentSecondary}] transition-colors pb-1 border-b-2 border-transparent">آراء الضيوف</a>
        <a href="#faq" class="hover:text-[${c.accentSecondary}] transition-colors pb-1 border-b-2 border-transparent">الأسئلة الشائعة</a>
      </nav>

      <!-- Nav CTA -->
      <div class="flex items-center gap-4">
        <a href="https://wa.me/966567588261" target="_blank" rel="noopener noreferrer" 
           class="flex items-center gap-2 text-xs font-bold text-[${c.accentPrimary}] hover:text-[${c.accentSecondary}] transition-colors">
          <span>الكونسيرج الملكي</span>
        </a>
        <a href="#booking" class="px-5 py-2.5 rounded-lg bg-[${c.accentPrimary}] hover:bg-[${c.accentPrimaryLight}] text-[${c.bg}] font-extrabold text-xs tracking-wider transition-all shadow-sm active:scale-95">
          احجز رحلتك الآن ←
        </a>
      </div>
      ` : `
      <!-- Mobile Nav Trigger -->
      <div class="flex items-center gap-2">
        <a href="#booking" class="px-3 py-1.5 rounded-md bg-[${c.accentPrimary}] text-[${c.bg}] text-[10px] font-bold">
          احجز الآن
        </a>
      </div>
      `}
    </div>
  </header>

  <!-- ===================================================================
       2. CINEMATIC HERO SECTION
  ==================================================================== -->
  <section id="hero" class="relative ${isMobile ? 'min-h-[580px] py-12' : 'min-h-[660px] py-20'} flex items-center justify-center bg-[${c.heroBg}] text-white overflow-hidden">
    <!-- Real Cinematic Background Image -->
    <div class="absolute inset-0 z-0">
      <img src="${key === 'a' ? '/assets/images/reference/hero-gmc-saudi.jpg' : (key === 'b' ? '/assets/blueprint/routes/hero-arrival.webp' : '/assets/images/vip-umrah-transport-jeddah-to-makkah.webp')}" 
           alt="Duyuf Alrahman VIP Chauffeur" 
           class="w-full h-full object-cover object-center opacity-40 filter contrast-105">
      <div class="absolute inset-0 bg-gradient-to-t from-[${c.heroBg}] via-[${c.heroBg}]/60 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[${c.heroBg}]/80 via-transparent to-[${c.heroBg}]/80"></div>
    </div>

    <div class="relative z-10 ${containerClass} text-center">
      <!-- Monumental Architectural Eyebrow -->
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[${c.accentSecondary}]/50 bg-[${c.accentPrimary}]/40 text-xs font-semibold text-[${c.bg}] tracking-wider mb-6 backdrop-blur-md">
        <span class="w-2 h-2 rounded-full bg-[${c.accentSecondary}]"></span>
        <span>ضيافة سعودية معاصرة • نقل ملكي خاص بين الحرمين الشريفين والمطارات</span>
      </div>

      <!-- Hero Headline Required by Section 06 -->
      <h1 class="font-arabic-display font-bold ${isMobile ? 'text-2xl leading-relaxed' : 'text-5xl lg:text-6xl leading-[1.28]'} text-[#FBF9F4] mb-5 drop-shadow-md">
        رحلتك في المملكة..<br>
        <span class="text-[${c.accentSecondaryLight}] font-serif-body">تجربة استثنائية من البداية إلى الوصول</span>
      </h1>

      <p class="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
        أسطول فاخر معقم، سائقون محترفون بمعايير بروتوكولية، وأسعار محددة وثابتة بالريال السعودي.
        الدفع نقداً 100% مباشرة للسائق بعد الوصول بسلامة الله.
      </p>

      <!-- Integrated Luxury Booking Console -->
      <div class="bg-[${c.cardBg}] text-[${c.textPrimary}] rounded-2xl p-6 ${isMobile ? 'p-4' : 'p-6 max-w-4xl'} mx-auto border border-[${c.border}] shadow-2xl text-start">
        <div class="flex items-center justify-between border-b border-[${c.border}]/60 pb-3 mb-5">
          <div class="flex items-center gap-4 text-xs font-bold">
            <span class="text-[${c.accentPrimary}] pb-2 border-b-2 border-[${c.accentPrimary}]">رحلة بين المدن والمطارات</span>
            <span class="text-[${c.textSecondary}] hover:text-[${c.textPrimary}] pb-2 cursor-pointer">جولات الزيارات والمزارات</span>
          </div>
          <span class="text-[11px] text-[${c.accentSecondary}] font-bold">بدون أي عربون أو بطاقة بنكية</span>
        </div>

        <div class="grid grid-cols-1 ${!isMobile ? 'md:grid-cols-4' : ''} gap-3">
          <!-- Field 1: Pickup -->
          <div class="bg-[${c.bg}] p-3 rounded-xl border border-[${c.border}]">
            <label class="block text-[10px] font-extrabold uppercase tracking-wider text-[${c.textSecondary}] mb-1">نقطة الانطلاق (من)</label>
            <select class="w-full bg-transparent text-xs font-bold text-[${c.textPrimary}] focus:outline-none cursor-pointer">
              <option>مطار جدة (صالة 1 أو الصالة الشمالية)</option>
              <option>مكة المكرمة (الفندق / الحرم)</option>
              <option>المدينة المنورة (الفندق / الحرم)</option>
              <option>مطار المدينة المنورة</option>
              <option>مدينة الرياض</option>
            </select>
          </div>

          <!-- Field 2: Dropoff -->
          <div class="bg-[${c.bg}] p-3 rounded-xl border border-[${c.border}]">
            <label class="block text-[10px] font-extrabold uppercase tracking-wider text-[${c.textSecondary}] mb-1">الوجهة (إلى)</label>
            <select class="w-full bg-transparent text-xs font-bold text-[${c.textPrimary}] focus:outline-none cursor-pointer">
              <option>مكة المكرمة (الحرم والفنادق)</option>
              <option>المدينة المنورة (المسجد النبوي)</option>
              <option>مطار جدة الدولي</option>
              <option>مطار المدينة المنورة</option>
              <option>الطائف (الهدا وميقات قرن المنازل)</option>
            </select>
          </div>

          <!-- Field 3: Date & Passengers -->
          <div class="bg-[${c.bg}] p-3 rounded-xl border border-[${c.border}]">
            <label class="block text-[10px] font-extrabold uppercase tracking-wider text-[${c.textSecondary}] mb-1">التاريخ والركاب</label>
            <div class="flex items-center justify-between text-xs font-bold text-[${c.textPrimary}]">
              <span>اليوم • 2 ركاب</span>
              <span class="text-[${c.accentSecondary}]">تعديل</span>
            </div>
          </div>

          <!-- Action Button -->
          <div class="flex items-center">
            <a href="#fleet" class="w-full h-full min-h-[50px] rounded-xl bg-[${c.accentPrimary}] hover:bg-[${c.accentPrimaryLight}] text-[${c.bg}] font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95">
              <span>عرض السيارات والأسعار</span>
              <span>←</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Trust Pillars under Hero -->
      <div class="grid grid-cols-2 ${!isMobile ? 'md:grid-cols-4' : ''} gap-4 max-w-4xl mx-auto mt-10 text-start text-xs text-slate-300">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div class="w-8 h-8 rounded-lg bg-[${c.accentSecondary}]/20 text-[${c.accentSecondary}] flex items-center justify-center font-bold">✓</div>
          <div><strong class="block text-white">دفع نقدي 100%</strong><span class="text-[10px] text-slate-400">للسائق بعد الوصول</span></div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div class="w-8 h-8 rounded-lg bg-[${c.accentSecondary}]/20 text-[${c.accentSecondary}] flex items-center justify-center font-bold">✓</div>
          <div><strong class="block text-white">أسعار ثابتة معتمدة</strong><span class="text-[10px] text-slate-400">بدون أي رسوم خفية</span></div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div class="w-8 h-8 rounded-lg bg-[${c.accentSecondary}]/20 text-[${c.accentSecondary}] flex items-center justify-center font-bold">✓</div>
          <div><strong class="block text-white">أسطول 2024–2025</strong><span class="text-[10px] text-slate-400">نظافة وتعقيم فندقي</span></div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div class="w-8 h-8 rounded-lg bg-[${c.accentSecondary}]/20 text-[${c.accentSecondary}] flex items-center justify-center font-bold">✓</div>
          <div><strong class="block text-white">سائقون مرخصون</strong><span class="text-[10px] text-slate-400">خبرة بطرق الحرمين</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       3. SIGNATURE FLEET SHOWCASE — DISTINCT VEHICLE CARD ART DIRECTION
  ==================================================================== -->
  <section id="fleet" class="${containerClass} py-20">
    <div class="text-center max-w-3xl mx-auto mb-14">
      <span class="text-xs font-extrabold uppercase tracking-widest text-[${c.accentSecondary}] block mb-2">
        ROYAL FLEET SHOWCASE
      </span>
      <h2 class="font-arabic-display font-bold ${isMobile ? 'text-2xl' : 'text-4xl'} text-[${c.textPrimary}] tracking-tight mb-4">
        أسطول النخبة المعتمد للرحلات المقدسة
      </h2>
      <p class="text-xs sm:text-sm text-[${c.textSecondary}] leading-relaxed">
        تصميم مستقل ومخصص لكل فئة من فئات الأسطول يعكس طبيعة رحلتها وسعتها بدقة، بعيداً عن القوالب المكررة.
      </p>
    </div>

    <!-- 1. FLAGSHIP VEHICLE SHOWCASE (GMC YUKON XL) -->
    <div class="mb-12 bg-[${c.cardBg}] rounded-3xl border border-[${c.border}] p-6 lg:p-10 shadow-lg relative overflow-hidden">
      <div class="grid grid-cols-1 ${!isMobile ? 'lg:grid-cols-12' : ''} gap-8 items-center">
        <!-- Visual Column -->
        <div class="${!isMobile ? 'lg:col-span-7' : ''} relative">
          <div class="bg-[${c.bg}] rounded-2xl p-6 border border-[${c.border}] flex items-center justify-center relative min-h-[300px]">
            <img src="/assets/blueprint/vehicles/gmc-yukon-xl.webp" alt="GMC Yukon XL VIP" class="w-full max-h-[320px] object-contain filter drop-shadow-xl">
            <span class="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[${c.accentPrimary}] text-white tracking-widest uppercase">
              المركبة الرائدة • FLAGSHIP VIP
            </span>
          </div>
          <!-- Interior Thumbnails -->
          <div class="grid grid-cols-2 gap-3 mt-3">
            <div class="rounded-xl overflow-hidden border border-[${c.border}] h-24 bg-[${c.bg}]">
              <img src="/assets/blueprint/vehicles/gmc-yukon-xl-interior.webp" alt="Yukon Cabin" class="w-full h-full object-cover">
            </div>
            <div class="rounded-xl overflow-hidden border border-[${c.border}] h-24 bg-[${c.bg}]">
              <img src="/assets/blueprint/vehicles/gmc-yukon-xl-exterior.webp" alt="Yukon Exterior Stance" class="w-full h-full object-cover">
            </div>
          </div>
        </div>

        <!-- Spec & Editorial Column -->
        <div class="${!isMobile ? 'lg:col-span-5' : ''} flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold text-[${c.accentSecondary}] uppercase tracking-wider mb-2">FULL-SIZE LUXURY SUV</div>
            <h3 class="font-arabic-display font-bold text-3xl text-[${c.textPrimary}] mb-3">جي إم سي يوكن XL</h3>
            <p class="text-xs sm:text-sm text-[${c.textSecondary}] leading-relaxed mb-6 font-normal">
              حضور قيادي مهيب وهدوء عزل صوتي استثنائي للرحلات الطويلة بين جدة ومكة والمدينة، مع سعة فائقة للركاب والأمتعة وصناديق ماء زمزم.
            </p>

            <!-- Verified Specifications -->
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div class="p-3 rounded-xl bg-[${c.bg}] border border-[${c.border}]">
                <span class="block text-[10px] text-[${c.textSecondary}] uppercase font-bold">سعة الركاب</span>
                <strong class="text-sm font-extrabold text-[${c.textPrimary}]">7 ركاب VIP</strong>
              </div>
              <div class="p-3 rounded-xl bg-[${c.bg}] border border-[${c.border}]">
                <span class="block text-[10px] text-[${c.textSecondary}] uppercase font-bold">سعة الحقائب</span>
                <strong class="text-sm font-extrabold text-[${c.textPrimary}]">8 حقائب كبيرة</strong>
              </div>
              <div class="p-3 rounded-xl bg-[${c.bg}] border border-[${c.border}]">
                <span class="block text-[10px] text-[${c.textSecondary}] uppercase font-bold">نظام التكييف</span>
                <strong class="text-xs font-bold text-[${c.textPrimary}]">ثلاثي المناطق بفتحات سقفية</strong>
              </div>
              <div class="p-3 rounded-xl bg-[${c.bg}] border border-[${c.border}]">
                <span class="block text-[10px] text-[${c.textSecondary}] uppercase font-bold">السعر المعتمد</span>
                <strong class="text-sm font-extrabold text-[${c.accentSecondary}]">يبدأ من 450 ريال</strong>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 pt-4 border-t border-[${c.border}]">
            <a href="#booking" class="flex-1 py-3 rounded-xl bg-[${c.accentPrimary}] hover:bg-[${c.accentPrimaryLight}] text-[${c.bg}] text-center font-bold text-xs transition-colors shadow-sm">
              احجز يوكن XL الآن ←
            </a>
            <a href="#specs" class="px-5 py-3 rounded-xl border border-[${c.border}] hover:border-[${c.accentSecondary}] text-[${c.textPrimary}] font-bold text-xs transition-colors">
              المواصفات الكاملة
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. EXECUTIVE SEDAN & LUXURY MPV (TWO-COLUMN SYSTEM) -->
    <div class="grid grid-cols-1 ${!isMobile ? 'md:grid-cols-2' : ''} gap-8 mb-12">
      <!-- TOYOTA CAMRY -->
      <article class="bg-[${c.cardBg}] rounded-2xl border border-[${c.border}] p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div class="bg-[${c.bg}] rounded-xl p-4 border border-[${c.border}] mb-5 relative min-h-[200px] flex items-center justify-center">
            <img src="/assets/blueprint/vehicles/toyota-camry.webp" alt="Toyota Camry" class="max-h-[170px] object-contain">
            <span class="absolute top-3 right-3 text-[10px] font-bold text-[${c.textSecondary}] bg-white/70 px-2 py-0.5 rounded">01 / 05</span>
          </div>
          <div class="text-[11px] font-bold text-[${c.accentSecondary}] uppercase mb-1">EXECUTIVE SEDAN</div>
          <h3 class="font-arabic-display font-bold text-2xl text-[${c.textPrimary}] mb-2">تويوتا كامري</h3>
          <p class="text-xs text-[${c.textSecondary}] leading-relaxed mb-5">
            سيدان تنفيذية مريحة للأزواج والعائلات الصغيرة، مثالية للتنقلات السريعة ومطار جدة مع تكييف متطور.
          </p>
          <div class="flex items-center gap-4 text-xs font-bold text-[${c.textPrimary}] p-3 rounded-lg bg-[${c.bg}] mb-6">
            <span>4 ركاب</span>
            <span>•</span>
            <span>3 حقائب</span>
            <span>•</span>
            <span class="text-[${c.accentSecondary}]">من 450 ريال (جدة ↔ مكة)</span>
          </div>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-[${c.border}]">
          <a href="#booking" class="flex-1 py-2.5 rounded-lg bg-[${c.accentPrimary}] text-[${c.bg}] font-bold text-xs text-center">حجز كامري</a>
          <a href="#specs" class="px-4 py-2.5 rounded-lg border border-[${c.border}] text-xs font-bold">التفاصيل</a>
        </div>
      </article>

      <!-- HYUNDAI STARIA VIP -->
      <article class="bg-[${c.cardBg}] rounded-2xl border border-[${c.border}] p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div class="bg-[${c.bg}] rounded-xl p-4 border border-[${c.border}] mb-5 relative min-h-[200px] flex items-center justify-center">
            <img src="/assets/blueprint/vehicles/hyundai-staria.webp" alt="Hyundai Staria VIP" class="max-h-[170px] object-contain">
            <span class="absolute top-3 right-3 text-[10px] font-bold text-[${c.textSecondary}] bg-white/70 px-2 py-0.5 rounded">02 / 05</span>
          </div>
          <div class="text-[11px] font-bold text-[${c.accentSecondary}] uppercase mb-1">PREMIUM CAPTAIN-SEATS MPV</div>
          <h3 class="font-arabic-display font-bold text-2xl text-[${c.textPrimary}] mb-2">هيونداي ستاريا VIP</h3>
          <p class="text-xs text-[${c.textSecondary}] leading-relaxed mb-5">
            مقصورة مستقبلية بمقاعد كابتن مستقلة وأرضية منخفضة لسهولة صعود كبار السن، ورحابة عائلية فائقة.
          </p>
          <div class="flex items-center gap-4 text-xs font-bold text-[${c.textPrimary}] p-3 rounded-lg bg-[${c.bg}] mb-6">
            <span>7 ركاب VIP</span>
            <span>•</span>
            <span class="text-[${c.accentPrimary}] font-extrabold">6 حقائب فقط (قيد صارم)</span>
            <span>•</span>
            <span class="text-[${c.accentSecondary}]">من 450 ريال</span>
          </div>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-[${c.border}]">
          <a href="#booking" class="flex-1 py-2.5 rounded-lg bg-[${c.accentPrimary}] text-[${c.bg}] font-bold text-xs text-center">حجز ستاريا VIP</a>
          <a href="#specs" class="px-4 py-2.5 rounded-lg border border-[${c.border}] text-xs font-bold">التفاصيل</a>
        </div>
      </article>
    </div>

    <!-- 3. GROUP COACHES (TOYOTA HIACE & COASTER) -->
    <div class="grid grid-cols-1 ${!isMobile ? 'md:grid-cols-2' : ''} gap-8 mb-12">
      <!-- TOYOTA HIACE -->
      <article class="bg-[${c.cardBg}] rounded-2xl border border-[${c.border}] p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div class="bg-[${c.bg}] rounded-xl p-4 border border-[${c.border}] mb-5 relative min-h-[200px] flex items-center justify-center">
            <img src="/assets/blueprint/vehicles/toyota-hiace.webp" alt="Toyota HiAce VIP" class="max-h-[170px] object-contain">
            <span class="absolute top-3 right-3 text-[10px] font-bold text-[${c.textSecondary}] bg-white/70 px-2 py-0.5 rounded">04 / 05</span>
          </div>
          <div class="text-[11px] font-bold text-[${c.accentSecondary}] uppercase mb-1">GROUP EXECUTIVE VAN</div>
          <h3 class="font-arabic-display font-bold text-2xl text-[${c.textPrimary}] mb-2">تويوتا هايس VIP</h3>
          <p class="text-xs text-[${c.textSecondary}] leading-relaxed mb-5">
            سقف عالي ومساحة رحبة تجمع العائلات الكبيرة والمجموعات في مركبة واحدة مكيفة بفتحات سقفية لكل مقعد.
          </p>
          <div class="flex items-center gap-4 text-xs font-bold text-[${c.textPrimary}] p-3 rounded-lg bg-[${c.bg}] mb-6">
            <span>10 ركاب</span>
            <span>•</span>
            <span>10 حقائب</span>
            <span>•</span>
            <span class="text-[${c.accentSecondary}]">سقف مرتفع</span>
          </div>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-[${c.border}]">
          <a href="#booking" class="flex-1 py-2.5 rounded-lg bg-[${c.accentPrimary}] text-[${c.bg}] font-bold text-xs text-center">حجز هايس</a>
          <a href="#specs" class="px-4 py-2.5 rounded-lg border border-[${c.border}] text-xs font-bold">التفاصيل</a>
        </div>
      </article>

      <!-- TOYOTA COASTER -->
      <article class="bg-[${c.cardBg}] rounded-2xl border border-[${c.border}] p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div class="bg-[${c.bg}] rounded-xl p-4 border border-[${c.border}] mb-5 relative min-h-[200px] flex items-center justify-center">
            <img src="/assets/blueprint/vehicles/toyota-coaster.webp" alt="Toyota Coaster VIP" class="max-h-[170px] object-contain">
            <span class="absolute top-3 right-3 text-[10px] font-bold text-[${c.textSecondary}] bg-white/70 px-2 py-0.5 rounded">05 / 05</span>
          </div>
          <div class="text-[11px] font-bold text-[${c.accentSecondary}] uppercase mb-1">EXECUTIVE GROUP COACH</div>
          <h3 class="font-arabic-display font-bold text-2xl text-[${c.textPrimary}] mb-2">تويوتا كوستر VIP</h3>
          <p class="text-xs text-[${c.textSecondary}] leading-relaxed mb-5">
            حافلة تنفيذية فاخرة لوفود المعتمرين والمجموعات السياحية مع مقصورة خلفية رحبة تتسع لـ 20 حقيبة.
          </p>
          <div class="flex items-center gap-4 text-xs font-bold text-[${c.textPrimary}] p-3 rounded-lg bg-[${c.bg}] mb-6">
            <span>21 راكب</span>
            <span>•</span>
            <span>20 حقيبة</span>
            <span>•</span>
            <span class="text-[${c.accentSecondary}]">سعة وفود</span>
          </div>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-[${c.border}]">
          <a href="#booking" class="flex-1 py-2.5 rounded-lg bg-[${c.accentPrimary}] text-[${c.bg}] font-bold text-xs text-center">حجز كوستر</a>
          <a href="#specs" class="px-4 py-2.5 rounded-lg border border-[${c.border}] text-xs font-bold">التفاصيل</a>
        </div>
      </article>
    </div>

    <!-- 4. BESPOKE VIP CONCIERGE BAND (MAYBACH & H1) -->
    <div class="bg-[${c.accentPrimary}] text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden shadow-xl">
      <div class="grid grid-cols-1 ${!isMobile ? 'lg:grid-cols-12' : ''} gap-8 items-center">
        <div class="${!isMobile ? 'lg:col-span-6' : ''}">
          <span class="text-xs font-bold uppercase tracking-widest text-[${c.accentSecondaryLight}] block mb-2">
            EXCLUSIVE CONCIERGE SERVICE
          </span>
          <h3 class="font-arabic-display font-bold text-3xl mb-4 text-[#FBF9F4]">
            خدمة الكونسيرج الملكي<br>
            <span class="text-[${c.accentSecondaryLight}] font-serif-body">مركبات خاصة للطلبات المتميزة</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 font-light">
            مرسيدس مايباخ وهيونداي H1 متاحة فقط للطلبات الخاصة المسبقة عبر مستشار الكونسيرج الملكي على واتساب، لضمان أعلى معايير البروتوكول والعناية. لا تتوفر للحجز الفوري التلقائي.
          </p>
          <a href="https://wa.me/966567588261?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%AC%D8%B2%20%D9%83%D9%88%D9%86%D8%B3%D9%8A%D8%B1%D8%AC%20%D8%AE%D8%A7%D8%B5" 
             target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[${c.accentSecondary}] hover:bg-[${c.accentSecondaryLight}] text-white font-extrabold text-xs transition-all shadow-md">
            <span>تواصل مع الكونسيرج الملكي عبر واتساب</span>
            <span>←</span>
          </a>
        </div>
        <div class="${!isMobile ? 'lg:col-span-6' : ''} grid grid-cols-2 gap-4">
          <div class="bg-black/25 rounded-2xl p-4 border border-white/10 text-center">
            <img src="/assets/blueprint/vehicles/mercedes-maybach.webp" alt="Mercedes Maybach S-Class" class="h-28 mx-auto object-contain mb-2">
            <strong class="block text-xs text-white">Mercedes-Maybach</strong>
            <span class="text-[10px] text-[${c.accentSecondaryLight}]">صالون الدرجة الأولى</span>
          </div>
          <div class="bg-black/25 rounded-2xl p-4 border border-white/10 text-center">
            <img src="/assets/blueprint/vehicles/hyundai-h1.webp" alt="Hyundai H1" class="h-28 mx-auto object-contain mb-2">
            <strong class="block text-xs text-white">Hyundai H1</strong>
            <span class="text-[10px] text-[${c.accentSecondaryLight}]">فان كونسيرج خاص</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       4. INTERACTIVE SAUDI ARABIA MAP EXPERIENCE
  ==================================================================== -->
  <section id="map" class="bg-[${c.cardBg}] py-20 border-y border-[${c.border}]">
    <div class="${containerClass}">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <span class="text-xs font-extrabold uppercase tracking-widest text-[${c.accentSecondary}] block mb-2">
          KINGDOM COVERAGE &amp; SACRED ROUTES
        </span>
        <h2 class="font-arabic-display font-bold ${isMobile ? 'text-2xl' : 'text-4xl'} text-[${c.textPrimary}] tracking-tight mb-4">
          شبكة مسارات النقل الملكي المعتمدة في المملكة
        </h2>
        <p class="text-xs sm:text-sm text-[${c.textSecondary}] leading-relaxed">
          تغطية شاملة ومباشرة بين المدن المقدسة والمطارات الدولية، مع تتبع دقيق للمسافات ومواقيت الإحرام.
        </p>
      </div>

      <div class="grid grid-cols-1 ${!isMobile ? 'lg:grid-cols-12' : ''} gap-8 items-center">
        <!-- Interactive Vector Map Box -->
        <div class="${!isMobile ? 'lg:col-span-7' : ''} bg-[${c.bg}] rounded-3xl border border-[${c.border}] p-6 relative overflow-hidden shadow-inner">
          <div class="flex items-center justify-between text-xs font-bold text-[${c.textSecondary}] mb-4">
            <span>خريطة تفاعلية للمسارات الغربية والوسطى</span>
            <span class="text-[${c.accentPrimary}]">اضغط على أي مدينة لاستعراض المسار</span>
          </div>

          <!-- SVG Visual Map -->
          <svg viewBox="0 0 700 520" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <!-- Kingdom Contour Outline -->
            <path d="M 80,180 Q 200,80 400,60 Q 600,80 650,220 Q 580,380 450,450 Q 250,480 120,380 Z" 
                  fill="${c.cardBg}" stroke="${c.border}" stroke-width="2"/>
            
            <!-- Hijaz Mountains Shading -->
            <path d="M 120,200 Q 180,280 230,390" fill="none" stroke="${c.border}" stroke-width="28" stroke-opacity="0.2" stroke-linecap="round"/>

            <!-- Route Highway Paths -->
            <!-- Jeddah to Makkah -->
            <line x1="160" y1="290" x2="220" y2="330" stroke="${c.accentSecondary}" stroke-width="4" stroke-linecap="round"/>
            <!-- Makkah to Madinah -->
            <line x1="220" y1="330" x2="210" y2="160" stroke="${c.accentPrimary}" stroke-width="4" stroke-dasharray="6 4" class="route-path"/>
            <!-- Makkah to Taif -->
            <line x1="220" y1="330" x2="290" y2="350" stroke="${c.accentSecondary}" stroke-width="3" stroke-linecap="round"/>
            <!-- Riyadh to Makkah/Madinah Connection -->
            <path d="M 520,260 Q 360,280 220,330" fill="none" stroke="${c.border}" stroke-width="2.5" stroke-dasharray="4 4"/>
            <path d="M 520,260 Q 370,190 210,160" fill="none" stroke="${c.border}" stroke-width="2.5" stroke-dasharray="4 4"/>

            <!-- City Pins & Landmarks -->
            <!-- 1. JEDDAH -->
            <g class="map-city-pin" transform="translate(160, 290)">
              <circle cx="0" cy="0" r="10" fill="${c.accentPrimary}"/>
              <circle cx="0" cy="0" r="4" fill="#FFFFFF"/>
              <text x="14" y="5" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="${c.textPrimary}">جدة (مطار الملك عبد العزيز)</text>
            </g>

            <!-- 2. MAKKAH -->
            <g class="map-city-pin active" transform="translate(220, 330)">
              <circle cx="0" cy="0" r="14" fill="${c.accentSecondary}" fill-opacity="0.3"/>
              <circle cx="0" cy="0" r="10" fill="${c.accentSecondary}"/>
              <circle cx="0" cy="0" r="4" fill="#FFFFFF"/>
              <text x="-12" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" fill="${c.textPrimary}" text-anchor="middle">مكة المكرمة</text>
            </g>

            <!-- 3. MADINAH -->
            <g class="map-city-pin" transform="translate(210, 160)">
              <circle cx="0" cy="0" r="10" fill="${c.accentPrimary}"/>
              <circle cx="0" cy="0" r="4" fill="#FFFFFF"/>
              <text x="-12" y="-14" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" fill="${c.textPrimary}" text-anchor="middle">المدينة المنورة</text>
            </g>

            <!-- 4. TAIF -->
            <g class="map-city-pin" transform="translate(290, 350)">
              <circle cx="0" cy="0" r="7" fill="${c.accentPrimary}"/>
              <circle cx="0" cy="0" r="3" fill="#FFFFFF"/>
              <text x="12" y="4" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="${c.textPrimary}">الطائف (ميقات قرن المنازل)</text>
            </g>

            <!-- 5. RIYADH -->
            <g class="map-city-pin" transform="translate(520, 260)">
              <circle cx="0" cy="0" r="9" fill="${c.textPrimary}"/>
              <circle cx="0" cy="0" r="3" fill="#FFFFFF"/>
              <text x="14" y="5" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="${c.textPrimary}">الرياض (العاصمة)</text>
            </g>
          </svg>
        </div>

        <!-- Route Intelligence Panel -->
        <div class="${!isMobile ? 'lg:col-span-5' : ''} space-y-4">
          <!-- Active Route Card: Jeddah -> Makkah -->
          <div class="p-5 rounded-2xl bg-[${c.bg}] border-2 border-[${c.accentSecondary}] shadow-sm">
            <div class="flex items-center justify-between text-xs font-bold text-[${c.accentSecondary}] mb-1">
              <span>المسار الأكثر طلباً • POPULAR ROUTE</span>
              <span>مباشر عبر طريق الحرمين</span>
            </div>
            <h4 class="font-arabic-display font-bold text-xl text-[${c.textPrimary}] mb-3">مطار جدة ↔ مكة المكرمة</h4>
            <div class="grid grid-cols-3 gap-2 text-center text-xs mb-4">
              <div class="p-2 rounded-lg bg-[${c.cardBg}] border border-[${c.border}]">
                <span class="block text-[10px] text-[${c.textSecondary}]">المسافة</span>
                <strong class="font-extrabold text-[${c.textPrimary}]">85 كم</strong>
              </div>
              <div class="p-2 rounded-lg bg-[${c.cardBg}] border border-[${c.border}]">
                <span class="block text-[10px] text-[${c.textSecondary}]">زمن الرحلة</span>
                <strong class="font-extrabold text-[${c.textPrimary}]">60–75 دقيقة</strong>
              </div>
              <div class="p-2 rounded-lg bg-[${c.cardBg}] border border-[${c.border}]">
                <span class="block text-[10px] text-[${c.textSecondary}]">السعر المعتمد</span>
                <strong class="font-extrabold text-[${c.accentSecondary}]">من 450 ريال</strong>
              </div>
            </div>
            <p class="text-xs text-[${c.textSecondary}] leading-relaxed mb-4">
              استقبال رسمي بصالة القدوم مع لافتة الاسم، ومساعدة كاملة في تحميل الحقائب وعبور طريق الأمير محمد بن سلمان السريع إلى باب الفندق بمكة.
            </p>
            <a href="#booking" class="block w-full py-2.5 rounded-lg bg-[${c.accentPrimary}] text-[${c.bg}] font-bold text-xs text-center">
              حجز مسار جدة إلى مكة ←
            </a>
          </div>

          <!-- Secondary Route: Makkah -> Madinah -->
          <div class="p-4 rounded-xl bg-[${c.cardBg}] border border-[${c.border}]">
            <div class="flex items-center justify-between">
              <div>
                <strong class="block text-sm font-bold text-[${c.textPrimary}]">مكة المكرمة ↔ المدينة المنورة</strong>
                <span class="text-xs text-[${c.textSecondary}]">420 كم • 4 إلى 4.5 ساعات • راحة على طريق الهجرة</span>
              </div>
              <span class="text-xs font-extrabold text-[${c.accentSecondary}]">من 550 ريال</span>
            </div>
          </div>

          <!-- Secondary Route: Riyadh -> Makkah/Madinah -->
          <div class="p-4 rounded-xl bg-[${c.cardBg}] border border-[${c.border}]">
            <div class="flex items-center justify-between">
              <div>
                <strong class="block text-sm font-bold text-[${c.textPrimary}]">الرياض ↔ مكة المكرمة / المدينة</strong>
                <span class="text-xs text-[${c.textSecondary}]">رحلات خاصة للمسافات الطويلة • خدمة VIP</span>
              </div>
              <span class="text-xs font-extrabold text-[${c.accentSecondary}]">من 650 ريال</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       5. ROUTE-FIRST PRICING MATRIX
  ==================================================================== -->
  <section id="pricing" class="${containerClass} py-20">
    <div class="text-center max-w-3xl mx-auto mb-14">
      <span class="text-xs font-extrabold uppercase tracking-widest text-[${c.accentSecondary}] block mb-2">
        TRANSPARENT AUTHORITATIVE FARES
      </span>
      <h2 class="font-arabic-display font-bold ${isMobile ? 'text-2xl' : 'text-4xl'} text-[${c.textPrimary}] tracking-tight mb-4">
        جدول الأسعار المعتمدة — شفافية تامة بدون زيادة
      </h2>
      <p class="text-xs sm:text-sm text-[${c.textSecondary}] leading-relaxed">
        أسعار ثابتة ومحددة سلفاً بالريال السعودي تشمل الوقود والرسوم والضريبة ومتابعة الرحلات الجوية.
      </p>
    </div>

    <!-- Pricing Comparison Table -->
    <div class="bg-[${c.cardBg}] rounded-2xl border border-[${c.border}] shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-start border-collapse text-xs sm:text-sm">
          <thead>
            <tr class="bg-[${c.accentPrimary}] text-white text-xs font-bold uppercase tracking-wider">
              <th class="py-4 px-6 text-start">المسار المعتمد</th>
              <th class="py-4 px-4 text-center">تويوتا كامري (4 ركاب)</th>
              <th class="py-4 px-4 text-center">هيونداي ستاريا (7 ركاب / 6 حقائب)</th>
              <th class="py-4 px-4 text-center">يوكن XL (7 ركاب / 8 حقائب)</th>
              <th class="py-4 px-4 text-center">تويوتا هايس (10 ركاب)</th>
              <th class="py-4 px-4 text-center">تويوتا كوستر (21 راكب)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[${c.border}] text-slate-800">
            <tr class="hover:bg-[${c.bg}]/50 transition-colors">
              <td class="py-4 px-6 font-bold text-[${c.textPrimary}]">مطار جدة ↔ مكة المكرمة</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">450 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">450 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">450 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">550 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">750 ر.س</td>
            </tr>
            <tr class="hover:bg-[${c.bg}]/50 transition-colors">
              <td class="py-4 px-6 font-bold text-[${c.textPrimary}]">مكة المكرمة ↔ المدينة المنورة</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">550 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">550 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">550 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">700 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">950 ر.س</td>
            </tr>
            <tr class="hover:bg-[${c.bg}]/50 transition-colors">
              <td class="py-4 px-6 font-bold text-[${c.textPrimary}]">مطار المدينة ↔ المدينة المنورة</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">550 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">550 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">550 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">650 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">850 ر.س</td>
            </tr>
            <tr class="hover:bg-[${c.bg}]/50 transition-colors">
              <td class="py-4 px-6 font-bold text-[${c.textPrimary}]">مكة المكرمة ↔ الطائف (الهدا / الميقات)</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">500 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">500 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">500 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">650 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">850 ر.س</td>
            </tr>
            <tr class="hover:bg-[${c.bg}]/50 transition-colors">
              <td class="py-4 px-6 font-bold text-[${c.textPrimary}]">الرياض ↔ مكة المكرمة</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">650 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">650 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">650 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">800 ر.س</td>
              <td class="py-4 px-4 text-center font-extrabold text-[${c.accentSecondary}]">1,100 ر.س</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 bg-[${c.bg}] border-t border-[${c.border}] flex items-center justify-between text-xs text-[${c.textSecondary}]">
        <span>* تنويه بروتوكولي: مطار الرياض غير متاح للحجز التلقائي الفوري، ومركبات مايباخ وهيونداي H1 عبر الكونسيرج فقط.</span>
        <a href="#booking" class="font-bold text-[${c.accentPrimary}] hover:underline">بدء الحجز الفوري ←</a>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       6. 5-STEP LUXURY BOOKING EXPERIENCE
  ==================================================================== -->
  <section id="booking" class="bg-[${c.bg}] py-20 border-t border-[${c.border}]">
    <div class="${containerClass}">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <span class="text-xs font-extrabold uppercase tracking-widest text-[${c.accentSecondary}] block mb-2">
          5-STEP REASSURING BOOKING CONSOLE
        </span>
        <h2 class="font-arabic-display font-bold ${isMobile ? 'text-2xl' : 'text-4xl'} text-[${c.textPrimary}] tracking-tight mb-4">
          حجز رحلتك الملكية بخطوات سهلة ومؤكدة
        </h2>
        <p class="text-xs sm:text-sm text-[${c.textSecondary}] leading-relaxed">
          نظام حجز صريح ومباشر: لا يتطلب بطاقة ائتمانية، بدون خيارات غير مرغوبة، ودفع نقدي 100% للسائق عند الوصول.
        </p>
      </div>

      <!-- 5-Step Visual Progression -->
      <div class="max-w-4xl mx-auto bg-[${c.cardBg}] rounded-3xl border border-[${c.border}] p-6 lg:p-10 shadow-xl">
        <div class="flex items-center justify-between border-b border-[${c.border}] pb-6 mb-8 text-xs font-bold text-[${c.textSecondary}] overflow-x-auto gap-4">
          <div class="flex items-center gap-2 text-[${c.accentPrimary}]">
            <span class="w-6 h-6 rounded-full bg-[${c.accentPrimary}] text-white flex items-center justify-center text-[10px]">1</span>
            <span>تفاصيل المسار</span>
          </div>
          <span>←</span>
          <div class="flex items-center gap-2 text-[${c.accentPrimary}]">
            <span class="w-6 h-6 rounded-full bg-[${c.accentPrimary}] text-white flex items-center justify-center text-[10px]">2</span>
            <span>اختيار المركبة</span>
          </div>
          <span>←</span>
          <div class="flex items-center gap-2 text-[${c.accentSecondary}] font-extrabold">
            <span class="w-6 h-6 rounded-full bg-[${c.accentSecondary}] text-white flex items-center justify-center text-[10px]">3</span>
            <span>بيانات العميل (الإيميل إلزامي)</span>
          </div>
          <span>←</span>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">4</span>
            <span>مراجعة الحجز</span>
          </div>
          <span>←</span>
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">5</span>
            <span>تأكيد الحجز</span>
          </div>
        </div>

        <!-- Step 3 In-Depth View (Customer Information with Mandatory Email) -->
        <div class="space-y-6">
          <div class="border-b border-[${c.border}]/60 pb-4">
            <h4 class="font-arabic-display font-bold text-xl text-[${c.textPrimary}]">الخطوة 3: معلومات المسافر والتواصل الرسمي</h4>
            <p class="text-xs text-[${c.textSecondary}] mt-1">
              البريد الإلكتروني ورقم الجوال إلزاميان لإرسال تفاصيل السائق وقسيمة الحجز الرسمية.
            </p>
          </div>

          <div class="grid grid-cols-1 ${!isMobile ? 'md:grid-cols-2' : ''} gap-5">
            <!-- Full Name -->
            <div>
              <label class="block text-xs font-bold text-[${c.textPrimary}] mb-1.5">الاسم الكامل (كما في جواز السفر) *</label>
              <input type="text" placeholder="مثال: أحمد عبد الله العتيبي" 
                     class="w-full px-4 py-3 rounded-xl bg-[${c.bg}] border border-[${c.border}] text-xs text-[${c.textPrimary}] focus:outline-none focus:border-[${c.accentSecondary}]">
            </div>

            <!-- Email Address (REQUIRED IN PROMPT) -->
            <div>
              <label class="block text-xs font-bold text-[${c.textPrimary}] mb-1.5">البريد الإلكتروني (إلزامي لإرسال القسيمة) *</label>
              <input type="email" placeholder="example@domain.com" 
                     class="w-full px-4 py-3 rounded-xl bg-[${c.bg}] border-2 border-[${c.accentSecondary}] text-xs text-[${c.textPrimary}] focus:outline-none">
            </div>

            <!-- Mobile Phone -->
            <div>
              <label class="block text-xs font-bold text-[${c.textPrimary}] mb-1.5">رقم الجوال مع رمز الدولة (واتساب) *</label>
              <input type="tel" placeholder="+966 5X XXX XXXX" 
                     class="w-full px-4 py-3 rounded-xl bg-[${c.bg}] border border-[${c.border}] text-xs text-[${c.textPrimary}] focus:outline-none text-start" dir="ltr">
            </div>

            <!-- Flight Number (Conditional) -->
            <div>
              <label class="block text-xs font-bold text-[${c.textPrimary}] mb-1.5">رقم رحلة الطيران (إلزامي لمستقبلي المطار)</label>
              <input type="text" placeholder="مثال: SV 1024 أو MS 650" 
                     class="w-full px-4 py-3 rounded-xl bg-[${c.bg}] border border-[${c.border}] text-xs text-[${c.textPrimary}] focus:outline-none text-start" dir="ltr">
            </div>
          </div>

          <!-- Trip Summary Box -->
          <div class="p-4 rounded-xl bg-[${c.bg}] border border-[${c.border}] flex items-center justify-between text-xs">
            <div>
              <span class="block text-[10px] text-[${c.textSecondary}] uppercase font-bold">ملخص الاختيار المبدئي</span>
              <strong class="text-sm font-bold text-[${c.textPrimary}]">مطار جدة ↔ مكة المكرمة • جي إم سي يوكن XL</strong>
            </div>
            <div class="text-end">
              <span class="block text-[10px] text-[${c.textSecondary}] uppercase font-bold">الأجرة الصافية المؤكدة</span>
              <strong class="text-base font-extrabold text-[${c.accentSecondary}]">450 ر.س (نقداً للسائق)</strong>
            </div>
          </div>

          <!-- Policy Confirmation -->
          <div class="p-3 rounded-lg bg-[${c.accentPrimary}]/10 border border-[${c.accentPrimary}]/20 text-[11px] text-[${c.textPrimary}] flex items-center gap-2">
            <span class="text-[${c.accentPrimary}] font-bold">✓</span>
            <span>تم استبعاد أي خيارات مياه غير مطلوبة • 100% بدون دفع مسبق أو بطاقة بنكية.</span>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex items-center justify-between pt-4">
            <button type="button" class="px-5 py-2.5 rounded-lg border border-[${c.border}] text-xs font-bold text-[${c.textSecondary}]">
              → الرجوع للخطوة السابقة
            </button>
            <button type="button" class="px-8 py-3 rounded-xl bg-[${c.accentPrimary}] hover:bg-[${c.accentPrimaryLight}] text-[${c.bg}] font-extrabold text-xs transition-colors shadow-md">
              متابعة لمراجعة وتأكيد الحجز ←
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================================================================
       7. EDITORIAL FOOTER
  ==================================================================== -->
  <footer class="bg-[${c.heroBg}] text-[#FBF9F4] py-16 border-t border-white/10 text-xs">
    <div class="${containerClass}">
      <div class="grid grid-cols-1 ${!isMobile ? 'md:grid-cols-4' : ''} gap-10 mb-12">
        <div class="md:col-span-1">
          <img src="${c.logoReverseSvg}" alt="Duyuf Alrahman VIP" class="h-12 w-auto object-contain mb-4">
          <p class="text-slate-400 text-xs leading-relaxed font-light">
            منظومة النقل الملكي الخاص لضيوف الرحمن، مصممة بأعلى معايير الفخامة والخصوصية في المملكة العربية السعودية.
          </p>
        </div>
        <div>
          <h4 class="font-bold text-sm text-[${c.accentSecondaryLight}] uppercase mb-4">المسارات المعتمدة</h4>
          <ul class="space-y-2 text-slate-300">
            <li><a href="#" class="hover:text-white">مطار جدة إلى مكة المكرمة</a></li>
            <li><a href="#" class="hover:text-white">مكة المكرمة إلى المدينة المنورة</a></li>
            <li><a href="#" class="hover:text-white">مطار المدينة إلى فنادق الحرم</a></li>
            <li><a href="#" class="hover:text-white">مكة المكرمة إلى الطائف</a></li>
            <li><a href="#" class="hover:text-white">مدينة الرياض إلى الحرمين</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm text-[${c.accentSecondaryLight}] uppercase mb-4">الأسطول المعتمد</h4>
          <ul class="space-y-2 text-slate-300">
            <li><a href="#" class="hover:text-white">جي إم سي يوكن XL</a></li>
            <li><a href="#" class="hover:text-white">هيونداي ستاريا VIP</a></li>
            <li><a href="#" class="hover:text-white">تويوتا كامري سيدان</a></li>
            <li><a href="#" class="hover:text-white">تويوتا هايس VIP</a></li>
            <li><a href="#" class="hover:text-white">تويوتا كوستر VIP</a></li>
            <li><a href="#" class="hover:text-white">مرسيدس مايباخ (كونسيرج)</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm text-[${c.accentSecondaryLight}] uppercase mb-4">الضيافة والاتصال</h4>
          <p class="text-slate-300 mb-3">مستشار الكونسيرج متاح 24 ساعة عبر واتساب لخدمتكم.</p>
          <a href="https://wa.me/966567588261" target="_blank" rel="noopener noreferrer" 
             class="inline-block px-4 py-2 rounded-lg bg-[${c.accentSecondary}] text-white font-bold text-xs">
            واتساب: 966567588261+
          </a>
        </div>
      </div>

      <div class="border-t border-white/10 pt-8 flex items-center justify-between text-slate-400 text-[11px]">
        <span>© 2026 ضيوف الرحمن VIP — Duyuf Alrahman VIP. جميع الحقوق محفوظة.</span>
        <div class="flex items-center gap-4">
          <a href="#" class="hover:text-white">الشروط والأحكام</a>
          <span>•</span>
          <a href="#" class="hover:text-white">سياسة الخصوصية</a>
          <span>•</span>
          <a href="#" class="hover:text-white">سياسة الإلغاء</a>
        </div>
      </div>
    </div>
  </footer>

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// WRITE OUT ALL 6 PROTOTYPE FILES
// ---------------------------------------------------------------------------
['a', 'b', 'c'].forEach(k => {
  fs.writeFileSync(path.join(outDir, `${CONCEPTS[k].id}-desktop.html`), generateConceptHTML(k, false));
  fs.writeFileSync(path.join(outDir, `${CONCEPTS[k].id}-mobile.html`), generateConceptHTML(k, true));
});

console.log('Successfully generated all 6 desktop and mobile concept files in design-concepts!');
