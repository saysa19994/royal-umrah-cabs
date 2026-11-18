import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const artifactsDir = 'C:/Users/PC/.gemini/antigravity/brain/b85e6102-b6eb-4565-9493-6e009226675e';
const refPath = path.join(artifactsDir, '.user_uploaded/media_1793903484805_ddd65681.jpg');
const liveMbFull = path.join(artifactsDir, 'luxury_prices_packages_ar_mb_full.png');
const liveHomeMb = path.join(artifactsDir, 'luxury_home_ar_mb_full.png');
const outPath = path.join(artifactsDir, 'master_studio_2k_mobile_showcase.jpg');

async function createShowcase() {
  const targetH = 1600;

  // 1. Ref Mockup
  const refBuf = await sharp(refPath).resize({ height: targetH }).toBuffer();
  const refMeta = await sharp(refBuf).metadata();

  // 2. Mobile Prices Full (crop or scale upper showcase part so it matches the mockup height)
  // The upper part of mobile prices corresponds to Hero + Packages + Table + Why Choose Us + CTA
  const liveMbCrop = await sharp(liveMbFull)
    .extract({ left: 0, top: 0, width: 780, height: 7500 })
    .resize({ height: targetH })
    .toBuffer();
  const liveMbMeta = await sharp(liveMbCrop).metadata();

  // 3. Mobile Home (Hero + Fleet + Services)
  const homeMbCrop = await sharp(liveHomeMb)
    .extract({ left: 0, top: 0, width: 780, height: 7000 })
    .resize({ height: targetH })
    .toBuffer();
  const homeMbMeta = await sharp(homeMbCrop).metadata();

  const totalW = refMeta.width + liveMbMeta.width + homeMbMeta.width + 40;

  await sharp({
    create: {
      width: totalW,
      height: targetH,
      channels: 3,
      background: '#090D15',
    },
  })
    .composite([
      { input: refBuf, left: 10, top: 0 },
      { input: liveMbCrop, left: refMeta.width + 20, top: 0 },
      { input: homeMbCrop, left: refMeta.width + liveMbMeta.width + 30, top: 0 },
    ])
    .jpeg({ quality: 90 })
    .toFile(outPath);

  console.log(`Created studio 2k mobile showcase: ${outPath} (${fs.statSync(outPath).size} bytes)`);
}

createShowcase().catch(console.error);
