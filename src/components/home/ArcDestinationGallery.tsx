'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { ArrowRight, ArrowLeft, Compass } from 'lucide-react';

interface ArcDestinationGalleryProps {
  locale: Locale;
  dict: Dictionary;
}

export function ArcDestinationGallery({
  locale,
  dict,
}: ArcDestinationGalleryProps) {
  const localeMeta = LOCALE_CONFIG[locale] || LOCALE_CONFIG.en;
  const dir = localeMeta.dir;
  const isRtl = dir === 'rtl';

  const items = [
    {
      src: '/assets/images/routes/makkah-ziyarat.jpg',
      alt: dict.arc_gallery.destHira,
      href: '/ziyarat/makkah',
      visibility: 'hidden lg:block',
    },
    {
      src: '/assets/blueprint/routes/madinah-ziyarat.webp',
      alt: dict.arc_gallery.destQuba,
      href: '/ziyarat/madinah',
      visibility: 'hidden lg:block',
    },
    {
      src: '/assets/images/routes/jeddah-airport-to-makkah.jpg',
      alt: dict.arc_gallery.destJeddah,
      href: '/routes/jeddah-airport-to-makkah',
      visibility: 'hidden md:block',
    },
    {
      src: '/assets/images/routes/jeddah-to-madinah.jpg',
      alt: dict.arc_gallery.destNabawi,
      href: '/ziyarat/madinah',
      visibility: 'block',
    },
    {
      src: '/assets/blueprint/routes/haram.webp',
      alt: dict.arc_gallery.destHaram,
      href: '/booking',
      visibility: 'block',
      isCenter: true,
      imgPos: 'object-[78%_55%]',
    },
    {
      src: '/assets/images/blog/makkah-to-jeddah-airport-transfer.webp',
      alt: dict.arc_gallery.destClockTower,
      href: '/routes/makkah-to-jeddah-airport',
      visibility: 'block',
    },
    {
      src: '/assets/images/routes/madinah-airport.jpg',
      alt: dict.arc_gallery.destPromenade,
      href: '/routes/madinah-airport-to-hotel',
      visibility: 'hidden md:block',
    },
    {
      src: '/assets/blueprint/routes/makkah-madinah.webp',
      alt: dict.arc_gallery.destHijrah,
      href: '/routes/makkah-to-madinah',
      visibility: 'hidden lg:block',
    },
    {
      src: '/assets/images/routes/makkah-to-taif.jpg',
      alt: dict.arc_gallery.destTaif,
      href: '/services/taif',
      visibility: 'hidden lg:block',
    },
  ];

  return (
    <section
      id="arc-destination-gallery"
      aria-labelledby="arc-gallery-heading"
      dir={dir}
      className="arc-gallery-stage relative bg-[#F7F5F0] text-[#101827] border-t border-b border-[#E8E3DA] pt-14 sm:pt-20 lg:pt-24 pb-14 sm:pb-16 lg:pb-20 overflow-hidden"
    >
      {/* Subtle Warm Ivory Editorial Background Vignette */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(169,123,39,0.08)_0%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Centered Editorial Headline & Action Hub */}
      <div className="max-w-lg xl:max-w-xl mx-auto px-4 text-center relative z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DEC9] shadow-xs text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#A97B27] mb-4">
          <Compass className="w-3.5 h-3.5 text-[#A97B27] shrink-0" />
          <span>{dict.miqat_ziyarat.sectionPill}</span>
        </div>

        <h2
          id="arc-gallery-heading"
          className="font-playfair font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#101827] leading-[1.18] tracking-tight"
        >
          {dict.miqat_ziyarat.heading}{' '}
          <span className="text-[#A97B27]">{dict.miqat_ziyarat.headingHighlight}</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-md mx-auto">
          {dict.miqat_ziyarat.subtitle}
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href={`/${locale}/ziyarat`}
            className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-7 py-3 rounded-full bg-[#101827] text-[#F7F5F0] hover:bg-[#19243B] font-semibold text-xs sm:text-sm tracking-wide shadow-[0_12px_28px_rgba(16,24,39,0.18)] transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0] group"
          >
            <span>{dict.arc_gallery.cta}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 text-[#D6A13A] transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-4 h-4 text-[#D6A13A] transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </div>

      {/* Curved Floating-Image Arc Composition with Slow CSS Transform Drift */}
      <div className="relative z-10 mt-8 sm:mt-10 lg:mt-14 pt-6 pb-4">
        <div className="arc-gallery-drift flex items-start justify-center gap-2 sm:gap-3.5 md:gap-4 lg:gap-2.5 xl:gap-4 px-2 sm:px-6 mx-auto max-w-[1420px]">
          {items.map((item, idx) => (
            <div
              key={`arc-slot-${idx}`}
              className={`arc-slot arc-slot-${idx} ${item.visibility} shrink-0 ${
                item.isCenter ? 'z-20' : 'z-10 hover:z-30 focus-within:z-30'
              }`}
            >
              <Link
                href={`/${locale}${item.href}`}
                aria-label={item.alt}
                className={`group relative block rounded-2xl sm:rounded-[20px] bg-white p-1 sm:p-1.5 border transition-transform duration-300 hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A97B27] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F5F0] ${
                  item.isCenter
                    ? 'w-[114px] sm:w-[152px] md:w-[128px] lg:w-[112px] xl:w-[148px] border-[#A97B27]/50 shadow-[0_24px_55px_rgba(16,24,39,0.20)]'
                    : 'w-[100px] sm:w-[138px] md:w-[116px] lg:w-[100px] xl:w-[134px] border-[#E5DEC9] hover:border-[#A97B27]/70 shadow-[0_18px_42px_rgba(16,24,39,0.12)]'
                }`}
              >
                <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-xl sm:rounded-[15px] bg-[#101827]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 114px, (max-width: 1024px) 148px, 160px"
                    className={`object-cover ${item.imgPos || 'object-center'} transition-transform duration-500 ease-out group-hover:scale-105`}
                  />
                  {/* Subtle editorial caption overlay revealed cleanly on hover / keyboard focus */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101827]/85 via-[#101827]/15 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-end p-2.5 sm:p-3">
                    <span className="text-[10px] sm:text-[11px] font-medium text-[#F7F5F0] leading-tight line-clamp-2 text-start">
                      {item.alt}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
