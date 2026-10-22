import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Users, Briefcase, Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

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
  }
> = {
  'hyundai-staria': {
    name: 'Hyundai Staria VIP',
    category: 'Premium Family Van',
    seats: 7,
    bags: 6,
    extImg: '/assets/images/staria_exterior.webp',
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
  },
  'gmc-yukon-xl': {
    name: 'GMC Yukon XL VIP',
    category: 'Ultra-Luxury VIP SUV',
    seats: 7,
    bags: 8,
    extImg: '/assets/images/yukon_exterior.webp',
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
  },
  'toyota-camry': {
    name: 'Toyota Camry Executive',
    category: 'Executive Sedan',
    seats: 4,
    bags: 3,
    extImg: '/assets/images/camry_exterior.webp',
    intImg: '/assets/images/camry_interior.webp',
    desc: 'A quiet, reliable, and smooth executive sedan offering exceptional value. Perfectly suited for couples or solo pilgrims seeking a dependable and swift transfer between Jeddah Airport, Makkah, and Madinah.',
    features: [
      'Efficient, whisper-quiet cabin',
      'Cold air conditioning built for Saudi summer temperatures',
      'Trunk space for 2-3 standard suitcases and hand luggage',
      'Smooth suspension absorbing highway bumps',
    ],
    typicalUse: 'Solo pilgrims, couples, or small families of 2-3 travelers.',
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
  },
};

export function generateStaticParams() {
  const slugs = ['hyundai-staria', 'gmc-yukon-xl', 'toyota-camry', 'toyota-hiace', 'toyota-coaster'];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: FleetDetailPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const vehicle = FLEET_MAP[slug] || FLEET_MAP['hyundai-staria'];
  return {
    title: vehicle.name,
    description: vehicle.desc.slice(0, 160),
    alternates: getLocalizedAlternates(locale, `/fleet/${slug}`),
  };
}

export default async function FleetDetailPage(props: FleetDetailPageProps) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const dict = getDictionary(locale);
  const v = FLEET_MAP[slug];

  if (!v) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-ink-muted mb-6">
          <Link href={`/${locale}`} className="hover:text-gold-dark">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/fleet`} className="hover:text-gold-dark">Fleet</Link>
          <span>/</span>
          <span className="text-ink font-semibold truncate">{v.name}</span>
        </div>

        {/* TITLE */}
        <div className="mb-6">
          <span className="text-xs font-bold text-gold-dark uppercase tracking-widest block mb-1">
            {v.category}
          </span>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-ink">
            {v.name}
          </h1>
          <div className="flex items-center gap-4 mt-3 text-xs font-semibold text-ink">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gold-dark" />
              <span>Up to {v.seats} Passengers</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-gold-dark" />
              <span>{v.bags} Large Bags</span>
            </span>
          </div>
        </div>

        {/* IMAGE SHOWCASE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-surface border border-border shadow-xs">
            <Image src={v.extImg} alt={`${v.name} exterior`} fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover" />
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-surface border border-border shadow-xs">
            <Image src={v.intImg} alt={`${v.name} interior cabin`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>

        {/* DETAILS */}
        <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs mb-8">
          <h2 className="font-display font-bold text-xl text-ink mb-3">Vehicle Overview</h2>
          <p className="text-sm text-body leading-relaxed mb-6 font-light">
            {v.desc}
          </p>

          <h3 className="font-display font-bold text-lg text-ink mb-3">Features &amp; Amenities</h3>
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
              Recommended Use:
            </strong>
            <p className="text-body font-light">{v.typicalUse}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            href={`/${locale}/booking`}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-btn bg-gold text-ink font-bold text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-sm"
          >
            <span>Book {v.name} Now</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
