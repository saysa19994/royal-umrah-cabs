import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { Locale, LOCALE_CONFIG, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import {
  Users,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Luggage,
  Baby,
} from 'lucide-react';
import { VehicleGallery, GalleryPhoto } from '@/components/fleet/VehicleGallery';
import AutomotiveShowroomExperience from '@/components/fleet/AutomotiveShowroomExperience';
import {
  AUTHORITATIVE_TRANSFER_RATES,
  LOCALIZED_ROUTE_NAMES,
} from '@/lib/pricing-constants';
import { FLEET_SHOWCASE_VEHICLES } from '@/data/fleet-showcase-data';
import { getDbVehiclesCached } from '@/lib/fleet-db';
import { getSiteSettings } from '@/lib/settings';
import styles from './vehicle-detail.module.css';

interface FleetDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
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

// Canonical official vehicle slugs (strictly excludes duplicate aliases from pre-rendering)
const OFFICIAL_FLEET_SLUGS = [
  'toyota-camry',
  'gmc-yukon-xl',
  'hyundai-staria',
  'toyota-hiace',
  'toyota-coaster',
];

export function generateStaticParams() {
  return OFFICIAL_FLEET_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(props: FleetDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const resolvedSlug = SLUG_ALIASES[slug] || 'hyundai-staria';
  const published=await getDbVehiclesCached();
  const showcase = published.find(v=>v.slug===resolvedSlug);
  if(!showcase)return {title:'Vehicle unavailable',robots:{index:false,follow:false}};
  const name = showcase.name[locale] || showcase.name.en;
  const desc = showcase.desc[locale] || showcase.desc.en;

  return {
    title: `${name} | Duyuf Alrahman VIP`,
    description: desc.slice(0, 160),
    alternates: getLocalizedAlternates(locale, `/fleet/${resolvedSlug}`),
  };
}

export default async function FleetDetailPage(props: FleetDetailPageProps) {
  const params = await props.params;
  const { locale, slug } = params;
  const localeConfig = LOCALE_CONFIG[locale];
  const dict = getDictionary(locale);

  const resolvedSlug = SLUG_ALIASES[slug];
  if (!resolvedSlug) {
    notFound();
  }

  // 301 Permanent Redirect legacy short slugs to official canonical URLs
  if (slug !== resolvedSlug) {
    redirect(`/${locale}/fleet/${resolvedSlug}`);
  }

  // Look up unified vehicle
  const publishedVehicles=await getDbVehiclesCached();
  const v=publishedVehicles.find(item=>item.slug===resolvedSlug);
  if(!v)notFound();

  const name = v.name[locale] || v.name.en;
  const category = v.category[locale] || v.category.en;
  const desc = v.desc[locale] || v.desc.en;
  const isBespoke = v.id === 'maybach' || v.id === 'h1';

  const t = (key: string): string => {
    return DETAIL_I18N[key]?.[locale] || DETAIL_I18N[key]?.en || key;
  };

  const GALLERY_TAGS_I18N: Record<Locale, { front: string; side: string; rear: string; seats: string; dash: string }> = {
    en: { front: 'Exterior Front', side: 'Side Profile', rear: 'Exterior Rear', seats: 'VIP Seats', dash: 'Dashboard' },
    ar: { front: 'الواجهة الأمامية', side: 'الجانب الكامل', rear: 'الواجهة الخلفية', seats: 'المقصورة والمقاعد', dash: 'لوحة القيادة' },
    ms: { front: 'Hadapan Luaran', side: 'Profil Sisi', rear: 'Belakang Luaran', seats: 'Kerusi VIP', dash: 'Papan Pemuka' },
    id: { front: 'Tampak Depan', side: 'Profil Samping', rear: 'Tampak Belakang', seats: 'Kursi VIP', dash: 'Dasbor' },
    ur: { front: 'سامنے کا منظر', side: 'سائیڈ پروفائل', rear: 'پچھلا منظر', seats: 'وی آئی پی نشستیں', dash: 'ڈیش بورڈ' },
    fr: { front: 'Avant Extérieur', side: 'Profil Latéral', rear: 'Arrière Extérieur', seats: 'Sièges VIP', dash: 'Tableau de Bord' },
    es: { front: 'Frente Exterior', side: 'Perfil Lateral', rear: 'Parte Trasera', seats: 'Asientos VIP', dash: 'Tablero' },
    de: { front: 'Frontansicht', side: 'Seitenprofil', rear: 'Heckansicht', seats: 'VIP-Sitze', dash: 'Cockpit' },
    tr: { front: 'Ön Görünüm', side: 'Yan Profil', rear: 'Arka Görünüm', seats: 'VIP Koltuklar', dash: 'Kokpit' },
    hi: { front: 'बाहरी अग्रभाग', side: 'साइड प्रोफाइल', rear: 'पिछला भाग', seats: 'वीआईपी सीटें', dash: 'डैशबोर्ड' },
  };
  const gTag = GALLERY_TAGS_I18N[locale] || GALLERY_TAGS_I18N.en;

  const galleryPhotos: GalleryPhoto[] = [
    {
      src: `/assets/images/vehicles/${resolvedSlug}/exterior_front.jpg`,
      title: `${name} — ${gTag.front}`,
      tag: gTag.front,
      type: 'exterior',
    },
    {
      src: `/assets/images/vehicles/${resolvedSlug}/side_profile.jpg`,
      title: `${name} — ${gTag.side}`,
      tag: gTag.side,
      type: 'exterior',
    },
    {
      src: `/assets/images/vehicles/${resolvedSlug}/exterior_rear.jpg`,
      title: `${name} — ${gTag.rear}`,
      tag: gTag.rear,
      type: 'exterior',
    },
    {
      src: resolvedSlug === 'toyota-hiace'
        ? '/assets/images/vehicles/toyota-hiace/seats.webp'
        : `/assets/images/vehicles/${resolvedSlug}/interior_seats.jpg`,
      title: `${name} — ${gTag.seats}`,
      tag: gTag.seats,
      type: 'interior',
    },
    {
      src: `/assets/images/vehicles/${resolvedSlug}/interior_dashboard.jpg`,
      title: `${name} — ${gTag.dash}`,
      tag: gTag.dash,
      type: 'interior',
    },
  ];

  // The first exterior and cabin images come from the owner's active fleet record.
  // Keep additional detail photography as graceful historical fallbacks.
  const ext=v.gallery.find(photo=>photo.type==='exterior')?.src;
  const cabin=v.gallery.find(photo=>photo.type==='interior')?.src;
  if(ext)galleryPhotos[0].src=ext;
  if(cabin)galleryPhotos[3].src=cabin;

  const settings = await getSiteSettings();
  const formatNumber = new Intl.NumberFormat(localeConfig.dateFormat);
  const formatFare = new Intl.NumberFormat(localeConfig.dateFormat, {
    style: 'currency', currency: 'SAR', maximumFractionDigits: 0,
  });
  const whatsappMessage = encodeURIComponent(`${localeConfig.whatsappGreeting} ${name}`);
  const whatsappUrl = `https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=${whatsappMessage}`;
  const studioImage = ext || `/assets/images/vehicles/${resolvedSlug}/exterior-studio.webp`;

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

  const vehicleServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Private chauffeur vehicle service',
    name,
    category,
    description: desc,
    image: studioImage.startsWith('https://') ? studioImage : `${baseUrl}${studioImage}`,
    provider: { '@type': 'TravelAgency', name: 'Duyuf Al Rahman VIP', url: baseUrl },
  };

  return (
    <div className="duyuf-vehicle-detail duyuf-vehicle-page relative py-10 sm:py-16 md:py-20 bg-bg min-h-screen text-start text-ink overflow-hidden transition-colors duration-200" dir={localeConfig.dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleServiceSchema).replace(/</g, '\\u003c') }}
      />

      <header className={styles.studio}>
        <nav aria-label={t('fleet')} className={styles.breadcrumb}>
          <Link href={`/${locale}`}>{t('home')}</Link>
          <ChevronRight size={14} className="rtl:rotate-180" aria-hidden="true" />
          <Link href={`/${locale}/fleet`}>{t('fleet')}</Link>
        </nav>
        <div className={styles.studioLayout}>
          <div className={styles.intro}>
            <span className={styles.category}>{category}</span>
            <h1>{name}</h1>
            <p>{desc}</p>

            <div className={styles.actions}>
              {!isBespoke && (
                <Link href={`/${locale}/booking?vehicle=${v.bookingVehicleId}`} className={styles.primary}>
                  {t('bookNow')} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
                </Link>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={isBespoke ? styles.primary : styles.secondary}
              >
                <MessageCircle size={18} aria-hidden="true" /> {t('whatsappBooking')}
              </a>
            </div>
          </div>
          <div className={styles.studioImage}>
            <Image
              src={studioImage}
              alt={`${name} — ${gTag.front}`}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 61vw"
            />
          </div>
        </div>

        <dl className={styles.specifications}>
          <div>
            <dt><Users size={18} aria-hidden="true" /> {t('seatsLabel')}</dt>
            <dd>{formatNumber.format(v.passengers)} <span>{t('seatsSuffix')}</span></dd>
          </div>
          <div>
            <dt><Briefcase size={18} aria-hidden="true" /> {t('luggageLabel')}</dt>
            <dd>{formatNumber.format(v.luggage)} <span>{t('luggageSuffix')}</span></dd>
          </div>
        </dl>
      </header>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* 4. UPGRADED 5-PHOTO INTERACTIVE GALLERY WITH LIGHTBOX & SWIPE */}
        <VehicleGallery
          images={galleryPhotos}
          vehicleName={name}
          locale={locale}
        />

        <section className={styles.fareSection} aria-labelledby="vehicle-fare-heading">
          <div className={styles.fareIntro}>
            <h2 id="vehicle-fare-heading">{t('pricingTitle')}</h2>
            <p>{t('pricingSubtitle')}</p>
          </div>

          {isBespoke ? (
            <div className={styles.concierge}>
              <div>
                <h3>{t('bespokeNoticeTitle')}</h3>
                <p>{t('bespokeNoticeDesc')}</p>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.primary}>
                <MessageCircle size={18} aria-hidden="true" /> {t('whatsappBooking')}
              </a>
            </div>
          ) : (
            <ul className={styles.fareList}>
              {KEY_CORRIDORS.map((routeKey) => {
                const price = AUTHORITATIVE_TRANSFER_RATES[routeKey]?.[v.bookingVehicleId];
                if (!price) return null;
                const routeName = LOCALIZED_ROUTE_NAMES[routeKey]?.[locale]
                  || LOCALIZED_ROUTE_NAMES[routeKey]?.en
                  || routeKey;

                return (
                  <li key={routeKey}>
                    <Link href={`/${locale}/booking?vehicle=${v.bookingVehicleId}&route=${routeKey}`}>
                      <span>{routeName}</span>
                      <strong><bdi>{formatFare.format(price)}</bdi></strong>
                      <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* 6. VERIFIED FEATURES & EXECUTIVE AMENITIES */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 md:p-10 border border-border shadow-lg mb-8">
          <h2 className="font-display font-extrabold text-2xl text-ink mb-6 tracking-tight">
            {t('featuresTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {v.features.map((feat, idx) => {
              const featTitle = feat.title[locale] || feat.title.en;
              const featDesc = feat.desc[locale] || feat.desc.en;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-bg-alt border border-border flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-ink mb-0.5">
                      {featTitle}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed font-normal">
                      {featDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Extra inclusions: Zamzam & Child Seat */}
          {(settings.zamzam_water || settings.complimentary_child_seat) && (
            <div className={styles.accessories}>
              {settings.zamzam_water && (
                <div>
                  <Luggage size={20} aria-hidden="true" />
                  <p><strong>{t('zamzamLabel')}</strong> {t('zamzamDesc')}</p>
                </div>
              )}
              {settings.complimentary_child_seat && (
                <div>
                  <Baby size={20} aria-hidden="true" />
                  <p><strong>{t('childSeatLabel')}</strong> {t('childSeatDesc')}</p>
                </div>
              )}
            </div>
          )}
        </div>

                {/* AUTOMOTIVE DIGITAL SHOWROOM EXPERIENCE */}
        <div className="mb-10">
          <AutomotiveShowroomExperience
            locale={locale}
            vehicleSlug={resolvedSlug}
          />
        </div>

        {/* 7. VEHICLE FAQS (LOCALIZED IN ALL 10 LANGUAGES) */}
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-border shadow-md mb-10 space-y-5">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink tracking-tight">
            {name} — {dict.faq.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-bg-alt border border-border space-y-1.5">
              <h3 className="font-bold text-sm text-ink">
                {t('seatsLabel')} &amp; {t('luggageLabel')}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {name}: {formatNumber.format(v.passengers)} {t('seatsSuffix')}, {formatNumber.format(v.luggage)} {t('luggageSuffix')}.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-bg-alt border border-border space-y-1.5">
              <h3 className="font-bold text-sm text-ink">
                {t('pricingTitle')}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {t('pricingSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* 8. SACRED JOURNEY ASSURANCE CARD */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface text-ink border border-gold/30 shadow-md mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-gold-soft border border-[#C5A15D]/40 text-[#C5A15D] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-start">
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#C5A15D] mb-1.5">
              {dict.nav.pricing}
            </h3>
            <p className="text-ink-muted text-xs sm:text-sm leading-relaxed font-light">
              {dict.nav.payOnArrival}
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
              className="inline-flex items-center gap-2.5 h-14 px-9 rounded-2xl bg-[#D6A13A] hover:bg-[#E5B14B] text-[#090D15] font-black text-sm uppercase tracking-wider transition-all shadow-[0_4px_24px_rgba(214,161,58,0.3)] active:scale-95"
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
