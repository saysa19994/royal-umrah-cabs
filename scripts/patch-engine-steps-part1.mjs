import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/components/booking/BookingEngine.tsx', 'utf8');

// 1. Update BookingEngineProps to include hideInternalStepper, onStepChange, stepOverride
const oldProps = `interface BookingEngineProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
  initialRoute?: string;
  initialVehicle?: string;
  initialDate?: string;
  initialTime?: string;
  initialPassengers?: string;
  initialLuggage?: string;
  initialType?: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  initialDuration?: string;
  initialPickup?: string;
  initialDropoff?: string;
  initialRates?: Record<string, Record<string, number>>;
}`;

const newProps = `export interface BookingEngineProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
  initialRoute?: string;
  initialVehicle?: string;
  initialDate?: string;
  initialTime?: string;
  initialPassengers?: string;
  initialLuggage?: string;
  initialType?: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  initialDuration?: string;
  initialPickup?: string;
  initialDropoff?: string;
  initialRates?: Record<string, Record<string, number>>;
  hideInternalStepper?: boolean;
  onStepChange?: (step: 1 | 2 | 3 | 4) => void;
  stepOverride?: 1 | 2 | 3 | 4;
}`;

content = content.replace(oldProps, newProps);

// 2. Update BookingEngineTranslations interface
const oldTranslationsInterface = `  step1Title: string;
  step2Title: string;
  step3Title: string;`;

const newTranslationsInterface = `  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  conciergeBadge: string;
  conciergeInquireBtn: string;
  conciergeNotice: string;
  conciergeSectionTitle: string;`;

content = content.replace(oldTranslationsInterface, newTranslationsInterface);

// 3. Define locale additions
const localeAdditions = {
  en: {
    step1Title: '1. Route & Service',
    step2Title: '2. Select Vehicle & Fare',
    step3Title: '3. Schedule & Trip Details',
    step4Title: '4. Passenger Details & Confirmation',
    conciergeBadge: 'VIP Concierge Only',
    conciergeInquireBtn: 'Inquire via WhatsApp',
    conciergeNotice: 'Exclusive presidential and executive transport. Coordinated directly via WhatsApp concierge.',
    conciergeSectionTitle: 'VIP Diplomatic & Concierge Fleet',
  },
  ar: {
    step1Title: '1. مسار الرحلة والخدمة',
    step2Title: '2. اختيار السيارة والسعر',
    step3Title: '3. الموعد وتفاصيل الرحلة',
    step4Title: '4. بيانات الراكب والتأكيد',
    conciergeBadge: 'خدمة الكونسيرج VIP فقط',
    conciergeInquireBtn: 'استفسار فوري عبر واتساب',
    conciergeNotice: 'سيارات مخصصة للوفود الدبلوماسية ورجال الأعمال. يتم التنسيق المباشر مع فريق الكونسيرج.',
    conciergeSectionTitle: 'أسطول الكونسيرج والوفود الدبلوماسية',
  },
  fr: {
    step1Title: '1. Trajet & Service',
    step2Title: '2. Véhicule & Tarif',
    step3Title: '3. Horaires & Détails',
    step4Title: '4. Passager & Confirmation',
    conciergeBadge: 'Conciergerie VIP Uniquement',
    conciergeInquireBtn: 'Demande via WhatsApp',
    conciergeNotice: 'Transport présidentiel et exécutif sur mesure. Coordination directe via notre conciergerie WhatsApp.',
    conciergeSectionTitle: 'Flotte Diplomatique & Conciergerie VIP',
  },
  es: {
    step1Title: '1. Ruta y Servicio',
    step2Title: '2. Selección de Vehículo',
    step3Title: '3. Horario y Detalles',
    step4Title: '4. Pasajero y Confirmación',
    conciergeBadge: 'Solo Conserjería VIP',
    conciergeInquireBtn: 'Consultar por WhatsApp',
    conciergeNotice: 'Transporte ejecutivo y presidencial exclusivo. Coordinado directamente a través de WhatsApp.',
    conciergeSectionTitle: 'Flota Diplomática y Conserjería VIP',
  },
  id: {
    step1Title: '1. Rute & Layanan',
    step2Title: '2. Pilih Kendaraan',
    step3Title: '3. Jadwal & Detail',
    step4Title: '4. Data Jamaah & Konfirmasi',
    conciergeBadge: 'Khusus Concierge VIP',
    conciergeInquireBtn: 'Tanya via WhatsApp',
    conciergeNotice: 'Layanan transportasi eksklusif untuk delegasi VIP. Dikoordinasikan langsung melalui WhatsApp concierge.',
    conciergeSectionTitle: 'Armada Eksklusif & Concierge VIP',
  },
  hi: {
    step1Title: '1. मार्ग और सेवा',
    step2Title: '2. वाहन और किराया',
    step3Title: '3. समय और यात्रा विवरण',
    step4Title: '4. यात्री और पुष्टि',
    conciergeBadge: 'केवल वीआईपी कंसीयर्ज',
    conciergeInquireBtn: 'WhatsApp पर पूछताछ करें',
    conciergeNotice: 'विशेष कार्यकारी और राजनयिक परिवहन। WhatsApp कंसीयर्ज के माध्यम से समन्वयित।',
    conciergeSectionTitle: 'वीआईपी राजनयिक और कंसीयर्ज बेड़ा',
  },
  de: {
    step1Title: '1. Route & Service',
    step2Title: '2. Fahrzeug & Festpreis',
    step3Title: '3. Zeitplan & Reisedetails',
    step4Title: '4. Passagier & Bestätigung',
    conciergeBadge: 'Nur VIP-Concierge',
    conciergeInquireBtn: 'Über WhatsApp anfragen',
    conciergeNotice: 'Exklusiver Fuhrpark für VIP-Gäste und Delegationen. Direkte Abstimmung per WhatsApp.',
    conciergeSectionTitle: 'VIP-Diplomaten- & Concierge-Flotte',
  },
  ur: {
    step1Title: '1. راستہ اور سروس',
    step2Title: '2. گاڑی اور کرایہ',
    step3Title: '3. شیڈول اور سفر کی تفصیلات',
    step4Title: '4. مسافر کی معلومات اور تصدیق',
    conciergeBadge: 'صرف وی آئی پی کنسیئرج',
    conciergeInquireBtn: 'واٹس ایپ پر رابطہ کریں',
    conciergeNotice: 'خصوصی صدارتی اور سفارتی ٹرانسپورٹ۔ واٹس ایپ کنسیئرج کے ذریعے براہ راست رابطہ۔',
    conciergeSectionTitle: 'وی آئی پی سفارتی اور کنسیئرج فلیٹ',
  },
  ms: {
    step1Title: '1. Laluan & Perkhidmatan',
    step2Title: '2. Pilih Kenderaan & Tambang',
    step3Title: '3. Jadual & Butiran Perjalanan',
    step4Title: '4. Maklumat Jamaah & Pengesahan',
    conciergeBadge: 'Khusus Concierge VIP Sahaja',
    conciergeInquireBtn: 'Pertanyaan via WhatsApp',
    conciergeNotice: 'Pengangkutan eksekutif eksklusif. Diselaraskan secara langsung melalui concierge WhatsApp.',
    conciergeSectionTitle: 'Armada Diplomatik & Concierge VIP',
  },
  tr: {
    step1Title: '1. Güzergah & Hizmet',
    step2Title: '2. Araç & Sabit Ücret',
    step3Title: '3. Program & Yolculuk Detayları',
    step4Title: '4. Yolcu Bilgileri & Onay',
    conciergeBadge: 'Yalnızca VIP Concierge',
    conciergeInquireBtn: 'WhatsApp ile Danışın',
    conciergeNotice: 'Özel başkanlık ve heyet taşımacılığı. WhatsApp concierge ekibimizle doğrudan koordine edilir.',
    conciergeSectionTitle: 'VIP Diplomatik & Concierge Filosu',
  },
};

// Patch each locale in LOCALIZED_UI
for (const [loc, texts] of Object.entries(localeAdditions)) {
  const locMarker = `  ${loc}: {`;
  const idx = content.indexOf(locMarker);
  if (idx !== -1) {
    const titleMarker = 'step1Title:';
    const titleIdx = content.indexOf(titleMarker, idx);
    const endTitleIdx = content.indexOf('step3Title:', titleIdx);
    const lineEnd = content.indexOf('\n', endTitleIdx);

    const replacement = `step1Title: '${texts.step1Title}',
    step2Title: '${texts.step2Title}',
    step3Title: '${texts.step3Title}',
    step4Title: '${texts.step4Title}',
    conciergeBadge: '${texts.conciergeBadge}',
    conciergeInquireBtn: '${texts.conciergeInquireBtn}',
    conciergeNotice: '${texts.conciergeNotice}',
    conciergeSectionTitle: '${texts.conciergeSectionTitle}',`;

    const oldSlice = content.substring(titleIdx, lineEnd);
    content = content.replace(oldSlice, replacement);
    console.log(`Updated LOCALIZED_UI for ${loc}`);
  }
}

// 4. Add CONCIERGE_VEHICLES specs after VEHICLE_SPECS
const oldSpecsEnd = `  coaster: {
    name: 'Toyota Coaster VIP Coach',
    category: 'Executive Coach',
    seats: 21,
    bags: 20,
    img: '/assets/images/coaster_exterior.webp',
  },
};`;

const newSpecsEnd = `  coaster: {
    name: 'Toyota Coaster VIP Coach',
    category: 'Executive Coach',
    seats: 21,
    bags: 20,
    img: '/assets/images/coaster_exterior.webp',
  },
};

const CONCIERGE_VEHICLES: Record<string, VehicleInfo> = {
  maybach: {
    name: 'Mercedes-Maybach S-Class VIP',
    category: 'Ultra VIP Presidential Sedan',
    seats: 3,
    bags: 3,
    img: '/assets/images/maybach_exterior.webp',
  },
  h1: {
    name: 'Hyundai H1 Starex VIP',
    category: 'Family Executive Minivan',
    seats: 7,
    bags: 6,
    img: '/assets/images/h1_exterior.webp',
  },
};`;

content = content.replace(oldSpecsEnd, newSpecsEnd);

writeFileSync('src/components/booking/BookingEngine.tsx', content, 'utf8');
console.log('Successfully patched BookingEngine header, props, translations and concierge specs.');
