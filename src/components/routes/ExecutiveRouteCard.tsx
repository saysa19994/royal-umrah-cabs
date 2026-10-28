'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import {
  Clock,
  MapPin,
  Car,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export interface RouteCardData {
  slug: string;
  image: string;
  images?: string[];
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
    luxuryVipService: string;
    serviceLine: string;
  }
> = {
  ar: {
    startingFrom: 'يبدأ من',
    perTrip: '/ لكل رحلة',
    bookNow: 'احجز الآن',
    viewVehicles: 'عرض السيارات',
    luxuryVipService: 'خدمة VIP فاخرة',
    serviceLine: 'خدمات نقل ليموزين وVIP',
  },
  en: {
    startingFrom: 'STARTING FROM',
    perTrip: '/ PER TRIP',
    bookNow: 'BOOK NOW',
    viewVehicles: 'View Vehicles',
    luxuryVipService: 'LUXURY VIP SERVICE',
    serviceLine: 'LIMO & VIP TRANSFER SERVICES',
  },
  ur: {
    startingFrom: 'شروع از',
    perTrip: '/ فی چکر',
    bookNow: 'ابھی بک کریں',
    viewVehicles: 'گاڑیاں دیکھیں',
    luxuryVipService: 'لگژری وی آئی پی سروس',
    serviceLine: 'لیموزین اور وی آئی پی ٹرانسفر',
  },
  ms: {
    startingFrom: 'BERMULA DARI',
    perTrip: '/ SETIAP PERJALANAN',
    bookNow: 'TEMPAH SEKARANG',
    viewVehicles: 'Lihat Kenderaan',
    luxuryVipService: 'PERKHIDMATAN VIP MEWAH',
    serviceLine: 'PERKHIDMATAN LIMO & PEMINDAHAN VIP',
  },
  id: {
    startingFrom: 'MULAI DARI',
    perTrip: '/ PER PERJALANAN',
    bookNow: 'PESAN SEKARANG',
    viewVehicles: 'Lihat Kendaraan',
    luxuryVipService: 'LAYANAN VIP MEWAH',
    serviceLine: 'LAYANAN LIMO & TRANSFER VIP',
  },
  fr: {
    startingFrom: 'À PARTIR DE',
    perTrip: '/ PAR TRAJET',
    bookNow: 'RÉSERVER',
    viewVehicles: 'Voir les Véhicules',
    luxuryVipService: 'SERVICE VIP DE LUXE',
    serviceLine: 'SERVICES DE LIMO & TRANSFERT VIP',
  },
  es: {
    startingFrom: 'DESDE',
    perTrip: '/ POR VIAJE',
    bookNow: 'RESERVAR AHORA',
    viewVehicles: 'Ver Vehículos',
    luxuryVipService: 'SERVICIO VIP DE LUJO',
    serviceLine: 'SERVICIOS DE LIMUSINA Y TRASLADOS VIP',
  },
  de: {
    startingFrom: 'AB',
    perTrip: '/ PRO FAHRT',
    bookNow: 'JETZT BUCHEN',
    viewVehicles: 'Fahrzeuge ansehen',
    luxuryVipService: 'LUXUS VIP SERVICE',
    serviceLine: 'LIMO & VIP TRANSFER DIENSTE',
  },
  tr: {
    startingFrom: 'BAŞLANGIÇ',
    perTrip: '/ SEFER BAŞINA',
    bookNow: 'REZERVASYON YAP',
    viewVehicles: 'Araçları Gör',
    luxuryVipService: 'LÜKS VIP HİZMET',
    serviceLine: 'LİMUZİN VE VIP TRANSFER HİZMETLERİ',
  },
  hi: {
    startingFrom: 'शुरुआती दर',
    perTrip: '/ प्रति यात्रा',
    bookNow: 'अभी बुक करें',
    viewVehicles: 'वाहन देखें',
    luxuryVipService: 'लक्जरी वीआईपी सेवा',
    serviceLine: 'लिमोसिन और वीआईपी ट्रांसफर सेवाएं',
  },
};

export function ExecutiveRouteCard({ route, locale }: ExecutiveRouteCardProps) {
  const { formatPrice } = useCurrency();
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const time = isAr ? route.timeAr : route.timeEn;
  const distance = isAr ? route.distanceAr : route.distanceEn;
  const title = isAr ? route.titleAr : route.titleEn;
  const labels = LABELS[locale] || LABELS.en;
  const serviceLine =
    (isAr ? route.serviceLineAr : route.serviceLineEn) || labels.serviceLine;
  const luxuryBadge =
    (isAr ? route.categoryBadgeAr : route.categoryBadgeEn) || labels.luxuryVipService;

  // Interactive Carousel Image Gallery (Matching the 4 dots and < > arrows in Image 2)
  const imageList =
    route.images && route.images.length > 0 ? route.images : [route.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const currentImage = imageList[activeImageIndex] || route.image;

  return (
    <article
      className="relative w-full rounded-2xl md:rounded-[22px] overflow-hidden bg-black border-2 border-[#b89355] shadow-2xl transition-all duration-300 text-start group"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 1. UPPER SECTION: CINEMATIC DESTINATION PANORAMA WITH OVERLAID TRANSLUCENT PANEL */}
      <div className="relative w-full aspect-[2.1/1] min-h-[280px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[420px] overflow-hidden bg-[#0A0D14]">
        {/* Active Route Image */}
        <Image
          src={currentImage}
          alt={`${title} - Duyuf Alrahman VIP Chauffeur`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
          className={`object-cover ${
            route.imagePosition || 'object-center'
          } group-hover:scale-105 transition-transform duration-700 ease-out`}
          priority={false}
        />

        {/* Ambient Dark Gradient for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 pointer-events-none z-[1]" />

        {/* Top-Right Luxury Gold Badge (pinned to top-right of the photo) */}
        <div
          className={`absolute top-0 end-0 z-20 ${
            isRtl ? 'rounded-bl-xl' : 'rounded-bl-xl'
          }`}
        >
          <div className="bg-gradient-to-b from-[#bd9250] to-[#966d33] text-[#120d04] font-black text-[11px] sm:text-xs tracking-wider uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-bl-xl shadow-md">
            <span>{luxuryBadge}</span>
          </div>
        </div>

        {/* Carousel Navigation Arrow - Left */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous photo"
          className="absolute start-3 sm:start-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/70 border border-white/30 backdrop-blur-xs flex items-center justify-center text-white transition-all shadow-md active:scale-95"
        >
          {isRtl ? (
            <ChevronRight className="w-5 h-5 text-white" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Carousel Navigation Arrow - Right */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photo"
          className="absolute end-3 sm:end-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/45 hover:bg-black/70 border border-white/30 backdrop-blur-xs flex items-center justify-center text-white transition-all shadow-md active:scale-95"
        >
          {isRtl ? (
            <ChevronLeft className="w-5 h-5 text-white" />
          ) : (
            <ChevronRight className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Overlaid Dark Glassmorphic Card (Positioned exactly as in Image 2) */}
        <div className="absolute bottom-6 sm:bottom-7 start-4 sm:start-6 z-20 max-w-[90%] sm:max-w-md md:max-w-lg p-4 sm:p-5 rounded-2xl bg-[#14181f]/80 backdrop-blur-md border border-white/10 shadow-2xl">
          {/* Row 1: Duration & Distance */}
          <div className="flex items-center gap-3 sm:gap-4 text-slate-200">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span>{distance}</span>
            </div>
          </div>

          {/* Row 2: Route Title in Classic Editorial Serif */}
          <h3 className="font-playfair font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-white tracking-tight leading-tight my-1.5">
            {title}
          </h3>

          {/* Row 3: Subtitle in Uppercase Clean Sans-Serif */}
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            {serviceLine}
          </p>
        </div>

        {/* Carousel Dots at the Bottom-Center of the Image */}
        <div className="absolute bottom-2.5 sm:bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-20">
          {imageList.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveImageIndex(dotIdx);
              }}
              className={`transition-all duration-300 ${
                dotIdx === activeImageIndex
                  ? 'w-6 h-1.5 rounded-full bg-[#d4af37]'
                  : 'w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. BOTTOM INFORMATION BAR: PURE WHITE WITH OUTLINE PILLS, BLACK PRICE & ACTION BUTTONS */}
      <div className="bg-white px-4 sm:px-6 py-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-t border-slate-100">
        {/* Left Side: 3 White Pill Badges with Thin Gray Border */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 bg-white border border-slate-300 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            <span>{isAr ? 'خدمة 24/7' : '24/7 SERVICE'}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 bg-white border border-slate-300 shadow-2xs">
            <Car className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            <span>{isAr ? 'من الباب للباب' : 'DOOR-TO-DOOR'}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 bg-white border border-slate-300 shadow-2xs">
            <Users className="w-3.5 h-3.5 text-slate-700 shrink-0" />
            <span>{isAr ? 'مناسب للعوائل' : 'FAMILY FRIENDLY'}</span>
          </span>
        </div>

        {/* Right Side: Starting Price & Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 sm:gap-4 md:gap-5">
          {/* Price Block: STARTING FROM on top line, SAR XXX / PER TRIP on bottom line */}
          <div className="flex flex-col sm:items-end shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-tight">
              {labels.startingFrom}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {route.customPricePrefix
                  ? `${route.customPricePrefix} ${formatPrice(route.priceSar)}`
                  : formatPrice(route.priceSar)}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {labels.perTrip}
              </span>
            </div>
          </div>

          {/* Action Buttons: "View Vehicles" and "BOOK NOW →" */}
          <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <Link
              href={`/${locale}/routes/${route.slug}`}
              className="flex-1 sm:flex-none border border-slate-900 hover:border-black hover:bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg transition-all text-center whitespace-nowrap shadow-2xs active:scale-[0.98]"
            >
              <span>{labels.viewVehicles}</span>
            </Link>

            <Link
              href={`/${locale}/booking?route=${route.slug}`}
              className="flex-1 sm:flex-none bg-gradient-to-r from-[#d99f2b] via-[#e5b23d] to-[#f4c84f] hover:from-[#e5b23d] hover:to-[#d99f2b] text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider px-5 sm:px-6 py-2.5 rounded-lg transition-all shadow-[0_4px_14px_rgba(217,159,43,0.35)] hover:shadow-[0_6px_18px_rgba(217,159,43,0.45)] flex items-center justify-center gap-2 text-center whitespace-nowrap active:scale-[0.98]"
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
