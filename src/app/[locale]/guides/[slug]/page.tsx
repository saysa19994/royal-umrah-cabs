import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Locale, LOCALES } from '@/i18n/config';
import { editorialAlternates, editorialRobots } from '@/lib/seo/localization-indexing';
import { getDictionary } from '@/i18n/get-dictionary';
import { COMPREHENSIVE_GUIDES } from '@/data/comprehensive-guides';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import { getDbPricesCached } from '@/lib/pricing-db';
import {
  BookOpen,
  Clock,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';

interface GuideSlugPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

const GUIDE_UI_I18N: Record<
  Locale,
  {
    updatedLabel: string;
    distanceLabel: string;
    kmUnit: string;
    travelTimeLabel: string;
    serviceTypeLabel: string;
    privateDirectVal: string;
    paymentLabel: string;
    onArrivalVal: string;
    quickAnswerTitle: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
    ratesBadge: string;
    ratesTitle: string;
    ratesSubtitle: string;
    bookRouteBtn: string;
    whatsappBtn: string;
    camryName: string;
    camryPax: string;
    stariaName: string;
    stariaPax: string;
    yukonName: string;
    yukonPax: string;
    hiaceName: string;
    hiacePax: string;
    faqTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    proceedBookingBtn: string;
    allGuidesBtn: string;
  }
> = {
  ar: {
    updatedLabel: 'تم التحديث:',
    distanceLabel: 'المسافة التقريبية',
    kmUnit: 'كم',
    travelTimeLabel: 'مدة الانتقال',
    serviceTypeLabel: 'نوع النقل',
    privateDirectVal: 'خاص ومباشر من الباب للباب',
    paymentLabel: 'طريقة الدفع',
    onArrivalVal: 'نقداً للسائق عند الوصول',
    quickAnswerTitle: 'الخلاصة السريعة لضيوف الرحمن',
    comparisonTitle: 'جدول المقارنة العملية والشاملة',
    comparisonSubtitle: 'مقارنة حيادية مبنية على تجربة المعتمرين مع الحقائب والعائلات',
    ratesBadge: 'الأسعار الرسمية المعتمدة',
    ratesTitle: 'أسعار السيارات لهذا المسار',
    ratesSubtitle: 'السعر ثابت للمركبة بالكامل شامل السائق والوقود ورسوم الطرق والضرائب',
    bookRouteBtn: 'احجز هذا المسار الآن',
    whatsappBtn: 'تأكيد عبر واتساب',
    camryName: 'تويوتا كامري',
    camryPax: 'حتى 4 ركاب · 3 حقائب',
    stariaName: 'هيونداي ستاريا VIP',
    stariaPax: 'حتى 7 ركاب · 6 حقائب',
    yukonName: 'جي إم سي يوكن XL',
    yukonPax: 'حتى 7 ركاب · 8 حقائب',
    hiaceName: 'تويوتا هايس العائلية',
    hiacePax: 'حتى 10 ركاب · 10 حقائب',
    faqTitle: 'الأسئلة الشائعة حول هذا المسار',
    ctaTitle: 'جاهز لتنظيم رحلتك بأمان وراحة؟',
    ctaSubtitle: 'احجز سيارتك الخاصة الآن بدون دفع مسبق، والدفع نقداً للسائق بعد الوصول للوجهة.',
    proceedBookingBtn: 'الانتقال لنموذج الحجز',
    allGuidesBtn: 'العودة لجميع الأدلة',
  },
  en: {
    updatedLabel: 'Updated:',
    distanceLabel: 'Distance',
    kmUnit: 'km',
    travelTimeLabel: 'Travel Time',
    serviceTypeLabel: 'Service Type',
    privateDirectVal: 'Private Door-to-Door',
    paymentLabel: 'Payment',
    onArrivalVal: 'Cash to Driver on Arrival',
    quickAnswerTitle: 'Quick Answer for Pilgrims',
    comparisonTitle: 'Head-to-Head Comparison Table',
    comparisonSubtitle: 'Objective breakdown based on family group dynamics and luggage handling',
    ratesBadge: 'Guaranteed Fixed Rates',
    ratesTitle: 'Vehicle Rates for This Route',
    ratesSubtitle: 'Fixed rate per entire vehicle including chauffeur, fuel, road tolls, and taxes',
    bookRouteBtn: 'Book This Route',
    whatsappBtn: 'WhatsApp Concierge',
    camryName: 'Toyota Camry Sedan',
    camryPax: 'Up to 4 pax · 3 bags',
    stariaName: 'Hyundai Staria VIP',
    stariaPax: 'Up to 7 pax · 6 bags',
    yukonName: 'GMC Yukon XL VIP',
    yukonPax: 'Up to 7 pax · 8 bags',
    hiaceName: 'Toyota HiAce Van',
    hiacePax: 'Up to 10 pax · 10 bags',
    faqTitle: 'Frequently Asked Questions',
    ctaTitle: 'Ready to Experience Seamless Umrah Travel?',
    ctaSubtitle: 'Reserve your private chauffeur with zero advance payment — pay cash directly to your driver upon arrival.',
    proceedBookingBtn: 'Proceed to Booking',
    allGuidesBtn: 'Explore All Guides',
  },
  ms: {
    updatedLabel: 'Dikemas kini:',
    distanceLabel: 'Jarak Anggaran',
    kmUnit: 'km',
    travelTimeLabel: 'Masa Perjalanan',
    serviceTypeLabel: 'Jenis Perkhidmatan',
    privateDirectVal: 'Peribadi Pintu-ke-Pintu',
    paymentLabel: 'Bayaran',
    onArrivalVal: 'Tunai Selepas Tiba',
    quickAnswerTitle: 'Ringkasan Pantas untuk Jemaah',
    comparisonTitle: 'Jadual Perbandingan Lengkap',
    comparisonSubtitle: 'Perbandingan objektif berdasarkan keselesaan keluarga dan ruang bagasi',
    ratesBadge: 'Tambang Tetap Rasmi',
    ratesTitle: 'Tambang Kenderaan untuk Laluan Ini',
    ratesSubtitle: 'Harga tetap bagi sebuah kenderaan termasuk pemandu, minyak, dan tol',
    bookRouteBtn: 'Tempah Laluan Ini',
    whatsappBtn: 'Sahkan di WhatsApp',
    camryName: 'Toyota Camry Sedan',
    camryPax: 'Hingga 4 penumpang · 3 beg',
    stariaName: 'Hyundai Staria VIP',
    stariaPax: 'Hingga 7 penumpang · 6 beg',
    yukonName: 'GMC Yukon XL VIP',
    yukonPax: 'Hingga 7 penumpang · 8 beg',
    hiaceName: 'Van Toyota HiAce',
    hiacePax: 'Hingga 10 penumpang · 10 beg',
    faqTitle: 'Soalan Lazim Mengenai Laluan Ini',
    ctaTitle: 'Bersedia untuk Perjalanan Umrah yang Selesa?',
    ctaSubtitle: 'Tempah pemandu peribadi anda tanpa deposit — bayar tunai terus kepada pemandu selepas tiba.',
    proceedBookingBtn: 'Teruskan ke Tempahan',
    allGuidesBtn: 'Lihat Semua Panduan',
  },
  id: {
    updatedLabel: 'Diperbarui:',
    distanceLabel: 'Perkiraan Jarak',
    kmUnit: 'km',
    travelTimeLabel: 'Waktu Tempuh',
    serviceTypeLabel: 'Jenis Layanan',
    privateDirectVal: 'Privat Pintu-ke-Pintu',
    paymentLabel: 'Pembayaran',
    onArrivalVal: 'Tunai Saat Tiba',
    quickAnswerTitle: 'Ringkasan Cepat untuk Jamaah',
    comparisonTitle: 'Tabel Perbandingan Lengkap',
    comparisonSubtitle: 'Perbandingan objektif berdasarkan kenyamanan keluarga dan kapasitas koper',
    ratesBadge: 'Tarif Tetap Resmi',
    ratesTitle: 'Tarif Kendaraan untuk Rute Ini',
    ratesSubtitle: 'Tarif tetap per kendaraan penuh termasuk sopir, bahan bakar, dan tol',
    bookRouteBtn: 'Pesan Rute Ini',
    whatsappBtn: 'Konfirmasi via WhatsApp',
    camryName: 'Toyota Camry Sedan',
    camryPax: 'Hingga 4 penumpang · 3 koper',
    stariaName: 'Hyundai Staria VIP',
    stariaPax: 'Hingga 7 penumpang · 6 koper',
    yukonName: 'GMC Yukon XL VIP',
    yukonPax: 'Hingga 7 penumpang · 8 koper',
    hiaceName: 'Van Toyota HiAce',
    hiacePax: 'Hingga 10 penumpang · 10 koper',
    faqTitle: 'Pertanyaan Umum Tentang Rute Ini',
    ctaTitle: 'Siap Merencanakan Perjalanan Umrah yang Nyaman?',
    ctaSubtitle: 'Pesan mobil dan sopir pribadi Anda tanpa uang muka — bayar tunai kepada sopir setelah tiba di tujuan.',
    proceedBookingBtn: 'Lanjut ke Pemesanan',
    allGuidesBtn: 'Lihat Semua Panduan',
  },
  ur: {
    updatedLabel: 'تازہ ترین:',
    distanceLabel: 'فاصلہ',
    kmUnit: 'کلومیٹر',
    travelTimeLabel: 'سفر کا وقت',
    serviceTypeLabel: 'سروس کی قسم',
    privateDirectVal: 'پرائیویٹ ڈور ٹو ڈور',
    paymentLabel: 'ادائیگی',
    onArrivalVal: 'منزل پر نقد ادائیگی',
    quickAnswerTitle: 'زائرین کے لیے مختصر خلاصہ',
    comparisonTitle: 'تفصیلی موازنہ ٹیبل',
    comparisonSubtitle: 'فیملی کے آرام اور سامان کی گنجائش کے لحاظ سے جامع موازنہ',
    ratesBadge: 'مصدقہ مقررہ کرائے',
    ratesTitle: 'اس روٹ کے لیے گاڑیوں کے کرائے',
    ratesSubtitle: 'پوری گاڑی کا مقررہ کرایہ بشمول ڈرائیور، ایندھن اور ٹول ٹیکس',
    bookRouteBtn: 'یہ روٹ بک کریں',
    whatsappBtn: 'واٹس ایپ پر رابطہ',
    camryName: 'ٹویوٹا کیمری سیڈان',
    camryPax: '4 مسافر · 3 بیگز',
    stariaName: 'ہنڈائی اسٹاریا VIP',
    stariaPax: '7 مسافر · 6 بیگز',
    yukonName: 'جی ایم سی یوکون XL',
    yukonPax: '7 مسافر · 8 بیگز',
    hiaceName: 'ٹویوٹا ہائی ایس وین',
    hiacePax: '10 مسافر · 10 بیگز',
    faqTitle: 'اس روٹ سے متعلق عام سوالات',
    ctaTitle: 'کیا آپ پُرسکون سفر کے لیے تیار ہیں؟',
    ctaSubtitle: 'بغیر کسی پیشگی ادائیگی کے اپنی پرائیویٹ گاڑی بک کریں اور منزل پر پہنچ کر ڈرائیور کو نقد ادائیگی کریں۔',
    proceedBookingBtn: 'بکنگ فارم پر جائیں',
    allGuidesBtn: 'تمام گائیڈز دیکھیں',
  },
  fr: {
    updatedLabel: 'Mis à jour :',
    distanceLabel: 'Distance',
    kmUnit: 'km',
    travelTimeLabel: 'Durée du Trajet',
    serviceTypeLabel: 'Type de Service',
    privateDirectVal: 'Privé Porte-à-Porte',
    paymentLabel: 'Paiement',
    onArrivalVal: 'Espèces à l’Arrivée',
    quickAnswerTitle: 'Réponse Rapide pour les Pèlerins',
    comparisonTitle: 'Tableau Comparatif Complet',
    comparisonSubtitle: 'Analyse objective selon le confort familial et la gestion des bagages',
    ratesBadge: 'Tarifs Fixes Garantis',
    ratesTitle: 'Tarifs des Véhicules pour ce Trajet',
    ratesSubtitle: 'Tarif fixe par véhicule complet incluant chauffeur, carburant et péages',
    bookRouteBtn: 'Réserver ce Trajet',
    whatsappBtn: 'WhatsApp Direct',
    camryName: 'Berline Toyota Camry',
    camryPax: 'Jusqu’à 4 passagers · 3 valises',
    stariaName: 'Hyundai Staria VIP',
    stariaPax: 'Jusqu’à 7 passagers · 6 valises',
    yukonName: 'GMC Yukon XL VIP',
    yukonPax: 'Jusqu’à 7 passagers · 8 valises',
    hiaceName: 'Minibus Toyota HiAce',
    hiacePax: 'Jusqu’à 10 passagers · 10 valises',
    faqTitle: 'Questions Fréquentes sur ce Trajet',
    ctaTitle: 'Prêt à Organiser Votre Trajet en Toute Sérénité ?',
    ctaSubtitle: 'Réservez votre chauffeur privé sans acompte — paiement en espèces au chauffeur à l’arrivée.',
    proceedBookingBtn: 'Passer à la Réservation',
    allGuidesBtn: 'Voir Tous les Guides',
  },
  es: {
    updatedLabel: 'Actualizado:',
    distanceLabel: 'Distancia',
    kmUnit: 'km',
    travelTimeLabel: 'Tiempo de Viaje',
    serviceTypeLabel: 'Tipo de Servicio',
    privateDirectVal: 'Privado Puerta a Puerta',
    paymentLabel: 'Pago',
    onArrivalVal: 'Efectivo al Llegar',
    quickAnswerTitle: 'Respuesta Rápida para Peregrinos',
    comparisonTitle: 'Tabla Comparativa Completa',
    comparisonSubtitle: 'Análisis objetivo basado en comodidad familiar y capacidad de equipaje',
    ratesBadge: 'Tarifas Fijas Garantizadas',
    ratesTitle: 'Tarifas de Vehículos para Esta Ruta',
    ratesSubtitle: 'Tarifa fija por vehículo completo incluyendo chofer, combustible y peajes',
    bookRouteBtn: 'Reservar Esta Ruta',
    whatsappBtn: 'WhatsApp Directo',
    camryName: 'Sedán Toyota Camry',
    camryPax: 'Hasta 4 pasajeros · 3 maletas',
    stariaName: 'Hyundai Staria VIP',
    stariaPax: 'Hasta 7 pasajeros · 6 maletas',
    yukonName: 'GMC Yukon XL VIP',
    yukonPax: 'Hasta 7 pasajeros · 8 maletas',
    hiaceName: 'Minibús Toyota HiAce',
    hiacePax: 'Hasta 10 pasajeros · 10 maletas',
    faqTitle: 'Preguntas Frecuentes sobre Esta Ruta',
    ctaTitle: '¿Listo para Organizar su Viaje con Total Comodidad?',
    ctaSubtitle: 'Reserve su chofer privado sin pago anticipado — pague en efectivo al chofer al llegar a su destino.',
    proceedBookingBtn: 'Ir al Formulario de Reserva',
    allGuidesBtn: 'Ver Todas las Guías',
  },
  de: {
    updatedLabel: 'Aktualisiert:',
    distanceLabel: 'Entfernung',
    kmUnit: 'km',
    travelTimeLabel: 'Fahrzeit',
    serviceTypeLabel: 'Service-Art',
    privateDirectVal: 'Privat Tür-zu-Tür',
    paymentLabel: 'Zahlung',
    onArrivalVal: 'Barzahlung bei Ankunft',
    quickAnswerTitle: 'Kurzantwort für Pilger',
    comparisonTitle: 'Direkter Vergleich im Überblick',
    comparisonSubtitle: 'Objektiver Vergleich nach Familienkomfort und Gepäckkapazität',
    ratesBadge: 'Garantierte Festpreise',
    ratesTitle: 'Fahrzeugpreise für diese Strecke',
    ratesSubtitle: 'Festpreis pro Gesamtfahrzeug inklusive Chauffeur, Kraftstoff und Maut',
    bookRouteBtn: 'Diese Strecke Buchen',
    whatsappBtn: 'WhatsApp Kontakt',
    camryName: 'Toyota Camry Limousine',
    camryPax: 'Bis 4 Personen · 3 Koffer',
    stariaName: 'Hyundai Staria VIP',
    stariaPax: 'Bis 7 Personen · 6 Koffer',
    yukonName: 'GMC Yukon XL VIP',
    yukonPax: 'Bis 7 Personen · 8 Koffer',
    hiaceName: 'Toyota HiAce Kleinbus',
    hiacePax: 'Bis 10 Personen · 10 Koffer',
    faqTitle: 'Häufig gestellte Fragen zu dieser Strecke',
    ctaTitle: 'Bereit für eine entspannte Umrah-Reise?',
    ctaSubtitle: 'Reservieren Sie Ihren privaten Chauffeur ohne Vorauszahlung — Barzahlung direkt beim Fahrer nach Ankunft.',
    proceedBookingBtn: 'Weiter zur Buchung',
    allGuidesBtn: 'Alle Reiseführer ansehen',
  },
  tr: {
    updatedLabel: 'Güncelleme:',
    distanceLabel: 'Mesafe',
    kmUnit: 'km',
    travelTimeLabel: 'Yolculuk Süresi',
    serviceTypeLabel: 'Hizmet Türü',
    privateDirectVal: 'Kapıdan Kapıya Özel',
    paymentLabel: 'Ödeme',
    onArrivalVal: 'Varışta Şoföre Nakit',
    quickAnswerTitle: 'Umreciler İçin Hızlı Özet',
    comparisonTitle: 'Kapsamlı Karşılaştırma Tablosu',
    comparisonSubtitle: 'Aile konforu ve bagaj kapasitesine göre objektif karşılaştırma',
    ratesBadge: 'Garantili Sabit Fiyatlar',
    ratesTitle: 'Bu Güzergah İçin Araç Fiyatları',
    ratesSubtitle: 'Şoför, yakıt ve otoyol geçişleri dahil tüm araç için sabit fiyat',
    bookRouteBtn: 'Bu Güzergahı Ayırtın',
    whatsappBtn: 'WhatsApp İletişim',
    camryName: 'Toyota Camry Sedan',
    camryPax: '4 Yolcu · 3 Bavul',
    stariaName: 'Hyundai Staria VIP',
    stariaPax: '7 Yolcu · 6 Bavul',
    yukonName: 'GMC Yukon XL VIP',
    yukonPax: '7 Yolcu · 8 Bavul',
    hiaceName: 'Toyota HiAce Minibüs',
    hiacePax: '10 Yolcu · 10 Bavul',
    faqTitle: 'Bu Güzergah Hakkında Sıkça Sorulan Sorular',
    ctaTitle: 'Güvenli ve Konforlu Yolculuğa Hazır mısınız?',
    ctaSubtitle: 'Ön ödemesiz özel şoförlü aracınızı ayırtın — ödemeyi varışta şoföre nakit yapın.',
    proceedBookingBtn: 'Rezervasyona Geçin',
    allGuidesBtn: 'Tüm Rehberleri İnceleyin',
  },
  hi: {
    updatedLabel: 'अपडेट किया गया:',
    distanceLabel: 'अनुमानित दूरी',
    kmUnit: 'किमी',
    travelTimeLabel: 'यात्रा का समय',
    serviceTypeLabel: 'सेवा का प्रकार',
    privateDirectVal: 'निजी डोर-टू-डोर सेवा',
    paymentLabel: 'भुगतान',
    onArrivalVal: 'पहुंचने पर नकद भुगतान',
    quickAnswerTitle: 'यात्रियों के लिए त्वरित सारांश',
    comparisonTitle: 'विस्तृत तुलना तालिका',
    comparisonSubtitle: 'पारिवारिक आराम और सामान क्षमता के आधार पर निष्पक्ष तुलना',
    ratesBadge: 'गारंटीशुदा निश्चित किराए',
    ratesTitle: 'इस मार्ग के लिए वाहन किराए',
    ratesSubtitle: 'ड्राइवर, ईंधन और टोल सहित पूरे वाहन का निश्चित किराया',
    bookRouteBtn: 'यह मार्ग अभी बुक करें',
    whatsappBtn: 'व्हाट्सएप संपर्क',
    camryName: 'टोयोटा कैमरी सेडान',
    camryPax: '4 यात्री · 3 बैग',
    stariaName: 'हुंडई स्टारिया VIP',
    stariaPax: '7 यात्री · 6 बैग',
    yukonName: 'जीएमसी यूकॉन XL VIP',
    yukonPax: '7 यात्री · 8 बैग',
    hiaceName: 'टोयोटा हाईएस वैन',
    hiacePax: '10 यात्री · 10 बैग',
    faqTitle: 'इस मार्ग से जुड़े सामान्य प्रश्न',
    ctaTitle: 'क्या आप आरामदायक उमराह यात्रा के लिए तैयार हैं?',
    ctaSubtitle: 'बिना किसी अग्रिम भुगतान के अपनी निजी गाड़ी बुक करें — गंतव्य पर पहुंचने के बाद ड्राइवर को नकद भुगतान करें।',
    proceedBookingBtn: 'बुकिंग फॉर्म पर जाएं',
    allGuidesBtn: 'सभी गाइड देखें',
  },
};

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const guide of COMPREHENSIVE_GUIDES) {
      params.push({ locale, slug: guide.slug });
    }
  }
  return params;
}

export async function generateMetadata(props: GuideSlugPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const guide = COMPREHENSIVE_GUIDES.find((g) => g.slug === slug);
  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  const title = guide.title[locale] || guide.title.en;
  const description = guide.subtitle[locale] || guide.summary[locale] || guide.subtitle.en;

  return {
    title: `${title} | Duyuf Alrahman VIP`,
    description,
    alternates: editorialAlternates(locale, `/guides/${slug}`),
    robots: editorialRobots(locale),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: '2026-10-20T00:00:00.000Z',
    },
  };
}

export default async function GuideDetailPage(props: GuideSlugPageProps) {
  const params = await props.params;
  const { locale, slug } = params;

  const guide = COMPREHENSIVE_GUIDES.find((g) => g.slug === slug);
  if (!guide) {
    if (slug === 'vip-umrah-transport-jeddah-to-makkah') {
      redirect(`/${locale}/blog/${slug}`);
    }
    notFound();
  }

  const dict = getDictionary(locale);
  const ui = GUIDE_UI_I18N[locale] || GUIDE_UI_I18N.en;
  const isRtl = locale === 'ar' || locale === 'ur';
  const dbRates = await getDbPricesCached();
  const routePrices =
    dbRates[guide.routeId] ||
    dbRates['jeddah-airport-to-makkah'] ||
    AUTHORITATIVE_TRANSFER_RATES[guide.routeId] ||
    AUTHORITATIVE_TRANSFER_RATES['jeddah-airport-to-makkah'];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.home || 'Home',
        item: `https://duyufalrahmanvip.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: dict.nav.guides || 'Guides',
        item: `https://duyufalrahmanvip.com/${locale}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title[locale] || guide.title.en,
        item: `https://duyufalrahmanvip.com/${locale}/guides/${slug}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q[locale] || faq.q.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a[locale] || faq.a.en,
      },
    })),
  };

  const waText = encodeURIComponent(
    locale === 'ar'
      ? `السلام عليكم، قرأت دليل (${guide.title.ar}) وأرغب في الاستفسار والحجز.`
      : `Hello, I read the guide "${guide.title.en}" and would like to inquire about private transport.`
  );
  const waUrl = `https://wa.me/966567588261?text=${waText}`;

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start transition-colors duration-200" dir={isRtl ? 'rtl' : 'ltr'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted mb-8">
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/guides`} className="hover:text-gold-dark transition-colors">
            {dict.nav.guides || 'Guides'}
          </Link>
          <span>/</span>
          <span className="text-ink font-medium truncate max-w-xs md:max-w-md">
            {guide.categoryLabel[locale] || guide.categoryLabel.en}
          </span>
        </nav>

        {/* 1. CLEAR TITLE & SUBTITLE */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              {guide.categoryLabel[locale] || guide.categoryLabel.en}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="w-3.5 h-3.5" />
              {guide.readTime}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Calendar className="w-3.5 h-3.5" />
              {ui.updatedLabel} {guide.updatedDate}
            </span>
          </div>

          <h1 className="font-display font-semibold text-2xl sm:text-3xl md:text-5xl text-ink tracking-tight leading-tight">
            {guide.title[locale] || guide.title.en}
          </h1>

          <p className="mt-4 text-base md:text-lg text-ink-muted font-light leading-relaxed">
            {guide.subtitle[locale] || guide.subtitle.en}
          </p>

          {/* 3. PRACTICAL METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 p-4 bg-surface rounded-2xl border border-border">
            {guide.distanceKm ? (
              <div className="text-start">
                <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-semibold">
                  {ui.distanceLabel}
                </span>
                <span className="text-base font-bold text-ink">
                  {guide.distanceKm} {ui.kmUnit}
                </span>
              </div>
            ) : null}
            <div className="text-start">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-semibold">
                {ui.travelTimeLabel}
              </span>
              <span className="text-base font-bold text-ink">
                {guide.travelTime[locale] || guide.travelTime.en}
              </span>
            </div>
            <div className="text-start">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-semibold">
                {ui.serviceTypeLabel}
              </span>
              <span className="text-base font-bold text-gold-dark">
                {ui.privateDirectVal}
              </span>
            </div>
            <div className="text-start">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-semibold">
                {ui.paymentLabel}
              </span>
              <span className="text-base font-bold text-ink">
                {ui.onArrivalVal}
              </span>
            </div>
          </div>
        </header>

        {/* 2. QUICK ANSWER CALLOUT BOX */}
        <section className="bg-surface text-ink rounded-2xl p-6 md:p-8 mb-12 shadow-xs relative overflow-hidden border-2 border-gold-line">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gold-soft flex items-center justify-center shrink-0 text-gold-dark border border-gold-line">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-gold-dark font-display font-bold text-lg mb-2">
                {ui.quickAnswerTitle}
              </h2>
              <p className="text-sm md:text-base text-ink-light font-light leading-relaxed">
                {guide.summary[locale] || guide.summary.en}
              </p>
            </div>
          </div>
        </section>

        {/* 4. COMPARISON TABLE (IF AVAILABLE) */}
        {guide.comparisonTable && (
          <section className="mb-14">
            <div className="mb-4">
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {ui.comparisonTitle}
              </h2>
              <p className="text-xs md:text-sm text-ink-muted mt-1 font-light">
                {ui.comparisonSubtitle}
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border shadow-xs bg-surface">
              <table className="w-full text-xs md:text-sm text-start">
                <thead className="bg-bg-alt text-ink font-display text-xs uppercase tracking-wider border-b border-border">
                  <tr>
                    {guide.comparisonTable.headers.map((hdr, i) => (
                      <th
                        key={i}
                        className={`p-3.5 md:p-4 text-start font-semibold ${
                          i === 1 ? 'text-gold-dark' : ''
                        }`}
                      >
                        {hdr[locale] || hdr.en}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {guide.comparisonTable.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-surface' : 'bg-bg/40'}
                    >
                      <td className="p-3.5 md:p-4 font-bold text-ink whitespace-nowrap">
                        {row.feature[locale] || row.feature.en}
                      </td>
                      <td className="p-3.5 md:p-4 font-semibold text-gold-dark bg-gold-soft/30">
                        {row.privateTaxi[locale] || row.privateTaxi.en}
                      </td>
                      <td className="p-3.5 md:p-4 text-ink-muted">
                        {row.haramainTrain[locale] || row.haramainTrain.en}
                      </td>
                      <td className="p-3.5 md:p-4 text-ink-muted">
                        {row.saptcoBus[locale] || row.saptcoBus.en}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 5. AUTHORITATIVE LIVE PRICING CARD & CTA */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border-2 border-gold-line shadow-xs mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark block mb-1">
                {ui.ratesBadge}
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {ui.ratesTitle}
              </h2>
              <p className="text-xs text-ink-muted mt-1 font-light">
                {ui.ratesSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}/booking?route=${guide.routeId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-dark hover:opacity-95 text-white font-bold text-sm shadow-xs transition-all"
              >
                <span>{ui.bookRouteBtn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{ui.whatsappBtn}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink block">
                {ui.camryName}
              </span>
              <span className="text-[11px] text-ink-muted block mb-1">
                {ui.camryPax}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.camry} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gold-soft/40 border-2 border-gold-line text-center relative">
              <span className="absolute -top-2.5 right-2 rtl:right-auto rtl:left-2 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold-dark text-white">
                VIP
              </span>
              <span className="text-xs font-semibold text-ink block">
                {ui.stariaName}
              </span>
              <span className="text-[11px] text-ink-muted block mb-1">
                {ui.stariaPax}
              </span>
              <span className="text-xl font-bold text-gold-dark">
                {routePrices.staria} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink block">
                {ui.yukonName}
              </span>
              <span className="text-[11px] text-ink-muted block mb-1">
                {ui.yukonPax}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.yukon} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink block">
                {ui.hiaceName}
              </span>
              <span className="text-[11px] text-ink-muted block mb-1">
                {ui.hiacePax}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.hiace} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>
          </div>
        </section>

        {/* DETAILED CONTENT SECTIONS */}
        <article className="space-y-8 mb-14">
          {guide.sections.map((sec, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs"
            >
              <h2 className="font-display font-bold text-lg md:text-xl text-ink mb-3">
                {sec.heading[locale] || sec.heading.en}
              </h2>
              <div className="text-sm md:text-base text-ink-light font-light leading-relaxed whitespace-pre-line">
                {sec.body[locale] || sec.body.en}
              </div>
              {sec.highlight && (
                <div className="mt-4 p-3.5 rounded-xl bg-gold-soft border border-gold-line text-xs md:text-sm font-medium text-ink flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{sec.highlight[locale] || sec.highlight.en}</span>
                </div>
              )}
            </div>
          ))}
        </article>

        {/* 6. CONTEXTUAL FAQS */}
        {guide.faqs && guide.faqs.length > 0 && (
          <section className="mb-14">
            <div className="mb-6">
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gold-dark" />
                <span>{ui.faqTitle}</span>
              </h2>
            </div>

            <div className="space-y-4">
              {guide.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-surface rounded-2xl p-5 md:p-6 border border-border shadow-xs"
                >
                  <h3 className="font-display font-bold text-sm md:text-base text-ink mb-2">
                    {faq.q[locale] || faq.q.en}
                  </h3>
                  <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                    {faq.a[locale] || faq.a.en}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. RELATED ROUTES & ACTIONABLE NEXT STEPS */}
        <section className="p-6 md:p-8 bg-surface text-ink rounded-2xl border border-border shadow-xs text-center">
          <h2 className="font-display font-bold text-xl md:text-2xl mb-2 text-ink">
            {ui.ctaTitle}
          </h2>
          <p className="text-xs md:text-sm text-ink-muted max-w-xl mx-auto mb-6 font-light">
            {ui.ctaSubtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking?route=${guide.routeId}`}
              className="px-6 py-3 rounded-xl bg-gold-dark hover:opacity-95 text-white font-bold text-sm shadow-xs transition-all"
            >
              {ui.proceedBookingBtn}
            </Link>
            <Link
              href={`/${locale}/guides`}
              className="px-6 py-3 rounded-xl bg-bg-alt hover:bg-surface text-ink font-bold text-sm border border-border transition-colors"
            >
              {ui.allGuidesBtn}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
