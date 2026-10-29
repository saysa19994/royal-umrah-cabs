'use client';

import React, { useState, useRef } from 'react';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { TurnstileWidget, TurnstileWidgetRef } from '@/components/common/TurnstileWidget';
import { trackEvent } from '@/lib/analytics';

interface ContactFormProps {
  locale: Locale;
  dict: Dictionary;
  whatsappNumber?: string;
}

export function ContactForm({ locale, dict, whatsappNumber = '966567588261' }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetRef>(null);
  const [activeWaUrl, setActiveWaUrl] = useState(`https://wa.me/${whatsappNumber}`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !turnstileToken) {
      trackEvent({
        event: 'booking_form_validation_failed',
        form: 'contact_form',
        failed_fields: [
          ...(!name.trim() ? ['name'] : []),
          ...(!phone.trim() ? ['phone'] : []),
          ...(!turnstileToken ? ['turnstile'] : []),
        ],
      });
      return;
    }

    setIsSubmitting(true);
    trackEvent({
      event: 'whatsapp_handoff_initiated',
      source: 'contact_form',
    });

    // Build pre-filled WhatsApp message
    const waText =
      `*Inquiry - Duyuf Alrahman VIP*\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      (email ? `*Email:* ${email}\n` : '') +
      `*Details:* ${message || 'I would like to inquire about Umrah chauffeur transfer.'}`;

    let waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`;

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: typeof window !== 'undefined' ? window.location.pathname : '',
          language: locale,
          customer_name: name,
          customer_phone: phone,
          notes: message || 'Contact form inquiry',
          'cf-turnstile-response': turnstileToken,
          source_utm: {
            referrer: typeof document !== 'undefined' ? document.referrer : '',
            url: typeof window !== 'undefined' ? window.location.href : '',
          },
        }),
      });

      const data = await res.json();
      if (data?.whatsapp_url) {
        waUrl = data.whatsapp_url;
      }
      trackEvent({
        event: 'booking_request_saved',
        service_type: 'inquiry',
        is_lead_only: true,
      });
    } catch (err) {
      console.error('Lead tracking error, continuing to WhatsApp:', err);
    } finally {
      setIsSubmitting(false);
    }

    setActiveWaUrl(waUrl);
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs text-start">
      <h3 className="font-display text-2xl font-bold text-ink mb-2">
        {dict.page_contact.formTitle}
      </h3>
      <p className="text-xs text-ink-muted mb-6 font-light">
        {locale === 'ar'
          ? 'املأ النموذج أدناه وسيتم فتح محادثة فورية مع فريق العمليات'
          : locale === 'ms'
          ? 'Sila isi borang di bawah untuk berhubung terus melalui WhatsApp dengan pihak operasi'
          : 'Fill out the form below to initiate an immediate WhatsApp chat with dispatch.'}
      </p>

      {submitted ? (
        <div className="p-6 rounded-xl bg-gold-soft border border-gold-line text-start space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>{dict.page_contact.formSuccess}</span>
          </div>
          <p className="text-xs text-ink-muted">
            {locale === 'ar'
              ? 'إذا لم تفتح نافذة واتساب تلقائياً، اضغط على الزر أدناه:'
              : locale === 'ms'
              ? 'Jika WhatsApp tidak dibuka secara automatik, sila klik butang di bawah:'
              : 'If WhatsApp did not open automatically, click the button below:'}
          </p>
          <a
            href={activeWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp (+{whatsappNumber})</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              {dict.page_contact.formName} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ahmad Al-Sayed"
              className="w-full h-11 px-3.5 text-xs rounded-lg border border-border bg-surface text-ink focus:ring-1 focus:ring-gold-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              {dict.page_contact.formPhone} *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +60 12 345 6789 or +966 50..."
              className="w-full h-11 px-3.5 text-xs rounded-lg border border-border bg-surface text-ink focus:ring-1 focus:ring-gold-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              {dict.page_contact.formEmail}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. pilgrim@example.com"
              className="w-full h-11 px-3.5 text-xs rounded-lg border border-border bg-surface text-ink focus:ring-1 focus:ring-gold-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              {dict.page_contact.formMessage}
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                locale === 'ar'
                  ? 'اكتب عدد الركاب، والتاريخ، والمسار المطلوب...'
                  : locale === 'ms'
                  ? 'Sila nyatakan bilangan jemaah, tarikh, dan laluan yang diperlukan...'
                  : 'Specify passengers, travel dates, or any special requests...'
              }
              className="w-full p-3.5 text-xs rounded-lg border border-border bg-surface text-ink focus:ring-1 focus:ring-gold-dark resize-none"
            />
          </div>

          <div className="py-2">
            <TurnstileWidget
              ref={turnstileRef}
              locale={locale}
              onVerify={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setTurnstileToken(null)}
            />
          </div>

          <button
            type="submit"
            disabled={!turnstileToken || isSubmitting}
            className="w-full h-12 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>{dict.page_contact.formSubmit}</span>
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>
                {locale === 'ar'
                  ? 'أو تواصل معنا مباشرة عبر واتساب'
                  : locale === 'ms'
                  ? 'Atau hubungi kami terus di WhatsApp'
                  : 'Or chat directly with us on WhatsApp'}
              </span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
