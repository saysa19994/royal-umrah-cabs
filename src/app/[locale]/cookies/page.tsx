import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
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
    title: dict.footer_extra.cookiePolicy,
    description: 'Cookie policy and technical storage usage on Royal Umrah Cabs.',
    alternates: {
      canonical: `${baseUrl}/${locale}/cookies`,
    },
  };
}

export default async function CookiePage(props: LegalPageProps) {
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
            {dict.footer_extra.cookiePolicy}
          </h1>
          <p className="mt-2 text-xs text-ink-muted">
            Last Updated: October 2026
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-xs space-y-6 text-sm text-ink-light leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">1. What Are Cookies?</h2>
            <p>
              Cookies and local browser storage are small data files saved on your device when you browse websites. They help remember your preferred currency, language, and recent route selections.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">2. Essential Operational Cookies</h2>
            <p>
              Royal Umrah Cabs uses minimal, essential cookies exclusively to maintain your booking session, save your preferred currency (e.g. SAR, MYR, USD), and ensure smooth language switching between Arabic, English, and Malay.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">3. Zero Invasive Tracking</h2>
            <p>
              We do not use invasive third-party ad-tracking cookies or sell behavioral profile data. Your browsing experience remains private and respected.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
