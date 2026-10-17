import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Users, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

interface FleetPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({
  params: { locale },
}: FleetPageProps): Promise<Metadata> {
  const dict = getDictionary(locale);
  return {
    title: `${dict.nav.fleet} | ${dict.meta.brand}`,
    description: 'Explore our luxury, modern private Umrah fleet: GMC Yukon XL, Hyundai Staria, Toyota Camry, and Toyota HiAce.',
  };
}

const VEHICLES = [
  {
    slug: 'hyundai-staria',
    name: 'Hyundai Staria VIP',
    category: 'Family Van',
    seats: 7,
    bags: 6,
    extImg: '/assets/images/staria_exterior.jpg',
    desc: 'Spacious futuristic cabin with individual reclining captain chairs, powerful climate control, and ample luggage space for the entire family.',
    startSAR: 260,
  },
  {
    slug: 'gmc-yukon-xl',
    name: 'GMC Yukon XL VIP',
    category: 'VIP SUV',
    seats: 7,
    bags: 8,
    extImg: '/assets/images/yukon_exterior.jpg',
    desc: 'The epitome of prestige and road serenity. Premium acoustic insulation, luxurious leather seats, and generous boot space for heavy luggage.',
    startSAR: 380,
  },
  {
    slug: 'toyota-camry',
    name: 'Toyota Camry Executive',
    category: 'Executive Sedan',
    seats: 4,
    bags: 3,
    extImg: '/assets/images/camry_exterior.jpg',
    desc: 'Smooth, whisper-quiet sedan ideal for couples or solo pilgrims seeking a dependable and economical private transfer.',
    startSAR: 200,
  },
  {
    slug: 'toyota-hiace',
    name: 'Toyota HiAce VIP',
    category: 'Mini Bus',
    seats: 10,
    bags: 10,
    extImg: '/assets/images/hiace_exterior.jpg',
    desc: 'Dedicated transport for large families and group delegations with high-roof headroom, powerful climate control, and abundant luggage room.',
    startSAR: 340,
  },
];

export default function FleetPage({ params: { locale } }: FleetPageProps) {
  const dict = getDictionary(locale);

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.nav.fleet}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            Our Luxury Private Fleet
          </h1>
          <p className="mt-3 text-ink-muted text-base leading-relaxed font-light">
            Meticulously maintained, fully air-conditioned, and insured vehicles for the Guests of Allah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VEHICLES.map((v) => (
            <div
              key={v.slug}
              className="bg-surface rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-start"
            >
              <div>
                <div className="relative h-60 bg-bg-alt/30 p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={v.extImg}
                    alt={v.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 drop-shadow-sm"
                  />
                  <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-gold-soft text-gold-dark text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-line">
                    {v.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-2xl text-ink mb-2">
                    {v.name}
                  </h3>
                  <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light mb-4">
                    {v.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-ink font-semibold border-t border-border pt-4">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gold-dark" />
                      <span>{v.seats} Seats</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-gold-dark" />
                      <span>{v.bags} Bags</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-border mt-2">
                <div>
                  <span className="text-[11px] text-ink-muted block">From</span>
                  <span className="font-display font-bold text-lg text-ink">
                    SAR {v.startSAR}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/fleet/${v.slug}`}
                    className="h-10 px-4 rounded-btn border border-border-strong text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center"
                  >
                    View Cabin
                  </Link>
                  <Link
                    href={`/${locale}/booking`}
                    className="h-10 px-5 rounded-btn bg-gold text-ink text-xs font-bold uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>Book</span>
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
