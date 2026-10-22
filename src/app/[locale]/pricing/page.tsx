import React from 'react';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { PricingTable } from '@/components/pricing/PricingTable';
import { getDbPricesCached } from '@/lib/pricing-db';

interface PricingPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: PricingPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  return {
    title: dict.page_pricing.title,
    description: dict.page_pricing.subtitle,
    alternates: getLocalizedAlternates(locale, '/pricing'),
  };
}

export default async function PricingPage(props: PricingPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const initialRates = await getDbPricesCached();

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
        <PricingTable locale={locale} dict={dict} initialRates={initialRates} />
      </div>
    </div>
  );
}
