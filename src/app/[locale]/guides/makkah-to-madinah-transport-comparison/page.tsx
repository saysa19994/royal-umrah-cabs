import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Car, Train, Bus, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

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
    alternates: {
      canonical: `${baseUrl}/${locale}/guides/makkah-to-madinah-transport-comparison`,
    },
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
              The Haramain train strictly enforces a limit of 1 large piece of luggage per passenger (max 25 kg) plus one small hand carry. Families with extra shopping, stroller, or 5-liter Zamzam boxes often face strict baggage surcharges or rejection at the train scanner. With a private chauffeur in a Hyundai Staria VIP or Toyota HiAce, all your luggage travels securely with you without extra bag fees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">3. Flexible Stopping at Miqat Bir Ali</h2>
            <p>
              When travelling from Madinah to Makkah to perform Umrah, a private chauffeur stops directly at Masjid Miqat Dhu al-Hulayfah (Bir Ali), granting your family all the time needed to shower, assume Ihram, and pray without stress. Trains bypass the Miqat station without passenger disembarkation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">4. Cost Comparison for Families</h2>
            <p>
              For a family of 4 to 6 passengers, buying individual train tickets plus 2 station taxi rides on both ends frequently exceeds the cost of a private VIP Hyundai Staria van, while a private chauffeur offers complete privacy and flexibility.
            </p>
          </section>
        </div>

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
