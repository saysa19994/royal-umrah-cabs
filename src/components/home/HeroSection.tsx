'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { WhatsAppModal } from '@/components/common/WhatsAppModal';
import { ArrowRight, MessageCircle, ChevronDown, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  locale: Locale;
}

interface HeroLocalizedContent {
  badge: string;
  h1: string;
  description: string;
  btnPrimary: string;
  btnSecondary: string;
}

interface BookingWidgetTranslations {
  oneWay: string;
  byTheHour: string;
  pickupLocation: string;
  dropoffLocation: string;
  duration: string;
  pickupDate: string;
  pickupTime: string;
  viewOptions: string;
  hoursSuffix: string;
  locJeddahAirport: string;
  locMakkahHotel: string;
  locMadinahHotel: string;
  locMadinahAirport: string;
  locJeddahCity: string;
  locMakkahZiyarat: string;
  locMadinahZiyarat: string;
}

const HERO_CONTENT: Record<Locale, HeroLocalizedContent> = {
  en: {
    badge: 'Executive VIP Chauffeur Service for Umrah Pilgrims',
    h1: 'Premium Umrah Chauffeur & Luxury Pilgrim Transport',
    description:
      'Private Umrah taxi across Makkah, Madinah and Jeddah. Professional chauffeurs, fixed rates, and comfort for the Guests of Allah.',
    btnPrimary: 'Get Prices & Book',
    btnSecondary: 'Chat on WhatsApp',
  },
  ar: {
    badge: 'خدمة سائق VIP خاص لضيوف الرحمن والمعتمرين',
    h1: 'خدمة سائق خاص وسيارات فاخرة لنقل ضيوف الرحمن',
    description:
      'توصيل خاص بسيارات حديثة عبر مكة المكرمة والمدينة المنورة وجدة. سائقون محترفون، أسعار ثابتة ومحددة، وراحة تليق بضيوف الرحمن.',
    btnPrimary: 'عرض الأسعار والحجز',
    btnSecondary: 'محادثة عبر واتساب',
  },
  fr: {
    badge: 'Service de Chauffeur VIP Privé pour les Pèlerins de la Omra',
    h1: 'Chauffeur Privé Premium & Transport de Luxe pour la Omra',
    description:
      "Transport privé pour la Omra à La Mecque, Médine et Djeddah. Chauffeurs professionnels, tarifs fixes garantis et confort dédié aux Hôtes d'Allah.",
    btnPrimary: 'Voir les Tarifs & Réserver',
    btnSecondary: 'Discuter sur WhatsApp',
  },
  es: {
    badge: 'Servicio de Chofer VIP Privado para Peregrinos de la Umrah',
    h1: 'Chofer Privado Premium y Transporte de Lujo para la Umrah',
    description:
      'Transporte privado para la Umrah en La Meca, Medina y Yeda. Choferes profesionales, tarifas fijas y máxima comodidad para los Huéspedes de Alá.',
    btnPrimary: 'Ver Tarifas y Reservar',
    btnSecondary: 'Contactar por WhatsApp',
  },
  id: {
    badge: 'Layanan Sopir VIP Privat untuk Jamaah Umrah',
    h1: 'Sopir Privat Premium & Transportasi Mewah Jamaah Umrah',
    description:
      'Taksi privat Umrah melayani Makkah, Madinah, dan Jeddah. Sopir profesional, tarif pasti transparan, dan kenyamanan utama bagi Tamu Allah.',
    btnPrimary: 'Lihat Tarif & Pesan',
    btnSecondary: 'Hubungi via WhatsApp',
  },
  hi: {
    badge: 'उमरा यात्रियों के लिए विशेष वीआईपी निजी चौफर सेवा',
    h1: 'प्रीमियम उमरा चौफर और तीर्थयात्रियों के लिए लक्जरी परिवहन',
    description:
      'मक्का, मदीना और जेद्दा में निजी उमरा टैक्सी। पेशेवर ड्राइवर, निश्चित दरें और अल्लाह के मेहमानों के लिए सर्वोच्च आराम।',
    btnPrimary: 'किराया देखें और बुक करें',
    btnSecondary: 'व्हाट्सएप पर बात करें',
  },
  de: {
    badge: 'Exklusiver VIP-Chauffeurservice für Umrah-Pilger',
    h1: 'Premium Umrah-Chauffeur & Luxus-Pilgertransport',
    description:
      'Privater Umrah-Fahrdienst zwischen Mekka, Medina und Dschidda. Professionelle Chauffeure, garantierte Festpreise und maximaler Komfort für die Gäste Allahs.',
    btnPrimary: 'Preise Ansehen & Buchen',
    btnSecondary: 'Auf WhatsApp chatten',
  },
  ur: {
    badge: 'عمرہ زائرین کے لیے خصوصی وی آئی پی پرائیویٹ ڈرائیور سروس',
    h1: 'پریمیم عمرہ پرائیویٹ ڈرائیور اور زائرین کے لیے لگژری ٹرانسپورٹ',
    description:
      'مکہ مکرمہ، مدینہ منورہ اور جدہ کے درمیان پرائیویٹ عمرہ ٹیکسی۔ پیشہ ور ڈرائیور، طے شدہ کرائے اور ضیوف الرحمن کے لیے پُرسکون سفر۔',
    btnPrimary: 'کرائے دیکھیں اور بک کریں',
    btnSecondary: 'واٹس ایپ پر رابطہ کریں',
  },
  ms: {
    badge: 'Perkhidmatan Pemandu VIP Khas untuk Jemaah Umrah',
    h1: 'Pemandu Umrah Premium & Pengangkutan Mewah Jemaah',
    description:
      'Teksi Umrah peribadi meliputi Makkah, Madinah dan Jeddah. Pemandu profesional, kadar tetap terjamin, dan keselesaan khas untuk Tetamu Allah.',
    btnPrimary: 'Lihat Harga & Tempah',
    btnSecondary: 'Hubungi WhatsApp',
  },
  tr: {
    badge: 'Umre Ziyaretçileri İçin Özel VIP Şoför Hizmeti',
    h1: 'Seçkin Umre Şoförü ve Lüks Ziyaretçi Ulaşımı',
    description:
      "Mekke, Medine ve Cidde arasında özel Umre transferi. Profesyonel şoförler, sabit garantili fiyatlar ve Allah'ın Misafirleri için üstün konfor.",
    btnPrimary: 'Fiyatları Gör ve Rezervasyon Yap',
    btnSecondary: "WhatsApp'tan Yazın",
  },
};

const BOOKING_WIDGET_TRANSLATIONS: Record<Locale, BookingWidgetTranslations> = {
  en: {
    oneWay: 'One way',
    byTheHour: 'By the hour',
    pickupLocation: 'Pick-up location',
    dropoffLocation: 'Drop-off location',
    duration: 'Duration',
    pickupDate: 'Pick-up date',
    pickupTime: 'Pickup time',
    viewOptions: 'View options',
    hoursSuffix: 'Hours',
    locJeddahAirport: 'Jeddah Airport (KAIA)',
    locMakkahHotel: 'Makkah Hotel / Haram',
    locMadinahHotel: 'Madinah Hotel / Haram',
    locMadinahAirport: 'Madinah Airport (MED)',
    locJeddahCity: 'Jeddah City',
    locMakkahZiyarat: 'Makkah Holy Sites / Ziyarat',
    locMadinahZiyarat: 'Madinah Holy Sites / Ziyarat',
  },
  ar: {
    oneWay: 'اتجاه واحد',
    byTheHour: 'بالساعة',
    pickupLocation: 'موقع الانطلاق',
    dropoffLocation: 'وجهة الوصول',
    duration: 'المدة',
    pickupDate: 'تاريخ الانطلاق',
    pickupTime: 'وقت الانطلاق',
    viewOptions: 'عرض الخيارات',
    hoursSuffix: 'ساعات',
    locJeddahAirport: 'مطار جدة (KAIA)',
    locMakkahHotel: 'فندق بمكة / الحرم',
    locMadinahHotel: 'فندق بالمدينة / الحرم',
    locMadinahAirport: 'مطار المدينة (MED)',
    locJeddahCity: 'مدينة جدة',
    locMakkahZiyarat: 'مزارات مكة المكرمة',
    locMadinahZiyarat: 'مزارات المدينة المنورة',
  },
  fr: {
    oneWay: 'Aller simple',
    byTheHour: "À l'heure",
    pickupLocation: 'Lieu de prise en charge',
    dropoffLocation: 'Lieu de destination',
    duration: 'Durée',
    pickupDate: 'Date de départ',
    pickupTime: 'Heure de départ',
    viewOptions: 'Voir les options',
    hoursSuffix: 'Heures',
    locJeddahAirport: 'Aéroport de Djeddah (KAIA)',
    locMakkahHotel: 'Hôtel La Mecque / Haram',
    locMadinahHotel: 'Hôtel Médine / Haram',
    locMadinahAirport: 'Aéroport de Médine (MED)',
    locJeddahCity: 'Ville de Djeddah',
    locMakkahZiyarat: 'Lieux saints de La Mecque',
    locMadinahZiyarat: 'Lieux saints de Médine',
  },
  es: {
    oneWay: 'Solo ida',
    byTheHour: 'Por horas',
    pickupLocation: 'Punto de recogida',
    dropoffLocation: 'Punto de destino',
    duration: 'Duración',
    pickupDate: 'Fecha de recogida',
    pickupTime: 'Hora de recogida',
    viewOptions: 'Ver opciones',
    hoursSuffix: 'Horas',
    locJeddahAirport: 'Aeropuerto de Yeda (KAIA)',
    locMakkahHotel: 'Hotel en La Meca / Haram',
    locMadinahHotel: 'Hotel en Medina / Haram',
    locMadinahAirport: 'Aeropuerto de Medina (MED)',
    locJeddahCity: 'Ciudad de Yeda',
    locMakkahZiyarat: 'Lugares sagrados de La Meca',
    locMadinahZiyarat: 'Lugares sagrados de Medina',
  },
  id: {
    oneWay: 'Sekali jalan',
    byTheHour: 'Per jam',
    pickupLocation: 'Lokasi jemput',
    dropoffLocation: 'Lokasi tujuan',
    duration: 'Durasi',
    pickupDate: 'Tanggal jemput',
    pickupTime: 'Waktu jemput',
    viewOptions: 'Lihat opsi',
    hoursSuffix: 'Jam',
    locJeddahAirport: 'Bandara Jeddah (KAIA)',
    locMakkahHotel: 'Hotel Makkah / Masjidil Haram',
    locMadinahHotel: 'Hotel Madinah / Nabawi',
    locMadinahAirport: 'Bandara Madinah (MED)',
    locJeddahCity: 'Kota Jeddah',
    locMakkahZiyarat: 'Ziarah Makkah',
    locMadinahZiyarat: 'Ziarah Madinah',
  },
  hi: {
    oneWay: 'एक तरफ',
    byTheHour: 'प्रति घंटा',
    pickupLocation: 'पिक-अप स्थान',
    dropoffLocation: 'ड्रॉप-ऑफ स्थान',
    duration: 'अवधि',
    pickupDate: 'पिक-अप तिथि',
    pickupTime: 'पिक-अप समय',
    viewOptions: 'विकल्प देखें',
    hoursSuffix: 'घंटे',
    locJeddahAirport: 'जेद्दा हवाई अड्डा (KAIA)',
    locMakkahHotel: 'मक्का होटल / हरम',
    locMadinahHotel: 'मदीना होटल / हरम',
    locMadinahAirport: 'मदीना हवाई अड्डा (MED)',
    locJeddahCity: 'जेद्दा शहर',
    locMakkahZiyarat: 'मक्का ज़ियारत स्थल',
    locMadinahZiyarat: 'मदीना ज़ियारत स्थल',
  },
  de: {
    oneWay: 'Einfache Fahrt',
    byTheHour: 'Stundenweise',
    pickupLocation: 'Abholort',
    dropoffLocation: 'Zielort',
    duration: 'Dauer',
    pickupDate: 'Abholdatum',
    pickupTime: 'Abholzeit',
    viewOptions: 'Optionen ansehen',
    hoursSuffix: 'Stunden',
    locJeddahAirport: 'Flughafen Dschidda (KAIA)',
    locMakkahHotel: 'Hotel Mekka / Haram',
    locMadinahHotel: 'Hotel Medina / Haram',
    locMadinahAirport: 'Flughafen Medina (MED)',
    locJeddahCity: 'Stadt Dschidda',
    locMakkahZiyarat: 'Heilige Stätten Mekka',
    locMadinahZiyarat: 'Heilige Stätten Medina',
  },
  ur: {
    oneWay: 'ایک طرفہ',
    byTheHour: 'فی گھنٹہ',
    pickupLocation: 'روانگی کا مقام',
    dropoffLocation: 'منزل کا مقام',
    duration: 'مدت',
    pickupDate: 'روانگی کی تاریخ',
    pickupTime: 'روانگی کا وقت',
    viewOptions: 'اختیارات دیکھیں',
    hoursSuffix: 'گھنٹے',
    locJeddahAirport: 'جدہ ایئرپورٹ (KAIA)',
    locMakkahHotel: 'مکہ ہوٹل / حرم',
    locMadinahHotel: 'مدینہ ہوٹل / حرم',
    locMadinahAirport: 'مدینہ ایئرپورٹ (MED)',
    locJeddahCity: 'جدہ شہر',
    locMakkahZiyarat: 'مکہ زیارات',
    locMadinahZiyarat: 'مدینہ زیارات',
  },
  ms: {
    oneWay: 'Satu hala',
    byTheHour: 'Mengikut jam',
    pickupLocation: 'Lokasi pengambilan',
    dropoffLocation: 'Lokasi destinasi',
    duration: 'Tempoh',
    pickupDate: 'Tarikh ambil',
    pickupTime: 'Masa ambil',
    viewOptions: 'Lihat pilihan',
    hoursSuffix: 'Jam',
    locJeddahAirport: 'Lapangan Terbang Jeddah (KAIA)',
    locMakkahHotel: 'Hotel Makkah / Masjidil Haram',
    locMadinahHotel: 'Hotel Madinah / Nabawi',
    locMadinahAirport: 'Lapangan Terbang Madinah (MED)',
    locJeddahCity: 'Bandar Jeddah',
    locMakkahZiyarat: 'Ziarah Makkah',
    locMadinahZiyarat: 'Ziarah Madinah',
  },
  tr: {
    oneWay: 'Tek yön',
    byTheHour: 'Saatlik',
    pickupLocation: 'Alış noktası',
    dropoffLocation: 'Bırakış noktası',
    duration: 'Süre',
    pickupDate: 'Alış tarihi',
    pickupTime: 'Alış saati',
    viewOptions: 'Seçenekleri gör',
    hoursSuffix: 'Saat',
    locJeddahAirport: 'Cidde Havalimanı (KAIA)',
    locMakkahHotel: 'Mekke Oteli / Harem',
    locMadinahHotel: 'Medine Oteli / Harem',
    locMadinahAirport: 'Medine Havalimanı (MED)',
    locJeddahCity: 'Cidde Şehir',
    locMakkahZiyarat: 'Mekke Ziyaret Yerleri',
    locMadinahZiyarat: 'Medine Ziyaret Yerleri',
  },
};

export function HeroSection({ locale }: HeroSectionProps) {
  const router = useRouter();
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Booking Widget State
  const [tripType, setTripType] = useState<'one-way' | 'hourly'>('one-way');
  const [pickupLocation, setPickupLocation] = useState('jeddah-airport');
  const [dropoffLocation, setDropoffLocation] = useState('makkah-hotel');
  const [durationHours, setDurationHours] = useState('4');

  // Dates
  const tomorrowStr = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);
  const todayStr = React.useMemo(() => new Date().toISOString().split('T')[0], []);

  const [pickupDate, setPickupDate] = useState(tomorrowStr);
  const [pickupTime, setPickupTime] = useState('14:00');

  const content = HERO_CONTENT[locale] || HERO_CONTENT.en;
  const bwt = BOOKING_WIDGET_TRANSLATIONS[locale] || BOOKING_WIDGET_TRANSLATIONS.en;
  const isArabic = locale === 'ar';
  const isUrdu = locale === 'ur';

  useEffect(() => {
    // 1. Force video to play muted
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log('Video autoPlay deferred:', err);
      });
    }

    // 2. Pause video when hero section scrolls off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // 3. Pause video when browser tab is hidden
    const handleVisibilityChange = () => {
      if (!videoRef.current) return;
      if (document.hidden) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleWidgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();

    if (tripType === 'one-way') {
      let routeSlug = 'jeddah-airport-to-makkah';
      if (pickupLocation === 'jeddah-airport' && dropoffLocation === 'makkah-hotel') {
        routeSlug = 'jeddah-airport-to-makkah';
      } else if (pickupLocation === 'makkah-hotel' && dropoffLocation === 'jeddah-airport') {
        routeSlug = 'makkah-to-jeddah-airport';
      } else if (pickupLocation === 'makkah-hotel' && dropoffLocation === 'madinah-hotel') {
        routeSlug = 'makkah-to-madinah';
      } else if (pickupLocation === 'madinah-hotel' && dropoffLocation === 'makkah-hotel') {
        routeSlug = 'madinah-to-makkah';
      } else if (pickupLocation === 'madinah-airport' || dropoffLocation === 'madinah-airport') {
        routeSlug = 'madinah-airport-to-hotel';
      } else if (pickupLocation === 'jeddah-city' || dropoffLocation === 'madinah-hotel') {
        routeSlug = 'jeddah-to-madinah';
      }
      query.set('route', routeSlug);
      query.set('date', pickupDate);
      query.set('time', pickupTime);
    } else {
      query.set('type', 'hourly');
      query.set('duration', durationHours);
      query.set('date', pickupDate);
      query.set('time', pickupTime);
    }

    router.push(`/${locale}/booking?${query.toString()}`);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] py-20 lg:py-24 flex flex-col justify-center items-center overflow-hidden bg-[#0a1224] text-white select-none"
    >
      {/* 1) FULL-SCREEN CINEMATIC BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/haram.jpg"
          className="w-full h-full object-cover object-[center_38%]"
          aria-label="Masjid al-Haram, Holy Kaaba and Makkah Royal Clock Tower at night - Duyuf Alrahman VIP"
        >
          <source src="/haram.mp4" type="video/mp4" />
        </video>

        {/* Balanced Dark Navy Gradient Overlays: keeps video vibrant while ensuring text has strong contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1224] via-[#0a1224]/50 to-[#0a1224]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1224]/50 via-transparent to-[#0a1224]/85 pointer-events-none" />
      </div>

      {/* 2) SIMPLE, CLASSY, CENTERED CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10 flex flex-col items-center justify-center text-center my-auto">
        {/* SMALL BADGE: Thin gold border, no heavy fill, refined letter-spacing */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#d4a72c]/50 bg-[#0a1224]/30 backdrop-blur-sm text-[#d4a72c] text-xs sm:text-[13px] font-medium tracking-[0.14em] uppercase mb-5 sm:mb-6 animate-fadeIn">
          <span>{content.badge}</span>
        </div>

        {/* H1: Large serif headline in Playfair Display, semi-bold, white */}
        <h1
          className={`text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-[1.14] sm:leading-[1.08] tracking-tight max-w-3xl lg:max-w-4xl mx-auto text-[clamp(26px,5vw,64px)] sm:text-[clamp(32px,5vw,60px)] font-semibold ${
            isArabic ? 'font-arabic font-bold' : isUrdu ? 'font-urdu font-bold' : 'font-display'
          }`}
        >
          {content.h1}
        </h1>

        {/* SHORT PARAGRAPH: Max 2 lines */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#e2e8f0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-light leading-relaxed max-w-2xl mx-auto line-clamp-2">
          {content.description}
        </p>

        {/* TWO BUTTONS WITH GENEROUS SPACING & SUBTLE LUXURY SHINE */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 mt-5 sm:mt-7 mb-6 sm:mb-9 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
          {/* Gold "Get Prices & Book" Button */}
          <Link
            href={`/${locale}/pricing`}
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 min-h-[48px] h-12 px-6 sm:px-8 w-full sm:w-auto rounded-[8px] bg-[#d4a72c] text-[#0a1224] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#e8c766] hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-[0_4px_25px_rgba(212,167,44,0.4)] hover:shadow-[0_4px_35px_rgba(212,167,44,0.6)] focus-visible:ring-2 focus-visible:ring-[#d4a72c]"
          >
            <span className="relative z-10">{content.btnPrimary}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 relative z-10" />
            <span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-luxury-shine group-hover:translate-x-full transition-transform duration-700"
            />
          </Link>

          {/* Thin Green-Outline "Chat on WhatsApp" Button */}
          <button
            type="button"
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] h-12 px-6 sm:px-7 w-full sm:w-auto rounded-[8px] border border-[#25d366]/70 bg-[#0a1224]/30 backdrop-blur-sm hover:bg-[#25d366] text-[#25d366] hover:text-white font-semibold text-xs sm:text-sm transition-all focus-visible:ring-2 focus-visible:ring-[#25d366]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{content.btnSecondary}</span>
          </button>
        </div>

        {/* 3) LUXURY LIGHT-THEME BOOKING WIDGET */}
        <div className="w-full max-w-5xl mx-auto">
          {/* Top Pill Toggle Switch: clean white with orange-gold active tab */}
          <div className="flex justify-center mb-3">
            <div className="inline-flex p-1 rounded-full bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-md">
              <button
                type="button"
                onClick={() => setTripType('one-way')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  tripType === 'one-way'
                    ? 'bg-[#df9e38] text-gray-950 shadow-sm'
                    : 'text-gray-700 hover:text-gray-950'
                }`}
              >
                {bwt.oneWay}
              </button>
              <button
                type="button"
                onClick={() => setTripType('hourly')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  tripType === 'hourly'
                    ? 'bg-[#df9e38] text-gray-950 shadow-sm'
                    : 'text-gray-700 hover:text-gray-950'
                }`}
              >
                {bwt.byTheHour}
              </button>
            </div>
          </div>

          {/* Solid White Horizontal Container with Soft Elegant Shadow */}
          <form
            onSubmit={handleWidgetSubmit}
            className="w-full bg-white rounded-2xl lg:rounded-full p-3 sm:p-3.5 lg:p-3 border border-gray-100 shadow-[0_12px_45px_rgba(0,0,0,0.18)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.22)] transition-shadow text-gray-900"
          >
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-0 lg:divide-x lg:divide-gray-200 rtl:lg:divide-x-reverse">
              {/* Field 1: Pick-up location */}
              <div className="flex-1 px-4 py-1.5 text-left rtl:text-right">
                <label className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                  {bwt.pickupLocation}
                </label>
                <div className="relative">
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-transparent text-gray-950 font-semibold text-xs sm:text-sm focus:outline-none border-b border-gray-200 focus:border-[#df9e38] pb-1 pt-0.5 pr-6 rtl:pr-0 rtl:pl-6 appearance-none cursor-pointer transition-colors text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    <option value="jeddah-airport" className="bg-white text-gray-900">
                      {bwt.locJeddahAirport}
                    </option>
                    <option value="makkah-hotel" className="bg-white text-gray-900">
                      {bwt.locMakkahHotel}
                    </option>
                    <option value="madinah-hotel" className="bg-white text-gray-900">
                      {bwt.locMadinahHotel}
                    </option>
                    <option value="madinah-airport" className="bg-white text-gray-900">
                      {bwt.locMadinahAirport}
                    </option>
                    <option value="jeddah-city" className="bg-white text-gray-900">
                      {bwt.locJeddahCity}
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none absolute right-1 rtl:right-auto rtl:left-1 bottom-1.5" />
                </div>
              </div>

              {/* Dynamic Field 2: Drop-off location OR Duration */}
              {tripType === 'one-way' ? (
                <div className="flex-1 px-4 py-1.5 text-left rtl:text-right">
                  <label className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    {bwt.dropoffLocation}
                  </label>
                  <div className="relative">
                    <select
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="w-full bg-transparent text-gray-950 font-semibold text-xs sm:text-sm focus:outline-none border-b border-gray-200 focus:border-[#df9e38] pb-1 pt-0.5 pr-6 rtl:pr-0 rtl:pl-6 appearance-none cursor-pointer transition-colors text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      <option value="makkah-hotel" className="bg-white text-gray-900">
                        {bwt.locMakkahHotel}
                      </option>
                      <option value="madinah-hotel" className="bg-white text-gray-900">
                        {bwt.locMadinahHotel}
                      </option>
                      <option value="jeddah-airport" className="bg-white text-gray-900">
                        {bwt.locJeddahAirport}
                      </option>
                      <option value="madinah-airport" className="bg-white text-gray-900">
                        {bwt.locMadinahAirport}
                      </option>
                      <option value="makkah-ziyarat" className="bg-white text-gray-900">
                        {bwt.locMakkahZiyarat}
                      </option>
                      <option value="madinah-ziyarat" className="bg-white text-gray-900">
                        {bwt.locMadinahZiyarat}
                      </option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none absolute right-1 rtl:right-auto rtl:left-1 bottom-1.5" />
                  </div>
                </div>
              ) : (
                <div className="flex-1 px-4 py-1.5 text-left rtl:text-right">
                  <label className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    {bwt.duration}
                  </label>
                  <div className="relative">
                    <select
                      value={durationHours}
                      onChange={(e) => setDurationHours(e.target.value)}
                      className="w-full bg-transparent text-gray-950 font-semibold text-xs sm:text-sm focus:outline-none border-b border-gray-200 focus:border-[#df9e38] pb-1 pt-0.5 pr-6 rtl:pr-0 rtl:pl-6 appearance-none cursor-pointer transition-colors"
                    >
                      <option value="2" className="bg-white text-gray-900">
                        2 {bwt.hoursSuffix}
                      </option>
                      <option value="4" className="bg-white text-gray-900">
                        4 {bwt.hoursSuffix} (Standard)
                      </option>
                      <option value="6" className="bg-white text-gray-900">
                        6 {bwt.hoursSuffix}
                      </option>
                      <option value="8" className="bg-white text-gray-900">
                        8 {bwt.hoursSuffix} (Full Day)
                      </option>
                      <option value="12" className="bg-white text-gray-900">
                        12 {bwt.hoursSuffix} (Executive)
                      </option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none absolute right-1 rtl:right-auto rtl:left-1 bottom-1.5" />
                  </div>
                </div>
              )}

              {/* Field 3: Pick-up date */}
              <div className="flex-1 px-4 py-1.5 text-left rtl:text-right">
                <label className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                  {bwt.pickupDate}
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-transparent text-gray-950 font-semibold text-xs sm:text-sm focus:outline-none border-b border-gray-200 focus:border-[#df9e38] pb-1 pt-0.5 transition-colors cursor-pointer"
                />
              </div>

              {/* Field 4: Pickup time */}
              <div className="flex-1 px-4 py-1.5 text-left rtl:text-right">
                <label className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                  {bwt.pickupTime}
                </label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full bg-transparent text-gray-950 font-semibold text-xs sm:text-sm focus:outline-none border-b border-gray-200 focus:border-[#df9e38] pb-1 pt-0.5 transition-colors cursor-pointer"
                />
              </div>

              {/* Submit Button: Solid orange-gold background with dark text */}
              <div className="lg:pl-3 rtl:lg:pl-0 rtl:lg:pr-3 pt-2 lg:pt-0 shrink-0">
                <button
                  type="submit"
                  className="w-full lg:w-auto h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-[#df9e38] hover:bg-[#c9892c] active:scale-[0.98] text-gray-950 font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(223,158,56,0.35)] transition-all whitespace-nowrap cursor-pointer"
                >
                  <span>{bwt.viewOptions}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* DUAL NUMBER WHATSAPP MODAL */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        locale={locale}
        source="hero_cta"
      />
    </section>
  );
}
