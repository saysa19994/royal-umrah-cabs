import fs from 'fs';
import path from 'path';

const vehicles = [
  'mercedes-maybach',
  'gmc-yukon-xl',
  'hyundai-staria',
  'hyundai-h1',
  'toyota-camry',
  'toyota-hiace',
  'toyota-coaster',
];

const files = [
  'exterior_front.jpg',
  'exterior_rear.jpg',
  'side_profile.jpg',
  'interior_seats.jpg',
  'interior_dashboard.jpg',
  'exterior-studio.webp',
  'interior.webp',
];

for (const v of vehicles) {
  const vDir = path.join('D:/royal-umrah-cabs/public/assets/images/vehicles', v);
  const present = files.filter(f => fs.existsSync(path.join(vDir, f)));
  console.log(`${v.padEnd(18)}: ${present.length} of ${files.length} standard photos present on disk: ${present.join(', ')}`);
}
