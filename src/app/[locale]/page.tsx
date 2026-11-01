import React from 'react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { HomeSections } from '@/components/home/HomeSections';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import { HeroSection } from '@/components/home/HeroSection';
import { getDbVehiclesCached } from '@/lib/fleet-db';

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
  const vehicles = await getDbVehiclesCached();

  const waitingMinutes = settings.airport_waiting_minutes || 60;

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HomepageFaqJsonLd dict={dict} />

      {/* 1. CINEMATIC FULL-SCREEN ROYAL LUXURY HERO SECTION */}
      <HeroSection locale={locale} />

      {/* 2. REFINED WARM IVORY TRUST STRIP */}
      <section className="bg-[#F7F5F0] border-b border-[#E8E3DA] py-3.5 sm:py-4 font-sans select-none">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-[#182235]">
          {settings.google_reviews_link && settings.google_reviews_count > 0 ? (
            <a
              href={settings.google_reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold hover:text-[#C5A15D] transition-colors"
            >
              <span className="text-[#C5A15D] font-bold text-base">★ {settings.google_reviews_rating.toFixed(1)}</span>
              <span>{dict.trust_strip.googleReviews}</span>
            </a>
          ) : (
            <div className="flex items-center gap-2 font-semibold text-[#182235]">
              <span className="text-[#C5A15D] font-bold">✓</span>
              <span>{locale === 'ar' ? 'أسعار معتمدة ومحددة مسبقاً' : 'Guaranteed Fixed Fares'}</span>
            </div>
          )}
          <span className="hidden md:inline text-[#C5A15D]/40">•</span>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#C5A15D] font-bold">✓</span>
            <span>{locale === 'ar' ? `${waitingMinutes} دقيقة انتظار مجاني بالمطار` : `${waitingMinutes}-Min Free Airport Wait`}</span>
          </div>
          <span className="hidden md:inline text-[#C5A15D]/40">•</span>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#C5A15D] font-bold">✓</span>
            <span>{dict.trust_strip.payOnArrival}</span>
          </div>
          <span className="hidden md:inline text-[#C5A15D]/40">•</span>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#C5A15D] font-bold">✓</span>
            <span>{dict.trust_strip.freeCancellation}</span>
          </div>
        </div>
      </section>

      {/* 3. HOME SECTIONS (HOW IT WORKS, FLEET SHOWROOM, POPULAR ROUTES, SERVICES, ZIYARAT, COMMITMENTS, REVIEWS, FAQ, CLOSING CTA) */}
      <HomeSections locale={locale} dict={dict} settings={settings} vehicles={vehicles} />
    </div>
  );
}
