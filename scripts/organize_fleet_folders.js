const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'C:/Users/PC/Pictures/New folder (3)';
const baseOut = path.join(__dirname, '../public/assets/images/vehicles');

async function organize() {
  const folders = [
    'mercedes-maybach',
    'gmc-yukon-xl',
    'hyundai-staria',
    'hyundai-h1',
    'toyota-camry',
    'toyota-hiace',
    'toyota-coaster'
  ];

  for (const f of folders) {
    const dir = path.join(baseOut, f);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  // 1. Mercedes Maybach
  await sharp(path.join(srcDir, 'Mercedes-Maybach S-Class.jpg')).webp({ quality: 90 }).toFile(path.join(baseOut, 'mercedes-maybach/exterior-studio.webp'));
  if (fs.existsSync(path.join(__dirname, '../public/assets/images/maybach_interior.webp'))) {
    fs.copyFileSync(path.join(__dirname, '../public/assets/images/maybach_interior.webp'), path.join(baseOut, 'mercedes-maybach/interior.webp'));
  }

  // 2. GMC Yukon XL
  await sharp(path.join(srcDir, 'GMC_Yukon_XL_studio_photograph_2K_20261022210253.jpg')).webp({ quality: 90 }).toFile(path.join(baseOut, 'gmc-yukon-xl/exterior-studio.webp'));
  if (fs.existsSync(path.join(__dirname, '../public/assets/images/yukon_interior.webp'))) {
    fs.copyFileSync(path.join(__dirname, '../public/assets/images/yukon_interior.webp'), path.join(baseOut, 'gmc-yukon-xl/interior.webp'));
  }

  // 3. Hyundai Staria
  await sharp(path.join(srcDir, 'Hyundai_vehicle_in_studio_2K_20261022205401.jpg')).webp({ quality: 90 }).toFile(path.join(baseOut, 'hyundai-staria/exterior-studio.webp'));
  if (fs.existsSync(path.join(__dirname, '../public/assets/images/staria_interior.webp'))) {
    fs.copyFileSync(path.join(__dirname, '../public/assets/images/staria_interior.webp'), path.join(baseOut, 'hyundai-staria/interior.webp'));
  }

  // 4. Hyundai H1 Starex
  await sharp(path.join(srcDir, 'Hyundai_H1_Starex_studio_photograph_2K_20261022211204.jpg')).webp({ quality: 90 }).toFile(path.join(baseOut, 'hyundai-h1/exterior-studio.webp'));
  if (fs.existsSync(path.join(srcDir, 'Hyundai_H1.jpeg'))) {
    await sharp(path.join(srcDir, 'Hyundai_H1.jpeg')).webp({ quality: 85 }).toFile(path.join(baseOut, 'hyundai-h1/interior.webp'));
  }
  if (fs.existsSync(path.join(srcDir, 'Hyundai_H1 2.jpeg'))) {
    await sharp(path.join(srcDir, 'Hyundai_H1 2.jpeg')).webp({ quality: 85 }).toFile(path.join(baseOut, 'hyundai-h1/rear.webp'));
  }

  // 5. Toyota Camry
  await sharp(path.join(srcDir, 'Toyota_Camry_in_studio_2K_20261022205913.jpg')).webp({ quality: 90 }).toFile(path.join(baseOut, 'toyota-camry/exterior-studio.webp'));
  if (fs.existsSync(path.join(__dirname, '../public/assets/images/camry_interior.webp'))) {
    fs.copyFileSync(path.join(__dirname, '../public/assets/images/camry_interior.webp'), path.join(baseOut, 'toyota-camry/interior.webp'));
  }

  // 6. Toyota HiAce
  await sharp(path.join(srcDir, 'Toyota HiAce.jpg')).webp({ quality: 90 }).toFile(path.join(baseOut, 'toyota-hiace/exterior-studio.webp'));
  if (fs.existsSync(path.join(srcDir, 'Toyota HiAce 3.jpeg'))) {
    await sharp(path.join(srcDir, 'Toyota HiAce 3.jpeg')).webp({ quality: 85 }).toFile(path.join(baseOut, 'toyota-hiace/interior.webp'));
  }
  if (fs.existsSync(path.join(srcDir, 'Toyota HiAce 4.jpeg'))) {
    await sharp(path.join(srcDir, 'Toyota HiAce 4.jpeg')).webp({ quality: 85 }).toFile(path.join(baseOut, 'toyota-hiace/seats.webp'));
  }

  // 7. Toyota Coaster
  await sharp(path.join(srcDir, 'The Toyota Coaster.jpg')).webp({ quality: 90 }).toFile(path.join(baseOut, 'toyota-coaster/exterior-studio.webp'));
  if (fs.existsSync(path.join(__dirname, '../public/assets/images/coaster_interior.webp'))) {
    fs.copyFileSync(path.join(__dirname, '../public/assets/images/coaster_interior.webp'), path.join(baseOut, 'toyota-coaster/interior.webp'));
  }

  console.log('Successfully organized all 7 fleet vehicles into public/assets/images/vehicles!');
}

organize().catch(console.error);
