import fs from 'fs';
import path from 'path';

const studioDir = 'public/assets/images/studio-2k';
const vehiclesDir = 'public/assets/images/vehicles';

// 1. Copy to vehicle folders
const vehicleMappings = [
  { studio: 'toyota-camry-studio-2k.webp', targetFolder: 'toyota-camry' },
  { studio: 'mercedes-s-class-studio-2k.webp', targetFolder: 'mercedes-maybach' },
  { studio: 'hyundai-staria-studio-2k.webp', targetFolder: 'hyundai-staria' },
  { studio: 'gmc-yukon-studio-2k.webp', targetFolder: 'gmc-yukon-xl' },
  { studio: 'toyota-hiace-studio-2k.webp', targetFolder: 'toyota-hiace' },
  { studio: 'hyundai-h1-studio-2k.webp', targetFolder: 'hyundai-h1' },
];

vehicleMappings.forEach(m => {
  const src = path.join(studioDir, m.studio);
  const destDir = path.join(vehiclesDir, m.targetFolder);
  if (fs.existsSync(src) && fs.existsSync(destDir)) {
    const dest = path.join(destDir, 'exterior-studio.webp');
    fs.copyFileSync(src, dest);
    console.log(`Copied ${m.studio} -> ${dest}`);
  }
});

// 2. Update RoyalHomepageExperience.tsx
const homePath = 'src/components/home/RoyalHomepageExperience.tsx';
let homeContent = fs.readFileSync(homePath, 'utf-8');

homeContent = homeContent.replace(
  "image: '/assets/images/cinematic/fleet/mercedes-s-class-retina.jpg'",
  "image: '/assets/images/studio-2k/mercedes-s-class-studio-2k.webp'"
);
homeContent = homeContent.replace(
  "image: '/assets/images/cinematic/fleet/ref-hyundai-staria-retina.jpg'",
  "image: '/assets/images/studio-2k/hyundai-staria-studio-2k.webp'"
);
homeContent = homeContent.replace(
  "image: '/assets/images/cinematic/fleet/ref-toyota-camry-retina.jpg'",
  "image: '/assets/images/studio-2k/toyota-camry-studio-2k.webp'"
);
homeContent = homeContent.replace(
  "image: '/assets/images/cinematic/fleet/ref-gmc-yukon-retina.jpg'",
  "image: '/assets/images/studio-2k/gmc-yukon-studio-2k.webp'"
);
homeContent = homeContent.replace(
  "image: '/assets/images/cinematic/fleet/ref-hiace-van-retina.jpg'",
  "image: '/assets/images/studio-2k/toyota-hiace-studio-2k.webp'"
);

fs.writeFileSync(homePath, homeContent, 'utf-8');
console.log('Updated RoyalHomepageExperience.tsx with 2K studio vehicle images!');

// 3. Update src/app/[locale]/pricing/page.tsx
const pricingPath = 'src/app/[locale]/pricing/page.tsx';
let pricingContent = fs.readFileSync(pricingPath, 'utf-8');

pricingContent = pricingContent.replace(
  "image: '/assets/images/cinematic/fleet/ref-mercedes-s-class-retina.jpg'",
  "image: '/assets/images/studio-2k/mercedes-s-class-studio-2k.webp'"
);
pricingContent = pricingContent.replace(
  "image: '/assets/images/cinematic/fleet/ref-hyundai-staria-retina.jpg'",
  "image: '/assets/images/studio-2k/hyundai-staria-studio-2k.webp'"
);
pricingContent = pricingContent.replace(
  "image: '/assets/images/cinematic/fleet/ref-toyota-camry-retina.jpg'",
  "image: '/assets/images/studio-2k/toyota-camry-studio-2k.webp'"
);
pricingContent = pricingContent.replace(
  "image: '/assets/images/cinematic/fleet/ref-gmc-yukon-retina.jpg'",
  "image: '/assets/images/studio-2k/gmc-yukon-studio-2k.webp'"
);
pricingContent = pricingContent.replace(
  "image: '/assets/images/cinematic/fleet/ref-hiace-van-retina.jpg'",
  "image: '/assets/images/studio-2k/toyota-hiace-studio-2k.webp'"
);

fs.writeFileSync(pricingPath, pricingContent, 'utf-8');
console.log('Updated pricing/page.tsx with 2K studio vehicle images!');
