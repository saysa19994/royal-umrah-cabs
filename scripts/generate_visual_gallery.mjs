import fs from 'fs';
import path from 'path';

const outPath1 = path.resolve('research/visual-audit-2026/the-15-directions/VISUAL_GALLERY.html');
const outPath2 = 'C:/Users/PC/Downloads/New folder/INDEX_GALLERY.html';

const concepts = [
  { id: 'D01', title: 'الضيافة السعودية المعاصرة', en: 'Saudi Contemporary Hospitality', desc: 'الفخامة الهادئة والسكينة المستوحاة من رخام الحرمين وأشجار الزيتون (Quiet Luxury)', colors: ['#F7F5F0', '#FFFFFF', '#26332E', '#354B3F', '#B76E52'], badge: '🥇 المركز الأول (المعتمد)' },
  { id: 'D02', title: 'سجل الأسفار التحريري الفاخر', en: 'Editorial Journey Journal', desc: 'مجلة سياحية عالمية راقية بسردية بصرية وسيريف كلاسيكي (Condé Nast)', colors: ['#F1EEE6', '#FCFBF8', '#242720', '#B95F42', '#46564A'], badge: 'تصميم تحريري' },
  { id: 'D03', title: 'استوديو الأسطول الفاخر', en: 'Luxury Automotive Studio', desc: 'استوديو سيارات فاخرة يركز على عزل المحركات والراحة الميكانيكية (Porsche / Aston Martin)', colors: ['#F4F5F4', '#FFFFFF', '#191E22', '#252B30', '#557D98'], badge: 'عرض هندسي' },
  { id: 'D04', title: 'منظومة الحجز السويسرية', en: 'Swiss Precision Booking', desc: 'محرك حجز فائق الدقة والسرعة بـ 3 مراحل بدون أي تشتيت بصري', colors: ['#F5F7F9', '#FFFFFF', '#192633', '#2858C8', '#BCE4D6'], badge: '🥉 المركز الثالث' },
  { id: 'D05', title: 'الأصالة الحجازية المعاصرة', en: 'Hijazi Contemporary Heritage', desc: 'عبق الرواشين والمشربيات الحجازية بهوية وطنية سعودية متجددة', colors: ['#F5F0E6', '#FFFEFC', '#1C4A46', '#695141', '#CB8065'], badge: '🥈 المركز الثاني' },
  { id: 'D06', title: 'حداثة الصحراء والهندسة', en: 'Desert Modernism', desc: 'تدرجات الرمال وصخور البازلت الأسود على طريق الهجرة السريع', colors: ['#EDE5D7', '#F8F5EF', '#363932', '#8C9680', '#BC6C48'], badge: 'طبيعة جغرافية' },
  { id: 'D07', title: 'مخطط الرحلة التفاعلي', en: 'Map-First Pilgrim Journey', desc: 'خريطة تفاعلية للمسافات ومحطات الانطلاق بين جدة ومكة والمدينة', colors: ['#F7F9FC', '#FFFFFF', '#1D3040', '#64748B', '#275B83'], badge: 'واجهة خرائط' },
  { id: 'D08', title: 'الحداثة الساحلية لعروس البحر', en: 'Jeddah Coastal Modern', desc: 'نسائم البحر الأحمر والانتعاش الساحلي المعاصر في بوابة الحرمين', colors: ['#F2F7F6', '#FFFFFF', '#173F49', '#579C99', '#D97D68'], badge: 'بحر وانتعاش' },
  { id: 'D09', title: 'كونسيرج الفنادق البوتيكية', en: 'Boutique Hotel Concierge', desc: 'خدمة شخصية حصرية بالاسم واستقبال كونسيرج 5 نجوم خاص', colors: ['#F4F0E8', '#FFFDFC', '#252E29', '#776570', '#374A40'], badge: 'خدمة فندقية' },
  { id: 'D10', title: 'البساطة اليابانية الصامتة', en: 'Japanese Minimalism', desc: 'تجريد بصري صارم وخطوط نقية خالية تماماً من الضوضاء البصرية', colors: ['#F6F5F0', '#FFFFFF', '#202522', '#92958D', '#BB5038'], badge: 'تجريد كامل' },
  { id: 'D11', title: 'صالة الطيران الليلي', en: 'Premium Night Aviation Lounge', desc: 'تصميم مسائي داكن مخصص لرحلات الوصول في ساعات الفجر والليل', colors: ['#132630', '#203642', '#E7EEF0', '#8DAFC0', '#4E9DA3'], badge: 'وصول ليلي' },
  { id: 'D12', title: 'الأولوية لراحة العائلة', en: 'Family Travel First', desc: 'عناية فائقة بالأطفال وكبار السن وسعة الحقائب الكبيرة', colors: ['#FAF8F3', '#FFFFFF', '#26353E', '#6C7478', '#29465E'], badge: 'عائلات ومجموعات' },
  { id: 'D13', title: 'المتحف المعماري للنقل', en: 'Architectural Design Gallery', desc: 'شبكات هندسية متقاطعة وأرقام تسلسلية كبيرة بنظام معارض حديثة', colors: ['#F0F2F0', '#FFFFFF', '#20282B', '#6B7573', '#365DA8'], badge: 'هندسة معمارية' },
  { id: 'D14', title: 'منصة التنقل الرقمي', en: 'Modern Premium Mobility', desc: 'سرعة البرق وتأكيد فوري بالدفع نقداً يماثل تطبيقات النقل الفاخرة', colors: ['#F9FAFB', '#FFFFFF', '#1D3548', '#64748B', '#3C61DF'], badge: 'تطبيق تقني' },
  { id: 'D15', title: 'الكونسيرج الأحادي الخالد', en: 'Monochrome Private Concierge', desc: 'فخامة أحادية أبيض وأسود خالدة مستوحاة من كبرى دور الأزياء العالمية', colors: ['#FAFAF8', '#FFFFFF', '#191C1D', '#7A8283', '#753E48'], badge: 'أحادي راقٍ' },
];

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>معرض الصور واللقطات الحية الكاملة للاتجاهات الـ 15 | ضيوف الرحمن VIP</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0B111A;
      --card-bg: #111A26;
      --gold: #C5A15D;
      --text: #F1F5F9;
      --muted: #94A3B8;
      --border: rgba(255, 255, 255, 0.1);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'IBM Plex Sans Arabic', sans-serif;
      padding: 30px 20px;
      line-height: 1.6;
    }
    .header {
      max-width: 1400px;
      margin: 0 auto 40px auto;
      text-align: center;
      border-bottom: 2px solid var(--gold);
      padding-bottom: 30px;
    }
    .badge {
      display: inline-block;
      background: var(--gold);
      color: #111A26;
      font-weight: 800;
      font-size: 13px;
      padding: 6px 16px;
      border-radius: 20px;
      margin-bottom: 15px;
      letter-spacing: 0.05em;
    }
    h1 {
      font-size: 32px;
      margin-bottom: 12px;
      color: #fff;
    }
    p.lead {
      color: var(--muted);
      font-size: 16px;
      max-width: 800px;
      margin: 0 auto;
    }
    .quick-stats {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .stat-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      padding: 6px 16px;
      border-radius: 8px;
      font-size: 13px;
    }

    /* Container */
    .container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 60px;
    }

    /* Concept Card */
    .concept-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      position: relative;
    }
    .concept-card.featured {
      border: 2px solid var(--gold);
      box-shadow: 0 0 40px rgba(197, 161, 93, 0.2);
    }
    .concept-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 25px;
      flex-wrap: wrap;
      gap: 15px;
    }
    .c-badge {
      background: rgba(197, 161, 93, 0.15);
      color: var(--gold);
      border: 1px solid rgba(197, 161, 93, 0.4);
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
    }
    .c-title {
      font-size: 24px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .c-id {
      background: var(--gold);
      color: #111A26;
      font-weight: 800;
      font-size: 16px;
      padding: 2px 10px;
      border-radius: 6px;
    }
    .c-en {
      font-size: 13px;
      color: var(--muted);
      margin-top: 4px;
    }
    .c-desc {
      color: #cbd5e1;
      font-size: 14px;
      max-width: 750px;
      margin-top: 6px;
    }

    /* Palette row */
    .palette-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .color-swatch {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.2);
    }

    /* Images Grid */
    .images-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 20px;
      align-items: stretch;
    }
    @media (max-width: 900px) {
      .images-grid {
        grid-template-columns: 1fr;
      }
    }
    .img-box {
      background: #070B12;
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .img-box img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      object-position: top;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .img-box img:hover {
      transform: scale(1.02);
    }
    .img-caption {
      padding: 10px 14px;
      background: rgba(17, 26, 38, 0.95);
      border-top: 1px solid var(--border);
      font-size: 12px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .img-caption span {
      color: var(--gold);
    }

    /* Action Buttons */
    .c-actions {
      margin-top: 25px;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-gold {
      background: var(--gold);
      color: #111A26;
    }
    .btn-gold:hover {
      background: #e2ba72;
    }
    .btn-outline {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border);
      color: #fff;
    }
    .btn-outline:hover {
      background: rgba(255,255,255,0.1);
      border-color: var(--gold);
    }

    /* Modal Lightbox */
    #lightbox {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.92);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      padding: 30px;
    }
    #lightbox img {
      max-width: 95%;
      max-height: 95%;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 0 50px rgba(0,0,0,0.8);
    }
    #lightbox-close {
      position: absolute;
      top: 20px;
      right: 30px;
      color: #fff;
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <header class="header">
    <div class="badge">15 EXCLUSIVE ART DIRECTIONS — PHOTO GALLERY</div>
    <h1>معرض اللقطات البصرية الشاملة للاتجاهات الـ 15</h1>
    <p class="lead">استعراض مرئي كامل ومباشر لجميع شاشات سطح المكتب والجوال وبطاقات الألوان والأسطول لكل اتجاه فني صُمم لموقع ضيوف الرحمن VIP.</p>
    <div class="quick-stats">
      <span class="stat-pill">✨ 15 تصميماً معماريّاً مستقلاً</span>
      <span class="stat-pill">📱 لقطات شاشات الجوال وسطح المكتب بدقة 2K</span>
      <span class="stat-pill">🎨 لوحات ألوان حقيقية معتمدة</span>
      <span class="stat-pill">⚡ مزارات مكة 2.5س وكاش 100%</span>
    </div>
  </header>

  <main class="container">
    ${concepts.map((c) => {
      const isFeatured = c.id === 'D01';
      return `
      <section class="concept-card ${isFeatured ? 'featured' : ''}" id="${c.id}">
        <div class="concept-header">
          <div>
            <div class="c-title">
              <span class="c-id">${c.id}</span>
              <span>${c.title}</span>
              <span class="c-badge">${c.badge}</span>
            </div>
            <div class="c-en">${c.en}</div>
            <div class="c-desc">${c.desc}</div>
          </div>
          <div class="palette-row">
            ${c.colors.map(col => `<div class="color-swatch" style="background:${col};" title="${col}"></div>`).join('')}
          </div>
        </div>

        <div class="images-grid">
          <div class="img-box">
            <img src="${c.id}_DESKTOP_HOME.jpg" alt="${c.id} Desktop Home" onclick="openLightbox(this.src)" onerror="this.onerror=null; this.src='../the-15-directions/screenshots/${c.id}_DESKTOP_HOME.jpg'">
            <div class="img-caption">
              <strong>شاشة سطح المكتب (1440px)</strong>
              <span>${c.id}_DESKTOP_HOME</span>
            </div>
          </div>
          <div class="img-box">
            <img src="${c.id}_MOBILE_HOME.jpg" alt="${c.id} Mobile" onclick="openLightbox(this.src)" onerror="this.onerror=null; this.src='../the-15-directions/screenshots/${c.id}_MOBILE_HOME.jpg'">
            <div class="img-caption">
              <strong>شاشة الجوال الذكي (390px)</strong>
              <span>${c.id}_MOBILE_HOME</span>
            </div>
          </div>
          <div class="img-box">
            <img src="${c.id}_DESIGN_TOKENS.jpg" alt="${c.id} Tokens" onclick="openLightbox(this.src)" onerror="this.onerror=null; this.src='../the-15-directions/screenshots/${c.id}_DESIGN_TOKENS.jpg'">
            <div class="img-caption">
              <strong>بطاقة الألوان والخطوط</strong>
              <span>${c.id}_DESIGN_TOKENS</span>
            </div>
          </div>
        </div>

        <div class="c-actions">
          <a href="../the-15-directions/${c.id.toLowerCase()}/index.html" target="_blank" class="btn btn-gold">
            🌐 تجربة النموذج التفاعلي المباشر (${c.id})
          </a>
          <a href="#top" class="btn btn-outline">
            ⬆️ العودة للأعلى
          </a>
        </div>
      </section>
      `;
    }).join('')}
  </main>

  <div id="lightbox" onclick="closeLightbox()">
    <span id="lightbox-close">&times;</span>
    <img id="lightbox-img" src="" alt="Enlarged view">
  </div>

  <script>
    function openLightbox(src) {
      document.getElementById('lightbox-img').src = src;
      document.getElementById('lightbox').style.display = 'flex';
    }
    function closeLightbox() {
      document.getElementById('lightbox').style.display = 'none';
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(outPath1, html, 'utf8');
console.log('Saved:', outPath1);

try {
  fs.writeFileSync(outPath2, html, 'utf8');
  console.log('Saved:', outPath2);
} catch (e) {
  console.log('Could not write to outPath2:', e.message);
}
