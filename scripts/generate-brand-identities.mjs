import fs from 'fs';
import path from 'path';

const brandDir = 'd:\\royal-umrah-cabs\\public\\assets\\brand';
if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
}

// ---------------------------------------------------------------------------
// CONCEPT A: DESERT MODERNISM
// Colors: Deep Olive #34483B, Aged Copper #B77C4D, Limestone #F3EFE5, Charcoal #292821
// Symbol: Architectural Arch & Sacred Path (المحراب والسبيل)
// ---------------------------------------------------------------------------

function createConceptALogo(theme = 'color') {
  const isDark = theme === 'reverse';
  const isMono = theme === 'mono';
  
  const archStroke = isMono ? (isDark ? '#FFFFFF' : '#292821') : '#B77C4D';
  const fillAccent = isMono ? (isDark ? '#FFFFFF' : '#292821') : '#34483B';
  const textPrimary = isDark ? '#FBF9F4' : '#292821';
  const textSecondary = isMono ? (isDark ? '#DCCDB6' : '#6E6A60') : (isDark ? '#DCCDB6' : '#B77C4D');
  const bgRect = isDark ? `<rect width="640" height="160" rx="12" fill="#292821"/>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 160" width="640" height="160">
  ${bgRect}
  <g transform="translate(40, 20)">
    <!-- Architectural Arch & Horizon Path Symbol (120x120) -->
    <g transform="translate(10, 0)">
      <!-- Outer Architectural Arch -->
      <path d="M 15 110 L 15 65 C 15 30 35 12 55 5 C 75 12 95 30 95 65 L 95 110" 
            fill="none" stroke="${archStroke}" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Inner Floating Arch -->
      <path d="M 27 110 L 27 68 C 27 42 41 26 55 18 C 69 26 83 42 83 68 L 83 110" 
            fill="none" stroke="${fillAccent}" stroke-width="1.75" stroke-dasharray="2 3"/>
      <!-- Converging Sacred Path (Perspective) -->
      <path d="M 38 110 L 52 58 L 58 58 L 72 110 Z" 
            fill="${archStroke}" fill-opacity="0.18" stroke="${archStroke}" stroke-width="1"/>
      <!-- Central Guiding Line -->
      <line x1="55" y1="110" x2="55" y2="58" stroke="${archStroke}" stroke-width="1.5"/>
      <!-- Sanctuary Keystone Diamond -->
      <polygon points="55,42 61,50 55,58 49,50" fill="${fillAccent}"/>
      <circle cx="55" cy="50" r="2" fill="${isDark ? '#FBF9F4' : '#F3EFE5'}"/>
      <!-- Ground Horizon Line -->
      <line x1="6" y1="110" x2="104" y2="110" stroke="${archStroke}" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Bilingual Typography Block -->
    <g transform="translate(145, 18)">
      <!-- Arabic Calligraphic / Modern Kufic Wordmark -->
      <text x="0" y="32" font-family="'IBM Plex Sans Arabic', 'Amiri', 'Traditional Arabic', serif" 
            font-size="30" font-weight="700" fill="${textPrimary}" letter-spacing="0.02em">
        ضيوف الرحمن
      </text>
      <!-- VIP Badge Tag in Arabic / English -->
      <rect x="200" y="10" width="58" height="24" rx="4" fill="${fillAccent}" fill-opacity="${isDark ? '0.85' : '1'}"/>
      <text x="229" y="27" font-family="'Cinzel', 'Playfair Display', 'DM Sans', sans-serif" 
            font-size="12" font-weight="700" fill="#FBF9F4" text-anchor="middle" letter-spacing="0.16em">
        VIP
      </text>

      <!-- Latin Brand Title -->
      <text x="0" y="65" font-family="'Cinzel', 'Playfair Display', Georgia, serif" 
            font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="0.22em">
        DUYUF ALRAHMAN
      </text>
      
      <!-- Sub-headline Descriptor -->
      <text x="0" y="86" font-family="'DM Sans', 'IBM Plex Sans', sans-serif" 
            font-size="10" font-weight="600" fill="${textSecondary}" letter-spacing="0.26em">
        ROYAL PRIVATE MOBILITY &amp; CONCIERGE
      </text>
    </g>
  </g>
</svg>`;
}

// ---------------------------------------------------------------------------
// CONCEPT B: ROYAL EDITORIAL
// Colors: Royal Burgundy #542E32, Antique Bronze #B38B62, Warm Ivory #F8F4EC
// Symbol: Octagonal Heritage Medallion & Royal Monogram (الخاتم الملكي)
// ---------------------------------------------------------------------------

function createConceptBLogo(theme = 'color') {
  const isDark = theme === 'reverse';
  const isMono = theme === 'mono';
  
  const bronzeStroke = isMono ? (isDark ? '#FFFFFF' : '#302825') : '#B38B62';
  const burgundyFill = isMono ? (isDark ? '#FFFFFF' : '#302825') : '#542E32';
  const textPrimary = isDark ? '#F8F4EC' : '#302825';
  const textSecondary = isMono ? (isDark ? '#E8DDCF' : '#6A625E') : (isDark ? '#E8DDCF' : '#B38B62');
  const bgRect = isDark ? `<rect width="640" height="160" rx="12" fill="#302825"/>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 160" width="640" height="160">
  ${bgRect}
  <g transform="translate(40, 20)">
    <!-- Octagonal Royal Medallion (110x110) -->
    <g transform="translate(10, 5)">
      <!-- Outer Octagon -->
      <polygon points="55,5 90,20 105,55 90,90 55,105 20,90 5,55 20,20" 
               fill="none" stroke="${bronzeStroke}" stroke-width="2"/>
      <!-- Inner Octagon -->
      <polygon points="55,13 83,25 95,55 83,85 55,97 27,85 15,55 27,25" 
               fill="${burgundyFill}" fill-opacity="${isDark ? '0.6' : '0.12'}" stroke="${bronzeStroke}" stroke-width="1"/>
      <!-- Central Diamond & Crest Monogram -->
      <polygon points="55,28 75,55 55,82 35,55" fill="none" stroke="${bronzeStroke}" stroke-width="1.5"/>
      <circle cx="55" cy="55" r="14" fill="${burgundyFill}"/>
      <!-- Interlocked D Monogram -->
      <text x="55" y="61" font-family="'Playfair Display', Georgia, serif" 
            font-size="16" font-weight="700" fill="${isDark ? '#F8F4EC' : '#F8F4EC'}" text-anchor="middle">
        D
      </text>
      <!-- Four Corner Starlets -->
      <circle cx="55" cy="18" r="1.5" fill="${bronzeStroke}"/>
      <circle cx="55" cy="92" r="1.5" fill="${bronzeStroke}"/>
      <circle cx="18" cy="55" r="1.5" fill="${bronzeStroke}"/>
      <circle cx="92" cy="55" r="1.5" fill="${bronzeStroke}"/>
    </g>

    <!-- Typography Block -->
    <g transform="translate(145, 18)">
      <text x="0" y="32" font-family="'Amiri', 'IBM Plex Sans Arabic', serif" 
            font-size="31" font-weight="700" fill="${textPrimary}" letter-spacing="0.04em">
        ضيوف الرحمن
      </text>
      
      <!-- Crest Divider Line -->
      <line x1="0" y1="46" x2="280" y2="46" stroke="${bronzeStroke}" stroke-width="1" stroke-opacity="0.4"/>
      <polygon points="140,43 144,46 140,49 136,46" fill="${bronzeStroke}"/>

      <text x="0" y="68" font-family="'Playfair Display', Georgia, serif" 
            font-size="16" font-weight="700" fill="${textPrimary}" letter-spacing="0.2em">
        DUYUF ALRAHMAN VIP
      </text>
      <text x="0" y="88" font-family="'DM Sans', sans-serif" 
            font-size="9" font-weight="600" fill="${textSecondary}" letter-spacing="0.28em">
        HAUTE MOBILITÉ &amp; SERVICE ROYAL
      </text>
    </g>
  </g>
</svg>`;
}

// ---------------------------------------------------------------------------
// CONCEPT C: CINEMATIC SANDSTONE
// Colors: Sandstone #E8DCC9, Deep Espresso #29251F, Burnt Terracotta #B96746, Olive #78806A
// Symbol: Horizon Sun Portal & Converging Desert Highway (أفق الرحلة)
// ---------------------------------------------------------------------------

function createConceptCLogo(theme = 'color') {
  const isDark = theme === 'reverse';
  const isMono = theme === 'mono';
  
  const terraStroke = isMono ? (isDark ? '#FFFFFF' : '#29251F') : '#B96746';
  const oliveAccent = isMono ? (isDark ? '#FFFFFF' : '#29251F') : '#78806A';
  const textPrimary = isDark ? '#F8F5EF' : '#29251F';
  const textSecondary = isMono ? (isDark ? '#E8DCC9' : '#6A655C') : (isDark ? '#E8DCC9' : '#B96746');
  const bgRect = isDark ? `<rect width="640" height="160" rx="12" fill="#29251F"/>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 160" width="640" height="160">
  ${bgRect}
  <g transform="translate(40, 20)">
    <!-- Horizon Portal & Converging Highway (110x110) -->
    <g transform="translate(10, 5)">
      <!-- Outer Circle Portal -->
      <circle cx="55" cy="55" r="48" fill="none" stroke="${terraStroke}" stroke-width="2"/>
      <!-- Sun Disc (Upper Half) -->
      <path d="M 23 55 A 32 32 0 0 1 87 55 Z" fill="${terraStroke}" fill-opacity="${isDark ? '0.45' : '0.2'}"/>
      <circle cx="55" cy="55" r="16" fill="${terraStroke}"/>
      <!-- Converging Highway into Sun -->
      <path d="M 32 100 L 51 55 L 59 55 L 78 100 Z" fill="${isDark ? '#29251F' : '#F8F5EF'}" stroke="${terraStroke}" stroke-width="1.5"/>
      <line x1="55" y1="100" x2="55" y2="60" stroke="${terraStroke}" stroke-width="1.5" stroke-dasharray="4 3"/>
      <!-- Horizon Baseline -->
      <line x1="12" y1="55" x2="98" y2="55" stroke="${oliveAccent}" stroke-width="1.5"/>
    </g>

    <!-- Typography Block -->
    <g transform="translate(145, 18)">
      <text x="0" y="32" font-family="'IBM Plex Sans Arabic', 'Amiri', serif" 
            font-size="30" font-weight="700" fill="${textPrimary}" letter-spacing="0.02em">
        ضيوف الرحمن
      </text>
      
      <text x="0" y="65" font-family="'Cinzel', 'Playfair Display', Georgia, serif" 
            font-size="17" font-weight="700" fill="${textPrimary}" letter-spacing="0.22em">
        DUYUF ALRAHMAN
      </text>
      <text x="0" y="86" font-family="'DM Sans', sans-serif" 
            font-size="10" font-weight="700" fill="${textSecondary}" letter-spacing="0.24em">
        VIP CHAUFFEUR MOBILITY • KINGDOM OF SAUDI ARABIA
      </text>
    </g>
  </g>
</svg>`;
}

// Favicons (Square 64x64)
function createFavicon(concept) {
  if (concept === 'a') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
      <rect width="64" height="64" rx="14" fill="#34483B"/>
      <path d="M 12 56 L 12 34 C 12 18 22 8 32 4 C 42 8 52 18 52 34 L 52 56" fill="none" stroke="#B77C4D" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 23 56 L 30 32 L 34 32 L 41 56 Z" fill="#B77C4D" fill-opacity="0.3" stroke="#B77C4D" stroke-width="1"/>
      <polygon points="32,23 36,28 32,33 28,28" fill="#F3EFE5"/>
      <line x1="8" y1="56" x2="56" y2="56" stroke="#B77C4D" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }
  if (concept === 'b') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
      <rect width="64" height="64" rx="14" fill="#542E32"/>
      <polygon points="32,6 52,15 60,35 52,55 32,60 12,55 4,35 12,15" fill="none" stroke="#B38B62" stroke-width="2"/>
      <polygon points="32,18 44,32 32,46 20,32" fill="none" stroke="#B38B62" stroke-width="1.5"/>
      <text x="32" y="38" font-family="'Playfair Display', serif" font-size="16" font-weight="700" fill="#F8F4EC" text-anchor="middle">D</text>
    </svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
    <rect width="64" height="64" rx="14" fill="#29251F"/>
    <circle cx="32" cy="32" r="26" fill="none" stroke="#B96746" stroke-width="2"/>
    <path d="M 14 32 A 18 18 0 0 1 50 32 Z" fill="#B96746" fill-opacity="0.4"/>
    <circle cx="32" cy="32" r="9" fill="#B96746"/>
    <path d="M 18 56 L 30 32 L 34 32 L 46 56 Z" fill="#29251F" stroke="#B96746" stroke-width="1.5"/>
    <line x1="6" y1="32" x2="58" y2="32" stroke="#78806A" stroke-width="1.5"/>
  </svg>`;
}

// Write out SVG assets
fs.writeFileSync(path.join(brandDir, 'logo-concept-a-olive-copper.svg'), createConceptALogo('color'));
fs.writeFileSync(path.join(brandDir, 'logo-concept-a-monochrome.svg'), createConceptALogo('mono'));
fs.writeFileSync(path.join(brandDir, 'logo-concept-a-reverse.svg'), createConceptALogo('reverse'));
fs.writeFileSync(path.join(brandDir, 'favicon-concept-a.svg'), createFavicon('a'));

fs.writeFileSync(path.join(brandDir, 'logo-concept-b-burgundy-bronze.svg'), createConceptBLogo('color'));
fs.writeFileSync(path.join(brandDir, 'logo-concept-b-monochrome.svg'), createConceptBLogo('mono'));
fs.writeFileSync(path.join(brandDir, 'logo-concept-b-reverse.svg'), createConceptBLogo('reverse'));
fs.writeFileSync(path.join(brandDir, 'favicon-concept-b.svg'), createFavicon('b'));

fs.writeFileSync(path.join(brandDir, 'logo-concept-c-sandstone-terracotta.svg'), createConceptCLogo('color'));
fs.writeFileSync(path.join(brandDir, 'logo-concept-c-monochrome.svg'), createConceptCLogo('mono'));
fs.writeFileSync(path.join(brandDir, 'logo-concept-c-reverse.svg'), createConceptCLogo('reverse'));
fs.writeFileSync(path.join(brandDir, 'favicon-concept-c.svg'), createFavicon('c'));

console.log('Successfully generated all 12 brand identity vector files in public/assets/brand!');
