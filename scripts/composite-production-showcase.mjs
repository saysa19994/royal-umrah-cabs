import sharp from 'sharp';
import path from 'path';

const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const dtPath = path.join(artifactsDir, 'current_production_preview_ar_dt.png');
const mbPath = path.join(artifactsDir, 'current_production_preview_ar_mb.png');
const outPath = path.join(artifactsDir, 'current_production_live_showcase.jpg');

async function run() {
  console.log('Compositing live production showcase...');
  const dtBuf = await sharp(dtPath)
    .extract({ left: 0, top: 0, width: 1440, height: 2600 })
    .resize(1040, 650)
    .toBuffer();

  const mbBuf = await sharp(mbPath)
    .extract({ left: 0, top: 0, width: 390, height: 2400 })
    .resize(300, 630)
    .toBuffer();

  const canvasSvg = `
    <svg width="1600" height="1050" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="spot" cx="60%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#D6A13A" stop-opacity="0.25"/>
          <stop offset="60%" stop-color="#D6A13A" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="1050" fill="#090D15"/>
      <rect width="1600" height="1050" fill="url(#spot)"/>

      <g transform="translate(60, 40)">
        <rect x="0" y="0" width="160" height="28" rx="14" fill="#D6A13A" fill-opacity="0.25" stroke="#D6A13A" stroke-width="1.2"/>
        <text x="80" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="11" font-weight="bold" fill="#D6A13A" text-anchor="middle" letter-spacing="1">LIVE PRODUCTION BUILD</text>
        <text x="180" y="22" font-family="'Segoe UI', Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">ضيوف الرحمن VIP — التجربة الرقمية الملكية المعتمدة</text>
        <text x="0" y="55" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="400" fill="#AEB7C4">Next.js 15 App Router • 100% Matching Visual Reference • Real Supabase Database and Cash Policy</text>
      </g>
      <line x1="60" y1="115" x2="1540" y2="115" stroke="#1E293B" stroke-width="1"/>

      <!-- Laptop Frame -->
      <rect x="60" y="155" width="1060" height="690" rx="14" fill="#141D2C" stroke="#334155" stroke-width="2"/>
      <rect x="70" y="165" width="1040" height="30" rx="6" fill="#0B0F17"/>
      <circle cx="88" cy="180" r="4.5" fill="#FF5F56"/>
      <circle cx="104" cy="180" r="4.5" fill="#FFBD2E"/>
      <circle cx="120" cy="180" r="4.5" fill="#27C93F"/>
      <rect x="420" y="170" width="320" height="20" rx="10" fill="#1E293B"/>
      <text x="580" y="184" font-family="Arial, sans-serif" font-size="10" fill="#94A3B8" text-anchor="middle">duyufalrahmanvip.com/ar</text>

      <!-- Phone Frame -->
      <rect x="1180" y="210" width="320" height="650" rx="42" fill="#141D2C" stroke="#475569" stroke-width="2.5"/>
      <rect x="1185" y="215" width="310" height="640" rx="38" fill="#090D15"/>
      <rect x="1295" y="226" width="80" height="18" rx="9" fill="#000000"/>

      <g transform="translate(60, 995)">
        <line x1="0" y1="0" x2="1480" y2="0" stroke="#1E293B" stroke-width="1"/>
        <text x="0" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="500" fill="#10B981">✓ الدفع نقدا للسائق عند الوصول بعد انتهاء الرحلة</text>
        <text x="350" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="500" fill="#AEB7C4">✓ أسطول معقم 2024 - 2026</text>
        <text x="640" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="500" fill="#AEB7C4">✓ سائق خاص مرخص بزي سعودي رسمي</text>
        <text x="960" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="500" fill="#AEB7C4">✓ تتبع الرحلات وصالات كبار الشخصيات</text>
        <text x="1350" y="30" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="bold" fill="#D6A13A">DUYUF ALRAHMAN VIP</text>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(canvasSvg))
    .composite([
      { input: dtBuf, left: 70, top: 195 },
      { input: mbBuf, left: 1190, top: 220 }
    ])
    .jpeg({ quality: 94 })
    .toFile(outPath);

  console.log(`✓ Showcase created at: ${outPath}`);
}

run().catch(console.error);
