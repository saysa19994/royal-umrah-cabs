'use client';

import React, { useState, useCallback, useId } from 'react';
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
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#D6AF45]/10 via-[#D6AF45]/5 to-transparent blur-[120px]" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* CONCEPT 01: ROYAL LUXURY FEATURED CARD */}
        <div className="relative bg-[#10141D] text-[#F7F5EF] rounded-[28px] sm:rounded-[36px] border border-[#D6AF45]/35 shadow-2xl p-5 sm:p-8 lg:p-10 overflow-hidden">
          {/* Subtle corner ornamental highlights */}
          <div className="pointer-events-none absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#D6AF45]/20 to-transparent rounded-tl-[36px]" />
          <div className="pointer-events-none absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#D6AF45]/15 to-transparent rounded-br-[36px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* COLUMN 1 (DESKTOP LEFT ~45%, MOBILE SECOND): VEHICLE INFORMATION & ACTIONS */}
            <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col space-y-5 text-start">
              {/* Category Pill & Serif Title */}
              <div>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#D6AF45]/15 border border-[#D6AF45]/45 text-[11px] font-bold uppercase tracking-wider text-[#E8D39A] mb-2.5">
                  {currentCar.category[locale] || currentCar.category.en}
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-[38px] text-[#F7F5EF] tracking-tight leading-tight">
                  {currentCar.name[locale] || currentCar.name.en}
                </h3>

                {/* Capacity Badges */}
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

              {/* Narrative Description */}
              <p className="text-xs sm:text-sm text-[#B9BEC8] font-normal leading-relaxed line-clamp-2">
                {currentCar.desc[locale] || currentCar.desc.en}
              </p>

              {/* 2x2 LUXURY AMENITIES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {currentCar.features.map((feat, idx) => {
                  const FeatIcon = getFeatureIcon(feat.icon);
                  return (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-2xl bg-[#131926] border border-white/10 hover:border-[#D6AF45]/40 transition-colors flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-[#D6AF45] flex items-center justify-center shrink-0">
                        <FeatIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1 text-start">
                        <span className="text-xs font-bold text-white block truncate">
                          {feat.title[locale] || feat.title.en}
                        </span>
                        <span className="text-[11px] text-[#B9BEC8] block truncate">
                          {feat.desc[locale] || feat.desc.en}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* STARTING PRICE & ACTION BUTTONS */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="text-start">
                  <span className="text-[10px] uppercase tracking-widest text-[#D6AF45] block font-bold mb-0.5">
                    {tUI.startingPrice}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-[#B9BEC8] font-medium">{tUI.from}</span>
                    <span className="font-serif font-extrabold text-2xl sm:text-3xl text-[#D6AF45] tracking-tight">
                      {formatPrice(currentCar.startingPriceSAR)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Link
                    href={`/${locale}/fleet/${currentCar.slug}`}
                    className="flex-1 sm:flex-initial h-11 sm:h-12 px-4 sm:px-5 rounded-xl bg-[#182030] hover:bg-[#202B40] text-white font-bold text-xs border border-white/15 hover:border-[#D6AF45]/40 transition-all flex items-center justify-center text-center whitespace-nowrap"
                  >
                    {tUI.detailsAndGallery}
                  </Link>
                  <Link
                    href={`/${locale}/booking?vehicle=${currentCar.bookingVehicleId}`}
                    className="flex-1 sm:flex-initial h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-[#D6AF45] via-[#E8D39A] to-[#D6AF45] hover:brightness-110 active:scale-[0.98] text-[#0A0D14] font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#D6AF45]/25 transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
                  >
                    <span>{tUI.bookNow}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>

            {/* COLUMN 2 (MOBILE FIRST, DESKTOP RIGHT ~55%): AUTOMOTIVE SHOWCASE */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col space-y-3 sm:space-y-4">
              {/* MAIN AUTOMOTIVE IMAGE CONTAINER WITH VIP TOGGLE & GESTURE SWIPE */}
              <div
                className="relative aspect-[16/10] sm:aspect-[16/10] bg-[#0E1422] rounded-3xl border border-white/10 p-4 sm:p-6 flex items-center justify-center overflow-hidden shadow-2xl group select-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* Floating Exterior vs Inside VIP Switcher (Level B Gallery Control) */}
                <div className="absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 z-20 flex items-center bg-[#090D17]/90 backdrop-blur-md p-1 rounded-xl border border-white/15 text-xs shadow-md">
                  {exteriorIndex >= 0 && (
                    <button
                      type="button"
                      onClick={() => handleSelectImage(exteriorIndex)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                        isExteriorActive
                          ? 'bg-[#D6AF45] text-[#0A0D14] shadow-xs'
                          : 'text-white/75 hover:text-white hover:bg-white/10'
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
                          : 'text-white/75 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tUI.insideVip}
                    </button>
                  )}
                </div>

                {/* Counter Pill (Level A Vehicle Position) */}
                <div className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 z-20 px-3 py-1 rounded-lg bg-[#090D17]/90 backdrop-blur-md border border-white/15 text-xs font-mono text-white/90 shadow-md">
                  <span className="text-[#D6AF45] font-bold">
                    {String(activeVehicleIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/40 mx-1">/</span>
                  <span>{String(FLEET_SHOWCASE_VEHICLES.length).padStart(2, '0')}</span>
                </div>

                {/* Active High-Resolution Vehicle Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    key={`${currentCar.id}-${activeImage.src}`}
                    src={activeImage.src}
                    alt={activeImage.alt[locale] || activeImage.alt.en}
                    width={700}
                    height={420}
                    priority={activeVehicleIndex === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 650px"
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
                          ? 'border-[#D6AF45] ring-2 ring-[#D6AF45]/40 scale-105'
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
