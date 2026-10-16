export const LOCALES = ['en', 'ar', 'ms'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  code: Locale;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  defaultCurrency: 'SAR' | 'USD' | 'MYR';
  dateFormat: string;
  whatsappGreeting: string;
}

export const LOCALE_CONFIG: Record<Locale, LocaleMeta> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    defaultCurrency: 'USD',
    dateFormat: 'en-US',
    whatsappGreeting: 'Assalamu Alaikum Royal Umrah Cabs, I would like to inquire about a private VIP transfer:',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    defaultCurrency: 'SAR',
    dateFormat: 'ar-SA',
    whatsappGreeting: 'السلام عليكم ورحمة الله رويال كاب للعمرة، أود الاستفسار وحجز توصيل خاص VIP:',
  },
  ms: {
    code: 'ms',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    dir: 'ltr',
    defaultCurrency: 'MYR',
    dateFormat: 'ms-MY',
    whatsappGreeting: 'Assalamu alaikum Royal Umrah Cabs, saya ingin membuat tempahan teksi VIP untuk perjalanan Umrah:',
  },
};

export const CURRENCIES = {
  SAR: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', rateFromSAR: 1.0, isPrefix: true },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateFromSAR: 0.266, isPrefix: true },
  MYR: { code: 'MYR', symbol: 'RM ', name: 'Malaysian Ringgit', rateFromSAR: 1.18, isPrefix: true },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateFromSAR: 0.21, isPrefix: true },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateFromSAR: 0.25, isPrefix: true },
  EGP: { code: 'EGP', symbol: 'EGP ', name: 'Egyptian Pound', rateFromSAR: 13.1, isPrefix: true },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

// Translated URL slug map for cross-language page preservation
export const PAGE_SLUGS: Record<string, Record<Locale, string>> = {
  home: { en: '', ar: '', ms: '' },
  booking: { en: 'booking', ar: 'booking', ms: 'tempahan' },
  routes: { en: 'routes', ar: 'routes', ms: 'laluan' },
  fleet: { en: 'fleet', ar: 'fleet', ms: 'armada' },
  services: { en: 'services', ar: 'services', ms: 'perkhidmatan' },
  pricing: { en: 'pricing', ar: 'pricing', ms: 'harga' },
  compare: { en: 'compare', ar: 'compare', ms: 'bandingkan' },
  guides: { en: 'guides', ar: 'guides', ms: 'panduan' },
  about: { en: 'about', ar: 'about', ms: 'tentang-kami' },
  contact: { en: 'contact', ar: 'contact', ms: 'hubungi-kami' },
  safety: { en: 'safety', ar: 'safety', ms: 'keselamatan' },
  trackBooking: { en: 'track-booking', ar: 'track-booking', ms: 'kesan-tempahan' },
  manageBooking: { en: 'manage-booking', ar: 'manage-booking', ms: 'urus-tempahan' },
  privacy: { en: 'privacy', ar: 'privacy', ms: 'privasi' },
  terms: { en: 'terms', ar: 'terms', ms: 'terma' },
  cancellationRefund: { en: 'cancellation-refund', ar: 'cancellation-refund', ms: 'pembatalan-bayaran-balik' },
  partners: { en: 'partners', ar: 'partners', ms: 'rakan-kongsi' },
};
