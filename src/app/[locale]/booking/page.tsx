import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { BookingEngine } from '@/components/booking/BookingEngine';

interface BookingPageProps {
  params: {
    locale: Locale;
  };
  searchParams: {
    route?: string;
    vehicle?: string;
    date?: string;
    time?: string;
    passengers?: string;
    luggage?: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(locale);
  return {
    title: `${dict.nav.bookNow} | ${dict.meta.brand}`,
    description: dict.booking_card.subtitle,
  };
}

export default async function BookingPage({
  params: { locale },
  searchParams,
}: BookingPageProps) {
  const dict = getDictionary(locale);
  const settings = await getSiteSettings();

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>Direct Operator Booking</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            Reserve Your Private Chauffeur
          </h1>
          <p className="mt-2 text-ink-muted text-sm md:text-base max-w-xl mx-auto font-light">
            Fixed prices calculated live with zero prepayment required. Pay your driver upon arrival.
          </p>
        </div>

        <BookingEngine
          locale={locale}
          dict={dict}
          settings={settings}
          initialRoute={searchParams.route}
          initialVehicle={searchParams.vehicle}
          initialDate={searchParams.date}
          initialTime={searchParams.time}
          initialPassengers={searchParams.passengers}
          initialLuggage={searchParams.luggage}
        />
      </div>
    </div>
  );
}
