import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
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
} from 'lucide-react';
import { getDbPricesCached } from '@/lib/pricing-db';
import { ROUTES_COMPREHENSIVE_DATA, RouteData } from '@/data/routes-data';
import { RoutePageJsonLd } from '@/components/seo/JsonLd';

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

  const isAr = locale === 'ar';
  const title = isAr ? route.titleAr : route.titleEn;
  const desc = isAr ? route.descriptionAr.slice(0, 160) : route.descriptionEn.slice(0, 160);

  return {
    title: `${title} | Duyuf Alrahman VIP`,
    description: desc,
    alternates: getLocalizedAlternates(locale, `/routes/${slug}`),
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${locale}/routes/${slug}`,
      siteName: 'Duyuf Alrahman VIP',
      type: 'website',
    },
  };
}

const VEHICLE_META: Record<
  string,
  { nameEn: string; nameAr: string; pax: number; bags: number; descEn: string; descAr: string }
> = {
  camry: {
    nameEn: 'Toyota Camry Executive',
    nameAr: 'تويوتا كامري تنفيذية',
    pax: 4,
    bags: 3,
    descEn: 'Quiet sedan for couples or solo travelers with standard luggage',
    descAr: 'سيدان هادئة ومريحة للأزواج والمسافرين الأفراد مع حقائب قياسية',
  },
  staria: {
    nameEn: 'Hyundai Staria VIP',
    nameAr: 'هيونداي ستاريا VIP',
    pax: 7,
    bags: 6,
    descEn: 'Executive family van with captain chairs and generous luggage volume',
    descAr: 'فان عائلي فاخر بمقاعد كابتن ومساحة ممتازة للحقائب',
  },
  yukon: {
    nameEn: 'GMC Yukon XL VIP',
    nameAr: 'جي إم سي يوكون XL الفاخرة',
    pax: 7,
    bags: 8,
    descEn: 'Presidential luxury SUV with acoustic insulation and massive cargo bay',
    descAr: 'دفع رباعي رئاسي فاخر بعزل صوتي فائق وصندوق أمتعة عملاق',
  },
  hiace: {
    nameEn: 'Toyota HiAce VIP Minibus',
    nameAr: 'تويوتا هايس ميني باص',
    pax: 10,
    bags: 10,
    descEn: 'High-roof group minibus keeping extended families together comfortably',
    descAr: 'ميني باص سقف عالي يجمع العائلات الكبيرة معاً بكل راحة',
  },
  coaster: {
    nameEn: 'Toyota Coaster VIP Coach',
    nameAr: 'تويوتا كوستر VIP حافلة خاصة',
    pax: 21,
    bags: 20,
    descEn: 'VIP private coach with overhead AC and huge cargo hold for large groups',
    descAr: 'حافلة خاصة فاخرة بتكييف مركزي ومستودع أمتعة ضخم للأفواج الكبيرة',
  },
};

export default async function RouteDetailPage(props: RouteDetailPageProps) {
  const { locale, slug } = await props.params;
  const isAr = locale === 'ar';
  const dict = getDictionary(locale);
  const route: RouteData | undefined = ROUTES_COMPREHENSIVE_DATA[slug];

  if (!route) {
    notFound();
  }

  const dbRates = await getDbPricesCached();
  const routeRates = dbRates[slug] || {};

  const minPriceSAR = Math.min(
    ...Object.values(routeRates).filter((v) => typeof v === 'number' && v > 0),
    200
  );

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
      {/* Schema.org Structured Data */}
      <RoutePageJsonLd route={route} locale={locale} minPriceSAR={minPriceSAR} />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-ink-muted mb-6 flex-wrap"
        >
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span className="opacity-40">/</span>
          <Link href={`/${locale}/routes`} className="hover:text-gold-dark transition-colors">
            {isAr ? 'المسارات' : 'Routes'}
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-ink font-semibold truncate max-w-[280px] sm:max-w-none">
            {isAr ? route.titleAr : route.titleEn}
          </span>
        </nav>

        {/* HERO HEADER */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>{isAr ? `${route.distanceKm} كم` : `${route.distanceKm} km`}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-xs font-semibold text-ink-muted">
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              <span>
                {isAr
                  ? `${route.durationMinutesMin} - ${route.durationMinutesMax} دقيقة تقريباً`
                  : `~${route.durationMinutesMin} - ${route.durationMinutesMax} mins`}
              </span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-bg-alt border border-border text-[11px] text-ink-muted">
              <Calendar className="w-3 h-3 text-gold-dark" />
              <span>
                {isAr ? `آخر تدقيق: ${route.lastUpdated}` : `Verified: ${route.lastUpdated}`}
              </span>
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink mb-3 tracking-tight">
            {isAr ? route.titleAr : route.titleEn}
          </h1>
          <p className="text-base sm:text-lg text-ink-muted font-light leading-relaxed max-w-3xl">
            {isAr ? route.subtitleAr : route.subtitleEn}
          </p>

          {/* HIGHWAY & VERIFIED AUTHORITY NOTE */}
          <div className="mt-4 p-3.5 rounded-xl bg-surface border border-border/80 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 text-ink">
              <ShieldCheck className="w-4 h-4 text-gold-dark shrink-0" />
              <span className="font-medium">
                {isAr ? 'المسار السريع المعتمد:' : 'Designated Expressway:'}{' '}
                <strong className="font-semibold text-ink">
                  {isAr ? route.highwayAr : route.highway}
                </strong>
              </span>
            </div>
            <div className="text-[11px] text-ink-muted">
              {isAr ? 'المرجع الرسمي:' : 'Authority Source:'}{' '}
              <span className="text-ink font-medium">
                {isAr ? route.verifiedSourceAr : route.verifiedSource}
              </span>
            </div>
          </div>
        </header>

        {/* OVERVIEW & INCLUSIONS */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs mb-8">
          <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-3">
            {isAr ? 'نظرة عامة على الخدمة' : 'Service & Route Overview'}
          </h2>
          <p className="text-sm md:text-base text-body leading-relaxed mb-6 font-light">
            {isAr ? route.descriptionAr : route.descriptionEn}
          </p>

          <h3 className="font-display font-bold text-base md:text-lg text-ink mb-3">
            {isAr ? 'المزايا المشمولة في هذا المسار' : 'What is Included on this Route'}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-body">
            {(isAr ? route.highlightsAr : route.highlightsEn).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* TERMINAL-BY-TERMINAL PICKUP NOTES (Phase 4.1 Requirement) */}
        {route.terminalNotes && route.terminalNotes.length > 0 && (
          <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Plane className="w-5 h-5 text-gold-dark" />
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {isAr ? 'إرشادات الاستقبال في الصالات والمحطات' : 'Terminal-by-Terminal Pickup Points'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted mb-6 font-light">
              {isAr
                ? 'إرشادات دقيقة للقاء السائق بعد الخروج من الجوازات والتفتيش الجمركي مباشرة:'
                : 'Accurate step-by-step meeting points to find your chauffeur directly after baggage claim:'}
            </p>

            <div className="space-y-4">
              {route.terminalNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-bg-alt border border-border/80 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <h3 className="font-display font-bold text-base text-ink">
                      {isAr ? note.terminalAr : note.terminal}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark text-[11px] font-bold">
                      {isAr ? 'نقطة الالتقاء' : 'Meeting Spot'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-ink font-semibold mb-2">
                    📍 {isAr ? note.meetingPointAr : note.meetingPoint}
                  </p>

                  <p className="text-xs sm:text-sm text-body leading-relaxed mb-3 font-light">
                    {isAr ? note.pickupInstructionsAr : note.pickupInstructions}
                  </p>

                  <div className="text-[11px] text-ink-muted flex items-center gap-1.5 pt-2 border-t border-border/60">
                    <strong className="text-gold-dark">
                      {isAr ? 'علامة مميزة:' : 'Landmark:'}
                    </strong>
                    <span>{isAr ? note.landmarksAr : note.landmarks}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TRIP DISTANCE, ROADMAP & MILESTONES */}
        {route.milestones && route.milestones.length > 0 && (
          <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs mb-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-2">
              {isAr ? 'المسار الزمني ومحطات التوقف النموذجية' : 'Highway Roadmap & Travel Milestones'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mb-6 font-light">
              {isAr
                ? 'المسافة الإجمالية ونقاط الطريق والاستراحات النموذجية المكيفة للصلاة والراحة:'
                : 'Travel stages and designated clean service plazas along the route:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {route.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-bg-alt border border-border relative overflow-hidden"
                >
                  <span className="absolute top-2 right-2 rtl:right-auto rtl:left-2 text-2xl font-black text-ink-muted/15 select-none pointer-events-none">
                    0{idx + 1}
                  </span>
                  <span className="block text-xs font-bold text-gold-dark uppercase tracking-wider mb-1">
                    {isAr ? `المحطة ${idx + 1}` : `Stage ${idx + 1}`}
                  </span>
                  <h3 className="font-semibold text-sm text-ink mb-1.5">
                    {isAr ? m.titleAr : m.title}
                  </h3>
                  <p className="text-xs text-body font-light leading-relaxed">
                    {isAr ? m.descAr : m.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DYNAMIC PRICE TABLE FOR ALL 5 VEHICLES (FROM SUPABASE) */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {isAr ? 'الأسعار الثابتة لكافة فئات الأسطول' : 'Guaranteed Fixed Rates by Vehicle'}
              </h2>
              <p className="text-xs text-ink-muted mt-1 font-light">
                {isAr
                  ? 'أسعار مباشرة من قاعدة البيانات، شاملة الوقود ورسوم الطرق وضريبة القيمة المضافة:'
                  : 'Live database prices including all fuel, highway tolls, and VAT with zero surge fees:'}
              </p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              {isAr ? '✓ بدون دفع مسبق' : '✓ Zero Upfront Deposit'}
            </span>
          </div>

          <div className="divide-y divide-border">
            {Object.entries(VEHICLE_META).map(([vKey, meta]) => {
              const priceSAR = routeRates[vKey] || 0;
              const displayPrice = priceSAR > 0 ? priceSAR : 'Quote';

              return (
                <div
                  key={vKey}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gold-soft/10 px-3 rounded-xl transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-gold-dark shrink-0" />
                      <span className="font-display font-bold text-base text-ink">
                        {isAr ? meta.nameAr : meta.nameEn}
                      </span>
                    </div>
                    <p className="text-xs text-body font-light">
                      {isAr ? meta.descAr : meta.descEn}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-ink-muted">
                      <span>{isAr ? `حتى ${meta.pax} ركاب` : `Up to ${meta.pax} Pax`}</span>
                      <span>•</span>
                      <span>{isAr ? `حتى ${meta.bags} حقائب` : `Up to ${meta.bags} Bags`}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-start sm:text-end">
                      <span className="text-[10px] uppercase tracking-wider text-ink-muted block font-semibold">
                        {isAr ? 'السعر الثابت' : 'Fixed Fare'}
                      </span>
                      <span className="font-display font-bold text-xl text-ink">
                        {typeof displayPrice === 'number'
                          ? isAr
                            ? `${displayPrice} ر.س`
                            : `SAR ${displayPrice}`
                          : displayPrice}
                      </span>
                    </div>

                    <Link
                      href={`/${locale}/booking?route=${slug}&vehicle=${vKey}`}
                      className="h-10 px-5 rounded-btn bg-gold text-ink text-xs font-bold uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center shrink-0"
                    >
                      {isAr ? 'احجز الآن' : 'Book'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5 VERIFIED ROUTE FAQS (Phase 4.1 & 4.2 Requirement) */}
        {route.faqs && route.faqs.length > 0 && (
          <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs mb-8">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-gold-dark" />
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {isAr
                  ? 'الأسئلة الشائعة حول هذا المسار'
                  : 'Frequently Asked Questions about this Route'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted mb-6 font-light">
              {isAr
                ? 'إجابات موثقة ومطابقة لتوجيهات الطيران المدني ووزارة الحج والعمرة:'
                : 'Verified operational and transit answers addressing common pilgrim questions:'}
            </p>

            <div className="space-y-4">
              {route.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-bg-alt border border-border/80 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-sm sm:text-base text-ink leading-snug">
                      {isAr ? faq.questionAr : faq.question}
                    </h3>
                    {faq.needsConfirmation && (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-bold shrink-0"
                        title={
                          isAr
                            ? 'سياسة تشغيلية معتمدة تحت تأكيد المالك'
                            : 'Operational policy subject to owner confirmation'
                        }
                      >
                        <AlertCircle className="w-3 h-3" />
                        <span>{isAr ? 'تأكيد تشغيلي' : 'Needs Confirmation'}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-body font-light leading-relaxed">
                    {isAr ? faq.answerAr : faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RELATED COMPLEMENTARY ROUTES (Phase 4.1 Requirement) */}
        {route.relatedRouteIds && route.relatedRouteIds.length > 0 && (
          <section className="mb-10">
            <h2 className="font-display font-bold text-xl text-ink mb-4">
              {isAr ? 'مسارات رحلات مرتبطة ومكملة' : 'Related Pilgrimage Routes'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    className="p-5 rounded-2xl bg-surface border border-border hover:border-gold/50 transition-all shadow-xs group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                        {isAr ? `${relRoute.distanceKm} كم` : `${relRoute.distanceKm} km`}
                      </span>
                      <h3 className="font-display font-bold text-base text-ink group-hover:text-gold-dark transition-colors line-clamp-2 mb-2">
                        {isAr ? relRoute.titleAr : relRoute.titleEn}
                      </h3>
                      <p className="text-xs text-ink-muted font-light line-clamp-2 mb-4">
                        {isAr ? relRoute.subtitleAr : relRoute.subtitleEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">
                        {isAr ? `من ${relMin} ر.س` : `From SAR ${relMin}`}
                      </span>
                      <span className="text-gold-dark flex items-center gap-1 font-bold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                        <span>{isAr ? 'تفاصيل' : 'View'}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* BOTTOM FINAL CALL TO ACTION */}
        <div className="bg-gradient-to-br from-navy via-navy-light to-navy rounded-3xl p-8 md:p-12 border border-gold/30 text-white text-center shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase tracking-wider border border-gold/40">
              {isAr ? 'حجز فوري ومؤكد' : 'Direct Chauffeur Dispatch'}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
              {isAr ? 'جاهز لحجز رحلتك الخاصة الآن؟' : 'Ready to Reserve Your Chauffeur?'}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              {isAr
                ? 'أسعار ثابتة، سيارات نظيفة ومعقمة، وسائقون خبراء معتمدون بخدمتكم على مدار 24 ساعة بدون دفع مسبق.'
                : 'Guaranteed fixed fares, pristine air-conditioned vehicles, and professional chauffeurs ready 24/7 with zero advance deposit.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${locale}/booking?route=${slug}`}
                className="h-12 px-8 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-gold flex items-center gap-2"
              >
                <span>{isAr ? 'احجز هذا المسار الآن' : 'Book This Route Now'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <Link
                href={`/${locale}/routes`}
                className="h-12 px-6 rounded-btn bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center"
              >
                {isAr ? 'تصفح كافة المسارات' : 'View All Routes'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
