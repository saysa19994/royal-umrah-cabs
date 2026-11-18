import fs from 'fs';

let code = fs.readFileSync('src/components/home/RoyalHomepageExperience.tsx', 'utf8');

code = code.replaceAll('/assets/images/reference/toyota-camry-transparent.webp', '/assets/images/cinematic/fleet/camry-dark-studio.jpg');
code = code.replaceAll('/assets/images/reference/hyundai-staria-transparent.webp', '/assets/images/cinematic/fleet/staria-dark-studio.jpg');
code = code.replaceAll('/assets/images/reference/gmc-yukon-xl-transparent.webp', '/assets/images/cinematic/fleet/yukon-dark-studio.jpg');
code = code.replaceAll('/assets/images/reference/toyota-hiace-transparent.webp', '/assets/images/cinematic/fleet/hiace-dark-studio.jpg');
code = code.replaceAll('/assets/images/reference/toyota-coaster-transparent.webp', '/assets/images/cinematic/fleet/coaster-dark-studio.jpg');

fs.writeFileSync('src/components/home/RoyalHomepageExperience.tsx', code, 'utf8');
console.log('Updated RoyalHomepageExperience.tsx to use cinematic dark studio fleet images');
