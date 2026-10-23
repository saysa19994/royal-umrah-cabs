const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'C:/Users/PC/Pictures/New folder (3)';
const outputDir = path.join(__dirname, '../public/assets/images');

async function processStudioRenders() {
  const list = [
    { src: 'Mercedes-Maybach S-Class.jpg', out: 'maybach_exterior.webp' },
    { src: 'The Toyota Coaster.jpg', out: 'coaster_studio.webp' },
    { src: 'Toyota HiAce.jpg', out: 'hiace_studio.webp' },
    { src: 'GMC_Yukon_XL_studio_photograph_2K_20261022210253.jpg', out: 'yukon_studio.webp' },
    { src: 'Hyundai_vehicle_in_studio_2K_20261022205401.jpg', out: 'staria_studio.webp' },
    { src: 'Hyundai_H1_Starex_studio_photograph_2K_20261022211204.jpg', out: 'h1_exterior.webp' },
    { src: 'Toyota_Camry_in_studio_2K_20261022205913.jpg', out: 'camry_studio.webp' }
  ];

  for (const item of list) {
    const srcPath = path.join(inputDir, item.src);
    if (!fs.existsSync(srcPath)) {
      console.warn('File not found:', srcPath);
      continue;
    }
    const destPath = path.join(outputDir, item.out);
    await sharp(srcPath)
      .webp({ quality: 90, effort: 4 })
      .toFile(destPath);
    const sz = Math.round(fs.statSync(destPath).size / 1024);
    console.log(`Converted ${item.src} -> ${item.out} (${sz} KB)`);
  }
}

processStudioRenders().catch(console.error);
