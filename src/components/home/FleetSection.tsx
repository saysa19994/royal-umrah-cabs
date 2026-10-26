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
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
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

  const currentCar = FLEET_SHOWCASE_VEHICLES[activeVehicleIndex];
  const activeImage = currentCar.gallery[activeImageIndex] || currentCar.gallery[0];

  const exteriorIndex = currentCar.gallery.findIndex((img) => img.type === 'exterior');
  const interiorIndex = currentCar.gallery.findIndex((img) => img.type === 'interior');
  const isInteriorActive = activeImage.type === 'interior';
  const isExteriorActive = !isInteriorActive;

  const handlePrev = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev > 0 ? prev - 1 : FLEET_SHOWCASE_VEHICLES.length - 1));
    setActiveImageIndex(0);
  }, []);

  const handleNext = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev < FLEET_SHOWCASE_VEHICLES.length - 1 ? prev + 1 : 0));
    setActiveImageIndex(0);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (isRtl) {
          handlePrev();
        } else {
          handleNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    },
    [isRtl, handleNext, handlePrev]
  );

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
        handlePrev();
      } else {
        handleNext();
      }
    } else if (isRightSwipe) {
      if (isRtl) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section
      id="fleet"
      className="py-16 md:py-24 bg-alabaster border-t border-border text-start transition-colors"
      role="region"
      aria-roledescription="carousel"
      aria-label="VIP Vehicle Fleet Showcase"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3 shadow-xs">
            <Car className="w-3.5 h-3.5 text-gold-dark shrink-0" />
            <span>
              {locale === 'ar'
                ? 'أسطول رويال الفاخر'
                : dict.fleet?.sectionPill || 'Royal Executive Fleet'}
            </span>
          </div>
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {locale === 'ar'
              ? 'اختر فئة سيارتك المفضلة'
              : dict.fleet?.heading || 'Choose Your Class'}
          </h2>
          <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            {locale === 'ar'
              ? 'أسطول حديث ومصان بأعلى المعايير لكل رحلة — من استقبال المطار الفردي إلى رحلات العائلات الكبيرة والأفواج.'
              : dict.fleet?.subtitle ||
                'A modern, immaculately maintained fleet for every journey — from solo airport runs to family pilgrimages.'}
          </p>
        </div>

        {/* FEATURED VIP SHOWCASE CARD */}
        <div className="relative bg-gradient-to-br from-[#0B111E] via-[#0F172A] to-[#0B111E] text-white rounded-3xl border border-gold/30 shadow-2xl p-5 sm:p-8 lg:p-12 overflow-hidden">
          {/* Atmospheric ambient lighting glows */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* COLUMN 1 (DESKTOP LEFT, MOBILE SECOND): VEHICLE SPECS & ACTIONS */}
            <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col space-y-6 text-start">
              {/* Category & Name */}
              <div>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-[11px] font-bold uppercase tracking-wider text-gold mb-3">
                  {currentCar.category[locale] || currentCar.category.en}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                  {currentCar.name[locale] || currentCar.name.en}
                </h3>

                {/* Capacity Badges */}
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm text-white/80">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                    <Users className="w-4 h-4 text-gold shrink-0" />
                    <span>
                      {tUI.passengers.replace('{count}', String(currentCar.passengers))}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                    <Briefcase className="w-4 h-4 text-gold shrink-0" />
                    <span>
                      {tUI.luggage.replace('{count}', String(currentCar.luggage))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vehicle Narrative Description */}
              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {currentCar.desc[locale] || currentCar.desc.en}
              </p>

              {/* 2x2 LUXURY AMENITIES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {currentCar.features.map((feat, idx) => {
                  const FeatIcon = getFeatureIcon(feat.icon);
                  return (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-gold/30 transition-colors flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/25 text-gold flex items-center justify-center shrink-0">
                        <FeatIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1 text-start">
                        <span className="text-xs font-bold text-white block truncate">
                          {feat.title[locale] || feat.title.en}
                        </span>
                        <span className="text-[11px] text-white/60 block truncate">
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
                  <span className="text-[10px] uppercase tracking-widest text-white/50 block font-semibold mb-0.5">
                    {tUI.startingPrice}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-white/60">{tUI.from}</span>
                    <span className="font-display font-bold text-2xl sm:text-3xl text-gold">
                      {formatPrice(currentCar.startingPriceSAR)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Link
                    href={`/${locale}/fleet/${currentCar.slug}`}
                    className="flex-1 sm:flex-initial h-11 sm:h-12 px-4 sm:px-5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/20 hover:border-gold/40 transition-all flex items-center justify-center text-center whitespace-nowrap"
                  >
                    {tUI.detailsAndGallery}
                  </Link>
                  <Link
                    href={`/${locale}/booking?vehicle=${currentCar.bookingVehicleId}`}
                    className="flex-1 sm:flex-initial h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-gold via-gold-hover to-gold text-ink font-bold text-xs uppercase tracking-wider shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 text-center whitespace-nowrap"
                  >
                    <span>{tUI.bookNow}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>

            {/* COLUMN 2 (MOBILE FIRST, DESKTOP RIGHT): AUTOMOTIVE SHOWCASE */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col space-y-4">
              {/* MAIN IMAGE CONTAINER WITH GESTURE SWIPE & VIP TOGGLE */}
              <div
                className="relative aspect-[16/10] sm:aspect-[16/10] bg-gradient-to-b from-[#131C2E]/80 via-[#0E1626]/90 to-[#0A0F1D] rounded-2xl border border-gold/25 p-4 sm:p-6 flex items-center justify-center overflow-hidden shadow-2xl group select-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* Floating Exterior vs Inside VIP Switcher */}
                <div className="absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 z-20 flex items-center bg-black/60 backdrop-blur-md p-1 rounded-xl border border-white/15 text-xs shadow-md">
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex(exteriorIndex >= 0 ? exteriorIndex : 0)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                      isExteriorActive
                        ? 'bg-gradient-to-r from-gold to-gold-hover text-ink shadow-sm'
                        : 'text-white/75 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tUI.exterior}
                  </button>
                  {interiorIndex >= 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveImageIndex(interiorIndex)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                        isInteriorActive
                          ? 'bg-gradient-to-r from-gold to-gold-hover text-ink shadow-sm'
                          : 'text-white/75 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tUI.insideVip}
                    </button>
                  )}
                </div>

                {/* Counter Pill */}
                <div className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 z-20 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80 shadow-md">
                  <span className="text-gold font-bold">
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

              {/* THUMBNAIL STRIP (When multiple views are available) */}
              {currentCar.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {currentCar.gallery.map((item, imgIdx) => (
                    <button
                      key={imgIdx}
                      type="button"
                      onClick={() => setActiveImageIndex(imgIdx)}
                      aria-label={item.label[locale] || item.label.en}
                      className={`relative w-16 h-11 sm:w-20 sm:h-12 rounded-lg overflow-hidden shrink-0 border transition-all ${
                        activeImageIndex === imgIdx
                          ? 'border-gold ring-2 ring-gold/40 scale-105'
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

              {/* SLIDER CONTROLS (PAGINATION DOTS & ARROWS) */}
              <div className="flex items-center justify-between pt-2">
                {/* Dots / Elongated Active Indicator */}
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
                      onClick={() => {
                        setActiveVehicleIndex(i);
                        setActiveImageIndex(0);
                      }}
                      aria-label={vehicle.name[locale] || vehicle.name.en}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeVehicleIndex === i
                          ? 'w-8 bg-gradient-to-r from-gold to-gold-hover shadow-sm shadow-gold/50'
                          : 'w-2.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Prev & Next Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label={tUI.prevVehicle}
                    className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 hover:border-gold/40 flex items-center justify-center text-white transition-all shadow-sm active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label={tUI.nextVehicle}
                    className="w-11 h-11 rounded-full bg-gradient-to-r from-gold to-gold-hover hover:brightness-110 text-ink flex items-center justify-center transition-all font-bold shadow-md shadow-gold/20 active:scale-95"
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
