import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import {
  Users,
  Briefcase,
  Car,
  Snowflake,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Luggage,
  Baby,
  Clock,
  HeartHandshake,
} from 'lucide-react';
import { VehicleGallery, GalleryPhoto } from '@/components/fleet/VehicleGallery';
import {
  AUTHORITATIVE_TRANSFER_RATES,
  LOCALIZED_ROUTE_NAMES,
} from '@/lib/pricing-constants';
import { FLEET_SHOWCASE_VEHICLES } from '@/data/fleet-showcase-data';

interface FleetDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

interface VehicleSpecification {
  id: string;
  slug: string;
  bookingVehicleId: string;
  seats: number;
  bags: number;
  acType: Record<Locale, string>;
  names: Record<Locale, string>;
  categories: Record<Locale, string>;
  descriptions: Record<Locale, string>;
  features: Record<Locale, string[]>;
  gallery: GalleryPhoto[];
}

// ALIAS MAPPING: Supports both short ('camry', 'yukon') and long ('toyota-camry', 'gmc-yukon-xl') slugs
const SLUG_ALIASES: Record<string, string> = {
  camry: 'toyota-camry',
  'toyota-camry': 'toyota-camry',
  yukon: 'gmc-yukon-xl',
  'gmc-yukon-xl': 'gmc-yukon-xl',
  staria: 'hyundai-staria',
  'hyundai-staria': 'hyundai-staria',
  h1: 'hyundai-h1',
  'hyundai-h1': 'hyundai-h1',
  hiace: 'toyota-hiace',
  'toyota-hiace': 'toyota-hiace',
  coaster: 'toyota-coaster',
  'toyota-coaster': 'toyota-coaster',
  maybach: 'mercedes-maybach',
  'mercedes-maybach': 'mercedes-maybach',
};

// Full 10-language UI strings for detail page
const DETAIL_I18N: Record<string, Record<Locale, string>> = {
  home: {
    en: 'Home',
    ar: 'الرئيسية',
    ms: 'Utama',
    id: 'Beranda',
    ur: 'ہوم',
    fr: 'Accueil',
    es: 'Inicio',
    de: 'Startseite',
    hi: 'होम',
    tr: 'Ana Sayfa',
  },
  fleet: {
    en: 'Our Fleet',
    ar: 'أسطولنا الملكي',
    ms: 'Armada Kami',
    id: 'Armada Kami',
    ur: 'ہمارا بیڑا',
    fr: 'Notre Flotte',
    es: 'Nuestra Flota',
    de: 'Unsere Flotte',
    hi: 'हमारा बेड़ा',
    tr: 'Filomuz',
  },
  bookNow: {
    en: 'Book Online',
    ar: 'احجز الآن',
    ms: 'Tempah Sekarang',
    id: 'Pesan Sekarang',
    ur: 'ابھی بک کریں',
    fr: 'Réserver en Ligne',
    es: 'Reservar en Línea',
    de: 'Online Buchen',
    hi: 'ऑनलाइन बुक करें',
    tr: 'Online Rezervasyon',
  },
  whatsappBooking: {
    en: 'WhatsApp Concierge',
    ar: 'حجز عبر واتساب',
    ms: 'Tempahan WhatsApp',
    id: 'Pemesanan WhatsApp',
    ur: 'واٹس ایپ بکنگ',
    fr: 'Réservation WhatsApp',
    es: 'Reserva por WhatsApp',
    de: 'WhatsApp-Buchung',
    hi: 'व्हाट्सएप बुकिंग',
    tr: 'WhatsApp Rezervasyonu',
  },
  seatsLabel: {
    en: 'Seats',
    ar: 'عدد المقاعد',
    ms: 'Tempat Duduk',
    id: 'Jumlah Kursi',
    ur: 'نشستوں کی تعداد',
    fr: 'Sièges',
    es: 'Asientos',
    de: 'Sitzplätze',
    hi: 'सीटें',
    tr: 'Koltuk Sayısı',
  },
  seatsSuffix: {
    en: 'VIP Seats',
    ar: 'مقاعد VIP',
    ms: 'Kerusi VIP',
    id: 'Kursi VIP',
    ur: 'وی آئی پی نشستیں',
    fr: 'Sièges VIP',
    es: 'Asientos VIP',
    de: 'VIP-Sitze',
    hi: 'वीआईपी सीटें',
    tr: 'VIP Koltuk',
  },
  luggageLabel: {
    en: 'Luggage Capacity',
    ar: 'سعة الحقائب',
    ms: 'Kapasiti Bagasi',
    id: 'Kapasitas Koper',
    ur: 'سامان کی گنجائش',
    fr: 'Capacité Bagages',
    es: 'Capacidad Maletas',
    de: 'Gepäckkapazität',
    hi: 'सामान क्षमता',
    tr: 'Bagaj Kapasitesi',
  },
  luggageSuffix: {
    en: 'Large Suitcases',
    ar: 'حقائب كبيرة',
    ms: 'Beg Bagasi Besar',
    id: 'Koper Besar',
    ur: 'بڑے بیگز',
    fr: 'Grands Bagages',
    es: 'Maletas Grandes',
    de: 'Große Koffer',
    hi: 'बड़े बैग',
    tr: 'Büyük Valiz',
  },
  classLabel: {
    en: 'Vehicle Class',
    ar: 'فئة المركبة',
    ms: 'Kelas Kenderaan',
    id: 'Kelas Kendaraan',
    ur: 'گاڑی کا زمرہ',
    fr: 'Catégorie',
    es: 'Categoría',
    de: 'Kategorie',
    hi: 'श्रेणी',
    tr: 'Kategori',
  },
  acLabel: {
    en: 'Air Conditioning',
    ar: 'نظام التكييف',
    ms: 'Penyaman Udara',
    id: 'Sistem AC',
    ur: 'ایئر کنڈیشننگ',
    fr: 'Climatisation',
    es: 'Climatización',
    de: 'Klimatisierung',
    hi: 'वातानुकूलन',
    tr: 'Klima',
  },
  zamzamLabel: {
    en: 'Zamzam Water',
    ar: 'مياه زمزم',
    ms: 'Air Zamzam',
    id: 'Air Zamzam',
    ur: 'آب زمزم',
    fr: 'Eau de Zamzam',
    es: 'Agua Zamzam',
    de: 'Zamzam-Wasser',
    hi: 'ज़मज़म पानी',
    tr: 'Zemzem Suyu',
  },
  zamzamDesc: {
    en: 'Complimentary Dedicated Storage',
    ar: 'مساحة مخصصة لجوالين زمزم',
    ms: 'Ruang Khas Percuma',
    id: 'Ruang Khusus Tanpa Biaya',
    ur: 'مخصوص جگہ بغیر اضافی چارجز',
    fr: 'Espace Dédié Inclus',
    es: 'Espacio Dedicado Incluido',
    de: 'Inklusive Eigener Stellplatz',
    hi: 'निःशुल्क समर्पित स्थान',
    tr: 'Ücretsiz Özel Alan Dahil',
  },
  childSeatLabel: {
    en: 'Child Safety Seat',
    ar: 'مقعد أمان للأطفال',
    ms: 'Kerusi Keselamatan Bayi',
    id: 'Kursi Bayi & Anak',
    ur: 'بچوں کی سیٹ',
    fr: 'Siège Bébé / Enfant',
    es: 'Asiento Infantil',
    de: 'Kindersicherheitssitz',
    hi: 'बाल सुरक्षा सीट',
    tr: 'Çocuk Güvenlik Koltuğu',
  },
  childSeatDesc: {
    en: 'Available Free Upon Request',
    ar: 'متوفر مجاناً عند الطلب المسبق',
    ms: 'Tersedia Percuma Atas Permintaan',
    id: 'Tersedia Gratis atas Permintaan',
    ur: 'پیشگی درخواست پر مفت دستیاب',
    fr: 'Disponible Gratuitement sur Demande',
    es: 'Gratuito Previa Solicitud',
    de: 'Kostenlos auf Vorbestellung',
    hi: 'अनुरोध पर निःशुल्क उपलब्ध',
    tr: 'Talep Üzerine Ücretsiz Temin Edilir',
  },
  featuresTitle: {
    en: 'Executive Specifications & Verified Amenities',
    ar: 'المواصفات والتجهيزات التنفيذية المعتمدة',
    ms: 'Spesifikasi & Kemudahan Eksekutif Terperinci',
    id: 'Spesifikasi & Fasilitas Eksekutif Lengkap',
    ur: 'تصدیق شدہ ایگزیکٹو خصوصیات اور سہولیات',
    fr: 'Spécifications et Équipements Exécutifs Vérifiés',
    es: 'Especificaciones y Servicios Ejecutivos Verificados',
    de: 'Geprüfte Ausstattung & VIP-Komfortmerkmale',
    hi: 'सत्यापित कार्यकारी विनिर्देश और सुविधाएं',
    tr: 'Onaylanmış Yönetici Donanımı ve Özellikleri',
  },
  pricingTitle: {
    en: 'Authoritative Transfer Fares for This Vehicle',
    ar: 'جدول أسعار التوصيل المعتمدة لهذه المركبة',
    ms: 'Jadual Tambang Rasmi untuk Kenderaan Ini',
    id: 'Daftar Tarif Resmi untuk Kendaraan Ini',
    ur: 'اس گاڑی کے لیے منظور شدہ سفری کرائے',
    fr: 'Tarifs Officiels Garantis pour ce Véhicule',
    es: 'Tarifas Oficiales Garantizadas para este Vehículo',
    de: 'Offizielle Festpreise für dieses Fahrzeug',
    hi: 'इस वाहन के लिए आधिकारिक निश्चित किराया',
    tr: 'Bu Araç İçin Resmi Onaylı Fiyat Tarifesi',
  },
  pricingSubtitle: {
    en: 'Guaranteed fixed fares in SAR. 100% Cash payment directly to your chauffeur upon arrival — zero advance payment or deposit.',
    ar: 'أسعار ثابتة ومعلنة بالريال السعودي. الدفع نقداً 100% مباشرة للسائق عند الوصول — لا يلزم أي دفع مسبق أو عربون.',
    ms: 'Kadar tetap dalam SAR. 100% Bayaran tunai kepada pemandu semasa tiba — tiada sebarang bayaran pendahuluan.',
    id: 'Tarif pasti dalam SAR. 100% Bayar tunai ke sopir saat tiba — tanpa uang muka atau deposit sama sekali.',
    ur: 'سعودی ریال میں مقررہ اور حتمی کرائے۔ آمد پر ڈرائیور کو 100% نقد ادائیگی — پیشگی رقم صفر۔',
    fr: 'Tarifs fixes garantis en SAR. 100% Espèces réglées directement au chauffeur à l\'arrivée.',
    es: 'Tarifas fijas garantizadas en SAR. Pago directo en efectivo al chofer al llegar.',
    de: 'Garantierte Festpreise in SAR. 100% Barzahlung beim Fahrer bei Ankunft — keine Anzahlung.',
    hi: 'रियाल में गारंटीकृत निश्चित किराया। पहुंचने पर ड्राइवर को 100% नकद भुगतान।',
    tr: 'SAR cinsinden garantili sabit fiyatlar. Varışta şoföre %100 nakit ödeme — ön ödeme yok.',
  },
  routeCol: {
    en: 'Transfer Route',
    ar: 'مسار الرحلة',
    ms: 'Laluan Perjalanan',
    id: 'Rute Perjalanan',
    ur: 'سفری روٹ',
    fr: 'Trajet',
    es: 'Ruta',
    de: 'Transfer-Route',
    hi: 'यात्रा मार्ग',
    tr: 'Güzergah',
  },
  fareCol: {
    en: 'Fixed Fare (SAR)',
    ar: 'السعر الثابت (ر.س)',
    ms: 'Tambang Tetap (SAR)',
    id: 'Tarif Pasti (SAR)',
    ur: 'مقررہ کرایہ (SAR)',
    fr: 'Tarif Fixe (SAR)',
    es: 'Tarifa Fija (SAR)',
    de: 'Festpreis (SAR)',
    hi: 'निश्चित किराया (SAR)',
    tr: 'Sabit Fiyat (SAR)',
  },
  actionCol: {
    en: 'Instant Booking',
    ar: 'الحجز المباشر',
    ms: 'Tempahan Segera',
    id: 'Pesan Sekarang',
    ur: 'فوری بکنگ',
    fr: 'Réservation',
    es: 'Reserva Inmediata',
    de: 'Buchung',
    hi: 'तत्काल बुकिंग',
    tr: 'Rezervasyon',
  },
  bookRouteBtn: {
    en: 'Book Route',
    ar: 'احجز هذا المسار',
    ms: 'Tempah Laluan',
    id: 'Pesan Rute',
    ur: 'یہ روٹ بک کریں',
    fr: 'Réserver ce Trajet',
    es: 'Reservar esta Ruta',
    de: 'Transfer Buchen',
    hi: 'यह मार्ग बुक करें',
    tr: 'Rotayı Ayırtın',
  },
  bespokeNoticeTitle: {
    en: 'VIP Concierge Bespoke Reservation',
    ar: 'حجز كونسيرج VIP مخصص',
    ms: 'Tempahan Khas Concierge VIP',
    id: 'Reservasi Khusus Concierge VIP',
    ur: 'خصوصی وی آئی پی دربان بکنگ',
    fr: 'Réservation VIP Concierge Sur Mesure',
    es: 'Reserva VIP de Conserjería a Medida',
    de: 'Maßgeschneiderte VIP-Concierge-Reservierung',
    hi: 'वीआईपी दरबान विशेष आरक्षण',
    tr: 'Özel VIP Konsiyerj Rezervasyonu',
  },
  bespokeNoticeDesc: {
    en: 'Fares and itineraries for this ultra-luxury vehicle are personally tailored to your delegation schedule, private security, and protocol requirements.',
    ar: 'يتم تحديد مسارات وأسعار هذه المركبة الملكية بشكل خاص بما يلائم مواعيد وفدكم وبروتوكول تنقلكم بين مكة والمدينة وجدة.',
    ms: 'Tambang dan jadual untuk kenderaan ultra-mewah ini disesuaikan khusus untuk rombongan anda.',
    id: 'Tarif dan rute untuk kendaraan ultra-mewah ini disesuaikan secara khusus dengan jadwal delegasi Anda.',
    ur: 'اس شاہی گاڑی کے لیے کرائے اور شیڈول آپ کے وفد کے اوقات اور پروٹوکول کے مطابق خصوصی طور پر طے کیے جاتے ہیں۔',
    fr: 'Les tarifs et itinéraires de ce véhicule d\'exception sont personnalisés selon le planning de votre délégation.',
    es: 'Las tarifas e itinerarios de este vehículo exclusivo se adaptan personalmente al horario de su delegación.',
    de: 'Tarife und Routen für dieses Luxusfahrzeug werden individuell auf Ihren Zeitplan abgestimmt.',
    hi: 'इस अल्ट्रा-लक्जरी वाहन के लिए किराया और मार्ग आपके प्रतिनिधिमंडल के शेड्यूल के अनुसार अनुकूलित हैं।',
    tr: 'Bu ultra lüks araç için fiyatlar ve güzergahlar heyetinizin programına göre özel olarak hazırlanır.',
  },
  assuranceTitle: {
    en: 'Duyuf Alrahman VIP Sacred Journey Guarantee',
    ar: 'ضمان ضيوف الرحمن VIP لرحلة مباركة',
    ms: 'Jaminan Perjalanan Suci Duyuf Alrahman VIP',
    id: 'Jaminan Perjalanan Ibadah Duyuf Alrahman VIP',
    ur: 'ضیوف الرحمن وی آئی پی کا مقدس سفر کا تحفہ و ضمانت',
    fr: 'Garantie Voyage Sacré Duyuf Alrahman VIP',
    es: 'Garantía de Viaje Sagrado Duyuf Alrahman VIP',
    de: 'Duyuf Alrahman VIP Heilige Reise-Garantie',
    hi: 'ज़ुयूफ़ अल-रहमान वीआईपी पवित्र यात्रा गारंटी',
    tr: 'Duyuf Alrahman VIP Kutsal Yolculuk Garantisi',
  },
  assuranceDesc: {
    en: 'Immaculately maintained 2024–2025 modern vehicles, certified executive chauffeurs intimately familiar with Haramain routes, zero advance payments, and 100% peace of mind.',
    ar: 'مركبات حديثة 2024–2025 معقمة ومجهزة بأعلى معايير الأمان، وسائقون محترفون ملمون بمسارات الحرمين والفنادق، وأسعار معلنة وثابتة بالريال السعودي والدفع عند الوصول.',
    ms: 'Kenderaan moden 2024–2025 dinyahkuman, pemandu bertauliah pakar jalan Dua Tanah Suci, tiada pendahuluan, dan ketenangan mutlak.',
    id: 'Armada modern 2024–2025 steril wangi, sopir profesional bersertifikat, tanpa uang muka, dan ketenangan ibadah 100%.',
    ur: '2024-2025 ماڈل کی معقم اور پرسکون گاڑیاں، حرمین کے راستوں کے ماہر لائسنس یافتہ ڈرائیور، کوئی پیشگی ادائیگی نہیں اور 100% اطمینان۔',
    fr: 'Flotte 2024–2025 désinfectée, chauffeurs professionnels agréés, aucun paiement d\'avance et sérénité absolue.',
    es: 'Vehículos 2024–2025 desinfectados, choferes profesionales certificados, sin pagos por adelantado y máxima tranquilidad.',
    de: 'Gepflegte Fahrzeuge 2024–2025, zertifizierte Chauffeure, keinerlei Vorauszahlung und garantierte Zuverlässigkeit.',
    hi: 'स्वच्छ 2024–2025 आधुनिक वाहन, हरमैन मार्गों के विशेषज्ञ प्रमाणित ड्राइवर, शून्य अग्रिम भुगतान।',
    tr: 'Steril 2024–2025 modern araçlar, sertifikalı uzman şoförler, sıfır ön ödeme ve %100 huzurlu bir yolculuk.',
  },
  bottomBookCta: {
    en: 'Reserve Your Chauffeur For',
    ar: 'احجز سيارة',
    ms: 'Tempah Kenderaan',
    id: 'Pesan Kendaraan',
    ur: 'گاڑی بک کریں:',
    fr: 'Réserver Votre Chauffeur pour',
    es: 'Reserve su Chofer para',
    de: 'Reservieren Sie Ihren Chauffeur für',
    hi: 'के लिए अपना चौफर बुक करें',
    tr: 'Özel Şoförünüzü Ayırtın:',
  },
};

// Key corridors to display in Route Pricing Table
const KEY_CORRIDORS = [
  'jeddah-airport-to-makkah',
  'makkah-to-jeddah-airport',
  'makkah-to-madinah',
  'madinah-to-makkah',
  'madinah-airport-to-hotel',
  'jeddah-to-madinah',
  'makkah-to-taif',
  'taif-to-makkah',
  'jeddah-to-taif',
];

export function generateStaticParams() {
  const allSlugs = Object.keys(SLUG_ALIASES);
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: FleetDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const resolvedSlug = SLUG_ALIASES[slug] || 'hyundai-staria';
  const showcase = FLEET_SHOWCASE_VEHICLES.find((v) => v.slug === resolvedSlug) || FLEET_SHOWCASE_VEHICLES[2];
  const name = showcase.name[locale] || showcase.name.en;
  const desc = showcase.desc[locale] || showcase.desc.en;

  return {
    title: `${name} | Duyuf Alrahman VIP`,
    description: desc.slice(0, 160),
    alternates: getLocalizedAlternates(locale, `/fleet/${slug}`),
  };
}

export default async function FleetDetailPage(props: FleetDetailPageProps) {
  const params = await props.params;
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const resolvedSlug = SLUG_ALIASES[slug];
  if (!resolvedSlug) {
    notFound();
  }

  // Look up unified vehicle
  const v = FLEET_SHOWCASE_VEHICLES.find((item) => item.slug === resolvedSlug);
  if (!v) {
    notFound();
  }

  const name = v.name[locale] || v.name.en;
  const category = v.category[locale] || v.category.en;
  const desc = v.desc[locale] || v.desc.en;
  const isBespoke = v.id === 'maybach' || v.id === 'h1';

  const t = (key: string): string => {
    return DETAIL_I18N[key]?.[locale] || DETAIL_I18N[key]?.en || key;
  };

  // Build standard 5-photo verified gallery
  const galleryPhotos: GalleryPhoto[] = [
    {
      src: `/assets/images/vehicles/${resolvedSlug}/exterior_front.jpg`,
      title: isAr ? 'الواجهة الأمامية وهيبة المركبة' : `${name} Front Stance & Grille`,
      tag: isAr ? 'الواجهة الأمامية' : 'Exterior Front',
      type: 'exterior',
    },
    {
      src: `/assets/images/vehicles/${resolvedSlug}/side_profile.jpg`,
      title: isAr ? 'المظهر الجانبي وانسيابية الهيكل' : `${name} Side Profile & Aerodynamics`,
      tag: isAr ? 'الجانب الكامل' : 'Side Profile',
      type: 'exterior',
    },
    {
      src: `/assets/images/vehicles/${resolvedSlug}/exterior_rear.jpg`,
      title: isAr ? 'الواجهة الخلفية وسعة التحميل' : `${name} Rear Profile & Cargo Access`,
      tag: isAr ? 'الواجهة الخلفية' : 'Exterior Rear',
      type: 'exterior',
    },
    {
      src: `/assets/images/vehicles/${resolvedSlug}/interior_seats.jpg`,
      title: isAr ? 'المقصورة الملكية ومقاعد الراحة' : `${name} VIP Cabin Seating & Luxury Leather`,
      tag: isAr ? 'المقصورة والمقاعد' : 'VIP Seats',
      type: 'interior',
    },
    {
      src: `/assets/images/vehicles/${resolvedSlug}/interior_dashboard.jpg`,
      title: isAr ? 'لوحة القيادة والتحكم الرقمي' : `${name} Cockpit & Digital Controls`,
      tag: isAr ? 'لوحة القيادة' : 'Dashboard',
      type: 'interior',
    },
  ];

  // Specific Air Conditioning description per vehicle
  const acTypeMap: Record<string, Record<Locale, string>> = {
    maybach: {
      en: 'Quad-Zone Active Climate Control with Air Ionization & Fragrance',
      ar: 'تكييف هوائي ملكي رباعي المناطق مع فلترة وتنقية الهواء',
      ms: 'Kawalan Iklim 4-Zon dengan Penapisan Udara',
      id: 'Pendingin Udara 4-Zona dengan Filtrasi Udara',
      ur: 'چار زون شاہی ایئر کنڈیشننگ مع ایئر فلٹریشن',
      fr: 'Climatisation Quadri-Zone avec Ionisation de l\'Air',
      es: 'Climatización Cuatrizona con Ionización de Aire',
      de: 'Vier-Zonen-Klimaautomatik mit Luftionisierung',
      hi: 'वायु शोधन के साथ 4-ज़ोन वातानुकूलन',
      tr: 'Hava İyonizasyonlu Dört Bölgeli Dijital Klima',
    },
    yukon: {
      en: 'Tri-Zone Heavy-Duty Climate Control with Roof Diffusers',
      ar: 'تكييف ثلاثي المناطق عالي التبريد مع فتحات سقفية لكل مقعد',
      ms: 'Kawalan Iklim 3-Zon dengan Salur Siling',
      id: 'Pendingin 3-Zona dengan Ventilasi Atap di Tiap Baris',
      ur: 'تھری زون طاقتور ایئر کنڈیشننگ چھت کے وینٹس کے ساتھ',
      fr: 'Climatisation Tri-Zone Haute Puissance avec Diffuseurs de Toit',
      es: 'Climatización Trizona de Alto Rendimiento con Salidas de Techo',
      de: 'Drei-Zonen-Klimaautomatik mit Dachlüftern',
      hi: 'छत के वेंट के साथ 3-ज़ोन शक्तिशाली वातानुकूलन',
      tr: 'Tavan Menfezli Üç Bölgeli Güçlü Klima Sistemi',
    },
    staria: {
      en: 'Dual High-Output Climate Control with Independent Rear Dials',
      ar: 'تكييف مزدوج فائق التبريد مع تحكم مستقل لركاب المقصورة',
      ms: 'Penyaman Udara Dwi-Zon dengan Kawalan Belakang',
      id: 'AC Ganda Super Dingin dengan Kontrol Mandiri Baris Belakang',
      ur: 'ڈوئل ہائی آؤٹ پٹ اے سی پچھلے مسافروں کے لیے آزاد کنٹرول کے ساتھ',
      fr: 'Double Climatisation Haute Puissance avec Commandes Arrière',
      es: 'Doble Climatización con Controles Traseros Independientes',
      de: 'Duale Hochleistungsklimaanlage mit separater Fondsteuerung',
      hi: 'स्वतंत्र रियर नियंत्रण के साथ दोहरा शक्तिशाली वातानुकूलन',
      tr: 'Arka Yolcu Bağımsız Kontrollü Çift Çıkışlı Klima',
    },
    camry: {
      en: 'Dual-Zone Whisper-Quiet Automatic Climate Control',
      ar: 'تكييف هادئ ثنائي المناطق مع فتحات تهوية للمقاعد الخلفية',
      ms: 'Penyaman Udara Automatik Dwi-Zon Sangat Senyap',
      id: 'AC Otomatis Senyap Dwi-Zona dengan Ventilasi Belakang',
      ur: 'پرسکون ڈوئل زون آٹومیٹک ایئر کنڈیشننگ',
      fr: 'Climatisation Automatique Silencieuse Bi-Zone',
      es: 'Climatizador Automático Silencioso Bizona',
      de: 'Flüsterleise Zwei-Zonen-Klimaautomatik',
      hi: 'शांत दोहरी-क्षेत्र स्वचालित जलवायु नियंत्रण',
      tr: 'Sessiz Çift Bölgeli Otomatik Klima',
    },
    h1: {
      en: 'Heavy-Duty Twin-Evaporator Climate System for Desert Travel',
      ar: 'نظام تكييف مزدوج قوي مصمم للأجواء الحارة وطريق الهجرة',
      ms: 'Sistem Penyaman Udara Berganda untuk Iklim Panas',
      id: 'AC Ganda Bertenaga Tinggi Khusus Cuaca Panas Gurun',
      ur: 'شدید گرمی کے لیے تیار کردہ طاقتور ڈوئل ای سی',
      fr: 'Système Double Évaporateur Haute Performance',
      es: 'Sistema Doble de Climatización de Alta Potencia',
      de: 'Leistungsstarkes Doppel-Klimasystem für Heißklima',
      hi: 'गर्म मौसम के लिए भारी शुल्क दोहरा शीतलन प्रणाली',
      tr: 'Çöl İklimine Uygun Çift Evaporatörlü Yüksek Güçlü Klima',
    },
    hiace: {
      en: 'Roof-Mounted High-Volume Cooling with Louvers Across Every Row',
      ar: 'تكييف مركزي سقف عالي التدفق مع موجهات هواء لكل راكب',
      ms: 'Penyaman Udara Siling Berkuasa Tinggi di Setiap Baris',
      id: 'Pendingin Kabin Atap Bertenaga dengan Kisi Udara Tiap Baris',
      ur: 'چھت پر نصب طاقتور سینٹرل اے سی ہر قطار کے لیے',
      fr: 'Climatisation Centrale de Toit avec Diffuseurs à Chaque Rangée',
      es: 'Climatización Central de Techo con Salidas en Cada Fila',
      de: 'Zentrale Dachklimaanlage mit Auslässen über jeder Sitzreihe',
      hi: 'प्रत्येक पंक्ति में व्यक्तिगत वेंट के साथ छत पर लगा केंद्रीय एसी',
      tr: 'Her Sıra İçin Bağımsız Menfezli Yüksek Kapasiteli Tavan Kliması',
    },
    coaster: {
      en: 'Industrial Central Air Conditioning with Individual Air Nozzles',
      ar: 'تكييف حافلات مركزي جبار مع فوهات هواء قابلة للتوجيه لكل مقعد',
      ms: 'Penyaman Udara Bas Pusat Berkuasa Tinggi Setiap Tempat Duduk',
      id: 'Sistem AC Sentral Bus Bertenaga dengan Nosel Udara Tiap Kursi',
      ur: 'طاقتور مرکزی بس ایئر کنڈیشننگ سسٹم ہر نشست پر انفرادی نوزلز کے ساتھ',
      fr: 'Climatisation Centrale d\'Autocar avec Buses Individuelles Réglables',
      es: 'Climatización Central de Autocar con Boquillas Individuales',
      de: 'Industrielle Bus-Klimaanlage mit individuellen Düsen an jedem Sitz',
      hi: 'प्रत्येक सीट पर समायोज्य नोजल के साथ केंद्रीय बस एसी',
      tr: 'Her Koltukta Ayarlanabilir Hava Menfezi Bulunan Merkezi Otobüs Kliması',
    },
  };

  const acDescription =
    acTypeMap[v.id]?.[locale] ||
    acTypeMap[v.id]?.en ||
    'Multi-Zone High-Performance Climate Control';

  // Direct WhatsApp URL
  const whatsappMessage = encodeURIComponent(
    isAr
      ? `السلام عليكم، أود حجز سيارة (${name}) لرحلة العمرة.`
      : `Hello Duyuf Alrahman VIP, I would like to inquire about reserving the (${name}) for our Umrah transfer.`
  );
  const whatsappUrl = `https://wa.me/966567554988?text=${whatsappMessage}`;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const pageUrl = `${baseUrl}/${locale}/fleet/${slug}`;

  // Structured Data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('home'),
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('fleet'),
        item: `${baseUrl}/${locale}/fleet`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: pageUrl,
      },
    ],
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    category,
    description: desc,
    image: `${baseUrl}/assets/images/vehicles/${resolvedSlug}/exterior-studio.webp`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'SAR',
      price: v.startingPriceSAR,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="py-10 sm:py-16 md:py-20 bg-[#F7F5F0] min-h-screen text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, '\\u003c') }}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* 1. BREADCRUMB NAVIGATION */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-6 sm:mb-8"
        >
          <Link href={`/${locale}`} className="hover:text-[#C5A15D] transition-colors">
            {t('home')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <Link href={`/${locale}/fleet`} className="hover:text-[#C5A15D] transition-colors">
            {t('fleet')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <span className="text-[#101827] font-bold truncate">{name}</span>
        </nav>

        {/* 2. HERO VEHICLE TITLE & DUAL ACTION BUTTONS */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#101827] text-[#C5A15D] border border-[#C5A15D]/30 mb-3 shadow-xs">
            <Sparkles className="w-3 h-3" />
            <span>{category}</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#101827] tracking-tight leading-tight mb-3">
            {name}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal mb-6">
            {desc}
          </p>

          {/* DUAL ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {isBespoke ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 rounded-xl bg-[#C5A15D] hover:bg-[#b5924f] text-[#101827] font-extrabold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('whatsappBooking')}</span>
              </a>
            ) : (
              <Link
                href={`/${locale}/booking?vehicle=${v.bookingVehicleId}`}
                className="h-12 px-7 rounded-xl bg-[#101827] hover:bg-[#111C30] text-[#C5A15D] hover:text-white border border-[#C5A15D]/40 font-extrabold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{t('bookNow')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 rounded-xl bg-white border border-slate-300 hover:border-[#C5A15D] text-slate-800 hover:text-[#101827] font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{t('whatsappBooking')}</span>
            </a>
          </div>
        </div>

        {/* 3. 4-ITEM EXECUTIVE SPECIFICATION GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {/* Item 1: Seats */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E3DA] shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-[#C5A15D] flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {t('seatsLabel')}
              </span>
              <p className="text-base sm:text-lg font-black text-[#101827] tracking-tight">
                {v.passengers} {t('seatsSuffix')}
              </p>
            </div>
          </div>

          {/* Item 2: Luggage */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E3DA] shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-[#C5A15D] flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {t('luggageLabel')}
              </span>
              <p className="text-base sm:text-lg font-black text-[#101827] tracking-tight">
                {v.luggage} {t('luggageSuffix')}
              </p>
            </div>
          </div>

          {/* Item 3: Vehicle Class */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E3DA] shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-[#C5A15D] flex items-center justify-center mb-3">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {t('classLabel')}
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-[#101827] tracking-tight truncate">
                {category}
              </p>
            </div>
          </div>

          {/* Item 4: Air Conditioning */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E3DA] shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-sky-600 flex items-center justify-center mb-3">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {t('acLabel')}
              </span>
              <p className="text-[11px] sm:text-xs font-bold text-[#101827] leading-snug line-clamp-2">
                {acDescription}
              </p>
            </div>
          </div>
        </div>

        {/* 4. UPGRADED 5-PHOTO INTERACTIVE GALLERY WITH LIGHTBOX & SWIPE */}
        <VehicleGallery
          images={galleryPhotos}
          vehicleName={name}
          locale={locale}
        />

        {/* 5. ROUTE-SPECIFIC PRICING TABLE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-xs mb-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#F7F5F0] border border-[#E8E3DA] text-[#C5A15D] mb-2">
              Transparent Fares
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#101827] tracking-tight mb-2">
              {t('pricingTitle')}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              {t('pricingSubtitle')}
            </p>
          </div>

          {isBespoke ? (
            /* Bespoke Concierge Callout for Maybach & H1 */
            <div className="p-6 rounded-2xl bg-[#101827] text-white border border-[#C5A15D]/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#C5A15D] mb-2">
                  {t('bespokeNoticeTitle')}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                  {t('bespokeNoticeDesc')}
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 rounded-xl bg-[#C5A15D] hover:bg-[#b5924f] text-[#101827] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('whatsappBooking')}</span>
              </a>
            </div>
          ) : (
            /* Authoritative Route Pricing Table */
            <div className="overflow-x-auto rounded-2xl border border-[#E8E3DA]">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="bg-[#101827] text-white text-xs font-bold uppercase tracking-wider border-b border-[#C5A15D]/30">
                    <th className="py-3.5 px-4 sm:px-6">{t('routeCol')}</th>
                    <th className="py-3.5 px-4 text-center">{t('fareCol')}</th>
                    <th className="py-3.5 px-4 text-center">{t('actionCol')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DA] text-xs sm:text-sm text-slate-800">
                  {KEY_CORRIDORS.map((routeKey, idx) => {
                    const price = AUTHORITATIVE_TRANSFER_RATES[routeKey]?.[v.bookingVehicleId];
                    if (!price) return null;

                    const routeName =
                      LOCALIZED_ROUTE_NAMES[routeKey]?.[locale] ||
                      LOCALIZED_ROUTE_NAMES[routeKey]?.en ||
                      routeKey;

                    return (
                      <tr
                        key={routeKey}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F0]/60 hover:bg-[#F7F5F0]'}
                      >
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#101827]">
                          {routeName}
                        </td>
                        <td className="py-3.5 px-4 text-center font-display font-extrabold text-[#101827] whitespace-nowrap">
                          {price} SAR
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <Link
                            href={`/${locale}/booking?vehicle=${v.bookingVehicleId}&route=${routeKey}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#101827] hover:bg-[#C5A15D] text-[#C5A15D] hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs"
                          >
                            <span>{t('bookRouteBtn')}</span>
                            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 6. VERIFIED FEATURES & EXECUTIVE AMENITIES */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-xs mb-8">
          <h2 className="font-display font-extrabold text-2xl text-[#101827] mb-6 tracking-tight">
            {t('featuresTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {v.features.map((feat, idx) => {
              const featTitle = feat.title[locale] || feat.title.en;
              const featDesc = feat.desc[locale] || feat.desc.en;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F7F5F0]/70 border border-[#E8E3DA] flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-[#101827] mb-0.5">
                      {featTitle}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {featDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Extra inclusions: Zamzam & Child Seat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-[#E8E3DA]">
            <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E3DA] flex items-center gap-3">
              <Luggage className="w-5 h-5 text-[#C5A15D] shrink-0" />
              <div>
                <strong className="block text-xs font-bold text-[#101827]">
                  {t('zamzamLabel')}
                </strong>
                <span className="text-[11px] text-slate-600">{t('zamzamDesc')}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E3DA] flex items-center gap-3">
              <Baby className="w-5 h-5 text-[#C5A15D] shrink-0" />
              <div>
                <strong className="block text-xs font-bold text-[#101827]">
                  {t('childSeatLabel')}
                </strong>
                <span className="text-[11px] text-slate-600">{t('childSeatDesc')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7. SACRED JOURNEY ASSURANCE CARD */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#101827] text-white border border-[#C5A15D]/30 shadow-md mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#111C30] border border-[#C5A15D]/40 text-[#C5A15D] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-start">
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#C5A15D] mb-1.5">
              {t('assuranceTitle')}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              {t('assuranceDesc')}
            </p>
          </div>
        </div>

        {/* 8. BOTTOM BOOKING CALLOUT BAR */}
        <div className="text-center pt-2 pb-8">
          {isBespoke ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-14 px-9 rounded-2xl bg-[#C5A15D] hover:bg-[#b5924f] text-[#101827] font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>
                {t('bottomBookCta')} {name}
              </span>
            </a>
          ) : (
            <Link
              href={`/${locale}/booking?vehicle=${v.bookingVehicleId}`}
              className="inline-flex items-center gap-2.5 h-14 px-9 rounded-2xl bg-[#101827] hover:bg-[#111C30] text-[#C5A15D] hover:text-white border border-[#C5A15D]/50 font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"
            >
              <span>
                {t('bottomBookCta')} {name}
              </span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
