export const LOCALES = ['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  code: Locale;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  defaultCurrency: 'SAR' | 'USD' | 'MYR' | 'EUR' | 'GBP' | 'IDR' | 'INR' | 'PKR';
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
    whatsappGreeting: 'Assalamu Alaikum Duyuf Alrahman VIP, I would like to inquire about a private VIP transfer:',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    defaultCurrency: 'SAR',
    dateFormat: 'ar-SA',
    whatsappGreeting: 'السلام عليكم ورحمة الله ضيوف الرحمن VIP، أود الاستفسار وحجز توصيل خاص VIP:',
  },
  ms: {
    code: 'ms',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    dir: 'ltr',
    defaultCurrency: 'MYR',
    dateFormat: 'ms-MY',
    whatsappGreeting: 'Assalamu alaikum Duyuf Alrahman VIP, saya ingin membuat tempahan teksi VIP untuk perjalanan Umrah:',
  },
  id: {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    dir: 'ltr',
    defaultCurrency: 'IDR',
    dateFormat: 'id-ID',
    whatsappGreeting: 'Assalamu alaikum Duyuf Alrahman VIP, saya ingin memesan layanan transportasi privat Umrah VIP:',
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    dir: 'rtl',
    defaultCurrency: 'PKR',
    dateFormat: 'ur-PK',
    whatsappGreeting: 'السلام علیکم ضيوف الرحمن VIP، میں عمرہ پرائیویٹ ٹرانسپورٹ بکنگ کے حوالے سے معلومات چاہتا ہوں:',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    defaultCurrency: 'EUR',
    dateFormat: 'fr-FR',
    whatsappGreeting: 'Bonjour Duyuf Alrahman VIP, je souhaite réserver un transfert privé VIP pour la Omra:',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    defaultCurrency: 'EUR',
    dateFormat: 'es-ES',
    whatsappGreeting: 'Hola Duyuf Alrahman VIP, deseo reservar un traslado privado VIP para la Umrah:',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    defaultCurrency: 'EUR',
    dateFormat: 'de-DE',
    whatsappGreeting: 'Hallo Duyuf Alrahman VIP, ich möchte einen privaten VIP-Transfer für die Umrah buchen:',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    dir: 'ltr',
    defaultCurrency: 'INR',
    dateFormat: 'hi-IN',
    whatsappGreeting: 'अस्सलाम अलैकुम Duyuf Alrahman VIP, मैं निजी वीआईपी उमरा ट्रांसफर बुक करना चाहता हूँ:',
  },
};

export const CURRENCIES = {
  SAR: { code: 'SAR', symbol: 'SAR ', name: 'Saudi Riyal', rateFromSAR: 1.0, isPrefix: true },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateFromSAR: 0.266, isPrefix: true },
  MYR: { code: 'MYR', symbol: 'RM ', name: 'Malaysian Ringgit', rateFromSAR: 1.18, isPrefix: true },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateFromSAR: 0.21, isPrefix: true },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateFromSAR: 0.25, isPrefix: true },
  IDR: { code: 'IDR', symbol: 'Rp ', name: 'Indonesian Rupiah', rateFromSAR: 4350.0, isPrefix: true },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateFromSAR: 22.3, isPrefix: true },
  PKR: { code: 'PKR', symbol: 'Rs ', name: 'Pakistani Rupee', rateFromSAR: 74.5, isPrefix: true },
  EGP: { code: 'EGP', symbol: 'EGP ', name: 'Egyptian Pound', rateFromSAR: 13.1, isPrefix: true },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

// Translated URL slug map for cross-language page preservation
export const PAGE_SLUGS: Record<string, Partial<Record<Locale, string>>> = {
  home: { en: '', ar: '', ms: '', fr: '', es: '', id: '', hi: '', de: '', ur: '' },
  booking: { en: 'booking', ar: 'booking', ms: 'tempahan', id: 'pemesanan', fr: 'reservation', es: 'reserva', de: 'buchung', ur: 'booking', hi: 'booking' },
  routes: { en: 'routes', ar: 'routes', ms: 'laluan', id: 'rute', fr: 'itineraires', es: 'rutas', de: 'routen', ur: 'routes', hi: 'routes' },
  fleet: { en: 'fleet', ar: 'fleet', ms: 'armada', id: 'armada', fr: 'flotte', es: 'flota', de: 'flotte', ur: 'fleet', hi: 'fleet' },
  services: { en: 'services', ar: 'services', ms: 'perkhidmatan', id: 'layanan', fr: 'services', es: 'servicios', de: 'dienstleistungen', ur: 'services', hi: 'services' },
  pricing: { en: 'pricing', ar: 'pricing', ms: 'harga', id: 'tarif', fr: 'tarifs', es: 'precios', de: 'preise', ur: 'pricing', hi: 'pricing' },
  compare: { en: 'compare', ar: 'compare', ms: 'bandingkan', id: 'perbandingan', fr: 'comparer', es: 'comparar', de: 'vergleich', ur: 'compare', hi: 'compare' },
  guides: { en: 'guides', ar: 'guides', ms: 'panduan', id: 'panduan', fr: 'guides', es: 'guias', de: 'ratgeber', ur: 'guides', hi: 'guides' },
  about: { en: 'about', ar: 'about', ms: 'tentang-kami', id: 'tentang-kami', fr: 'a-propos', es: 'sobre-nosotros', de: 'ueber-uns', ur: 'about', hi: 'about' },
  contact: { en: 'contact', ar: 'contact', ms: 'hubungi-kami', id: 'kontak', fr: 'contact', es: 'contacto', de: 'kontakt', ur: 'contact', hi: 'contact' },
  safety: { en: 'safety', ar: 'safety', ms: 'keselamatan', id: 'keamanan', fr: 'securite', es: 'seguridad', de: 'sicherheit', ur: 'safety', hi: 'safety' },
  trackBooking: { en: 'track-booking', ar: 'track-booking', ms: 'kesan-tempahan', id: 'lacak-pesanan', fr: 'suivi-reservation', es: 'seguir-reserva', de: 'buchung-verfolgen', ur: 'track-booking', hi: 'track-booking' },
  manageBooking: { en: 'manage-booking', ar: 'manage-booking', ms: 'urus-tempahan', id: 'kelola-pesanan', fr: 'gerer-reservation', es: 'gestionar-reserva', de: 'buchung-verwalten', ur: 'manage-booking', hi: 'manage-booking' },
  privacy: { en: 'privacy', ar: 'privacy', ms: 'privasi', id: 'privasi', fr: 'confidentialite', es: 'privacidad', de: 'datenschutz', ur: 'privacy', hi: 'privacy' },
  terms: { en: 'terms', ar: 'terms', ms: 'terma', id: 'syarat-ketentuan', fr: 'conditions', es: 'terminos', de: 'agb', ur: 'terms', hi: 'terms' },
  cancellationRefund: { en: 'cancellation', ar: 'cancellation', ms: 'pembatalan', id: 'pembatalan', fr: 'annulation', es: 'cancelacion', de: 'stornierung', ur: 'cancellation', hi: 'cancellation' },
  partners: { en: 'partners', ar: 'partners', ms: 'rakan-kongsi', id: 'mitra', fr: 'partenaires', es: 'socios', de: 'partner', ur: 'partners', hi: 'partners' },
};

export function getLocalizedAlternates(locale: Locale, path: string = '') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${baseUrl}/${l}${cleanPath}`;
  }
  languages['x-default'] = `${baseUrl}/en${cleanPath}`;

  return {
    canonical: `${baseUrl}/${locale}${cleanPath}`,
    languages,
  };
}
