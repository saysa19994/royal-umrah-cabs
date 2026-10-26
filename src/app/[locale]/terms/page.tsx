import React from 'react';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

interface LegalPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: LegalPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  return {
    title: dict.footer.terms,
    description: 'Terms of service and passenger transport conditions for Duyuf Alrahman VIP.',
    alternates: getLocalizedAlternates(locale, '/terms'),
  };
}

export default async function TermsPage(props: LegalPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.meta.brand}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.footer.terms}
          </h1>
          <p className="mt-2 text-xs text-ink-muted">
            Last Updated: October 2026
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-xs space-y-6 text-sm text-ink-light leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">1. Nature of Service</h2>
            <p>
              Duyuf Alrahman VIP provides private chauffeur transport services between Jeddah Airport (KAIA), Makkah Al-Mukarramah, and Madinah Al-Munawwarah. Every reservation is for a private vehicle dedicated exclusively to the booking passenger and their party.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">2. Guaranteed Fixed Pricing &amp; Payment</h2>
            <p>
              All prices quoted on the website or via our official WhatsApp dispatch are fixed and guaranteed. Fares include all highway expressway tolls, airport parking fees, fuel, and taxes. Payment is made strictly in cash directly to your chauffeur upon arrival at your destination after your journey is completed in Saudi Riyals (SAR) or US Dollars (USD). Credit cards, debit cards, POS terminals, online payments, and bank transfers are not accepted. No advance payment or deposit is required.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">3. Airport Meet &amp; Greet and Flight Delays</h2>
            <p>
              For airport pickups, the passenger agrees to provide accurate flight details. Our system tracks flight arrival times. A 60-minute complimentary waiting window is included from the flight's actual touchdown. If your flight is delayed, your pickup schedule is updated automatically at no extra cost.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">4. Luggage &amp; Vehicle Capacities</h2>
            <p>
              Passengers must adhere to the passenger and luggage capacities stated for each vehicle class. Extra luggage exceeding the vehicle's safe capacity may require an additional vehicle at the passenger's expense.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">5. Passenger Conduct</h2>
            <p>
              Smoking and vaping are strictly prohibited in all vehicles. Passengers traveling between Madinah and Makkah who wish to assume Ihram at Masjid Miqat Bir Ali are provided adequate stop time as coordinated during booking.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
