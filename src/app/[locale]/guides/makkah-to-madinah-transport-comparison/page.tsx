import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Car, Train, Bus, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { IntercityRouteExperience } from '@/components/routes/IntercityRouteExperience';

interface GuidePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: GuidePageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  return {
    title: dict.guides_section.guide3Title,
    description: dict.guides_section.guide3Desc,
    // This guide is currently written in English; localized titles alone are not translations.
    alternates: { canonical: `${baseUrl}/${locale}/guides/makkah-to-madinah-transport-comparison` },
    robots: { index: locale === 'en', follow: true },
  };
}

export default async function MakkahMadinahComparisonGuidePage(props: GuidePageProps) {
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
            <span>{dict.guides_section.guide3Date}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.guides_section.guide3Title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink-muted font-light max-w-2xl mx-auto">
            {dict.guides_section.guide3Desc}
          </p>
        </div>

        {/* Answer-first summary makes the main travel decision clear to readers and answer engines. */}
        <section aria-labelledby="transport-quick-answer" className="mb-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <h2 id="transport-quick-answer" className="font-display text-xl font-bold text-ink mb-3">
            Quick answer: Haramain train or private car?
          </h2>
          <p className="text-sm md:text-base text-ink-light leading-relaxed">
            Choose the Haramain high-speed train if you want a fast station-to-station journey and can
            travel with your permitted luggage. Choose a private chauffeur if hotel-to-hotel pickup,
            flexible departure, a planned Miqat stop or a confirmed vehicle with room for your family
            and luggage matters more. Compare the total cost for all passengers, including transport
            to and from the train stations, before deciding.
          </p>
          <p className="mt-3 text-xs md:text-sm text-ink-muted">
            Train schedules, fares and baggage policies can change. Verify them with the{' '}
            <a
              href="https://sar.hhr.sa/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              official Haramain High Speed Railway
            </a>{' '}
            before your journey.
          </p>
        </section>

        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-xs space-y-6 text-sm text-ink-light leading-relaxed font-light mb-12">
          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">1. Door-to-Door Convenience</h2>
            <p>
              While the Haramain High-Speed Train is fast (approx 2 hours 20 mins station-to-station), traveling by private chauffeur delivers true door-to-door convenience: you are picked up directly from your hotel lobby in Makkah and dropped right at your hotel entrance in Madinah, avoiding station taxi queues, baggage transfers, and crowded platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">2. Luggage Restrictions Comparison</h2>
            <p>
              The Haramain train has published baggage size and weight limits, including a 25 kg limit on the larger suitcase. Check the latest railway rules before travel, especially if carrying strollers or additional bags. With a private Hyundai Staria or Toyota HiAce, book a vehicle whose confirmed luggage capacity fits your entire group.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">3. Flexible Stopping at Miqat Bir Ali</h2>
            <p>
              When travelling from Madinah to Makkah to perform Umrah, a private chauffeur stops directly at Masjid Miqat Dhu al-Hulayfah (Bir Ali), with a complimentary planned stop of approximately 30–45 minutes for Ihram preparations and prayer, subject to the confirmed itinerary. The Haramain train does not make a passenger stop at this Miqat.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">4. Cost Comparison for Families</h2>
            <p>
              For a family of four to six, compare the combined price of all rail tickets plus transfers to both stations with the quoted fare of a private Hyundai Staria. Depending on travel dates and party size, either option may cost less; a private transfer also provides hotel-to-hotel convenience.
            </p>
          </section>
        </div>

        {/* INTERACTIVE HIJRAH HIGHWAY INTERCITY EXPERIENCE */}
        <IntercityRouteExperience locale={locale} slug="makkah-to-madinah" />

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/booking?route=makkah-to-madinah`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-sm shadow-md"
          >
            <span>Book Private Makkah ⇄ Madinah Chauffeur</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
