import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Plane, MapPin, Clock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

interface GuidePageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({
  params: { locale },
}: GuidePageProps): Promise<Metadata> {
  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';
  return {
    title: dict.guides_section.guide2Title,
    description: dict.guides_section.guide2Desc,
    alternates: {
      canonical: `${baseUrl}/${locale}/guides/jeddah-airport-arrival-guide`,
    },
  };
}

export default function JeddahAirportGuidePage({ params: { locale } }: GuidePageProps) {
  const dict = getDictionary(locale);

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.guides_section.guide2Date}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.guides_section.guide2Title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink-muted font-light max-w-2xl mx-auto">
            {dict.guides_section.guide2Desc}
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-xs space-y-6 text-sm text-ink-light leading-relaxed font-light mb-12">
          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">1. KAIA Terminal 1 vs North Terminal</h2>
            <p>
              King Abdulaziz International Airport (KAIA) has two primary international passenger facilities. Most national carriers and international airlines (such as Saudia, Malaysia Airlines, Emirates, Qatar Airways, Turkish Airlines) arrive at the new <strong>Terminal 1</strong>, known for its massive 30-meter aquarium. Certain seasonal charter flights and budget airlines use the <strong>North Terminal</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">2. Immigration and Baggage Retrieval</h2>
            <p>
              After clearing passport control, collect your checked luggage at the designated carousel. Free airport luggage trolleys are provided throughout the baggage claim area.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">3. Where Your Chauffeur Meets You</h2>
            <p>
              Once you walk out through the customs exit doors into the public arrival hall, your private Royal Umrah Cabs chauffeur will be standing in the designated reception area holding a clear welcome board bearing your family name. You will also receive your chauffeur's direct mobile number, photograph, and vehicle plate number on WhatsApp before landing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">4. 60-Minute Complimentary Wait Time</h2>
            <p>
              Our dispatch center automatically synchronizes your chauffeur's dispatch with your flight's live radar telemetry. The 60-minute complimentary waiting window begins only after your aircraft touches down, giving your family plenty of time to clear customs without rushing.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/booking?route=jeddah-airport-to-makkah`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-sm shadow-md"
          >
            <span>Book Jeddah Airport to Makkah Chauffeur</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
