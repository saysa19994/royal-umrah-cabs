'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
  X,
} from 'lucide-react';
import {
  FLEET_SHOWCASE_VEHICLES,
  FLEET_SHOWCASE_UI,
  type FleetShowcaseVehicle,
} from '@/data/fleet-showcase-data';

// ============================================================================
// CUSTOM LUXURY SVG ICONS (Faithful to Reference Images 03 & 14)
// ============================================================================

function FirstClassClimateIcon({ className = 'w-7 h-7 text-[#C5A059]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5C12 5.5 15 3.5 17 4.5s0.5 4.5-2.5 5" />
      <path d="M14.5 12c4 0 6 3 5 5s-4.5 0.5-5-2.5" />
      <path d="M12 14.5c0 4-3 6-5 5s-0.5-4.5 2.5-5" />
      <path d="M9.5 12c-4 0-6-3-5-5s4.5-0.5 5 2.5" />
    </svg>
  );
}

function ExecutiveChauffeurIcon({ className = 'w-7 h-7 text-[#C5A059]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Peaked Chauffeur Cap */}
      <path d="M7 9a5 5 0 0 1 10 0v1H7V9Z" />
      <path d="M5 10h14l1 1.5H4L5 10Z" />
      {/* Face & Collar */}
      <circle cx="12" cy="13" r="2" />
      {/* Formal Uniform Shoulders */}
      <path d="M6 21v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3" />
      <path d="M10.5 17.5 12 19l1.5-1.5" />
    </svg>
  );
}

function NappaLeatherSeatIcon({ className = 'w-7 h-7 text-[#C5A059]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Backrest & Headrest */}
      <rect x="9" y="2" width="6" height="3" rx="1.5" />
      <path d="M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      {/* Reclining Ergonomic Stitching */}
      <path d="M10 6v12" />
      <path d="M14 6v12" />
      {/* Cushion */}
      <path d="M5 18h14a3 3 0 0 1 3 3v1H2v-1a3 3 0 0 1 3-3Z" />
    </svg>
  );
}

function PremiumComfortDiamondIcon({ className = 'w-7 h-7 text-[#C5A059]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
      <path d="M2 9h20" />
      <path d="M10 3l-2 6 4 12 4-12-2-6" />
    </svg>
  );
}

function CarSilhouetteIcon({ className = 'w-6 h-6 text-[#C5A059]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 15l2.5-6h9l2.5 6" />
      <path d="M3 15h18a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1Z" />
      <circle cx="7" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

// 4 Verified Features Matching the Reference Images (First-Class Climate, Executive Chauffeur, Nappa Leather, Premium Comfort)
const LUXURY_FLEET_FEATURES = [
  {
    key: 'climate',
    icon: FirstClassClimateIcon,
    line1: {
      en: 'First-Class',
      ar: 'تكييف هوائي',
      ms: 'Iklim',
      id: 'Pendingin',
      ur: 'شاہی ایئر',
      fr: 'Climatisation',
      es: 'Climatización',
      de: 'First-Class',
      hi: 'प्रथम श्रेणी',
      tr: 'Birinci Sınıf',
    },
    line2: {
      en: 'Climate',
      ar: 'ملكي فاخر',
      ms: 'Kelas Pertama',
      id: 'Kelas Satu',
      ur: 'کنڈیشننگ',
      fr: 'Première Classe',
      es: 'Primera Clase',
      de: 'Klimaautomatik',
      hi: 'वातानुकूलन',
      tr: 'Klima',
    },
    fullLabel: {
      en: 'First-Class Climate',
      ar: 'تكييف هوائي ملكي',
      ms: 'Iklim Kelas Pertama',
      id: 'Pendingin Kelas Satu',
      ur: 'شاہی ایئر کنڈیشننگ',
      fr: 'Climatisation Première Classe',
      es: 'Climatización Primera Clase',
      de: 'First-Class Klima',
      hi: 'प्रथम श्रेणी एसी',
      tr: 'Birinci Sınıf Klima',
    },
  },
  {
    key: 'chauffeur',
    icon: ExecutiveChauffeurIcon,
    line1: {
      en: 'Executive',
      ar: 'سائق خاص',
      ms: 'Pemandu',
      id: 'Sopir',
      ur: 'وی آئی پی',
      fr: 'Chauffeur',
      es: 'Chófer',
      de: 'Exekutiver',
      hi: 'एग्जीक्यूटिव',
      tr: 'Özel VIP',
    },
    line2: {
      en: 'Chauffeur',
      ar: 'VIP معتمد',
      ms: 'Eksekutif',
      id: 'Eksekutif',
      ur: 'پرائیویٹ ڈرائیور',
      fr: 'Exécutif',
      es: 'Ejecutivo VIP',
      de: 'Chauffeur',
      hi: 'चौफर',
      tr: 'Şoför',
    },
    fullLabel: {
      en: 'Executive Chauffeur',
      ar: 'سائق خاص VIP',
      ms: 'Pemandu Eksekutif',
      id: 'Sopir Eksekutif',
      ur: 'وی آئی پی ڈرائیور',
      fr: 'Chauffeur Exécutif',
      es: 'Chófer Ejecutivo',
      de: 'Exekutiver Chauffeur',
      hi: 'एग्जीक्यूटिव चौफर',
      tr: 'Özel VIP Şoför',
    },
  },
  {
    key: 'leather',
    icon: NappaLeatherSeatIcon,
    line1: {
      en: 'Nappa',
      ar: 'مقصورة جلد',
      ms: 'Kulit',
      id: 'Kulit',
      ur: 'ناپا چمڑے',
      fr: 'Cuir',
      es: 'Cuero',
      de: 'Nappa',
      hi: 'नापा',
      tr: 'Nappa',
    },
    line2: {
      en: 'Leather',
      ar: 'نابا فخمة',
      ms: 'Nappa Mewah',
      id: 'Nappa Premium',
      ur: 'کی نشستیں',
      fr: 'Nappa Exclusif',
      es: 'Nappa Exclusivo',
      de: 'Lederausstattung',
      hi: 'चमड़ा सीटें',
      tr: 'Deri Döşeme',
    },
    fullLabel: {
      en: 'Nappa Leather',
      ar: 'مقصورة جلد نابا',
      ms: 'Kulit Nappa',
      id: 'Kulit Nappa',
      ur: 'ناپا چمڑے کی نشستیں',
      fr: 'Cuir Nappa',
      es: 'Cuero Nappa',
      de: 'Nappaleder',
      hi: 'नापा चमड़ा',
      tr: 'Nappa Deri',
    },
  },
  {
    key: 'comfort',
    icon: PremiumComfortDiamondIcon,
    line1: {
      en: 'Premium',
      ar: 'راحة استثنائية',
      ms: 'Keselesaan',
      id: 'Kenyamanan',
      ur: 'پریمیم آرام',
      fr: 'Confort',
      es: 'Confort',
      de: 'Premium',
      hi: 'प्रीमियम',
      tr: 'Üstün',
    },
    line2: {
      en: 'Comfort',
      ar: 'وهدوء تام',
      ms: 'Premium',
      id: 'Premium',
      ur: 'و سکون',
      fr: 'Premium',
      es: 'Premium',
      de: 'Komfort',
      hi: 'आराम',
      tr: 'Konfor',
    },
    fullLabel: {
      en: 'Premium Comfort',
      ar: 'راحة استثنائية وهدوء',
      ms: 'Keselesaan Premium',
      id: 'Kenyamanan Premium',
      ur: 'پریمیم آرام و سکون',
      fr: 'Confort Premium',
      es: 'Confort Premium',
      de: 'Premium Komfort',
      hi: 'प्रीमियम आराम',
      tr: 'Üstün Konfor',
    },
  },
];

const FLEET_LABELS_10: Record<
  Locale,
  {
    vehicleDetails: string;
    exteriorLabel: string;
    interiorLabel: string;
    ultraVipBadge: string;
  }
> = {
  ar: {
    vehicleDetails: 'تفاصيل المركبة',
    exteriorLabel: 'من الخارج',
    interiorLabel: 'المقصورة الداخلية',
    ultraVipBadge: '★ فئة كبار الشخصيات • درجة أولى',
  },
  en: {
    vehicleDetails: 'VEHICLE DETAILS',
    exteriorLabel: 'EXTERIOR',
    interiorLabel: 'INTERIOR',
    ultraVipBadge: '★ ULTRA VIP • FIRST CLASS',
  },
  ms: {
    vehicleDetails: 'BUTIRAN KENDERAAN',
    exteriorLabel: 'LUARAN',
    interiorLabel: 'DALAMAN',
    ultraVipBadge: '★ ULTRA VIP • KELAS PERTAMA',
  },
  id: {
    vehicleDetails: 'DETAIL KENDARAAN',
    exteriorLabel: 'EKSTERIOR',
    interiorLabel: 'INTERIOR',
    ultraVipBadge: '★ ULTRA VIP • KELAS SATU',
  },
  ur: {
    vehicleDetails: 'گاڑی کی تفصیلات',
    exteriorLabel: 'بیرونی منظر',
    interiorLabel: 'اندرونی کیبن',
    ultraVipBadge: '★ الٹرا وی آئی پی • فرسٹ کلاس',
  },
  fr: {
    vehicleDetails: 'DÉTAILS DU VÉHICULE',
    exteriorLabel: 'EXTÉRIEUR',
    interiorLabel: 'INTÉRIEUR',
    ultraVipBadge: '★ ULTRA VIP • PREMIÈRE CLASSE',
  },
  es: {
    vehicleDetails: 'DETALLES DEL VEHÍCULO',
    exteriorLabel: 'EXTERIOR',
    interiorLabel: 'INTERIOR',
    ultraVipBadge: '★ ULTRA VIP • PRIMERA CLASE',
  },
  de: {
    vehicleDetails: 'FAHRZEUGDETAILS',
    exteriorLabel: 'AUSSEN',
    interiorLabel: 'INNENRAUM',
    ultraVipBadge: '★ ULTRA VIP • ERSTE KLASSE',
  },
  tr: {
    vehicleDetails: 'ARAÇ DETAYLARI',
    exteriorLabel: 'DIŞ GÖRÜNÜM',
    interiorLabel: 'İÇ MEKAN',
    ultraVipBadge: '★ ULTRA VIP • BİRİNCİ SINIF',
  },
  hi: {
    vehicleDetails: 'वाहन विवरण',
    exteriorLabel: 'बाहरी',
    interiorLabel: 'आंतरिक',
    ultraVipBadge: '★ अल्ट्रा वीआईपी • प्रथम श्रेणी',
  },
};

interface FleetSectionProps {
  locale: Locale;
  dict: Dictionary;
  vehicles?: FleetShowcaseVehicle[];
}

export function FleetSection({ locale, dict, vehicles }: FleetSectionProps) {
  const vehicleCatalog = vehicles && vehicles.length > 0 ? vehicles : FLEET_SHOWCASE_VEHICLES;
  const [activeVehicleIndex, setActiveVehicleIndex] = useState<number>(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState<number>(0);
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
    passengers: FLEET_SHOWCASE_UI.passengers[locale] || FLEET_SHOWCASE_UI.passengers.en,
    luggage: FLEET_SHOWCASE_UI.luggage[locale] || FLEET_SHOWCASE_UI.luggage.en,
    prevVehicle: FLEET_SHOWCASE_UI.prevVehicle[locale] || FLEET_SHOWCASE_UI.prevVehicle.en,
    nextVehicle: FLEET_SHOWCASE_UI.nextVehicle[locale] || FLEET_SHOWCASE_UI.nextVehicle.en,
    vehicleDetails: (FLEET_LABELS_10[locale] || FLEET_LABELS_10.en).vehicleDetails,
    exteriorLabel: (FLEET_LABELS_10[locale] || FLEET_LABELS_10.en).exteriorLabel,
    interiorLabel: (FLEET_LABELS_10[locale] || FLEET_LABELS_10.en).interiorLabel,
    ultraVipBadge: (FLEET_LABELS_10[locale] || FLEET_LABELS_10.en).ultraVipBadge,
  };

  const totalVehicles = vehicleCatalog.length;
  const currentCar = vehicleCatalog[activeVehicleIndex] || vehicleCatalog[0];
  const nextCar = vehicleCatalog[(activeVehicleIndex + 1) % totalVehicles];

  // Guaranteed Exterior and Interior photo pairing for Desktop Design 14
  const exteriorPhoto =
    currentCar.gallery.find((img) => img.type === 'exterior') || currentCar.gallery[0];
  const interiorPhoto =
    currentCar.gallery.find((img) => img.type === 'interior') ||
    currentCar.gallery[1] ||
    currentCar.gallery[0];

  // Infinite carousel navigation
  const handlePrevVehicle = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev > 0 ? prev - 1 : totalVehicles - 1));
  }, [totalVehicles]);

  const handleNextVehicle = useCallback(() => {
    setActiveVehicleIndex((prev) => (prev < totalVehicles - 1 ? prev + 1 : 0));
  }, [totalVehicles]);

  const handleSelectVehicle = useCallback((index: number) => {
    setActiveVehicleIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isGalleryOpen) {
        if (e.key === 'Escape') {
          setIsGalleryOpen(false);
        } else if (e.key === 'ArrowRight') {
          setGalleryActiveIndex((prev) => (prev < currentCar.gallery.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowLeft') {
          setGalleryActiveIndex((prev) => (prev > 0 ? prev - 1 : currentCar.gallery.length - 1));
        }
        return;
      }

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
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isGalleryOpen, isRtl, handleNextVehicle, handlePrevVehicle, currentCar.gallery.length]);

  const openLightbox = useCallback((initialIdx: number = 0) => {
    setGalleryActiveIndex(initialIdx);
    setIsGalleryOpen(true);
  }, []);

  // Touch swipe support for mobile
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

  // Model detail title (e.g., "Maybach VIP", "Yukon XL VIP", etc.)
  const modelShortName = currentCar.name[locale] || currentCar.name.en;

  return (
    <section
      id="fleet"
      className="py-12 md:py-20 bg-[#0B0A0E] text-[#F7F3EE] text-start relative overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Royal Luxury VIP Fleet Showcase"
    >
      {/* Background cinematic ambient warm bronze-gold glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/15 via-[#181419]/40 to-transparent blur-[160px]" />

      {/* Preload next vehicle image */}
      {nextCar && (
        <link
          rel="preload"
          as="image"
          href={nextCar.gallery[0]?.src}
          key={`preload-${nextCar.id}`}
        />
      )}

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* ========================================================================= */}
        {/* MOBILE LAYOUT (< 768px): EXACT MATCH TO REFERENCE 03 | CINEMATIC AMBIENT   */}
        {/* ========================================================================= */}
        <div
          className="block md:hidden max-w-md mx-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Outer Card with Glowing Bronze Bezel Frame */}
          <div className="relative bg-gradient-to-b from-[#161217] via-[#100D12] to-[#0B090D] rounded-[28px] border-2 border-[#C5A059] shadow-[0_0_35px_rgba(197,160,89,0.3),_0_20px_50px_rgba(0,0,0,0.95),_inset_0_0_25px_rgba(197,160,89,0.06)] p-5 sm:p-6 overflow-hidden">
            {/* Ambient spotlight glow behind vehicle */}
            <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#C5A059]/30 via-[#C5A059]/8 to-transparent blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* 1. Star Badge at Top (Design 03) */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1C1720] border border-[#C5A059]/60 text-[10px] font-bold uppercase tracking-wider text-[#DDBA8F] mb-2.5 shadow-sm">
                <span>{tUI.ultraVipBadge}</span>
              </div>

              {/* 2. Vehicle Name in Elegant Serif */}
              <h3 className="font-serif font-bold text-2xl sm:text-[28px] text-[#F0E2C8] tracking-tight leading-snug">
                {currentCar.name[locale] || currentCar.name.en}
              </h3>

              {/* 3. Large Hero Cinematic Car Image with Ambient Spotlight */}
              <div
                className="relative w-full aspect-[16/10] my-2 flex items-center justify-center cursor-pointer group"
                onClick={() => openLightbox(0)}
              >
                <Image
                  key={`mobile-car-${currentCar.id}`}
                  src={exteriorPhoto.src}
                  alt={exteriorPhoto.alt[locale] || exteriorPhoto.alt.en}
                  width={650}
                  height={400}
                  priority={activeVehicleIndex === 0}
                  sizes="100vw"
                  className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.95)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* 4. Capacity Specs ("Up to X Passengers / X Luggage") */}
              <div className="text-xs sm:text-sm text-[#F7F3EE] font-medium tracking-wide my-1">
                {tUI.passengers.replace('{count}', String(currentCar.passengers))} /{' '}
                {tUI.luggage.replace('{count}', String(currentCar.luggage))}
              </div>

              {/* Thin Divider Line below capacity */}
              <div className="w-full h-px bg-white/10 my-3" />

              {/* 5. Features Grid with Thin Bronze Outline Icons (Design 03: 2x2) */}
              <div className="w-full grid grid-cols-2 gap-3 text-start mb-4">
                {LUXURY_FLEET_FEATURES.map((feat) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={`mob-feat-${feat.key}`}
                      className="flex items-center gap-2.5 p-1.5"
                    >
                      <FeatIcon className="w-6 h-6 text-[#C5A059] shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-[#F7F3EE] block leading-snug">
                          {feat.fullLabel[locale] || feat.fullLabel.en}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 6. Price Block with "From" + Next-Arrow `>>` + "BOOK NOW" */}
              <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between gap-2.5">
                {/* Price Display */}
                <div className="text-start shrink-0">
                  <span className="text-[11px] text-[#A69B97] block leading-none mb-0.5">
                    {tUI.from}
                  </span>
                  <span className="font-serif font-bold text-2xl text-[#E5C189] tracking-tight">
                    {formatPrice(currentCar.startingPriceSAR)}
                  </span>
                </div>

                {/* Next Arrow Button `>>` and Primary BOOK NOW */}
                <div className="flex items-center gap-2 flex-1 justify-end">
                  {/* Next Arrow Button `>>` */}
                  <button
                    type="button"
                    onClick={handleNextVehicle}
                    aria-label={tUI.nextVehicle}
                    className="h-11 w-11 rounded-xl bg-[#1D1922] hover:bg-[#28222D] border border-[#C5A059]/60 text-[#DDBA8F] flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-md"
                  >
                    {isRtl ? (
                      <ChevronsLeft className="w-5 h-5 text-[#C5A059]" />
                    ) : (
                      <ChevronsRight className="w-5 h-5 text-[#C5A059]" />
                    )}
                  </button>

                  {/* Primary BOOK NOW */}
                  <Link
                    href={`/${locale}/booking?vehicle=${currentCar.bookingVehicleId}`}
                    className="h-11 flex-1 px-4 rounded-full bg-gradient-to-r from-[#B88554] via-[#DEAB77] to-[#B88554] hover:brightness-110 active:scale-[0.98] text-[#16100B] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#C5A059]/30 flex items-center justify-center text-center whitespace-nowrap"
                  >
                    <span>{tUI.bookNow}</span>
                  </Link>
                </div>
              </div>

              {/* 7. Centered "Details & Gallery" button (Design 03) */}
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="text-xs text-[#DDBA8F] hover:text-[#F7F3EE] font-medium tracking-wide mt-3 py-1 transition-colors underline-offset-4 hover:underline"
              >
                {tUI.detailsAndGallery}
              </button>

              {/* Pagination Dots */}
              <div
                className="flex items-center justify-center gap-2 pt-2.5"
                role="tablist"
                aria-label="Vehicle selection"
              >
                {vehicleCatalog.map((vehicle, i) => (
                  <button
                    key={`dot-m-${vehicle.id}`}
                    type="button"
                    role="tab"
                    aria-selected={activeVehicleIndex === i}
                    onClick={() => handleSelectVehicle(i)}
                    aria-label={vehicle.name[locale] || vehicle.name.en}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeVehicleIndex === i
                        ? 'w-7 bg-[#C5A059] shadow-xs shadow-[#C5A059]/50'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================================= */}
        {/* DESKTOP LAYOUT (>= 768px): EXACT MATCH TO REFERENCE 14 | DESERT SAND & BRONZE           */}
        {/* ======================================================================================= */}
        <div className="hidden md:block">
          {/* Outer Card with Glowing Double Bronze Bezel Frame */}
          <div className="relative bg-gradient-to-br from-[#1A161C] via-[#141116] to-[#0F0D11] text-[#F7F3EE] rounded-[32px] border-2 border-[#C5A059] shadow-[0_0_45px_rgba(197,160,89,0.3),_0_25px_60px_rgba(0,0,0,0.95),_inset_0_0_30px_rgba(197,160,89,0.08)] p-8 lg:p-11 overflow-hidden">
            {/* Ambient subtle warm bronze spotlight inside desktop card */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#C5A059]/20 via-transparent to-transparent blur-3xl" />

            <div className="relative z-10 grid grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT COLUMN (~52%): VEHICLE INFORMATION, 4 FEATURES & ACTIONS */}
              <div className="col-span-6 flex flex-col justify-between text-start space-y-5">
                <div>
                  {/* Vehicle Name in Large Editorial Serif */}
                  <h3 className="font-serif font-normal text-3xl lg:text-[44px] text-[#F0E2C8] tracking-tight leading-[1.15] mb-4">
                    {currentCar.name[locale] || currentCar.name.en}
                  </h3>

                  {/* Thin Bronze Divider Line (Design 14) */}
                  <div className="w-full h-px bg-gradient-to-r from-[#C5A059]/80 via-[#C5A059]/30 to-transparent my-4 rtl:bg-gradient-to-l" />

                  {/* Vehicle Details Subtitle */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A059] block">
                      {tUI.vehicleDetails}
                    </span>
                    <div className="flex items-center gap-2.5 text-[#F7F3EE] font-bold text-xl lg:text-2xl">
                      <CarSilhouetteIcon className="w-6 h-6 text-[#C5A059] shrink-0" />
                      <span>{modelShortName}</span>
                    </div>
                  </div>

                  {/* Thin Bronze Divider Line (Design 14) */}
                  <div className="w-full h-px bg-gradient-to-r from-[#C5A059]/80 via-[#C5A059]/30 to-transparent my-4 rtl:bg-gradient-to-l" />
                </div>

                {/* The 4 Features Grid (2x2 with Thin Outline Bronze Icons) */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 py-2">
                  {LUXURY_FLEET_FEATURES.map((feat) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div key={`desk-feat-${feat.key}`} className="flex items-center gap-3.5">
                        <div className="w-10 h-10 flex items-center justify-center shrink-0">
                          <FeatIcon className="w-8 h-8 text-[#C5A059]" />
                        </div>
                        <div className="leading-tight">
                          <span className="text-base lg:text-lg font-medium text-[#FAF6F0] block">
                            {feat.line1[locale] || feat.line1.en}
                          </span>
                          <span className="text-base lg:text-lg font-medium text-[#FAF6F0] block">
                            {feat.line2[locale] || feat.line2.en}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Bar: Price + Pill BOOK NOW + Pill Details & Gallery */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  {/* Price */}
                  <div className="text-start shrink-0">
                    <span className="text-xs text-[#A89E9B] block leading-none mb-1">
                      {tUI.from}
                    </span>
                    <span className="font-serif font-bold text-3xl lg:text-4xl text-[#E5C189] tracking-tight">
                      {formatPrice(currentCar.startingPriceSAR)}
                    </span>
                  </div>

                  {/* Pill Action Buttons (Design 14) */}
                  <div className="flex items-center gap-3">
                    {/* Primary BOOK NOW Pill */}
                    <Link
                      href={`/${locale}/booking?vehicle=${currentCar.bookingVehicleId}`}
                      className="min-h-[48px] px-8 rounded-full bg-gradient-to-r from-[#B88554] via-[#DEAB77] to-[#B88554] hover:brightness-110 active:scale-[0.98] text-[#16100B] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#C5A059]/30 flex items-center justify-center whitespace-nowrap transition-all"
                    >
                      <span>{tUI.bookNow}</span>
                    </Link>

                    {/* Secondary Details & Gallery Pill */}
                    <button
                      type="button"
                      onClick={() => openLightbox(0)}
                      className="min-h-[48px] px-7 rounded-full bg-transparent border border-[#C5A059]/80 hover:bg-[#C5A059]/15 text-[#EAD8C1] font-semibold text-xs tracking-wider transition-all flex items-center justify-center whitespace-nowrap active:scale-[0.98]"
                    >
                      {tUI.detailsAndGallery}
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (~48%): THE TWO-PHOTO LAYOUT (EXTERIOR + INTERIOR) */}
              <div className="col-span-6 flex flex-col space-y-4">
                {/* 1. TOP PHOTO: EXTERIOR */}
                <div
                  className="group relative cursor-pointer"
                  onClick={() => openLightbox(0)}
                >
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl bg-black transition-all duration-300 group-hover:border-[#C5A059] group-hover:shadow-[0_0_25px_rgba(197,160,89,0.35)]">
                    <Image
                      key={`desk-ext-${currentCar.id}`}
                      src={exteriorPhoto.src}
                      alt={exteriorPhoto.alt[locale] || exteriorPhoto.alt.en}
                      fill
                      priority={activeVehicleIndex === 0}
                      sizes="500px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="block text-center text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059] mt-2 group-hover:text-[#F0E2C8] transition-colors">
                    {tUI.exteriorLabel}
                  </span>
                </div>

                {/* 2. BOTTOM PHOTO: INTERIOR */}
                <div
                  className="group relative cursor-pointer pt-1"
                  onClick={() => openLightbox(1)}
                >
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl bg-black transition-all duration-300 group-hover:border-[#C5A059] group-hover:shadow-[0_0_25px_rgba(197,160,89,0.35)]">
                    <Image
                      key={`desk-int-${currentCar.id}`}
                      src={interiorPhoto.src}
                      alt={interiorPhoto.alt[locale] || interiorPhoto.alt.en}
                      fill
                      sizes="500px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="block text-center text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059] mt-2 group-hover:text-[#F0E2C8] transition-colors">
                    {tUI.interiorLabel}
                  </span>
                </div>

                {/* Carousel Navigation (Dots on Left, Circular Prev/Next on Right) */}
                <div className="flex items-center justify-between pt-2">
                  {/* Indicator Dots */}
                  <div
                    className="flex items-center gap-2"
                    role="tablist"
                    aria-label="Vehicle selection"
                  >
                    {vehicleCatalog.map((vehicle, i) => (
                      <button
                        key={`dot-d-${vehicle.id}`}
                        type="button"
                        role="tab"
                        aria-selected={activeVehicleIndex === i}
                        onClick={() => handleSelectVehicle(i)}
                        aria-label={vehicle.name[locale] || vehicle.name.en}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeVehicleIndex === i
                            ? 'w-8 bg-[#C5A059] shadow-xs shadow-[#C5A059]/50'
                            : 'w-2.5 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Circular Prev/Next Vehicle Arrows */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrevVehicle}
                      aria-label={tUI.prevVehicle}
                      className="w-11 h-11 rounded-full bg-[#1F1A21] hover:bg-[#2B242E] border border-[#C5A059]/60 hover:border-[#C5A059] flex items-center justify-center text-[#DDBA8F] transition-all shadow-md active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextVehicle}
                      aria-label={tUI.nextVehicle}
                      className="w-11 h-11 rounded-full bg-gradient-to-r from-[#B88554] via-[#DEAB77] to-[#B88554] hover:brightness-110 text-[#16100B] flex items-center justify-center transition-all font-bold shadow-md shadow-[#C5A059]/30 active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN ACCESSIBLE LIGHTBOX MODAL ("Details & Gallery")               */}
      {/* ========================================================================= */}
      {isGalleryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${currentCar.name[locale] || currentCar.name.en} Gallery`}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar: Title + Counter + Close Button */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block">
                {currentCar.category[locale] || currentCar.category.en}
              </span>
              <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#F0E2C8]">
                {currentCar.name[locale] || currentCar.name.en}
              </h4>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-[#DDBA8F] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {String(galleryActiveIndex + 1).padStart(2, '0')} /{' '}
                {String(currentCar.gallery.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                aria-label="Close Gallery"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo Area */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={() =>
                setGalleryActiveIndex((prev) =>
                  prev > 0 ? prev - 1 : currentCar.gallery.length - 1
                )
              }
              aria-label="Previous photo"
              className="absolute left-2 sm:left-6 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-[#DDBA8F] flex items-center justify-center transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
            </button>

            <div className="relative w-full h-full max-w-5xl max-h-[70vh]">
              {currentCar.gallery[galleryActiveIndex] && (
                <Image
                  src={currentCar.gallery[galleryActiveIndex].src}
                  alt={
                    currentCar.gallery[galleryActiveIndex].alt[locale] ||
                    currentCar.gallery[galleryActiveIndex].alt.en
                  }
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                setGalleryActiveIndex((prev) =>
                  prev < currentCar.gallery.length - 1 ? prev + 1 : 0
                )
              }
              aria-label="Next photo"
              className="absolute right-2 sm:right-6 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-[#DDBA8F] flex items-center justify-center transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6 rtl:rotate-180" />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 border-t border-white/10">
            {currentCar.gallery.map((img, idx) => (
              <button
                key={`thumb-${img.src}-${idx}`}
                type="button"
                onClick={() => setGalleryActiveIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  galleryActiveIndex === idx
                    ? 'border-[#C5A059] scale-105 shadow-md shadow-[#C5A059]/40'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
