import { spawn, execSync } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const projectRoot = 'D:/royal-umrah-cabs';
const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const fallbackEdge = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const binary = fs.existsSync(edgePath) ? edgePath : fallbackEdge;

const PORT = 3006;

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
        req.setTimeout(2000, () => req.destroy());
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`);
}

async function run() {
  console.log(`Starting production next server on port ${PORT}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: 'ignore',
    shell: true,
  });

  try {
    console.log(`Waiting for http://localhost:${PORT}/ar to respond...`);
    await waitForServer(`http://localhost:${PORT}/ar`);
    console.log('✓ Server is UP!');

    const pages = [
      { name: 'home_ar', path: '/ar', hDt: 2800, hMb: 2600 },
      { name: 'fleet_ar', path: '/ar/fleet', hDt: 2200, hMb: 2400 },
      { name: 'pricing_ar', path: '/ar/pricing', hDt: 2200, hMb: 2400 },
      { name: 'routes_ar', path: '/ar/routes', hDt: 2200, hMb: 2400 },
      { name: 'booking_ar', path: '/ar/booking', hDt: 1800, hMb: 2200 },
      { name: 'camry_detail_ar', path: '/ar/fleet/toyota-camry', hDt: 2200, hMb: 2400 },
    ];

    for (const p of pages) {
      const dtPath = path.join(artifactsDir, `luxury_${p.name}_dt.png`);
      const mbPath = path.join(artifactsDir, `luxury_${p.name}_mb.png`);

      console.log(`Capturing Desktop: ${p.path} -> ${p.name}...`);
      execSync(
        `"${binary}" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,${p.hDt} --screenshot="${dtPath}" "http://localhost:${PORT}${p.path}"`,
        { stdio: 'ignore' }
      );

      console.log(`Capturing Mobile: ${p.path} -> ${p.name}...`);
      execSync(
        `"${binary}" --headless=new --disable-gpu --hide-scrollbars --window-size=390,${p.hMb} --screenshot="${mbPath}" "http://localhost:${PORT}${p.path}"`,
        { stdio: 'ignore' }
      );
    }

    console.log('✓ All page screenshots captured successfully!');

    // Composite master transformation showcase
    console.log('Compositing master transformation showcase image...');
    const dtHome = path.join(artifactsDir, 'luxury_home_ar_dt.png');
    const mbHome = path.join(artifactsDir, 'luxury_home_ar_mb.png');

    const dtBuf = await sharp(dtHome)
      .extract({ left: 0, top: 0, width: 1440, height: 2600 })
      .resize(1040, 650)
      .toBuffer();

    const mbBuf = await sharp(mbHome)
      .extract({ left: 0, top: 0, width: 390, height: 2400 })
      .resize(300, 630)
      .toBuffer();

    const showcaseSvg = `
      <svg width="1600" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="spot" cx="60%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#D6A13A" stop-opacity="0.28"/>
            <stop offset="50%" stop-color="#D6A13A" stop-opacity="0.06"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1600" height="1080" fill="#090D15"/>
        <rect width="1600" height="1080" fill="url(#spot)"/>

        <!-- Header Bar -->
        <g transform="translate(60, 45)">
          <rect x="0" y="0" width="190" height="30" rx="15" fill="#D6A13A" fill-opacity="0.2" stroke="#D6A13A" stroke-width="1.2"/>
          <text x="95" y="19" font-family="'Segoe UI', Arial, sans-serif" font-size="11" font-weight="bold" fill="#D6A13A" text-anchor="middle" letter-spacing="1">MASTER LUXURY SUITE</text>
          <text x="210" y="24" font-family="'Segoe UI', Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF">ضيوف الرحمن VIP — التحول الرقمي الملكي الشامل</text>
          <text x="0" y="58" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="400" fill="#AEB7C4">Midnight Navy #090D15 • Champagne Gold #D6A13A • 100% Cash Policy &amp; Authoritative Data</text>
        </g>
        <line x1="60" y1="125" x2="1540" y2="125" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

        <!-- Laptop Frame -->
        <rect x="60" y="165" width="1060" height="690" rx="14" fill="#141D2C" stroke="#334155" stroke-width="2"/>
        <rect x="70" y="175" width="1040" height="30" rx="6" fill="#0B0F17"/>
        <circle cx="88" cy="190" r="4.5" fill="#FF5F56"/>
        <circle cx="104" cy="190" r="4.5" fill="#FFBD2E"/>
        <circle cx="120" cy="190" r="4.5" fill="#27C93F"/>
        <rect x="420" y="180" width="320" height="20" rx="10" fill="#1E293B"/>
        <text x="580" y="194" font-family="Arial, sans-serif" font-size="10" fill="#94A3B8" text-anchor="middle">duyufalrahmanvip.com/ar</text>

        <!-- Phone Frame -->
        <rect x="1180" y="215" width="320" height="650" rx="42" fill="#141D2C" stroke="#475569" stroke-width="2.5"/>
        <rect x="1185" y="220" width="310" height="640" rx="38" fill="#090D15"/>
        <rect x="1295" y="231" width="80" height="18" rx="9" fill="#000000"/>

        <!-- Bottom Guarantee Badges -->
        <g transform="translate(60, 1020)">
          <line x1="0" y1="0" x2="1480" y2="0" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          <text x="0" y="32" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="bold" fill="#10B981">✓ الدفع نقدا 100% للسائق عند الوصول بعد إتمام الرحلة</text>
          <text x="420" y="32" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="500" fill="#AEB7C4">✓ أسطول 2024 - 2026 معقم بأعلى المعايير</text>
          <text x="760" y="32" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="500" fill="#AEB7C4">✓ سائق خاص مرخص بزي سعودي رسمي</text>
          <text x="1120" y="32" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="500" fill="#D6A13A">✓ تتبع الرحلات وصالات VIP</text>
        </g>
      </svg>
    `;

    const showcaseOut = path.join(artifactsDir, 'luxury_master_digital_experience_showcase.jpg');

    await sharp(Buffer.from(showcaseSvg))
      .composite([
        { input: dtBuf, top: 205, left: 70 },
        { input: mbBuf, top: 220, left: 1185 },
      ])
      .jpeg({ quality: 92 })
      .toFile(showcaseOut);

    console.log(`✓ Showcase composited: ${showcaseOut}`);
  } finally {
    console.log('Stopping next production server...');
    server.kill();
    try {
      execSync('Stop-Process -Name node -Force -ErrorAction SilentlyContinue', { shell: 'powershell' });
    } catch {}
  }
}

run().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
