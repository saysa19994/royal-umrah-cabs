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
  X,
  Sparkles,
} from 'lucide-react';
import {
  FLEET_SHOWCASE_VEHICLES,
  FLEET_SHOWCASE_UI,
} from '@/data/fleet-showcase-data';

interface FleetSectionProps {
  locale: Locale;
  dict: Dictionary;
}

// Exactly 3 real, verified features as strictly mandated by user constraints
const THREE_REAL_FEATURES = [
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
];

export function FleetSection({ locale, dict }: FleetSectionProps) {
  const [activeVehicleIndex, setActiveVehicleIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
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
    exterior: FLEET_SHOWCASE_UI.exterior[locale] || FLEET_SHOWCASE_UI.exterior.en,
    insideVip: FLEET_SHOWCASE_UI.insideVip[locale] || FLEET_SHOWCASE_UI.insideVip.en,
    passengers: FLEET_SHOWCASE_UI.passengers[locale] || FLEET_SHOWCASE_UI.passengers.en,
    luggage: FLEET_SHOWCASE_UI.luggage[locale] || FLEET_SHOWCASE_UI.luggage.en,
    prevVehicle: FLEET_SHOWCASE_UI.prevVehicle[locale] || FLEET_SHOWCASE_UI.prevVehicle.en,
    nextVehicle: FLEET_SHOWCASE_UI.nextVehicle[locale] || FLEET_SHOWCASE_UI.nextVehicle.en,
    vehicleDetails: locale === 'ar' ? 'تفاصيل المركبة' : 'VEHICLE DETAILS',
  };

  const totalVehicles = FLEET_SHOWCASE_VEHICLES.length;
  const currentCar = FLEET_SHOWCASE_VEHICLES[activeVehicleIndex] || FLEET_SHOWCASE_VEHICLES[0];
  const nextCar = FLEET_SHOWCASE_VEHICLES[(activeVehicleIndex + 1) % totalVehicles];
  const activeImage = currentCar.gallery[activeImageIndex] || currentCar.gallery[0];

  const exteriorIndex = currentCar.gallery.findIndex((img) => img.type === 'exterior');
  const interiorIndex = currentCar.gallery.findIndex((img) => img.type === 'interior');
  const isInteriorActive = activeImage.type === 'interior';
  const isExteriorActive = !isInteriorActive;

  // Infinite carousel navigation
  const handlePrevVehicle = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev > 0 ? prev - 1 : totalVehicles - 1));
    setActiveImageIndex(0);
  }, [totalVehicles]);

  const handleNextVehicle = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev < totalVehicles - 1 ? prev + 1 : 0));
    setActiveImageIndex(0);
  }, [totalVehicles]);

  const handleSelectVehicle = useCallback((index: number) => {
    setActiveVehicleIndex(index);
    setActiveImageIndex(0);
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

  // Gallery view switcher
  const handleSelectImage = useCallback((index: number) => {
    setActiveImageIndex(index);
  }, []);

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
      className="py-16 md:py-24 bg-[#0B1220] text-[#F7F5EF] text-start transition-colors relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Royal Luxury VIP Fleet Showcase"
    >
      {/* Background cinematic ambient warm gold glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[650px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-[#101726]/40 to-transparent blur-[140px]" />

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3 shadow-xs">
            <Car className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>
              {locale === 'ar'
                ? 'أسطول رويال الفاخر'
                : dict.fleet?.sectionPill || 'Royal Executive Fleet'}
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-[#F7F5EF] tracking-tight">
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

        {/* ======================================================== */}
        {/* MOBILE LAYOUT (< 768px): STRICTLY DESIGN 03 CINEMATIC   */}
        {/* ======================================================== */}
        <div
          className="block md:hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative bg-[#0B1220]/95 rounded-[24px] border border-[#D4AF37]/35 shadow-2xl shadow-black/80 p-5 overflow-hidden">
            {/* Subtle cinematic spotlight overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              {/* 1. Star Badge at Top */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                <Sparkles className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                <span>{currentCar.category[locale] || currentCar.category.en}</span>
              </div>

              {/* 2. Vehicle Name in Elegant Serif */}
              <h3 className="font-display font-bold text-2xl text-[#F7F5EF] tracking-tight leading-tight">
                {currentCar.name[locale] || currentCar.name.en}
              </h3>

              {/* 3. Large Car Image with Cinematic Spotlight Backdrop */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#131A2B] via-[#0E1524] to-[#0B1220] flex items-center justify-center shadow-inner group">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#121A2B]/40 to-transparent blur-md" />
                <div className="relative w-full h-full p-2 flex items-center justify-center">
                  <Image
                    key={`mobile-${currentCar.id}-${activeImage.src}`}
                    src={activeImage.src}
                    alt={activeImage.alt[locale] || activeImage.alt.en}
                    width={700}
                    height={440}
                    priority={activeVehicleIndex === 0}
                    sizes="100vw"
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
                  />
                </div>

                {/* Floating Exterior / Inside VIP switcher on mobile */}
                <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 z-20 flex items-center bg-black/60 backdrop-blur-md p-1 rounded-lg border border-white/15 text-[11px]">
                  {exteriorIndex >= 0 && (
                    <button
                      type="button"
                      onClick={() => handleSelectImage(exteriorIndex)}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                        isExteriorActive
                          ? 'bg-[#D4AF37] text-[#0A0D14]'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {tUI.exterior}
                    </button>
                  )}
                  {interiorIndex >= 0 && (
                    <button
                      type="button"
                      onClick={() => handleSelectImage(interiorIndex)}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                        isInteriorActive
                          ? 'bg-[#D4AF37] text-[#0A0D14]'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {tUI.insideVip}
                    </button>
                  )}
                </div>
              </div>

              {/* 4. Capacity Specs ("Up to X Passengers / X Luggage") */}
              <div className="inline-flex items-center gap-2 text-xs text-[#E8D39A] font-medium pt-1">
                <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{tUI.passengers.replace('{count}', String(currentCar.passengers))}</span>
                <span className="text-white/30">/</span>
                <Briefcase className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{tUI.luggage.replace('{count}', String(currentCar.luggage))}</span>
              </div>

              {/* 5. The Three Real Features Only (First-Class Climate, Executive Chauffeur, Nappa Leather) */}
              <div className="w-full pt-1">
                {/* Row 1: Two features side by side */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {THREE_REAL_FEATURES.slice(0, 2).map((feat) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div
                        key={feat.key}
                        className="p-2.5 rounded-xl bg-[#121927] border border-white/5 flex items-center gap-2.5 text-start"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#182236] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
                          <FeatIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-semibold text-[#F7F5EF] block truncate leading-snug">
                            {feat.title[locale] || feat.title.en}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Row 2: Third feature centered */}
                <div className="pt-2 w-full">
                  {(() => {
                    const feat = THREE_REAL_FEATURES[2];
                    const FeatIcon = feat.icon;
                    return (
                      <div
                        key={feat.key}
                        className="p-2.5 rounded-xl bg-[#121927] border border-white/5 flex items-center justify-center gap-2.5 text-center"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#182236] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
                          <FeatIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-[#F7F5EF] truncate">
                          {feat.title[locale] || feat.title.en}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* 6. Price & Action Block with NEXT ARROW & BOOK NOW */}
              <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                {/* Price Display */}
                <div className="text-start shrink-0">
                  <span className="text-[11px] text-[#B9BEC8] block leading-none mb-1">
                    {tUI.from}
                  </span>
                  <span className="font-display font-bold text-2xl text-[#D4AF37] tracking-tight">
                    {formatPrice(currentCar.startingPriceSAR)}
                  </span>
                </div>

                {/* Next Arrow and BOOK NOW button */}
                <div className="flex items-center gap-2 flex-1 justify-end">
                  {/* Next Vehicle Arrow Button */}
                  <button
                    type="button"
                    onClick={handleNextVehicle}
                    aria-label={tUI.nextVehicle}
                    className="min-h-[48px] w-12 rounded-xl bg-[#141B28] hover:bg-[#1E273A] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center transition-all active:scale-95 shrink-0"
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
                    className="min-h-[48px] flex-1 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] hover:brightness-105 active:scale-[0.98] text-[#0A0D14] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
                  >
                    <span>{tUI.bookNow}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>

              {/* 7. Secondary "Details & Gallery" button */}
              <div className="w-full pt-1">
                <button
                  type="button"
                  onClick={() => openLightbox(0)}
                  className="min-h-[48px] w-full rounded-xl bg-transparent border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 text-[#E8D39A] font-semibold text-xs tracking-wider transition-all flex items-center justify-center"
                >
                  {tUI.detailsAndGallery}
                </button>
              </div>

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
                        ? 'w-7 bg-[#D4AF37] shadow-xs shadow-[#D4AF37]/50'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP LAYOUT (>= 768px): TWO COLUMNS (DESIGN 14 STYLE) */}
        {/* ======================================================== */}
        <div className="hidden md:block">
          <div className="relative bg-[#0B1220]/95 rounded-[24px] border border-[#D4AF37]/35 shadow-2xl shadow-black/80 p-8 lg:p-10 overflow-hidden">
            {/* Ambient subtle spotlight inside desktop card */}
            <div className="pointer-events-none absolute -top-20 -right-20 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent blur-3xl" />

            <div className="relative z-10 grid grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* LEFT COLUMN (~46%): DETAILS, 3 REAL FEATURES & BOOKING ACTIONS */}
              <div className="col-span-5 flex flex-col justify-between text-start space-y-5">
                {/* Category & Name */}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-2.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                    <span>{currentCar.category[locale] || currentCar.category.en}</span>
                  </div>

                  <h3 className="font-display font-bold text-3xl lg:text-4xl text-[#F7F5EF] tracking-tight leading-tight">
                    {currentCar.name[locale] || currentCar.name.en}
                  </h3>

                  {/* Passengers & Luggage Capacity Specs */}
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#F7F5EF]/90">
                    <div className="inline-flex items-center gap-2 bg-[#121927] border border-white/10 px-3.5 py-1.5 rounded-xl">
                      <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{tUI.passengers.replace('{count}', String(currentCar.passengers))}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-[#121927] border border-white/10 px-3.5 py-1.5 rounded-xl">
                      <Briefcase className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{tUI.luggage.replace('{count}', String(currentCar.luggage))}</span>
                    </div>
                  </div>
                </div>

                {/* Thin Gold Decorative Divider */}
                <div className="w-full h-px bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37]/15 to-transparent my-2 rtl:bg-gradient-to-l" />

                {/* The Three Real Features (Grid Layout) */}
                <div className="grid grid-cols-1 gap-2.5">
                  {THREE_REAL_FEATURES.map((feat) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div
                        key={`desk-${feat.key}`}
                        className="p-3 rounded-xl bg-[#121927] border border-white/5 hover:border-[#D4AF37]/30 transition-colors flex items-center gap-3.5"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#182236] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
                          <FeatIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1 text-start">
                          <span className="text-xs sm:text-sm font-semibold text-[#F7F5EF] block leading-snug">
                            {feat.title[locale] || feat.title.en}
                          </span>
                          <span className="text-[11px] text-[#8E97A8] block leading-tight mt-0.5">
                            {feat.subtitle[locale] || feat.subtitle.en}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price & Primary/Secondary CTA Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-[#B9BEC8] font-normal">{tUI.from}</span>
                    <span className="font-display font-bold text-3xl text-[#D4AF37] tracking-tight">
                      {formatPrice(currentCar.startingPriceSAR)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Primary Solid Gold Button */}
                    <Link
                      href={`/${locale}/booking?vehicle=${currentCar.bookingVehicleId}`}
                      className="min-h-[48px] flex-1 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] hover:brightness-105 active:scale-[0.98] text-[#0A0D14] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 flex items-center justify-center gap-2 text-center whitespace-nowrap transition-all"
                    >
                      <span>{tUI.bookNow}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>

                    {/* Secondary Gold Outline Button */}
                    <button
                      type="button"
                      onClick={() => openLightbox(0)}
                      className="min-h-[48px] px-5 rounded-xl bg-transparent border border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 text-[#F7F5EF] font-semibold text-xs transition-all flex items-center justify-center whitespace-nowrap active:scale-[0.98]"
                    >
                      {tUI.detailsAndGallery}
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (~54%): CINEMATIC IMAGE SHOWCASE & CONTROLS */}
              <div className="col-span-7 flex flex-col space-y-4">
                {/* Showcase Container */}
                <div className="relative aspect-[16/10] bg-gradient-to-b from-[#131A2B] via-[#0E1524] to-[#0B1220] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group select-none">
                  {/* Ambient spotlight glow behind car */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#121A2B]/40 to-transparent blur-md" />

                  {/* Floating Exterior vs Inside VIP Toggle */}
                  <div className="absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 z-20 flex items-center bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/15 text-xs shadow-lg">
                    {exteriorIndex >= 0 && (
                      <button
                        type="button"
                        onClick={() => handleSelectImage(exteriorIndex)}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                          isExteriorActive
                            ? 'bg-[#D4AF37] text-[#0A0D14] shadow-xs'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {tUI.exterior}
                      </button>
                    )}
                    {interiorIndex >= 0 && (
                      <button
                        type="button"
                        onClick={() => handleSelectImage(interiorIndex)}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                          isInteriorActive
                            ? 'bg-[#D4AF37] text-[#0A0D14] shadow-xs'
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {tUI.insideVip}
                      </button>
                    )}
                  </div>

                  {/* Image Counter (e.g., 01 / 07) */}
                  <div className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 z-20 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-white/90 shadow-lg">
                    <span className="text-[#D4AF37] font-bold">
                      {String(activeVehicleIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/40 mx-1">/</span>
                    <span className="text-white/80">
                      {String(totalVehicles).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Hero Vehicle Image */}
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <Image
                      key={`desktop-${currentCar.id}-${activeImage.src}`}
                      src={activeImage.src}
                      alt={activeImage.alt[locale] || activeImage.alt.en}
                      width={800}
                      height={500}
                      priority={activeVehicleIndex === 0}
                      sizes="(max-width: 1024px) 50vw, 750px"
                      className="w-full h-full object-contain transition-all duration-500 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                {/* Thumbnails Strip */}
                {currentCar.gallery.length > 1 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none pt-1">
                    {currentCar.gallery.map((item, imgIdx) => (
                      <button
                        key={`thumb-${imgIdx}`}
                        type="button"
                        onClick={() => handleSelectImage(imgIdx)}
                        aria-label={item.label[locale] || item.label.en}
                        className={`relative w-20 h-13 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                          activeImageIndex === imgIdx
                            ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 scale-105 shadow-md'
                            : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/30'
                        }`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt[locale] || item.alt.en}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Vehicle Navigation Carousel Controls (Dots + Circular Next/Prev Buttons) */}
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
                            ? 'w-8 bg-[#D4AF37] shadow-xs shadow-[#D4AF37]/50'
                            : 'w-2.5 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Circular Prev & Next Buttons (Prev Dark with Gold Outline, Next Solid Gold) */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrevVehicle}
                      aria-label={tUI.prevVehicle}
                      className="w-11 h-11 rounded-full bg-[#141B28] hover:bg-[#1E273A] border border-[#D4AF37]/50 hover:border-[#D4AF37] flex items-center justify-center text-[#D4AF37] transition-all shadow-md active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextVehicle}
                      aria-label={tUI.nextVehicle}
                      className="w-11 h-11 rounded-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#0A0D14] flex items-center justify-center transition-all font-bold shadow-md shadow-[#D4AF37]/30 active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LIGHTBOX MODAL: FULL RESOLUTION VEHICLE GALLERY         */}
        {/* ======================================================== */}
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
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                  {currentCar.category[locale] || currentCar.category.en}
                </span>
                <h4 className="font-display font-bold text-lg sm:text-2xl text-white">
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
                  src={currentCar.gallery[galleryActiveIndex]?.src || activeImage.src}
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
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-105'
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
                className="h-11 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-[#0A0D14] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 shadow-md shadow-[#D4AF37]/30 hover:brightness-105 transition-all"
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
