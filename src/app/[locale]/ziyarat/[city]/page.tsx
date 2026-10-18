import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ZIYARAT_SITES, ZIYARAT_TOURS, ZIYARAT_GUIDES } from '@/data/ziyarat';
import { MapPin, Clock, ArrowRight, Car, Compass, MessageCircle, ShieldCheck } from 'lucide-react';

interface CityHubPageProps {
  params: Promise<{
    locale: Locale;
    city: string;
  }>;
}

export function generateStaticParams() {
  return [
    { city: 'makkah' },
    { city: 'madinah' },
  ];
}

export async function generateMetadata(props: CityHubPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    city
  } = params;

  if (city !== 'makkah' && city !== 'madinah') return {};
  const isAr = locale === 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';
  const isMakkah = city === 'makkah';

  const title = isMakkah
    ? (isAr ? 'مزارات مكة المكرمة بسيارة خاصة وسائق' : 'Makkah Ziyarat Tours with Private Chauffeur')
    : (isAr ? 'مزارات المدينة المنورة بسيارة خاصة وسائق' : 'Madinah Ziyarat Tours with Private Chauffeur');

  const description = isMakkah
    ? (isAr
        ? 'احجز جولة مزارات مكة المكرمة بسيارة خاصة: غار حراء، جبل ثور، منى، مزدلفة، وعرفات. سائق مخصص، أسعار ثابتة، وتوصيل من الفندق.'
        : 'Private chauffeur Ziyarat tours in Makkah. Cave Hira, Mount Thawr, Mina, Muzdalifah, & Mount Arafat. Fixed vehicle fares & hotel pickup.')
    : (isAr
        ? 'احجز جولة مزارات المدينة المنورة بسيارة خاصة: مسجد قباء، جبل أحد ومقبرة الشهداء، القبلتين، وموقع الخندق. سيارات حديثة وأسعار شاملة.'
        : 'Private chauffeur Ziyarat tours in Madinah. Masjid Quba, Mount Uhud, Qiblatayn, & Seven Mosques. Fixed vehicle fares & family comfort.');

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/ziyarat/${city}`,
    },
  };
}

export default async function CityHubPage(props: CityHubPageProps) {
  const params = await props.params;

  const {
    locale,
    city
  } = params;

  if (city !== 'makkah' && city !== 'madinah') {
    notFound();
  }

  const isAr = locale === 'ar';
  const isMakkah = city === 'makkah';
  const sites = Object.values(ZIYARAT_SITES).filter((s) => s.city === city);
  const tours = Object.values(ZIYARAT_TOURS).filter((t) => t.city === city);

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-ink-muted mb-6">
          <Link href={`/${locale}`} className="hover:text-gold-dark">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/ziyarat`} className="hover:text-gold-dark">
            {isAr ? 'المزارات' : 'Ziyarat'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isMakkah ? (isAr ? 'مكة المكرمة' : 'Makkah') : (isAr ? 'المدينة المنورة' : 'Madinah')}
          </span>
        </div>

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-gold-dark uppercase tracking-widest block mb-2">
            {isMakkah ? (isAr ? 'معالم مهبط الوحي' : 'Holy City of Makkah') : (isAr ? 'طيبة الطيبة' : 'City of the Prophet')}
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {isMakkah ? (
              isAr ? (
                <>
                  مزارات مكة المكرمة{' '}
                  <span className="text-gold-dark italic">بسيارة خاصة وسائق</span>
                </>
              ) : (
                <>
                  Makkah Ziyarat Tours with{' '}
                  <span className="text-gold-dark italic">Private Chauffeur</span>
                </>
              )
            ) : isAr ? (
              <>
                مزارات ومساجد المدينة المنورة{' '}
                <span className="text-gold-dark italic">بسيارة خاصة</span>
              </>
            ) : (
              <>
                Madinah Prophetic Mosques &amp; Sites{' '}
                <span className="text-gold-dark italic">with Private Car</span>
              </>
            )}
          </h1>
          <p className="mt-4 text-xs md:text-base text-ink-muted leading-relaxed font-light">
            {isMakkah
              ? isAr
                ? 'استكشف غار حراء وثور والمشاعر المقدسة (منى ومزدلفة وعرفات) بكل طمأنينة. سائق خاص ينتظركم في كل موقع دون أي استعجال.'
                : 'Experience Cave Hira, Mount Thawr, and the sacred Hajj valleys (Mina, Muzdalifah, Arafat) in serene, air-conditioned comfort.'
              : isAr
                ? 'صلِّ ركعتين في مسجد قباء، وسلم على شهداء أحد، وزر مسجد القبلتين وموقع الخندق بسيارة فارهة وسائق خبير.'
                : 'Perform two rak’ahs in Masjid Quba, greet the martyrs at Mount Uhud, and visit Qiblatayn with dedicated door-to-door chauffeur service.'}
          </p>
        </div>

        {/* TOURS AVAILABLE IN THIS CITY */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-6">
            {isAr ? 'الجولات المتاحة للحجز المباشر' : 'Bookable Private Tour Options'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((t) => (
              <div
                key={t.slug}
                className="bg-surface rounded-2xl border border-border p-6 flex flex-col justify-between hover:border-gold transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gold-dark font-medium mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isAr ? t.durationAr : t.durationEn}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    {isAr ? t.titleAr : t.titleEn}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-light mb-4">
                    {isAr ? t.subtitleAr : t.subtitleEn}
                  </p>
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-ink-muted block">{isAr ? 'من' : 'From'}</span>
                    <span className="font-display font-bold text-lg text-ink">
                      {t.basePriceSAR.camry} SAR
                    </span>
                  </div>
                  <Link
                    href={`/${locale}/ziyarat/tours/${t.slug}`}
                    className="h-9 px-4 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-ink text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    <span>{isAr ? 'عرض الجولة' : 'View Tour'}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INDIVIDUAL SITES IN THIS CITY */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-6">
            {isAr ? 'المواقع التاريخية في المدينة' : 'Historical Sites & Landmarks'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sites.map((site) => (
              <div
                key={site.slug}
                className="bg-surface rounded-2xl border border-border p-6 hover:border-gold-line transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gold-dark">
                      {isAr ? site.distanceFromHaramAr : site.distanceFromHaramEn}
                    </span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-bg-alt text-ink-muted">
                      {isAr ? site.walkingEffortAr : site.walkingEffortEn}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    {isAr ? site.titleAr : site.titleEn}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-light mb-4">
                    {isAr ? site.answerFirstAr : site.answerFirstEn}
                  </p>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-ink-light">
                    {isAr ? site.typicalDurationAr : site.typicalDurationEn}
                  </span>
                  <Link
                    href={`/${locale}/ziyarat/${site.city}/${site.slug}`}
                    className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1"
                  >
                    <span>{isAr ? 'دليل الزيارة الكامل' : 'Complete Site Guide'}</span>
                    <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
