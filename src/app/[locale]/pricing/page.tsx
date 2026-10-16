import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { PricingTable } from '@/components/pricing/PricingTable';

interface PricingPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({
  params: { locale },
}: PricingPageProps): Promise<Metadata> {
  const dict = getDictionary(locale);
  return {
    title: `${dict.page_pricing.title} | ${dict.meta.brand}`,
    description: dict.page_pricing.subtitle,
  };
}

export default function PricingPage({ params: { locale } }: PricingPageProps) {
  const dict = getDictionary(locale);

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.nav.pricing}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.page_pricing.title}
          </h1>
          <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            {dict.page_pricing.subtitle}
          </p>
        </div>

        {/* Interactive Pricing Matrix */}
        <PricingTable locale={locale} dict={dict} />
      </div>
    </div>
  );
}
