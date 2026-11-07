import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { RouteBasedPricingExperience } from '@/components/pricing/RouteBasedPricingExperience';
import { InteractivePricingView } from '@/components/pricing/InteractivePricingView';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getMergedSiteSettings } from '@/lib/dynamic-settings-store';
import { PRICING_PAGE_CONTENT } from '@/data/pricing-page-content';
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

  const packages = [
    {
      id: 'mercedes-s-class',
      name: isAr ? 'مرسيدس الفئة S' : 'Mercedes S-Class',
      category: isAr ? 'سيدان فاخرة' : 'Luxury Sedan',
      image: '/assets/images/studio-2k/mercedes-s-class-studio-2k.webp',
      passengers: 3,
      bags: 3,
      priceSar: 200,
      isPopular: false,
    },
    {
      id: 'hyundai-staria',
      name: isAr ? 'هيونداي ستاريا VIP' : 'Hyundai Staria',
      category: isAr ? 'فان عائلي فاخر' : 'Luxury Family Van',
      image: '/assets/images/studio-2k/hyundai-staria-studio-2k.webp',
      passengers: 6,
      bags: 6,
      priceSar: 260,
      isPopular: true,
      popularLabel: isAr ? 'الأكثر طلباً' : 'Most Popular',
    },
    {
      id: 'toyota-camry',
      name: isAr ? 'تويوتا كامري' : 'Toyota Camry',
      category: isAr ? 'سيدان تنفيذية' : 'Executive Sedan',
      image: '/assets/images/studio-2k/toyota-camry-studio-2k.webp',
      passengers: 3,
      bags: 6,
      priceSar: 200,
      isPopular: false,
    },
    {
      id: 'gmc-yukon-xl',
      name: isAr ? 'جمس يوكن XL' : 'GMC Yukon XL',
      category: isAr ? 'دفع رباعي فاخر' : 'Premium SUV',
      image: '/assets/images/studio-2k/gmc-yukon-studio-2k.webp',
      passengers: 3,
      bags: 6,
      priceSar: 380,
      isPopular: false,
    },
    {
      id: 'hiace-van',
      name: isAr ? 'تويوتا هايس فان' : 'Hiace Van',
      category: isAr ? 'فان مجموعات' : 'Group Van',
      image: '/assets/images/studio-2k/toyota-hiace-studio-2k.webp',
      passengers: 9,
      bags: 12,
      priceSar: 360,
      isPopular: false,
    },
  ];

  const popularRoutes = [
    {
      origin: isAr ? 'مطار جدة' : 'Jeddah Airport',
      dest: isAr ? 'مكة المكرمة' : 'Makkah',
      camry: 200,
      sclass: 200,
      staria: 260,
      yukon: 380,
    },
    {
      origin: isAr ? 'مكة المكرمة' : 'Makkah',
      dest: isAr ? 'المدينة المنورة' : 'Madinah',
      camry: 400,
      sclass: 400,
      staria: 460,
      yukon: 580,
    },
    {
      origin: isAr ? 'مطار المدينة' : 'Madinah Airport',
      dest: isAr ? 'فندق المدينة' : 'Hotel',
      camry: 200,
      sclass: 200,
      staria: 260,
      yukon: 360,
    },
    {
      origin: isAr ? 'جدة' : 'Jeddah',
      dest: isAr ? 'المدينة المنورة' : 'Madinah',
      camry: 500,
      sclass: 500,
      staria: 560,
      yukon: 680,
    },
  ];

  const whyChooseBadges = [
    {
      icon: <Plane className="w-5 h-5 text-[#D6A13A]" />,
      title: isAr ? 'دقة بالمواعيد' : 'On-Time Service',
    },
    {
      icon: <Shield className="w-5 h-5 text-[#D6A13A]" />,
      title: isAr ? 'نقل آمن وموثوق' : 'Safe & Reliable Transportation',
    },
    {
      icon: <Car className="w-5 h-5 text-[#D6A13A]" />,
      title: isAr ? 'أسطول فاخر حديث' : 'Premium Fleet',
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#D6A13A]" />,
      title: isAr ? 'دعم عملاء 24/7' : '24/7 Customer Support',
    },
    {
      icon: <Handshake className="w-5 h-5 text-[#D6A13A]" />,
      title: isAr ? 'أسعار تنافسية وثابتة' : 'Competitive Prices',
    },
  ];

  return (
    <div className="bg-[#090D15] min-h-screen text-start text-[#F6F3ED] w-full max-w-full overflow-x-clip" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          1. MASTER HERO: OUR PRICES & PACKAGES
          Shared between mobile & desktop, deep royal navy aesthetic
      ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-10 sm:pt-14 pb-12 sm:pb-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/cinematic/home/hero-mercedes-kaaba-retina.jpg"
            alt="Duyuf Al Rahman VIP Fleet"
            fill
            priority
            className="object-cover object-center opacity-40 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D15] via-[#090D15]/80 to-[#090D15]/95" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#AEB7C4] mb-6">
            <Link href={`/${locale}`} className="hover:text-[#D6A13A] transition-colors">
              {dict.nav.home}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-[#D6A13A]" />
            <span className="text-[#D6A13A] font-semibold">{dict.nav.pricing}</span>
          </nav>

          {/* Heading with gold ampersand */}
          <div className="max-w-3xl mb-8">
            <h1 className="font-playfair font-serif text-3xl sm:text-5xl md:text-6xl text-[#F6F3ED] font-bold tracking-tight leading-[1.15] mb-4">
              {isAr ? (
                <>أسعارنا <span className="text-[#D6A13A] font-light">&amp;</span> باقاتنا الفاخرة</>
              ) : (
                <>Our Prices <span className="text-[#D6A13A] font-light">&amp;</span> Packages</>
              )}
            </h1>
            <p className="text-sm sm:text-lg text-[#AEB7C4] font-light leading-relaxed">
              {isAr
                ? 'خدمات نقل فاخرة بأسعار تنافسية ومحددة عبر جميع مدن المملكة العربية السعودية'
                : 'Premium transportation at competitive prices across Saudi Arabia'}
            </p>
          </div>

          {/* 3 Circular Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-10 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D6A13A]/50 bg-[#141D2C] flex items-center justify-center text-[#D6A13A] shadow-md shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#F6F3ED]">
                {content.trustSafeReliable || (isAr ? 'نقل آمن وموثوق' : 'Safe & Reliable Transportation')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D6A13A]/50 bg-[#141D2C] flex items-center justify-center text-[#D6A13A] shadow-md shrink-0">
                <Diamond className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#F6F3ED]">
                {content.trustPremiumFleet || (isAr ? 'أسطول سيارات فاخر' : 'Premium Fleet')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D6A13A]/50 bg-[#141D2C] flex items-center justify-center text-[#D6A13A] shadow-md shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#F6F3ED]">
                {content.trustSupport247 || (isAr ? 'دعم عملاء 24/7' : '24/7 Customer Support')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE MASTER EXPERIENCE (< 768px): Reference B 10-Section Vertical Composition
      ────────────────────────────────────────────────────────────── */}
      <div className="md:hidden">
        <InteractivePricingView
          locale={locale}
          dict={dict}
          content={content}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          DESKTOP MASTER EXPERIENCE (≥ 768px): The Master Desktop Showroom Design
          5-column showroom tier with glowing Staria VIP,
          Routes & Prices matrix table with side confidence card,
          Why Choose ribbon, and master bottom CTA banner.
      ────────────────────────────────────────────────────────────── */}
      <div className="hidden md:block">
        {/* Gold Ribbon Divider */}
        <div className="gold-ribbon-divider">
          <div className="gold-ribbon-curve" />
        </div>

        {/* 2. SECTION: OUR PACKAGES (5 MASTER VEHICLE CARDS)
            Hyundai Staria highlighted with glowing border and Most Popular badge */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center max-w-xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D6A13A]" />
                <h2 className="font-playfair font-serif text-3xl font-bold text-[#F6F3ED]">
                  {isAr ? 'باقاتنا الفاخرة' : 'Our Packages'}
                </h2>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D6A13A]" />
              </div>
              <p className="text-sm text-[#AEB7C4]">
                {isAr ? 'اختر الخيار الأمثل لرحلتك الميمونة' : 'Choose the perfect option for your journey'}
              </p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`master-package-card ${pkg.isPopular ? 'is-popular' : ''}`}
                >
                  {pkg.isPopular && pkg.popularLabel && (
                    <span className="popular-badge-pill">{pkg.popularLabel}</span>
                  )}

                  <div className="package-car-img">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-500"
                      sizes="20vw"
                    />
                  </div>

                  <h3 className="package-car-title">{pkg.name}</h3>

                  <div className="package-specs-row">
                    <div className="package-specs-item">
                      <Users className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{pkg.passengers} {isAr ? 'ركاب' : 'Passengers'}</span>
                    </div>
                    <div className="package-specs-item">
                      <Luggage className="w-3.5 h-3.5 text-[#D6A13A]" />
                      <span>{pkg.bags} {isAr ? 'حقائب' : 'Bags'}</span>
                    </div>
                  </div>

                  <div className="package-price-wrap">
                    <span className="package-price-val">{pkg.priceSar} {isAr ? 'ر.س' : 'SAR'}</span>
                  </div>

                  <Link
                    href={`/${locale}/booking?vehicle=${pkg.id}`}
                    className="package-cta-btn"
                  >
                    <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SECTION: ROUTES & PRICES (MATRIX TABLE & SIDE CARD) */}
        <section className="py-10 border-t border-b border-white/10 bg-[#0A0E18]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-playfair font-serif text-3xl font-bold text-[#F6F3ED] mb-1.5">
                  {isAr ? 'المسارات والأسعار' : 'Routes & Prices'}
                </h2>
                <p className="text-sm text-[#AEB7C4]">
                  {isAr ? 'أسعار شفافة ومحددة لراحة بالك واطمئنانك' : 'Transparent pricing for your peace of mind'}
                </p>
              </div>

              {/* Toggle Pills */}
              <div className="inline-flex items-center p-1 rounded-full bg-[#101725] border border-white/10">
                <button
                  type="button"
                  className="px-5 py-1.5 rounded-full text-xs font-bold bg-[#D6A13A] text-[#090D15] shadow-sm transition-all"
                >
                  {isAr ? 'ذهاب فقط' : 'One Way'}
                </button>
                <button
                  type="button"
                  className="px-5 py-1.5 rounded-full text-xs font-bold text-[#AEB7C4] hover:text-[#F6F3ED] transition-all"
                >
                  {isAr ? 'ذهاب وعودة' : 'Round Trip'}
                </button>
              </div>
            </div>

            <div className="pricing-matrix-layout">
              {/* Left: Luxury Matrix Table */}
              <div className="luxury-matrix-table-wrap">
                <div className="matrix-header-row">
                  <div>{isAr ? 'المسار' : 'Route'}</div>
                  <div>Sedan (Camry)</div>
                  <div>Luxury (S-Class)</div>
                  <div>Van (Staria)</div>
                  <div>Premium SUV</div>
                </div>

                {popularRoutes.map((rt, idx) => (
                  <div key={idx} className="matrix-data-row">
                    <div className="matrix-route-cell">
                      <MapPin className="w-3.5 h-3.5 text-[#D6A13A] shrink-0" />
                      <span>{rt.origin} &rarr; {rt.dest}</span>
                    </div>
                    <div className="matrix-price-cell">
                      <span className="text-[11px] text-[#AEB7C4] inline font-normal">{isAr ? 'من ' : 'From '}</span>
                      {rt.camry} {isAr ? 'ر.س' : 'SAR'}
                    </div>
                    <div className="matrix-price-cell">
                      <span className="text-[11px] text-[#AEB7C4] inline font-normal">{isAr ? 'من ' : 'From '}</span>
                      {rt.sclass} {isAr ? 'ر.س' : 'SAR'}
                    </div>
                    <div className="matrix-price-cell">
                      <span className="text-[11px] text-[#AEB7C4] inline font-normal">{isAr ? 'من ' : 'From '}</span>
                      {rt.staria} {isAr ? 'ر.س' : 'SAR'}
                    </div>
                    <div className="matrix-price-cell">
                      <span className="text-[11px] text-[#AEB7C4] inline font-normal">{isAr ? 'من ' : 'From '}</span>
                      {rt.yukon} {isAr ? 'ر.س' : 'SAR'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Confidence Promo Card */}
              <div className="matrix-side-card">
                <div className="matrix-side-card-img">
                  <Image
                    src="/assets/images/cinematic/services/services-suv-retina.jpg"
                    alt="Travel with Confidence"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101725] via-transparent to-transparent" />
                </div>
                <div className="matrix-side-card-content">
                  <h3>
                    {isAr ? <>سافر بكل <span>ثقة واطمئنان</span></> : <>Travel with <span>Confidence</span></>}
                  </h3>
                  <p>
                    {isAr ? 'راحة فاخرة، موثوقية عالية، والتزام تام بالمواعيد.' : 'Comfortable. Reliable. On Time.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SECTION: WHY CHOOSE DUYUF AL RAHMAN VIP? (5 BADGES) */}
        <section className="py-14">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D6A13A]" />
                <h2 className="font-playfair font-serif text-3xl font-bold text-[#F6F3ED]">
                  {isAr ? 'لماذا تختار ضيوف الرحمن VIP؟' : 'Why Choose Duyuf Al Rahman VIP?'}
                </h2>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D6A13A]" />
              </div>
            </div>

            <div className="why-choose-ribbon">
              {whyChooseBadges.map((badge, idx) => (
                <div key={idx} className="why-badge-item">
                  <div className="why-badge-circle">
                    {badge.icon}
                  </div>
                  <span className="why-badge-title">{badge.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. MASTER BOTTOM CTA */}
        <section className="master-bottom-cta-banner">
          <div className="gold-ribbon-divider mb-8">
            <div className="gold-ribbon-curve" />
          </div>

          <Link
            href={`/${locale}/booking`}
            className="master-bottom-cta-btn"
          >
            <span>{isAr ? 'احجز رحلتك اليوم' : 'Book Your Journey Today'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
          <span className="master-bottom-cta-sub">
            {isAr ? 'راحتك وسلامتك هي أولويتنا القصوى' : 'Your comfort is our priority'}
          </span>
        </section>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. DETAILED INTERACTIVE ROUTE & FARE CALCULATOR
      ────────────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 border-t border-white/10 bg-[#090D15]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <details className="group md:open" open>
            <summary className="md:hidden flex items-center justify-between p-4 rounded-xl bg-[#101725] border border-white/10 cursor-pointer list-none mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D6A13A]" />
                <span className="text-xs font-bold text-[#F6F3ED]">
                  {isAr ? 'حاسبة وتفاصيل جميع المسارات المخصصة' : 'All Custom Routes & Detailed Fares'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D6A13A] transition-transform group-open:rotate-90" />
            </summary>

            <div className="hidden md:block mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141D2C] border border-[#D6A13A]/40 text-xs font-bold text-[#D6A13A] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'حاسبة وتفاصيل جميع المسارات' : 'All Routes & Interactive Fares'}</span>
              </div>
              <h2 className="font-playfair font-serif text-2xl sm:text-3xl text-[#F6F3ED] font-bold">
                {isAr ? 'تصفح كافة المسارات والسيارات حسب طلبك' : 'Browse All Custom Routes & Vehicles'}
              </h2>
            </div>

            <div className="mt-2">
              <RouteBasedPricingExperience
                locale={locale}
                dict={dict}
                initialRates={initialRates}
                taifEnabled={settings.taif_enabled !== false}
                riyadhEnabled={settings.riyadh_enabled !== false}
              />
            </div>
          </details>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. STICKY MOBILE CONVERSION BAR
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-[#101725]/95 backdrop-blur-xl border-t border-white/10 md:hidden flex items-center justify-between gap-3 shadow-2xl">
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
