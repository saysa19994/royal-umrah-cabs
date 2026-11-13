'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  Plane,
  Clock,
  Sparkles,
  Car
} from 'lucide-react';

interface CinematicTravelHeroProps {
  locale: Locale;
  dict: Dictionary;
}

export function CinematicTravelHero({ locale, dict }: CinematicTravelHeroProps) {
  const router = useRouter();
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const t = (dict as any).cinematic_hero || {};

  const pickupId = useId();
  const dropoffId = useId();
  const dateId = useId();
  const passengersId = useId();

  const todayStr = new Date().toISOString().split('T')[0];

  const [pickup, setPickup] = useState('jeddah-airport');
  const [dropoff, setDropoff] = useState('makkah');
  const [travelDate, setTravelDate] = useState(todayStr);
  const [passengers, setPassengers] = useState('2');
  const [feedback, setFeedback] = useState('');

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff || !travelDate) {
      setFeedback(isAr ? 'يرجى تحديد موقع الانطلاق والوجهة وتاريخ الرحلة' : 'Please select pickup, destination, and travel date');
      return;
    }
    if (pickup === dropoff) {
      setFeedback(isAr ? 'لا يمكن أن تكون نقطة الانطلاق والوجهة متطابقتين' : 'Pickup and destination cannot be identical');
      return;
    }
    setFeedback('');
    router.push(
      `/${locale}/booking?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(
        dropoff
      )}&date=${encodeURIComponent(travelDate)}&passengers=${encodeURIComponent(passengers)}`
    );
  };

  const scrollToBookingBar = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('reservation-bar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#101827] text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. CINEMATIC VIDEO CONTAINER (DESKTOP: 680-720px, MOBILE: 460px)
      ────────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[460px] sm:h-[520px] md:h-[620px] lg:h-[720px] overflow-hidden">
        {/* Native HTML5 Video with WebM, MP4 & 720p fallbacks */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/cinematic/hero/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover object-[center_right] md:object-center pointer-events-none select-none transition-opacity duration-1000"
          aria-label={t.eyebrow || 'Duyuf Al Rahman VIP Chauffeur Service'}
        >
          {/* Responsive 720p source for mobile/small viewports */}
          <source
            src="/assets/cinematic/hero/hero-720.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
          {/* High-fidelity WebM for modern desktop browsers */}
          <source src="/assets/cinematic/hero/hero.webm" type="video/webm" />
          {/* High-fidelity 1080p MP4 baseline fallback */}
          <source src="/assets/cinematic/hero/hero.mp4" type="video/mp4" />
          {/* Fallback image if video is unsupported */}
          <img
            src="/assets/cinematic/hero/hero-poster.jpg"
            alt="Duyuf Al Rahman VIP Chauffeur at Airport Terminal"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Directional Luxury Gradient: Dark Forest Green / Deep Navy on text side, fading toward vehicle */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isRtl
              ? 'bg-gradient-to-l from-[#101827]/95 via-[#173F35]/85 via-50% to-transparent'
              : 'bg-gradient-to-r from-[#101827]/95 via-[#173F35]/85 via-50% to-transparent'
          }`}
        />

        {/* Ambient top vignette for navigation contrast */}
        <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-[#101827]/80 to-transparent pointer-events-none" />

        {/* Bottom subtle gradient */}
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-28 bg-gradient-to-t from-[#101827] via-[#101827]/50 to-transparent pointer-events-none" />

        {/* ─────────────────────────────────────────────────────────────
            2. EDITORIAL CONTENT BLOCK (START 50%)
        ────────────────────────────────────────────────────────────── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="w-full lg:w-[58%] xl:w-[52%] pt-12 sm:pt-16 md:pt-20 pb-6 text-start">
            {/* Small Kicker / Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#173F35]/90 border border-[#A97B27]/40 backdrop-blur-md mb-3 sm:mb-4 shadow-[0_4px_20px_rgba(16,24,39,0.3)]">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#A97B27] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#F7F5F0]">
                {t.eyebrow || 'PRIVATE CHAUFFEUR & AIRPORT TRANSFERS'}
              </span>
            </div>

            {/* Headline with Editorial Grandeur */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-normal tracking-tight text-white leading-[1.2] mb-3 sm:mb-4 break-words">
              <span className={isAr ? 'font-amiri font-bold text-[#F7F5F0]' : 'font-cormorant font-medium text-[#F7F5F0]'}>
                {t.title || 'Your Journey, Handled With Care.'}
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#E8E6E0] max-w-xl font-light leading-relaxed mb-5 sm:mb-7 text-balance break-words">
              {t.description ||
                'Experience private chauffeur transportation across Jeddah, Makkah and Madinah.'}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              {/* Primary Action Button */}
              <button
                type="button"
                onClick={scrollToBookingBar}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#173F35] to-[#24332C] hover:from-[#1F5447] hover:to-[#2F4239] text-[#F7F5F0] font-semibold text-xs sm:text-base border border-[#A97B27]/60 shadow-[0_10px_30px_rgba(23,63,53,0.4)] transition-all duration-200 active:scale-[0.98] min-h-[44px] sm:min-h-[48px]"
              >
                <span>{t.ctaPlan || 'Plan Your Journey'}</span>
                <ArrowIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A97B27]" />
              </button>

              {/* Secondary Ghost Button */}
              <Link
                href={`/${locale}/fleet`}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#101827]/70 hover:bg-[#101827]/90 text-[#E8E6E0] hover:text-white font-medium text-xs sm:text-base border border-[#E6E1D7]/30 backdrop-blur-sm transition-all duration-200 active:scale-[0.98] min-h-[44px] sm:min-h-[48px]"
              >
                <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A97B27]" />
                <span>{t.ctaFleet || 'Explore Our Fleet'}</span>
              </Link>
            </div>

            {/* Quick Reassurance Badges */}
            <div className="mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-white/10 hidden sm:flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#E8E6E0]">
              <div className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#A97B27]" />
                <span>{isAr ? 'سائقك بانتظارك 24/7' : '24/7 Dedicated Chauffeur'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-[#A97B27]" />
                <span>{isAr ? 'متابعة الرحلات الجوية مجانًا' : 'Free Flight Monitoring'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A97B27]" />
                <span>{isAr ? 'الدفع نقدًا للسائق بعد الرحلة' : 'Pay Cash to Driver'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FLOATING BOOKING RESERVATION BAR
          Desktop: Overlaps lower hero edge (-mt-16 to -mt-20)
          Mobile: Clean placement BELOW the video (mt-4 sm:mt-6)
      ────────────────────────────────────────────────────────────── */}
      <div
        id="reservation-bar"
        data-booking-form="true"
        className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:-mt-20 pb-8"
      >
        <div className="bg-[#FFFFFF] text-[#24332C] rounded-2xl md:rounded-3xl p-4 sm:p-6 lg:p-7 shadow-[0_25px_60px_rgba(16,24,39,0.18)] border border-[#E6E1D7]">
          {/* Reservation Bar Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E6E1D7]">
            <div className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A97B27]" />
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-[#173F35]">
                {t.barTitle || 'Reserve Your Private Transfer'}
              </h2>
            </div>
            <div className="text-xs font-medium text-[#6C786F]">
              <span className="text-[#173F35] font-semibold">{t.zeroPrepayNotice || '0% Advance Payment • Pay Cash to Driver Upon Completion'}</span>
            </div>
          </div>

          {/* Booking Form Grid */}
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {/* Field 1: Pickup Location */}
              <div className="flex flex-col">
                <label htmlFor={pickupId} className="text-xs font-semibold uppercase tracking-wider text-[#6C786F] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A97B27]" />
                  <span>{t.pickupLabel || 'Pickup Location'}</span>
                </label>
                <div className="relative">
                  <select
                    id={pickupId}
                    value={pickup}
                    onChange={(e) => {
                      setPickup(e.target.value);
                      if (feedback) setFeedback('');
                    }}
                    required
                    className="w-full appearance-none bg-[#F7F5F0] hover:bg-[#E8E6E0]/60 focus:bg-white text-[#24332C] text-sm font-medium rounded-xl border border-[#E6E1D7] focus:border-[#173F35] focus:ring-2 focus:ring-[#173F35]/20 px-3.5 py-3 pr-9 rtl:pr-3.5 rtl:pl-9 transition-colors min-h-[48px]"
                  >
                    <option value="jeddah-airport">{isAr ? 'مطار الملك عبد العزيز - جدة (JED)' : 'King Abdulaziz Airport, Jeddah (JED)'}</option>
                    <option value="makkah">{isAr ? 'مكة المكرمة (جميع الفنادق والحرم)' : 'Makkah (All Hotels & Haram)'}</option>
                    <option value="madinah-airport">{isAr ? 'مطار الأمير محمد - المدينة (MED)' : 'Prince Mohammad Airport, Madinah (MED)'}</option>
                    <option value="madinah">{isAr ? 'المدينة المنورة (جميع الفنادق والحرم)' : 'Madinah (All Hotels & Haram)'}</option>
                    <option value="taif">{isAr ? 'الطائف والميقات' : 'Taif & Miqat'}</option>
                    <option value="riyadh">{isAr ? 'الرياض' : 'Riyadh'}</option>
                  </select>
                  <ChevronDown className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C786F] pointer-events-none" />
                </div>
              </div>

              {/* Field 2: Destination */}
              <div className="flex flex-col">
                <label htmlFor={dropoffId} className="text-xs font-semibold uppercase tracking-wider text-[#6C786F] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#A97B27]" />
                  <span>{t.destLabel || 'Destination'}</span>
                </label>
                <div className="relative">
                  <select
                    id={dropoffId}
                    value={dropoff}
                    onChange={(e) => {
                      setDropoff(e.target.value);
                      if (feedback) setFeedback('');
                    }}
                    required
                    className="w-full appearance-none bg-[#F7F5F0] hover:bg-[#E8E6E0]/60 focus:bg-white text-[#24332C] text-sm font-medium rounded-xl border border-[#E6E1D7] focus:border-[#173F35] focus:ring-2 focus:ring-[#173F35]/20 px-3.5 py-3 pr-9 rtl:pr-3.5 rtl:pl-9 transition-colors min-h-[48px]"
                  >
                    <option value="makkah">{isAr ? 'مكة المكرمة (فنادق الحرم)' : 'Makkah (Haram Hotels)'}</option>
                    <option value="madinah">{isAr ? 'المدينة المنورة (فنادق الحرم)' : 'Madinah (Haram Hotels)'}</option>
                    <option value="jeddah-airport">{isAr ? 'مطار جدة الدولي (JED)' : 'Jeddah Airport (JED)'}</option>
                    <option value="madinah-airport">{isAr ? 'مطار المدينة المنورة (MED)' : 'Madinah Airport (MED)'}</option>
                    <option value="taif">{isAr ? 'الطائف والميقات' : 'Taif & Miqat'}</option>
                    <option value="riyadh">{isAr ? 'الرياض' : 'Riyadh'}</option>
                  </select>
                  <ChevronDown className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C786F] pointer-events-none" />
                </div>
              </div>

              {/* Field 3: Travel Date */}
              <div className="flex flex-col">
                <label htmlFor={dateId} className="text-xs font-semibold uppercase tracking-wider text-[#6C786F] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#A97B27]" />
                  <span>{t.dateLabel || 'Travel Date'}</span>
                </label>
                <input
                  id={dateId}
                  type="date"
                  min={todayStr}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  required
                  className="w-full bg-[#F7F5F0] hover:bg-[#E8E6E0]/60 focus:bg-white text-[#24332C] text-sm font-medium rounded-xl border border-[#E6E1D7] focus:border-[#173F35] focus:ring-2 focus:ring-[#173F35]/20 px-3.5 py-3 transition-colors min-h-[48px]"
                />
              </div>

              {/* Field 4: Passengers */}
              <div className="flex flex-col">
                <label htmlFor={passengersId} className="text-xs font-semibold uppercase tracking-wider text-[#6C786F] mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#A97B27]" />
                  <span>{t.passengersLabel || 'Passengers'}</span>
                </label>
                <div className="relative">
                  <select
                    id={passengersId}
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full appearance-none bg-[#F7F5F0] hover:bg-[#E8E6E0]/60 focus:bg-white text-[#24332C] text-sm font-medium rounded-xl border border-[#E6E1D7] focus:border-[#173F35] focus:ring-2 focus:ring-[#173F35]/20 px-3.5 py-3 pr-9 rtl:pr-3.5 rtl:pl-9 transition-colors min-h-[48px]"
                  >
                    <option value="1">{isAr ? '1 راكب (سيدان / كامري)' : '1 Passenger (Sedan / Camry)'}</option>
                    <option value="2">{isAr ? '2 ركاب (سيدان / كامري)' : '2 Passengers (Sedan / Camry)'}</option>
                    <option value="3">{isAr ? '3 ركاب (كامري / ستاريا)' : '3 Passengers (Camry / Staria)'}</option>
                    <option value="4">{isAr ? '4 ركاب (عائلي / ستاريا)' : '4 Passengers (Family / Staria)'}</option>
                    <option value="5">{isAr ? '5 ركاب (ستاريا VIP)' : '5 Passengers (Staria VIP)'}</option>
                    <option value="7">{isAr ? '7 ركاب (جمس يوكون XL)' : '7 Passengers (GMC Yukon XL)'}</option>
                    <option value="10">{isAr ? '10 ركاب (تويوتا هايس)' : '10 Passengers (Toyota HiAce)'}</option>
                    <option value="21">{isAr ? '21 راكب (كوستر VIP)' : '21 Passengers (Coaster VIP)'}</option>
                  </select>
                  <ChevronDown className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C786F] pointer-events-none" />
                </div>
              </div>

              {/* Field 5: Submit Action */}
              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#173F35] hover:bg-[#1f5447] text-[#F7F5F0] font-semibold text-sm sm:text-base border border-[#A97B27]/40 shadow-[0_8px_20px_rgba(23,63,53,0.25)] transition-all duration-200 active:scale-[0.98] min-h-[48px]"
                >
                  <Search className="w-4 h-4 text-[#A97B27]" />
                  <span>{t.findVehicle || 'Find a Vehicle'}</span>
                </button>
              </div>
            </div>

            {/* Error Feedback if any */}
            {feedback && (
              <p className="text-xs text-rose-600 font-medium mt-1">
                {feedback}
              </p>
            )}

            {/* Bottom Assurance Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-y-1 gap-x-4 text-[11px] sm:text-xs text-[#6C786F]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#173F35]" />
                {isAr ? 'أسعار رسمية ثابتة وشاملة الضريبة ورسوم الطرق ومواقف المطار' : 'Fixed official rates including VAT, highway tolls & airport parking'}
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#173F35]">
                {t.freeFlightMonitoring || 'Free Flight Monitoring & Waiting Included'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
