'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import {
  Clock,
  MapPin,
  Car,
  Users,
  ShieldCheck,
  Plane,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export interface RouteCardData {
  slug: string;
  image: string;
  imagePosition?: string;
  timeEn: string;
  timeAr: string;
  distanceEn: string;
  distanceAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  categoryBadgeEn?: string;
  categoryBadgeAr?: string;
  serviceLineEn?: string;
  serviceLineAr?: string;
  descEn: string;
  descAr: string;
  badgesEn: string[];
  badgesAr: string[];
  priceSar: number;
  customPricePrefix?: string;
}

interface ExecutiveRouteCardProps {
  route: RouteCardData;
  locale: Locale;
}

const LABELS: Record<
  string,
  {
    startingFrom: string;
    perTrip: string;
    bookNow: string;
    viewVehicles: string;
  }
> = {
  ar: {
    startingFrom: 'يبدأ من',
    perTrip: 'لكل رحلة',
    bookNow: 'احجز الآن',
    viewVehicles: 'عرض السيارات المتاحة',
  },
  en: {
    startingFrom: 'STARTING FROM',
    perTrip: 'PER TRIP',
    bookNow: 'BOOK NOW',
    viewVehicles: 'View Vehicles',
  },
  ur: {
    startingFrom: 'شروع از',
    perTrip: 'فی چکر',
    bookNow: 'ابھی بک کریں',
    viewVehicles: 'گاڑیاں دیکھیں',
  },
  ms: {
    startingFrom: 'BERMULA DARI',
    perTrip: 'SETIAP PERJALANAN',
    bookNow: 'TEMPAH SEKARANG',
    viewVehicles: 'Lihat Kenderaan',
  },
  id: {
    startingFrom: 'MULAI DARI',
    perTrip: 'PER PERJALANAN',
    bookNow: 'PESAN SEKARANG',
    viewVehicles: 'Lihat Kendaraan',
  },
  fr: {
    startingFrom: 'À PARTIR DE',
    perTrip: 'PAR TRAJET',
    bookNow: 'RÉSERVER',
    viewVehicles: 'Voir les Véhicules',
  },
  es: {
    startingFrom: 'DESDE',
    perTrip: 'POR VIAJE',
    bookNow: 'RESERVAR AHORA',
    viewVehicles: 'Ver Vehículos',
  },
  de: {
    startingFrom: 'AB',
    perTrip: 'PRO FAHRT',
    bookNow: 'JETZT BUCHEN',
    viewVehicles: 'Fahrzeuge ansehen',
  },
  tr: {
    startingFrom: 'BAŞLANGIÇ',
    perTrip: 'SEFER BAŞINA',
    bookNow: 'REZERVASYON YAP',
    viewVehicles: 'Araçları Gör',
  },
  hi: {
    startingFrom: 'शुरुआती दर',
    perTrip: 'प्रति यात्रा',
    bookNow: 'अभी बुक करें',
    viewVehicles: 'वाहन देखें',
  },
};

function renderBenefitIcon(badgeText: string, index: number) {
  const lower = badgeText.toLowerCase();
  const iconClass = 'w-3.5 h-3.5 text-[#E5C158] shrink-0';

  if (lower.includes('24/7') || lower.includes('hour') || lower.includes('ساعة') || lower.includes('وقت')) {
    return <Clock className={iconClass} />;
  }
  if (lower.includes('door') || lower.includes('car') || lower.includes('route') || lower.includes('باب') || lower.includes('سيار') || lower.includes('طريق')) {
    return <Car className={iconClass} />;
  }
  if (lower.includes('family') || lower.includes('meet') || lower.includes('عوائل') || lower.includes('استقبال')) {
    return <Users className={iconClass} />;
  }
  if (lower.includes('flight') || lower.includes('radar') || lower.includes('طيران') || lower.includes('رحلات')) {
    return <Plane className={iconClass} />;
  }
  if (lower.includes('comfort') || lower.includes('vip') || lower.includes('safe') || lower.includes('راحة') || lower.includes('أمان')) {
    return <ShieldCheck className={iconClass} />;
  }
  if (index === 0) return <Clock className={iconClass} />;
  if (index === 1) return <Car className={iconClass} />;
  return <Sparkles className={iconClass} />;
}

export function ExecutiveRouteCard({ route, locale }: ExecutiveRouteCardProps) {
  const { formatPrice } = useCurrency();
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const time = isAr ? route.timeAr : route.timeEn;
  const distance = isAr ? route.distanceAr : route.distanceEn;
  const title = isAr ? route.titleAr : route.titleEn;
  const desc = isAr ? route.descAr : route.descEn;
  const categoryBadge =
    (isAr ? route.categoryBadgeAr : route.categoryBadgeEn) ||
    (isAr ? 'توصيل VIP فاخر' : 'EXECUTIVE VIP TRANSFER');
  const serviceLine =
    (isAr ? route.serviceLineAr : route.serviceLineEn) ||
    (isAr ? 'خدمات نقل ليموزين وVIP' : 'LIMO & VIP TRANSFER SERVICES');
  const badges = (isAr ? route.badgesAr : route.badgesEn) || [];
  const labels = LABELS[locale] || LABELS.en;

  return (
    <article
      className="relative w-full rounded-[26px] sm:rounded-[32px] overflow-hidden bg-[#0A0D14] border-2 border-[#C5A059]/70 shadow-[0_22px_55px_rgba(0,0,0,0.92),_0_0_25px_rgba(197,160,89,0.18)] transition-all duration-300 hover:border-[#E5C158] hover:shadow-[0_26px_65px_rgba(0,0,0,0.95),_0_0_30px_rgba(229,193,88,0.25)] text-start group"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 1. UPPER SECTION: CINEMATIC DESTINATION PHOTOGRAPH WITH OVERLAID TRANSLUCENT PANEL */}
      <div className="relative w-full min-h-[320px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[460px] overflow-hidden">
        {/* Full-bleed Scenic Photograph */}
        <Image
          src={route.image}
          alt={`${title} - Duyuf Alrahman VIP Chauffeur`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
          className={`object-cover ${
            route.imagePosition || 'object-center'
          } group-hover:scale-105 transition-transform duration-700 ease-out`}
          priority={false}
        />

        {/* Ambient Dark Gradient Overlays for High Contrast & Editorial Luxury */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/50 to-black/30 pointer-events-none z-[1]" />
        <div
          className={`hidden md:block absolute inset-0 z-[1] pointer-events-none ${
            isRtl
              ? 'bg-gradient-to-l from-[#0A0D14]/95 via-[#0A0D14]/65 to-transparent w-[72%]'
              : 'bg-gradient-to-r from-[#0A0D14]/95 via-[#0A0D14]/65 to-transparent w-[72%]'
          }`}
        />

        {/* Overlaid Translucent Glassmorphic Information Panel */}
        <div className="relative md:absolute inset-0 z-10 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          <div className="w-full md:max-w-[480px] lg:max-w-[540px] bg-[#0A0E17]/88 backdrop-blur-md border border-[#C5A059]/45 rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 lg:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.85)] flex flex-col justify-between">
            {/* Top Row: Duration & Distance + Metallic Category Badge */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              {/* Duration & Distance Chips */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#121722]/90 border border-[#C5A059]/35 text-[11px] sm:text-xs font-semibold text-[#F0EBE1] shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
                  <span>{time}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#121722]/90 border border-[#C5A059]/35 text-[11px] sm:text-xs font-semibold text-[#F0EBE1] shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
                  <span>{distance}</span>
                </div>
              </div>

              {/* Metallic Gold Category Ribbon */}
              <span className="px-3 sm:px-3.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C5A059] text-[#0A0D14] shadow-md shrink-0">
                {categoryBadge}
              </span>
            </div>

            {/* Main Route Title in Editorial Serif */}
            <h3 className="font-playfair font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-normal text-[#FAF7F2] tracking-tight leading-[1.18] mt-3 sm:mt-4 mb-1.5">
              {title}
            </h3>

            {/* Subtitle / Service Line */}
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#D4AF37] uppercase mb-2 sm:mb-2.5">
              {serviceLine}
            </p>

            {/* Route Description */}
            <p className="text-xs sm:text-[13px] text-[#C9C2B5] leading-relaxed line-clamp-3 sm:line-clamp-none font-normal">
              {desc}
            </p>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM INFORMATION BAR: SERVICE BENEFITS, ACCURATE PRICING & CALL-TO-ACTIONS */}
      <div className="bg-[#0B0F19] border-t border-[#C5A059]/25 p-4 sm:p-5 md:p-6 lg:px-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-5 relative z-10">
        {/* Service Benefits Chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {badges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold text-[#DDD7CC] border border-[#C5A059]/35 bg-[#121722]/90 backdrop-blur-xs shadow-2xs"
            >
              {renderBenefitIcon(badge, idx)}
              <span>{badge}</span>
            </span>
          ))}
        </div>

        {/* Pricing Block & Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-2 lg:pt-0 border-t border-white/5 lg:border-t-0">
          {/* Starting Price Display */}
          <div className="text-start sm:text-end shrink-0">
            <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#9E9588]">
              {labels.startingFrom}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-[#E5C158] tracking-tight">
                {route.customPricePrefix
                  ? `${route.customPricePrefix} ${formatPrice(route.priceSar)}`
                  : formatPrice(route.priceSar)}
              </span>
            </div>
            <span className="block text-[9px] sm:text-[10px] uppercase font-medium tracking-wider text-[#827A6E]">
              {labels.perTrip}
            </span>
          </div>

          {/* Action Buttons: View Vehicles & Book Now */}
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <Link
              href={`/${locale}/routes/${route.slug}`}
              className="flex-1 sm:flex-none h-11 px-4 sm:px-5 rounded-full border border-[#C5A059]/50 hover:border-[#D4AF37] hover:bg-[#C5A059]/10 text-[#F5EADB] text-xs font-bold transition-all flex items-center justify-center text-center whitespace-nowrap shadow-xs active:scale-[0.98]"
            >
              <span>{labels.viewVehicles}</span>
            </Link>

            <Link
              href={`/${locale}/booking?route=${route.slug}`}
              className="flex-1 sm:flex-none h-11 px-5 sm:px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C5A059] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#0A0D14] text-xs font-black uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.5)] flex items-center justify-center gap-1.5 sm:gap-2 text-center whitespace-nowrap active:scale-[0.98]"
            >
              <span>{labels.bookNow}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
