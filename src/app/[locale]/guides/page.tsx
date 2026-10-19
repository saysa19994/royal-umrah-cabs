import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ZIYARAT_GUIDES } from '@/data/ziyarat';
import { BookOpen, Compass, Calendar, ArrowRight, ShieldCheck, MapPin, Plane, Car } from 'lucide-react';

interface GuidesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: GuidesPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);

  const title =
    locale === 'ar'
      ? 'أدلة إرشادات العمرة والتنقل بين مكة والمدينة'
      : locale === 'ms'
      ? 'Panduan Pengangkutan & Perjalanan Umrah Makkah-Madinah'
      : locale === 'id'
      ? 'Panduan Transportasi & Perjalanan Umrah Makkah-Madinah'
      : locale === 'ur'
      ? 'عمرہ ٹرانسپورٹ اور رہنمائی گائیڈز - مکہ و مدینہ'
      : 'Umrah Transport & Pilgrimage Guides (2026)';

  const description =
    locale === 'ar'
      ? 'مجموعة شاملة من الأدلة الإرشادية لضيوف الرحمن: الاستقبال في مطار جدة، المقارنة بين وسائل السفر، والتخطيط لمزارات مكة والمدينة.'
      : 'Comprehensive guides for Umrah pilgrims: Jeddah airport arrivals, Haramain train vs private chauffeur comparison, and holy sites ziyarat planning.';

  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, '/guides'),
  };
}

export default async function GuidesIndexPage(props: GuidesPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const isRtl = locale === 'ar' || locale === 'ur';

  const MAIN_GUIDES = [
    {
      slug: 'jeddah-airport-arrival-guide',
      title:
        locale === 'ar'
          ? 'دليل الاستقبال في صالة 1 بمطار الملك عبدالعزيز بجدة'
          : locale === 'ms'
          ? 'Panduan Ketibaan & Pertemuan Pemandu di KAIA Terminal 1 Jeddah'
          : locale === 'id'
          ? 'Panduan Kedatangan & Bertemu Pengemudi di Bandara KAIA Terminal 1 Jeddah'
          : locale === 'ur'
          ? 'جدہ ایئرپورٹ ٹرمینل 1 آمد اور ڈرائیور سے ملاقات کی گائیڈ'
          : 'Jeddah Airport (KAIA Terminal 1) Arrival & Chauffeur Meeting Guide',
      desc:
        locale === 'ar'
          ? 'خطوات استلام الأمتعة والخروج من صالة الوصول والالتقاء بسائقك الخاص بكل يسر.'
          : 'Step-by-step navigation from international arrivals, SIM cards, luggage carousel, to your private driver meeting point.',
      category: locale === 'ar' ? 'إرشادات المطارات' : 'Airport Guide',
      readTime: '5 min read',
      date: 'October 2026',
      icon: Plane,
      href: `/${locale}/guides/jeddah-airport-arrival-guide`,
    },
    {
      slug: 'makkah-to-madinah-transport-comparison',
      title:
        locale === 'ar'
          ? 'مقارنة السفر بين مكة والمدينة: السائق الخاص والقطار والحافلات'
          : locale === 'ms'
          ? 'Makkah ke Madinah: Pemandu Peribadi vs Kereta Api Laju Haramain vs Bas'
          : locale === 'id'
          ? 'Makkah ke Madinah: Pengemudi Pribadi vs Kereta Cepat Haramain vs Bus'
          : locale === 'ur'
          ? 'مکہ سے مدینہ سفر کا موازنہ: پرائیویٹ کار، حرمین ٹرین، یا بس'
          : 'Makkah to Madinah: Private Chauffeur vs Haramain High-Speed Train vs Bus',
      desc:
        locale === 'ar'
          ? 'مقارنة دقيقة وشاملة لراحة العائلات وسعة الحقائب والتوصيل المباشر من باب الفندق.'
          : 'A complete breakdown of luggage limits, door-to-door transit times, Miqat Bir Ali stopovers, and total family comfort.',
      category: locale === 'ar' ? 'مقارنة وسائل النقل' : 'Transit Comparison',
      readTime: '6 min read',
      date: 'October 2026',
      icon: Car,
      href: `/${locale}/guides/makkah-to-madinah-transport-comparison`,
    },
    {
      slug: 'malaysia-umrah-transport',
      title:
        locale === 'ar'
          ? 'دليل نقل المعتمرين القادمين من ماليزيا 2026'
          : locale === 'ms'
          ? 'Panduan Pengangkutan Umrah Jemaah Malaysia 2026'
          : locale === 'id'
          ? 'Panduan Transportasi Umrah Jamaah Asia Tenggara 2026'
          : locale === 'ur'
          ? 'ملائیشیا و بین الاقوامی معتمرین کے لیے ٹرانسپورٹ گائیڈ 2026'
          : 'Malaysia Umrah Transport & Chauffeur Guide 2026',
      desc:
        locale === 'ar'
          ? 'دليل شامل لخدمات الفانات الفاخرة ستاريا وهايس من كوالالمبور إلى جدة ومكة والمدينة.'
          : 'Dedicated guidance for flights from KLIA, large family groups, luggage management, and Miqat rituals.',
      category: locale === 'ar' ? 'فانات عائلية' : 'VIP Family Van',
      readTime: '7 min read',
      date: 'October 2026',
      icon: Compass,
      href: `/${locale}/guides/malaysia-umrah-transport`,
    },
  ];

  const ziyaratGuidesList = Object.values(ZIYARAT_GUIDES);

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-ink-muted mb-8">
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{dict.nav.guides || 'Guides'}</span>
        </div>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{dict.guides_section?.sectionPill || 'Pilgrim Knowledge Hub'}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.guides_section?.heading || 'Umrah Travel & Route'}{' '}
            <span className="text-gold italic font-display font-bold">
              {dict.guides_section?.headingHighlight || 'Guides'}
            </span>
          </h1>
          <p className="mt-3 text-ink-muted text-base leading-relaxed font-light">
            {dict.guides_section?.subtitle ||
              'Expert, verified advice on airport arrival procedures, intercity journeys, and sacred historical site tours.'}
          </p>
        </div>

        {/* SECTION 1: ESSENTIAL TRANSPORT GUIDES */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-2xl text-ink mb-6 pb-2 border-b border-border flex items-center gap-2.5">
            <Car className="w-5 h-5 text-gold-dark" />
            <span>{locale === 'ar' ? 'أدلة الوصول والتنقل الرئيسية' : 'Essential Transport & Airport Guides'}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MAIN_GUIDES.map((guide) => {
              const IconComp = guide.icon;
              return (
                <article
                  key={guide.slug}
                  className="bg-surface rounded-2xl border border-border p-6 shadow-xs hover:shadow-md hover:border-gold-line transition-all flex flex-col justify-between text-start group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider px-3 py-1 rounded-full bg-gold-soft border border-gold-line">
                        {guide.category}
                      </span>
                      <span className="text-[11px] text-ink-muted">{guide.readTime}</span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-bg-alt flex items-center justify-center text-gold-dark mb-4 group-hover:bg-gold group-hover:text-ink transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <h3 className="font-display font-bold text-lg text-ink mb-2 group-hover:text-gold-dark transition-colors leading-snug">
                      <Link href={guide.href}>{guide.title}</Link>
                    </h3>

                    <p className="text-xs text-ink-muted leading-relaxed font-light mb-6">
                      {guide.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-ink-muted">{guide.date}</span>
                    <Link
                      href={guide.href}
                      className="font-bold text-gold-dark hover:text-ink flex items-center gap-1 transition-colors"
                    >
                      <span>{dict.guides_section?.readGuide || 'Read Guide'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: ZIYARAT & SACRED SITES GUIDES */}
        <div>
          <h2 className="font-display font-bold text-2xl text-ink mb-6 pb-2 border-b border-border flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-gold-dark" />
            <span>{locale === 'ar' ? 'أدلة زيارة المعالم والمزارات النبوية' : 'Sacred Sites & Ziyarat Guides'}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ziyaratGuidesList.map((guide) => {
              const guideTitle = locale === 'ar' ? guide.titleAr : guide.titleEn;
              const guideSummary = locale === 'ar' ? guide.summaryAr : guide.summaryEn;
              const guideHref = `/${locale}/ziyarat/guides/${guide.slug}`;

              return (
                <article
                  key={guide.slug}
                  className="bg-surface rounded-2xl border border-border p-6 shadow-xs hover:shadow-md hover:border-gold-line transition-all flex flex-col justify-between text-start group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider px-3 py-1 rounded-full bg-gold-soft border border-gold-line">
                        {locale === 'ar' ? 'مزارات تاريخية' : 'Historical Ziyarat'}
                      </span>
                      <span className="text-[11px] text-ink-muted">4 min read</span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-bg-alt flex items-center justify-center text-gold-dark mb-4 group-hover:bg-gold group-hover:text-ink transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>

                    <h3 className="font-display font-bold text-lg text-ink mb-2 group-hover:text-gold-dark transition-colors leading-snug">
                      <Link href={guideHref}>{guideTitle}</Link>
                    </h3>

                    <p className="text-xs text-ink-muted leading-relaxed font-light mb-6">
                      {guideSummary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-ink-muted">{guide.lastUpdated}</span>
                    <Link
                      href={guideHref}
                      className="font-bold text-gold-dark hover:text-ink flex items-center gap-1 transition-colors"
                    >
                      <span>{dict.guides_section?.readGuide || 'Read Guide'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
