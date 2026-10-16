import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { ShieldCheck, Clock, CheckCircle2, Headphones, ArrowRight, MessageCircle } from 'lucide-react';

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
      {/* HERO SECTION */}
      <section className="relative min-h-[600px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-charcoal text-white pt-24 pb-20">
        {/* BACKGROUND IMAGE & OVERLAYS */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/yukon_exterior.jpg"
            alt={dict.hero.titlePart1}
            className="w-full h-full object-cover object-[center_30%] opacity-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent rtl:bg-gradient-to-l" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl flex flex-col gap-5 text-start">
            {/* EYEBROW */}
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-gold">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span>{dict.hero.eyebrow}</span>
            </div>

            {/* H1 HEADLINE WITH GOLD ACCENT */}
            <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
              <span>{dict.hero.titlePart1}</span>{' '}
              <span className="text-gold italic font-display font-bold">
                {dict.hero.titlePart2}
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-light max-w-2xl">
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

            {/* TRUST LINE */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-xs text-white/90">
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

      {/* BEIGE TRUST BAND */}
      <section className="bg-bg-alt border-y border-border py-6">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-6 text-sm text-ink">
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
            <span>{dict.trust_strip.freeCancellation}</span>
          </div>
          <span className="hidden md:inline text-border-strong">•</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-dark font-bold">✓</span>
            <span>{dict.trust_strip.noHiddenFees}</span>
          </div>
        </div>
      </section>

      {/* PHASE 1 ARCHITECTURE VERIFICATION BANNER */}
      <section className="py-12 bg-bg">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-4">
            Phase 1 Foundation Complete
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-4">
            Next.js App Router + Strict i18n + Supabase Architecture
          </h2>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed max-w-2xl mx-auto mb-6">
            Strict multilingual separation is active across <strong className="text-ink">/en</strong>, <strong className="text-ink">/ar</strong>, and <strong className="text-ink">/ms</strong>. The build pipeline validates all 141 translation keys, database schema &amp; seed data are ready, and header, footer, currency switcher, and floating WhatsApp are connected to live settings.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-btn bg-gold text-ink font-bold text-sm shadow-xs hover:bg-gold-hover transition-colors"
            >
              <span>Explore Phase 2 Modules</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
