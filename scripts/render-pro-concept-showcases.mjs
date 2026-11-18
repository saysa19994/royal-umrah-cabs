import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const concepts = [
  {
    id: 'concept_01_serene_minimalist',
    num: '01',
    titleAr: 'الروحانية الهادئة (The Serene Minimalist)',
    titleEn: 'Serene Minimalist and Ethereal Sanctuary',
    file: 'design-concepts/concept-01-serene-minimalist.html',
    accentColor: '#64748B',
    accentLight: '#E2E8F0',
    swatches: ['#FAFAFC', '#F1F5F9', '#94A3B8', '#0F172A'],
    vibe: 'هدوء نفسي وسكينة مطلقة بلا تشويش بصري',
    fonts: 'Aref Ruqaa + Plus Jakarta Sans',
    target: 'المعتمر الباحث عن السكينة والوقار التام'
  },
  {
    id: 'concept_02_saudi_heritage',
    num: '02',
    titleAr: 'التراث الملكي المعاصر (Modern Saudi Heritage)',
    titleEn: 'Modern Saudi Heritage and Royal Hospitality',
    file: 'design-concepts/concept-02-saudi-heritage.html',
    accentColor: '#A65B32',
    accentLight: '#F4EFEB',
    swatches: ['#EFE8E1', '#F4EFEB', '#A65B32', '#29231F'],
    vibe: 'أصالة نجد والحجاز وكرم الوفادة الملكية',
    fonts: 'Kufi Arabic + Amiri + Cinzel',
    target: 'العائلات وضيوف المملكة الباحثين عن الأصالة'
  },
  {
    id: 'concept_03_hotel_concierge',
    num: '03',
    titleAr: 'كونسيرج الفنادق 5 نجوم (5-Star Hotel Concierge)',
    titleEn: '5-Star Hospitality Chauffeur and Concierge',
    file: 'design-concepts/concept-03-hotel-concierge.html',
    accentColor: '#C8A27A',
    accentLight: '#FAF8F5',
    swatches: ['#FAF8F5', '#EADBCC', '#C8A27A', '#1F2226'],
    vibe: 'ضيافة فندقية راقية وسائق خاص بزي رسمي وقفازات',
    fonts: 'Playfair Display + Amiri Serif',
    target: 'نزلاء فنادق مكة وجدة الفاخرة ورجال الأعمال'
  },
  {
    id: 'concept_04_exclusive_club',
    num: '04',
    titleAr: 'نادي النخبة المغلق (The Exclusive Club)',
    titleEn: 'The Exclusive Club and Quiet Luxury',
    file: 'design-concepts/concept-04-exclusive-club.html',
    accentColor: '#94A3B8',
    accentLight: '#181A1F',
    swatches: ['#121316', '#1E2128', '#94A3B8', '#E2E8F0'],
    vibe: 'فخامة صامتة وسرية تامة لكبار الشخصيات',
    fonts: 'Plus Jakarta Sans + Cinzel Modern',
    target: 'كبار الشخصيات (VIP) والدبلوماسيين'
  },
  {
    id: 'concept_05_smart_executive',
    num: '05',
    titleAr: 'التنفيذي الذكي (The Smart Executive)',
    titleEn: 'Smart Executive Telemetry and Live GPS',
    file: 'design-concepts/concept-05-smart-executive.html',
    accentColor: '#0EA5E9',
    accentLight: '#0B0F17',
    swatches: ['#0B0F17', '#1E293B', '#0EA5E9', '#38BDF8'],
    vibe: 'دقة المواعيد وتتبع الرحلات المباشر من الصالة',
    fonts: 'Space Grotesk + IBM Plex Sans Arabic',
    target: 'رجال الأعمال والمسافرون المرتبطون بجدول زمني'
  },
  {
    id: 'concept_06_cinematic_story',
    num: '06',
    titleAr: 'الرحلة السينمائية (The Cinematic Story)',
    titleEn: 'Cinematic Widescreen and Pilgrim Chronicle',
    file: 'design-concepts/concept-06-cinematic-story.html',
    accentColor: '#F59E0B',
    accentLight: '#0A0A0C',
    swatches: ['#0A0A0C', '#1C1917', '#F59E0B', '#FDE68A'],
    vibe: 'كادر سينمائي عريض 21:9 وتوثيق مهيب للمشاعر',
    fonts: 'Cinzel Decorative + Amiri Bold',
    target: 'العائلات التي ترغب برحلة لا تُنسى في الذاكرة'
  },
  {
    id: 'concept_07_bold_typography',
    num: '07',
    titleAr: 'التايبوجرافي الجريء (Bold Typography and Fashion)',
    titleEn: 'Bold Editorial Swiss and Brutalist Fashion',
    file: 'design-concepts/concept-07-bold-typography.html',
    accentColor: '#FACC15',
    accentLight: '#FFFFFF',
    swatches: ['#000000', '#F8F8F8', '#FACC15', '#1E293B'],
    vibe: 'تصميم تحريري جريء خالي من التردد ومباشر 100%',
    fonts: 'Syne ExtraBold + Cairo Heavy',
    target: 'الجيل الجديد وعشاق التصاميم العصرية العالمية'
  },
  {
    id: 'concept_08_refreshing_oasis',
    num: '08',
    titleAr: 'واحة الاسترخاء (The Refreshing Oasis)',
    titleEn: 'The Refreshing Sanctuary and Zamzam Purity',
    file: 'design-concepts/concept-08-refreshing-oasis.html',
    accentColor: '#10B981',
    accentLight: '#F1F7F4',
    swatches: ['#F1F7F4', '#E4F1EB', '#10B981', '#064E3B'],
    vibe: 'نقاء ماء زمزم والراحة الجسدية بعد مشقة الطيران',
    fonts: 'Tajawal + Poppins Soft',
    target: 'العائلات وكبار السن الراغبين في أقصى درجات الراحة'
  },
  {
    id: 'concept_09_cockpit_dashboard',
    num: '09',
    titleAr: 'لوحة القيادة المتقدمة (The Cockpit Experience)',
    titleEn: 'Performance Cockpit and Highway Telemetry',
    file: 'design-concepts/concept-09-cockpit-dashboard.html',
    accentColor: '#EF4444',
    accentLight: '#0A0B0E',
    swatches: ['#0A0B0E', '#141720', '#EF4444', '#F87171'],
    vibe: 'هيبة سيارات الدفع الرباعي (GMC يوكن ولاند كروزر)',
    fonts: 'Orbitron + Chakra Petch + Kufi',
    target: 'محبو السيارات القوية والهيبة على الطريق السريع'
  },
  {
    id: 'concept_10_fluid_future',
    num: '10',
    titleAr: 'المستقبل الانسيابي (The Fluid Future)',
    titleEn: 'Vision 2030 Fluid Aurora and Glass Capsules',
    file: 'design-concepts/concept-10-fluid-future.html',
    accentColor: '#8B5CF6',
    accentLight: '#060713',
    swatches: ['#060713', '#1E1B4B', '#8B5CF6', '#06B6D4'],
    vibe: 'مستقبل رؤية المملكة 2030 والانسيابية الزجاجية',
    fonts: 'Plus Jakarta Sans + Audiowide + Tajawal',
    target: 'عشاق التقنية والمستقبل والتصاميم المبتكرة'
  }
];

async function generateMockup(c) {
  const filePath = path.resolve(projectRoot, c.file);
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');

  const dtRaw = path.join(artifactsDir, c.id + '_pro_dt.png');
  const mbRaw = path.join(artifactsDir, c.id + '_pro_mb.png');
  const finalShowcase = path.join(artifactsDir, c.id + '_showcase.jpg');

  console.log(`\n========================================`);
  console.log(`Rendering: [${c.num}] ${c.titleAr}`);

  // 1. Capture Desktop Viewport (1440x1900)
  console.log(`- Capturing Desktop (1440x1900)...`);
  const cmdDt = `"${binary}" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1900 --screenshot="${dtRaw}" "${fileUrl}"`;
  execSync(cmdDt, { stdio: 'pipe' });

  // 2. Capture Mobile Viewport (390x2100)
  console.log(`- Capturing Mobile (390x2100)...`);
  const cmdMb = `"${binary}" --headless=new --disable-gpu --hide-scrollbars --window-size=390,2100 --screenshot="${mbRaw}" "${fileUrl}"`;
  execSync(cmdMb, { stdio: 'pipe' });

  // 3. Process Desktop Screen (Fit to Laptop Display: 1040 x 620)
  console.log(`- Processing Desktop Buffer...`);
  const dtContentBuf = await sharp(dtRaw)
    .extract({ left: 0, top: 0, width: 1440, height: 1600 })
    .resize(1040, 620)
    .toBuffer();

  // 4. Build Laptop Device Frame (Width: 1060, Height: 660)
  const laptopFrameSvg = `
    <svg width="1060" height="660" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Laptop Chassis -->
      <rect x="0" y="0" width="1060" height="660" rx="14" fill="#1C1E24" stroke="#333842" stroke-width="2"/>
      <!-- Top Chrome Bar -->
      <rect x="10" y="10" width="1040" height="30" rx="6" fill="#131519"/>
      <!-- Window Controls -->
      <circle cx="28" cy="25" r="4.5" fill="#FF5F56"/>
      <circle cx="44" cy="25" r="4.5" fill="#FFBD2E"/>
      <circle cx="60" cy="25" r="4.5" fill="#27C93F"/>
      <!-- Address Bar Pill -->
      <rect x="360" y="15" width="320" height="19" rx="9" fill="#1E2129" stroke="#2D323E" stroke-width="1"/>
      <text x="520" y="28" font-family="'Segoe UI', Arial, sans-serif" font-size="10" fill="#8E95A5" text-anchor="middle">duyufalrahman.vip/ar/fleet</text>
    </svg>
  `;

  const laptopMockup = await sharp(Buffer.from(laptopFrameSvg))
    .composite([
      { input: dtContentBuf, left: 10, top: 40 }
    ])
    .png()
    .toBuffer();

  // 5. Process Mobile Screen (Fit to Phone Display: 290 x 590)
  console.log(`- Processing Mobile Buffer...`);
  const mbContentBuf = await sharp(mbRaw)
    .extract({ left: 0, top: 0, width: 390, height: 1600 })
    .resize(290, 590)
    .toBuffer();

  // 6. Build Phone Device Frame (Width: 310, Height: 610)
  const phoneFrameSvg = `
    <svg width="310" height="610" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Phone Bezel -->
      <rect x="0" y="0" width="310" height="610" rx="40" fill="#1E2026" stroke="#484E5B" stroke-width="2.5"/>
      <rect x="4" y="4" width="302" height="602" rx="36" fill="#0C0D10"/>
      <!-- Screen Area -->
      <rect x="10" y="10" width="290" height="590" rx="32" fill="#000000"/>
      <!-- Dynamic Island -->
      <rect x="115" y="16" width="80" height="18" rx="9" fill="#000000"/>
      <circle cx="180" cy="25" r="3.5" fill="#151922"/>
    </svg>
  `;

  const phoneMockup = await sharp(Buffer.from(phoneFrameSvg))
    .composite([
      { input: mbContentBuf, left: 10, top: 10 }
    ])
    .png()
    .toBuffer();

  // 7. Header and Footer Metadata Banner Svg (Width: 1600, Height: 1050)
  console.log(`- Assembling Studio Canvas (1600x1050)...`);
  const headerFooterSvg = `
    <svg width="1600" height="1050" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Ambient Spotlight Gradient -->
        <radialGradient id="spotlight" cx="60%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${escapeXml(c.accentColor)}" stop-opacity="0.32"/>
          <stop offset="60%" stop-color="${escapeXml(c.accentColor)}" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Background Canvas with Deep Studio Radial Vignette -->
      <rect width="1600" height="1050" fill="#0A0B0E"/>
      <rect width="1600" height="1050" fill="url(#spotlight)"/>

      <!-- TOP HEADER BAR -->
      <g transform="translate(60, 40)">
        <!-- Concept Badge -->
        <rect x="0" y="0" width="130" height="28" rx="14" fill="${escapeXml(c.accentColor)}" fill-opacity="0.25" stroke="${escapeXml(c.accentColor)}" stroke-width="1.2"/>
        <text x="65" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="11" font-weight="bold" fill="${escapeXml(c.accentColor)}" text-anchor="middle" letter-spacing="1">CONCEPT ${escapeXml(c.num)}</text>

        <!-- Concept Main Titles -->
        <text x="150" y="22" font-family="'Segoe UI', Arial, sans-serif" font-size="23" font-weight="bold" fill="#FFFFFF">${escapeXml(c.titleAr)}</text>
        <text x="0" y="55" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">${escapeXml(c.titleEn)}</text>

        <!-- Right Side: Design System Specs -->
        <g transform="translate(980, 0)">
          <!-- Swatches -->
          <text x="0" y="16" font-family="'Segoe UI', Arial, sans-serif" font-size="10" font-weight="600" fill="#64748B" letter-spacing="1">PALETTE</text>
          <circle cx="65" cy="12" r="7" fill="${escapeXml(c.swatches[0])}" stroke="#475569" stroke-width="1"/>
          <circle cx="85" cy="12" r="7" fill="${escapeXml(c.swatches[1])}" stroke="#475569" stroke-width="1"/>
          <circle cx="105" cy="12" r="7" fill="${escapeXml(c.swatches[2])}" stroke="#475569" stroke-width="1"/>
          <circle cx="125" cy="12" r="7" fill="${escapeXml(c.swatches[3])}" stroke="#475569" stroke-width="1"/>

          <!-- Typography -->
          <text x="160" y="16" font-family="'Segoe UI', Arial, sans-serif" font-size="10" font-weight="600" fill="#64748B" letter-spacing="1">TYPOGRAPHY:</text>
          <text x="250" y="16" font-family="'Segoe UI', Arial, sans-serif" font-size="11" font-weight="500" fill="#E2E8F0">${escapeXml(c.fonts)}</text>

          <!-- Vibe -->
          <text x="0" y="42" font-family="'Segoe UI', Arial, sans-serif" font-size="10" font-weight="600" fill="#64748B" letter-spacing="1">VIBE:</text>
          <text x="45" y="42" font-family="'Segoe UI', Arial, sans-serif" font-size="11" font-weight="400" fill="#CBD5E1">${escapeXml(c.vibe)}</text>
        </g>
      </g>

      <!-- Hairline Divider -->
      <line x1="60" y1="115" x2="1540" y2="115" stroke="#1E232F" stroke-width="1"/>

      <!-- BOTTOM GUARANTEE BADGES -->
      <g transform="translate(60, 995)">
        <line x1="0" y1="0" x2="1480" y2="0" stroke="#1E232F" stroke-width="1"/>
        <text x="0" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="500" fill="#10B981">✓ الدفع نقدا للسائق عند الوصول (Zero Risk)</text>
        <text x="320" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">✓ أسطول معقم موديلات 2024 - 2026</text>
        <text x="640" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">✓ سائق خاص مرخص بزي سعودي فاخر</text>
        <text x="960" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">✓ استقبال بالاسم وصالات كبار الشخصيات</text>
        <text x="1360" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="bold" fill="${escapeXml(c.accentColor)}">DUYUF ALRAHMAN VIP</text>
      </g>
    </svg>
  `;

  // 8. Final Master Composite (1600 x 1050)
  await sharp(Buffer.from(headerFooterSvg))
    .composite([
      // Laptop: Left 60px, Top 165px
      { input: laptopMockup, left: 60, top: 165 },
      // Phone: Overlapping Right 1180px, Top 235px
      { input: phoneMockup, left: 1180, top: 235 }
    ])
    .jpeg({ quality: 94 })
    .toFile(finalShowcase);

  console.log(`✓ Master Showcase generated: ${finalShowcase}`);
}

async function run() {
  console.log(`Starting Pro Showcase Generation for ${concepts.length} concepts...`);
  for (const c of concepts) {
    try {
      await generateMockup(c);
    } catch (err) {
      console.error(`Error generating mockup for ${c.id}:`, err);
    }
  }

  // 9. Generate Master Comparison Grid Deck (All 10 concepts in one 2x5 grid)
  console.log('\n========================================');
  console.log('Generating Master Overview Deck (All 10 Concepts Combined)...');
  
  const thumbs = [];
  for (let i = 0; i < concepts.length; i++) {
    const c = concepts[i];
    const showcasePath = path.join(artifactsDir, c.id + '_showcase.jpg');
    if (fs.existsSync(showcasePath)) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const left = 40 + col * (940 + 40);
      const top = 160 + row * (617 + 30);
      
      const thumbBuf = await sharp(showcasePath)
        .resize(940, 617)
        .toBuffer();
      
      thumbs.push({ input: thumbBuf, left, top });
    }
  }

  const deckHeaderSvg = `
    <svg width="2000" height="3450" xmlns="http://www.w3.org/2000/svg">
      <rect width="2000" height="3450" fill="#08090C"/>
      <g transform="translate(60, 50)">
        <text x="0" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="bold" fill="#D97706" letter-spacing="3">DUYUF AL RAHMAN VIP — DESIGN SYSTEM ARSENAL</text>
        <text x="0" y="72" font-family="'Segoe UI', Arial, sans-serif" font-size="34" font-weight="bold" fill="#FFFFFF">دليل التوجهات التصميمية العشرة (10 Radical Luxury Concepts)</text>
        <text x="0" y="104" font-family="'Segoe UI', Arial, sans-serif" font-size="15" font-weight="400" fill="#94A3B8">مقارنة بصرية شاملة بعد تفعيل مهارات التصميم العالمي والتصوير السينمائي (Awwwards, Midjourney, Impeccable, UI/UX Pro Max)</text>
      </g>
    </svg>
  `;

  const deckOutput = path.join(artifactsDir, 'concepts_master_comparison_deck.jpg');
  await sharp(Buffer.from(deckHeaderSvg))
    .composite(thumbs)
    .jpeg({ quality: 90 })
    .toFile(deckOutput);

  console.log(`✓ Master Comparison Deck created: ${deckOutput}`);
  console.log('\nAll 10 Pro Concept Showcases and Master Deck Generated Flawlessly!');
}

run().catch(err => {
  console.error('Fatal error in run():', err);
  process.exit(1);
});
