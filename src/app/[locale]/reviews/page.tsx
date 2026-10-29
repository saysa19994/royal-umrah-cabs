import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';
import { ChevronRight, Home, Star } from 'lucide-react';

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
  const isAr = locale === 'ar';

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
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
    <div className="min-h-screen bg-[#060A14] text-white flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      {/* Breadcrumb Navigation Header */}
      <div className="bg-[#0B1120] border-b border-white/10 py-3.5">
        <div className="container mx-auto px-4 max-w-7xl flex items-center gap-2 text-xs text-slate-400">
          <Link href={`/${locale}`} className="hover:text-gold flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'الرئيسية' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600 rtl:rotate-180" />
          <span className="text-gold font-medium">{dict.reviews.heading}</span>
        </div>
      </div>

      {/* Main Reviews Section */}
      <main className="flex-1">
        <ReviewsSection locale={locale} dict={dict} isStandalone={true} />
      </main>
    </div>
  );
}
