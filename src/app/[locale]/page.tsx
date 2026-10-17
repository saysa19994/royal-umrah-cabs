import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { BookingCard } from '@/components/home/BookingCard';
import { HomeSections } from '@/components/home/HomeSections';
import { ShieldCheck, Clock, CheckCircle2, Headphones, ArrowRight } from 'lucide-react';

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const dict = getDictionary(locale);
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-charcoal text-white pt-24 pb-32 md:pb-44">
        {/* BACKGROUND IMAGE & OVERLAYS */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/yukon_exterior.jpg"
            alt={dict.hero.titlePart1}
            className="w-full h-full object-cover object-[center_28%] opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent rtl:bg-gradient-to-l" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl flex flex-col gap-4 text-start">
            {/* EYEBROW */}
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-gold">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>{dict.hero.eyebrow}</span>
            </div>

            {/* H1 HEADLINE WITH GOLD ACCENT */}
            <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight">
              <span>{dict.hero.titlePart1}</span>{' '}
              <span className="text-gold italic font-display font-bold">
                {dict.hero.titlePart2}
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-light max-w-2xl">
              {dict.hero.description}
            </p>

            {/* CTAS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/${locale}/booking`}
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-btn bg-gold text-ink font-bold text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-gold"
              >
                <span>{dict.hero.ctaBook}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link
                href={`/${locale}/fleet`}
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-btn border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <span>{dict.hero.ctaFleet}</span>
              </Link>
            </div>

            {/* 2X2 TRUST LINE WITH ICONS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{dict.trust_strip.flightTracking}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>{dict.trust_strip.fixedPrices}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>{dict.trust_strip.payOnArrival}</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-gold shrink-0" />
                <span>{dict.trust_strip.support247}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING BOOKING CARD */}
      <BookingCard locale={locale} dict={dict} />

      {/* 3. BEIGE TRUST STRIP */}
      <section className="bg-bg-alt border-y border-border py-4 mt-8">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm text-ink">
          <a
            href={settings.google_reviews_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold hover:text-gold-dark transition-colors"
          >
            <span className="text-gold font-bold text-base">★★★★★</span>
            <span>{dict.trust_strip.googleReviews}</span>
          </a>
          <span className="hidden md:inline text-border-strong">•</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-dark font-bold">✓</span>
            <span>{dict.trust_strip.flightTracking}</span>
          </div>
          <span className="hidden md:inline text-border-strong">•</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-dark font-bold">✓</span>
            <span>{dict.trust_strip.payOnArrival}</span>
          </div>
        </div>
      </section>

      {/* 6 to 17: 3 SIMPLE STEPS, POPULAR ROUTES, FLEET, SERVICES, CABIN GALLERY, MIQAT/ZIYARAT, WHY US, REVIEWS, 12 FAQS, TEAM TEASER, GUIDES, DARK CTA BAND */}
      <HomeSections locale={locale} dict={dict} settings={settings} />
    </div>
  );
}
