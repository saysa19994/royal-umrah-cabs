import React from 'react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { HomeSections } from '@/components/home/HomeSections';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import { HeroSection } from '@/components/home/HeroSection';

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  const settings = await getSiteSettings();

  const waitingMinutes = settings.airport_waiting_minutes || 60;

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HomepageFaqJsonLd dict={dict} />

      {/* 1. CINEMATIC FULL-SCREEN HARAM HERO SECTION */}
      <HeroSection locale={locale} />

      {/* 2. BEIGE TRUST STRIP (ONLY SHOWN IF VALID OR FACTUAL) */}
      <section className="bg-bg-alt border-b border-border py-4">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm text-ink">
          {settings.google_reviews_link && settings.google_reviews_count > 0 ? (
            <a
              href={settings.google_reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold hover:text-gold-dark transition-colors"
            >
              <span className="text-gold font-bold text-base">★ {settings.google_reviews_rating.toFixed(1)}</span>
              <span>{dict.trust_strip.googleReviews}</span>
            </a>
          ) : (
            <div className="flex items-center gap-2 font-semibold text-ink">
              <span className="text-gold-dark font-bold">✓</span>
              <span>{locale === 'ar' ? 'أسعار معتمدة ومحددة مسبقاً' : 'Guaranteed Fixed Fares'}</span>
            </div>
          )}
          <span className="hidden md:inline text-border-strong">•</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-dark font-bold">✓</span>
            <span>{locale === 'ar' ? `${waitingMinutes} دقيقة انتظار مجاني بالمطار` : `${waitingMinutes}-Min Free Airport Wait`}</span>
          </div>
          <span className="hidden md:inline text-border-strong">•</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-dark font-bold">✓</span>
            <span>{dict.trust_strip.payOnArrival}</span>
          </div>
          <span className="hidden md:inline text-border-strong">•</span>
          <div className="flex items-center gap-2">
            <span className="text-gold-dark font-bold">✓</span>
            <span>{dict.trust_strip.freeCancellation}</span>
          </div>
        </div>
      </section>

      {/* 3. HOME SECTIONS (HOW IT WORKS, FLEET, SERVICES, ROUTES, STANDARDS, FAQ, CTA, FOOTER) */}
      <HomeSections locale={locale} dict={dict} settings={settings} />
    </div>
  );
}
