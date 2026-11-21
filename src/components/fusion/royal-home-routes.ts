import type { Locale } from '@/i18n/config';
import { LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';

const media = '/assets/images/routes/';

// 1600px responsive WebP editorial scenes selected from approved, existing
// project route photography. Images support, but never replace, live route
// identifiers, fares or administrator-controlled availability.
const sharpEditorialPhotos: Record<string, string> = {
  'jeddah-airport-to-makkah': '/assets/blueprint/routes/jeddah-makkah.webp',
  'makkah-to-madinah': '/assets/blueprint/routes/makkah-madinah.webp',
  'jeddah-airport-to-madinah': '/assets/blueprint/routes/hero-arrival.webp',
  'makkah-to-taif': '/assets/blueprint/routes/makkah-taif.webp',
  'riyadh-to-makkah': '/assets/blueprint/blog/riyadh-to-makkah-private-transfer.webp',
  'riyadh-to-madinah': '/assets/blueprint/routes/makkah-madinah.webp',
  'madinah-airport-to-hotel': '/assets/blueprint/routes/hero-arrival.webp',
  'jeddah-to-madinah': '/assets/blueprint/routes/makkah-madinah.webp',
  'jeddah-to-taif': '/assets/blueprint/routes/makkah-taif.webp',
  'makkah-to-jeddah-airport': '/assets/blueprint/routes/jeddah-makkah.webp',
  'madinah-to-makkah': '/assets/blueprint/routes/makkah-madinah.webp',
  'taif-to-makkah': '/assets/blueprint/routes/makkah-taif.webp',
};

export const ROYAL_HOME_ROUTES = [
  { id: 'jeddah-airport-to-makkah', origin: 'jed-airport', image: 'jeddah-airport-to-makkah.jpg', code: 'JED / MKK', featured: true },
  { id: 'makkah-to-madinah', origin: 'makkah', image: 'makkah-to-madinah.jpg', code: 'MKK / MED', featured: true },
  { id: 'jeddah-airport-to-madinah', origin: 'jed-airport', image: 'jeddah-to-madinah.jpg', code: 'JED / MED', featured: true },
  { id: 'makkah-to-taif', origin: 'makkah', image: 'makkah-to-taif.jpg', code: 'MKK / TIF', featured: true, region: 'taif' },
  { id: 'riyadh-to-makkah', origin: 'riyadh', image: 'riyadh-to-makkah.webp', code: 'RUH / MKK', featured: true, region: 'riyadh' },
  { id: 'riyadh-to-madinah', origin: 'riyadh', image: 'makkah-to-madinah.jpg', code: 'RUH / MED', featured: true, region: 'riyadh' },
  { id: 'madinah-airport-to-hotel', origin: 'med-airport', image: 'madinah-airport.jpg', code: 'MED', featured: true },
  { id: 'jeddah-to-madinah', origin: 'jeddah', image: 'jeddah-to-madinah.jpg', code: 'JED / MED' },
  { id: 'jeddah-to-taif', origin: 'jed-airport', image: 'makkah-to-taif.jpg', code: 'JED / TIF', region: 'taif' },
  { id: 'makkah-to-jeddah-airport', origin: 'makkah', image: 'jeddah-airport-to-makkah.jpg', code: 'MKK / JED' },
  { id: 'madinah-to-makkah', origin: 'madinah', image: 'makkah-to-madinah.jpg', code: 'MED / MKK' },
  { id: 'taif-to-makkah', origin: 'taif', image: 'makkah-to-taif.jpg', code: 'TIF / MKK', region: 'taif' },
] satisfies {
  id: string;
  origin: string;
  image: string;
  code: string;
  featured?: boolean;
  region?: 'taif' | 'riyadh';
}[];

export function getRoyalHomeRoute(route: (typeof ROYAL_HOME_ROUTES)[number], locale: Locale) {
  const getParts = (id: string) => LOCALIZED_ROUTE_NAMES[id][locale].split(/\s+[→←⇄]\s+/);
  const [pickup, destination] = route.id === 'jeddah-airport-to-madinah'
    ? [getParts('jeddah-airport-to-makkah')[0], getParts('jeddah-to-madinah')[1]]
    : getParts(route.id);
  return {
    ...route,
    pickup,
    destination,
    image: sharpEditorialPhotos[route.id] || media + route.image,
    name: pickup + (locale === 'ar' || locale === 'ur' ? ' ← ' : ' → ') + destination,
  };
}
