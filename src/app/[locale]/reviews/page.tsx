import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';
import { ChevronRight, Home } from 'lucide-react';

interface ReviewsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: ReviewsPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  const title = `${dict.reviews.heading} | ${dict.meta.brand}`;
  const description = dict.reviews.subheading;

  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, '/reviews'),
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/reviews`,
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

export default async function ReviewsPage(props: ReviewsPageProps) {
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

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
        name: dict.reviews.heading,
        item: `${baseUrl}/${locale}/reviews`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      {/* Breadcrumb Navigation Header */}
      <div className="border-b border-border py-3.5">
        <nav aria-label={dict.reviews.heading} className="container mx-auto px-4 max-w-7xl flex items-center gap-2 text-sm text-ink-muted">
          <Link href={`/${locale}`} className="hover:underline flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{dict.nav.home}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
          <span className="text-ink font-medium" aria-current="page">{dict.reviews.heading}</span>
        </nav>
      </div>

      {/* Main Reviews Section */}
      <ReviewsSection locale={locale} dict={dict} isStandalone />
    </div>
  );
}
