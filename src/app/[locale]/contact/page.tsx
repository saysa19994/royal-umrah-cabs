import React from 'react';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { ContactForm } from '@/components/contact/ContactForm';
import { MessageCircle, Phone, Mail, Clock, Headphones } from 'lucide-react';

interface ContactPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: ContactPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  return {
    title: `${dict.page_contact.title} | Duyuf Alrahman VIP`,
    description: dict.page_contact.subtitle,
    alternates: getLocalizedAlternates(locale, '/contact'),
  };
}

export default async function ContactPage(props: ContactPageProps) {
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  const settings = await getSiteSettings();

  const mainWa = settings.whatsapp_number || '966567588261';
  const secondWa = settings.whatsapp_number_secondary || '966505316971';
  const phoneCall = settings.phone || '+966505316971';

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
          <div className="space-y-4 text-start">
            {/* Primary WhatsApp Direct */}
            <a
              href={`https://wa.me/${mainWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface rounded-2xl p-5 border border-border shadow-xs hover:border-emerald-500/60 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base md:text-lg text-ink group-hover:text-emerald-700 transition-colors">
                    {locale === 'ar' ? 'واتساب العمليات والحجوزات (الأساسي)' : 'WhatsApp Operations (Main)'}
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {locale === 'ar' ? 'الخط 1' : 'Line 1'}
                  </span>
                </div>
                <p className="text-xs text-ink-muted mt-1 font-light leading-relaxed">
                  {locale === 'ar' ? 'للاستفسارات وحجز الرحلات الفورية وتأكيد بيانات الوصول.' : 'Instant quote, route reservation, and airport arrival coordination.'}
                </p>
                <span className="inline-block mt-2 text-xs font-mono font-bold text-emerald-600 dir-ltr">
                  +{mainWa}
                </span>
              </div>
            </a>

            {/* Secondary WhatsApp Direct */}
            <a
              href={`https://wa.me/${secondWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface rounded-2xl p-5 border border-border shadow-xs hover:border-emerald-500/60 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Headphones className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base md:text-lg text-ink group-hover:text-emerald-700 transition-colors">
                    {locale === 'ar' ? 'واتساب المتابعة والمناوبة (الاحتياطي)' : 'WhatsApp Dispatch & Support (Secondary)'}
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                    {locale === 'ar' ? 'الخط 2' : 'Line 2'}
                  </span>
                </div>
                <p className="text-xs text-ink-muted mt-1 font-light leading-relaxed">
                  {locale === 'ar' ? 'متابعة السائقين وحالات الطوارئ وخدمة المجموعات.' : 'Driver dispatch tracking, standby assistance, and group transfers.'}
                </p>
                <span className="inline-block mt-2 text-xs font-mono font-bold text-emerald-600 dir-ltr">
                  +{secondWa}
                </span>
              </div>
            </a>

            {/* Direct Phone Call (Strictly distinct number from Primary WhatsApp) */}
            <a
              href={`tel:${phoneCall}`}
              className="bg-surface rounded-2xl p-5 border border-border shadow-xs hover:border-gold-dark/60 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line text-gold-dark flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base md:text-lg text-ink group-hover:text-gold-dark transition-colors">
                  {locale === 'ar' ? 'الاتصال الهاتفي المباشر' : 'Direct Voice Line'}
                </h3>
                <p className="text-xs text-ink-muted mt-1 font-light leading-relaxed">
                  {locale === 'ar' ? 'تحدث مباشرة مع مشرف المناوبة للنقل الخاص.' : 'Speak directly with our duty transport supervisor.'}
                </p>
                <span className="inline-block mt-2 text-xs font-mono font-bold text-gold-dark dir-ltr">
                  {phoneCall}
                </span>
              </div>
            </a>

            {/* Official Email */}
            <a
              href={`mailto:${settings.email}`}
              className="bg-surface rounded-2xl p-5 border border-border shadow-xs hover:border-gold-dark/60 transition-all flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-soft border border-gold-line text-gold-dark flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base md:text-lg text-ink group-hover:text-gold-dark transition-colors">
                  {locale === 'ar' ? 'البريد الإلكتروني الرسمي' : 'Official Email'}
                </h3>
                <p className="text-xs text-ink-muted mt-1 font-light leading-relaxed">
                  {locale === 'ar' ? 'للحجوزات المسبقة ومراسلات الوكالات وشركات السياحة.' : 'Corporate inquiries, advance schedules, and agency partnerships.'}
                </p>
                <span className="inline-block mt-2 text-xs font-bold text-gold-dark">
                  {settings.email}
                </span>
              </div>
            </a>

            {/* Support Hours */}
            <div className="bg-surface rounded-2xl p-5 border border-border flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-bg border border-border text-ink-muted flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base md:text-lg text-ink">
                  {locale === 'ar' ? 'ساعات العمل والمناوبة' : 'Operating Hours'}
                </h3>
                <p className="text-xs text-ink-muted mt-1 font-light leading-relaxed">
                  {locale === 'ar' ? 'خدمة الاستقبال والتوصيل متاحة على مدار 24 ساعة طوال أيام الأسبوع.' : 'Chauffeur and dispatch services available 24 hours / 7 days a week across Makkah, Madinah, and Jeddah.'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-surface rounded-3xl p-8 md:p-10 border border-border shadow-sm text-start">
            <h2 className="font-display font-semibold text-2xl text-ink mb-2">
              {dict.page_contact.formTitle}
            </h2>
            <p className="text-sm text-ink-muted font-light mb-8">
              {dict.page_contact.subtitle}
            </p>
            <ContactForm locale={locale} dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
