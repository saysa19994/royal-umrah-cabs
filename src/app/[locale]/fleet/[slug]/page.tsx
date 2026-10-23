import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Users, Briefcase, Check, ArrowRight, Sparkles, ShieldCheck, Camera } from 'lucide-react';

interface FleetDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

const FLEET_MAP: Record<
  string,
  {
    name: string;
    category: string;
    seats: number;
    bags: number;
    extImg: string;
    intImg: string;
    desc: string;
    features: string[];
    typicalUse: string;
    gallery: { title: string; img: string; tag: string }[];
  }
> = {
  'hyundai-staria': {
    name: 'Hyundai Staria VIP',
    category: 'Premium Family Van',
    seats: 7,
    bags: 6,
    extImg: '/assets/images/staria_studio.webp',
    intImg: '/assets/images/staria_interior.webp',
    desc: 'The Hyundai Staria VIP sets a new standard for modern pilgrim family transport in Saudi Arabia. With its expansive panoramic windows, captain chair layout, and serene ride quality, families can rest peacefully during the 4.5-hour transfer between Makkah and Madinah.',
    features: [
      'High-efficiency climate control with dedicated ceiling vents',
      'Individual reclining executive seats with armrests',
      'Complimentary chilled Zamzam water bottles on all trips',
      'USB-C rapid charging ports at every row',
      'Deep luggage cargo area accommodating up to 6 large suitcases',
    ],
    typicalUse: 'Families of 4 to 7 passengers traveling with multiple large suitcases and Zamzam containers.',
    gallery: [
      { title: '2K Studio Exterior', img: '/assets/images/staria_studio.webp', tag: '2K Studio' },
      { title: 'Highway Exterior Profile', img: '/assets/images/staria_exterior.webp', tag: 'Exterior' },
      { title: 'VIP Captain Cabin', img: '/assets/images/staria_interior.webp', tag: 'VIP Interior' },
      { title: 'Spacious Trunk Hold', img: '/assets/images/extracted_gallery/WhatsApp Image 2026-10-22 at 10.12.33 PM (1).jpeg', tag: 'Luggage Hold' },
    ],
  },
  'gmc-yukon-xl': {
    name: 'GMC Yukon XL VIP',
    category: 'Ultra-Luxury VIP SUV',
    seats: 7,
    bags: 8,
    extImg: '/assets/images/yukon_studio.webp',
    intImg: '/assets/images/yukon_interior.webp',
    desc: 'The GMC Yukon XL represents the pinnacle of highway prestige and executive comfort in Saudi Arabia. Built for long-distance highway cruises, its extended wheelbase and soundproof cabin isolate travelers from road noise and desert heat.',
    features: [
      'Acoustic double-glazed glass for near-silent highway cruising',
      'Supple black leather seating with lumbar support',
      'Tri-zone automatic climate control',
      'Massive extended luggage bay for heavy luggage sets',
      'VIP chauffeur dressed in formal attire',
    ],
    typicalUse: 'VIP pilgrims, corporate delegations, and families demanding the utmost in prestige and space.',
    gallery: [
      { title: '2K Studio Prestige View', img: '/assets/images/yukon_studio.webp', tag: '2K Studio' },
      { title: 'Airport Arrivals Exterior', img: '/assets/images/yukon_exterior.webp', tag: 'VIP Arrivals' },
      { title: 'Executive Leather Cabin', img: '/assets/images/yukon_interior.webp', tag: 'VIP Interior' },
      { title: 'Extended Cargo Capacity', img: '/assets/images/extracted_gallery/GMC_Yukon_XL_studio_photograph_2K_20261022210253.jpg', tag: '2K Master' },
    ],
  },
  'toyota-camry': {
    name: 'Toyota Camry Executive',
    category: 'Executive Sedan',
    seats: 4,
    bags: 3,
    extImg: '/assets/images/camry_studio.webp',
    intImg: '/assets/images/camry_interior.webp',
    desc: 'A quiet, reliable, and smooth executive sedan offering exceptional value. Perfectly suited for couples or solo pilgrims seeking a dependable and swift transfer between Jeddah Airport, Makkah, and Madinah.',
    features: [
      'Efficient, whisper-quiet cabin',
      'Cold air conditioning built for Saudi summer temperatures',
      'Trunk space for 2-3 standard suitcases and hand luggage',
      'Smooth suspension absorbing highway bumps',
    ],
    typicalUse: 'Solo pilgrims, couples, or small families of 2-3 travelers.',
    gallery: [
      { title: '2K Studio Sedan Exterior', img: '/assets/images/camry_studio.webp', tag: '2K Studio' },
      { title: 'Commercial City Exterior', img: '/assets/images/camry_exterior.webp', tag: 'Exterior' },
      { title: 'Ergonomic Interior Cabin', img: '/assets/images/camry_interior.webp', tag: 'Cabin' },
      { title: 'High-Res Studio View', img: '/assets/images/extracted_gallery/Toyota_Camry_in_studio_2K_20261022205913.jpg', tag: '2K High-Res' },
    ],
  },
  'hyundai-h1': {
    name: 'Hyundai H1 Starex VIP',
    category: 'Family Minivan',
    seats: 8,
    bags: 7,
    extImg: '/assets/images/h1_exterior.webp',
    intImg: '/assets/images/staria_interior.webp',
    desc: 'The Hyundai H1 Starex is the trusted family workhorse across the Kingdom. Renowned for its reliable high-capacity seating, smooth dual sliding doors, and ample space for luggage and Zamzam water containers.',
    features: [
      '8 comfortable passenger seats with flexible arrangement',
      'Dual side sliding passenger doors for effortless boarding',
      'Heavy-duty dual air-conditioning system',
      'Generous boot space fitting 7-8 suitcases comfortably',
      'Proven high reliability on long-distance highway routes',
    ],
    typicalUse: 'Medium to large families of 5 to 8 passengers needing a balanced, highly dependable transport option.',
    gallery: [
      { title: '2K Studio Front View', img: '/assets/images/h1_exterior.webp', tag: '2K Studio' },
      { title: 'High-Res Master View', img: '/assets/images/extracted_gallery/Hyundai_H1_Starex_studio_photograph_2K_20261022211204.jpg', tag: '2K High-Res' },
      { title: 'Executive Passenger Seats', img: '/assets/images/staria_interior.webp', tag: 'Seating Layout' },
      { title: 'Family Luggage Hold', img: '/assets/images/extracted_gallery/WhatsApp Image 2026-10-22 at 10.12.33 PM (3).jpeg', tag: 'Luggage Bay' },
    ],
  },
  'toyota-hiace': {
    name: 'Toyota HiAce VIP',
    category: 'Mini Bus for Groups',
    seats: 10,
    bags: 10,
    extImg: '/assets/images/hiace_exterior.webp',
    intImg: '/assets/images/hiace_interior.webp',
    desc: 'Engineered specifically for large pilgrim families and group delegations. The high-roof cabin allows easy entry and standing headroom, while rear air-conditioning vents keep all 10 passengers refreshed.',
    features: [
      'High roof with wide central walk-through aisle',
      'Dedicated rear air conditioning blower with individual louvers',
      'Heavy-duty luggage capacity accommodating 10 large suitcases',
      'Experienced group chauffeur with complete knowledge of hotel zones',
    ],
    typicalUse: 'Large extended families, Umrah group packages, and travel agency groups.',
    gallery: [
      { title: 'High-Roof Exterior', img: '/assets/images/hiace_exterior.webp', tag: 'Full Exterior' },
      { title: '10-Passenger Cabin', img: '/assets/images/hiace_interior.webp', tag: 'Spacious Cabin' },
      { title: 'Group Luggage Bay', img: '/assets/images/extracted_gallery/WhatsApp Image 2026-10-22 at 10.12.34 PM (1).jpeg', tag: 'Cargo Capacity' },
      { title: 'Rear Boarding Access', img: '/assets/images/extracted_gallery/WhatsApp Image 2026-10-22 at 10.12.32 PM (4).jpeg', tag: 'Boarding Gate' },
    ],
  },
  'toyota-coaster': {
    name: 'Toyota Coaster VIP Coach',
    category: 'VIP Group Coach',
    seats: 21,
    bags: 20,
    extImg: '/assets/images/coaster_exterior.webp',
    intImg: '/assets/images/coaster_interior.webp',
    desc: 'The Toyota Coaster VIP Coach represents executive group travel at its finest. Designed for large pilgrim delegations, extended family groups, and VIP Umrah tours, it features a whisper-quiet high-capacity cabin, aircraft-style overhead air conditioning, wide panoramic tinted windows, and expansive dedicated luggage compartments.',
    features: [
      'Dual-zone high-performance multi-vent air conditioning system',
      'Ergonomic reclining seats with executive armrests and ample legroom',
      'Spacious central walk-through aisle for effortless boarding',
      'Dedicated massive cargo hold accommodating up to 20 large suitcases and Zamzam containers',
      'Senior certified highway chauffeur specialized in Jeddah-Makkah-Madinah routes',
      'Panoramic tinted solar glass offering privacy and protection from Saudi sunshine',
    ],
    typicalUse: 'Large families, Umrah group delegations, and private corporate groups (12 to 21 passengers) demanding unified luxury travel without splitting into multiple small cars.',
    gallery: [
      { title: 'VIP Coach Exterior', img: '/assets/images/coaster_exterior.webp', tag: 'Coach Exterior' },
      { title: 'Executive Leather Seating', img: '/assets/images/coaster_interior.webp', tag: 'Aircraft Louvers' },
      { title: 'Deluxe Side Profile', img: '/assets/images/extracted_gallery/WhatsApp Image 2026-10-22 at 10.12.37 PM.jpeg', tag: 'Side Profile' },
      { title: 'Group Delegation Hold', img: '/assets/images/extracted_gallery/WhatsApp Image 2026-10-22 at 10.12.38 PM.jpeg', tag: 'Massive Bay' },
    ],
  },
};

export function generateStaticParams() {
  const slugs = ['hyundai-staria', 'gmc-yukon-xl', 'toyota-camry', 'hyundai-h1', 'toyota-hiace', 'toyota-coaster'];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: FleetDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const vehicle = FLEET_MAP[slug] || FLEET_MAP['hyundai-staria'];
  return {
    title: `${vehicle.name} | Duyuf Alrahman VIP Fleet`,
    description: vehicle.desc.slice(0, 160),
    alternates: getLocalizedAlternates(locale, `/fleet/${slug}`),
  };
}

export default async function FleetDetailPage(props: FleetDetailPageProps) {
  const params = await props.params;
  const { locale, slug } = params;
  const isAr = locale === 'ar';

  const v = FLEET_MAP[slug];

  if (!v) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-ink-muted mb-6">
          <Link href={`/${locale}`} className="hover:text-gold-dark">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link href={`/${locale}/fleet`} className="hover:text-gold-dark">{isAr ? 'الأسطول' : 'Fleet'}</Link>
          <span>/</span>
          <span className="text-ink font-semibold truncate">{v.name}</span>
        </div>

        {/* TITLE */}
        <div className="mb-8">
          <span className="text-xs font-bold text-gold-dark uppercase tracking-widest block mb-1">
            {v.category}
          </span>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-ink">
            {v.name}
          </h1>
          <div className="flex items-center gap-5 mt-3 text-xs font-semibold text-ink">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gold-dark" />
              <span>{isAr ? `تتسع حتى ${v.seats} ركاب` : `Up to ${v.seats} Passengers`}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-gold-dark" />
              <span>{isAr ? `تتسع لـ ${v.bags} حقائب كبيرة` : `${v.bags} Large Bags`}</span>
            </span>
          </div>
        </div>

        {/* MULTI-IMAGE VEHICLE CATALOG & GALLERY */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-4 h-4 text-gold-dark" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              {isAr ? `كتالوج صور ${v.name} (داخلية وخارجية)` : `${v.name} Multi-Angle Visual Catalog`}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {v.gallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface border border-border shadow-xs hover:shadow-md transition-all"
              >
                <Image
                  src={item.img}
                  alt={`${v.name} - ${item.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={idx === 0}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 start-3 end-3 text-white">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gold text-slate-950 mb-1">
                    {item.tag}
                  </span>
                  <p className="text-xs font-semibold truncate text-white/95">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs mb-8">
          <h2 className="font-display font-bold text-xl text-ink mb-3">
            {isAr ? 'مواصفات المركبة ونظرة عامة' : 'Vehicle Overview'}
          </h2>
          <p className="text-sm text-body leading-relaxed mb-6 font-light">
            {v.desc}
          </p>

          <h3 className="font-display font-bold text-lg text-ink mb-3">
            {isAr ? 'المميزات والتجهيزات' : 'Features & Amenities'}
          </h3>
          <ul className="space-y-2.5 text-xs md:text-sm text-body mb-6">
            {v.features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold-dark shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-xl bg-bg-alt border border-border text-xs text-ink">
            <strong className="block mb-1 font-semibold text-gold-dark uppercase tracking-wider">
              {isAr ? 'الاستخدام المثالي الموصى به:' : 'Recommended Use:'}
            </strong>
            <p className="text-body font-light">{v.typicalUse}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            href={`/${locale}/booking?vehicle=${slug}`}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-btn bg-gold text-ink font-bold text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-sm"
          >
            <span>{isAr ? `احجز ${v.name} الآن` : `Book ${v.name} Now`}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
