'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { APPROVED_5_FLEET, type ApprovedFleetVehicle } from '@/data/approved-fleet-homepage';
import {
  Users,
  Luggage,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Snowflake,
  Clock,
  Car,
} from 'lucide-react';

interface LayeredPremiumFleetDeckProps {
  locale: Locale;
  dict: Dictionary;
}

export function LayeredPremiumFleetDeck({ locale, dict }: LayeredPremiumFleetDeckProps) {
  const isAr = locale === 'ar';
  const isRtl = locale === 'ar' || locale === 'ur';
  const { formatPrice } = useCurrency();
  const t = dict.cinematic_fleet;

  // Active vehicle index (0: Camry, 1: Staria, 2: Yukon XL, 3: HiAce, 4: Coaster)
  const [activeIndex, setActiveIndex] = useState(1); // Default to Hyundai Staria VIP (prime family choice)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const total = APPROVED_5_FLEET.length;

  const nextVehicle = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevVehicle = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation for WCAG 2.2 compliance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.closest('#fleet-deck-container')) {
        if (e.key === 'ArrowRight') {
          isRtl ? prevVehicle() : nextVehicle();
        } else if (e.key === 'ArrowLeft') {
          isRtl ? nextVehicle() : prevVehicle();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRtl, nextVehicle, prevVehicle]);

  // Touch gesture handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    }
  };

  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX) > 45) {
      if (touchDeltaX > 0) {
        // Swiped right
        isRtl ? nextVehicle() : prevVehicle();
      } else {
        // Swiped left
        isRtl ? prevVehicle() : nextVehicle();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  // WhatsApp concierge link generator
  const getWhatsAppUrl = (vehicleName: string) => {
    const phone = '966567588261';
    const text = encodeURIComponent(
      isAr
        ? `السلام عليكم، أود الاستفسار عن حجز مركبة (${vehicleName}) لرحلة العمرة.`
        : `Hello, I would like to inquire about reserving the (${vehicleName}) for private transportation.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section
      id="fleet"
      className="relative w-full max-w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#101827] via-[#0D1522] to-[#101827] text-white overflow-hidden select-none scroll-mt-20"
      aria-roledescription="carousel"
      aria-label={t.title || 'Authentic Private Fleet Showcase'}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. CINEMATIC BACKGROUND GLOWS & AMBIENT SHADOWS
      ────────────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[450px] bg-[radial-gradient(ellipse_at_center,_rgba(169,123,39,0.12)_0%,_rgba(23,63,53,0.25)_45%,_transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[350px] bg-[radial-gradient(circle,_rgba(23,63,53,0.3)_0%,_transparent_70%)] blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─────────────────────────────────────────────────────────────
            2. SECTION HEADER WITH EDITORIAL GRAND DISPLAY
        ────────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#173F35]/90 border border-[#A97B27]/40 backdrop-blur-md mb-3.5 sm:mb-4 shadow-[0_4px_20px_rgba(16,24,39,0.4)]">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A97B27] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#F7F5F0]">
              {t.eyebrow || 'AUTHENTIC PRIVATE FLEET'}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-[1.2] mb-3 sm:mb-4">
            <span className={isAr ? 'font-amiri font-bold text-[#F7F5F0]' : 'font-cormorant font-medium text-[#F7F5F0]'}>
              {t.title || 'Tailored Vehicles for Sacred Journeys'}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-[#E8E6E0] font-light leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-6">
            {t.subtitle ||
              'Choose from our verified 5-model private fleet. Punctual airport meet & greet, pristine cabins, and zero advance payment.'}
          </p>

          {/* Zero Prepayment Reassurance Pill */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] sm:text-xs text-[#E8E6E0]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
            <span>{t.fixedRateNotice || 'Fixed route rate · Pay cash to driver upon arrival'}</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. QUICK VEHICLE SELECTOR PILLS
        ────────────────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-center gap-1.5 sm:gap-2.5 mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none"
          role="tablist"
          aria-label="Vehicle Models"
        >
          {APPROVED_5_FLEET.map((vehicle, idx) => {
            const isSelected = idx === activeIndex;
            const shortName = vehicle.name[locale] || vehicle.name.en;
            return (
              <button
                key={vehicle.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 active:scale-[0.98] min-h-[44px] ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#173F35] to-[#24332C] text-[#F7F5F0] border border-[#A97B27] shadow-[0_6px_20px_rgba(23,63,53,0.5)]'
                    : 'bg-[#101827]/70 hover:bg-[#101827] text-[#AEB7C4] hover:text-white border border-white/10'
                }`}
              >
                <Car className={`w-3.5 h-3.5 ${isSelected ? 'text-[#A97B27]' : 'text-[#6C786F]'}`} />
                <span>{shortName.split(' ')[0]} {shortName.split(' ')[1] || ''}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/30 text-[#E8E6E0]">
                  {vehicle.passengers}p
                </span>
              </button>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. THE 3D LAYERED CARD DECK (VIDEO 15 INTERACTIVE ADAPTATION)
        ────────────────────────────────────────────────────────────── */}
        <div
          id="fleet-deck-container"
          ref={deckRef}
          className="relative w-full max-w-full mx-auto min-h-[520px] sm:min-h-[560px] md:min-h-[580px] lg:min-h-[620px] flex items-center justify-center overflow-visible"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {APPROVED_5_FLEET.map((vehicle, idx) => {
            // Circular shortest distance calculation
            let diff = idx - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCurrent = diff === 0;
            const isVisible = Math.abs(diff) <= 2;

            if (!isVisible) return null;

            // 3D Isometric Fanning Calculation
            const dirMultiplier = isRtl ? -1 : 1;
            let translateX = 0;
            let translateY = 0;
            let rotate = 0;
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;

            if (diff === 0) {
              zIndex = 30;
              scale = 1;
              opacity = 1;
              translateX = 0;
              translateY = 0;
              rotate = 0;
            } else if (Math.abs(diff) === 1) {
              zIndex = 20;
              scale = 0.92;
              opacity = 0.65;
              // On desktop: fanned out by 90px; on small mobile: compressed to 25px to prevent overflow
              translateX = diff * 75 * dirMultiplier;
              translateY = -14;
              rotate = diff * 3.5 * dirMultiplier;
            } else if (Math.abs(diff) === 2) {
              zIndex = 10;
              scale = 0.84;
              opacity = 0.3;
              translateX = diff * 140 * dirMultiplier;
              translateY = -28;
              rotate = diff * 6 * dirMultiplier;
            }

            const vehicleName = vehicle.name[locale] || vehicle.name.en;
            const categoryBadge = vehicle.categoryBadge[locale] || vehicle.categoryBadge.en;
            const summaryText = vehicle.summary[locale] || vehicle.summary.en;

            return (
              <div
                key={vehicle.id}
                onClick={() => {
                  if (!isCurrent) setActiveIndex(idx);
                }}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                  zIndex,
                  opacity,
                  transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease',
                }}
                className={`absolute w-[92%] sm:w-[86%] max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[540px] rounded-3xl p-5 sm:p-6 lg:p-7 bg-gradient-to-b from-[#182338] via-[#101827] to-[#0A0F1A] border ${
                  isCurrent
                    ? 'border-[#A97B27] shadow-[0_25px_60px_rgba(0,0,0,0.85),_0_0_35px_rgba(169,123,39,0.22)] cursor-default'
                    : 'border-white/15 shadow-xl cursor-pointer hover:border-[#A97B27]/50'
                }`}
                aria-hidden={!isCurrent}
              >
                {/* CARD TOP ROW: CATEGORY BADGE & CAPACITY PILLS */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[#173F35]/90 border border-[#A97B27]/50 text-[#F7F5F0]">
                    <Sparkles className="w-3 h-3 text-[#A97B27]" />
                    <span>{categoryBadge}</span>
                  </span>

                  {/* Pax & Luggage Capacity */}
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#E8E6E0] font-medium bg-black/40 border border-white/10 px-2.5 py-1 rounded-full">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#A97B27]" />
                      <span>{vehicle.passengers} {t.passengers}</span>
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="inline-flex items-center gap-1">
                      <Luggage className="w-3.5 h-3.5 text-[#A97B27]" />
                      <span>{vehicle.luggage} {t.luggage}</span>
                    </span>
                  </div>
                </div>

                {/* VEHICLE MODEL NAME */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F7F5F0] tracking-tight mb-1">
                  <span className={isAr ? 'font-amiri font-bold' : 'font-cormorant font-semibold'}>
                    {vehicleName}
                  </span>
                </h3>

                {/* STARTING PRICE INDICATOR */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xs sm:text-sm text-[#AEB7C4]">{t.startingFrom}</span>
                  <span className="text-lg sm:text-xl font-bold text-[#A97B27]">
                    {formatPrice(vehicle.startingPriceSAR)}
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#6C786F]">
                    ({isAr ? 'تسعيرة رسمية للرحلة' : 'Fixed route rate'})
                  </span>
                </div>

                {/* VEHICLE CUTOUT WITH STUDIO FLOOR REFLECTION */}
                <div className="relative w-full h-44 sm:h-52 md:h-56 lg:h-60 my-2 flex flex-col items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={vehicle.exteriorImage}
                      alt={vehicleName}
                      fill
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 440px, 520px"
                      className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]"
                      priority={isCurrent}
                    />
                  </div>

                  {/* Elliptical Ground Ambient Shadow */}
                  <div className="absolute -bottom-1 inset-x-8 h-4 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.85)_0%,_rgba(0,0,0,0.3)_50%,_transparent_75%)] blur-[3px] pointer-events-none" />
                </div>

                {/* SUMMARY STATEMENT */}
                <p className="text-xs sm:text-sm text-[#AEB7C4] leading-relaxed mb-4 min-h-[36px] line-clamp-2">
                  {summaryText}
                </p>

                {/* QUICK SPECS GRID (3 BULLETS) */}
                <div className="grid grid-cols-2 gap-2 mb-5 pt-3 border-t border-white/10 text-[11px] sm:text-xs text-[#E8E6E0]">
                  <div className="inline-flex items-center gap-1.5">
                    <Snowflake className="w-3.5 h-3.5 text-[#A97B27] shrink-0" />
                    <span>{t.airConditioning}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A97B27] shrink-0" />
                    <span>{t.flightTracking}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A97B27] shrink-0" />
                    <span>{t.privateChauffeur}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#A97B27] shrink-0" />
                    <span>{t.zamzamWater}</span>
                  </div>
                </div>

                {/* DUAL ACTION BUTTONS: BOOK THIS VEHICLE + WHATSAPP */}
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  {/* Primary: Reserve This Vehicle */}
                  <Link
                    href={`/${locale}/booking?vehicle=${encodeURIComponent(vehicle.bookingParam)}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#173F35] to-[#24332C] hover:from-[#1F5447] hover:to-[#2F4239] text-[#F7F5F0] font-semibold text-xs sm:text-sm border border-[#A97B27]/70 shadow-[0_8px_25px_rgba(23,63,53,0.4)] transition-all duration-200 active:scale-[0.98] min-h-[44px]"
                  >
                    <span>{t.bookVehicle || 'Reserve This Vehicle'}</span>
                    <ArrowIcon className="w-4 h-4 text-[#A97B27]" />
                  </Link>

                  {/* Secondary: WhatsApp Inquiry */}
                  <a
                    href={getWhatsAppUrl(vehicleName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#E8E6E0] hover:text-white font-medium text-xs sm:text-sm border border-white/15 backdrop-blur-sm transition-all duration-200 active:scale-[0.98] min-h-[44px]"
                    aria-label={`${t.whatsappInquiry} - ${vehicleName}`}
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="sm:hidden lg:inline">{t.whatsappInquiry || 'WhatsApp'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            5. DESKTOP CAROUSEL CONTROLS & PAGINATION INDICATORS
        ────────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
          <button
            type="button"
            onClick={isRtl ? nextVehicle : prevVehicle}
            aria-label={t.prevVehicle || 'Previous Vehicle'}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-[#A97B27]"
          >
            {isRtl ? <ChevronRight className="w-5 h-5 text-[#A97B27]" /> : <ChevronLeft className="w-5 h-5 text-[#A97B27]" />}
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {APPROVED_5_FLEET.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? 'w-7 sm:w-8 h-2 bg-[#A97B27] shadow-[0_0_10px_rgba(169,123,39,0.5)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={isRtl ? prevVehicle : nextVehicle}
            aria-label={t.nextVehicle || 'Next Vehicle'}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-[0.95] focus-visible:ring-2 focus-visible:ring-[#A97B27]"
          >
            {isRtl ? <ChevronLeft className="w-5 h-5 text-[#A97B27]" /> : <ChevronRight className="w-5 h-5 text-[#A97B27]" />}
          </button>
        </div>
      </div>
    </section>
  );
}
