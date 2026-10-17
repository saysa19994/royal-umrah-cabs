import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ZIYARAT_SITES, ZIYARAT_TOURS, ZIYARAT_GUIDES } from '@/data/ziyarat';
import { MapPin, Clock, ShieldCheck, Check, ArrowRight, MessageCircle, Star, Compass, Car } from 'lucide-react';

interface ZiyaratHubPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({
  params: { locale },
}: ZiyaratHubPageProps): Promise<Metadata> {
  const isAr = locale === 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';
  return {
    title: isAr
      ? 'جولات مزارات مكة والمدينة بسيارة خاصة وسائق'
      : 'Private Ziyarat Tours Makkah & Madinah with Chauffeur',
    description: isAr
      ? 'احجز جولة مزارات خاصة في مكة المكرمة والمدينة المنورة بسيارة مكيفة وسائق مخصص. غار حراء، ثور، قباء، وأحد بأسعار ثابتة شاملة الانتظار.'
      : 'Book private car Ziyarat tours in Makkah & Madinah with professional chauffeurs. Cave Hira, Mount Thawr, Masjid Quba, & Mount Uhud with fixed fares.',
    alternates: {
      canonical: `${baseUrl}/${locale}/ziyarat`,
    },
  };
}

export default function ZiyaratHubPage({ params: { locale } }: ZiyaratHubPageProps) {
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const sitesList = Object.values(ZIYARAT_SITES);
  const toursList = Object.values(ZIYARAT_TOURS);
  const guidesList = Object.values(ZIYARAT_GUIDES);

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 max-w-6xl mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{isAr ? 'رحلات المعالم الإسلامية المقدسة' : 'Sacred Prophetic Geography'}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl lg:text-6xl text-ink tracking-tight leading-tight">
            {isAr ? (
              <>
                جولات مزارات مكة والمدينة{' '}
                <span className="text-gold-dark italic">بسيارة خاصة وسائق</span>
              </>
            ) : (
              <>
                Private Ziyarat Tours in{' '}
                <span className="text-gold-dark italic">Makkah &amp; Madinah</span>
              </>
            )}
          </h1>
          <p className="mt-4 text-ink-muted text-sm md:text-lg leading-relaxed font-light">
            {isAr
              ? 'استكشف مهبط الوحي ومواضع السيرة النبوية الشريفة بأقصى درجات السكينة والراحة مع عائلتك. سيارات حديثة ومكيفة، سائقون محترفون، وأسعار ثابتة شاملة ساعات الانتظار.'
              : 'Visit sacred Quranic sanctuaries, prophetic battlefields, and historic mosques in complete family comfort. Professional local chauffeurs, pre-cooled luxury vehicles, and guaranteed fixed pricing.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking?service=ziyarat`}
              className="h-12 px-8 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-ink text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold transition-all"
            >
              <Car className="w-4 h-4" />
              <span>{isAr ? 'احجز سيارة للمزارات الآن' : 'Book Private Ziyarat Car'}</span>
            </Link>
            <a
              href={`https://wa.me/966567588261?text=${encodeURIComponent(
                isAr
                  ? 'السلام عليكم، أود الاستفسار عن حجز سيارة خاصة لجولة المزارات في مكة / المدينة.'
                  : 'Hello, I would like to inquire about booking a private chauffeur for Ziyarat in Makkah / Madinah.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 rounded-btn border border-border-strong text-ink hover:text-gold-dark text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-whatsapp" />
              <span>{isAr ? 'استفسار عبر واتساب' : 'Inquire via WhatsApp'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. CITY HUBS SELECTION (MAKKAH & MADINAH) */}
      <section className="container mx-auto px-4 max-w-6xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Makkah City Hub Card */}
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 hover:border-gold transition-all shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-2">
                {isAr ? 'مكة المكرمة' : 'Makkah Al-Mukarramah'}
              </span>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">
                {isAr ? 'مزارات ومعالم مكة المكرمة' : 'Makkah Historical Sanctuary Sites'}
              </h2>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light mb-6">
                {isAr
                  ? 'غار حراء بجبل النور، جبل ثور، وصعيد عرفات، ومنى، ومزدلفة. جولات ميسرة بالسيارة المكيفة تناسب العائلات وكبار السن.'
                  : 'Cave Hira, Mount Thawr, Plains of Arafat, Mina, and Muzdalifah. Door-to-door hotel transport engineered for family ease.'}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-ink-light mb-6">
                <span className="px-2.5 py-1 rounded-md bg-bg-alt border border-border">غار حراء</span>
                <span className="px-2.5 py-1 rounded-md bg-bg-alt border border-border">جبل ثور</span>
                <span className="px-2.5 py-1 rounded-md bg-bg-alt border border-border">عرفات</span>
                <span className="px-2.5 py-1 rounded-md bg-bg-alt border border-border">منى ومزدلفة</span>
              </div>
            </div>
            <Link
              href={`/${locale}/ziyarat/makkah`}
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-dark hover:underline"
            >
              <span>{isAr ? 'عرض كافة مزارات مكة وجولاتها' : 'Explore All Makkah Sites & Tours'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          {/* Madinah City Hub Card */}
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 hover:border-gold transition-all shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-2">
                {isAr ? 'المدينة المنورة' : 'Madinah Al-Munawwarah'}
              </span>
              <h2 className="font-display font-bold text-2xl text-ink mb-3">
                {isAr ? 'مزارات ومساجد المدينة المنورة' : 'Madinah Prophetic Mosques & Heritage'}
              </h2>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light mb-6">
                {isAr
                  ? 'مسجد قباء والصلاة فيه، جبل أحد ومقبرة الشهداء، مسجد القبلتين، وموقع غزوة الخندق (المساجد السبعة)، ورحلات بدر التاريخية.'
                  : 'Masjid Quba, Mount Uhud and the Martyrs, Masjid al-Qiblatayn, Seven Mosques (Khandaq), and Badr full-day trips.'}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-ink-light mb-6">
                <span className="px-2.5 py-1 rounded-md bg-bg-alt border border-border">مسجد قباء</span>
                <span className="px-2.5 py-1 rounded-md bg-bg-alt border border-border">جبل أحد</span>
                <span className="px-2.5 py-1 rounded-md bg-bg-alt border border-border">القبلتين</span>
                <span className="px-2.5 py-1 rounded-md bg-bg-alt border border-border">غزوة بدر</span>
              </div>
            </div>
            <Link
              href={`/${locale}/ziyarat/madinah`}
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-dark hover:underline"
            >
              <span>{isAr ? 'عرض كافة مزارات المدينة وجولاتها' : 'Explore All Madinah Sites & Tours'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BOOKABLE TOURS (WITH FROM-PRICES PER VEHICLE) */}
      <section className="container mx-auto px-4 max-w-6xl mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-bold text-2xl md:text-4xl text-ink">
            {isAr ? 'جولات المزارات المعتمدة والأسعار' : 'Curated Private Ziyarat Tour Options'}
          </h2>
          <p className="text-xs md:text-sm text-ink-muted mt-2 font-light">
            {isAr
              ? 'الأسعار محددة للسيارة بالكامل وليست للشخص. شاملة كافة الرسوم والانتظار دون أي تكاليف خفية.'
              : 'Guaranteed fixed fares per vehicle (not per passenger). All waiting time, fuel, and tolls included.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toursList.map((t) => (
            <div
              key={t.slug}
              className="bg-surface rounded-2xl border border-border p-6 flex flex-col justify-between hover:border-gold transition-all shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                  {t.city === 'makkah' ? (isAr ? 'مكة المكرمة' : 'Makkah Tour') : (isAr ? 'المدينة المنورة' : 'Madinah Tour')}
                </span>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  {isAr ? t.titleAr : t.titleEn}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed font-light mb-4">
                  {isAr ? t.subtitleAr : t.subtitleEn}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-ink mb-4 font-medium">
                  <Clock className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{isAr ? t.durationAr : t.durationEn}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <span className="text-[11px] text-ink-muted block mb-0.5">
                  {isAr ? 'يبدأ السعر من (لكامل السيارة):' : 'From (per vehicle):'}
                </span>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-display font-bold text-xl text-ink">
                    {t.basePriceSAR.camry} SAR
                  </span>
                  <span className="text-[11px] text-whatsapp font-semibold">
                    {isAr ? 'سيدان حتى 4 ركاب' : 'Up to 4 Pax'}
                  </span>
                </div>
                <Link
                  href={`/${locale}/ziyarat/tours/${t.slug}`}
                  className="w-full h-10 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-ink text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{isAr ? 'تفاصيل الجولة والحجز' : 'View Tour & Book'}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ALL HISTORICAL SITES GRID */}
      <section className="container mx-auto px-4 max-w-6xl mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-bold text-2xl md:text-4xl text-ink">
            {isAr ? 'دليل المعالم والمواقع التاريخية' : 'Comprehensive Holy Site Directory'}
          </h2>
          <p className="text-xs md:text-sm text-ink-muted mt-2 font-light">
            {isAr
              ? 'معلومات موثقة، إحداثيات الوصول، نصائح المشي، وسهولة اصطحاب كبار السن لكل موقع.'
              : 'Answer-first guides, walking effort ratings, historical contexts, and private chauffeur access.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitesList.map((site) => (
            <div
              key={site.slug}
              className="bg-surface rounded-2xl border border-border p-6 hover:border-gold-line transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider">
                    {site.city === 'makkah' ? (isAr ? 'مكة المكرمة' : 'Makkah') : (isAr ? 'المدينة المنورة' : 'Madinah')}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-alt text-ink-muted">
                    {isAr ? site.walkingEffortAr : site.walkingEffortEn}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-ink mb-2">
                  {isAr ? site.titleAr : site.titleEn}
                </h3>
                <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed font-light mb-4">
                  {isAr ? site.answerFirstAr : site.answerFirstEn}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-ink-muted">
                  {isAr ? site.distanceFromHaramAr : site.distanceFromHaramEn}
                </span>
                <Link
                  href={`/${locale}/ziyarat/${site.city}/${site.slug}`}
                  className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1"
                >
                  <span>{isAr ? 'دليل الزيارة' : 'Site Guide'}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRACTICAL GUIDES */}
      <section className="container mx-auto px-4 max-w-6xl mb-16">
        <div className="bg-bg-alt rounded-2xl border border-border p-8">
          <h2 className="font-display font-bold text-2xl text-ink mb-6 text-center">
            {isAr ? 'أدلة وإرشادات تخطيط الزيارات' : 'Essential Pilgrim Ziyarat Guides'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guidesList.map((g) => (
              <Link
                key={g.slug}
                href={`/${locale}/ziyarat/guides/${g.slug}`}
                className="p-5 rounded-xl bg-surface border border-border hover:border-gold transition-all block group"
              >
                <span className="text-[10px] text-gold-dark font-semibold block mb-1">
                  {isAr ? 'دليل معتمد · تحديث 2026' : 'Verified Guide · 2026'}
                </span>
                <h3 className="font-display font-bold text-sm text-ink group-hover:text-gold-dark transition-colors mb-2">
                  {isAr ? g.titleAr : g.titleEn}
                </h3>
                <p className="text-xs text-ink-muted line-clamp-2 font-light">
                  {isAr ? g.summaryAr : g.summaryEn}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="container mx-auto px-4 max-w-5xl mb-16">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
            {isAr ? 'كيف تعمل خدمة الزيارات الخاصة معنا؟' : 'How Our Private Ziyarat Service Works'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-surface border border-border">
            <div className="w-10 h-10 rounded-full bg-gold/10 text-gold-dark font-bold font-display text-lg flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="font-display font-bold text-base text-ink mb-2">
              {isAr ? 'اختر المدينة أو الجولة' : 'Choose City or Tour'}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed font-light">
              {isAr
                ? 'حدد مكة أو المدينة، واختر جولة نصف يوم جاهزة أو حدد المواقع التي تفضل زيارتها.'
                : 'Select Makkah or Madinah, choose a curated half-day tour or build your custom stops.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <div className="w-10 h-10 rounded-full bg-gold/10 text-gold-dark font-bold font-display text-lg flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="font-display font-bold text-base text-ink mb-2">
              {isAr ? 'استقبال مباشر من باب الفندق' : 'Door-to-Door Hotel Pickup'}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed font-light">
              {isAr
                ? 'يلتقي بكم السائق في بهو الفندق بسيارة مكيفة مسبقاً مع مياه شرب باردة مجهزة.'
                : 'Your chauffeur greets you at your hotel lobby with a pre-cooled executive vehicle and bottled water.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border">
            <div className="w-10 h-10 rounded-full bg-gold/10 text-gold-dark font-bold font-display text-lg flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="font-display font-bold text-base text-ink mb-2">
              {isAr ? 'وقت انتظار مريح والدفع عند الوصول' : 'Unhurried Wait & Pay on Arrival'}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed font-light">
              {isAr
                ? 'ينتظركم السائق في كل موقع للصلاة والدعاء، وتسددون الأجرة عند العودة للفندق.'
                : 'Enjoy generous prayer time at each site. Pay your chauffeur directly upon safe return to your hotel.'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQS */}
      <section className="container mx-auto px-4 max-w-4xl mb-16">
        <h2 className="font-display font-bold text-2xl text-ink text-center mb-8">
          {isAr ? 'الأسئلة الشائعة حول جولات المزارات' : 'Frequently Asked Questions on Ziyarat'}
        </h2>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-surface border border-border">
            <h3 className="font-bold text-sm text-ink mb-2">
              {isAr ? 'هل يقدم السائق شرحاً تاريخياً وإرشاداً سياحياً مرخصاً؟' : 'Does the chauffeur act as a licensed tour guide?'}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed font-light">
              {isAr
                ? 'خدمتنا هي نقل خاص وتوصيل بسيارة وسائق مخصص لراحتكم اللوجستية والانتظار. سائقونا خبراء بالطرق والمواقع التاريخية ولكنهم ليسوا مرشدين سياحيين مرخصين. إذا كنت تبحث عن مرشد مرخص يمكننا التنسيق مع جهات معتمدة عند الطلب.'
                : 'Our service is strictly private chauffeur ground transport with vehicle standby. Our chauffeurs know the routes and sites intimately, but are not licensed academic tour guides. We provide written historical guides and coordinate logistics.'}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border">
            <h3 className="font-bold text-sm text-ink mb-2">
              {isAr ? 'هل السعر للشخص الواحد أم للسيارة بالكامل؟' : 'Is the price per person or per vehicle?'}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed font-light">
              {isAr
                ? 'كافة أسعارنا ثابتة ومحددة للسيارة بالكامل متضمنة الوقود والمواقف والانتظار حتى الحد الأقصى لسعة ركاب السيارة المختارة.'
                : 'All our quoted rates are fixed per vehicle, covering the entire car, chauffeur, waiting time, fuel, and tolls for up to the vehicle seating capacity.'}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border">
            <h3 className="font-bold text-sm text-ink mb-2">
              {isAr ? 'هل تتوفر جولات المزارات أثناء موسم الحج؟' : 'Are Ziyarat tours available during Hajj season?'}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed font-light">
              {isAr
                ? 'المشاعر المقدسة (منى، عرفات، ومزدلفة) تخضع لتنظيمات أمنية صارمة تمنع دخول المركبات غير المصرحة خلال موسم الحج، ويتم تعليق رحلات المشاعر تلقائياً في تلك الأيام لحين فتحها رسمياً.'
                : 'Hajj sacred grounds (Mina, Arafat, Muzdalifah) are strictly closed to non-licensed transport during the Hajj pilgrimage days. Our booking system automatically restricts tours to those zones during official Hajj dates.'}
            </p>
          </div>
        </div>
      </section>

      {/* 8. STICKY MOBILE BOOKING BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border p-3 md:hidden shadow-lg">
        <div className="container mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-ink-muted block">{isAr ? 'جولات المزارات من' : 'Ziyarat from'}</span>
            <span className="font-display font-bold text-sm text-ink">250 SAR</span>
          </div>
          <Link
            href={`/${locale}/booking?service=ziyarat`}
            className="h-10 px-6 rounded-btn bg-gold hover:bg-gold-hover text-ink text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
          >
            <Car className="w-3.5 h-3.5" />
            <span>{isAr ? 'احجز سيارتك' : 'Book Car'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
