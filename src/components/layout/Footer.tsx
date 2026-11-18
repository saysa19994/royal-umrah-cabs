'use client';

import React from 'react';
import Link from 'next/link';
import { DuyufSignature } from '@/components/brand/DuyufSignature';
import { Locale, LOCALES } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Headphones,
  Car,
  HandCoins,
  ChevronDown,
} from 'lucide-react';

const LOCALIZED_PAY_NOTICE: Record<string, string> = {
  ar: 'الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل (ريال سعودي / دولار أمريكي)',
  en: 'Cash paid to the driver after the journey is completed and the customer reaches the requested destination (SAR / USD)',
  ms: 'Bayaran tunai kepada pemandu selepas perjalanan selesai dan tiba di destinasi (SAR / USD)',
  id: 'Pembayaran tunai kepada pengemudi setelah perjalanan selesai dan tiba di tujuan (SAR / USD)',
  ur: 'سفر مکمل ہونے اور منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی (SAR / USD)',
  fr: 'Espèces remises au chauffeur à destination après la fin du trajet (SAR / USD)',
  es: 'Efectivo pagado al conductor en destino tras finalizar el trayecto (SAR / USD)',
  de: 'Bargeld an den Fahrer am Zielort nach Beendigung der Fahrt (SAR / USD)',
  tr: 'Yolculuk varış noktasına ulaştıktan sonra şoföre nakit ödeme (SAR / USD)',
  hi: 'यात्रा पूरी होने और गंतव्य पर पहुंचने के बाद चालक को नकद भुगतान (SAR / USD)',
};

const FOOTER_EXTRA_I18N: Record<
  Locale,
  {
    tagline: string;
    subTagline: string;
    desc: string;
    waMain: string;
    waSecond: string;
    voiceDispatch: string;
    chauffeurBadge: string;
    guidesHeader: string;
    vipBlog: string;
    vipGuide: string;
    arrivalGuide: string;
    taxiVsTrain: string;
    vehicleGuide: string;
    ziyaratGuide: string;
    trackBooking: string;
    partners: string;
    legalHeader: string;
    safety: string;
    reviews: string;
    faqs: string;
    contact: string;
    assuranceTitle: string;
    assuranceBody: string;
    waitSuffix: string;
  }
> = {
  ar: {
    tagline: 'ضيوف الرحمن VIP',
    subTagline: 'نقل خاص لضيوف الرحمن',
    desc: 'الخدمة الخاصة لنقل ضيوف الرحمن بين مطار جدة ومكة المكرمة والمدينة المنورة. أسطول VIP وسائقون محترفون لخدمتكم بأعلى معايير الراحة والالتزام.',
    waMain: 'واتساب العمليات',
    waSecond: 'واتساب المتابعة',
    voiceDispatch: 'اتصال مباشر',
    chauffeurBadge: 'خدمة نقل خاص مخصصة لضيوف الرحمن',
    guidesHeader: 'أدلة المعتمرين والخدمات',
    vipBlog: '📖 مقالات ومدونة VIP',
    vipGuide: '✨ دليل سيارة VIP من مطار جدة لمكة',
    arrivalGuide: 'دليل الوصول بمطار جدة (KAIA)',
    taxiVsTrain: 'مقارنة: تاكسي المطار أم قطار الحرمين',
    vehicleGuide: 'دليل اختيار سيارة العمرة المناسبة',
    ziyaratGuide: 'دليل مزارات مكة المكرمة',
    trackBooking: 'تتبع رحلتك المباشرة',
    partners: 'بوابة وكالات السفر والشركاء',
    legalHeader: 'السياسات والضمانات',
    safety: 'معايير الأمان والسلامة',
    reviews: 'آراء وتقييمات المعتمرين',
    faqs: 'الأسئلة الشائعة',
    contact: 'اتصل بخدمة العملاء',
    assuranceTitle: 'ضمان ضيوف الرحمن VIP',
    assuranceBody: 'لا نطلب أية دفعة مقدمة؛ الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل (ريال سعودي أو دولار أمريكي).',
    waitSuffix: 'دقيقة انتظار مجاني بالمطار',
  },
  en: {
    tagline: 'Duyuf Alrahman VIP',
    subTagline: 'Executive Chauffeur Service',
    desc: 'Premier private chauffeur transport for Umrah pilgrims across Jeddah Airport, Makkah, and Madinah. Transparent fixed rates, zero deposit, and 24/7 assistance.',
    waMain: 'WhatsApp Main',
    waSecond: 'WhatsApp 2',
    voiceDispatch: 'Voice Dispatch',
    chauffeurBadge: 'Dedicated Private Chauffeur for Umrah Pilgrims',
    guidesHeader: 'Pilgrim Guides & Tools',
    vipBlog: '📖 VIP Umrah Blog',
    vipGuide: '✨ VIP Chauffeur: Jeddah to Makkah',
    arrivalGuide: 'Jeddah Airport Arrival Guide',
    taxiVsTrain: 'Airport Taxi vs Haramain Train',
    vehicleGuide: 'Choosing the Right Umrah Vehicle',
    ziyaratGuide: 'Makkah Ziyarat Complete Guide',
    trackBooking: 'Track Your Booking',
    partners: 'Travel Agency Portal',
    legalHeader: 'Legal & Guarantees',
    safety: 'Safety Standards',
    reviews: 'Pilgrim Reviews',
    faqs: 'FAQs',
    contact: 'Contact Support',
    assuranceTitle: 'Duyuf Alrahman VIP Assurance',
    assuranceBody: 'Zero upfront deposit required. Cash paid to the driver after the journey is completed and the customer reaches the requested destination (SAR or USD).',
    waitSuffix: 'Min Airport Wait Time',
  },
  ms: {
    tagline: 'Duyuf Alrahman VIP',
    subTagline: 'Perkhidmatan Pemandu Eksekutif',
    desc: 'Pengangkutan pemandu peribadi utama untuk jemaah Umrah merentasi Lapangan Terbang Jeddah, Makkah dan Madinah. Kadar tetap telus, tanpa deposit, dan bantuan 24/7.',
    waMain: 'WhatsApp Utama',
    waSecond: 'WhatsApp Sokongan',
    voiceDispatch: 'Panggilan Operasi',
    chauffeurBadge: 'Pemandu Peribadi Khas untuk Jemaah Umrah',
    guidesHeader: 'Panduan Jemaah & Alatan',
    vipBlog: '📖 Blog Umrah VIP',
    vipGuide: '✨ Panduan Chauffeur VIP: Jeddah ke Makkah',
    arrivalGuide: 'Panduan Ketibaan Lapangan Terbang Jeddah (KAIA)',
    taxiVsTrain: 'Perbandingan: Teksi Lapangan Terbang vs Kereta Api Haramain',
    vehicleGuide: 'Panduan Memilih Kenderaan Umrah Yang Tepat',
    ziyaratGuide: 'Panduan Lengkap Ziarah Makkah',
    trackBooking: 'Jejak Tempahan Anda',
    partners: 'Portal Agensi Pelancongan',
    legalHeader: 'Polisi & Jaminan',
    safety: 'Piawaian Keselamatan',
    reviews: 'Ulasan Jemaah',
    faqs: 'Soalan Lazim',
    contact: 'Hubungi Sokongan',
    assuranceTitle: 'Jaminan Duyuf Alrahman VIP',
    assuranceBody: 'Tiada bayaran pendahuluan diperlukan. Bayaran tunai kepada pemandu selepas perjalanan selesai dan tiba di destinasi (SAR / USD).',
    waitSuffix: 'Minit Menunggu Percuma di Lapangan Terbang',
  },
  id: {
    tagline: 'Duyuf Alrahman VIP',
    subTagline: 'Layanan Pengemudi Eksekutif',
    desc: 'Transportasi sopir privat terdepan untuk jamaah Umrah di Bandara Jeddah, Makkah, dan Madinah. Tarif pasti transparan, tanpa deposit, dan siaga 24/7.',
    waMain: 'WhatsApp Utama',
    waSecond: 'WhatsApp Layanan',
    voiceDispatch: 'Telepon Langsung',
    chauffeurBadge: 'Sopir Privat Khusus Jamaah Umrah',
    guidesHeader: 'Panduan Jamaah & Fasilitas',
    vipBlog: '📖 Blog Umrah VIP',
    vipGuide: '✨ Panduan Chauffeur VIP: Jeddah ke Makkah',
    arrivalGuide: 'Panduan Kedatangan Bandara Jeddah (KAIA)',
    taxiVsTrain: 'Perbandingan: Taksi Bandara vs Kereta Cepat Haramain',
    vehicleGuide: 'Panduan Memilih Mobil Umrah yang Tepat',
    ziyaratGuide: 'Panduan Lengkap Ziarah Makkah',
    trackBooking: 'Lacak Pemesanan Anda',
    partners: 'Portal Agen Perjalanan',
    legalHeader: 'Kebijakan & Jaminan',
    safety: 'Standar Keselamatan',
    reviews: 'Ulasan Jamaah',
    faqs: 'Pertanyaan Umum',
    contact: 'Hubungi Layanan Tamu',
    assuranceTitle: 'Jaminan Duyuf Alrahman VIP',
    assuranceBody: 'Tanpa uang muka atau deposit. Pembayaran tunai kepada pengemudi setelah perjalanan selesai dan tiba di tujuan (SAR / USD).',
    waitSuffix: 'Menit Tunggu Bandara Gratis',
  },
  ur: {
    tagline: 'ضیوف الرحمن VIP',
    subTagline: 'معتمرین کے لیے پرائیویٹ ٹرانسپورٹ',
    desc: 'جدہ ائیرپورٹ، مکہ مکرمہ اور مدینہ منورہ کے درمیان معتمرین کے لیے پریمیئر پرائیویٹ ٹرانسپورٹ سروس۔ شفاف فکسڈ کرائے، بغیر ایڈوانس، اور 24/7 رہنمائی۔',
    waMain: 'واٹس ایپ آپریشنز',
    waSecond: 'واٹس ایپ سپورٹ',
    voiceDispatch: 'براہ راست کال',
    chauffeurBadge: 'معتمرین کے لیے وقف پرائیویٹ شافر سروس',
    guidesHeader: 'معتمرین کے لیے رہنمائی اور سروسز',
    vipBlog: '📖 وی آئی پی عمرہ بلاگ',
    vipGuide: '✨ جدہ سے مکہ وی آئی پی شافر گائیڈ',
    arrivalGuide: 'جدہ ائیرپورٹ (KAIA) آمد گائیڈ',
    taxiVsTrain: 'موازنہ: ائیرپورٹ ٹیکسی بمقابلہ حرمین ٹرین',
    vehicleGuide: 'عمرہ کے لیے موزوں گاڑی کے انتخاب کی گائیڈ',
    ziyaratGuide: 'مکہ مکرمہ زیارات مکمل گائیڈ',
    trackBooking: 'اپنی بکنگ ٹریک کریں',
    partners: 'ٹریول ایجنسی پورٹل',
    legalHeader: 'پالیسیاں اور ضمانتیں',
    safety: 'حفاظتی معیارات',
    reviews: 'معتمرین کے تاثرات',
    faqs: 'اکثر پوچھے گئے سوالات',
    contact: 'کسٹمر سپورٹ سے رابطہ',
    assuranceTitle: 'ضیوف الرحمن VIP گارنٹی',
    assuranceBody: 'کوئی پیشگی ادائیگی ضروری نہیں۔ سفر مکمل ہونے اور منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی (سعودی ریال یا امریکی ڈالر)۔',
    waitSuffix: 'منٹ ائیرپورٹ پر مفت انتظار',
  },
  fr: {
    tagline: 'Duyuf Alrahman VIP',
    subTagline: 'Service de Chauffeur Exécutif',
    desc: 'Transport privé d’excellence pour pèlerins entre l’aéroport de Djeddah, La Mecque et Médine. Tarifs fixes garantis, sans acompte et assistance 24/7.',
    waMain: 'WhatsApp Principal',
    waSecond: 'WhatsApp Suivi',
    voiceDispatch: 'Ligne Directe',
    chauffeurBadge: 'Chauffeur Privé Dédié aux Pèlerins',
    guidesHeader: 'Guides Pèlerins & Outils',
    vipBlog: '📖 Blog VIP Omra',
    vipGuide: '✨ Guide Chauffeur VIP : Djeddah vers La Mecque',
    arrivalGuide: 'Guide d’arrivée à l’aéroport de Djeddah (KAIA)',
    taxiVsTrain: 'Comparatif : Taxi Aéroport vs Train Haramain',
    vehicleGuide: 'Choisir le bon véhicule pour la Omra',
    ziyaratGuide: 'Guide complet des Ziyarat de La Mecque',
    trackBooking: 'Suivre Votre Réservation',
    partners: 'Portail Agences de Voyage',
    legalHeader: 'Politiques & Garanties',
    safety: 'Normes de Sécurité',
    reviews: 'Avis des Pèlerins',
    faqs: 'Foire Aux Questions',
    contact: 'Contacter le Support',
    assuranceTitle: 'Garantie Duyuf Alrahman VIP',
    assuranceBody: 'Aucun acompte requis. Paiement en espèces au chauffeur après l’achèvement du trajet et l’arrivée à destination (SAR ou USD).',
    waitSuffix: 'Min d’attente aéroport offerte',
  },
  es: {
    tagline: 'Duyuf Alrahman VIP',
    subTagline: 'Servicio de Chófer Ejecutivo',
    desc: 'Transporte privado exclusivo para peregrinos de la Umrah entre el Aeropuerto de Yeda, La Meca y Medina. Tarifas fijas transparentes, sin depósito previo y atención 24/7.',
    waMain: 'WhatsApp Principal',
    waSecond: 'WhatsApp Soporte',
    voiceDispatch: 'Llamada Directa',
    chauffeurBadge: 'Chófer Privado Dedicado a Peregrinos',
    guidesHeader: 'Guías de Peregrinos y Herramientas',
    vipBlog: '📖 Blog VIP Umrah',
    vipGuide: '✨ Guía Chófer VIP: Yeda a La Meca',
    arrivalGuide: 'Guía de Llegada al Aeropuerto de Yeda (KAIA)',
    taxiVsTrain: 'Comparativa: Taxi de Aeropuerto vs Tren Haramain',
    vehicleGuide: 'Cómo Elegir el Vehículo Adecuado para la Umrah',
    ziyaratGuide: 'Guía Completa de Ziyarat en La Meca',
    trackBooking: 'Seguimiento de su Reserva',
    partners: 'Portal de Agencias de Viaje',
    legalHeader: 'Políticas y Garantías',
    safety: 'Estándares de Seguridad',
    reviews: 'Opiniones de Peregrinos',
    faqs: 'Preguntas Frecuentes',
    contact: 'Contactar Soporte',
    assuranceTitle: 'Garantía Duyuf Alrahman VIP',
    assuranceBody: 'Sin pagos por adelantado. Pago en efectivo al conductor una vez finalizado el viaje y llegado al destino (SAR o USD).',
    waitSuffix: 'Minutos de Espera Gratuita en Aeropuerto',
  },
  de: {
    tagline: 'Duyuf Alrahman VIP',
    subTagline: 'Exklusiver Chauffeurservice',
    desc: 'Erstklassiger privater Chauffeurservice für Umrah-Pilger zwischen Flughafen Dschidda, Mekka und Medina. Transparente Festpreise, keine Anzahlung und 24/7-Betreuung.',
    waMain: 'WhatsApp Hauptlinie',
    waSecond: 'WhatsApp Support',
    voiceDispatch: 'Telefonische Hotline',
    chauffeurBadge: 'Persönlicher Chauffeur für Pilger',
    guidesHeader: 'Pilger-Ratgeber & Hilfen',
    vipBlog: '📖 VIP-Umrah-Blog',
    vipGuide: '✨ VIP-Chauffeur Leitfaden: Dschidda nach Mekka',
    arrivalGuide: 'Leitfaden für die Ankunft am Flughafen Dschidda (KAIA)',
    taxiVsTrain: 'Vergleich: Flughafen-Taxi vs. Haramain-Zug',
    vehicleGuide: 'Wahl des passenden Umrah-Fahrzeugs',
    ziyaratGuide: 'Kompletter Ziyarat-Führer für Mekka',
    trackBooking: 'Buchung Verfolgen',
    partners: 'Reisebüro-Portal',
    legalHeader: 'Richtlinien & Garantien',
    safety: 'Sicherheitsstandards',
    reviews: 'Pilger-Bewertungen',
    faqs: 'Häufig Gestellte Fragen',
    contact: 'Kundenservice Kontaktieren',
    assuranceTitle: 'Duyuf Alrahman VIP Garantie',
    assuranceBody: 'Keine Vorauszahlung erforderlich. Barzahlung an den Fahrer nach Beendigung der Fahrt und Ankunft am Zielort (SAR oder USD).',
    waitSuffix: 'Minuten kostenlose Wartezeit am Flughafen',
  },
  tr: {
    tagline: 'Duyuf Alrahman VIP',
    subTagline: 'Özel VIP Şoför Hizmeti',
    desc: 'Cidde Havalimanı, Mekke ve Medine arasında Umre ziyaretçileri için seçkin özel transfer hizmeti. Şeffaf sabit fiyatlar, depozitosuz ve 7/24 kesintisiz destek.',
    waMain: 'WhatsApp Ana Hat',
    waSecond: 'WhatsApp Destek',
    voiceDispatch: 'Doğrudan Arama',
    chauffeurBadge: 'Umre Misafirlerine Özel Tahsisli Şoför',
    guidesHeader: 'Umre Rehberleri ve Hizmetler',
    vipBlog: '📖 VIP Umre Blogu',
    vipGuide: '✨ VIP Şoför Rehberi: Cidde - Mekke',
    arrivalGuide: 'Cidde Havalimanı (KAIA) Varış Rehberi',
    taxiVsTrain: 'Karşılaştırma: Havalimanı Taksisi vs Haramain Treni',
    vehicleGuide: 'Umre İçin Doğru Araç Seçimi Rehberi',
    ziyaratGuide: 'Mekke Ziyaret Yerleri Kapsamlı Rehberi',
    trackBooking: 'Rezervasyonunuzu Takip Edin',
    partners: 'Seyahat Acentesi Portalı',
    legalHeader: 'Politikalar ve Güvenceler',
    safety: 'Güvenlik Standartları',
    reviews: 'Ziyaretçi Yorumları',
    faqs: 'Sıkça Sorulan Sorular',
    contact: 'Müşteri Desteğiyle İletişim',
    assuranceTitle: 'Duyuf Alrahman VIP Güvencesi',
    assuranceBody: 'Ön ödeme veya depozito gerekmez. Yolculuk tamamlandıktan ve varış noktasına ulaştıktan sonra şoföre nakit ödeme (SAR veya USD).',
    waitSuffix: 'Dk Ücretsiz Havalimanı Bekleme',
  },
  hi: {
    tagline: 'Duyuf Alrahman VIP',
    subTagline: 'कार्यकारी ड्राइवर सेवा',
    desc: 'जेद्दा हवाई अड्डा, मक्का और मदीना के बीच उमरा तीर्थयात्रियों के लिए प्रमुख निजी परिवहन। पारदर्शी निश्चित दरें, बिना अग्रिम भुगतान और 24/7 सहायता।',
    waMain: 'व्हाट्सएप मुख्य',
    waSecond: 'व्हाट्सएप सहायता',
    voiceDispatch: 'सीधा फोन',
    chauffeurBadge: 'उमरा तीर्थयात्रियों के लिए समर्पित निजी ड्राइवर',
    guidesHeader: 'तीर्थयात्री गाइड और सेवाएं',
    vipBlog: '📖 वीआईपी उमरा ब्लॉग',
    vipGuide: '✨ वीआईपी ड्राइवर गाइड: जेद्दा से मक्का',
    arrivalGuide: 'जेद्दा हवाई अड्डा आगमन गाइड (KAIA)',
    taxiVsTrain: 'तुलना: एयरपोर्ट टैक्सी बनाम हरमैन ट्रेन',
    vehicleGuide: 'उमरा के लिए उपयुक्त वाहन चयन गाइड',
    ziyaratGuide: 'मक्का ज़ियारत संपूर्ण गाइड',
    trackBooking: 'अपनी बुकिंग ट्रैक करें',
    partners: 'ट्रैवल एजेंसी पोर्टल',
    legalHeader: 'नीतियां और गारंटी',
    safety: 'सुरक्षा मानक',
    reviews: 'तीर्थयात्रियों की समीक्षाएं',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    contact: 'ग्राहक सहायता से संपर्क',
    assuranceTitle: 'Duyuf Alrahman VIP आश्वासन',
    assuranceBody: 'किसी अग्रिम भुगतान की आवश्यकता नहीं। यात्रा पूरी होने और गंतव्य पर पहुंचने के बाद ड्राइवर को नकद भुगतान (SAR या USD)।',
    waitSuffix: 'मिनट हवाई अड्डा मुफ्त प्रतीक्षा',
  },
};

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}

export function Footer({ locale, dict, settings }: FooterProps) {
  const [expandedFooterGroup,setExpandedFooterGroup] = React.useState<number|null>(null);
  const mainWa = settings.whatsapp_number || '966567588261';
  const secondWa = settings.whatsapp_number_secondary || '966505316971';
  const waUrl = `https://wa.me/${mainWa}`;
  const secondWaUrl = `https://wa.me/${secondWa}`;
  const telUrl = `tel:${settings.phone || '+966505316971'}`;

  const t = FOOTER_EXTRA_I18N[locale] || FOOTER_EXTRA_I18N.en;

  return (
    <footer className="royal-immersion-footer bg-[var(--footer-bg)] text-[var(--footer-text)] border-t border-[var(--footer-border)] mt-auto pb-12 md:pb-6 relative overflow-hidden transition-colors duration-200">
      {/* 5-COLUMN MAIN GRID */}
      <div className="container mx-auto px-4 max-w-7xl pt-14 pb-10 md:pt-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-8 lg:gap-10 text-start">
          {/* COL 1: WORDMARK, SHORT TAGLINE, WHATSAPP & CALL BUTTONS */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1 pb-5 md:pb-0">
            <Link href={locale === 'en' ? '/' : `/${locale}`} className="inline-flex items-center">
              <span className="flex items-center gap-3">
                <DuyufSignature className="h-12 w-12 shrink-0 text-[var(--footer-text)]" />
                <span className="flex flex-col gap-0.5 text-start">
                  <strong className="font-display text-lg font-semibold leading-tight tracking-tight text-[var(--footer-text)]">
                    {locale === 'ar' || locale === 'ur' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
                  </strong>
                  <small className="text-[10px] font-semibold tracking-wide text-[var(--accent-primary)]">
                    {locale === 'ar' || locale === 'ur' ? 'Duyuf Alrahman VIP' : 'ضيوف الرحمن · PRIVATE TRANSFERS'}
                  </small>
                </span>
              </span>
            </Link>
            <p className="text-xs text-[var(--footer-text)] leading-relaxed max-w-sm">
              {t.desc}
            </p>

            {/* DIRECT ACTION BUTTONS (BOTH WHATSAPP NUMBERS + PHONE) */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] h-10 px-2 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label={t.waMain}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.waMain}</span>
                </a>
                <a
                  href={secondWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] h-10 px-2 rounded-btn bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label={t.waSecond}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>{t.waSecond}</span>
                </a>
              </div>
              <a
                href={telUrl}
                className="w-full inline-flex items-center justify-center gap-1.5 min-h-[44px] h-10 px-3 rounded-btn border border-[var(--border-stone)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs font-semibold hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>{t.voiceDispatch}: {settings.phone || '+966505316971'}</span>
              </a>
            </div>

            {/* DEDICATED PILGRIM CARE BADGE */}
            <div className="pt-2 text-[11px] text-[var(--footer-text)] flex items-center gap-2">
              <Car className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
              <span>{t.chauffeurBadge}</span>
            </div>
          </div>

          {/* COL 2: POPULAR ROUTES */}
          <div className="duyuf-footer-menu border-b border-[var(--footer-border)] md:border-0 py-1 md:py-0">
            <button type="button" className="md:hidden flex min-h-[49px] w-full items-center justify-between gap-3 py-3 text-start text-[var(--footer-heading)] font-semibold text-sm"
              aria-controls="duyuf-footer-group-0" aria-expanded={expandedFooterGroup===0}
              onClick={()=>setExpandedFooterGroup(prev=>prev===0?null:0)}>
              <span>{dict.footer.popularRoutes}</span>
              <ChevronDown size={17} aria-hidden="true" className={expandedFooterGroup===0?'rotate-180 transition-transform':'transition-transform'}/>
            </button>
            <h4 className="hidden md:block font-bold text-xs uppercase tracking-wider text-[var(--footer-heading)] mb-3.5 font-serif text-sm border-b border-[var(--footer-border)] pb-1.5">
              {dict.footer.popularRoutes}
            </h4>
            <ul id="duyuf-footer-group-0"
              className={`space-y-1 md:space-y-2 text-sm text-[var(--footer-text)] pb-3 md:pb-0 ${expandedFooterGroup===0?'block':'hidden'} md:block`}>
              <li>
                <Link href={`/${locale}/routes/jeddah-airport-to-makkah`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {LOCALIZED_ROUTE_NAMES['jeddah-airport-to-makkah']?.[locale] || 'Jeddah Airport to Makkah'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/makkah-to-madinah`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {LOCALIZED_ROUTE_NAMES['makkah-to-madinah']?.[locale] || 'Makkah to Madinah VIP'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/madinah-to-makkah`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {LOCALIZED_ROUTE_NAMES['madinah-to-makkah']?.[locale] || 'Madinah to Makkah'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/makkah-to-jeddah-airport`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {LOCALIZED_ROUTE_NAMES['makkah-to-jeddah-airport']?.[locale] || 'Makkah to Jeddah Airport'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/jeddah-to-madinah`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {LOCALIZED_ROUTE_NAMES['jeddah-to-madinah']?.[locale] || 'Jeddah Airport to Madinah'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/madinah-airport-to-hotel`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {LOCALIZED_ROUTE_NAMES['madinah-airport-to-hotel']?.[locale] || 'Madinah Airport to Hotel'}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: SERVICES & FLEET */}
          <div className="duyuf-footer-menu border-b border-[var(--footer-border)] md:border-0 py-1 md:py-0">
            <button type="button" className="md:hidden flex min-h-[49px] w-full items-center justify-between gap-3 py-3 text-start text-[var(--footer-heading)] font-semibold text-sm"
              aria-controls="duyuf-footer-group-1" aria-expanded={expandedFooterGroup===1}
              onClick={()=>setExpandedFooterGroup(prev=>prev===1?null:1)}>
              <span>{dict.footer.servicesFleet}</span>
              <ChevronDown size={17} aria-hidden="true" className={expandedFooterGroup===1?'rotate-180 transition-transform':'transition-transform'}/>
            </button>
            <h4 className="hidden md:block font-bold text-xs uppercase tracking-wider text-[var(--footer-heading)] mb-3.5 font-serif text-sm border-b border-[var(--footer-border)] pb-1.5">
              {dict.footer.servicesFleet}
            </h4>
            <ul id="duyuf-footer-group-1"
              className={`space-y-1 md:space-y-2 text-sm text-[var(--footer-text)] pb-3 md:pb-0 ${expandedFooterGroup===1?'block':'hidden'} md:block`}>
              <li>
                <Link href={`/${locale}/fleet/gmc-yukon-xl`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  GMC Yukon XL VIP
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/hyundai-staria`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  Hyundai Staria VIP
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/toyota-camry`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  Toyota Camry Executive (4 Seats)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/toyota-hiace`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  Toyota HiAce Family (10 Seats)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/toyota-coaster`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  Toyota Coaster VIP Coach (21 Seats)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  Makkah & Madinah Ziyarat Tours
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  Hourly Chauffeur Rental
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: PILGRIM GUIDES & TOOLS */}
          <div className="duyuf-footer-menu border-b border-[var(--footer-border)] md:border-0 py-1 md:py-0">
            <button type="button" className="md:hidden flex min-h-[49px] w-full items-center justify-between gap-3 py-3 text-start text-[var(--footer-heading)] font-semibold text-sm"
              aria-controls="duyuf-footer-group-2" aria-expanded={expandedFooterGroup===2}
              onClick={()=>setExpandedFooterGroup(prev=>prev===2?null:2)}>
              <span>{t.guidesHeader}</span>
              <ChevronDown size={17} aria-hidden="true" className={expandedFooterGroup===2?'rotate-180 transition-transform':'transition-transform'}/>
            </button>
            <h4 className="hidden md:block font-bold text-xs uppercase tracking-wider text-[var(--footer-heading)] mb-3.5 font-serif text-sm border-b border-[var(--footer-border)] pb-1.5">
              {t.guidesHeader}
            </h4>
            <ul id="duyuf-footer-group-2"
              className={`space-y-1 md:space-y-2 text-sm text-[var(--footer-text)] pb-3 md:pb-0 ${expandedFooterGroup===2?'block':'hidden'} md:block`}>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1 text-[var(--accent-primary)] font-bold">
                  {t.vipBlog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/vip-umrah-transport-jeddah-to-makkah`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1 text-[var(--accent-primary)] font-semibold">
                  {t.vipGuide}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides/jeddah-airport-arrival-pickup-guide`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {t.arrivalGuide}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides/jeddah-airport-to-makkah-taxi-vs-train`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {t.taxiVsTrain}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides/how-to-choose-the-right-vehicle-for-umrah-group`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {t.vehicleGuide}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides/makkah-ziyarat-places-routes-transport`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {t.ziyaratGuide}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/track-booking`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1 text-[var(--accent-primary)] font-semibold">
                  {dict.nav.trackBooking || t.trackBooking}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partners`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1 text-[var(--accent-primary)]/80">
                  {t.partners}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 5: LEGAL & TRUST */}
          <div className="duyuf-footer-menu border-b border-[var(--footer-border)] md:border-0 py-1 md:py-0">
            <button type="button" className="md:hidden flex min-h-[49px] w-full items-center justify-between gap-3 py-3 text-start text-[var(--footer-heading)] font-semibold text-sm"
              aria-controls="duyuf-footer-group-3" aria-expanded={expandedFooterGroup===3}
              onClick={()=>setExpandedFooterGroup(prev=>prev===3?null:3)}>
              <span>{t.legalHeader}</span>
              <ChevronDown size={17} aria-hidden="true" className={expandedFooterGroup===3?'rotate-180 transition-transform':'transition-transform'}/>
            </button>
            <h4 className="hidden md:block font-bold text-xs uppercase tracking-wider text-[var(--footer-heading)] mb-3.5 font-serif text-sm border-b border-[var(--footer-border)] pb-1.5">
              {t.legalHeader}
            </h4>
            <ul id="duyuf-footer-group-3"
              className={`space-y-1 md:space-y-2 text-sm text-[var(--footer-text)] pb-3 md:pb-0 ${expandedFooterGroup===3?'block':'hidden'} md:block`}>
              <li>
                <Link href={`/${locale}/cancellation`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {dict.footer.refunds || 'Cancellation & Refunds'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {dict.footer.terms || 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {dict.footer.privacy || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/safety`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {t.safety}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/reviews`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {dict.reviews?.heading || t.reviews}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {dict.faq?.heading || t.faqs}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-[var(--accent-primary)] transition-colors inline-block py-1">
                  {dict.nav.contact || t.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* PAYMENT BADGES STRIP */}
        <div className="mt-12 pt-8 border-t border-[var(--footer-border)] flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-primary)]">
              {dict.nav.payOnArrival}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-primary)]/40 text-[var(--accent-primary)] text-xs font-bold inline-flex items-center gap-1.5">
                <HandCoins className="w-3.5 h-3.5" />
                <span>{LOCALIZED_PAY_NOTICE[locale] || LOCALIZED_PAY_NOTICE.en}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs text-[var(--footer-text)]">
            <span className="font-semibold text-[var(--footer-heading)]">
              {t.assuranceTitle}
            </span>
            <span>
              {t.assuranceBody}
            </span>
          </div>
        </div>
      </div>

      {/* DUAL-THEME TRUST STRIP */}
      <div className="border-y border-[var(--footer-border)] bg-[var(--footer-strip-bg)] py-3.5 relative z-10 transition-colors duration-200">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-3 text-xs text-[var(--footer-text)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span>{dict.trust_strip.fixedPrices}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span>{`${settings.airport_waiting_minutes || 60} ${t.waitSuffix}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span>{dict.trust_strip.payOnArrival}</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span>{dict.trust_strip.support247}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL & COPYRIGHT BAR */}
      <div className="container mx-auto px-4 max-w-7xl pt-5 pb-16 md:pb-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--footer-text)] relative z-10">
        <p>
          {dict.footer.copyright || `© ${new Date().getFullYear()} Duyuf Alrahman VIP. All rights reserved.`}
        </p>

        {/* Footer Language Selector */}
        <nav aria-label="Footer Language Selector" className="flex max-w-full flex-nowrap overflow-x-auto md:flex-wrap items-center justify-start md:justify-center gap-1.5 scroll-px-3">
          {LOCALES.map((loc) => (
            <Link
              key={loc}
              href={`/${loc}`}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors border ${
                loc === locale
                  ? 'border-[var(--accent-primary)] bg-[var(--accent-soft)] text-[var(--accent-primary)]'
                  : 'border-[var(--footer-border)] bg-[var(--bg-surface)] text-[var(--footer-text)] hover:text-[var(--accent-primary)]'
              }`}
            >
              {loc.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-4 text-[var(--footer-text)]">
          <Link href={`/${locale}/privacy`} className="hover:text-[var(--accent-primary)] transition-colors py-1">
            {dict.footer.privacy}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-[var(--accent-primary)] transition-colors py-1">
            {dict.footer.terms}
          </Link>
          <Link href={`/${locale}/cancellation`} className="hover:text-[var(--accent-primary)] transition-colors py-1">
            {dict.footer.refunds}
          </Link>
          <Link href={`/${locale}/cookies`} className="hover:text-[var(--accent-primary)] transition-colors py-1">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
