import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ShieldCheck, HeartHandshake, Clock, Sparkles, Award, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: AboutPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  return {
    title: dict.page_about.title,
    description: dict.page_about.subtitle,
    alternates: getLocalizedAlternates(locale, '/about'),
  };
}

export default async function AboutPage(props: AboutPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);

  const pillars = [
    {
      title: dict.page_about.value1Title,
      desc: dict.page_about.value1Desc,
      icon: Clock,
    },
    {
      title: dict.page_about.value2Title,
      desc: dict.page_about.value2Desc,
      icon: ShieldCheck,
    },
    {
      title: dict.page_about.value3Title,
      desc: dict.page_about.value3Desc,
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.nav.about}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.page_about.title}
          </h1>
          <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            {dict.page_about.subtitle}
          </p>
        </div>

        {/* Narrative / Mission Block */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-xs mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ink mb-6 text-start">
              {dict.page_about.storyTitle}
            </h2>
            <div className="space-y-4 text-ink-light text-base leading-relaxed font-light text-start">
              <p>{dict.page_about.storyP1}</p>
              <p>{dict.page_about.storyP2}</p>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-ink">
              {locale === 'ar'
                ? 'قيمنا الأساسية في خدمة ضيوف الرحمن'
                : locale === 'ms'
                ? 'Prinsip Khidmat Tetamu Allah'
                : 'Our Core Principles of Pilgrim Care'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface rounded-2xl p-8 border border-border shadow-xs flex flex-col items-start text-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-ink mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chauffeur Standards & Cleanliness */}
        <div className="bg-surface rounded-2xl p-8 md:p-10 border border-gold-line/60 shadow-xs mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-start">
              <span className="text-xs font-bold text-gold-dark uppercase tracking-widest block mb-2">
                {locale === 'ar' ? 'معايير الأسطول والسائقين' : locale === 'ms' ? 'Standard Armada & Pemandu' : 'Fleet & Chauffeur Standards'}
              </span>
              <h3 className="font-display text-2xl font-bold text-ink mb-4">
                {locale === 'ar'
                  ? 'سيارات حديثة معقمة وسائقون ذوو خلق وأمانة'
                  : locale === 'ms'
                  ? 'Kenderaan Baharu, Bersih & Pemandu Berhemah'
                  : 'Pristine Vehicles & Respectful Professional Chauffeurs'}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-light mb-4">
                {locale === 'ar'
                  ? 'تخضع جميع مركباتنا لصيانة دورية وفحص شامل قبل كل رحلة لضمان أعلى درجات السلامة. مقصورات مكيفة ومعطرة مع مياه زمزم ومنافذ شحن سريع لكافة أجهزتكم.'
                  : locale === 'ms'
                  ? 'Semua kenderaan kami menjalani pemeriksaan rapi sebelum setiap perjalanan demi keselamatan jemaah. Kabin berhawa dingin wangi dengan air minuman sejuk dan pengecas pantas.'
                  : 'Every vehicle undergoes regular mechanical checks before each journey. Fully air-conditioned, fragrant, equipped with chilled water, and fast USB charging.'}
              </p>
            </div>
            <div className="bg-surface-muted rounded-xl p-6 border border-border text-start space-y-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold-dark shrink-0" />
                <span className="text-xs font-semibold text-ink">
                  {locale === 'ar' ? 'مقصورات معقمة ونظافة فندقية ممتازة' : locale === 'ms' ? 'Kebersihan kabin bertaraf hotel' : 'Hospitality-grade sanitization before every pickup'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold-dark shrink-0" />
                <span className="text-xs font-semibold text-ink">
                  {locale === 'ar' ? 'معرفة تامة بطرق مكة والمدينة والمشاعر' : locale === 'ms' ? 'Mahir laluan Makkah, Madinah & tanah suci' : 'Expert knowledge of Makkah, Madinah & holy site routes'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold-dark shrink-0" />
                <span className="text-xs font-semibold text-ink">
                  {locale === 'ar' ? 'سائقون متحدثون بالعربية والإنجليزية' : locale === 'ms' ? 'Pemandu fasih berbahasa Arab & Inggeris' : 'Fluent Arabic & English communicative chauffeurs'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-gold-dark shrink-0" />
                <span className="text-xs font-semibold text-ink">
                  {locale === 'ar' ? 'توقف خاص للميقات عند الرغبة في الإحرام' : locale === 'ms' ? 'Perhentian khas Miqat Bir Ali untuk berniat ihram' : 'Complimentary Miqat stop for Ihram preparation'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/booking`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-base shadow-md transition-all gap-2"
          >
            <span>{dict.hero.ctaBook}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
