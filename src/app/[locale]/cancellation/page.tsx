import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

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
    title: dict.footer.refunds,
    description: 'Cancellation policy and refund terms for Royal Umrah Cabs passenger transport.',
    alternates: {
      canonical: `${baseUrl}/${locale}/cancellation`,
    },
  };
}

export default async function CancellationPage(props: LegalPageProps) {
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
            {dict.footer.refunds}
          </h1>
          <p className="mt-2 text-xs text-ink-muted">
            Transparent · Honest · Zero Penalty Prior to 24 Hours
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-xs space-y-6 text-sm text-ink-light leading-relaxed font-light">
          <div className="p-4 rounded-xl bg-gold-soft border border-gold-line text-ink flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-gold-dark shrink-0" />
            <span className="text-xs md:text-sm font-semibold">
              Free cancellation is allowed up to 24 hours prior to scheduled pickup time with zero fees.
            </span>
          </div>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">1. 24-Hour Free Cancellation Policy</h2>
            <p>
              We understand that flight schedules, Umrah visas, and family travel arrangements can change. You may cancel your reservation free of charge up to 24 hours prior to your scheduled pickup time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">2. No Prepayment Required = Immediate Peace of Mind</h2>
            <p>
              Because Royal Umrah Cabs operates on a transparent "Pay Upon Arrival" model, you do not need to wait weeks for credit card refunds. If you cancel your reservation before the 24-hour window, your booking is simply cancelled in our dispatch system without any financial deduction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">3. Cancellations Within 24 Hours</h2>
            <p>
              If your flight is cancelled or your schedule changes within 24 hours of pickup, please contact our 24/7 WhatsApp dispatch team immediately at <code className="text-gold-dark font-mono">+966 56 758 8261</code>. We will do everything possible to reassign your chauffeur to your new arrival time without penalty.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-xl font-bold text-ink">4. How to Cancel Your Booking</h2>
            <p>
              You can cancel your booking directly using our self-service management tool:
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}/manage-booking`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-xs"
              >
                <span>Go to Manage Booking</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
              <a
                href="https://wa.me/966567588261"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Contact Dispatch on WhatsApp</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
