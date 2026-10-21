import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { BookingCard } from '@/components/home/BookingCard';
import { HomeSections } from '@/components/home/HomeSections';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  Headphones,
  ArrowRight,
  MessageCircle,
  Calculator,
  Plane,
  Train,
  Car,
  Compass,
  Sparkles,
} from 'lucide-react';

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  const settings = await getSiteSettings();

  const waitingMinutes = settings.airport_waiting_minutes || 60;

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HomepageFaqJsonLd dict={dict} />

      {/* 1. LUXURY EXECUTIVE HERO SECTION */}
      <section className="relative min-h-[640px] sm:min-h-[700px] lg:min-h-[780px] flex items-center justify-center overflow-hidden bg-[#0A0F1D] text-white pt-20 sm:pt-24 pb-32 sm:pb-40 md:pb-48">
        {/* BACKGROUND IMAGE & LUXURY OVERLAYS */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/yukon_exterior.webp"
            alt={dict.hero.titlePart1}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_32%] opacity-35 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/80 to-[#0A0F1D]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D]/95 via-[#0A0F1D]/70 to-transparent rtl:bg-gradient-to-l" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl flex flex-col gap-5 text-start">
            {/* VIP BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-gold w-fit shadow-xs">
              <Sparkles className="w-4 h-4 text-gold animate-pulse shrink-0" />
              <span>
                {locale === 'ar'
                  ? 'خدمة النقل الخاص لضيوف الرحمن | Duyuf Alrahman VIP'
                  : 'Executive VIP Chauffeur Service for Umrah Pilgrims'}
              </span>
            </div>

            {/* H1 HEADLINE WITH GOLD ACCENT */}
            <h1 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.12] sm:leading-[1.08] tracking-tight">
              <span>{dict.hero.titlePart1}</span>{' '}
              <span className="text-gold italic font-display font-bold">
                {dict.hero.titlePart2}
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-light max-w-2xl">
              {locale === 'ar'
                ? `استقبال خاص من بوابة المطار إلى فندقك بمكة والمدينة • سيارات VIP حديثة بسائق خاص • انتظار مجاني ${waitingMinutes} دقيقة • الدفع عند الوصول 100% نقداً للسائق.`
                : dict.hero.description}
            </p>

            {/* CTAS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#booking-calculator"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] h-12 px-7 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-gold focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Calculator className="w-4 h-4" />
                <span>{dict.booking_card.buttonCalculate || (locale === 'ar' ? 'احسب تكلفة رحلتك' : 'Calculate Your Fare')}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] h-12 px-6 rounded-btn border border-emerald-500/50 bg-emerald-950/30 text-emerald-400 font-semibold text-xs sm:text-sm hover:bg-emerald-600 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{locale === 'ar' ? 'محادثة وتأكيد واتساب' : locale === 'ms' ? 'Hubungi WhatsApp' : 'Chat on WhatsApp'}</span>
              </a>
            </div>

            {/* QUICK GUIDES ACCESS PILLS (NO UNVERIFIED "OFFICIAL" WORDING) */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-gold/80 uppercase tracking-widest block mb-2">
                {locale === 'ar' ? 'أدلة وإرشادات السفر لضيوف الرحمن 2026:' : 'Umrah Travel Guides 2026:'}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/${locale}/guides/jeddah-airport-arrival-pickup-guide`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-gold hover:text-slate-950 text-white text-xs font-semibold border border-white/15 transition-all"
                >
                  <Plane className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{locale === 'ar' ? 'أدلة المطارات' : 'Airport Guides'}</span>
                </Link>
                <Link
                  href={`/${locale}/guides/jeddah-airport-to-makkah-taxi-vs-train`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-gold hover:text-slate-950 text-white text-xs font-semibold border border-white/15 transition-all"
                >
                  <Train className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{locale === 'ar' ? 'القطار أم السيارة' : 'Train vs Taxi'}</span>
                </Link>
                <Link
                  href={`/${locale}/guides/how-to-choose-the-right-vehicle-for-umrah-group`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-gold hover:text-slate-950 text-white text-xs font-semibold border border-white/15 transition-all"
                >
                  <Car className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{locale === 'ar' ? 'دليل اختيار السيارة' : 'Vehicle Guide'}</span>
                </Link>
                <Link
                  href={`/${locale}/guides/makkah-ziyarat-places-routes-transport`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-gold hover:text-slate-950 text-white text-xs font-semibold border border-white/15 transition-all"
                >
                  <Compass className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>{locale === 'ar' ? 'أدلة المزارات' : 'Ziyarat Guides'}</span>
                </Link>
              </div>
            </div>

            {/* 4 ASSURANCES TRUST LINE (FACTUAL ONLY, DYNAMIC FROM SETTINGS) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/15 text-xs text-white/90">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>{locale === 'ar' ? '100% الدفع عند الوصول (نقداً للسائق)' : '100% Pay on Arrival (Cash to Chauffeur)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{locale === 'ar' ? `${waitingMinutes} دقيقة انتظار مجاني بالمطار` : `${waitingMinutes}-Min Free Airport Wait`}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>
                  {settings.free_miqat_stop
                    ? (locale === 'ar' ? 'توقف مجاني عند الميقات للإحرام' : 'Free Miqat Stop for Ihram')
                    : (locale === 'ar' ? 'توصيل مباشر للفندق والحرمين' : 'Direct Chauffeur to Hotel')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-gold shrink-0" />
                <span>{locale === 'ar' ? 'سائق خاص ومتابعة 24/7' : '24/7 Dedicated Chauffeur Support'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING BOOKING CARD WITH ELEVATED LUXURY STYLE */}
      <div id="booking-calculator" className="relative z-20">
        <BookingCard locale={locale} dict={dict} />
      </div>

      {/* 3. BEIGE TRUST STRIP (ONLY SHOWN IF VALID OR FACTUAL) */}
      <section className="bg-bg-alt border-y border-border py-4 mt-8">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm text-ink">
          {settings.google_reviews_link && settings.google_reviews_count > 0 ? (
            <a
              href={settings.google_reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold hover:text-gold-dark transition-colors"
            >
              <span className="text-gold font-bold text-base">★ {settings.google_reviews_rating.toFixed(1)}</span>
              <span>{dict.trust_strip.googleReviews}</span>
            </a>
          ) : (
            <div className="flex items-center gap-2 font-semibold text-ink">
              <span className="text-gold-dark font-bold">✓</span>
              <span>{locale === 'ar' ? 'أسعار معتمدة ومحددة مسبقاً' : 'Guaranteed Fixed Fares'}</span>
            </div>
          )}
          <span className="hidden md:inline text-border-strong">•</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-dark font-bold">✓</span>
            <span>{locale === 'ar' ? `${waitingMinutes} دقيقة انتظار مجاني بالمطار` : `${waitingMinutes}-Min Free Airport Wait`}</span>
          </div>
          <span className="hidden md:inline text-border-strong">•</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-dark font-bold">✓</span>
            <span>{dict.trust_strip.payOnArrival}</span>
          </div>
          <span className="hidden md:inline text-border-strong">•</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-dark font-bold">✓</span>
            <span>{dict.trust_strip.freeCancellation}</span>
          </div>
        </div>
      </section>

      {/* 4. HOME SECTIONS */}
      <HomeSections locale={locale} dict={dict} settings={settings} />
    </div>
  );
}
