import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ShieldCheck, CheckCircle2, UserCheck, Wrench, HeartHandshake, PhoneCall, ArrowRight } from 'lucide-react';

interface SafetyPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: SafetyPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  return {
    title: 'Safety Standards & Chauffeur Protocol',
    description: 'Learn about our rigorous safety standards, vehicle inspections, hygiene protocols, and vetted chauffeurs for your sacred Umrah journey.',
    alternates: {
      canonical: `${baseUrl}/${locale}/safety`,
    },
  };
}

export default async function SafetyPage(props: SafetyPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pilgrim Peace of Mind</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            Safety Standards &amp; Chauffeur Protocol
          </h1>
          <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            Your sacred pilgrimage demands uncompromising safety, vehicle hygiene, and professional courtesy. Discover how Royal Umrah Cabs protects your family from arrival to departure.
          </p>
        </div>

        {/* PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Pillar 1 */}
          <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-5">
              <UserCheck className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">Vetted Chauffeurs</h2>
            <p className="text-sm text-ink-muted leading-relaxed font-light mb-4">
              Every driver undergoes rigorous background verification, commercial license validation, and behavioral training before escorting pilgrims.
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-body">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Multilingual drivers fluent in Arabic, English, and Urdu</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Full familiarity with Makkah Haram zone checkpoints &amp; Madinah hotels</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Strict dress code and courteous, respectful demeanor</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-5">
              <Wrench className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">25-Point Vehicle Inspection</h2>
            <p className="text-sm text-ink-muted leading-relaxed font-light mb-4">
              Vehicles undergo comprehensive daily mechanical checks before dispatch to endure the high-speed Hijrah Highway and summer temperatures.
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-body">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Tire pressure, tread depth, and braking systems verified daily</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Dual high-output air conditioning inspected before every trip</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Strict non-smoking cabin policy enforced without exception</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-5">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">Family &amp; Elder Comfort</h2>
            <p className="text-sm text-ink-muted leading-relaxed font-light mb-4">
              We understand that families travel with elderly parents and young children who require extra care, patient loading, and smooth driving.
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-body">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Low floorboards and wide doorways for effortless elderly boarding</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Smooth deceleration and steady highway speeds without abrupt turns</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Flexible rest stops for prayer, restroom, and refreshments</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4 */}
          <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-5">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-2xl text-ink mb-3">24/7 Operations Dispatch</h2>
            <p className="text-sm text-ink-muted leading-relaxed font-light mb-4">
              Our central operations team monitors your journey around the clock to provide instant assistance whenever required.
            </p>
            <ul className="space-y-2 text-xs md:text-sm text-body">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Flight arrival tracking synchronized with terminal displays</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Live WhatsApp dispatch coordinator assigned to your booking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                <span>Immediate vehicle replacement in the rare event of traffic or delay</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA CARD */}
        <div className="bg-charcoal text-white rounded-3xl p-8 md:p-12 text-center border border-white/10 shadow-lg">
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
            Travel with Total Peace of Mind
          </h3>
          <p className="text-white/80 text-sm max-w-xl mx-auto font-light mb-6">
            Book your private Umrah transfer today with fixed pricing, no prepayment required, and pay cash or card upon arrival.
          </p>
          <Link
            href={`/${locale}/booking`}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-gold"
          >
            <span>{dict.hero.ctaBook}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
