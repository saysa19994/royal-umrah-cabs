'use client';

import React, { useState, useRef } from 'react';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { TurnstileWidget, TurnstileWidgetRef } from '@/components/common/TurnstileWidget';

interface ContactFormProps {
  locale: Locale;
  dict: Dictionary;
  whatsappNumber?: string;
}

const CONTACT_I18N: Record<
  Locale,
  {
    formSubtitle: string;
    waFallbackNotice: string;
    placeholderMsg: string;
    chatDirectWa: string;
  }
> = {
  ar: {
    formSubtitle: 'املأ النموذج أدناه وسيتم فتح محادثة فورية مع فريق العمليات',
    waFallbackNotice: 'إذا لم تفتح نافذة واتساب تلقائياً، اضغط على الزر أدناه:',
    placeholderMsg: 'اكتب عدد الركاب، والتاريخ، والمسار المطلوب وأي تفاصيل خاصة...',
    chatDirectWa: 'أو تواصل معنا مباشرة عبر واتساب',
  },
  en: {
    formSubtitle: 'Fill out the form below to initiate an immediate WhatsApp chat with dispatch.',
    waFallbackNotice: 'If WhatsApp did not open automatically, click the button below:',
    placeholderMsg: 'Specify passengers, travel dates, requested route, or special requests...',
    chatDirectWa: 'Or chat directly with us on WhatsApp',
  },
  ms: {
    formSubtitle: 'Sila isi borang di bawah untuk berhubung terus melalui WhatsApp dengan pihak operasi.',
    waFallbackNotice: 'Jika WhatsApp tidak dibuka secara automatik, sila klik butang di bawah:',
    placeholderMsg: 'Sila nyatakan bilangan jemaah, tarikh, laluan, atau permintaan khas...',
    chatDirectWa: 'Atau hubungi kami terus di WhatsApp',
  },
  id: {
    formSubtitle: 'Isi formulir di bawah untuk memulai percakapan langsung WhatsApp dengan tim operasional.',
    waFallbackNotice: 'Jika jendela WhatsApp tidak terbuka otomatis, klik tombol di bawah ini:',
    placeholderMsg: 'Sebutkan jumlah penumpang, tanggal perjalanan, rute yang diinginkan...',
    chatDirectWa: 'Atau hubungi kami langsung via WhatsApp',
  },
  ur: {
    formSubtitle: 'ڈسپیچ ٹیم کے ساتھ فوری واٹس ایپ چیٹ شروع کرنے کے لیے نیچے دیا گیا فارم پُر کریں۔',
    waFallbackNotice: 'اگر واٹس ایپ خودکار طریقے سے نہ کھلے تو نیچے دیے گئے بٹن پر کلک کریں:',
    placeholderMsg: 'مسافروں کی تعداد، سفر کی تاریخ، مطلوبہ روٹ یا خصوصی درخواستیں درج کریں...',
    chatDirectWa: 'یا براہ راست ہم سے واٹس ایپ پر رابطہ کریں',
  },
  fr: {
    formSubtitle: 'Remplissez le formulaire ci-dessous pour démarrer une conversation WhatsApp directe.',
    waFallbackNotice: 'Si WhatsApp ne s’ouvre pas automatiquement, cliquez sur le bouton ci-dessous :',
    placeholderMsg: 'Précisez le nombre de passagers, les dates, l’itinéraire ou demandes spéciales...',
    chatDirectWa: 'Ou discutez directement avec nous sur WhatsApp',
  },
  es: {
    formSubtitle: 'Complete el formulario para iniciar un chat inmediato por WhatsApp con operaciones.',
    waFallbackNotice: 'Si WhatsApp no se abrió automáticamente, haga clic en el botón siguiente:',
    placeholderMsg: 'Indique número de pasajeros, fechas de viaje, ruta o peticiones especiales...',
    chatDirectWa: 'O hable directamente con nosotros por WhatsApp',
  },
  de: {
    formSubtitle: 'Füllen Sie das Formular aus, um sofort per WhatsApp mit der Disposition zu chatten.',
    waFallbackNotice: 'Falls sich WhatsApp nicht automatisch öffnet, klicken Sie auf die Schaltfläche unten:',
    placeholderMsg: 'Geben Sie Passagiere, Reisedaten, gewünschte Route oder Sonderwünsche an...',
    chatDirectWa: 'Oder chatten Sie direkt mit uns auf WhatsApp',
  },
  tr: {
    formSubtitle: 'Operasyon ekibimizle anında WhatsApp görüşmesi başlatmak için formu doldurun.',
    waFallbackNotice: 'WhatsApp otomatik olarak açılmazsa lütfen aşağıdaki butona tıklayın:',
    placeholderMsg: 'Yolcu sayısını, seyahat tarihini, güzergahı ve özel istekleri belirtin...',
    chatDirectWa: 'Veya bizimle doğrudan WhatsApp üzerinden iletişime geçin',
  },
  hi: {
    formSubtitle: 'संचालन टीम के साथ तत्काल व्हाट्सएप चैट शुरू करने के लिए नीचे दिए गए फॉर्म को भरें।',
    waFallbackNotice: 'यदि व्हाट्सएप अपने आप नहीं खुलता है, तो नीचे दिए गए बटन पर क्लिक करें:',
    placeholderMsg: 'यात्रियों की संख्या, यात्रा की तारीख, वांछित मार्ग या विशेष अनुरोध बताएं...',
    chatDirectWa: 'या सीधे व्हाट्सएप पर हमसे चैट करें',
  },
};

export function ContactForm({
  locale,
  dict,
  whatsappNumber = '966567588261',
}: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [activeWaUrl, setActiveWaUrl] = useState<string>('');
  const turnstileRef = useRef<TurnstileWidgetRef>(null);

  const t = CONTACT_I18N[locale] || CONTACT_I18N.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) return;

    setIsSubmitting(true);

    const waText = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`;
    const targetUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`;
    setActiveWaUrl(targetUrl);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: typeof window !== 'undefined' ? window.location.pathname : '/contact',
          language: locale,
          customer_name: name,
          customer_phone: phone,
          customer_email: email,
          notes: message,
          'cf-turnstile-response': turnstileToken,
        }),
      });
    } catch {
      // non-blocking
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs text-start">
      <h3 className="font-display text-2xl font-bold text-ink mb-2">
        {dict.page_contact.formTitle}
      </h3>
      <p className="text-xs text-ink-muted mb-6 font-light">
        {t.formSubtitle}
      </p>

      {submitted ? (
        <div className="p-6 rounded-xl bg-gold-soft border border-gold-line text-start space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>{dict.page_contact.formSuccess}</span>
          </div>
          <p className="text-xs text-ink-muted">
            {t.waFallbackNotice}
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
              placeholder={t.placeholderMsg}
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
              <span>{t.chatDirectWa}</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
