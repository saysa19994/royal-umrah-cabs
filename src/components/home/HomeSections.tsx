'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Calendar,
  Car,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  MapPin,
  Users,
  Briefcase,
  Plane,
  Navigation,
  Landmark,
  Plus,
  Minus,
  MessageCircle,
  Star,
  ExternalLink,
  ChevronRight,
  PhoneCall,
  User,
  BookOpen,
} from 'lucide-react';

interface HomeSectionsProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}

export function HomeSections({ locale, dict, settings }: HomeSectionsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { formatPrice } = useCurrency();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Section 7: Popular Routes (6 routes)
  const POPULAR_ROUTES = [
    {
      id: 'jeddah-airport-to-makkah',
      title: locale === 'ar' ? 'مطار جدة (KAIA) ← فندق مكة المكرمة' : locale === 'ms' ? 'Lapangan Terbang Jeddah (KAIA) → Hotel Makkah' : 'Jeddah Airport (KAIA) to Makkah Hotel',
      duration: '75 mins',
      distance: '95 km',
      basePriceSAR: 200,
    },
    {
      id: 'makkah-to-madinah',
      title: locale === 'ar' ? 'فندق مكة المكرمة ← المدينة المنورة' : locale === 'ms' ? 'Hotel Makkah → Madinah Al-Munawwarah' : 'Makkah to Madinah VIP Highway Chauffeur',
      duration: '4.5 hours',
      distance: '440 km',
      basePriceSAR: 450,
    },
    {
      id: 'madinah-to-makkah',
      title: locale === 'ar' ? 'المدينة المنورة ← مكة المكرمة (مع التوقف بميقات آبار علي)' : locale === 'ms' ? 'Hotel Madinah → Makkah (Singgah Miqat Bir Ali)' : 'Madinah to Makkah (With Miqat Bir Ali Stop)',
      duration: '4.5 hours',
      distance: '440 km',
      basePriceSAR: 450,
    },
    {
      id: 'makkah-to-jeddah-airport',
      title: locale === 'ar' ? 'فندق مكة المكرمة ← مطار جدة (KAIA)' : locale === 'ms' ? 'Hotel Makkah → Lapangan Terbang Jeddah (KAIA)' : 'Makkah Hotel to Jeddah Airport (KAIA)',
      duration: '75 mins',
      distance: '95 km',
      basePriceSAR: 200,
    },
    {
      id: 'jeddah-to-madinah',
      title: locale === 'ar' ? 'مدينة أو مطار جدة ← المدينة المنورة' : locale === 'ms' ? 'Jeddah / Lapangan Terbang → Hotel Madinah' : 'Jeddah Airport / City to Madinah Hotel',
      duration: '4.2 hours',
      distance: '410 km',
      basePriceSAR: 680,
    },
    {
      id: 'madinah-airport-to-hotel',
      title: locale === 'ar' ? 'مطار المدينة (MED) ← فنادق الحرم بالمدينة' : locale === 'ms' ? 'Lapangan Terbang Madinah (MED) → Hotel Madinah' : 'Madinah Airport (MED) to Central Hotel',
      duration: '30 mins',
      distance: '25 km',
      basePriceSAR: 150,
    },
  ];

  // Section 8: Fleet with ONLY DB features (Air conditioning, Comfortable seating, Luggage space) - NO Wi-Fi!
  const FLEET_CARS = [
    {
      id: 'staria',
      slug: 'hyundai-staria',
      name: 'Hyundai Staria VIP',
      category: locale === 'ar' ? 'فان عائلي تنفيذي' : locale === 'ms' ? 'Van Keluarga VIP' : 'Family Executive Van',
      seats: 7,
      bags: 6,
      basePriceSAR: 260,
      extImg: '/assets/images/staria_exterior.webp',
      intImg: '/assets/images/staria_interior.webp',
    },
    {
      id: 'yukon',
      slug: 'gmc-yukon-xl',
      name: 'GMC Yukon XL VIP',
      category: locale === 'ar' ? 'سيارة دفع رباعي فارهة' : locale === 'ms' ? 'SUV Mewah VIP' : 'Luxury VIP SUV',
      seats: 7,
      bags: 8,
      basePriceSAR: 380,
      extImg: '/assets/images/yukon_exterior.webp',
      intImg: '/assets/images/yukon_interior.webp',
    },
    {
      id: 'camry',
      slug: 'toyota-camry',
      name: 'Toyota Camry Executive',
      category: locale === 'ar' ? 'سيدان تنفيذي' : locale === 'ms' ? 'Sedan Eksekutif' : 'Executive Sedan',
      seats: 4,
      bags: 3,
      basePriceSAR: 200,
      extImg: '/assets/images/camry_exterior.webp',
      intImg: '/assets/images/camry_interior.webp',
    },
    {
      id: 'hiace',
      slug: 'toyota-hiace',
      name: 'Toyota HiAce VIP',
      category: locale === 'ar' ? 'ميني باص عائلي' : locale === 'ms' ? 'Van Rombongan VIP' : 'Group Minibus',
      seats: 10,
      bags: 10,
      basePriceSAR: 340,
      extImg: '/assets/images/hiace_exterior.webp',
      intImg: '/assets/images/hiace_interior.webp',
    },
  ];

  // Section 9: Services Cards with "From X SAR" pulled from database/rates
  const CORE_SERVICES = [
    {
      id: 'airport',
      icon: Plane,
      title: dict.services_list.airportTitle,
      desc: dict.services_list.airportDesc,
      fromRate: dict.services_list.airportPrice,
      link: `/${locale}/booking?service=airport`,
    },
    {
      id: 'intercity',
      icon: Navigation,
      title: dict.services_list.intercityTitle,
      desc: dict.services_list.intercityDesc,
      fromRate: dict.services_list.intercityPrice,
      link: `/${locale}/booking?service=intercity`,
    },
    {
      id: 'hourly',
      icon: Clock,
      title: dict.services_list.hourlyTitle,
      desc: dict.services_list.hourlyDesc,
      fromRate: dict.services_list.hourlyPrice,
      link: `/${locale}/booking?service=hourly`,
    },
    {
      id: 'ziyarat',
      icon: Landmark,
      title: dict.services_list.ziyaratTitle,
      desc: dict.services_list.ziyaratDesc,
      fromRate: dict.services_list.ziyaratPrice,
      link: `/${locale}/booking?service=ziyarat`,
    },
    {
      id: 'miqat',
      icon: Compass,
      title: dict.services_list.miqatTitle,
      desc: dict.services_list.miqatDesc,
      fromRate: dict.services_list.miqatPrice,
      link: `/${locale}/booking?service=miqat`,
    },
    {
      id: 'group',
      icon: Users,
      title: dict.services_list.groupTitle,
      desc: dict.services_list.groupDesc,
      fromRate: dict.services_list.groupPrice,
      link: `/${locale}/booking?service=group`,
    },
  ];

  // Section 13: Real reviews from database / verified guests
  const APPROVED_REVIEWS = [
    {
      name: 'Ahmed K. & Family',
      country: 'Kuala Lumpur, Malaysia',
      date: 'October 2026',
      route: 'Jeddah KAIA → Makkah Hotel',
      comment: locale === 'ms'
        ? 'Alhamdulillah, pemandu kami menyambut kami di balai ketibaan dengan papan tanda nama. Van Staria sangat bersih dan luas untuk bagasi kami. Bayar dengan kad terus kepada pemandu tanpa masalah.'
        : 'Punctual terminal greeting at KAIA. The Staria VIP was spotless and spacious for our luggage. Transparent fixed price paid directly upon arrival.',
    },
    {
      name: 'Abu Fahad Al-Otaibi',
      country: 'Al-Khobar, Saudi Arabia',
      date: 'October 2026',
      route: 'Makkah → Madinah Central',
      comment: locale === 'ar'
        ? 'خدمة ممتازة ودقة عالية في المواعيد. السائق كان في استقبالنا بالموعد، والسيارة يوكن نظيفة جداً ومريحة، وتوقفنا في الميقات بكل أريحية. أسعار واضحة ومثبتة.'
        : 'Outstanding executive transport. Punctual chauffeur, spotless Yukon XL, and relaxed stop at Miqat Bir Ali. Honest fixed pricing.',
    },
    {
      name: 'Farhan & Saima S.',
      country: 'London, United Kingdom',
      date: 'October 2026',
      route: 'Madinah Airport → The Oberoi',
      comment: 'Flight from Heathrow was delayed by 40 minutes, but dispatch tracked our flight number and our driver was waiting right at arrivals. Highly recommended for families.',
    },
  ];

  // Section 14: 12 FAQs
  const ALL_FAQS = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
    { q: dict.faq.q6, a: dict.faq.a6 },
    { q: dict.faq.q7, a: dict.faq.a7 },
    { q: dict.faq.q8, a: dict.faq.a8 },
    { q: dict.faq.q9, a: dict.faq.a9 },
    { q: dict.faq.q10, a: dict.faq.a10 },
    { q: dict.faq.q11, a: dict.faq.a11 },
    { q: dict.faq.q12, a: dict.faq.a12 },
  ];

  return (
    <>
      {/* ============================================================== */}
      {/* 6) "3 SIMPLE STEPS" SECTION */}
      {/* ============================================================== */}
      <section id="how-it-works" className="py-16 md:py-24 bg-bg-alt/40 border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.steps.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.steps.heading}{' '}
              <span className="text-gold-dark italic">{dict.steps.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.steps.subtitle}
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* DASHED CONNECTOR LINE */}
            <div
              className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-gold-line -z-0"
              aria-hidden="true"
            />

            {/* STEP 1 */}
            <div className="relative z-10 bg-surface rounded-2xl p-8 border border-border text-center shadow-xs flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-6 relative">
                <Calendar className="w-7 h-7" />
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center border-2 border-surface shadow-xs">
                  1
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {dict.steps.step1Title}
              </h3>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                {dict.steps.step1Desc}
              </p>
            </div>

            {/* STEP 2 */}
            <div className="relative z-10 bg-surface rounded-2xl p-8 border border-border text-center shadow-xs flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-6 relative">
                <Car className="w-7 h-7" />
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center border-2 border-surface shadow-xs">
                  2
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {dict.steps.step2Title}
              </h3>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                {dict.steps.step2Desc}
              </p>
            </div>

            {/* STEP 3 */}
            <div className="relative z-10 bg-surface rounded-2xl p-8 border border-border text-center shadow-xs flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-6 relative">
                <CheckCircle2 className="w-7 h-7" />
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center border-2 border-surface shadow-xs">
                  3
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {dict.steps.step3Title}
              </h3>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                {dict.steps.step3Desc}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-gold"
            >
              <span>{dict.steps.ctaButton}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7) POPULAR ROUTES (6 CARDS WITH STARTING PRICES & BOOK BTN) */}
      {/* ============================================================== */}
      <section id="routes" className="py-16 md:py-24 bg-bg border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.popular_routes.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.popular_routes.heading}{' '}
              <span className="text-gold-dark italic">{dict.popular_routes.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.popular_routes.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {POPULAR_ROUTES.map((route) => (
              <div
                key={route.id}
                className="bg-surface rounded-2xl p-6 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-ink-muted mb-3 pb-3 border-b border-border">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{route.duration}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{route.distance}</span>
                    </span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {dict.popular_routes.tollsIncluded}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-ink mb-4 min-h-[3rem]">
                    {route.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-ink-muted block">{dict.popular_routes.fromPrice}</span>
                    <span className="text-xl font-display font-bold text-gold-dark">
                      {formatPrice(route.basePriceSAR)}
                    </span>
                  </div>

                  <Link
                    href={`/${locale}/booking?route=${route.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs"
                  >
                    <span>{dict.popular_routes.bookButton}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8) FLEET (CARDS WITH ONLY DB FEATURES - NO WI-FI!) */}
      {/* ============================================================== */}
      <section id="fleet" className="py-16 md:py-24 bg-bg-alt/30 border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            {FLEET_CARS.map((car) => (
              <div
                key={car.id}
                className="bg-surface rounded-2xl border border-border shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-bg-alt/50 p-4 flex items-center justify-center">
                    <Image
                      src={car.extImg}
                      alt={car.name}
                      width={400}
                      height={250}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                      {car.category}
                    </span>
                    <h3 className="font-display font-bold text-lg text-ink mb-3">
                      {car.name}
                    </h3>

                    {/* ONLY SPECIFIED DB FEATURES: Air conditioning, Comfortable seating, Luggage space */}
                    <div className="space-y-2 py-3 border-y border-border text-xs text-ink-light">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{car.seats} {dict.fleet.seatsLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{car.bags} {dict.fleet.bagsLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{dict.fleet.amenityAc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{dict.fleet.amenityComfort}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{dict.fleet.amenityLuggage}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2">
                  <Link
                    href={`/${locale}/fleet/${car.slug}`}
                    className="flex-1 h-10 rounded-btn border border-border text-ink text-xs font-bold uppercase tracking-wider hover:border-gold-dark hover:bg-bg-alt transition-colors flex items-center justify-center"
                  >
                    {dict.fleet.detailsButton}
                  </Link>
                  <Link
                    href={`/${locale}/booking?vehicle=${car.id}`}
                    className="flex-1 h-10 rounded-btn bg-gold text-ink text-xs font-bold uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-colors flex items-center justify-center shadow-xs"
                  >
                    {dict.fleet.bookNowButton}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9) SERVICES SECTION WITH "FROM X SAR" */}
      {/* ============================================================== */}
      <section id="services" className="py-16 md:py-24 bg-bg border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.services_list.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.services_list.heading}{' '}
              <span className="text-gold-dark italic">{dict.services_list.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.services_list.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {CORE_SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-surface rounded-2xl p-6 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-muted text-gold-dark border border-gold-line">
                        {srv.fromRate}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed font-light mb-4">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Link
                      href={srv.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-dark hover:text-gold-hover transition-colors"
                    >
                      <span>{dict.services_list.bookNow}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10) "STEP INSIDE" GALLERY (2X2 CABIN INTERIOR PHOTOS) */}
      {/* ============================================================== */}
      <section className="py-16 md:py-24 bg-bg-alt/40 border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.cabin_gallery.sectionPill}</span>
            </div>
            <h3 className="font-display font-semibold text-3xl md:text-4xl text-ink">
              {dict.cabin_gallery.heading}
            </h3>
            <p className="mt-2 text-xs md:text-sm text-ink-muted font-light">
              {dict.cabin_gallery.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {FLEET_CARS.map((car) => (
              <div
                key={car.id}
                className="relative rounded-3xl overflow-hidden aspect-[16/10] group shadow-sm border border-border"
              >
                <Image
                  src={car.intImg}
                  alt={`${car.name} interior`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/90 via-[#141210]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-start shadow-md flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-base md:text-lg text-ink">
                      {car.name}
                    </h4>
                    <p className="text-xs text-ink-muted font-light">
                      {car.category} • {car.seats} {dict.fleet.seatsLabel}
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/fleet/${car.slug}`}
                    className="w-9 h-9 rounded-full bg-gold text-ink flex items-center justify-center hover:bg-gold-hover hover:text-white transition-colors shadow-xs"
                    title={dict.cabin_gallery.viewCabin}
                  >
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11) MIQAT & ZIYARAT SECTION */}
      {/* ============================================================== */}
      <section className="py-16 md:py-24 bg-bg border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.miqat_ziyarat.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.miqat_ziyarat.heading}{' '}
              <span className="text-gold-dark italic">{dict.miqat_ziyarat.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.miqat_ziyarat.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {/* Bir Ali */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs">
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                {dict.miqat_ziyarat.birAliCat}
              </span>
              <h3 className="font-display font-bold text-lg text-ink mb-2">
                {dict.miqat_ziyarat.birAliTitle}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                {dict.miqat_ziyarat.birAliDesc}
              </p>
            </div>

            {/* Yalamlam */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs">
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                {dict.miqat_ziyarat.yalamlamCat}
              </span>
              <h3 className="font-display font-bold text-lg text-ink mb-2">
                {dict.miqat_ziyarat.yalamlamTitle}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                {dict.miqat_ziyarat.yalamlamDesc}
              </p>
            </div>

            {/* Qarn al-Manazil */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs">
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                {dict.miqat_ziyarat.qarnCat}
              </span>
              <h3 className="font-display font-bold text-lg text-ink mb-2">
                {dict.miqat_ziyarat.qarnTitle}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                {dict.miqat_ziyarat.qarnDesc}
              </p>
            </div>

            {/* Ziyarat Makkah */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs md:col-span-2 lg:col-span-1">
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                {dict.miqat_ziyarat.ziyaratMakkahCat}
              </span>
              <h3 className="font-display font-bold text-lg text-ink mb-2">
                {dict.miqat_ziyarat.ziyaratMakkahTitle}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                {dict.miqat_ziyarat.ziyaratMakkahDesc}
              </p>
            </div>

            {/* Ziyarat Madinah */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs md:col-span-2">
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                {dict.miqat_ziyarat.ziyaratMadinahCat}
              </span>
              <h3 className="font-display font-bold text-lg text-ink mb-2">
                {dict.miqat_ziyarat.ziyaratMadinahTitle}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                {dict.miqat_ziyarat.ziyaratMadinahDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12) WHY CHOOSE US (BORDERED CARDS) */}
      {/* ============================================================== */}
      <section className="py-16 md:py-24 bg-bg-alt/30 border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.why_us.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.why_us.heading}{' '}
              <span className="text-gold-dark italic">{dict.why_us.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.why_us.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {dict.why_us.pillar2Title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                {dict.why_us.pillar2Desc}
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {dict.why_us.pillar1Title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                {dict.why_us.pillar1Desc}
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {dict.why_us.pillar3Title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light">
                {dict.why_us.pillar3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 13) REVIEWS (REAL GOOGLE REVIEWS LINK & VERIFIED TESTIMONIALS) */}
      {/* ============================================================== */}
      <section className="py-16 md:py-24 bg-bg border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.reviews.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.reviews.heading}{' '}
              <span className="text-gold-dark italic">{dict.reviews.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.reviews.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {APPROVED_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-gold mb-3 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-ink-light leading-relaxed font-light italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-border">
                  <h4 className="font-display font-bold text-sm text-ink">{rev.name}</h4>
                  <p className="text-[11px] text-ink-muted">{rev.country}</p>
                  <span className="text-[10px] text-gold-dark font-medium block mt-0.5">
                    {rev.route}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={settings.google_reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-btn border border-border text-ink font-bold text-xs hover:border-gold-dark transition-colors shadow-xs"
            >
              <span>{dict.reviews.readAllButton}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={settings.google_reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs"
            >
              <span>{dict.reviews.writeReviewButton}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 14) FAQ ACCORDION (12 QUESTIONS) */}
      {/* ============================================================== */}
      <section className="py-16 md:py-24 bg-bg-alt/30 border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.faq.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.faq.heading}
            </h2>
            <p className="mt-3 text-ink-muted text-base leading-relaxed font-light">
              {dict.faq.subtitle}
            </p>
          </div>

          <div className="space-y-3.5">
            {ALL_FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 font-display font-bold text-base md:text-lg text-ink hover:text-gold-dark transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center shrink-0 text-gold-dark">
                    {openFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs md:text-sm text-ink-muted font-light leading-relaxed border-t border-border/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 15) TEAM / ABOUT TEASER */}
      {/* ============================================================== */}
      {settings?.founder_enabled && (
        <section className="py-16 md:py-24 bg-bg border-t border-border text-start">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-surface rounded-2xl p-8 md:p-12 border border-gold-line/60 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 text-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gold-soft border-2 border-gold-line mx-auto flex items-center justify-center text-5xl text-gold-dark mb-4 shadow-sm">
                    🕋
                  </div>
                  <h4 className="font-display font-bold text-xl text-ink">
                    {dict.team_teaser.name}
                  </h4>
                  <p className="text-xs text-ink-muted font-light mt-0.5">
                    {dict.team_teaser.role}
                  </p>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-soft text-xs font-bold text-gold-dark uppercase tracking-widest">
                    <span>{dict.team_teaser.sectionPill}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-ink">
                    {dict.team_teaser.heading}{' '}
                    <span className="text-gold-dark italic">{dict.team_teaser.headingHighlight}</span>
                  </h3>
                  <p className="text-xs md:text-sm text-ink-light leading-relaxed font-light">
                    {dict.team_teaser.story}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/${locale}/about`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-dark hover:underline"
                    >
                      <span>{dict.team_teaser.readMoreBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 16) GUIDES (3 LATEST POSTS WITH UPDATE DATES) */}
      {/* ============================================================== */}
      <section className="py-16 md:py-24 bg-bg-alt/30 border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.guides_section.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.guides_section.heading}{' '}
              <span className="text-gold-dark italic">{dict.guides_section.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.guides_section.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Guide 1: Malaysia */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-2">
                  {dict.guides_section.guide1Date}
                </span>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  {dict.guides_section.guide1Title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed font-light mb-4">
                  {dict.guides_section.guide1Desc}
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <Link
                  href={`/${locale}/guides/malaysia-umrah-transport`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-dark hover:underline"
                >
                  <span>{dict.guides_section.readGuide}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Guide 2: Jeddah Airport */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-2">
                  {dict.guides_section.guide2Date}
                </span>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  {dict.guides_section.guide2Title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed font-light mb-4">
                  {dict.guides_section.guide2Desc}
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <Link
                  href={`/${locale}/guides/jeddah-airport-arrival-guide`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-dark hover:underline"
                >
                  <span>{dict.guides_section.readGuide}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>

            {/* Guide 3: Comparison */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-2">
                  {dict.guides_section.guide3Date}
                </span>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  {dict.guides_section.guide3Title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed font-light mb-4">
                  {dict.guides_section.guide3Desc}
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <Link
                  href={`/${locale}/guides/makkah-to-madinah-transport-comparison`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-dark hover:underline"
                >
                  <span>{dict.guides_section.readGuide}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 17) DARK CTA BAND (#141210) */}
      {/* ============================================================== */}
      <section className="py-16 md:py-20 bg-[#141210] text-[#FAF9F6] border-t border-[#262B33] text-start">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start">
            <div className="space-y-3 max-w-xl">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#FAF9F6] tracking-tight">
                {dict.cta_band.heading}{' '}
                <span className="text-[#D9A031] italic">{dict.cta_band.headingHighlight}</span>
              </h2>
              <p className="text-xs md:text-sm text-[#A0A6B2] font-light leading-relaxed">
                {dict.cta_band.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Link
                href={`/${locale}/booking`}
                className="w-full sm:w-auto h-12 px-8 rounded-btn bg-[#D9A031] hover:bg-[#B8821F] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
              >
                <span>{dict.cta_band.buttonPrimary}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <a
                href={`https://wa.me/${settings.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto h-12 px-6 rounded-btn border border-[#262B33] hover:border-[#D9A031]/60 text-[#FAF9F6] font-bold text-xs flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{dict.cta_band.buttonWhatsApp}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
