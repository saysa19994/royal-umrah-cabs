import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { COMPREHENSIVE_GUIDES } from '@/data/comprehensive-guides';
import {
  BookOpen,
  Compass,
  ArrowRight,
  Plane,
  Car,
  Train,
  Clock,
  Sparkles,
} from 'lucide-react';

interface GuidesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: GuidesPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;

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
      ? 'مجموعة شاملة من 12 دليلاً استرشادياً لضيوف الرحمن: الاستقبال في مطارات جدة والمدينة، المقارنة بين وسائل السفر، واختيار السيارة المناسبة.'
      : 'Comprehensive library of 12 verified travel guides for Umrah pilgrims: airport arrivals, train vs taxi comparisons, vehicle selection, and sacred ziyarat tours.';

  return {
    title: `${title} | Duyuf Alrahman VIP`,
    description,
    alternates: getLocalizedAlternates(locale, '/guides'),
  };
}

export default async function GuidesIndexPage(props: GuidesPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);

  // 4 Core Category Pillars (Matching User Blueprint & Screenshot 12)
  const GUIDE_CATEGORIES = [
    {
      id: 'airport',
      title: locale === 'ar' ? 'أدلة المطارات (Airport Guides)' : 'Airport Guides',
      desc:
        locale === 'ar'
          ? 'الوصول من مطار جدة والمدينة، الاستقبال بالاسم، وأمتعة السفر.'
          : 'Jeddah KAIA and Madinah arrivals, terminal meeting points, luggage handling.',
      img: '/assets/images/yukon_exterior.webp',
      link: `/${locale}/guides/jeddah-airport-arrival-pickup-guide`,
      cta: locale === 'ar' ? 'عرض دليل المطار' : 'Read Airport Guide',
      icon: Plane,
    },
    {
      id: 'train-vs-taxi',
      title: locale === 'ar' ? 'القطار أم السيارة (Train vs Taxi)' : 'Train vs Taxi',
      desc:
        locale === 'ar'
          ? 'مقارنة التكلفة الإجمالية والراحة والتوقف بالميقات للرحلات بين المدن.'
          : 'Total family cost, transit time, and Miqat stopover comparison.',
      img: '/assets/images/staria_exterior.webp',
      link: `/${locale}/guides/jeddah-airport-to-makkah-taxi-vs-train`,
      cta: locale === 'ar' ? 'مقارنة خيارات السفر' : 'Compare Transport',
      icon: Train,
    },
    {
      id: 'vehicle-guide',
      title: locale === 'ar' ? 'دليل اختيار السيارة (Vehicle Guide)' : 'Vehicle Guide',
      desc:
        locale === 'ar'
          ? 'اختيار السيارة المناسبة حسب عدد الركاب والحقائب والميزانية.'
          : 'Choosing the right vehicle by passenger and luggage capacity.',
      img: '/assets/images/hiace_exterior.webp',
      link: `/${locale}/guides/how-to-choose-the-right-vehicle-for-umrah-group`,
      cta: locale === 'ar' ? 'استعراض دليل الأسطول' : 'View Fleet Guide',
      icon: Car,
    },
    {
      id: 'ziyarat-guide',
      title: locale === 'ar' ? 'أدلة المزارات (Ziyarat Guides)' : 'Ziyarat Guides',
      desc:
        locale === 'ar'
          ? 'أماكن الزيارة الإسلامية في مكة والمدينة والمدة المناسبة للجولة.'
          : 'Sacred historical sites in Makkah & Madinah with chauffeur waiting.',
      img: '/assets/images/camry_exterior.webp',
      link: `/${locale}/guides/makkah-ziyarat-places-routes-transport`,
      cta: locale === 'ar' ? 'استعراض جولات المزارات' : 'Explore Ziyarat',
      icon: Compass,
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-ink-muted mb-8 text-start">
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
            <span>{locale === 'ar' ? 'مكتبة أدلة العمرة المعتمدة' : 'Official Umrah Guides Library'}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {locale === 'ar' ? 'أدلة إرشادات السفر والتنقل' : 'Umrah Travel & Transport'}{' '}
            <span className="text-gold-dark italic font-display font-bold">
              {locale === 'ar' ? 'بين الحرمين الشريفين' : 'Guides 2026'}
            </span>
          </h1>
          <p className="mt-3 text-ink-muted text-base leading-relaxed font-light">
            {locale === 'ar'
              ? '12 دليلاً متخصصاً يساعدك على اتخاذ قرار النقل الأنسب: خطوات الاستقبال في المطار، مقارنة القطار بالسيارة الخاصة، واختيار السيارة المناسبة لعائلتك.'
              : '12 authoritative guides to assist your Umrah journey: airport arrivals, transit comparisons, vehicle sizing, and holy sites tours.'}
          </p>
        </div>

        {/* 4 CORE CATEGORY PILLARS (Matching Screenshot 12) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
            <h2 className="font-display font-bold text-2xl text-ink text-start">
              {locale === 'ar' ? 'أقسام أدلة السفر الرئيسية' : 'Main Guide Categories'}
            </h2>
            <span className="text-xs text-gold-dark font-semibold">
              {locale === 'ar' ? '4 محاور رئيسية' : '4 Core Pillars'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUIDE_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="bg-surface rounded-2xl border border-border shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-charcoal p-3 flex items-center justify-center overflow-hidden">
                      <Image
                        src={cat.img}
                        alt={cat.title}
                        width={320}
                        height={200}
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                      <div className="absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 w-8 h-8 rounded-lg bg-gold/90 text-ink flex items-center justify-center shadow-xs">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-5 text-start">
                      <h3 className="font-display font-bold text-lg text-ink mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-ink-muted leading-relaxed font-light">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={cat.link}
                      className="w-full min-h-[44px] rounded-btn bg-gold-soft border border-gold-line text-gold-dark hover:bg-gold hover:text-ink text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <span>{cat.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 12 DETAILED GUIDES (Matching Screenshot 13) */}
        <div className="mb-20 text-start">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
            <h2 className="font-display font-bold text-2xl text-ink">
              {locale === 'ar' ? 'جميع أدلة السفر الـ 12 المتخصصة' : 'Complete 12 Umrah Guides'}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>{locale === 'ar' ? 'محدثة لعام 2026' : 'Updated 2026'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPREHENSIVE_GUIDES.map((guide, idx) => (
              <div
                key={guide.slug}
                className="bg-surface rounded-2xl p-6 border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider bg-gold-soft px-2.5 py-0.5 rounded-full border border-gold-line">
                      {guide.categoryLabel[locale] || guide.categoryLabel.en}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-ink-muted font-light">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base md:text-lg text-ink mb-2 leading-snug group-hover:text-gold-dark transition-colors">
                    {idx + 1}. {guide.title[locale] || guide.title.en}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-light mb-4 line-clamp-3">
                    {guide.subtitle[locale] || guide.subtitle.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
                  <Link
                    href={`/${locale}/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-dark hover:underline min-h-[44px]"
                  >
                    <span>{locale === 'ar' ? 'قراءة الدليل' : 'Read Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>

                  <Link
                    href={`/${locale}/booking?route=${guide.routeId}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-ink bg-bg-alt px-3 py-1.5 rounded-btn border border-border hover:border-gold-dark transition-colors min-h-[38px]"
                  >
                    <span>{locale === 'ar' ? 'احسب السعر' : 'Check Fare'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 text-center border border-charcoal-border">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-gold mb-3">
            {locale === 'ar' ? 'هل تحتاج إلى استشارة خاصة لرحلة عائلتك؟' : 'Need Tailored Advice for Your Family Trip?'}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto mb-6 font-light leading-relaxed">
            {locale === 'ar'
              ? 'فريق منسقي الحجوزات متواجد على مدار 24 ساعة للإجابة على استفسارات مواعيد الطيران وأحجام الحقائب وترتيبات الميقات.'
              : 'Our 24/7 dispatch coordinators are ready to answer flight arrival, luggage size, and Miqat scheduling questions.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs min-h-[48px]"
            >
              <span>{locale === 'ar' ? 'احجز رحلتك الآن' : 'Book Your Chauffeur'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
