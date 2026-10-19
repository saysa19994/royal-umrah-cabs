import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface RoutesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: RoutesPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  return {
    title: dict.nav.routes,
    description: 'Explore all private Umrah and intercity transfer routes between Jeddah, Makkah, and Madinah with fixed transparent pricing.',
    alternates: getLocalizedAlternates(locale, '/routes'),
  };
}

const ALL_ROUTES = [
  {
    slug: 'jeddah-airport-to-makkah',
    title: 'Jeddah Airport (KAIA) to Makkah Hotel',
    duration: '75 mins',
    distance: '95 km',
    desc: 'Direct terminal pickup from King Abdulaziz International Airport to your hotel in Makkah with flight tracking.',
    startPriceSAR: 200,
  },
  {
    slug: 'makkah-to-jeddah-airport',
    title: 'Makkah Hotel to Jeddah Airport (KAIA)',
    duration: '75 mins',
    distance: '95 km',
    desc: 'Punctual departure transfer from your Makkah accommodation to KAIA terminals for your flight home.',
    startPriceSAR: 200,
  },
  {
    slug: 'makkah-to-madinah',
    title: 'Makkah to Madinah VIP Transfer',
    duration: '4.5 hours',
    distance: '440 km',
    desc: 'Comfortable highway transfer connecting the two Holy Sanctuaries via the modern Hijrah highway.',
    startPriceSAR: 450,
  },
  {
    slug: 'madinah-to-makkah',
    title: 'Madinah to Makkah (With Miqat Bir Ali Stop)',
    duration: '4.5 hours',
    distance: '440 km',
    desc: 'Blessed journey featuring a dedicated stop at Masjid Miqat Dhu al-Hulayfah (Bir Ali) for Ihram.',
    startPriceSAR: 450,
  },
  {
    slug: 'madinah-airport-to-hotel',
    title: 'Madinah Airport (MED) to Central Hotel',
    duration: '30 mins',
    distance: '25 km',
    desc: 'Direct reception from Prince Mohammad Bin Abdulaziz Airport to hotels surrounding Al-Masjid an-Nabawi.',
    startPriceSAR: 150,
  },
  {
    slug: 'jeddah-to-madinah',
    title: 'Jeddah to Madinah Direct Chauffeur',
    duration: '4.2 hours',
    distance: '410 km',
    desc: 'Private highway transfer from Jeddah straight to Madinah Al-Munawwarah in supreme comfort.',
    startPriceSAR: 680,
  },
];

export default async function RoutesPage(props: RoutesPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.nav.routes}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            Popular Umrah &amp; Intercity Routes
          </h1>
          <p className="mt-3 text-ink-muted text-base leading-relaxed font-light">
            Guaranteed fixed rates with flight delay tracking and no prepayment required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ALL_ROUTES.map((route) => (
            <div
              key={route.slug}
              className="bg-surface rounded-2xl p-6 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-start"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-gold-dark uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Fixed Route</span>
                  </span>
                  <span className="text-xs text-ink-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{route.duration} • {route.distance}</span>
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-ink mb-2">
                  {route.title}
                </h3>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light mb-6">
                  {route.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-ink-muted block">Starting From</span>
                  <span className="font-display font-bold text-lg text-ink">
                    SAR {route.startPriceSAR}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/routes/${route.slug}`}
                    className="h-10 px-4 rounded-btn border border-border-strong text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/${locale}/booking?route=${route.slug}`}
                    className="h-10 px-5 rounded-btn bg-gold text-ink text-xs font-bold uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
