'use client';

import React, { useState, useCallback } from 'react';
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
  ArrowRight,
  Wind,
  Armchair,
  UserCheck,
  Droplets,
  VolumeX,
  Sliders,
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

function getFeatureIcon(icon: string) {
  switch (icon) {
    case 'climate':
      return Wind;
    case 'leather':
      return Armchair;
    case 'chauffeur':
      return UserCheck;
    case 'zamzam':
      return Droplets;
    case 'trunk':
      return Briefcase;
    case 'recline':
      return Armchair;
    case 'doors':
      return Sliders;
    case 'group':
      return Users;
    case 'silence':
      return VolumeX;
    default:
      return Sparkles;
  }
}

export function FleetSection({ locale, dict }: FleetSectionProps) {
  const [activeVehicleIndex, setActiveVehicleIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
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
    of: FLEET_SHOWCASE_UI.of[locale] || FLEET_SHOWCASE_UI.of.en,
  };

  const currentCar = FLEET_SHOWCASE_VEHICLES[activeVehicleIndex] || FLEET_SHOWCASE_VEHICLES[0];
  const activeImage = currentCar.gallery[activeImageIndex] || currentCar.gallery[0];

  const exteriorIndex = currentCar.gallery.findIndex((img) => img.type === 'exterior');
  const interiorIndex = currentCar.gallery.findIndex((img) => img.type === 'interior');
  const isInteriorActive = activeImage.type === 'interior';
  const isExteriorActive = !isInteriorActive;

  // Level A: Vehicle Navigation (resets activeImage to 0)
  const handlePrevVehicle = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev > 0 ? prev - 1 : FLEET_SHOWCASE_VEHICLES.length - 1));
    setActiveImageIndex(0);
  }, []);

  const handleNextVehicle = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev < FLEET_SHOWCASE_VEHICLES.length - 1 ? prev + 1 : 0));
    setActiveImageIndex(0);
  }, []);

  const handleSelectVehicle = useCallback((index: number) => {
    setActiveVehicleIndex(index);
    setActiveImageIndex(0);
  }, []);

  // Keyboard navigation for vehicle switching
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
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
    },
    [isRtl, handleNextVehicle, handlePrevVehicle]
  );

  // Level B: Image Gallery Navigation (keeps selected vehicle intact)
  const handleSelectImage = useCallback((index: number) => {
    setActiveImageIndex(index);
  }, []);

  // Touch Swipe for mobile vehicle switching
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
      className="py-16 md:py-24 bg-[#090B10] text-[#F7F5EF] text-start transition-colors relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Royal Luxury VIP Fleet Showcase"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Subtle background ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#D6AF45]/10 via-[#D6AF45]/5 to-transparent blur-[140px]" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D6AF45]/15 border border-[#D6AF45]/40 text-xs font-bold text-[#E8D39A] uppercase tracking-widest mb-3 shadow-xs">
            <Car className="w-3.5 h-3.5 text-[#D6AF45] shrink-0" />
            <span>
              {locale === 'ar'
                ? 'أسطول رويال الفاخر'
                : dict.fleet?.sectionPill || 'Royal Executive Fleet'}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#F7F5EF] tracking-tight">
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

        {/* CONCEPT 01: ROYAL LUXURY BESPOKE SHOWCASE CARD */}
        <div className="relative bg-gradient-to-b from-[#121722] to-[#0D111A] text-[#F7F5EF] rounded-2xl lg:rounded-3xl border border-[#D6AF45]/30 shadow-2xl p-5 sm:p-8 lg:p-9 overflow-hidden">
          {/* Bespoke Fine Metallic-Gold Geometric Corner Accents */}
          <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t border-l border-[#D6AF45]/60" />
          <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t border-r border-[#D6AF45]/60" />
          <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#D6AF45]/60" />
          <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#D6AF45]/60" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
            {/* COLUMN 1: VEHICLE INFORMATION & ACTIONS (Desktop ~45%, Mobile Second) */}
            <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between text-start">
              {/* 1. Category Pill Label */}
              <div>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#D6AF45]/15 border border-[#D6AF45]/45 text-[11px] font-bold uppercase tracking-wider text-[#E8D39A]">
                  {currentCar.category[locale] || currentCar.category.en}
                </span>

                {/* 2. Prominent Vehicle Name (Editorial Serif) */}
                <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-[36px] text-[#F7F5EF] tracking-tight leading-tight mt-2.5">
                  {currentCar.name[locale] || currentCar.name.en}
                </h3>

                {/* 3. Passenger Capacity and Luggage Capacity Specs */}
                <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs sm:text-sm text-[#F7F5EF]/90">
                  <div className="inline-flex items-center gap-2 bg-[#141B29] border border-white/10 px-3.5 py-1.5 rounded-xl">
                    <Users className="w-4 h-4 text-[#D6AF45] shrink-0" />
                    <span>
                      {tUI.passengers.replace('{count}', String(currentCar.passengers))}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[#141B29] border border-white/10 px-3.5 py-1.5 rounded-xl">
                    <Briefcase className="w-4 h-4 text-[#D6AF45] shrink-0" />
                    <span>
                      {tUI.luggage.replace('{count}', String(currentCar.luggage))}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Thin Gold Divider / Restrained Decorative Separator */}
              <div className="w-full h-px bg-gradient-to-r from-[#D6AF45]/40 via-[#D6AF45]/15 to-transparent my-4 sm:my-5 rtl:bg-gradient-to-l" />

              {/* 5. Available Vehicle Amenities with Consistent Understated Icons */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {currentCar.features.map((feat, idx) => {
                  const FeatIcon = getFeatureIcon(feat.icon);
                  return (
                    <div
                      key={idx}
                      className="p-2.5 sm:p-3 rounded-xl bg-[#141B28]/90 border border-white/5 hover:border-[#D6AF45]/30 transition-colors flex items-center gap-2.5 sm:gap-3"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#192233] border border-[#D6AF45]/20 text-[#D6AF45] flex items-center justify-center shrink-0">
                        <FeatIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1 text-start">
                        <span className="text-xs font-bold text-white block truncate leading-snug">
                          {feat.title[locale] || feat.title.en}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#B9BEC8] block truncate leading-tight mt-0.5">
                          {feat.desc[locale] || feat.desc.en}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 6. Applicable Price & 7. Primary BOOK NOW & 8. Secondary DETAILS & GALLERY */}
              <div className="pt-5 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Price Display */}
                <div className="text-start shrink-0">
                  <span className="text-[10px] uppercase tracking-widest text-[#D6AF45] block font-bold">
                    {tUI.startingPrice}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xs text-[#B9BEC8] font-normal">{tUI.from}</span>
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-[#E8D39A] tracking-tight">
                      {formatPrice(currentCar.startingPriceSAR)}
                    </span>
                  </div>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-1 sm:flex-initial justify-end">
                  {/* Secondary DETAILS & GALLERY */}
                  <Link
                    href={`/${locale}/fleet/${currentCar.slug}`}
                    className="flex-1 sm:flex-initial h-11 sm:h-12 px-4 sm:px-5 rounded-xl bg-[#141B28] hover:bg-[#1E273A] text-[#F7F5EF] font-medium text-xs border border-white/15 hover:border-[#D6AF45]/40 transition-all flex items-center justify-center text-center whitespace-nowrap active:scale-[0.98]"
                  >
                    {tUI.detailsAndGallery}
                  </Link>

                  {/* Primary BOOK NOW */}
                  <Link
                    href={`/${locale}/booking?vehicle=${currentCar.bookingVehicleId}`}
                    className="flex-1 sm:flex-initial h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-[#D6AF45] via-[#E8D39A] to-[#D6AF45] hover:brightness-105 active:scale-[0.98] text-[#0A0D14] font-bold text-xs uppercase tracking-wider shadow-md shadow-[#D6AF45]/20 hover:shadow-lg hover:shadow-[#D6AF45]/35 transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
                  >
                    <span>{tUI.bookNow}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>

            {/* COLUMN 2: AUTOMOTIVE CINEMATIC SHOWCASE (Desktop ~55%, Mobile First) */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col space-y-3 sm:space-y-4">
              {/* MAIN CINEMATIC VEHICLE SHOWCASE CONTAINER */}
              <div
                className="relative aspect-[16/10] sm:aspect-[16/10] bg-[#0E1422] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl group select-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* Floating Exterior vs Inside VIP Switcher (Level B Gallery Control) */}
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-20 flex items-center bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/15 text-xs shadow-lg">
                  {exteriorIndex >= 0 && (
                    <button
                      type="button"
                      onClick={() => handleSelectImage(exteriorIndex)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                        isExteriorActive
                          ? 'bg-[#D6AF45] text-[#0A0D14] shadow-xs'
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
                          ? 'bg-[#D6AF45] text-[#0A0D14] shadow-xs'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tUI.insideVip}
                    </button>
                  )}
                </div>

                {/* Discreet Vehicle Position Indicator (Level A Vehicle Counter) */}
                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-20 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-white/90 shadow-lg">
                  <span className="text-[#D6AF45] font-bold">
                    {String(activeVehicleIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/40 mx-1">/</span>
                  <span className="text-white/80">
                    {String(FLEET_SHOWCASE_VEHICLES.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Hero Vehicle Image — Fill & High Presence */}
                <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
                  <Image
                    key={`${currentCar.id}-${activeImage.src}`}
                    src={activeImage.src}
                    alt={activeImage.alt[locale] || activeImage.alt.en}
                    width={800}
                    height={500}
                    priority={activeVehicleIndex === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 750px"
                    className="w-full h-full object-contain transition-all duration-500 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* THUMBNAIL STRIP (Level B: Gallery Previews) */}
              {currentCar.gallery.length > 1 && (
                <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none pt-1">
                  {currentCar.gallery.map((item, imgIdx) => (
                    <button
                      key={imgIdx}
                      type="button"
                      onClick={() => handleSelectImage(imgIdx)}
                      aria-label={item.label[locale] || item.label.en}
                      className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === imgIdx
                          ? 'border-[#D6AF45] ring-2 ring-[#D6AF45]/40 scale-105 shadow-md'
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

              {/* LEVEL A VEHICLE CONTROLS (PAGINATION DOTS & CIRCULAR ARROWS) */}
              <div className="flex items-center justify-between pt-2">
                {/* Vehicle Indicator Dots */}
                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Vehicle selection"
                >
                  {FLEET_SHOWCASE_VEHICLES.map((vehicle, i) => (
                    <button
                      key={vehicle.id}
                      type="button"
                      role="tab"
                      aria-selected={activeVehicleIndex === i}
                      onClick={() => handleSelectVehicle(i)}
                      aria-label={vehicle.name[locale] || vehicle.name.en}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeVehicleIndex === i
                          ? 'w-8 bg-[#D6AF45] shadow-xs shadow-[#D6AF45]/50'
                          : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Circular Prev & Next Vehicle Navigation Arrows */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handlePrevVehicle}
                    aria-label={tUI.prevVehicle}
                    className="w-11 h-11 rounded-full bg-[#141B29] hover:bg-[#1E2738] border border-white/15 hover:border-[#D6AF45]/40 flex items-center justify-center text-white transition-all shadow-sm active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextVehicle}
                    aria-label={tUI.nextVehicle}
                    className="w-11 h-11 rounded-full bg-[#D6AF45] hover:bg-[#E5C158] text-[#0A0D14] flex items-center justify-center transition-all font-bold shadow-md shadow-[#D6AF45]/25 active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
