import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { TrackBookingEngine } from '@/components/booking/TrackBookingEngine';

interface TrackBookingPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: TrackBookingPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';
  return {
    title: dict.page_track.title,
    description: dict.page_track.subtitle,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/track-booking`,
    },
  };
}

export default async function TrackBookingPage(props: TrackBookingPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.nav.trackBooking}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.page_track.title}
          </h1>
          <p className="mt-3 text-ink-muted text-base leading-relaxed font-light">
            {dict.page_track.subtitle}
          </p>
        </div>

        {/* Engine wrapped in Suspense */}
        <Suspense fallback={
          <div className="flex justify-center p-12">
            <div className="w-8 h-8 border-3 border-gold-dark border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <TrackBookingEngine locale={locale} dict={dict} />
        </Suspense>
      </div>
    </div>
  );
}
