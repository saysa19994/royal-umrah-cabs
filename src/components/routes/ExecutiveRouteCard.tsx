'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { Clock, MapPin, CheckCircle2, ArrowRight, Car } from 'lucide-react';
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

export function ExecutiveRouteCard({ route, locale }: ExecutiveRouteCardProps) {
  const { formatPrice } = useCurrency();
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const time = isAr ? route.timeAr : route.timeEn;
  const distance = isAr ? route.distanceAr : route.distanceEn;
  const title = isAr ? route.titleAr : route.titleEn;
  const subtitle = isAr ? route.titleEn : route.titleAr;
  const descPrimary = isAr ? route.descAr : route.descEn;
  const descSecondary = isAr ? route.descEn : route.descAr;
  const badgesPrimary = isAr ? route.badgesAr : route.badgesEn;
  const badgesSecondary = isAr ? route.badgesEn : route.badgesAr;

  return (
    <article
      className="bg-white rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-stretch gap-5 lg:gap-8 text-start overflow-hidden group"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 1. SCENIC PHOTOGRAPH (Optimized for Mobile, Tablet, Laptop, and Desktop screens) */}
      <div className="relative w-full md:w-[320px] lg:w-[360px] xl:w-[380px] aspect-[16/10] sm:aspect-[16/10] md:aspect-[3/4] md:h-auto min-h-[200px] sm:min-h-[240px] md:min-h-[350px] rounded-2xl overflow-hidden shrink-0 bg-slate-100 shadow-xs">
        <Image
          src={route.image}
          alt={`${title} - Duyuf Alrahman VIP`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 300px, (max-width: 1280px) 340px, 360px"
          className={`object-cover ${route.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-500`}
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none md:hidden" />
      </div>

      {/* 2. CARD CONTENT & DETAILS */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          {/* TOP META: DURATION & DISTANCE */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 mb-2.5">
            <div className="flex items-center gap-1.5 text-amber-600">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-slate-700 font-semibold">{time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-slate-700 font-semibold">{distance}</span>
            </div>
          </div>

          {/* MAIN TITLES (Primary + Secondary Subtitle) */}
          <div className="mb-3">
            <h3 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-snug">
              {title}
            </h3>
            <p className="text-sm font-bold text-slate-500 mt-0.5">
              {subtitle}
            </p>
          </div>

          {/* DUAL LANGUAGE DESCRIPTIONS */}
          <div className="space-y-1.5 mb-5">
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {descPrimary}
            </p>
            <p
              className={`text-xs text-slate-500 leading-relaxed font-light ${
                isRtl ? 'text-start' : 'text-slate-500'
              }`}
            >
              {descSecondary}
            </p>
          </div>

          {/* TRIP FEATURES & BADGES (Rounded Pills with Checkmarks) */}
          <div className="space-y-2 mb-6">
            {/* Primary Language Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {badgesPrimary.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>

            {/* Secondary Language Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {badgesSecondary.map((badge, idx) => (
                <span
                  key={`sec-${idx}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-amber-50/60 border border-amber-200/70 text-slate-700"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM PRICE & ACTION BUTTONS */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Price Block */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              {isAr ? 'يبدأ من' : 'STARTING FROM'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {route.customPricePrefix
                  ? `${route.customPricePrefix} ${formatPrice(route.priceSar)}`
                  : formatPrice(route.priceSar)}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              {isAr ? 'لكل رحلة' : 'PER TRIP'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Link
              href={`/${locale}/routes/${route.slug}`}
              className="flex-1 sm:flex-none h-11 px-4 sm:px-5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-800 text-xs font-bold transition-all flex items-center justify-center text-center shadow-2xs hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{isAr ? 'عرض السيارات المتاحة' : 'View Available Vehicles'}</span>
            </Link>

            <Link
              href={`/${locale}/booking?route=${route.slug}`}
              className="flex-1 sm:flex-none h-11 px-5 sm:px-6 rounded-xl bg-[#D4A017] hover:bg-[#c49313] hover:shadow-[0_4px_14px_rgba(212,160,23,0.35)] text-slate-950 text-xs font-extrabold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 text-center active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
