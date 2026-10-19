'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { Users, Briefcase, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface FleetSectionProps {
  locale: Locale;
  dict: Dictionary;
}

const VEHICLES = [
  {
    id: 'staria',
    slug: 'hyundai-staria',
    name: 'Hyundai Staria VIP',
    category: 'Family Van',
    seats: 7,
    bags: 6,
    basePriceSAR: 260,
    extImg: '/assets/images/staria_exterior.webp',
    intImg: '/assets/images/staria_interior.webp',
    tagline: 'Space that breathes with you',
  },
  {
    id: 'yukon',
    slug: 'gmc-yukon-xl',
    name: 'GMC Yukon XL VIP',
    category: 'VIP SUV',
    seats: 7,
    bags: 8,
    basePriceSAR: 380,
    extImg: '/assets/images/yukon_exterior.webp',
    intImg: '/assets/images/yukon_interior.webp',
    tagline: 'Where the journey slows down',
  },
  {
    id: 'camry',
    slug: 'toyota-camry',
    name: 'Toyota Camry Executive',
    category: 'Executive Sedan',
    seats: 4,
    bags: 3,
    basePriceSAR: 200,
    extImg: '/assets/images/camry_exterior.webp',
    intImg: '/assets/images/camry_interior.webp',
    tagline: 'Quiet comfort for couples & solo travelers',
  },
  {
    id: 'hiace',
    slug: 'toyota-hiace',
    name: 'Toyota HiAce VIP',
    category: 'Mini Bus',
    seats: 10,
    bags: 10,
    basePriceSAR: 340,
    extImg: '/assets/images/hiace_exterior.webp',
    intImg: '/assets/images/hiace_interior.webp',
    tagline: 'Together in comfort for large families',
  },
];

export function FleetSection({ locale, dict }: FleetSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { formatPrice } = useCurrency();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? VEHICLES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === VEHICLES.length - 1 ? 0 : prev + 1));
  };

  const currentCar = VEHICLES[currentIndex];

  return (
    <section id="fleet" className="py-16 md:py-24 bg-bg border-t border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.fleet.sectionPill}</span>
          </div>
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.fleet.heading}
          </h2>
          <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            {dict.fleet.subtitle}
          </p>
        </div>

        {/* 1. FLEET CAROUSEL */}
        <div className="relative max-w-5xl mx-auto bg-surface rounded-2xl border border-border p-6 md:p-10 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* CAR PHOTO WITH ARROWS */}
            <div className="lg:col-span-7 relative flex items-center justify-center min-h-[260px] sm:min-h-[340px] bg-bg-alt/40 rounded-xl p-4 overflow-hidden">
              <Image
                src={currentCar.extImg}
                alt={currentCar.name}
                width={600}
                height={350}
                sizes="(max-width: 768px) 100vw, 600px"
                loading="lazy"
                className="w-full h-auto max-h-[300px] object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
              />

              {/* CAROUSEL CONTROLS */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Car"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/90 border border-border text-ink hover:bg-gold-soft hover:text-gold-dark flex items-center justify-center shadow-xs transition-colors"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Car"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/90 border border-border text-ink hover:bg-gold-soft hover:text-gold-dark flex items-center justify-center shadow-xs transition-colors"
              >
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>

            {/* CAR DETAILS CARD */}
            <div className="lg:col-span-5 flex flex-col text-start space-y-4">
              <div>
                <span className="text-xs font-bold text-gold-dark uppercase tracking-widest">
                  {currentCar.category}
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-ink mt-1">
                  {currentCar.name}
                </h3>
                <p className="text-xs text-ink-muted italic mt-1 font-light">
                  "{currentCar.tagline}"
                </p>
              </div>

              {/* SPECS */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-border text-xs text-ink font-semibold">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gold-dark" />
                  <span>{currentCar.seats} {dict.fleet.seatsLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gold-dark" />
                  <span>{currentCar.bags} {dict.fleet.bagsLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-dark" />
                  <span>{dict.fleet.amenityZamzam}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-dark" />
                  <span>{dict.fleet.amenityLuggage}</span>
                </div>
              </div>

              {/* PRICE & CTAS */}
              <div className="pt-2 flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-ink-muted">Starting Route Price:</span>
                  <span className="text-2xl font-display font-bold text-ink">
                    {formatPrice(currentCar.basePriceSAR)}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link
                    href={`/${locale}/fleet/${currentCar.slug}`}
                    className="flex-1 h-11 rounded-btn border border-border-strong text-ink text-xs font-bold uppercase tracking-wider hover:border-gold-dark hover:bg-bg-alt transition-colors flex items-center justify-center"
                  >
                    {dict.fleet.detailsButton}
                  </Link>
                  <Link
                    href={`/${locale}/booking?vehicle=${currentCar.id}`}
                    className="flex-1 h-11 rounded-btn bg-gold text-ink text-xs font-bold uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>{dict.fleet.bookNowButton}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 'STEP INSIDE' GALLERY (2X2 GRID OF ROUNDED-3XL INTERIOR PHOTOS WITH GLASS-STYLE CAPTION BOX) */}
        <div>
          <div className="text-center mb-8">
            <h3 className="font-display font-semibold text-2xl md:text-3xl text-ink">
              Step Inside the Cabin
            </h3>
            <p className="text-xs md:text-sm text-ink-muted mt-1">
              High-resolution panoramic interiors designed for maximum relaxation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {VEHICLES.map((car) => (
              <div
                key={car.id}
                className="relative rounded-3xl overflow-hidden aspect-[16/10] group shadow-sm border border-border"
              >
                <Image
                  src={car.intImg}
                  alt={`${car.name} interior cabin`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* DARK GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />

                {/* GLASS-STYLE CAPTION BOX */}
                <div className="absolute bottom-4 left-4 right-4 bg-surface/85 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-start shadow-md flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-lg text-ink">
                      {car.name}
                    </h4>
                    <p className="text-xs text-ink-muted">
                      {car.category} • {car.seats} {dict.fleet.seatsLabel}
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/fleet/${car.slug}`}
                    className="w-9 h-9 rounded-full bg-gold text-ink flex items-center justify-center hover:bg-gold-hover hover:text-white transition-colors shadow-xs"
                  >
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
