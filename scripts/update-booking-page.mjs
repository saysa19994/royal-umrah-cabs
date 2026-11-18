import fs from 'fs';

const path = 'D:/royal-umrah-cabs/src/app/[locale]/booking/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const normalizerCode = `const VEHICLE_SLUG_NORMALIZER: Record<string, string> = {
  'toyota-camry': 'camry',
  camry: 'camry',
  'hyundai-staria': 'staria',
  staria: 'staria',
  'gmc-yukon-xl': 'yukon',
  yukon: 'yukon',
  'toyota-hiace': 'hiace',
  hiace: 'hiace',
  'toyota-coaster': 'coaster',
  coaster: 'coaster',
  'mercedes-maybach': 'maybach',
  maybach: 'maybach',
  'hyundai-h1': 'h1',
  h1: 'h1',
};

export default async function BookingPage(props: BookingPageProps) {`;

content = content.replace(
  'export default async function BookingPage(props: BookingPageProps) {',
  normalizerCode
);

content = content.replace(
  'let resolvedVehicle = searchParams.vehicle;',
  `let resolvedVehicle = searchParams.vehicle
    ? VEHICLE_SLUG_NORMALIZER[searchParams.vehicle.toLowerCase()] || searchParams.vehicle
    : undefined;`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Updated booking page with vehicle normalizer');
