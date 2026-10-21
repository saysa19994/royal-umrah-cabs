import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { ContactForm } from '@/components/contact/ContactForm';
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface ContactPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: ContactPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  return {
    title: dict.page_contact.title,
    description: dict.page_contact.subtitle,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
    },
  };
}

export default async function ContactPage(props: ContactPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const settings = await getSiteSettings();

  const formattedPhone = settings.phone ? `+${settings.phone.replace(/[^0-9]/g, '')}` : '+966567588261';

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.nav.contact}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.page_contact.title}
          </h1>
          <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            {dict.page_contact.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Direct Cards */}
          <div className="space-y-6 text-start">
            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/${settings.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface rounded-2xl p-6 border border-border shadow-xs hover:border-emerald-500/60 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-ink group-hover:text-emerald-700 transition-colors">
                  {dict.page_contact.whatsappDirect}
                </h3>
                <p className="text-xs text-ink-muted mt-1 font-light leading-relaxed">
                  {dict.page_contact.whatsappDesc}
                </p>
                <span className="inline-block mt-2 text-xs font-mono font-bold text-emerald-600 dir-ltr">
                  +{settings.whatsapp_number}
                </span>
              </div>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${formattedPhone}`}
              className="bg-surface rounded-2xl p-6 border border-border shadow-xs hover:border-gold-dark/60 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line text-gold-dark flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-ink group-hover:text-gold-dark transition-colors">
                  {dict.page_contact.callDirect}
                </h3>
                <p className="text-xs text-ink-muted mt-1 font-light leading-relaxed">
                  {dict.page_contact.callDesc}
                </p>
                <span className="inline-block mt-2 text-xs font-mono font-bold text-gold-dark dir-ltr">
                  {formattedPhone}
                </span>
              </div>
            </a>

            {/* Email Support */}
            <a
              href={`mailto:${settings.email}`}
              className="bg-surface rounded-2xl p-6 border border-border shadow-xs hover:border-gold-dark/60 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line text-gold-dark flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-ink group-hover:text-gold-dark transition-colors">
                  {dict.page_contact.emailDirect}
                </h3>
                <p className="text-xs text-ink-muted mt-1 font-light leading-relaxed">
                  {dict.page_contact.emailDesc}
                </p>
                <span className="inline-block mt-2 text-xs font-mono font-bold text-gold-dark">
                  {settings.email}
                </span>
              </div>
            </a>

            {/* Hubs & Working Hours */}
            <div className="bg-surface rounded-2xl p-6 border border-border space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                <MapPin className="w-4 h-4 text-gold-dark shrink-0" />
                <span>
                  {locale === 'ar'
                    ? `المحطات التشغيلية: ${settings.address_cities?.join('، ') || 'مكة المكرمة، المدينة المنورة، جدة'}`
                    : locale === 'ms'
                    ? `Pusat Operasi: ${settings.address_cities?.join(', ') || 'Makkah, Madinah, Jeddah'}`
                    : `Operational Hubs: ${settings.address_cities?.join(', ') || 'Makkah, Madinah, Jeddah'}`}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                <Clock className="w-4 h-4 text-gold-dark shrink-0" />
                <span>
                  {locale === 'ar'
                    ? 'ساعات العمل: 24 ساعة يومياً طوال أيام الأسبوع'
                    : locale === 'ms'
                    ? 'Waktu Operasi: 24 Jam Setiap Hari'
                    : 'Dispatch Hours: 24 Hours / 7 Days a Week'}
                </span>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <ContactForm locale={locale} dict={dict} whatsappNumber={settings.whatsapp_number} />
        </div>
      </div>
    </div>
  );
}
