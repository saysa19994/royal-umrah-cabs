import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { RouteBasedPricingExperience } from '@/components/pricing/RouteBasedPricingExperience';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getMergedSiteSettings } from '@/lib/dynamic-settings-store';
import { PRICING_PAGE_CONTENT } from '@/data/pricing-page-content';
import { AUTHORITATIVE_TRANSFER_RATES, LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';
import {
  Shield,
  Diamond,
  Headphones,
  Plane,
  Car,
  Clock,
  Handshake,
  Users,
  Luggage,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Banknote,
  MessageCircle,
} from 'lucide-react';

interface PricingPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: PricingPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const content = PRICING_PAGE_CONTENT[locale] || PRICING_PAGE_CONTENT.en;

  return {
    title: `${content.heroTitle} | Duyuf Alrahman VIP`,
    description: content.heroSubtitle,
    alternates: getLocalizedAlternates(locale, '/pricing'),
  };
}

export default async function PricingPage(props: PricingPageProps) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const dict = getDictionary(locale);
  const content = PRICING_PAGE_CONTENT[locale] || PRICING_PAGE_CONTENT.en;
  const initialRates = await getDbPricesCached();
  const settings = getMergedSiteSettings();

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const getDynamicPrice = (routeId: string, vehicleId: string): number => {
    return initialRates?.[routeId]?.[vehicleId] ?? AUTHORITATIVE_TRANSFER_RATES[routeId]?.[vehicleId] ?? 0;
  };

  const topOverviewRoutes = [
    {
      id: 'jeddah-airport-to-makkah',
      title: LOCALIZED_ROUTE_NAMES['jeddah-airport-to-makkah']?.[locale] || (isAr ? 'مطار جدة ➔ مكة المكرمة' : 'Jeddah Airport ➔ Makkah'),
      distance: '95 km',
      time: isAr ? '75 دقيقة' : '75 mins',
    },
    {
      id: 'makkah-to-madinah',
      title: LOCALIZED_ROUTE_NAMES['makkah-to-madinah']?.[locale] || (isAr ? 'مكة المكرمة ➔ المدينة المنورة' : 'Makkah ➔ Madinah'),
      distance: '450 km',
      time: isAr ? '4.5 ساعات' : '4.5 hours',
    },
    {
      id: 'madinah-airport-to-hotel',
      title: LOCALIZED_ROUTE_NAMES['madinah-airport-to-hotel']?.[locale] || (isAr ? 'مطار المدينة ➔ فنادق الحرم' : 'Madinah Airport ➔ Hotel'),
      distance: '25 km',
      time: isAr ? '30 دقيقة' : '30 mins',
    },
    {
      id: 'jeddah-to-madinah',
      title: LOCALIZED_ROUTE_NAMES['jeddah-to-madinah']?.[locale] || (isAr ? 'جدة ➔ المدينة المنورة' : 'Jeddah ➔ Madinah'),
      distance: '410 km',
      time: isAr ? '4 ساعات' : '4 hours',
    },
  ];

  const whyChooseBadges = [
    {
      icon: <Plane className="w-5 h-5 text-gold-dark" />,
      title: isAr ? 'دقة بالمواعيد' : 'On-Time Service',
      desc: isAr ? 'تتبع راداري للرحلات ومواعيد منضبطة' : 'Flight tracking & punctual arrival',
    },
    {
      icon: <Shield className="w-5 h-5 text-gold-dark" />,
      title: isAr ? 'نقل آمن وموثوق' : 'Safe & Reliable',
      desc: isAr ? 'سائقون معتمدون ومركبات مفحوصة' : 'Licensed chauffeurs & inspected fleet',
    },
    {
      icon: <Car className="w-5 h-5 text-gold-dark" />,
      title: isAr ? 'أسطول فاخر حديث' : 'Premium VIP Fleet',
      desc: isAr ? 'موديلات حديثة 2024-2026 فائقة الراحة' : 'Latest 2024-2026 luxury models',
    },
    {
      icon: <Headphones className="w-5 h-5 text-gold-dark" />,
      title: isAr ? 'دعم عملاء 24/7' : '24/7 Support',
      desc: isAr ? 'متابعة مباشرة عبر الواتساب لحظة بلحظة' : 'Direct WhatsApp & phone assistance',
    },
    {
      icon: <Banknote className="w-5 h-5 text-gold-dark" />,
      title: isAr ? 'أسعار تنافسية وثابتة' : 'Fixed Rates',
      desc: isAr ? 'دفع نقدي للسائق عند الوصول دون عربون' : '100% Cash on arrival, zero deposit',
    },
  ];

  return (
    <div className="duyuf-pricing-page min-h-screen text-start w-full max-w-full overflow-x-clip" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          1. MASTER HERO: OUR PRICES & PACKAGES
      ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-10 sm:pt-14 pb-12 sm:pb-16 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/cinematic/home/hero-mercedes-kaaba-retina.jpg"
            alt="Duyuf Al Rahman VIP Fleet"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/95" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6">
            <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
              {dict.nav.home}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-gold-dark" />
            <span className="text-gold-dark font-semibold">{dict.nav.pricing}</span>
          </nav>

          {/* Heading with gold ampersand */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-alt border border-gold/40 text-xs font-bold text-gold-dark uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.badge || (isAr ? 'شفافية مطلقة • أسعار معتمدة' : 'Absolute Transparency • Fixed Fares')}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.15] mb-4 text-[var(--text-primary)]">{content.heroTitle}</h1>
            <p className="text-sm sm:text-lg text-ink-muted font-light leading-relaxed">
              {content.heroSubtitle || (isAr
                ? 'خدمات نقل فاخرة بأسعار تنافسية ومحددة عبر جميع مدن المملكة العربية السعودية. دفع نقدي 100% للسائق عند الوصول بعد إتمام الرحلة وبدون أي عربون مسبق.'
                : 'Premium transportation at competitive prices across Saudi Arabia. 100% Cash payment to the chauffeur upon arrival with zero advance deposit.')}
            </p>
          </div>

          {/* 4 Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface/80 border border-border">
              <div className="w-9 h-9 rounded-xl border border-gold/50 bg-bg-alt flex items-center justify-center text-gold-dark shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-ink">
                {content.trustSafeReliable || (isAr ? 'نقل آمن وموثوق' : 'Safe & Reliable')}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface/80 border border-border">
              <div className="w-9 h-9 rounded-xl border border-gold/50 bg-bg-alt flex items-center justify-center text-gold-dark shrink-0">
                <Diamond className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-ink">
                {content.trustPremiumFleet || (isAr ? 'أسطول سيارات فاخر' : 'Premium Fleet')}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface/80 border border-border">
              <div className="w-9 h-9 rounded-xl border border-gold/50 bg-bg-alt flex items-center justify-center text-gold-dark shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-ink">
                {content.trustSupport247 || (isAr ? 'دعم عملاء 24/7' : '24/7 Support')}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface/80 border border-gold/30">
              <div className="w-9 h-9 rounded-xl border border-gold bg-bg-alt flex items-center justify-center text-gold-dark shrink-0">
                <Banknote className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-gold-dark">
                {dict.booking_card.noPrepayNotice}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CORE DYNAMIC PRICING COMPARISON EXPERIENCE (Prompt 5)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <RouteBasedPricingExperience
            locale={locale}
            dict={dict}
            initialRates={initialRates}
            taifEnabled={settings.taif_enabled !== false}
            riyadhEnabled={settings.riyadh_enabled !== false}
          />
        </div>
      </section>

      {/* 3. Editorial popular route fare cards — consistent with the interactive explorer */}
      <section className="py-12 sm:py-16 border-y border-border bg-bg-alt">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">
              {({ ar: 'الرحلات الأكثر طلبًا', en: 'POPULAR JOURNEYS', ms: 'PERJALANAN POPULAR', id: 'RUTE POPULER', ur: 'مقبول سفر', fr: 'TRAJETS POPULAIRES', es: 'RUTAS POPULARES', de: 'BELIEBTE ROUTEN', tr: 'POPÜLER ROTALAR', hi: 'लोकप्रिय यात्राएँ' } as Record<Locale, string>)[locale]}
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-display font-semibold text-ink">{content.heroTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{content.heroSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {topOverviewRoutes.map((rt) => (
              <article key={rt.id} className="rounded-3xl border border-border bg-surface p-5 sm:p-7 shadow-sm transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lg">
                <div className="mb-5 flex items-start gap-3">
                  <div className="rounded-xl bg-bg-alt p-3 text-gold-dark"><MapPin className="h-5 w-5" /></div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold leading-snug text-ink">{rt.title}</h3>
                    <p className="mt-1 text-xs text-ink-muted">{rt.distance} • {rt.time}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {([
                    ['camry', 'Toyota Camry'],
                    ['staria', 'Hyundai Staria'],
                    ['yukon', 'GMC Yukon XL'],
                    ['hiace', 'Toyota Hiace'],
                    ['coaster', 'Toyota Coaster'],
                  ] as const).map(([vehicleId, vehicleName]) => {
                    const fare = getDynamicPrice(rt.id, vehicleId);
                    if (fare <= 0) return null;
                    return (
                      <Link
                        key={vehicleId}
                        href={`/${locale}/booking?route=${encodeURIComponent(rt.id)}&vehicle=${vehicleId}`}
                        className="group flex min-h-16 items-center justify-between gap-3 rounded-xl border border-border bg-bg-alt/50 px-4 py-3 transition-colors hover:border-gold/60 hover:bg-bg-alt focus-visible:outline-offset-2"
                      >
                        <span className="text-sm font-medium text-ink">{vehicleName}</span>
                        <span className="shrink-0 text-end font-bold tabular-nums text-gold-dark" dir="ltr">{fare} SAR</span>
                      </Link>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECTION: WHY CHOOSE DUYUF AL RAHMAN VIP? (5 BADGES)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D6A13A]" />
              <h2 className="font-playfair font-serif text-2xl sm:text-3xl font-bold text-ink">
                {isAr ? 'لماذا تختار ضيوف الرحمن VIP؟' : 'Why Choose Duyuf Al Rahman VIP?'}
              </h2>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D6A13A]" />
            </div>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr ? 'معايير ملكية تضمن لك ولعائلتك أرقى مستويات الراحة والطمأنينة' : 'Royal standards ensuring supreme comfort and peace of mind'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {whyChooseBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-surface border border-border hover:border-gold/50 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-bg-alt border border-gold/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {badge.icon}
                </div>
                <h3 className="font-bold text-sm text-ink mb-1">{badge.title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. MASTER BOTTOM CTA
      ────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 border-t border-border bg-gradient-to-b from-[#090D15] to-[#101725] text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-alt border border-gold/40 text-xs font-bold text-gold-dark uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'حجز فوري ومؤكد' : 'Instant Guaranteed Booking'}</span>
          </div>
          <h2 className="font-playfair font-serif text-3xl sm:text-4xl font-bold text-ink mb-3">
            {isAr ? 'جاهز لحجز رحلتك الميمونة؟' : 'Ready to Reserve Your Blessed Journey?'}
          </h2>
          <p className="text-sm text-ink-muted mb-8 max-w-xl mx-auto leading-relaxed">
            {isAr
              ? 'احجز سيارتك الفاخرة خلال دقائق معدودة. تأكيد فوري، بدون أي عربون، والدفع نقداً للسائق عند الوصول بأمان.'
              : 'Book your luxury vehicle in just a few minutes. Instant confirmation, 0 advance deposit, and cash payment on safe arrival.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#E5B14B] via-[#D6A13A] to-[#A97B27] text-[#090D15] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-98 transition-all"
            >
              <span>{isAr ? 'احجز رحلتك اليوم' : 'Book Your Journey Today'}</span>
              <ArrowIcon className="w-4 h-4 text-[#090D15]" />
            </Link>

            <a
              href="https://wa.me/966567588261"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-bg-alt hover:bg-[#18263e] text-[#25D366] border border-[#25D366]/40 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp Concierge'}</span>
            </a>
          </div>
          <span className="block text-xs text-ink-muted mt-4">
            {isAr ? 'راحتك وسلامتك هي أولويتنا القصوى' : 'Your comfort and safety are our highest priorities'}
          </span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. STICKY MOBILE CONVERSION BAR
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-surface/95 backdrop-blur-xl border-t border-border md:hidden flex items-center justify-between gap-3 shadow-2xl">
        <Link
          href={`/${locale}/booking`}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E5B14B] via-[#D6A13A] to-[#A97B27] text-[#090D15] font-extrabold text-xs text-center shadow-lg active:scale-95 transition-transform"
        >
          {isAr ? 'احجز رحلتك الآن' : 'Book Your Journey'}
        </Link>
        <a
          href="https://wa.me/966567588261"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] flex items-center justify-center gap-1.5 shrink-0 text-xs font-bold"
        >
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
