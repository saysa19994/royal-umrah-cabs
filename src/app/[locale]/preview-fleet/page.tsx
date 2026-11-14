import React from 'react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { LayeredPremiumFleetDeck } from '@/components/home/LayeredPremiumFleetDeck';

interface PreviewFleetProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function PreviewFleetPage(props: PreviewFleetProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-[#101827] text-white pt-6">
      <LayeredPremiumFleetDeck locale={locale} dict={dict} />
    </main>
  );
}
