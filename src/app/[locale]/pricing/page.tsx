import React from 'react';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { PricingTable } from '@/components/pricing/PricingTable';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getMergedSiteSettings } from '@/lib/dynamic-settings-store';

interface PricingPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: PricingPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);

  return {
    title: dict.page_pricing.title,
    description: dict.page_pricing.subtitle,
    alternates: getLocalizedAlternates(locale, '/pricing'),
  };
}

export default async function PricingPage(props: PricingPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const initialRates = await getDbPricesCached();
  const settings = getMergedSiteSettings();

  return (
    <div className="py-10 sm:py-14 md:py-20 bg-[#060A12] min-h-screen text-start">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        {/* Interactive Royal Luxury Pricing Matrix (Image 2) */}
        <PricingTable
          locale={locale}
          dict={dict}
          initialRates={initialRates}
          taifEnabled={settings.taif_enabled !== false}
          riyadhEnabled={settings.riyadh_enabled !== false}
        />
      </div>
    </div>
  );
}
