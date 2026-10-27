'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Car,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
  ArrowRight,
  Wind,
  Armchair,
  UserCheck,
  Sparkles,
  X,
} from 'lucide-react';
import {
  FLEET_SHOWCASE_VEHICLES,
  FLEET_SHOWCASE_UI,
} from '@/data/fleet-showcase-data';

interface FleetSectionProps {
  locale: Locale;
  dict: Dictionary;
}

// 4 Verified Features Matching the Reference Images (First-Class Climate, Executive Chauffeur, Nappa Leather, Premium Comfort)
const LUXURY_FLEET_FEATURES = [
  {
    key: 'climate',
    icon: Wind,
    title: {
      en: 'First-Class Climate',
      ar: 'تكييف هوائي ملكي',
      ms: 'Iklim Kelas Pertama',
      id: 'Pendingin Kelas Satu',
      ur: 'شاہی ایئر کنڈیشننگ',
      fr: 'Climatisation Première Classe',
      es: 'Climatización Primera Clase',
      de: 'First-Class-Klimaautomatik',
      hi: 'प्रथम श्रेणी वातानुकूलन',
      tr: 'Birinci Sınıf Klima',
    },
    subtitle: {
      en: 'Multi-Zone Comfort',
      ar: 'تبريد فائق متعدد المناطق',
      ms: 'Keselesaan Pelbagai Zon',
      id: 'Kenyamanan Multi-Zona',
      ur: 'ملٹی زون کولنگ',
      fr: 'Confort Multi-Zone',
      es: 'Confort Multizona',
      de: 'Mehrzonen-Komfort',
      hi: 'मल्टी-ज़ोन आराम',
      tr: 'Çok Bölgeli Konfor',
    },
  },
  {
    key: 'chauffeur',
    icon: UserCheck,
    title: {
      en: 'Executive Chauffeur',
      ar: 'سائق VIP خاص',
      ms: 'Pemandu Eksekutif',
      id: 'Sopir Eksekutif',
      ur: 'وی آئی پی پرائیویٹ ڈرائیور',
      fr: 'Chauffeur Exécutif',
      es: 'Chófer Ejecutivo VIP',
      de: 'Exekutiver Chauffeur',
      hi: 'निजी वीआईपी चौफर',
      tr: 'Özel VIP Şoför',
    },
    subtitle: {
      en: 'Formal Uniform',
      ar: 'زي رسمي واستقبال خاص',
      ms: 'Pakaian Rasmi Kemas',
      id: 'Seragam Resmi Eksklusif',
      ur: 'مکمل رسمی یونیفارم',
      fr: 'Tenue Formelle',
      es: 'Uniforme Formal',
      de: 'Formelle Dienstkleidung',
      hi: 'औपचारिक वर्दी',
      tr: 'Resmi Kıyafet',
    },
  },
  {
    key: 'leather',
    icon: Armchair,
    title: {
      en: 'Nappa Leather',
      ar: 'مقصورة جلد نابا',
      ms: 'Kulit Nappa Eksklusif',
      id: 'Kulit Nappa Premium',
      ur: 'ناپا چمڑے کی نشستیں',
      fr: 'Cuir Nappa Exclusif',
      es: 'Cuero Nappa Exclusivo',
      de: 'Nappaleder-Ausstattung',
      hi: 'नापा चमड़ा सीटें',
      tr: 'Nappa Deri Döşeme',
    },
    subtitle: {
      en: 'Executive Reclining',
      ar: 'مقاعد مريحة قابلة للتعديل',
      ms: 'Kerusi Sandar Eksekutif',
      id: 'Kursi Eksekutif Rebah',
      ur: 'ایگزیکٹو ریکلائننگ',
      fr: 'Inclinaison Exécutive',
      es: 'Reclinación Ejecutiva',
      de: 'Executive-Liegesitze',
      hi: 'एग्जीक्यूटिव रिक्लाइनिंग',
      tr: 'Yatırılabilir Yönetici Koltuğu',
    },
  },
  {
    key: 'comfort',
    icon: Sparkles,
    title: {
      en: 'Premium Comfort',
      ar: 'راحة استثنائية',
      ms: 'Keselesaan Premium',
      id: 'Kenyamanan Premium',
      ur: 'پریمیم آرام و سکون',
      fr: 'Confort Premium',
      es: 'Confort Premium',
      de: 'Premium-Komfort',
      hi: 'प्रीमियम आराम',
      tr: 'Üstün Konfor',
    },
    subtitle: {
      en: 'Smooth & Quiet Ride',
      ar: 'رحلة هادئة وسلسة',
      ms: 'Perjalanan Senyap & Tenang',
      id: 'Perjalanan Tenang & Halus',
      ur: 'پرسکون اور ہموار سفر',
      fr: 'Trajet Silencieux et Fluide',
      es: 'Viaje Suave y Silencioso',
      de: 'Sanfte und ruhige Fahrt',
      hi: 'शांत और सहज यात्रा',
      tr: 'Sessiz ve Akıcı Yolculuk',
    },
  },
];

export function FleetSection({ locale, dict }: FleetSectionProps) {
  const [activeVehicleIndex, setActiveVehicleIndex] = useState<number>(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const { formatPrice } = useCurrency();

  const isRtl = locale === 'ar' || locale === 'ur';

  // Localized UI strings
  const tUI = {
    startingPrice: FLEET_SHOWCASE_UI.startingPrice[locale] || FLEET_SHOWCASE_UI.startingPrice.en,
    from: FLEET_SHOWCASE_UI.from[locale] || FLEET_SHOWCASE_UI.from.en,
    bookNow: FLEET_SHOWCASE_UI.bookNow[locale] || FLEET_SHOWCASE_UI.bookNow.en,
    detailsAndGallery: FLEET_SHOWCASE_UI.detailsAndGallery[locale] || FLEET_SHOWCASE_UI.detailsAndGallery.en,
    passengers: FLEET_SHOWCASE_UI.passengers[locale] || FLEET_SHOWCASE_UI.passengers.en,
    luggage: FLEET_SHOWCASE_UI.luggage[locale] || FLEET_SHOWCASE_UI.luggage.en,
    prevVehicle: FLEET_SHOWCASE_UI.prevVehicle[locale] || FLEET_SHOWCASE_UI.prevVehicle.en,
    nextVehicle: FLEET_SHOWCASE_UI.nextVehicle[locale] || FLEET_SHOWCASE_UI.nextVehicle.en,
    vehicleDetails: locale === 'ar' ? 'تفاصيل المركبة' : 'VEHICLE DETAILS',
    exteriorLabel: locale === 'ar' ? 'من الخارج' : 'EXTERIOR',
    interiorLabel: locale === 'ar' ? 'المقصورة الداخلية' : 'INTERIOR',
  };

  const totalVehicles = FLEET_SHOWCASE_VEHICLES.length;
  const currentCar = FLEET_SHOWCASE_VEHICLES[activeVehicleIndex] || FLEET_SHOWCASE_VEHICLES[0];
  const nextCar = FLEET_SHOWCASE_VEHICLES[(activeVehicleIndex + 1) % totalVehicles];

  // Guaranteed Exterior and Interior photo pairing for Desktop Design 14
  const exteriorPhoto =
    currentCar.gallery.find((img) => img.type === 'exterior') || currentCar.gallery[0];
  const interiorPhoto =
    currentCar.gallery.find((img) => img.type === 'interior') ||
    currentCar.gallery[1] ||
    currentCar.gallery[0];

  // Infinite carousel navigation
  const handlePrevVehicle = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev > 0 ? prev - 1 : totalVehicles - 1));
  }, [totalVehicles]);

  const handleNextVehicle = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev < totalVehicles - 1 ? prev + 1 : 0));
  }, [totalVehicles]);

  const handleSelectVehicle = useCallback((index: number) => {
    setActiveVehicleIndex(index);
  }, []);

  // Keyboard navigation for vehicle switching and modal control
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isGalleryOpen) {
        if (e.key === 'Escape') {
          setIsGalleryOpen(false);
        } else if (e.key === 'ArrowRight') {
          setGalleryActiveIndex((prev) => (prev < currentCar.gallery.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowLeft') {
          setGalleryActiveIndex((prev) => (prev > 0 ? prev - 1 : currentCar.gallery.length - 1));
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        if (isRtl) {
          handlePrevVehicle();
        } else {
          handleNextVehicle();
        }
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) {
          handleNextVehicle();
        } else {
          handlePrevVehicle();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isGalleryOpen, isRtl, handleNextVehicle, handlePrevVehicle, currentCar.gallery.length]);

  const openLightbox = useCallback((initialIdx: number = 0) => {
    setGalleryActiveIndex(initialIdx);
    setIsGalleryOpen(true);
  }, []);

  // Touch swipe support for mobile
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (isRtl) {
        handlePrevVehicle();
      } else {
        handleNextVehicle();
      }
    } else if (isRightSwipe) {
      if (isRtl) {
        handleNextVehicle();
      } else {
        handlePrevVehicle();
      }
    }
  };

  return (
    <section
      id="fleet"
      className="py-16 md:py-24 bg-[#0D0B0E] text-[#F7F3EE] text-start transition-colors relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Royal Luxury VIP Fleet Showcase"
    >
      {/* Background cinematic ambient warm bronze-gold glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[750px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/15 via-[#181419]/40 to-transparent blur-[160px]" />

      {/* Preload next vehicle's primary image for instantaneous transition */}
      {nextCar && (
        <link
          rel="preload"
          as="image"
          href={nextCar.gallery[0]?.src}
          key={`preload-${nextCar.id}`}
        />
      )}

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-xs font-bold text-[#DDBA8F] uppercase tracking-widest mb-3 shadow-xs">
            <Car className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span>
              {locale === 'ar'
                ? 'أسطول رويال الفاخر'
                : dict.fleet?.sectionPill || 'Royal Executive Fleet'}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#F7F3EE] tracking-tight">
            {locale === 'ar'
              ? 'اختر فئة سيارتك المفضلة'
              : dict.fleet?.heading || 'Choose Your Class'}
          </h2>
          <p className="mt-3 text-[#B9BEC8] text-base md:text-lg leading-relaxed font-light">
            {locale === 'ar'
              ? 'أسطول حديث ومصان بأعلى المعايير الملكية لكل رحلة — من استقبال المطار الفردي إلى رحلات العائلات والوفود.'
              : dict.fleet?.subtitle ||
                'A modern, immaculately maintained royal fleet for every journey — from solo airport arrivals to family delegations.'}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE LAYOUT (< 768px): EXACTLY DESIGN 03 | CINEMATIC AMBIENT REFERENCE */}
        {/* ========================================================================= */}
        <div
          className="block md:hidden max-w-md mx-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Outer Card with Glowing Bronze Frame matching Design 03 */}
          <div className="relative bg-[#131015] rounded-[28px] border-2 border-[#C5A059]/45 shadow-[0_20px_50px_rgba(0,0,0,0.95),_inset_0_0_25px_rgba(197,160,89,0.08)] p-6 overflow-hidden">
            {/* Ambient spotlight glow behind vehicle */}
            <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#C5A059]/25 via-[#C5A059]/5 to-transparent blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* 1. Star Badge at Top (Design 03) */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#1F1A21] border border-[#C5A059]/50 text-[11px] font-bold uppercase tracking-wider text-[#DDBA8F] mb-3 shadow-sm">
                <Sparkles className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
                <span>{currentCar.category[locale] || currentCar.category.en}</span>
              </div>

              {/* 2. Vehicle Name in Elegant Serif */}
              <h3 className="font-serif font-bold text-2xl text-[#F7F3EE] tracking-tight leading-snug">
                {currentCar.name[locale] || currentCar.name.en}
              </h3>

              {/* 3. Large Hero Cinematic Car Image with Ambient Spotlight */}
              <div
                className="relative w-full aspect-[16/10] my-3 flex items-center justify-center cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <Image
                  key={`mobile-car-${currentCar.id}`}
                  src={exteriorPhoto.src}
                  alt={exteriorPhoto.alt[locale] || exteriorPhoto.alt.en}
                  width={650}
                  height={400}
                  priority={activeVehicleIndex === 0}
                  sizes="100vw"
                  className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* 4. Capacity Specs ("Up to X Passengers / X Luggage") */}
              <div className="text-xs text-[#DDBA8F] font-medium tracking-wide my-1">
                {tUI.passengers.replace('{count}', String(currentCar.passengers))} /{' '}
                {tUI.luggage.replace('{count}', String(currentCar.luggage))}
              </div>

              {/* 5. Features Grid with Thin Bronze Outline Icons (Design 03) */}
              <div className="w-full my-4 grid grid-cols-2 gap-3 text-start">
                {LUXURY_FLEET_FEATURES.map((feat) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={`mob-feat-${feat.key}`}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/[0.04]"
                    >
                      <FeatIcon className="w-5 h-5 text-[#C5A059] shrink-0 stroke-[1.5]" />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-[#F7F3EE] block leading-snug">
                          {feat.title[locale] || feat.title.en}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 6. Price Block with "From" + Next-Arrow `>>` + "BOOK NOW" */}
              <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                {/* Price Display */}
                <div className="text-start shrink-0">
                  <span className="text-[11px] text-[#A69B97] block leading-none mb-0.5">
                    {tUI.from}
                  </span>
                  <span className="font-serif font-bold text-2xl text-[#DDBA8F] tracking-tight">
                    {formatPrice(currentCar.startingPriceSAR)}
                  </span>
                </div>

                {/* Next-Arrow button `>>` and Primary BOOK NOW */}
                <div className="flex items-center gap-2 flex-1 justify-end">
                  {/* Next Arrow Button */}
                  <button
                    type="button"
                    onClick={handleNextVehicle}
                    aria-label={tUI.nextVehicle}
                    className="min-h-[48px] w-12 rounded-xl bg-[#1C1820] hover:bg-[#28222D] border border-[#C5A059]/50 text-[#C5A059] flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-md"
                  >
                    {isRtl ? (
                      <ChevronsLeft className="w-5 h-5" />
                    ) : (
                      <ChevronsRight className="w-5 h-5" />
                    )}
                  </button>

                  {/* Primary BOOK NOW */}
                  <Link
                    href={`/${locale}/booking?vehicle=${currentCar.bookingVehicleId}`}
                    className="min-h-[48px] flex-1 px-5 rounded-full bg-gradient-to-r from-[#B88554] via-[#D8A572] to-[#B88554] hover:brightness-110 active:scale-[0.98] text-[#140E0A] font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A059]/30 flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
                  >
                    <span>{tUI.bookNow}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>

              {/* 7. Centered "Details & Gallery" button (Design 03) */}
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="text-xs text-[#DDBA8F] hover:text-[#E8D5B5] font-medium tracking-wide mt-3 py-2 transition-colors underline-offset-4 hover:underline"
              >
                {tUI.detailsAndGallery}
              </button>

              {/* Pagination Dots */}
              <div
                className="flex items-center justify-center gap-2 pt-2"
                role="tablist"
                aria-label="Vehicle selection"
              >
                {FLEET_SHOWCASE_VEHICLES.map((vehicle, i) => (
                  <button
                    key={`dot-m-${vehicle.id}`}
                    type="button"
                    role="tab"
                    aria-selected={activeVehicleIndex === i}
                    onClick={() => handleSelectVehicle(i)}
                    aria-label={vehicle.name[locale] || vehicle.name.en}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeVehicleIndex === i
                        ? 'w-7 bg-[#C5A059] shadow-xs shadow-[#C5A059]/50'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================================= */}
        {/* DESKTOP LAYOUT (>= 768px): EXACTLY DESIGN 14 | DESERT SAND & BRONZE TWO-PHOTO REFERENCE */}
        {/* ======================================================================================= */}
        <div className="hidden md:block">
          {/* Outer Card with Glowing Double Bronze Bezel Frame */}
          <div className="relative bg-[#151216] text-[#F7F3EE] rounded-[32px] border-2 border-[#C5A059]/50 shadow-[0_25px_60px_rgba(0,0,0,0.95),_inset_0_0_35px_rgba(197,160,89,0.08)] p-8 lg:p-11 overflow-hidden">
            {/* Ambient subtle warm bronze spotlight inside desktop card */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#C5A059]/15 via-transparent to-transparent blur-3xl" />

            <div className="relative z-10 grid grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT COLUMN (~52%): VEHICLE INFORMATION, 4 FEATURES & ACTIONS */}
              <div className="col-span-6 flex flex-col justify-between text-start space-y-6">
                <div>
                  {/* Vehicle Name in Large Editorial Serif */}
                  <h3 className="font-serif font-bold text-3xl lg:text-4xl xl:text-[44px] text-[#F0E2C8] tracking-tight leading-tight mb-4">
                    {currentCar.name[locale] || currentCar.name.en}
                  </h3>

                  {/* Vehicle Details Subtitle */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A059] block">
                      {tUI.vehicleDetails}
                    </span>
                    <div className="flex items-center gap-2.5 text-[#F7F3EE] font-bold text-base sm:text-lg">
                      <Car className="w-5 h-5 text-[#C5A059] shrink-0" />
                      <span>{currentCar.category[locale] || currentCar.category.en}</span>
                    </div>
                  </div>

                  {/* Capacity Info */}
                  <div className="flex items-center gap-3 mt-3 text-xs text-[#DDBA8F] font-medium">
                    <div className="inline-flex items-center gap-1.5 bg-white/5 border border-[#C5A059]/30 px-3 py-1 rounded-lg">
                      <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{tUI.passengers.replace('{count}', String(currentCar.passengers))}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-white/5 border border-[#C5A059]/30 px-3 py-1 rounded-lg">
                      <Briefcase className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{tUI.luggage.replace('{count}', String(currentCar.luggage))}</span>
                    </div>
                  </div>
                </div>

                {/* Thin Bronze Divider Line (Design 14) */}
                <div className="w-full h-px bg-gradient-to-r from-[#C5A059]/60 via-[#C5A059]/20 to-transparent rtl:bg-gradient-to-l" />

                {/* The 4 Features Grid (2x2 with Thin Outline Bronze Icons) */}
                <div className="grid grid-cols-2 gap-5">
                  {LUXURY_FLEET_FEATURES.map((feat) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div key={`desk-feat-${feat.key}`} className="flex items-start gap-3.5">
                        <FeatIcon className="w-6 h-6 text-[#C5A059] shrink-0 stroke-[1.5] mt-0.5" />
                        <div>
                          <span className="text-sm font-semibold text-[#F7F3EE] block leading-snug">
                            {feat.title[locale] || feat.title.en}
                          </span>
                          <span className="text-xs text-[#A69B97] block leading-tight mt-0.5">
                            {feat.subtitle[locale] || feat.subtitle.en}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Bar: Price + Pill BOOK NOW + Pill Details & Gallery */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  {/* Price */}
                  <div className="text-start shrink-0">
                    <span className="text-xs text-[#A69B97] block leading-none mb-1">
                      {tUI.from}
                    </span>
                    <span className="font-serif font-bold text-3xl lg:text-4xl text-[#DDBA8F] tracking-tight">
                      {formatPrice(currentCar.startingPriceSAR)}
                    </span>
                  </div>

                  {/* Pill Action Buttons (Design 14) */}
                  <div className="flex items-center gap-3">
                    {/* Primary BOOK NOW Pill */}
                    <Link
                      href={`/${locale}/booking?vehicle=${currentCar.bookingVehicleId}`}
                      className="min-h-[48px] px-8 rounded-full bg-gradient-to-r from-[#B88554] via-[#D8A572] to-[#B88554] hover:brightness-110 active:scale-[0.98] text-[#140E0A] font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#C5A059]/30 flex items-center justify-center gap-2 whitespace-nowrap transition-all"
                    >
                      <span>{tUI.bookNow}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>

                    {/* Secondary Details & Gallery Pill */}
                    <button
                      type="button"
                      onClick={() => openLightbox(0)}
                      className="min-h-[48px] px-6 rounded-full bg-transparent border border-[#C5A059]/60 hover:bg-[#C5A059]/15 text-[#DDBA8F] font-semibold text-xs tracking-wider transition-all flex items-center justify-center whitespace-nowrap active:scale-[0.98]"
                    >
                      {tUI.detailsAndGallery}
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (~48%): THE TWO-PHOTO LAYOUT (EXTERIOR + INTERIOR) */}
              <div className="col-span-6 flex flex-col space-y-4">
                {/* 1. TOP PHOTO: EXTERIOR */}
                <div
                  className="group relative cursor-pointer"
                  onClick={() => openLightbox(0)}
                >
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-[#C5A059]/45 shadow-2xl bg-[#0E121A] transition-all duration-300 group-hover:border-[#C5A059] group-hover:shadow-[0_0_25px_rgba(197,160,89,0.3)]">
                    <Image
                      key={`desk-ext-${currentCar.id}`}
                      src={exteriorPhoto.src}
                      alt={exteriorPhoto.alt[locale] || exteriorPhoto.alt.en}
                      fill
                      priority={activeVehicleIndex === 0}
                      sizes="500px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <span className="block text-center text-xs font-bold uppercase tracking-[0.25em] text-[#DDBA8F] mt-2 group-hover:text-[#F0E2C8] transition-colors">
                    {tUI.exteriorLabel}
                  </span>
                </div>

                {/* 2. BOTTOM PHOTO: INTERIOR */}
                <div
                  className="group relative cursor-pointer pt-1"
                  onClick={() => openLightbox(1)}
                >
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-[#C5A059]/45 shadow-2xl bg-[#0E121A] transition-all duration-300 group-hover:border-[#C5A059] group-hover:shadow-[0_0_25px_rgba(197,160,89,0.3)]">
                    <Image
                      key={`desk-int-${currentCar.id}`}
                      src={interiorPhoto.src}
                      alt={interiorPhoto.alt[locale] || interiorPhoto.alt.en}
                      fill
                      sizes="500px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <span className="block text-center text-xs font-bold uppercase tracking-[0.25em] text-[#DDBA8F] mt-2 group-hover:text-[#F0E2C8] transition-colors">
                    {tUI.interiorLabel}
                  </span>
                </div>

                {/* Carousel Navigation (Dots on Left, Circular Prev/Next on Right) */}
                <div className="flex items-center justify-between pt-2">
                  {/* Indicator Dots */}
                  <div
                    className="flex items-center gap-2"
                    role="tablist"
                    aria-label="Vehicle selection"
                  >
                    {FLEET_SHOWCASE_VEHICLES.map((vehicle, i) => (
                      <button
                        key={`dot-d-${vehicle.id}`}
                        type="button"
                        role="tab"
                        aria-selected={activeVehicleIndex === i}
                        onClick={() => handleSelectVehicle(i)}
                        aria-label={vehicle.name[locale] || vehicle.name.en}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeVehicleIndex === i
                            ? 'w-8 bg-[#C5A059] shadow-xs shadow-[#C5A059]/50'
                            : 'w-2.5 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Circular Prev/Next Vehicle Arrows */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrevVehicle}
                      aria-label={tUI.prevVehicle}
                      className="w-11 h-11 rounded-full bg-[#1F1A21] hover:bg-[#2B242E] border border-[#C5A059]/50 hover:border-[#C5A059] flex items-center justify-center text-[#DDBA8F] transition-all shadow-md active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextVehicle}
                      aria-label={tUI.nextVehicle}
                      className="w-11 h-11 rounded-full bg-gradient-to-r from-[#B88554] via-[#D8A572] to-[#B88554] hover:brightness-110 text-[#140E0A] flex items-center justify-center transition-all font-bold shadow-md shadow-[#C5A059]/30 active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LIGHTBOX MODAL: FULL RESOLUTION VEHICLE GALLERY                          */}
        {/* ========================================================================= */}
        {isGalleryOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label={`${currentCar.name[locale] || currentCar.name.en} Gallery`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="text-start">
                <span className="text-[11px] font-bold text-[#DDBA8F] uppercase tracking-wider block">
                  {currentCar.category[locale] || currentCar.category.en}
                </span>
                <h4 className="font-serif font-bold text-lg sm:text-2xl text-white">
                  {currentCar.name[locale] || currentCar.name.en}
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-white/60">
                  {galleryActiveIndex + 1} / {currentCar.gallery.length}
                </span>
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                  aria-label="Close gallery"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Active Photo View */}
            <div className="relative flex-1 w-full my-4 flex items-center justify-center overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setGalleryActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : currentCar.gallery.length - 1
                  )
                }
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
              </button>

              <div className="relative w-full h-full max-w-5xl flex items-center justify-center p-2">
                <Image
                  src={currentCar.gallery[galleryActiveIndex]?.src || exteriorPhoto.src}
                  alt={
                    currentCar.gallery[galleryActiveIndex]?.alt[locale] ||
                    currentCar.gallery[galleryActiveIndex]?.alt.en ||
                    currentCar.name.en
                  }
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setGalleryActiveIndex((prev) =>
                    prev < currentCar.gallery.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition-all"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6 rtl:rotate-180" />
              </button>
            </div>

            {/* Modal Footer (Thumbnails & Booking Action) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              {/* Thumbnails row */}
              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none">
                {currentCar.gallery.map((img, idx) => (
                  <button
                    key={`modal-thumb-${idx}`}
                    type="button"
                    onClick={() => setGalleryActiveIndex(idx)}
                    className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      galleryActiveIndex === idx
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/50 scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Book Now Action from Modal */}
              <Link
                href={`/${locale}/booking?vehicle=${currentCar.bookingVehicleId}`}
                onClick={() => setIsGalleryOpen(false)}
                className="h-11 px-6 rounded-full bg-gradient-to-r from-[#B88554] via-[#D8A572] to-[#B88554] text-[#140E0A] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 shadow-md shadow-[#C5A059]/30 hover:brightness-110 transition-all"
              >
                <span>{tUI.bookNow}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
