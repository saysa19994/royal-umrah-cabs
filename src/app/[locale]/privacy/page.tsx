import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

interface LegalPageProps {
  params: {
    locale: Locale;
  };
}

export async function generateMetadata({
  params: { locale },
}: LegalPageProps): Promise<Metadata> {
  const dict = getDictionary(locale);
  return {
    title: `${dict.footer.privacy} | ${dict.meta.brand}`,
    description: 'Privacy policy for Royal Umrah Cabs passenger dispatch and booking operations.',
  };
}

export default function PrivacyPage({ params: { locale } }: LegalPageProps) {
  const dict = getDictionary(locale);

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.meta.brand}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.footer.privacy}
          </h1>
          <p className="mt-2 text-xs text-ink-muted">
            Last Updated: October 2026
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-xs space-y-6 text-sm text-ink-light leading-relaxed font-light">
          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">1. Information We Collect</h2>
            <p>
              When you reserve private Umrah chauffeur transport through Royal Umrah Cabs, we collect only the necessary information required to coordinate your transfer: your full name, WhatsApp phone number, email address (optional), scheduled travel dates, flight number (for real-time flight delay tracking), and pickup/drop-off hotel addresses.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">2. How Your Information Is Used</h2>
            <p>
              Your contact and flight telemetry data are used exclusively for dispatch operations:
            </p>
            <ul className="list-disc pl-5 rtl:pr-5 space-y-1 text-xs">
              <li>Transmitting booking confirmations and driver details directly to your WhatsApp.</li>
              <li>Monitoring airport arrivals so your chauffeur is stationed before flight touchdown.</li>
              <li>Coordinating in-transit highway stops and hotel lobby meet-and-greets.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">3. Zero Selling of Personal Data</h2>
            <p>
              We never sell, rent, or trade your personal information to third-party marketing brokers or advertisers. Your data is shared strictly with your assigned chauffeur to facilitate your ground transfer safely and respectfully.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">4. Data Security &amp; Retention</h2>
            <p>
              All customer transmissions are protected by TLS/SSL encryption. Data is stored on secure cloud database servers with strict Row Level Security (RLS) policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">5. Contact Our Privacy Officer</h2>
            <p>
              For data access, correction, or deletion requests, contact our dispatch office at <code className="text-gold-dark font-mono">dispatch@royalumrahcabs.com</code> or via our dedicated 24/7 WhatsApp dispatch at <code className="text-gold-dark font-mono">+966 56 758 8261</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
