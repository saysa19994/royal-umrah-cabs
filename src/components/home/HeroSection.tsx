'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { WhatsAppModal } from '@/components/common/WhatsAppModal';
import { LocationAutocomplete, SAUDI_LOCATIONS } from '@/components/home/LocationAutocomplete';
import {
  ArrowRight,
  MessageCircle,
  Calendar,
  Clock,
  ChevronDown,
  Clock3,
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
}

const HERO_CONTENT: Record<Locale, HeroLocalizedContent> = {
  en: {
    badge: 'PREMIUM TRANSPORTATION',
    h1: 'Your Journey, Our Priority',
    description: 'Book your transfer with comfort and peace of mind',
    btnPrimary: 'Get Prices & Book',
    btnSecondary: 'Chat on WhatsApp',
  },
  ar: {
    badge: 'نقل فاخر لضيوف الرحمن',
    h1: 'رحلتكم، أولويتنا الملكية',
    description: 'احجز رحلتك الخاصة بكل طمأنينة وراحة بال وخدمة تليق بضيوف الرحمن',
    btnPrimary: 'عرض الأسعار والحجز',
    btnSecondary: 'محادثة عبر واتساب',
  },
  fr: {
    badge: 'TRANSPORT HAUT DE GAMME',
    h1: 'Votre Voyage, Notre Priorité',
    description: 'Réservez votre transfert en toute sérénité et confort absolu',
    btnPrimary: 'Voir les Tarifs & Réserver',
    btnSecondary: 'Discuter sur WhatsApp',
  },
  es: {
    badge: 'TRANSPORTE PREMIUM VIP',
    h1: 'Su Viaje, Nuestra Prioridad',
    description: 'Reserve su traslado con total tranquilidad y máximo confort',
    btnPrimary: 'Ver Tarifas y Reservar',
    btnSecondary: 'Contactar por WhatsApp',
  },
  id: {
    badge: 'TRANSPORTASI PREMIUM VIP',
    h1: 'Perjalanan Anda, Prioritas Kami',
    description: 'Pesan antar-jemput privat Anda dengan tenang dan nyaman',
    btnPrimary: 'Lihat Tarif & Pesan',
    btnSecondary: 'Hubungi via WhatsApp',
  },
  hi: {
    badge: 'प्रीमियम वीआईपी परिवहन',
    h1: 'आपकी यात्रा, हमारी प्राथमिकता',
    description: 'पूर्ण शांति और सर्वोच्च आराम के साथ अपनी यात्रा बुक करें',
    btnPrimary: 'किराया देखें और बुक करें',
    btnSecondary: 'व्हाट्सएप पर बात करें',
  },
  de: {
    badge: 'PREMIUM VIP-TRANSPORT',
    h1: 'Ihre Reise, Unsere Priorität',
    description: 'Buchen Sie Ihren VIP-Transfer mit höchstem Komfort und Seelenfrieden',
    btnPrimary: 'Preise Ansehen & Buchen',
    btnSecondary: 'Auf WhatsApp chatten',
  },
  ur: {
    badge: 'پریمیم ٹرانسپورٹیشن سروس',
    h1: 'آپ کا سفر، ہماری اولین ترجیح',
    description: 'مکمل سکون، وقار اور اعلیٰ ترین معیار کے ساتھ اپنی گاڑی بک کریں',
    btnPrimary: 'کرائے دیکھیں اور بک کریں',
    btnSecondary: 'واٹس ایپ پر رابطہ کریں',
  },
  ms: {
    badge: 'PENGANGKUTAN VIP PREMIUM',
    h1: 'Perjalanan Anda, Keutamaan Kami',
    description: 'Tempah pengangkutan peribadi anda dengan tenang dan selesa',
    btnPrimary: 'Lihat Harga & Tempah',
    btnSecondary: 'Hubungi WhatsApp',
  },
  tr: {
    badge: 'BİRİNCİ SINIF VIP ULAŞIM',
    h1: 'Yolculuğunuz, Önceliğimizdir',
    description: 'Huzur ve üstün konforla özel transferinizi güvenle ayırtın',
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
  },
  fr: {
    oneWay: 'Aller simple',
    byTheHour: 'À l\'heure',
    pickupLocation: 'Lieu de prise en charge',
    dropoffLocation: 'Destination',
    duration: 'Durée',
    pickupDate: 'Date de prise en charge',
    pickupTime: 'Heure de prise en charge',
    viewOptions: 'Voir les options',
    hoursSuffix: 'Heures',
  },
  es: {
    oneWay: 'Solo ida',
    byTheHour: 'Por horas',
    pickupLocation: 'Lugar de recogida',
    dropoffLocation: 'Destino',
    duration: 'Duración',
    pickupDate: 'Fecha de recogida',
    pickupTime: 'Hora de recogida',
    viewOptions: 'Ver opciones',
    hoursSuffix: 'Horas',
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
  },
  ur: {
    oneWay: 'ایک طرف',
    byTheHour: 'فی گھنٹہ',
    pickupLocation: 'پک اپ کا مقام',
    dropoffLocation: 'منزل کا مقام',
    duration: 'مدت',
    pickupDate: 'پک اپ کی تاریخ',
    pickupTime: 'پک اپ کا وقت',
    viewOptions: 'اختیارات دیکھیں',
    hoursSuffix: 'گھنٹے',
  },
  ms: {
    oneWay: 'Satu hala',
    byTheHour: 'Mengikut jam',
    pickupLocation: 'Lokasi ambil',
    dropoffLocation: 'Lokasi hantar',
    duration: 'Tempoh',
    pickupDate: 'Tarikh ambil',
    pickupTime: 'Masa ambil',
    viewOptions: 'Lihat pilihan',
    hoursSuffix: 'Jam',
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
  },
};

// Arabesque medallion flourish attached to the left/right border (Reference 2)
function ArabesqueMedallion({ className = 'w-6 h-12 text-[#C5A059]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 0 C22 14 26 22 14 28 C2 22 6 14 14 0 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M14 56 C22 42 26 34 14 28 C2 34 6 42 14 56 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="14" cy="28" r="4.5" fill="#090D14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 23 L0 28 L4 33" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function HeroSection({ locale }: HeroSectionProps) {
  const router = useRouter();
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Booking Widget State
  const [tripType, setTripType] = useState<'one-way' | 'hourly'>('one-way');
  const [pickupLocation, setPickupLocation] = useState('jeddah-airport');
  const [dropoffLocation, setDropoffLocation] = useState('makkah-hotel');
  const [durationHours, setDurationHours] = useState('4');

  // Dates
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [pickupDate, setPickupDate] = useState(tomorrowStr);
  const [pickupTime, setPickupTime] = useState('14:00');

  const content = HERO_CONTENT[locale] || HERO_CONTENT.en;
  const bwt = BOOKING_WIDGET_TRANSLATIONS[locale] || BOOKING_WIDGET_TRANSLATIONS.en;
  const isRtl = locale === 'ar' || locale === 'ur';

  // Format date display (e.g., 10/28/2026)
  const formattedDateDisplay = useMemo(() => {
    if (!pickupDate) return '';
    try {
      const [year, month, day] = pickupDate.split('-');
      return `${month}/${day}/${year}`;
    } catch {
      return pickupDate;
    }
  }, [pickupDate]);

  // Format time display (e.g., 02:00 PM)
  const formattedTimeDisplay = useMemo(() => {
    if (!pickupTime) return '';
    try {
      const [h, m] = pickupTime.split(':').map(Number);
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      return `${String(hour12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
    } catch {
      return pickupTime;
    }
  }, [pickupTime]);

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

      const pickItem = SAUDI_LOCATIONS.find((l) => l.id === pickupLocation);
      const dropItem = SAUDI_LOCATIONS.find((l) => l.id === dropoffLocation);

      const pickCity = pickItem?.city || 'jeddah';
      const dropCity = dropItem?.city || 'makkah';

      if (pickCity === 'jeddah' && dropCity === 'makkah') {
        routeSlug = 'jeddah-airport-to-makkah';
      } else if (pickCity === 'makkah' && dropCity === 'jeddah') {
        routeSlug = 'makkah-to-jeddah-airport';
      } else if (pickCity === 'makkah' && dropCity === 'madinah') {
        routeSlug = 'makkah-to-madinah';
      } else if (pickCity === 'madinah' && dropCity === 'makkah') {
        routeSlug = 'madinah-to-makkah';
      } else if (pickCity === 'madinah' && dropItem?.category === 'airport') {
        routeSlug = 'madinah-airport-to-hotel';
      } else if (pickItem?.category === 'airport' && dropCity === 'madinah') {
        routeSlug = 'madinah-airport-to-hotel';
      } else if (pickCity === 'jeddah' && dropCity === 'madinah') {
        routeSlug = 'jeddah-to-madinah';
      } else if (pickCity === 'makkah' && dropCity === 'taif') {
        routeSlug = 'makkah-to-taif';
      } else if (pickCity === 'taif' && dropCity === 'makkah') {
        routeSlug = 'taif-to-makkah';
      } else if (pickCity === 'jeddah' && dropCity === 'taif') {
        routeSlug = 'jeddah-to-taif';
      } else if (pickCity === 'riyadh' || dropCity === 'riyadh') {
        routeSlug = 'riyadh-airport-transfer';
      }

      query.set('route', routeSlug);
      query.set('date', pickupDate);
      query.set('time', pickupTime);
      if (pickItem) query.set('pickup', pickItem.name[locale] || pickItem.name.en);
      if (dropItem) query.set('dropoff', dropItem.name[locale] || dropItem.name.en);
    } else {
      query.set('type', 'hourly');
      query.set('duration', durationHours);
      query.set('date', pickupDate);
      query.set('time', pickupTime);
      const pickItem = SAUDI_LOCATIONS.find((l) => l.id === pickupLocation);
      if (pickItem) query.set('pickup', pickItem.name[locale] || pickItem.name.en);
    }

    router.push(`/${locale}/booking?${query.toString()}`);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] py-16 sm:py-20 lg:py-24 flex flex-col justify-center items-center overflow-hidden bg-[#0A0D14] text-white select-none"
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
          aria-label="Masjid al-Haram and Kaaba at night - Duyuf Alrahman VIP"
        >
          <source src="/haram.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/60 to-[#0A0D14]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14]/65 via-transparent to-[#0A0D14]/90 pointer-events-none" />
      </div>

      {/* 2) MAIN HERO CONTENT & BOOKING BAR (MATCHING REFERENCE 2) */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 flex flex-col justify-center my-auto pt-10 sm:pt-14">
        {/* TOP ROW: HEADLINE ON LEFT + TOGGLE PILL ON RIGHT (REFERENCE 2) */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-6 sm:mb-8 text-start">
          {/* LEFT: EDITORIAL TYPOGRAPHY */}
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs font-bold text-[#C5A059] uppercase tracking-[0.28em] block mb-2 drop-shadow-sm">
              {content.badge}
            </span>
            <h1 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#F0E2C8] tracking-tight leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {content.h1}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#D0C7B8] font-light leading-relaxed drop-shadow-md">
              {content.description}
            </p>
          </div>

          {/* RIGHT: DARK TOGGLE CAPSULE (REFERENCE 2) */}
          <div className="shrink-0 self-start lg:self-end">
            <div className="inline-flex p-1 rounded-full bg-[#0B0F17]/90 backdrop-blur-md border border-[#C5A059]/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              <button
                type="button"
                onClick={() => setTripType('one-way')}
                className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  tripType === 'one-way'
                    ? 'bg-gradient-to-r from-[#D8A752] via-[#E8BE6D] to-[#C9973B] text-[#140E05] font-bold shadow-md shadow-[#C5A059]/30'
                    : 'text-[#D0C7B8] hover:text-white'
                }`}
              >
                {bwt.oneWay}
              </button>
              <button
                type="button"
                onClick={() => setTripType('hourly')}
                className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  tripType === 'hourly'
                    ? 'bg-gradient-to-r from-[#D8A752] via-[#E8BE6D] to-[#C9973B] text-[#140E05] font-bold shadow-md shadow-[#C5A059]/30'
                    : 'text-[#D0C7B8] hover:text-white'
                }`}
              >
                {bwt.byTheHour}
              </button>
            </div>
          </div>
        </div>

        {/* 3) THE ROYAL LUXURY BOOKING BAR (EXACT REFERENCE 2 GEOMETRY & STYLING) */}
        <div className="relative w-full">
          {/* Left Arabesque Medallion Flourish (Reference 2) */}
          <div
            className={`hidden xl:block absolute top-1/2 -translate-y-1/2 pointer-events-none z-20 ${
              isRtl ? '-right-3.5 rotate-180' : '-left-3.5'
            }`}
          >
            <ArabesqueMedallion className="w-6 h-12 text-[#C5A059] drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
          </div>

          {/* Chamfered Luxury Booking Container */}
          <form
            onSubmit={handleWidgetSubmit}
            className="w-full relative bg-gradient-to-r from-[#0C1017] via-[#0E131C] to-[#0A0D14] rounded-2xl lg:rounded-[22px] border-2 border-[#C5A059]/75 shadow-[0_0_35px_rgba(197,160,89,0.22),_0_20px_50px_rgba(0,0,0,0.95)] p-2.5 sm:p-3 lg:p-2 text-[#F7F3EE] backdrop-blur-xl"
          >
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0">
              {/* Field 1: PICK-UP LOCATION (with LocationAutocomplete) */}
              <LocationAutocomplete
                label={bwt.pickupLocation}
                value={pickupLocation}
                onChange={(locId) => setPickupLocation(locId)}
                locale={locale}
                excludeId={tripType === 'one-way' ? dropoffLocation : undefined}
              />

              {/* Thin Vertical Gold Divider */}
              <div className="hidden lg:block w-px h-10 bg-gradient-to-b from-transparent via-[#C5A059]/35 to-transparent mx-2 shrink-0" />

              {/* Field 2: DROP-OFF LOCATION (One-Way) OR DURATION (Hourly) */}
              {tripType === 'one-way' ? (
                <LocationAutocomplete
                  label={bwt.dropoffLocation}
                  value={dropoffLocation}
                  onChange={(locId) => setDropoffLocation(locId)}
                  locale={locale}
                  excludeId={pickupLocation}
                />
              ) : (
                <div className="flex-1 min-w-0 relative">
                  <div className="flex items-center gap-2.5 sm:gap-3 py-1 px-1 sm:px-2 rounded-xl">
                    {/* Left Circular Golden Clock Badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#1C181A] to-[#120F12] border border-[#C5A059]/60 flex items-center justify-center text-[#D8B174] shadow-inner shrink-0">
                      <Clock3 className="w-5 h-5 text-[#C5A059]" />
                    </div>

                    <div className="flex-1 min-w-0 text-start">
                      <label className="text-[10px] sm:text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider block leading-none mb-1">
                        {bwt.duration}
                      </label>
                      <div className="relative">
                        <select
                          value={durationHours}
                          onChange={(e) => setDurationHours(e.target.value)}
                          className="w-full bg-transparent text-[#F7F3EE] font-semibold text-xs sm:text-sm focus:outline-none appearance-none cursor-pointer pr-6 rtl:pr-0 rtl:pl-6 leading-tight"
                        >
                          <option value="2" className="bg-[#0D111A] text-white">
                            2 {bwt.hoursSuffix}
                          </option>
                          <option value="4" className="bg-[#0D111A] text-white">
                            4 {bwt.hoursSuffix} (Standard)
                          </option>
                          <option value="6" className="bg-[#0D111A] text-white">
                            6 {bwt.hoursSuffix}
                          </option>
                          <option value="8" className="bg-[#0D111A] text-white">
                            8 {bwt.hoursSuffix} (Full Day)
                          </option>
                          <option value="12" className="bg-[#0D111A] text-white">
                            12 {bwt.hoursSuffix} (Executive VIP)
                          </option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-[#C5A059] pointer-events-none absolute right-1 rtl:right-auto rtl:left-1 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Thin Vertical Gold Divider */}
              <div className="hidden lg:block w-px h-10 bg-gradient-to-b from-transparent via-[#C5A059]/35 to-transparent mx-2 shrink-0" />

              {/* Field 3: PICK-UP DATE (Reference 2 Styling) */}
              <div className="flex-1 min-w-0 relative">
                <div className="flex items-center gap-2.5 sm:gap-3 py-1 px-1 sm:px-2 rounded-xl group hover:bg-white/[0.04] transition-colors cursor-pointer">
                  {/* Outline Calendar Icon in Gold */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#1C181A] to-[#120F12] border border-[#C5A059]/60 flex items-center justify-center text-[#D8B174] shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    <Calendar className="w-5 h-5 text-[#C5A059]" />
                  </div>

                  <div className="flex-1 min-w-0 text-start relative">
                    <label className="text-[10px] sm:text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider block leading-none mb-1">
                      {bwt.pickupDate}
                    </label>
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-xs sm:text-sm text-[#F7F3EE] block leading-tight">
                        {formattedDateDisplay}
                      </span>
                      <Calendar className="w-3.5 h-3.5 text-[#8E8B85] shrink-0" />
                    </div>

                    {/* Native Date Input Overlay */}
                    <input
                      type="date"
                      min={todayStr}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Thin Vertical Gold Divider */}
              <div className="hidden lg:block w-px h-10 bg-gradient-to-b from-transparent via-[#C5A059]/35 to-transparent mx-2 shrink-0" />

              {/* Field 4: PICKUP TIME (Reference 2 Styling) */}
              <div className="flex-1 min-w-0 relative">
                <div className="flex items-center gap-2.5 sm:gap-3 py-1 px-1 sm:px-2 rounded-xl group hover:bg-white/[0.04] transition-colors cursor-pointer">
                  {/* Outline Clock Icon in Gold */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#1C181A] to-[#120F12] border border-[#C5A059]/60 flex items-center justify-center text-[#D8B174] shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    <Clock className="w-5 h-5 text-[#C5A059]" />
                  </div>

                  <div className="flex-1 min-w-0 text-start relative">
                    <label className="text-[10px] sm:text-[11px] font-bold text-[#8E8B85] uppercase tracking-wider block leading-none mb-1">
                      {bwt.pickupTime}
                    </label>
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-xs sm:text-sm text-[#F7F3EE] block leading-tight">
                        {formattedTimeDisplay}
                      </span>
                      <Clock className="w-3.5 h-3.5 text-[#8E8B85] shrink-0" />
                    </div>

                    {/* Native Time Input Overlay */}
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Field 5: Action Button "View options →" (Chamfered Geometry matching Reference 2) */}
              <div className="pt-2 lg:pt-0 lg:ps-2 shrink-0">
                <button
                  type="submit"
                  className="w-full lg:w-auto min-h-[48px] h-12 px-7 sm:px-9 rounded-xl lg:rounded-2xl bg-gradient-to-r from-[#D8A752] via-[#E8BE6D] to-[#C9973B] hover:brightness-110 active:scale-[0.98] text-[#140E05] font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#C5A059]/35 flex items-center justify-center gap-2 transition-all whitespace-nowrap cursor-pointer"
                >
                  <span>{bwt.viewOptions}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* BOTTOM QUICK ACTIONS: GET PRICES & WHATSAPP */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Link
            href={`/${locale}/pricing`}
            className="text-xs sm:text-sm text-[#D8B174] hover:text-white font-medium underline-offset-4 hover:underline transition-colors"
          >
            {content.btnPrimary}
          </Link>
          <span className="text-white/20">•</span>
          <button
            type="button"
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#25D366] hover:text-[#4ADE80] font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{content.btnSecondary}</span>
          </button>
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
