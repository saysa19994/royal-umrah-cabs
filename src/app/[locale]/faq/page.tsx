import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { getPublicFaqsCached } from '@/lib/faq-service';
import { getPublishedPageCopy } from '@/lib/public-page-copy';
import { getSiteImagesCached } from '@/lib/site-images';
import { FaqSection } from '@/components/faq/FaqSection';
import { FaqJsonLd } from '@/components/seo/JsonLd';
import { ChevronRight, Home } from 'lucide-react';

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

  const cms=await getPublishedPageCopy('faq',locale);
  const title=cms.seoTitle || `${dict.faq.heading} | ${dict.meta.brand}`;
  const description=cms.seoDescription || dict.faq.subtitle;

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
  const [settings, dbFaqs, cms, siteImages] = await Promise.all([
    getSiteSettings(),
    getPublicFaqsCached(locale).catch(() => undefined),
    getPublishedPageCopy('faq',locale),
    getSiteImagesCached(),
  ]);
  const heading = cms.h1 || dict.faq.heading;
  const subtitle = typeof cms.contentBlocks.subtitle === 'string' && cms.contentBlocks.subtitle.trim()
    ? cms.contentBlocks.subtitle : dict.faq.subtitle;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const faqItems = dbFaqs;
  // [] is a valid editorial decision: do not recreate unpublished questions.

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.home,
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: heading,
        item: `${baseUrl}/${locale}/faq`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* 1. FAQ Schema.org JSON-LD matching all 12 items */}
      <FaqJsonLd dict={dict} items={faqItems} />

      {/* 2. Breadcrumbs Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      {/* 3. Breadcrumbs Nav */}
      <div className="bg-alabaster border-b border-border py-3">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav
            aria-label={dict.faq.heading}
            className="flex items-center gap-2 text-xs text-ink-muted"
          >
            <Link
              href={`/${locale}`}
              className="hover:text-gold-dark transition-colors inline-flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{dict.nav.home}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border-strong rtl:rotate-180" />
            <span className="text-ink font-medium" aria-current="page">
              {heading}
            </span>
          </nav>
        </div>
      </div>

      {/* 4. Full FAQ Component with 12 Localized Questions and Conversion CTA */}
      <FaqSection
        visualImage={siteImages.faq_visual}
        heading={heading}
        subtitle={subtitle}
        locale={locale}
        dict={dict}
        settings={settings}
        items={faqItems}
        id="faq"
        className="!border-t-0"
        standalone
        showCta
      />
    </div>
  );
}
