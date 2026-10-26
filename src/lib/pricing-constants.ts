import { Locale } from '@/i18n/config';

/**
 * Single Authoritative Pricing Matrix for Duyuf Alrahman VIP
 *
 * Guaranteed 100% consistency across:
 * - Supabase database prices table and seed data
 * - BookingCard.tsx (Homepage Quick Booking Widget)
 * - BookingEngine.tsx (Dedicated Booking Portal)
 * - PricingTable.tsx (Interactive Pricing Page)
 * - pricing-server.ts (Authoritative Server-side Price Calculator)
 */

export const AUTHORITATIVE_TRANSFER_RATES: Record<string, Record<string, number>> = {
  'jeddah-airport-to-makkah': {
    camry: 200,
    staria: 260,
    yukon: 380,
    hiace: 340,
    coaster: 650,
  },
  'makkah-to-jeddah-airport': {
    camry: 200,
    staria: 260,
    yukon: 380,
    hiace: 340,
    coaster: 650,
  },
  'makkah-to-madinah': {
    camry: 450,
    staria: 500,
    yukon: 750,
    hiace: 650,
    coaster: 1200,
  },
  'madinah-to-makkah': {
    camry: 450,
    staria: 500,
    yukon: 750,
    hiace: 650,
    coaster: 1200,
  },
  'madinah-airport-to-hotel': {
    camry: 150,
    staria: 190,
    yukon: 280,
    hiace: 250,
    coaster: 550,
  },
  'jeddah-to-madinah': {
    camry: 680,
    staria: 750,
    yukon: 980,
    hiace: 850,
    coaster: 1600,
  },
  'makkah-to-taif': {
    camry: 350,
    staria: 450,
    yukon: 600,
    hiace: 550,
    coaster: 950,
  },
  'taif-to-makkah': {
    camry: 350,
    staria: 450,
    yukon: 600,
    hiace: 550,
    coaster: 950,
  },
  'jeddah-to-taif': {
    camry: 550,
    staria: 650,
    yukon: 850,
    hiace: 800,
    coaster: 1400,
  },
  'riyadh-airport-transfer': {
    camry: 200,
    staria: 280,
    yukon: 450,
    hiace: 400,
    coaster: 750,
  },
  'riyadh-to-makkah': {
    camry: 2200,
    staria: 2600,
    yukon: 3500,
    hiace: 3200,
    coaster: 5500,
  },
  'riyadh-to-madinah': {
    camry: 2200,
    staria: 2600,
    yukon: 3500,
    hiace: 3200,
    coaster: 5500,
  },
};

export const LOCALIZED_ROUTE_NAMES: Record<string, Record<Locale, string>> = {
  'jeddah-airport-to-makkah': {
    en: 'Jeddah Airport (KAIA) → Makkah Hotel',
    ar: 'مطار جدة (KAIA) ← فندق مكة المكرمة',
    ms: 'Lapangan Terbang Jeddah (KAIA) → Hotel Makkah',
    tr: 'Cidde Havalimanı (KAIA) → Mekke Oteli',
    id: 'Bandara Jeddah (KAIA) → Hotel Makkah',
    ur: 'جدہ ایئرپورٹ (KAIA) ← مکہ ہوٹل',
    fr: 'Aéroport de Djeddah (KAIA) → Hôtel La Mecque',
    es: 'Aeropuerto de Yeda (KAIA) → Hotel La Meca',
    de: 'Flughafen Dschidda (KAIA) → Hotel Mekka',
    hi: 'जेद्दा हवाई अड्डा (KAIA) → मक्का होटल',
  },
  'makkah-to-jeddah-airport': {
    en: 'Makkah Hotel → Jeddah Airport (KAIA)',
    ar: 'فندق مكة المكرمة ← مطار جدة (KAIA)',
    ms: 'Hotel Makkah → Lapangan Terbang Jeddah (KAIA)',
    tr: 'Mekke Oteli → Cidde Havalimanı (KAIA)',
    id: 'Hotel Makkah → Bandara Jeddah (KAIA)',
    ur: 'مکہ ہوٹل ← جدہ ایئرپورٹ (KAIA)',
    fr: 'Hôtel La Mecque → Aéroport de Djeddah (KAIA)',
    es: 'Hotel La Meca → Aeropuerto de Yeda (KAIA)',
    de: 'Hotel Mekka → Flughafen Dschidda (KAIA)',
    hi: 'मक्का होटल → जेद्दा हवाई अड्डा (KAIA)',
  },
  'makkah-to-madinah': {
    en: 'Makkah Hotel → Madinah Hotel (Via Bir Ali)',
    ar: 'فندق مكة المكرمة ← المدينة المنورة (عبر ميقات آبار علي)',
    ms: 'Hotel Makkah → Madinah (Singgah Miqat Bir Ali)',
    tr: 'Mekke Oteli → Medine-i Münevvere (Zülhuleyfe Mikat)',
    id: 'Hotel Makkah → Madinah (Via Miqat Bir Ali)',
    ur: 'مکہ ہوٹل ← مدینہ ہوٹل (براستہ بئر علی)',
    fr: 'Hôtel La Mecque → Médine (Via Miqat Bir Ali)',
    es: 'Hotel La Meca → Medina (Vía Miqat Bir Ali)',
    de: 'Hotel Mekka → Medina (Über Miqat Bir Ali)',
    hi: 'मक्का होटल → मदीना होटल (बीर अली होकर)',
  },
  'madinah-to-makkah': {
    en: 'Madinah Hotel → Makkah Hotel (Via Miqat)',
    ar: 'المدينة المنورة ← مكة المكرمة (عبر ميقات آبار علي)',
    ms: 'Hotel Madinah → Hotel Makkah (Singgah Miqat)',
    tr: 'Medine Oteli → Mekke Oteli (Mikat Noktası)',
    id: 'Hotel Madinah → Hotel Makkah (Via Miqat)',
    ur: 'مدینہ ہوٹل ← مکہ ہوٹل (براستہ میقات)',
    fr: 'Hôtel Médine → Hôtel La Mecque (Via Miqat)',
    es: 'Hotel Medina → Hotel La Meca (Vía Miqat)',
    de: 'Hotel Medina → Hotel Mekka (Über Miqat)',
    hi: 'मदीना होटल → मक्का होटल (मीक़ात होकर)',
  },
  'madinah-airport-to-hotel': {
    en: 'Madinah Airport (MED) → Madinah Hotel',
    ar: 'مطار المدينة (MED) ← فنادق الحرم بالمدينة',
    ms: 'Lapangan Terbang Madinah (MED) → Hotel Madinah',
    tr: 'Medine Havalimanı (MED) → Medine Oteli',
    id: 'Bandara Madinah (MED) → Hotel Madinah',
    ur: 'مدینہ ایئرپورٹ (MED) ← مدینہ ہوٹل',
    fr: 'Aéroport de Médine (MED) → Hôtel Médine',
    es: 'Aeropuerto de Medina (MED) → Hotel Medina',
    de: 'Flughafen Medina (MED) → Hotel Medina',
    hi: 'मदीना हवाई अड्डा (MED) → मदीना होटल',
  },
  'jeddah-to-madinah': {
    en: 'Jeddah Airport / Hotel → Madinah Hotel',
    ar: 'مدينة أو مطار جدة ← المدينة المنورة',
    ms: 'Jeddah / Lapangan Terbang → Hotel Madinah',
    tr: 'Cidde Şehir / Havalimanı → Medine Oteli',
    id: 'Kota / Bandara Jeddah → Hotel Madinah',
    ur: 'جدہ شہر / ایئرپورٹ ← مدینہ ہوٹل',
    fr: 'Djeddah Ville / Aéroport → Hôtel Médine',
    es: 'Yeda Ciudad / Aeropuerto → Hotel Medina',
    de: 'Dschidda Stadt / Flughafen → Hotel Medina',
    hi: 'जेद्दा शहर / हवाई अड्डा → मदीना होटल',
  },
  'makkah-to-taif': {
    en: 'Makkah Hotel → Taif (Al Hada / City)',
    ar: 'فندق مكة المكرمة ← الطائف (الهدا / المدينة)',
    ms: 'Hotel Makkah → Taif (Al Hada / Bandar)',
    tr: 'Mekke Oteli → Taif (Al Hada / Şehir)',
    id: 'Hotel Makkah → Taif (Al Hada / Kota)',
    ur: 'مکہ ہوٹل ← طائف (الھدا / شہر)',
    fr: 'Hôtel La Mecque → Taïf (Al Hada / Ville)',
    es: 'Hotel La Meca → Taif (Al Hada / Ciudad)',
    de: 'Hotel Mekka → Taif (Al Hada / Stadt)',
    hi: 'मक्का होटल → ताइफ़ (अल हदा / शहर)',
  },
  'taif-to-makkah': {
    en: 'Taif → Makkah Hotel (Via Miqat Qarn al-Manazil)',
    ar: 'الطائف ← فندق مكة المكرمة (عبر ميقات قرن المنازل)',
    ms: 'Taif → Hotel Makkah (Singgah Miqat Qarnul Manazil)',
    tr: 'Taif → Mekke Oteli (Karnülmenazil Mikat Noktası)',
    id: 'Taif → Hotel Makkah (Via Miqat Qarnul Manazil)',
    ur: 'طائف ← مکہ ہوٹل (براستہ میقات قرن المنازل)',
    fr: 'Taïf → Hôtel La Mecque (Via Miqat Qarn al-Manazil)',
    es: 'Taif → Hotel La Meca (Vía Miqat Qarn al-Manazil)',
    de: 'Taif → Hotel Mekka (Über Miqat Qarn al-Manazil)',
    hi: 'ताइफ़ → मक्का होटल (मीक़ात क़र्न अल-मनाज़िल होकर)',
  },
  'jeddah-to-taif': {
    en: 'Jeddah Airport (KAIA) → Taif (Al Hada)',
    ar: 'مطار جدة (KAIA) ← الطائف (الهدا)',
    ms: 'Lapangan Terbang Jeddah (KAIA) → Taif (Al Hada)',
    tr: 'Cidde Havalimanı (KAIA) → Taif (Al Hada)',
    id: 'Bandara Jeddah (KAIA) → Taif (Al Hada)',
    ur: 'جدہ ایئرپورٹ (KAIA) ← طائف (الھدا)',
    fr: 'Aéroport de Djeddah (KAIA) → Taïf (Al Hada)',
    es: 'Aeropuerto de Yeda (KAIA) → Taif (Al Hada)',
    de: 'Flughafen Dschidda (KAIA) → Taif (Al Hada)',
    hi: 'जेद्दा हवाई अड्डा (KAIA) → ताइफ़ (अल हदा)',
  },
  'riyadh-airport-transfer': {
    en: 'Riyadh Airport (RUH) ⇄ Riyadh Hotels',
    ar: 'مطار الرياض (RUH) ⇄ فنادق الرياض',
    ms: 'Lapangan Terbang Riyadh (RUH) ⇄ Hotel Riyadh',
    tr: 'Riyad Havalimanı (RUH) ⇄ Riyad Otelleri',
    id: 'Bandara Riyadh (RUH) ⇄ Hotel Riyadh',
    ur: 'ریاض ایئرپورٹ (RUH) ⇄ ریاض ہوٹلز',
    fr: 'Aéroport de Riyad (RUH) ⇄ Hôtels de Riyad',
    es: 'Aeropuerto de Riad (RUH) ⇄ Hoteles de Riad',
    de: 'Flughafen Riad (RUH) ⇄ Hotels in Riad',
    hi: 'रियाद हवाई अड्डा (RUH) ⇄ रियाद होटल',
  },
  'riyadh-to-makkah': {
    en: 'Riyadh ⇄ Makkah Hotel (VIP Highway)',
    ar: 'الرياض ⇄ مكة المكرمة (طريق سريع VIP)',
    ms: 'Riyadh ⇄ Hotel Makkah (Lebuhraya VIP)',
    tr: 'Riyad ⇄ Mekke Oteli (VIP Otoyol)',
    id: 'Riyadh ⇄ Hotel Makkah (Jalan Tol VIP)',
    ur: 'ریاض ⇄ مکہ مکرمہ (ہائی وے وی آئی پی)',
    fr: 'Riyad ⇄ Hôtel La Mecque (Autoroute VIP)',
    es: 'Riad ⇄ Hotel La Meca (Autopista VIP)',
    de: 'Riad ⇄ Hotel Mekka (VIP-Fernstraße)',
    hi: 'रियाद ⇄ मक्का होटल (वीआईपी हाईवे)',
  },
  'riyadh-to-madinah': {
    en: 'Riyadh ⇄ Madinah Hotel (VIP Highway)',
    ar: 'الرياض ⇄ المدينة المنورة (طريق سريع VIP)',
    ms: 'Riyadh ⇄ Hotel Madinah (Lebuhraya VIP)',
    tr: 'Riyad ⇄ Medine Oteli (VIP Otoyol)',
    id: 'Riyadh ⇄ Hotel Madinah (Jalan Tol VIP)',
    ur: 'ریاض ⇄ مدینہ منورہ (ہائی وے وی آئی پی)',
    fr: 'Riyad ⇄ Hôtel Médine (Autoroute VIP)',
    es: 'Riad ⇄ Hotel Medina (Autopista VIP)',
    de: 'Riad ⇄ Hotel Medina (VIP-Fernstraße)',
    hi: 'रियाद ⇄ मदीना होटल (वीआईपी हाईवे)',
  },
};

export const AUTHORITATIVE_HOURLY_RATES_4H: Record<string, number> = {
  camry: 350,
  staria: 400,
  yukon: 600,
  hiace: 500,
  coaster: 800,
};

export const AUTHORITATIVE_ZIYARAT_RATES: Record<string, number> = {
  camry: 250,
  staria: 300,
  yukon: 450,
  hiace: 400,
  coaster: 650,
};

export const AUTHORITATIVE_GROUP_RATES: Record<string, number> = {
  hiace: 600,
  coaster: 800,
};

/**
 * Helper to compute client-side display price consistent with database
 */
export function getEstimatedBasePriceSAR(params: {
  bookingType: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  routeId?: string | null;
  vehicleId: string;
  durationHours?: number | null;
  customRates?: Record<string, Record<string, number>>;
}): number | null {
  const { bookingType, routeId, vehicleId, durationHours, customRates } = params;

  if (bookingType === 'transfer') {
    if (!routeId) return null;
    if (customRates && customRates[routeId]?.[vehicleId]) {
      return customRates[routeId][vehicleId];
    }
    return AUTHORITATIVE_TRANSFER_RATES[routeId]?.[vehicleId] ?? null;
  }

  if (bookingType === 'hourly') {
    const base4h = AUTHORITATIVE_HOURLY_RATES_4H[vehicleId];
    if (!base4h) return null;
    const hours = durationHours && durationHours >= 2 && durationHours <= 24 ? durationHours : 4;
    const blocks = Math.ceil(hours / 4);
    return base4h * blocks;
  }

  if (bookingType === 'ziyarat') {
    return AUTHORITATIVE_ZIYARAT_RATES[vehicleId] ?? null;
  }

  if (bookingType === 'group_bus') {
    return AUTHORITATIVE_GROUP_RATES[vehicleId] ?? null;
  }

  return null;
}
