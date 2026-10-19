import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = path.join(process.cwd(), 'public/assets/images');
const bgPath = path.join(imgDir, 'yukon_exterior.jpg');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // Background resized and modulated
  const baseImg = await sharp(bgPath)
    .resize(width, height, { fit: 'cover' })
    .modulate({ brightness: 0.55 })
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#041c14" stop-opacity="0.88" />
          <stop offset="60%" stop-color="#0a0f0d" stop-opacity="0.75" />
          <stop offset="100%" stop-color="#141210" stop-opacity="0.9" />
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#D4AF37" />
          <stop offset="50%" stop-color="#F3E5AB" />
          <stop offset="100%" stop-color="#AA771C" />
        </linearGradient>
      </defs>
      <!-- Gradient overlay -->
      <rect width="${width}" height="${height}" fill="url(#grad)" />

      <!-- Decorative gold frame -->
      <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="url(#gold)" stroke-width="2" stroke-opacity="0.4" />

      <!-- Pill Badge -->
      <rect x="80" y="80" width="340" height="44" rx="22" fill="#D4AF37" fill-opacity="0.15" stroke="#D4AF37" stroke-width="1.5" />
      <text x="250" y="108" font-family="sans-serif" font-size="14" font-weight="bold" fill="#F3E5AB" text-anchor="middle" letter-spacing="3">ROYAL PILGRIM TRANSPORT</text>

      <!-- Main English Title -->
      <text x="80" y="200" font-family="sans-serif" font-size="56" font-weight="800" fill="#FFFFFF" letter-spacing="-1">ROYAL UMRAH CABS</text>
      
      <!-- Subtitle -->
      <text x="80" y="270" font-family="sans-serif" font-size="32" font-weight="700" fill="url(#gold)">VIP Private Chauffeur &amp; Pilgrim Transport</text>
      <text x="80" y="335" font-family="sans-serif" font-size="24" font-weight="400" fill="#D1D5DB">Luxury Fleet: GMC Yukon XL, Hyundai Staria, Camry &amp; HiAce</text>

      <!-- Route Highlights -->
      <rect x="80" y="410" width="1040" height="120" rx="16" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.1" />
      
      <circle cx="120" cy="470" r="6" fill="#D4AF37" />
      <text x="140" y="477" font-family="sans-serif" font-size="20" font-weight="600" fill="#FFFFFF">Jeddah Airport (KAIA)</text>
      
      <circle cx="450" cy="470" r="6" fill="#D4AF37" />
      <text x="470" y="477" font-family="sans-serif" font-size="20" font-weight="600" fill="#FFFFFF">Makkah Al-Mukarramah</text>
      
      <circle cx="800" cy="470" r="6" fill="#D4AF37" />
      <text x="820" y="477" font-family="sans-serif" font-size="20" font-weight="600" fill="#FFFFFF">Madinah Al-Munawwarah</text>
    </svg>
  `);

  const ogBuf = await sharp(baseImg)
    .composite([{ input: svgOverlay }])
    .jpeg({ quality: 90 })
    .toBuffer();

  fs.writeFileSync(path.join(imgDir, 'og-image.jpg'), ogBuf);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'og-image.jpg'), ogBuf);
  console.log('OG Image generated. Size:', (ogBuf.length / 1024).toFixed(1) + ' KB');
}

createOgImage().catch((err) => {
  console.error(err);
  process.exit(1);
});
