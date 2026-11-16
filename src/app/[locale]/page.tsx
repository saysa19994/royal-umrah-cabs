import React from 'react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import { SignatureJourneyHomepage } from '@/components/home/SignatureJourneyHomepage';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-200">
      <HomepageFaqJsonLd dict={dict} />
      <SignatureJourneyHomepage locale={locale} dict={dict} />
    </div>
  );
}
