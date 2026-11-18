import type { Locale } from '@/i18n/config';
import { LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';

const media = '/assets/images/routes/';

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
    image: media + route.image,
    name: pickup + (locale === 'ar' || locale === 'ur' ? ' ← ' : ' → ') + destination,
  };
}
