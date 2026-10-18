import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Plane, Navigation, Landmark, Clock, Users, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: ServicesPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';
  return {
    title: dict.page_services.title,
    description: dict.page_services.subtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
    },
  };
}

export default async function ServicesPage(props: ServicesPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);

  const servicesList = [
    {
      id: 'airport-transfer',
      title: dict.page_services.airportTitle,
      desc: dict.page_services.airportDesc,
      icon: Plane,
      highlights: [
        'King Abdulaziz International Airport (KAIA Terminal 1 & North)',
        'Prince Mohammad Bin Abdulaziz Airport Madinah (MED)',
        'Flight radar tracking & 60 minutes free waiting',
        'Direct hotel lobby drop-off in Makkah or Madinah',
      ],
      badge: 'Bestseller',
    },
    {
      id: 'intercity-transfer',
      title: dict.page_services.intercityTitle,
      desc: dict.page_services.intercityDesc,
      icon: Navigation,
      highlights: [
        'Makkah ⇄ Madinah via Hijrah Expressway',
        'Jeddah ⇄ Makkah & Jeddah ⇄ Madinah',
        'Dedicated stop at Miqat (Bir Ali) for Ihram',
        'Comfortable prayer & rest stops included',
      ],
      badge: 'Popular',
    },
    {
      id: 'ziyarat-tour',
      title: dict.page_services.ziyaratTitle,
      desc: dict.page_services.ziyaratDesc,
      icon: Landmark,
      highlights: [
        'Makkah: Ghar Hira, Jabal Thawr, Mina, Muzdalifah, Arafat',
        'Madinah: Masjid Quba, Mount Uhud, Masjid al-Qiblatayn',
        'Knowledgeable local chauffeurs with deep site history',
        'Flexible 3 to 4-hour private tours at your family’s pace',
      ],
      badge: 'Spiritual',
    },
    {
      id: 'full-day-chauffeur',
      title: dict.page_services.fullDayTitle,
      desc: dict.page_services.fullDayDesc,
      icon: Clock,
      highlights: [
        'Dedicated chauffeur and vehicle on standby',
        'Shopping at Red Sea Mall, Jeddah Corniche, Balad historical district',
        'Corporate visits and VIP family hospitality',
        'Flexible hourly or daily flat-rate billing',
      ],
      badge: 'Flexible',
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.nav.services}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.page_services.title}
          </h1>
          <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            {dict.page_services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-surface rounded-2xl p-8 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-muted text-gold-dark border border-gold-line">
                      {service.badge}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-ink mb-3">
                    {service.title}
                  </h2>
                  <p className="text-ink-muted text-sm leading-relaxed mb-6 font-light">
                    {service.desc}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-border">
                    {service.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-ink-light">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/${locale}/booking?service=${service.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-gold-dark hover:text-gold-hover transition-colors group"
                  >
                    <span>{dict.page_services.bookService}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Strip */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-gold-line/60 shadow-xs mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-display text-2xl font-bold text-ink">
              {dict.page_services.featuresTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
              <span className="text-xs text-ink-light font-medium leading-relaxed">
                {dict.page_services.feature1}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
              <span className="text-xs text-ink-light font-medium leading-relaxed">
                {dict.page_services.feature2}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
              <span className="text-xs text-ink-light font-medium leading-relaxed">
                {dict.page_services.feature3}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
              <span className="text-xs text-ink-light font-medium leading-relaxed">
                {dict.page_services.feature4}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/booking`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-base shadow-md transition-all"
          >
            {dict.hero.ctaBook}
          </Link>
        </div>
      </div>
    </div>
  );
}
