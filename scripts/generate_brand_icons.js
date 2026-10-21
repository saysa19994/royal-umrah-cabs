const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// SVG template for luxury VIP brand icon: Obsidian Deep Navy background with metallic royal gold emblem
function createIconSvg(size, isMaskable = false) {
  const padding = isMaskable ? Math.round(size * 0.1) : 0;
  const contentSize = size - padding * 2;
  const center = size / 2;
  const r = contentSize * 0.46;

  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0A0F1D" />
        <stop offset="50%" stop-color="#111827" />
        <stop offset="100%" stop-color="#060A14" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F5E396" />
        <stop offset="50%" stop-color="#D4AF37" />
        <stop offset="100%" stop-color="#AA7C11" />
      </linearGradient>
      <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#AA7C11" stop-opacity="0.2" />
      </linearGradient>
    </defs>

    <!-- Base Background -->
    <rect width="${size}" height="${size}" rx="${isMaskable ? 0 : Math.round(size * 0.2)}" fill="url(#bgGrad)" />

    <!-- Outer Gold Border -->
    <circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="url(#goldGrad)" stroke-width="${Math.max(2, Math.round(size * 0.025))}" />

    <!-- Inner Subtle Glow Ring -->
    <circle cx="${center}" cy="${center}" r="${r * 0.88}" fill="none" stroke="url(#goldGlow)" stroke-width="${Math.max(1, Math.round(size * 0.01))}" stroke-dasharray="4 2" />

    <!-- Center Monogram "DAV" & Crescent VIP Motif -->
    <g transform="translate(${center}, ${center}) scale(${size / 200})">
      <!-- Top Crown / Star -->
      <polygon points="0,-60 6,-46 22,-46 10,-36 14,-20 0,-30 -14,-20 -10,-36 -22,-46 -6,-46" fill="url(#goldGrad)" />
      
      <!-- Monogram DAV -->
      <text x="0" y="8" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="34" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">DAV</text>
      
      <!-- Subtext VIP -->
      <rect x="-30" y="20" width="60" height="15" rx="3" fill="#0A0F1D" stroke="url(#goldGrad)" stroke-width="1.2" />
      <text x="0" y="32" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="800" font-size="11" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">VIP</text>

      <!-- Bottom Crescent Accent -->
      <path d="M -40,48 Q 0,62 40,48 Q 0,55 -40,48 Z" fill="url(#goldGrad)" opacity="0.9" />
    </g>
  </svg>
  `;
}

async function generateAllIcons() {
  const targets = [
    { file: 'public/icon-192.png', size: 192, maskable: false },
    { file: 'public/icon-512.png', size: 512, maskable: false },
    { file: 'public/icon-maskable-512.png', size: 512, maskable: true },
    { file: 'src/app/icon.png', size: 48, maskable: false },
    { file: 'src/app/apple-icon.png', size: 180, maskable: false },
    { file: 'public/favicon.ico', size: 48, maskable: false },
  ];

  for (const t of targets) {
    const fullPath = path.resolve(t.file);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const svg = Buffer.from(createIconSvg(t.size, t.maskable));
    if (t.file.endsWith('.ico')) {
      await sharp(svg).resize(t.size, t.size).toFormat('png').toFile(fullPath);
    } else {
      await sharp(svg).resize(t.size, t.size).png().toFile(fullPath);
    }
    console.log(`Generated: ${t.file} (${t.size}x${t.size})`);
  }

  // Generate web manifest
  const manifest = {
    name: 'Duyuf Alrahman VIP | ضيوف الرحمن VIP',
    short_name: 'Duyuf Alrahman',
    description: 'Executive Private Umrah & Hajj Chauffeur Service in Saudi Arabia',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0F1D',
    theme_color: '#0A0F1D',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };

  fs.writeFileSync(
    path.resolve('src/app/manifest.webmanifest'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  console.log('Generated: src/app/manifest.webmanifest');
}

generateAllIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
