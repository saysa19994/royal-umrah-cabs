import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
  Plane,
  Car,
  HelpCircle,
  Calendar,
  Compass,
  AlertCircle,
  MessageCircle,
  Luggage,
  Users,
  Sparkles,
  ChevronRight,
  Award,
  BadgeCheck,
} from 'lucide-react';
import { getDbPricesCached } from '@/lib/pricing-db';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import { ROUTES_COMPREHENSIVE_DATA, RouteData } from '@/data/routes-data';
import {
  getLocalizedRouteContent,
  ROUTE_UI_LABELS,
  getRouteContextualLinks,
} from '@/data/localized-routes-content';
import { RoutePageJsonLd } from '@/components/seo/JsonLd';
import { RouteAnalyticsTracker } from '@/components/analytics/RouteAnalyticsTracker';
import { AirportTransferExperience } from '@/components/routes/AirportTransferExperience';
import { IntercityRouteExperience } from '@/components/routes/IntercityRouteExperience';

interface RouteDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(ROUTES_COMPREHENSIVE_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata(props: RouteDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const route: RouteData | undefined = ROUTES_COMPREHENSIVE_DATA[slug];

  if (!route) {
    return { title: 'Route Not Found' };
  }

  const content = getLocalizedRouteContent(slug, locale, route);

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: getLocalizedAlternates(locale, `/routes/${slug}`),
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url: `${baseUrl}/${locale}/routes/${slug}`,
      siteName: 'Duyuf Alrahman VIP',
      type: 'website',
    },
  };
}

function getHeroImageForSlug(slug: string): string {
  if (
    slug.includes('makkah-to-madinah') ||
    slug.includes('madinah-to-makkah') ||
    slug.includes('jeddah-to-madinah')
  ) {
    return '/assets/blueprint/routes/makkah-madinah.webp';
  }
  if (slug.includes('airport')) {
    return '/assets/blueprint/routes/hero-arrival.webp';
  }
  if (slug.includes('makkah') || slug.includes('haram')) {
    return '/assets/blueprint/routes/jeddah-makkah.webp';
  }
  if (slug.includes('taif')) {
    return '/assets/blueprint/routes/makkah-taif.webp';
  }
  return '/assets/blueprint/routes/planning.webp';
}

export default async function RouteDetailPage(props: RouteDetailPageProps) {
  const { locale, slug } = await props.params;
  const isAr = locale === 'ar';
  const isRtl = locale === 'ar' || locale === 'ur';
  const route: RouteData | undefined = ROUTES_COMPREHENSIVE_DATA[slug];

  if (!route) {
    notFound();
  }

  const content = getLocalizedRouteContent(slug, locale, route);
  const labels = ROUTE_UI_LABELS[locale] || ROUTE_UI_LABELS.en;
  const contextualLinks = getRouteContextualLinks(slug, locale);

  const dbRates = await getDbPricesCached();
  const routeRates = dbRates[slug] || {};
  const minPriceSAR = Math.min(
    ...Object.values(routeRates).filter((v) => typeof v === 'number' && v > 0),
    200
  );

  const heroImage = getHeroImageForSlug(slug);
  const isAirportRoute =
    slug.includes('airport') || (route.terminalNotes && route.terminalNotes.length > 0);
  const isIntercityRoute =
    route.distanceKm >= 200 ||
    slug.includes('makkah-to-madinah') ||
    slug.includes('madinah-to-makkah') ||
    slug.includes('jeddah-to-madinah');

  const whatsappMessage = isAr
    ? `السلام عليكم، أود حجز رحلة VIP خاصة لمسار: ${route.titleAr}`
    : `Hello, I would like to book a private VIP transfer for: ${route.titleEn}`;
  const whatsappUrl = `https://wa.me/966567588261?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-[#090D15] min-h-screen text-start text-[#F6F3ED] overflow-x-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <RouteAnalyticsTracker slug={slug} locale={locale} />
      <RoutePageJsonLd
        route={route}
        locale={locale}
        minPriceSAR={minPriceSAR}
        localizedContent={content}
      />

      {/* 1. CINEMATIC FULL-BLEED ROUTE HERO */}
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/10">
        {/* Background Image with Dark Gradient Vignette */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src={heroImage}
            alt={content.h1}
            fill
            priority
            className="object-cover object-center brightness-40 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D15] via-[#090D15]/85 to-[#090D15]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090D15]/95 via-transparent to-[#090D15]/95" />
        </div>

        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-xs text-[#AEB7C4] mb-6 flex-wrap"
          >
            <Link
              href={`/${locale}`}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
            >
              <span>{labels.breadcrumbHome}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30 rtl:rotate-180" />
            <Link
              href={`/${locale}/routes`}
              className="hover:text-[#D4AF37] transition-colors"
            >
              {labels.breadcrumbRoutes}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30 rtl:rotate-180" />
            <span className="text-[#D4AF37] font-semibold truncate max-w-[280px] sm:max-w-none">
              {content.h1}
            </span>
          </nav>

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#101725]/90 border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] uppercase tracking-wider backdrop-blur-md shadow-lg shadow-[#D4AF37]/5">
              <Compass className="w-3.5 h-3.5" />
              <span>{route.distanceKm} {isAr ? 'كم' : 'km'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#101725]/80 border border-white/10 text-xs font-semibold text-[#F6F3ED] backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>
                {isAr
                  ? `${route.durationMinutesMin} - ${route.durationMinutesMax} دقيقة تقريباً`
                  : `~${route.durationMinutesMin} - ${route.durationMinutesMax} mins`}
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{labels.zeroDepositBadge}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#AEB7C4] backdrop-blur-md">
              <Calendar className="w-3 h-3 text-[#D4AF37]" />
              <span>{labels.verifiedLabel} {route.lastUpdated}</span>
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight leading-[1.15] max-w-4xl">
            {content.h1}
          </h1>

          <p className="text-base sm:text-xl text-[#AEB7C4] font-light leading-relaxed max-w-3xl mb-8">
            {content.subtitle}
          </p>

          {/* Action Dock / Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/booking?route=${slug}`}
              className="h-12 sm:h-14 px-8 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] hover:from-[#E5C158] hover:to-[#C49E34] text-[#090D15] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#D4AF37]/25 flex items-center gap-2 active:scale-95"
            >
              <Car className="w-4 h-4" />
              <span>{labels.bookButton}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 sm:h-14 px-7 rounded-xl bg-[#101725]/90 hover:bg-[#141D2C] border border-white/10 hover:border-[#D4AF37]/50 text-[#F6F3ED] hover:text-[#D4AF37] font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2.5 backdrop-blur-md shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'حجز فوري عبر واتساب' : 'VIP WhatsApp Concierge'}</span>
            </a>

            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#101725]/70 border border-white/10 text-xs text-[#AEB7C4] backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{labels.expresswayLabel}: <strong className="text-white font-semibold">{content.highwayNote}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN EXPERIENCE CONTAINER */}
      <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16">
        {/* INTERACTIVE COMPONENT (AIRPORT OR INTERCITY) */}
        {isAirportRoute ? (
          <AirportTransferExperience
            locale={locale}
            slug={slug}
            minPriceSAR={minPriceSAR}
            rates={routeRates}
          />
        ) : isIntercityRoute ? (
          <IntercityRouteExperience
            locale={locale}
            slug={slug}
            minPriceSAR={minPriceSAR}
            rates={routeRates}
          />
        ) : null}

        {/* 3. EXECUTIVE INCLUSIONS & LUXURY AMENITIES */}
        <section className="bg-[#101725] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl mb-12">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                VIP Service Standards
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {labels.inclusionsHeading}
              </h2>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4" />
              <span>{labels.zeroDepositBadge}</span>
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#AEB7C4] font-light leading-relaxed mb-8 max-w-4xl">
            {content.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content.inclusions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#141D2C] border border-white/5 hover:border-[#D4AF37]/30 transition-colors flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm text-[#F6F3ED] font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. VERIFIED ROUTE FAQS */}
        {content.faqs && content.faqs.length > 0 && (
          <section className="bg-[#101725] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-[#141D2C] border border-white/10 text-[#D4AF37] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {labels.faqHeading}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#AEB7C4] mb-8 font-light">
              {labels.faqSubtitle}
            </p>

            <div className="space-y-4">
              {content.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#141D2C] border border-white/5 hover:border-[#D4AF37]/30 transition-colors space-y-2"
                >
                  <h3 className="font-bold text-sm sm:text-base text-[#F6F3ED] leading-snug flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#AEB7C4] font-light leading-relaxed pl-3.5 rtl:pl-0 rtl:pr-3.5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. CONTEXTUAL INTERNAL LINKS */}
        {contextualLinks && contextualLinks.length > 0 && (
          <section className="bg-[#101725] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl mb-12">
            <h2 className="font-display font-black text-xl sm:text-2xl text-white mb-2">
              {isAr ? 'خدمات، أسطول وأدلة مرتبطة بهذا المسار' : 'Related Vehicles, Guides & Sacred Ziyarat'}
            </h2>
            <p className="text-xs sm:text-sm text-[#AEB7C4] mb-6 font-light">
              {isAr
                ? 'استكشف المركبات المعتمدة لهذا المسار، وأدلة الوصول للمطارات وجولات المزارات:'
                : 'Explore dedicated vehicles, terminal arrival guides, and sacred historical ziyarat tours:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {contextualLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="p-4 rounded-2xl bg-[#141D2C] border border-white/5 hover:border-[#D4AF37]/50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-bold">
                      {link.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#F6F3ED] group-hover:text-[#D4AF37] transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 6. RELATED ROUTES */}
        {route.relatedRouteIds && route.relatedRouteIds.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display font-black text-xl sm:text-2xl text-white mb-6">
              {labels.relatedHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {route.relatedRouteIds.map((relId) => {
                const relRoute = ROUTES_COMPREHENSIVE_DATA[relId];
                if (!relRoute) return null;
                const relRates = dbRates[relId] || {};
                const relMin = Math.min(
                  ...Object.values(relRates).filter((v) => typeof v === 'number' && v > 0),
                  200
                );

                return (
                  <Link
                    key={relId}
                    href={`/${locale}/routes/${relId}`}
                    className="p-6 rounded-3xl bg-[#101725] border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl group flex flex-col justify-between hover:-translate-y-1"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
                        {relRoute.distanceKm} {isAr ? 'كم' : 'km'}
                      </span>
                      <h3 className="font-display font-extrabold text-base text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-2">
                        {isAr ? relRoute.titleAr : relRoute.titleEn}
                      </h3>
                      <p className="text-xs text-[#AEB7C4] font-light line-clamp-2 mb-4">
                        {isAr ? relRoute.subtitleAr : relRoute.subtitleEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="font-black text-[#D4AF37] text-sm">
                        {isAr ? `من ${relMin} ر.س` : `From ${labels.currencySAR} ${relMin}`}
                      </span>
                      <span className="text-white flex items-center gap-1 font-bold group-hover:text-[#D4AF37] transition-colors">
                        <span>{labels.viewButton}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 7. BOTTOM ROYAL CREST CTA BANNER */}
        <div className="bg-gradient-to-br from-[#101725] via-[#141D2C] to-[#101725] rounded-3xl p-8 sm:p-12 md:p-14 border border-[#D4AF37]/30 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-bold uppercase tracking-widest border border-[#D4AF37]/30">
              {labels.ctaBadge}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              {labels.ctaHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#AEB7C4] font-light leading-relaxed">
              {labels.ctaText}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/booking?route=${slug}`}
                className="h-12 sm:h-13 px-8 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#090D15] font-black text-xs uppercase tracking-wider hover:from-[#E5C158] hover:to-[#C49E34] transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 active:scale-95"
              >
                <span>{labels.ctaButton}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link
                href={`/${locale}/routes`}
                className="h-12 sm:h-13 px-6 rounded-xl bg-[#101725] hover:bg-[#141D2C] text-white font-semibold text-xs border border-white/10 hover:border-white/30 transition-all flex items-center"
              >
                {labels.ctaAllRoutesButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
