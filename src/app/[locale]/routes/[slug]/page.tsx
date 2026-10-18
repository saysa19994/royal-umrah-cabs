import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { MapPin, Clock, ShieldCheck, Check, ArrowRight } from 'lucide-react';

interface RouteDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

const ROUTE_DETAILS: Record<
  string,
  {
    title: string;
    subtitle: string;
    duration: string;
    distance: string;
    description: string;
    highlights: string[];
    rates: { vehicle: string; priceSAR: number }[];
  }
> = {
  'jeddah-airport-to-makkah': {
    title: 'Jeddah Airport (KAIA) to Makkah Hotel Taxi',
    subtitle: 'Direct Terminal Meet & Greet with Flight Delay Monitoring',
    duration: '75 - 90 minutes',
    distance: '95 km',
    description:
      'Arriving at King Abdulaziz International Airport (JED) is the gateway to your Umrah pilgrimage. Our private chauffeur service ensures your family is greeted right outside the terminal with a personalized digital nameplate, complete luggage assistance, and direct transport to your hotel in Makkah.',
    highlights: [
      '60 minutes complimentary airport wait time after landing',
      'Automated flight delay synchronization',
      'Direct highway travel via modern expressways',
      'Chilled bottled water and climate-controlled cabin',
      'Cash or card payment upon arrival at your hotel',
    ],
    rates: [
      { vehicle: 'Toyota Camry Executive (4 Seats)', priceSAR: 200 },
      { vehicle: 'Hyundai Staria VIP (7 Seats)', priceSAR: 260 },
      { vehicle: 'GMC Yukon XL VIP (7 Seats)', priceSAR: 380 },
      { vehicle: 'Toyota HiAce VIP (10 Seats)', priceSAR: 340 },
    ],
  },
  'makkah-to-madinah': {
    title: 'Makkah to Madinah VIP Private Taxi',
    subtitle: 'Comfortable Highway Chauffeur via Hijrah Expressway',
    duration: '4.5 hours',
    distance: '440 km',
    description:
      'Traveling between the two Holy Sanctuaries is a spiritual passage. Our private chauffeur transport guarantees a peaceful journey with well-timed rest stops for prayers and refreshments, spacious legroom, and climate-controlled cabins.',
    highlights: [
      'Scheduled prayer and refreshment stops at clean highway service areas',
      'Optional visit to historical landmarks along the way upon request',
      'No luggage restrictions within vehicle capacity',
      'Pay your driver upon safe arrival at your Madinah hotel',
    ],
    rates: [
      { vehicle: 'Toyota Camry Executive (4 Seats)', priceSAR: 450 },
      { vehicle: 'Hyundai Staria VIP (7 Seats)', priceSAR: 500 },
      { vehicle: 'GMC Yukon XL VIP (7 Seats)', priceSAR: 750 },
      { vehicle: 'Toyota HiAce VIP (10 Seats)', priceSAR: 650 },
    ],
  },
  'madinah-to-makkah': {
    title: 'Madinah to Makkah Private Taxi (With Miqat Bir Ali Stop)',
    subtitle: 'Scheduled Stop at Masjid Dhu al-Hulayfah for Ihram and Niyyah',
    duration: '4.5 - 5.0 hours',
    distance: '440 km',
    description:
      'Begin your Umrah with reverence. Departing from your hotel in Madinah, your chauffeur stops at the Miqat of Dhu al-Hulayfah (Masjid Bir Ali) allowing ample time to perform ghusl, change into Ihram, and make your intention (Niyyah) without haste.',
    highlights: [
      'Dedicated 45-minute stop at Masjid Miqat Bir Ali',
      'Gentle driving allowing peaceful recitation of Talbiyah',
      'Door-to-door arrival at your hotel near the Clock Tower or Haram',
      'Zero advance deposit required',
    ],
    rates: [
      { vehicle: 'Toyota Camry Executive (4 Seats)', priceSAR: 450 },
      { vehicle: 'Hyundai Staria VIP (7 Seats)', priceSAR: 500 },
      { vehicle: 'GMC Yukon XL VIP (7 Seats)', priceSAR: 750 },
      { vehicle: 'Toyota HiAce VIP (10 Seats)', priceSAR: 650 },
    ],
  },
  'makkah-to-jeddah-airport': {
    title: 'Makkah Hotel to Jeddah Airport (KAIA) Taxi',
    subtitle: 'Punctual Departure Chauffeur Ensuring Stress-Free Flight Check-in',
    duration: '75 - 90 minutes',
    distance: '95 km',
    description:
      'Conclude your pilgrimage smoothly. We arrive at your Makkah hotel lobby 15 minutes before the scheduled pickup time, load your luggage and Zamzam containers, and transport you safely to the departure terminal at King Abdulaziz International Airport.',
    highlights: [
      'Punctual hotel lobby pickup with luggage assistance',
      'Careful handling of Zamzam water 5L canisters',
      'Express highway travel to Terminal 1, North Terminal or Private Terminal',
      'All toll fees and VAT fully included',
    ],
    rates: [
      { vehicle: 'Toyota Camry Executive (4 Seats)', priceSAR: 200 },
      { vehicle: 'Hyundai Staria VIP (7 Seats)', priceSAR: 260 },
      { vehicle: 'GMC Yukon XL VIP (7 Seats)', priceSAR: 380 },
      { vehicle: 'Toyota HiAce VIP (10 Seats)', priceSAR: 340 },
    ],
  },
  'jeddah-to-madinah': {
    title: 'Jeddah Airport / City to Madinah Direct Chauffeur',
    subtitle: 'Smooth Intercity Highway Transfer to Madinah Al-Munawwarah',
    duration: '4.0 - 4.5 hours',
    distance: '410 km',
    description:
      'Direct private chauffeur from Jeddah King Abdulaziz Airport or your Jeddah residence straight to the gates of the Prophet’s Mosque in Madinah without the stress of train schedules or public shuttles.',
    highlights: [
      'Direct door-to-door highway travel',
      'Flexible rest and meal stops according to your schedule',
      'Spacious luggage capacity for all family members',
      'Payment upon arrival at your Madinah hotel',
    ],
    rates: [
      { vehicle: 'Toyota Camry Executive (4 Seats)', priceSAR: 680 },
      { vehicle: 'Hyundai Staria VIP (7 Seats)', priceSAR: 750 },
      { vehicle: 'GMC Yukon XL VIP (7 Seats)', priceSAR: 980 },
      { vehicle: 'Toyota HiAce VIP (10 Seats)', priceSAR: 850 },
    ],
  },
  'madinah-airport-to-hotel': {
    title: 'Madinah Airport (MED) to Central Hotel Transfer',
    subtitle: 'Warm Welcome at Prince Mohammad Bin Abdulaziz Airport',
    duration: '25 - 35 minutes',
    distance: '25 km',
    description:
      'Arrive in the city of the Prophet (peace be upon him) with ease. Our driver welcomes you directly outside arrivals with a name placard and drives you directly to your hotel in the Central Northern or Southern Haram zones.',
    highlights: [
      'Terminal greeting with personalized sign',
      'Complimentary flight arrival monitoring',
      'Luggage transfer directly to hotel lobby reception',
      'Fixed low fare with zero hidden airport parking surcharges',
    ],
    rates: [
      { vehicle: 'Toyota Camry Executive (4 Seats)', priceSAR: 150 },
      { vehicle: 'Hyundai Staria VIP (7 Seats)', priceSAR: 190 },
      { vehicle: 'GMC Yukon XL VIP (7 Seats)', priceSAR: 280 },
      { vehicle: 'Toyota HiAce VIP (10 Seats)', priceSAR: 250 },
    ],
  },
};

export function generateStaticParams() {
  const slugs = [
    'jeddah-airport-to-makkah',
    'makkah-to-madinah',
    'madinah-to-makkah',
    'makkah-to-jeddah-airport',
    'jeddah-to-madinah',
    'madinah-airport-to-hotel',
  ];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: RouteDetailPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';
  const route = ROUTE_DETAILS[slug] || ROUTE_DETAILS['jeddah-airport-to-makkah'];
  return {
    title: route.title,
    description: route.subtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}/routes/${slug}`,
    },
  };
}

export default async function RouteDetailPage(props: RouteDetailPageProps) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const dict = getDictionary(locale);
  const route = ROUTE_DETAILS[slug];

  if (!route) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-ink-muted mb-6">
          <Link href={`/${locale}`} className="hover:text-gold-dark">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/routes`} className="hover:text-gold-dark">Routes</Link>
          <span>/</span>
          <span className="text-ink font-semibold truncate">{route.title}</span>
        </div>

        {/* HEADER */}
        <div className="mb-8">
          <span className="text-xs font-bold text-gold-dark uppercase tracking-widest block mb-2">
            Route Profile
          </span>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-ink mb-3">
            {route.title}
          </h1>
          <p className="text-sm md:text-base text-ink-muted font-light">
            {route.subtitle}
          </p>

          <div className="flex items-center gap-6 mt-4 text-xs font-semibold text-ink">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gold-dark" />
              <span>{route.duration}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-dark" />
              <span>{route.distance}</span>
            </span>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs mb-8">
          <h2 className="font-display font-bold text-xl text-ink mb-3">Overview</h2>
          <p className="text-sm text-body leading-relaxed mb-6 font-light">
            {route.description}
          </p>

          <h3 className="font-display font-bold text-lg text-ink mb-3">Service Inclusions</h3>
          <ul className="space-y-2.5 text-xs md:text-sm text-body">
            {route.highlights.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold-dark shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RATES TABLE */}
        <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs mb-8">
          <h2 className="font-display font-bold text-xl text-ink mb-4">Fixed Rates for this Route</h2>
          <div className="divide-y divide-border">
            {route.rates.map((rate, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-xs md:text-sm">
                <span className="font-semibold text-ink">{rate.vehicle}</span>
                <div className="flex items-center gap-4">
                  <span className="font-display font-bold text-base text-ink">SAR {rate.priceSAR}</span>
                  <Link
                    href={`/${locale}/booking?route=${slug}`}
                    className="h-8 px-4 rounded-btn bg-gold text-ink text-xs font-bold uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-colors flex items-center justify-center shadow-xs"
                  >
                    Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href={`/${locale}/booking?route=${slug}`}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-btn bg-gold text-ink font-bold text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-sm"
          >
            <span>Book This Route Now</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
