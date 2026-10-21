import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Building2, Handshake, Users, ArrowRight, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { getSiteSettings } from '@/lib/settings';

interface PartnersPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: PartnersPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  return {
    title: 'Travel Agency & B2B Umrah Partnerships',
    description: 'Partner with Royal Umrah Cabs for reliable ground transport for your Umrah pilgrim groups across Jeddah, Makkah, and Madinah.',
    alternates: {
      canonical: `${baseUrl}/${locale}/partners`,
    },
  };
}

export default async function PartnersPage(props: PartnersPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const settings = await getSiteSettings();

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <Handshake className="w-3.5 h-3.5" />
            <span>Travel Agencies &amp; Group Operators</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            Partner with Royal Umrah Cabs
          </h1>
          <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            We partner with travel agencies, group organizers, and international tour operators worldwide to deliver dependable VIP pilgrim transport across Jeddah, Makkah, and Madinah.
          </p>
        </div>

        {/* VALUE PROP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-ink mb-2">B2B Volume Rates</h3>
            <p className="text-xs text-ink-muted leading-relaxed font-light">
              Access fixed wholesale rates for season-long contracts, multiple flight arrivals, and full itinerary packages for pilgrim delegations.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-ink mb-2">Dedicated Account Lead</h3>
            <p className="text-xs text-ink-muted leading-relaxed font-light">
              One central WhatsApp dispatch coordinator manages all your group manifests, flight updates, and hotel drop-offs in real time.
            </p>
          </div>

          <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-ink mb-2">Detailed Invoicing</h3>
            <p className="text-xs text-ink-muted leading-relaxed font-light">
              Transparent itemized trip receipts, passenger manifest confirmations, and flexible corporate settlement options.
            </p>
          </div>
        </div>

        {/* PARTNERSHIP FORM / CONTACT BOX */}
        <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border shadow-xs mb-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
              Ready to Discuss Group Transportation?
            </h2>
            <p className="text-sm text-ink-muted font-light leading-relaxed">
              Contact our Agency Relations team with your group schedule, estimated passenger counts, and route requirements. We respond within 2 hours.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/${settings.whatsapp_number}?text=Hello%20Royal%20Umrah%20Cabs,%20I%20am%20a%20travel%20agency%20operator%20interested%20in%20partnering%20for%20ground%20transfers.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Agency Relations</span>
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-btn border border-border text-ink font-semibold text-xs hover:border-gold-dark transition-colors"
              >
                <span>Send Formal Request</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
