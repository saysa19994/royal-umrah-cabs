import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const PORT = 3027;
const DEBUG_PORT = 9238;

// Read assets as base64 for 100% self-contained rendering
const heroBase64 = fs.readFileSync(path.join(projectRoot, 'public/assets/images/cinematic/home/hero-kaaba-twilight-mobile.jpg')).toString('base64');
const mercedesBase64 = fs.readFileSync(path.join(projectRoot, 'public/assets/images/studio-2k/mercedes-s-class-studio-2k.webp')).toString('base64');
const camryBase64 = fs.readFileSync(path.join(projectRoot, 'public/assets/images/studio-2k/toyota-camry-studio-2k.webp')).toString('base64');
const stariaBase64 = fs.readFileSync(path.join(projectRoot, 'public/assets/images/studio-2k/hyundai-staria-studio-2k.webp')).toString('base64');
const yukonBase64 = fs.readFileSync(path.join(projectRoot, 'public/assets/images/studio-2k/gmc-yukon-studio-2k.webp')).toString('base64');
const hiaceBase64 = fs.readFileSync(path.join(projectRoot, 'public/assets/images/studio-2k/toyota-hiace-studio-2k.webp')).toString('base64');
const logoSvg = fs.readFileSync(path.join(projectRoot, 'public/assets/brand/logo-royal-crest-gold.svg')).toString('utf8');

const heroDataUri = `data:image/jpeg;base64,${heroBase64}`;
const mercedesUri = `data:image/webp;base64,${mercedesBase64}`;
const camryUri = `data:image/webp;base64,${camryBase64}`;
const stariaUri = `data:image/webp;base64,${stariaBase64}`;
const yukonUri = `data:image/webp;base64,${yukonBase64}`;
const hiaceUri = `data:image/webp;base64,${hiaceBase64}`;

// -------------------------------------------------------------
// VARIANT 1: APP-STYLE VIP CHAUFFEUR (1-Tap Route Pills & Interactive Fleet)
// -------------------------------------------------------------
const htmlVariant1 = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>النمط الأول: التطبيق العصري VIP</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #06090F;
      color: #FFFFFF;
      font-family: 'Cairo', sans-serif;
      overflow-x: hidden;
      width: 100%;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      background: rgba(10, 16, 26, 0.95);
      border-bottom: 1px solid rgba(214, 161, 58, 0.25);
    }
    .logo-box { height: 36px; display: flex; align-items: center; }
    .logo-box svg { height: 32px; width: auto; }
    .nav-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #fff;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 700;
    }
    /* Hero with Kaaba */
    .hero-wrap {
      position: relative;
      height: 480px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 20px 16px 28px 16px;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 15%;
      z-index: 1;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(6, 9, 15, 0.3) 0%, rgba(6, 9, 15, 0.7) 45%, #06090F 95%);
      z-index: 2;
    }
    .hero-content {
      position: relative;
      z-index: 3;
      text-align: center;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(214, 161, 58, 0.15);
      border: 1px solid #D6A13A;
      color: #D6A13A;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .hero-title {
      font-family: 'Amiri', serif;
      font-size: 32px;
      line-height: 1.25;
      font-weight: 700;
      margin-bottom: 6px;
      color: #FFFFFF;
      text-shadow: 0 2px 10px rgba(0,0,0,0.8);
    }
    .hero-gold {
      color: #D6A13A;
      display: block;
      background: linear-gradient(135deg, #FFFFFF 0%, #D6A13A 60%, #E5B869 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-sub {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 20px;
    }
    /* 1-Tap Fast Route Pills */
    .routes-pills-label {
      font-size: 12px;
      font-weight: 700;
      color: #D6A13A;
      margin-bottom: 8px;
      text-align: right;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .routes-pills-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 6px;
      scrollbar-width: none;
    }
    .route-pill {
      background: rgba(16, 23, 37, 0.9);
      border: 1px solid rgba(214, 161, 58, 0.35);
      border-radius: 12px;
      padding: 10px 14px;
      min-width: 170px;
      flex-shrink: 0;
      text-align: right;
    }
    .route-pill-active {
      border: 2px solid #D6A13A;
      background: #141D2C;
      box-shadow: 0 0 16px rgba(214, 161, 58, 0.25);
    }
    .route-pill-dest {
      font-size: 13px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 3px;
    }
    .route-pill-price {
      font-size: 12px;
      font-weight: 800;
      color: #D6A13A;
    }

    /* Section: Fleet Showcase */
    .section-wrap {
      padding: 28px 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .sec-tag {
      font-size: 11px;
      font-weight: 700;
      color: #D6A13A;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 4px;
    }
    .sec-title {
      font-family: 'Amiri', serif;
      font-size: 24px;
      text-align: center;
      margin-bottom: 16px;
    }
    /* Filter Tabs */
    .filter-tabs {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 20px;
    }
    .tab-btn {
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.7);
    }
    .tab-active {
      background: #D6A13A;
      color: #06090F;
      border-color: #D6A13A;
    }
    /* Master Spotlight Car Card */
    .car-card-hero {
      background: linear-gradient(180deg, #101725 0%, #0A0E18 100%);
      border: 1.5px solid rgba(214, 161, 58, 0.4);
      border-radius: 20px;
      padding: 24px 18px;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6);
      text-align: center;
      position: relative;
    }
    .popular-tag {
      position: absolute;
      top: -12px;
      right: 50%;
      transform: translateX(50%);
      background: #D6A13A;
      color: #06090F;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 14px;
      border-radius: 9999px;
    }
    .car-img-hero {
      width: 100%;
      height: 180px;
      object-fit: contain;
      filter: drop-shadow(0 14px 20px rgba(0,0,0,0.85));
      margin-bottom: 12px;
    }
    .car-name-hero {
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 8px;
      color: #FFFFFF;
    }
    .car-specs-hero {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.75);
      margin-bottom: 14px;
    }
    .car-price-hero {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 18px;
    }
    .price-bold {
      font-size: 22px;
      font-weight: 900;
      color: #D6A13A;
      margin-right: 6px;
    }
    .btn-gold-full {
      display: block;
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #E5B869 0%, #D6A13A 100%);
      color: #06090F;
      font-size: 15px;
      font-weight: 800;
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 6px 20px rgba(214, 161, 58, 0.35);
    }
    /* Cash Guarantee Pill */
    .cash-guarantee {
      margin-top: 14px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    /* 4 Grid Services */
    .services-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 16px;
    }
    .srv-item {
      background: #101725;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      padding: 16px 12px;
      text-align: right;
    }
    .srv-icon {
      font-size: 22px;
      margin-bottom: 8px;
      display: inline-block;
    }
    .srv-name {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 4px;
    }
    .srv-desc {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.4;
    }
    /* Sticky Bottom Bar */
    .sticky-bar {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(10, 16, 26, 0.95);
      border-top: 1px solid rgba(214, 161, 58, 0.3);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      backdrop-filter: blur(12px);
      z-index: 50;
    }
    .wa-btn {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: #25D366;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .book-btn-sticky {
      flex: 1;
      height: 48px;
      background: #D6A13A;
      color: #06090F;
      font-size: 14px;
      font-weight: 800;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="logo-box">${logoSvg}</div>
    <div style="display:flex; gap:8px;">
      <span class="nav-btn">العربية (SAR)</span>
      <span class="nav-btn">☰</span>
    </div>
  </header>

  <!-- Hero with Kaaba -->
  <section class="hero-wrap">
    <img src="${heroDataUri}" alt="Kaaba Twilight" class="hero-bg" />
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-badge">✦ ضيوف الرحمن VIP ✦</div>
      <h1 class="hero-title">
        احجز رحلتك الخاصة
        <span class="hero-gold">بقمة الرفاهية والأمان</span>
      </h1>
      <p class="hero-sub">توصيل VIP لضيوف الرحمن بين مكة والمدينة ومطار جدة بأحدث أسطول ليموزين</p>

      <!-- 1-Tap Route Selection -->
      <div class="routes-pills-label">
        <span>⚡ اختر مسارك بلمسة واحدة:</span>
      </div>
      <div class="routes-pills-scroll">
        <div class="route-pill route-pill-active">
          <div class="route-pill-dest">مطار جدة ➔ مكة المكرمة</div>
          <div class="route-pill-price">تبدأ من 200 ريال</div>
        </div>
        <div class="route-pill">
          <div class="route-pill-dest">مكة المكرمة ➔ المدينة المنورة</div>
          <div class="route-pill-price">تبدأ من 400 ريال</div>
        </div>
        <div class="route-pill">
          <div class="route-pill-dest">مطار المدينة ➔ الفندق</div>
          <div class="route-pill-price">تبدأ من 200 ريال</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section: Featured Vehicle -->
  <section class="section-wrap">
    <div class="sec-tag">الأسطول الملكي</div>
    <h2 class="sec-title">اختر فئة سيارتك</h2>
    <div class="filter-tabs">
      <span class="tab-btn tab-active">الكل</span>
      <span class="tab-btn">سيدان فاخرة</span>
      <span class="tab-btn">عائلية VIP</span>
      <span class="tab-btn">باصات ميني</span>
    </div>

    <!-- Master Featured Card -->
    <div class="car-card-hero">
      <div class="popular-tag">الأكثر طلباً للضيوف</div>
      <img src="${mercedesUri}" alt="Mercedes S-Class" class="car-img-hero" />
      <h3 class="car-name-hero">مرسيدس الفئة S (مايباخ VIP)</h3>
      <div class="car-specs-hero">
        <span>👥 3 ركاب</span>
        <span>•</span>
        <span>🧳 3 حقائب</span>
        <span>•</span>
        <span>❄️ تكييف فائق</span>
      </div>
      <div class="car-price-hero">
        <span>السعر الثابت:</span>
        <span class="price-bold">200 SAR</span>
      </div>
      <a href="#book" class="btn-gold-full">احجز هذه السيارة الآن ←</a>
      <div class="cash-guarantee">
        <span>🛡️ الدفع 100% نقداً للسائق عند الوصول بعد إتمام الرحلة</span>
      </div>
    </div>
  </section>

  <!-- Services Grid -->
  <section class="section-wrap" style="background:#080D16;">
    <div class="sec-tag">خدماتنا التنفيذية</div>
    <h2 class="sec-title">حلول نقل مخصصة لضيوف الرحمن</h2>
    <div class="services-grid">
      <div class="srv-item">
        <span class="srv-icon">✈️</span>
        <h4 class="srv-name">استقبال المطارات</h4>
        <p class="srv-desc">تتبع مسار الرحلات وانتظار مجاني 60 دقيقة في الصالة.</p>
      </div>
      <div class="srv-item">
        <span class="srv-icon">🕋</span>
        <h4 class="srv-name">رحلات المزارات</h4>
        <p class="srv-desc">جولات تعريفية بمعالم مكة المكرمة والمدينة المنورة.</p>
      </div>
      <div class="srv-item">
        <span class="srv-icon">🛣️</span>
        <h4 class="srv-name">بين المدن</h4>
        <p class="srv-desc">رحلات مباشرة ومريحة بين مكة وجدة والمدينة المنورة.</p>
      </div>
      <div class="srv-item">
        <span class="srv-icon">🏨</span>
        <h4 class="srv-name">توصيل الفنادق</h4>
        <p class="srv-desc">خدمة باب لباب مع العناية التامة بالحقائب والأمتعة.</p>
      </div>
    </div>
  </section>

  <!-- Sticky Bottom Bar -->
  <div class="sticky-bar">
    <a href="https://wa.me/966567588261" class="wa-btn">💬</a>
    <a href="#book" class="book-btn-sticky">احجز رحلتك الخاصة الآن ←</a>
  </div>
</body>
</html>`;

// -------------------------------------------------------------
// VARIANT 2: 2-COLUMN VIP FLEET SHOWCASE (Grid View Like Mockup)
// -------------------------------------------------------------
const htmlVariant2 = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>النمط الثاني: شبكة الأسطول الملكية المزدوجة</title>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #080C14; color: #FFFFFF; font-family: 'Cairo', sans-serif; width: 100%; }
    .header { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #080C14; border-bottom: 1px solid rgba(214, 161, 58, 0.25); }
    .logo-box svg { height: 32px; width: auto; }
    
    .hero-banner {
      position: relative;
      height: 340px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 20px;
      overflow: hidden;
    }
    .hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 20%; z-index: 1; }
    .hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(8,12,20,0.4) 0%, rgba(8,12,20,0.85) 75%, #080C14 100%); z-index: 2; }
    .hero-content { position: relative; z-index: 3; }
    .hero-title { font-family: 'Amiri', serif; font-size: 32px; line-height: 1.25; margin-bottom: 8px; }
    .hero-gold { color: #D6A13A; }
    .hero-sub { font-size: 13px; color: rgba(255,255,255,0.85); max-width: 320px; margin: 0 auto; }

    /* 2-Column Grid Fleet */
    .fleet-sec { padding: 20px 14px; }
    .sec-h2 { font-family: 'Amiri', serif; font-size: 24px; text-align: center; margin-bottom: 4px; }
    .sec-p { font-size: 12px; color: rgba(255,255,255,0.65); text-align: center; margin-bottom: 20px; }
    
    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .grid-car-card {
      background: #101725;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 14px;
      padding: 14px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
    }
    .card-popular {
      border: 1.5px solid #D6A13A;
      box-shadow: 0 0 16px rgba(214, 161, 58, 0.2);
    }
    .pop-chip {
      position: absolute;
      top: -8px;
      background: #D6A13A;
      color: #080C14;
      font-size: 9px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 9999px;
    }
    .car-img-sm {
      width: 100%;
      height: 90px;
      object-fit: contain;
      filter: drop-shadow(0 6px 12px rgba(0,0,0,0.8));
      margin-bottom: 8px;
    }
    .car-name-sm { font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 4px; }
    .car-meta-sm { font-size: 10px; color: rgba(255,255,255,0.65); margin-bottom: 6px; }
    .car-price-sm { font-size: 13px; font-weight: 800; color: #D6A13A; margin-bottom: 8px; }
    .btn-book-sm {
      width: 100%;
      padding: 8px 4px;
      background: #D6A13A;
      color: #080C14;
      font-size: 11px;
      font-weight: 800;
      border-radius: 8px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="logo-box">${logoSvg}</div>
    <span style="font-size:12px; font-weight:700; color:#D6A13A;">اتصل بنا ✆</span>
  </header>

  <section class="hero-banner">
    <img src="${heroDataUri}" alt="Kaaba" class="hero-bg" />
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">أسطول النخبة <span class="hero-gold">الملكي</span></h1>
      <p class="hero-sub">سيارات حديثة معقمة وسائقون محترفون لخدمتكم على مدار الساعة</p>
    </div>
  </section>

  <section class="fleet-sec">
    <h2 class="sec-h2">اختر فئتك المفضلة</h2>
    <p class="sec-p">أسعار ثابتة شاملة لكافة الضرائب والوقود والانتظار</p>

    <div class="grid-2col">
      <!-- 1. Mercedes S-Class -->
      <div class="grid-car-card card-popular">
        <span class="pop-chip">VIP مايباخ</span>
        <img src="${mercedesUri}" class="car-img-sm" />
        <div class="car-name-sm">مرسيدس الفئة S</div>
        <div class="car-meta-sm">3 ركاب • 3 حقائب</div>
        <div class="car-price-sm">من 200 SAR</div>
        <a href="#book" class="btn-book-sm">احجز الآن</a>
      </div>

      <!-- 2. GMC Yukon XL -->
      <div class="grid-car-card">
        <img src="${yukonUri}" class="car-img-sm" />
        <div class="car-name-sm">جي إم سي يوكون XL</div>
        <div class="car-meta-sm">6 ركاب • 6 حقائب</div>
        <div class="car-price-sm">من 380 SAR</div>
        <a href="#book" class="btn-book-sm">احجز الآن</a>
      </div>

      <!-- 3. Toyota Camry -->
      <div class="grid-car-card card-popular">
        <span class="pop-chip">الأكثر طلباً</span>
        <img src="${camryUri}" class="car-img-sm" />
        <div class="car-name-sm">تويوتا كامري</div>
        <div class="car-meta-sm">3 ركاب • 3 حقائب</div>
        <div class="car-price-sm">من 200 SAR</div>
        <a href="#book" class="btn-book-sm">احجز الآن</a>
      </div>

      <!-- 4. Hyundai Staria -->
      <div class="grid-car-card">
        <img src="${stariaUri}" class="car-img-sm" />
        <div class="car-name-sm">هيونداي ستاريا VIP</div>
        <div class="car-meta-sm">6 ركاب • 6 حقائب</div>
        <div class="car-price-sm">من 260 SAR</div>
        <a href="#book" class="btn-book-sm">احجز الآن</a>
      </div>

      <!-- 5. Hiace Van -->
      <div class="grid-car-card" style="grid-column: span 2;">
        <img src="${hiaceUri}" class="car-img-sm" style="height:110px;" />
        <div class="car-name-sm">تويوتا هايس العائلية (10 ركاب)</div>
        <div class="car-meta-sm">10 ركاب • 12 حقيبة • رحابة فائقة</div>
        <div class="car-price-sm">من 360 SAR</div>
        <a href="#book" class="btn-book-sm" style="max-width:200px;">احجز العائلية الآن</a>
      </div>
    </div>
  </section>
</body>
</html>`;

// -------------------------------------------------------------
// VARIANT 3: EDITORIAL LUXURY LIMOUSINE (Full-Bleed Magazine Style)
// -------------------------------------------------------------
const htmlVariant3 = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>النمط الثالث: التحريري الفاخر VIP</title>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #05080E; color: #FFFFFF; font-family: 'Cairo', sans-serif; width: 100%; }
    .header { padding: 16px 20px; border-bottom: 1px solid rgba(214, 161, 58, 0.2); display: flex; justify-content: space-between; align-items: center; }
    .logo-box svg { height: 32px; width: auto; }
    
    .hero-editorial {
      padding: 30px 18px 20px 18px;
      text-align: center;
    }
    .badge-gold {
      display: inline-block;
      border: 1px solid #D6A13A;
      color: #D6A13A;
      padding: 4px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .title-ed {
      font-family: 'Amiri', serif;
      font-size: 34px;
      line-height: 1.25;
      margin-bottom: 8px;
    }
    .gold-text { color: #D6A13A; }
    .desc-ed {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.8);
      max-width: 330px;
      margin: 0 auto 24px auto;
      line-height: 1.6;
    }

    /* Full-Bleed Vehicle Stage */
    .stage-card {
      margin: 0 16px 24px 16px;
      background: linear-gradient(180deg, #121A2B 0%, #080C14 100%);
      border: 1px solid rgba(214, 161, 58, 0.35);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0,0,0,0.6);
    }
    .stage-img-wrap {
      position: relative;
      height: 180px;
      background: radial-gradient(circle at center, rgba(214, 161, 58, 0.15) 0%, transparent 70%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
    .stage-img {
      width: 90%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 14px 22px rgba(0,0,0,0.85));
    }
    .stage-body {
      padding: 18px;
      text-align: right;
    }
    .stage-title {
      font-size: 18px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 4px;
    }
    .stage-sub {
      font-size: 12px;
      color: #D6A13A;
      margin-bottom: 14px;
      font-weight: 600;
    }
    .feature-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 18px;
    }
    .feature-item {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.75);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .feature-item span.icon { color: #D6A13A; font-weight: bold; }
    
    .price-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 14px;
    }
    .price-amount {
      font-size: 20px;
      font-weight: 900;
      color: #D6A13A;
    }
    .btn-reserve {
      background: #D6A13A;
      color: #05080E;
      font-size: 13px;
      font-weight: 800;
      padding: 10px 20px;
      border-radius: 10px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="logo-box">${logoSvg}</div>
    <span style="font-size:12px; font-weight:700; color:#fff;">VIP Chauffeur</span>
  </header>

  <div class="hero-editorial">
    <div class="badge-gold">خدمة النخبة لضيوف الرحمن</div>
    <h1 class="title-ed">رحلة روحانية بلمسة <span class="gold-text">ملكية</span></h1>
    <p class="desc-ed">نعتني بك وبأسرتك من لحظة الهبوط في مطار جدة وحتى باحة الحرم الشريف</p>
  </div>

  <!-- Stage Card 1: Mercedes S-Class -->
  <div class="stage-card">
    <div class="stage-img-wrap">
      <img src="${mercedesUri}" class="stage-img" />
    </div>
    <div class="stage-body">
      <h3 class="stage-title">مرسيدس الفئة S (مايباخ كونسيرج)</h3>
      <div class="stage-sub">أعلى درجات الخصوصية والرفاهية لرجال الأعمال والوفود</div>
      <ul class="feature-list">
        <li class="feature-item"><span class="icon">✓</span> مقاعد جلدية فاخرة مع خاصية المساج والتهوية</li>
        <li class="feature-item"><span class="icon">✓</span> مياه ضيافة مبردة وشواحن لكافة الأجهزة الذكية</li>
        <li class="feature-item"><span class="icon">✓</span> سائق خاص بزي رسمي يجيد التعامل مع كبار الشخصيات</li>
      </ul>
      <div class="price-row">
        <div>
          <div style="font-size:11px; color:rgba(255,255,255,0.6);">السعر الثابت</div>
          <div class="price-amount">200 SAR</div>
        </div>
        <a href="#book" class="btn-reserve">احجز الآن ←</a>
      </div>
    </div>
  </div>

  <!-- Stage Card 2: GMC Yukon XL -->
  <div class="stage-card">
    <div class="stage-img-wrap">
      <img src="${yukonUri}" class="stage-img" />
    </div>
    <div class="stage-body">
      <h3 class="stage-title">جي إم سي يوكون XL بريميوم</h3>
      <div class="stage-sub">الخيار المثالي للعائلات الكبيرة وحقائب العمرة المتعددة</div>
      <ul class="feature-list">
        <li class="feature-item"><span class="icon">✓</span> سعة استيعاب 6 ركاب مع مساحة 6 حقائب كبيرة</li>
        <li class="feature-item"><span class="icon">✓</span> مقاعد مريحة لمسافات السفر الطويلة (مكة ➔ المدينة)</li>
        <li class="feature-item"><span class="icon">✓</span> نظام ترفيهي وشاشات عرض للمقاعد الخلفية</li>
      </ul>
      <div class="price-row">
        <div>
          <div style="font-size:11px; color:rgba(255,255,255,0.6);">السعر الثابت</div>
          <div class="price-amount">380 SAR</div>
        </div>
        <a href="#book" class="btn-reserve">احجز الآن ←</a>
      </div>
    </div>
  </div>
</body>
</html>`;

// Write HTML files
fs.writeFileSync(path.join(artifactsDir, 'variant_1_app_chauffeur.html'), htmlVariant1);
fs.writeFileSync(path.join(artifactsDir, 'variant_2_fleet_showcase.html'), htmlVariant2);
fs.writeFileSync(path.join(artifactsDir, 'variant_3_editorial_limousine.html'), htmlVariant3);

console.log('HTML variants written successfully.');

// Start HTTP server to serve them
const server = http.createServer((req, res) => {
  if (req.url === '/v1') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlVariant1);
  } else if (req.url === '/v2') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlVariant2);
  } else if (req.url === '/v3') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlVariant3);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}. Starting Edge...`);

  const edgeProc = spawn(binary, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${DEBUG_PORT}`,
    'about:blank',
  ]);

  // wait for debug port
  let ready = false;
  for (let i = 0; i < 20; i++) {
    try {
      const v = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      if (v.ok) { ready = true; break; }
    } catch {}
    await new Promise(r => setTimeout(r, 400));
  }
  if (!ready) {
    console.error('Edge debug not ready');
    process.exit(1);
  }

  const tabsRes = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`);
  const tabs = await tabsRes.json();
  const pageTab = tabs.find((t) => t.type === 'page') || tabs[0];
  const wsUrl = pageTab.webSocketDebuggerUrl;

  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise(r => { ws.onopen = r; });

  let id = 0;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = ++id;
      const handler = (e) => {
        const data = JSON.parse(e.data);
        if (data.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  const variants = [
    { url: `http://localhost:${PORT}/v1`, out: 'variant_1_app_chauffeur.jpg' },
    { url: `http://localhost:${PORT}/v2`, out: 'variant_2_fleet_showcase.jpg' },
    { url: `http://localhost:${PORT}/v3`, out: 'variant_3_editorial_limousine.jpg' },
  ];

  for (const v of variants) {
    console.log(`Capturing ${v.out}...`);
    await send('Page.navigate', { url: v.url });
    await new Promise(r => setTimeout(r, 1500));
    const shot = await send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 92,
      captureBeyondViewport: true,
      fromSurface: true,
    });
    fs.writeFileSync(path.join(artifactsDir, v.out), Buffer.from(shot.data, 'base64'));
    console.log(`✓ Saved ${v.out}`);
  }

  ws.close();
  edgeProc.kill();
  server.close();
  console.log('ALL 3 REAL DESIGN VARIANTS CAPTURED SUCCESSFULLY!');
  process.exit(0);
});
