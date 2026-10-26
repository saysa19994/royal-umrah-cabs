import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { FaqSection } from '@/components/faq/FaqSection';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import { ChevronRight, Home, HelpCircle } from 'lucide-react';

interface FaqPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: FaqPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  const title = `${dict.faq.heading} | ${dict.meta.brand}`;
  const description = dict.faq.subtitle;

  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, '/faq'),
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/faq`,
      siteName: dict.meta.brand,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function FaqPage(props: FaqPageProps) {
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  const settings = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ar' ? 'الرئيسية' : 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: dict.faq.heading,
        item: `${baseUrl}/${locale}/faq`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* 1. FAQ Schema.org JSON-LD matching all 12 items */}
      <HomepageFaqJsonLd dict={dict} />

      {/* 2. Breadcrumbs Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      {/* 3. Breadcrumbs Nav */}
      <div className="bg-alabaster border-b border-border py-3">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-ink-muted"
          >
            <Link
              href={`/${locale}`}
              className="hover:text-gold-dark transition-colors inline-flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'الرئيسية' : 'Home'}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border-strong rtl:rotate-180" />
            <span className="text-ink font-medium" aria-current="page">
              {dict.faq.heading}
            </span>
          </nav>
        </div>
      </div>

      {/* 4. Full FAQ Component with 12 Localized Questions and Conversion CTA */}
      <FaqSection
        locale={locale}
        dict={dict}
        settings={settings}
        id="faq"
        className="!border-t-0"
        showCta={true}
      />
    </div>
  );
}
