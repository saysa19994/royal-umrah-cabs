'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { GoldDustCanvas } from './GoldDustCanvas';
import { WhatsAppModal } from '@/components/common/WhatsAppModal';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  Headphones,
  ArrowRight,
  MessageCircle,
  Plane,
  Train,
  Car,
  Compass,
  ChevronDown,
} from 'lucide-react';

interface HeroSectionProps {
  locale: Locale;
}

interface HeroLocalizedContent {
  badge: string;
  h1: string;
  description: string;
  btnPrimary: string;
  btnSecondary: string;
  chipAirport: string;
  chipTrain: string;
  chipVehicle: string;
  chipZiyarat: string;
  trustPay: string;
  trustWait: string;
  trustDirect: string;
  trustSupport: string;
  scroll: string;
}

const HERO_CONTENT: Record<Locale, HeroLocalizedContent> = {
  en: {
    badge: 'Executive VIP Chauffeur Service for Umrah Pilgrims',
    h1: 'Premium Umrah Chauffeur & Luxury Pilgrim Transport',
    description:
      'Private Umrah taxi across Makkah, Madinah and Jeddah. Professional chauffeurs, fixed rates, and comfort for the Guests of Allah.',
    btnPrimary: 'Get Prices & Book',
    btnSecondary: 'Chat on WhatsApp',
    chipAirport: 'Airport Guides',
    chipTrain: 'Train vs Taxi',
    chipVehicle: 'Vehicle Guide',
    chipZiyarat: 'Ziyarat Guides',
    trustPay: 'Pay on arrival (cash to chauffeur)',
    trustWait: '60-minute free airport wait',
    trustDirect: 'Direct chauffeur to hotel',
    trustSupport: '24/7 chauffeur support',
    scroll: 'SCROLL',
  },
  ar: {
    badge: 'خدمة سائق VIP خاص لضيوف الرحمن والمعتمرين',
    h1: 'خدمة سائق خاص وسيارات فاخرة لنقل ضيوف الرحمن',
    description:
      'توصيل خاص بسيارات حديثة عبر مكة المكرمة والمدينة المنورة وجدة. سائقون محترفون، أسعار ثابتة ومحددة، وراحة تليق بضيوف الرحمن.',
    btnPrimary: 'عرض الأسعار والحجز',
    btnSecondary: 'محادثة عبر واتساب',
    chipAirport: 'أدلة المطارات',
    chipTrain: 'القطار أم التاكسي',
    chipVehicle: 'دليل اختيار السيارة',
    chipZiyarat: 'أدلة المزارات',
    trustPay: 'الدفع عند الوصول (نقداً للسائق)',
    trustWait: '60 دقيقة انتظار مجاني بالمطار',
    trustDirect: 'توصيل مباشر للفندق والحرم',
    trustSupport: 'متابعة ودعم 24/7 على مدار الساعة',
    scroll: 'تمرير للأسفل',
  },
  fr: {
    badge: 'Service de Chauffeur VIP Privé pour les Pèlerins de la Omra',
    h1: 'Chauffeur Privé Premium & Transport de Luxe pour la Omra',
    description:
      "Transport privé pour la Omra à La Mecque, Médine et Djeddah. Chauffeurs professionnels, tarifs fixes garantis et confort dédié aux Hôtes d'Allah.",
    btnPrimary: 'Voir les Tarifs & Réserver',
    btnSecondary: 'Discuter sur WhatsApp',
    chipAirport: 'Guides Aéroports',
    chipTrain: 'Train vs Taxi',
    chipVehicle: 'Guide des Véhicules',
    chipZiyarat: 'Guides des Ziyarats',
    trustPay: "Paiement à l'arrivée (en espèces au chauffeur)",
    trustWait: "60 minutes d'attente gratuite à l'aéroport",
    trustDirect: 'Chauffeur direct jusqu’à votre hôtel',
    trustSupport: 'Support chauffeur 24h/24 et 7j/7',
    scroll: 'DÉFILER',
  },
  es: {
    badge: 'Servicio de Chofer VIP Privado para Peregrinos de la Umrah',
    h1: 'Chofer Privado Premium y Transporte de Lujo para la Umrah',
    description:
      'Transporte privado para la Umrah en La Meca, Medina y Yeda. Choferes profesionales, tarifas fijas y máxima comodidad para los Huéspedes de Alá.',
    btnPrimary: 'Ver Tarifas y Reservar',
    btnSecondary: 'Contactar por WhatsApp',
    chipAirport: 'Guías de Aeropuerto',
    chipTrain: 'Tren vs Taxi',
    chipVehicle: 'Guía de Vehículos',
    chipZiyarat: 'Guías de Ziyarat',
    trustPay: 'Pago a la llegada (en efectivo al chofer)',
    trustWait: '60 minutos de espera gratuita en aeropuerto',
    trustDirect: 'Chofer directo hasta su hotel',
    trustSupport: 'Soporte y atención 24/7',
    scroll: 'DESPLAZAR',
  },
  id: {
    badge: 'Layanan Sopir VIP Privat untuk Jamaah Umrah',
    h1: 'Sopir Privat Premium & Transportasi Mewah Jamaah Umrah',
    description:
      'Taksi privat Umrah melayani Makkah, Madinah, dan Jeddah. Sopir profesional, tarif pasti transparan, dan kenyamanan utama bagi Tamu Allah.',
    btnPrimary: 'Lihat Tarif & Pesan',
    btnSecondary: 'Hubungi via WhatsApp',
    chipAirport: 'Panduan Bandara',
    chipTrain: 'Kereta vs Taksi',
    chipVehicle: 'Panduan Armada',
    chipZiyarat: 'Panduan Ziarah',
    trustPay: 'Bayar saat tiba (tunai ke sopir)',
    trustWait: 'Tunggu gratis 60 menit di bandara',
    trustDirect: 'Antar langsung ke hotel & Masjidil Haram',
    trustSupport: 'Dukungan sopir siaga 24/7',
    scroll: 'GULIR',
  },
  hi: {
    badge: 'उमरा यात्रियों के लिए विशेष वीआईपी निजी चौफर सेवा',
    h1: 'प्रीमियम उमरा चौफर और तीर्थयात्रियों के लिए लक्जरी परिवहन',
    description:
      'मक्का, मदीना और जेद्दा में निजी उमरा टैक्सी। पेशेवर ड्राइवर, निश्चित दरें और अल्लाह के मेहमानों के लिए सर्वोच्च आराम।',
    btnPrimary: 'किराया देखें और बुक करें',
    btnSecondary: 'व्हाट्सएप पर बात करें',
    chipAirport: 'हवाई अड्डा गाइड',
    chipTrain: 'ट्रेन बनाम टैक्सी',
    chipVehicle: 'वाहन चयन गाइड',
    chipZiyarat: 'ज़ियारत गाइड',
    trustPay: 'पहुंचने पर भुगतान (ड्राइवर को नकद)',
    trustWait: 'हवाई अड्डे पर 60 मिनट की निःशुल्क प्रतीक्षा',
    trustDirect: 'होटल तक सीधी चौफर सेवा',
    trustSupport: '24/7 चौफर ग्राहक सहायता',
    scroll: 'नीचे स्क्रॉल करें',
  },
  de: {
    badge: 'Exklusiver VIP-Chauffeurservice für Umrah-Pilger',
    h1: 'Premium Umrah-Chauffeur & Luxus-Pilgertransport',
    description:
      'Privater Umrah-Fahrdienst zwischen Mekka, Medina und Dschidda. Professionelle Chauffeure, garantierte Festpreise und maximaler Komfort für die Gäste Allahs.',
    btnPrimary: 'Preise Ansehen & Buchen',
    btnSecondary: 'Auf WhatsApp chatten',
    chipAirport: 'Flughafen-Leitfaden',
    chipTrain: 'Zug vs. Taxi',
    chipVehicle: 'Fahrzeug-Ratgeber',
    chipZiyarat: 'Ziyarat-Führer',
    trustPay: 'Zahlung bei Ankunft (bar beim Chauffeur)',
    trustWait: '60 Minuten kostenlose Wartezeit am Flughafen',
    trustDirect: 'Direktfahrt zum Hotel',
    trustSupport: '24/7 Chauffeur-Betreuung',
    scroll: 'SCROLLEN',
  },
  ur: {
    badge: 'عمرہ زائرین کے لیے خصوصی وی آئی پی پرائیویٹ ڈرائیور سروس',
    h1: 'پریمیم عمرہ پرائیویٹ ڈرائیور اور زائرین کے لیے لگژری ٹرانسپورٹ',
    description:
      'مکہ مکرمہ، مدینہ منورہ اور جدہ کے درمیان پرائیویٹ عمرہ ٹیکسی۔ پیشہ ور ڈرائیور، طے شدہ کرائے اور ضیوف الرحمن کے لیے پُرسکون سفر۔',
    btnPrimary: 'کرائے دیکھیں اور بک کریں',
    btnSecondary: 'واٹس ایپ پر رابطہ کریں',
    chipAirport: 'ایئرپورٹ گائیڈز',
    chipTrain: 'ٹرین یا ٹیکسی',
    chipVehicle: 'گاڑیوں کی رہنمائی',
    chipZiyarat: 'زیارات گائیڈز',
    trustPay: 'آمد پر ادائیگی (ڈرائیور کو نقد)',
    trustWait: 'ایئرپورٹ پر 60 منٹ مفت انتظار',
    trustDirect: 'ہوٹل اور حرم تک براہ راست ڈرائیور',
    trustSupport: '24/7 مستقل معاونت اور رہنمائی',
    scroll: 'نیچے جائیں',
  },
  ms: {
    badge: 'Perkhidmatan Pemandu VIP Khas untuk Jemaah Umrah',
    h1: 'Pemandu Umrah Premium & Pengangkutan Mewah Jemaah',
    description:
      'Teksi Umrah peribadi meliputi Makkah, Madinah dan Jeddah. Pemandu profesional, kadar tetap terjamin, dan keselesaan khas untuk Tetamu Allah.',
    btnPrimary: 'Lihat Harga & Tempah',
    btnSecondary: 'Hubungi WhatsApp',
    chipAirport: 'Panduan Lapangan Terbang',
    chipTrain: 'Kereta Api vs Teksi',
    chipVehicle: 'Panduan Kenderaan',
    chipZiyarat: 'Panduan Ziarah',
    trustPay: 'Bayar semasa tiba (tunai kepada pemandu)',
    trustWait: 'Menunggu percuma 60 minit di lapangan terbang',
    trustDirect: 'Pemandu terus ke hotel anda',
    trustSupport: 'Sokongan pemandu 24/7',
    scroll: 'Tatal',
  },
  tr: {
    badge: 'Umre Ziyaretçileri İçin Özel VIP Şoför Hizmeti',
    h1: 'Seçkin Umre Şoförü ve Lüks Ziyaretçi Ulaşımı',
    description:
      "Mekke, Medine ve Cidde arasında özel Umre transferi. Profesyonel şoförler, sabit garantili fiyatlar ve Allah'ın Misafirleri için üstün konfor.",
    btnPrimary: 'Fiyatları Gör ve Rezervasyon Yap',
    btnSecondary: "WhatsApp'tan Yazın",
    chipAirport: 'Havalimanı Rehberleri',
    chipTrain: 'Tren vs Taksi',
    chipVehicle: 'Araç Rehberi',
    chipZiyarat: 'Ziyaret Rehberleri',
    trustPay: 'Varışta ödeme (şoföre nakit)',
    trustWait: 'Havalimanında 60 dakika ücretsiz bekleme',
    trustDirect: 'Doğrudan otele özel şoför',
    trustSupport: '7/24 kesintisiz şoför desteği',
    scroll: 'AŞAĞI KAYDIR',
  },
};

export function HeroSection({ locale }: HeroSectionProps) {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const content = HERO_CONTENT[locale] || HERO_CONTENT.en;
  const isArabic = locale === 'ar';
  const isUrdu = locale === 'ur';

  const chips = [
    {
      href: `/${locale}/guides/jeddah-airport-arrival-pickup-guide`,
      label: content.chipAirport,
      icon: Plane,
    },
    {
      href: `/${locale}/guides/jeddah-airport-to-makkah-taxi-vs-train`,
      label: content.chipTrain,
      icon: Train,
    },
    {
      href: `/${locale}/guides/how-to-choose-the-right-vehicle-for-umrah-group`,
      label: content.chipVehicle,
      icon: Car,
    },
    {
      href: `/${locale}/guides/makkah-ziyarat-places-routes-transport`,
      label: content.chipZiyarat,
      icon: Compass,
    },
  ];

  return (
    <section className="relative h-[100svh] min-h-[660px] max-h-[1200px] flex flex-col justify-between items-center overflow-hidden bg-[#0a1224] text-white pt-24 sm:pt-28 pb-4 select-none">
      {/* BACKGROUND: CINEMATIC MULTI-LAYER VIDEO EFFECT */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Looping Cinematic Video with High-Res Image Poster Fallback */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/assets/images/haram_hero.webp"
            className="w-full h-full object-cover object-[center_38%]"
            aria-label="Masjid al-Haram, Holy Kaaba and Makkah Royal Clock Tower at night - Duyuf Alrahman VIP"
          >
            <source src="/assets/videos/haram_hero.mp4" type="video/mp4" />
            <Image
              src="/assets/images/haram_hero.webp"
              alt="Masjid al-Haram, Holy Kaaba and Makkah Royal Clock Tower at night - Duyuf Alrahman VIP"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_38%]"
            />
          </video>
        </div>

        {/* Layer 2: Warm golden glow near the Haram that breathes */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_74%,rgba(212,167,44,0.46),transparent_62%)] rtl:bg-[radial-gradient(ellipse_at_32%_74%,rgba(212,167,44,0.46),transparent_62%)] mix-blend-screen animate-golden-breathe pointer-events-none"
        />

        {/* Layer 3: Soft diagonal light sweep */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        >
          <div className="w-[200%] h-full bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.06)_45%,rgba(232,199,102,0.16)_50%,rgba(255,255,255,0.06)_55%,transparent_80%)] mix-blend-soft-light animate-light-sweep" />
        </div>

        {/* Layer 4: Gold dust particles floating slowly upward on canvas */}
        <GoldDustCanvas />

        {/* Layer 5: Dark navy gradient overlay and bottom fade for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1224] via-[#0a1224]/75 to-[#0a1224]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1224]/85 via-[#0a1224]/40 to-[#0a1224]/85 rtl:bg-gradient-to-l pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#0a1224] to-transparent pointer-events-none" />
      </div>

      {/* CENTERED HERO CONTENT */}
      <div className="container mx-auto px-4 max-w-5xl relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto">
        {/* SMALL PILL BADGE WITH PULSING GOLD DOT */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-gold/35 text-xs sm:text-sm font-medium text-gold mb-3 sm:mb-5 shadow-[0_2px_12px_rgba(212,175,55,0.15)] animate-fadeIn">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <span className="tracking-wide">{content.badge}</span>
        </div>

        {/* LARGE SERIF HEADLINE */}
        <h1
          className={`text-white leading-[1.12] sm:leading-[1.08] tracking-tight max-w-4xl mx-auto text-[clamp(32px,5.2vw,68px)] font-semibold ${
            isArabic
              ? 'font-arabic font-bold'
              : isUrdu
              ? 'font-urdu font-bold'
              : 'font-display'
          }`}
        >
          {content.h1}
        </h1>

        {/* SHORT PARAGRAPH */}
        <p className="mt-3.5 sm:mt-5 text-sm sm:text-base md:text-lg text-[#c9d1e3] leading-relaxed font-sans font-light max-w-2xl mx-auto">
          {content.description}
        </p>

        {/* TWO CALL-TO-ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-7">
          {/* Primary button (gold) */}
          <a
            href="#booking-calculator"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] h-12 px-7 sm:px-8 rounded-[8px] bg-gold text-[#0a1224] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#e8c766] transition-all shadow-[0_4px_22px_rgba(212,167,44,0.38)] hover:shadow-[0_4px_30px_rgba(212,167,44,0.6)] focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>{content.btnPrimary}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </a>

          {/* Secondary button (green outline) */}
          <button
            type="button"
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] h-12 px-6 sm:px-7 rounded-[8px] border border-[#25d366]/70 bg-[#25d366]/10 text-[#25d366] font-semibold text-xs sm:text-sm hover:bg-[#25d366] hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-[#25d366]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{content.btnSecondary}</span>
          </button>
        </div>

        {/* ROW OF GLASS CHIPS */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-5 sm:mt-6">
          {chips.map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] hover:border-gold/50 text-white/90 hover:text-white text-xs font-medium border border-white/15 backdrop-blur-md transition-all shadow-xs"
            >
              <chip.icon className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{chip.label}</span>
            </Link>
          ))}
        </div>

        {/* 4 ASSURANCES TRUST ROW UNDER BUTTONS (FACTUAL, NO WI-FI) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/10 text-[11px] sm:text-xs text-[#c9d1e3] w-full max-w-3xl">
          <div className="flex items-center justify-center sm:justify-start gap-1.5">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
            <span>{content.trustPay}</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5">
            <Clock className="w-4 h-4 text-gold shrink-0" />
            <span>{content.trustWait}</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
            <span>{content.trustDirect}</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5">
            <Headphones className="w-4 h-4 text-gold shrink-0" />
            <span>{content.trustSupport}</span>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR AT BOTTOM CENTER */}
      <div className="relative z-10 w-full flex justify-center pb-2">
        <a
          href="#booking-calculator"
          aria-label={content.scroll}
          className="inline-flex flex-col items-center gap-1 text-white/60 hover:text-gold transition-colors group focus-visible:ring-1 focus-visible:ring-gold rounded-md p-1"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase group-hover:text-gold">
            {content.scroll}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce-scroll text-gold" />
        </a>
      </div>

      {/* DUAL NUMBER WHATSAPP MODAL FOR SECONDARY BUTTON */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        locale={locale}
        source="hero_cta"
      />
    </section>
  );
}
