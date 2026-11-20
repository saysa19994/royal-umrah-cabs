import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { editorialAlternates, editorialRobots } from '@/lib/seo/localization-indexing';
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
import { getPublishedRouteImagesCached } from '@/lib/public-route-availability';
import { ROUTES_COMPREHENSIVE_DATA, RouteData } from '@/data/routes-data';
import { EXECUTIVE_ROUTES_DATA } from '@/data/executive-routes-data';
import { getSiteSettings } from '@/lib/settings';
import {
  getLocalizedRouteContent,
  ROUTE_UI_LABELS,
  getRouteContextualLinks,
} from '@/data/localized-routes-content';
import { RoutePageJsonLd } from '@/components/seo/JsonLd';
import { RouteAnalyticsTracker } from '@/components/analytics/RouteAnalyticsTracker';
import { AirportTransferExperience } from '@/components/routes/AirportTransferExperience';
import { IntercityRouteExperience } from '@/components/routes/IntercityRouteExperience';
import styles from './route-detail.module.css';

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

  if (!route || slug === 'riyadh-airport-transfer') {
    return { title: 'Route Not Found', robots: { index: false, follow: false } };
  }

  const content = getLocalizedRouteContent(slug, locale, route);
  const editorialCover = (await getPublishedRouteImagesCached())[slug];

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: editorialAlternates(locale, `/routes/${slug}`),
    robots: editorialRobots(locale),
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url: `${baseUrl}/${locale}/routes/${slug}`,
      siteName: 'Duyuf Alrahman VIP',
      type: 'website',
      ...(editorialCover ? { images: [{ url: editorialCover, alt: content.h1 }] } : {}),
    },
  };
}

export default async function RouteDetailPage(props: RouteDetailPageProps) {
  const { locale, slug } = await props.params;
  const isAr = locale === 'ar';
  const localeConfig = LOCALE_CONFIG[locale];
  const dict = getDictionary(locale);
  const route: RouteData | undefined = ROUTES_COMPREHENSIVE_DATA[slug];

  if (!route || slug === 'riyadh-airport-transfer') {
    notFound();
  }

  const content = getLocalizedRouteContent(slug, locale, route);
  const labels = ROUTE_UI_LABELS[locale] || ROUTE_UI_LABELS.en;
  const contextualLinks = getRouteContextualLinks(slug, locale);

  // Published admin fares take precedence; approved matrix is only the fallback.
  const [liveRates, publishedCovers] = await Promise.all([getDbPricesCached(), getPublishedRouteImagesCached()]);
  const routeRates = liveRates[slug] || {};
  const configuredFares = Object.values(routeRates).filter(
    (fare): fare is number => typeof fare === 'number' && Number.isFinite(fare) && fare > 0
  );
  const minPriceSAR = configuredFares.length > 0 ? Math.min(...configuredFares) : undefined;

  const heroImage = publishedCovers[slug] || EXECUTIVE_ROUTES_DATA.find((entry) => entry.slug === slug)?.image
    || '/assets/blueprint/routes/planning.webp';
  const distance = new Intl.NumberFormat(localeConfig.dateFormat, { style: 'unit', unit: 'kilometer' });
  const duration = new Intl.NumberFormat(localeConfig.dateFormat, { style: 'unit', unit: 'minute' });
  const fares = new Intl.NumberFormat(localeConfig.dateFormat, {
    style: 'currency', currency: 'SAR', maximumFractionDigits: 0,
  });
  const reviewedAt = new Date(route.lastUpdated + ' UTC');
  const verifiedDate = Number.isNaN(reviewedAt.getTime())
    ? route.lastUpdated
    : new Intl.DateTimeFormat(localeConfig.dateFormat, {
        year: 'numeric', month: 'long', calendar: 'gregory', timeZone: 'UTC',
      }).format(reviewedAt);
  const isAirportRoute =
    slug.includes('airport') || (route.terminalNotes && route.terminalNotes.length > 0);
  const isIntercityRoute =
    route.distanceKm >= 200 ||
    slug.includes('makkah-to-madinah') ||
    slug.includes('madinah-to-makkah') ||
    slug.includes('jeddah-to-madinah');

  const { whatsapp_number } = await getSiteSettings();
  const whatsappMessage = `${localeConfig.whatsappGreeting} ${content.h1}`;
  const whatsappUrl = `https://wa.me/${whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-bg min-h-screen text-start text-ink overflow-x-hidden" dir={localeConfig.dir}>
      <RouteAnalyticsTracker slug={slug} locale={locale} />
      <RoutePageJsonLd
        route={route}
        locale={locale}
        minPriceSAR={minPriceSAR}
        localizedContent={content}
      />

      <section className={styles.hero} aria-labelledby="route-title">
        <Image src={heroImage} alt="" fill sizes="100vw" priority className={styles.heroImage} />
        <div className={styles.heroInner}>
          <nav aria-label={labels.breadcrumbRoutes} className={styles.breadcrumb}>
            <Link href={`/${locale}`}>{labels.breadcrumbHome}</Link>
            <ChevronRight size={14} className="rtl:rotate-180" aria-hidden="true" />
            <Link href={`/${locale}/routes`}>{labels.breadcrumbRoutes}</Link>
          </nav>
          <div className={styles.heroCopy}>
            <h1 id="route-title">{content.h1}</h1>
            <p>{content.subtitle}</p>
            <div className={styles.actions}>
              <Link href={`/${locale}/booking?route=${slug}`} className={styles.primary}>
                {labels.bookButton} <ArrowRight size={18} className="rtl:rotate-180" aria-hidden="true" />
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
                <MessageCircle size={18} aria-hidden="true" /> {dict.footer.whatsappBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.routeFacts}>
        <div className={styles.factsInner}>
          <span><Compass size={18} aria-hidden="true" /> {distance.format(route.distanceKm)}</span>
          <span>
            <Clock size={18} aria-hidden="true" />
            {duration.formatRange(route.durationMinutesMin, route.durationMinutesMax)}
          </span>
          <span><ShieldCheck size={18} aria-hidden="true" /> {labels.zeroDepositBadge.replace(/^✓\s*/, '')}</span>
          <span><Calendar size={18} aria-hidden="true" /> {labels.verifiedLabel} {verifiedDate}</span>
        </div>
      </div>

      {/* 2. MAIN EXPERIENCE CONTAINER */}
      <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16">
        <p className={styles.highway}>
          <MapPin size={18} aria-hidden="true" />
          <span><strong>{labels.expresswayLabel}</strong> {content.highwayNote}</span>
        </p>
        {/* INTERACTIVE COMPONENT (AIRPORT OR INTERCITY) */}
        {minPriceSAR !== undefined && isAirportRoute ? (
          <AirportTransferExperience
            locale={locale}
            slug={slug}
            minPriceSAR={minPriceSAR}
            rates={routeRates}
          />
        ) : minPriceSAR !== undefined && isIntercityRoute ? (
          <IntercityRouteExperience
            locale={locale}
            slug={slug}
            minPriceSAR={minPriceSAR}
            rates={routeRates}
          />
        ) : null}

        {/* 3. EXECUTIVE INCLUSIONS & LUXURY AMENITIES */}
        <section className="bg-surface rounded-3xl p-6 sm:p-10 border border-border shadow-xl mb-12">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
                {labels.inclusionsHeading}
              </h2>
            </div>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4" />
              <span>{labels.zeroDepositBadge}</span>
            </span>
          </div>

          <p className="text-sm sm:text-base text-ink-muted font-light leading-relaxed mb-8 max-w-4xl">
            {content.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {content.inclusions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-bg-alt border border-border hover:border-[#D4AF37]/30 transition-colors flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm text-ink font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. VERIFIED ROUTE FAQS */}
        {content.faqs && content.faqs.length > 0 && (
          <section className="bg-surface rounded-3xl p-6 sm:p-10 border border-border shadow-xl mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-bg-alt border border-border text-[#D4AF37] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-ink">
                {labels.faqHeading}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted mb-8 font-light">
              {labels.faqSubtitle}
            </p>

            <div className="space-y-4">
              {content.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-bg-alt border border-border hover:border-[#D4AF37]/30 transition-colors space-y-2"
                >
                  <h3 className="font-bold text-sm sm:text-base text-ink leading-snug flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted font-light leading-relaxed pl-3.5 rtl:pl-0 rtl:pr-3.5">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. CONTEXTUAL INTERNAL LINKS */}
        {contextualLinks && contextualLinks.length > 0 && (
          <section className="bg-surface rounded-3xl p-6 sm:p-10 border border-border shadow-xl mb-12">
            <h2 className="font-display font-black text-xl sm:text-2xl text-ink mb-2">
              {isAr ? 'خدمات، أسطول وأدلة مرتبطة بهذا المسار' : 'Related Vehicles, Guides & Sacred Ziyarat'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mb-6 font-light">
              {isAr
                ? 'استكشف المركبات المعتمدة لهذا المسار، وأدلة الوصول للمطارات وجولات المزارات:'
                : 'Explore dedicated vehicles, terminal arrival guides, and sacred historical ziyarat tours:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {contextualLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="p-4 rounded-2xl bg-bg-alt border border-border hover:border-[#D4AF37]/50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-bold">
                      {link.badge}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-ink group-hover:text-[#D4AF37] transition-colors">
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
            <h2 className="font-display font-black text-xl sm:text-2xl text-ink mb-6">
              {labels.relatedHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {route.relatedRouteIds.map((relId) => {
                const relRoute = ROUTES_COMPREHENSIVE_DATA[relId];
                if (!relRoute) return null;
                if (relId === 'riyadh-airport-transfer') return null;
                const related = getLocalizedRouteContent(relId, locale, relRoute);
                const relRates = liveRates[relId] || {};
                const relAvailable = Object.values(relRates).filter(
                  (fare): fare is number => typeof fare === 'number' && Number.isFinite(fare) && fare > 0
                );
                const relMin = relAvailable.length ? Math.min(...relAvailable) : null;

                return (
                  <Link
                    key={relId}
                    href={`/${locale}/routes/${relId}`}
                    className="p-6 rounded-3xl bg-surface border border-border hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl group flex flex-col justify-between hover:-translate-y-1"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
                        {distance.format(relRoute.distanceKm)}
                      </span>
                      <h3 className="font-display font-extrabold text-base text-ink group-hover:text-[#D4AF37] transition-colors line-clamp-2 mb-2">
                        {related.h1}
                      </h3>
                      <p className="text-xs text-ink-muted font-light line-clamp-2 mb-4">
                        {related.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                      <span className="font-black text-[#D4AF37] text-sm">
                        {relMin !== null ? fares.format(relMin) : null}
                      </span>
                      <span className="text-ink flex items-center gap-1 font-bold group-hover:text-[#D4AF37] transition-colors">
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
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
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
                className="h-12 sm:h-13 px-6 rounded-xl bg-surface hover:bg-bg-alt text-ink font-semibold text-xs border border-border hover:border-white/30 transition-all flex items-center"
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
