'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Headphones,
  Car,
  HandCoins,
} from 'lucide-react';

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}

export function Footer({ locale, dict, settings }: FooterProps) {
  const mainWa = settings.whatsapp_number || '966567588261';
  const secondWa = settings.whatsapp_number_secondary || '966505316971';
  const waUrl = `https://wa.me/${mainWa}`;
  const secondWaUrl = `https://wa.me/${secondWa}`;
  const telUrl = `tel:${settings.phone || '+966505316971'}`;

  return (
    <footer className="bg-[#0A0F1D] text-slate-300 border-t border-gold/20 mt-auto pb-20 md:pb-0 relative overflow-hidden">
      {/* LUXURY AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* 5-COLUMN MAIN GRID */}
      <div className="container mx-auto px-4 max-w-7xl pt-14 pb-10 md:pt-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 text-start">
          {/* COL 1: WORDMARK, SHORT TAGLINE, WHATSAPP & CALL BUTTONS */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href={locale === 'en' ? '/' : `/${locale}`} className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gold/40 flex items-center justify-center shadow-xs shrink-0 bg-[#0A0F1D]">
                <Image
                  src="/icon-192.png"
                  alt="Duyuf Alrahman VIP"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-start">
                <span className="font-display font-bold text-lg md:text-xl uppercase tracking-wide text-white">
                  {locale === 'ar' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
                </span>
                <span className="text-[10px] font-bold text-gold tracking-[0.16em] uppercase">
                  {locale === 'ar' ? 'نقل خاص لضيوف الرحمن' : 'Executive Chauffeur Service'}
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {locale === 'ar'
                ? 'الخدمة الخاصة لنقل ضيوف الرحمن بين مطار جدة ومكة المكرمة والمدينة المنورة. أسطول VIP وسائقون محترفون لخدمتكم بأعلى معايير الراحة والالتزام.'
                : 'Premier private chauffeur transport for Umrah pilgrims across Jeddah Airport, Makkah, and Madinah. Transparent fixed rates, zero deposit, and 24/7 assistance.'}
            </p>

            {/* DIRECT ACTION BUTTONS (BOTH WHATSAPP NUMBERS + PHONE) */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] h-10 px-2 rounded-btn bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label="WhatsApp Operations"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'واتساب العمليات' : 'WhatsApp Main'}</span>
                </a>
                <a
                  href={secondWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] h-10 px-2 rounded-btn bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label="WhatsApp Dispatch"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'واتساب المتابعة' : 'WhatsApp 2'}</span>
                </a>
              </div>
              <a
                href={telUrl}
                className="w-full inline-flex items-center justify-center gap-1.5 min-h-[44px] h-10 px-3 rounded-btn border border-gold/40 bg-white/5 text-gold text-xs font-semibold hover:bg-gold hover:text-slate-950 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'اتصال مباشر' : 'Voice Dispatch'}: {settings.phone || '+966505316971'}</span>
              </a>
            </div>

            {/* DEDICATED PILGRIM CARE BADGE */}
            <div className="pt-2 text-[11px] text-slate-300 flex items-center gap-2">
              <Car className="w-4 h-4 text-gold shrink-0" />
              <span>{locale === 'ar' ? 'خدمة نقل خاص مخصصة لضيوف الرحمن' : 'Dedicated Private Chauffeur for Umrah Pilgrims'}</span>
            </div>
          </div>

          {/* COL 2: POPULAR ROUTES */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3.5 font-display text-sm border-b border-gold/20 pb-1.5">
              {dict.footer.popularRoutes}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href={`/${locale}/routes/jeddah-airport-to-makkah`} className="hover:text-gold transition-colors inline-block py-1">
                  Jeddah Airport to Makkah
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/makkah-to-madinah`} className="hover:text-gold transition-colors inline-block py-1">
                  Makkah to Madinah VIP
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/madinah-to-makkah`} className="hover:text-gold transition-colors inline-block py-1">
                  Madinah to Makkah
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/makkah-to-jeddah-airport`} className="hover:text-gold transition-colors inline-block py-1">
                  Makkah to Jeddah Airport
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/jeddah-to-madinah`} className="hover:text-gold transition-colors inline-block py-1">
                  Jeddah Airport to Madinah
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/madinah-airport-to-hotel`} className="hover:text-gold transition-colors inline-block py-1">
                  Madinah Airport to Hotel
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: SERVICES & FLEET */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3.5 font-display text-sm border-b border-gold/20 pb-1.5">
              {dict.footer.servicesFleet}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href={`/${locale}/fleet/gmc-yukon-xl`} className="hover:text-gold transition-colors inline-block py-1">
                  GMC Yukon XL VIP (7 Seats)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/hyundai-staria`} className="hover:text-gold transition-colors inline-block py-1">
                  Hyundai Staria VIP (7 Seats)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/toyota-camry`} className="hover:text-gold transition-colors inline-block py-1">
                  Toyota Camry Executive (4 Seats)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/toyota-hiace`} className="hover:text-gold transition-colors inline-block py-1">
                  Toyota HiAce Family (10 Seats)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/toyota-coaster`} className="hover:text-gold transition-colors inline-block py-1">
                  Toyota Coaster VIP Coach (21 Seats)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold transition-colors inline-block py-1">
                  Makkah & Madinah Ziyarat Tours
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold transition-colors inline-block py-1">
                  Hourly Chauffeur Rental
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: PILGRIM GUIDES & TOOLS */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3.5 font-display text-sm border-b border-gold/20 pb-1.5">
              {locale === 'ar' ? 'أدلة المعتمرين والخدمات' : 'Pilgrim Guides & Tools'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-gold transition-colors inline-block py-1 text-gold font-bold">
                  {locale === 'ar' ? '📖 مقالات ومدونة VIP' : '📖 VIP Umrah Blog'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog/vip-umrah-transport-jeddah-to-makkah`} className="hover:text-gold transition-colors inline-block py-1 text-amber-300 font-semibold">
                  {locale === 'ar' ? '✨ دليل سيارة VIP من مطار جدة لمكة' : '✨ VIP Chauffeur: Jeddah to Makkah'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides/jeddah-airport-arrival-pickup-guide`} className="hover:text-gold transition-colors inline-block py-1">
                  {locale === 'ar' ? 'دليل الوصول بمطار جدة (KAIA)' : 'Jeddah Airport Arrival Guide'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides/jeddah-airport-to-makkah-taxi-vs-train`} className="hover:text-gold transition-colors inline-block py-1">
                  {locale === 'ar' ? 'مقارنة: تاكسي المطار أم قطار الحرمين' : 'Airport Taxi vs Haramain Train'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides/how-to-choose-the-right-vehicle-for-umrah-group`} className="hover:text-gold transition-colors inline-block py-1">
                  {locale === 'ar' ? 'دليل اختيار سيارة العمرة المناسبة' : 'Choosing the Right Umrah Vehicle'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/guides/makkah-ziyarat-places-routes-transport`} className="hover:text-gold transition-colors inline-block py-1">
                  {locale === 'ar' ? 'دليل مزارات مكة المكرمة' : 'Makkah Ziyarat Complete Guide'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/track-booking`} className="hover:text-gold transition-colors inline-block py-1 text-gold font-semibold">
                  {dict.nav.trackBooking || (locale === 'ar' ? 'تتبع رحلتك المباشرة' : 'Track Your Booking')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partners`} className="hover:text-gold transition-colors inline-block py-1 text-gold/80">
                  {locale === 'ar' ? 'بوابة وكالات السفر والشركاء' : 'Travel Agency Portal'}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 5: LEGAL & TRUST */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3.5 font-display text-sm border-b border-gold/20 pb-1.5">
              {locale === 'ar' ? 'السياسات والضمانات' : 'Legal & Guarantees'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href={`/${locale}/cancellation`} className="hover:text-gold transition-colors inline-block py-1">
                  {dict.footer.refunds || (locale === 'ar' ? 'سياسة الإلغاء المجاني' : 'Cancellation & Refunds')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-gold transition-colors inline-block py-1">
                  {dict.footer.terms || (locale === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-gold transition-colors inline-block py-1">
                  {dict.footer.privacy || (locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/safety`} className="hover:text-gold transition-colors inline-block py-1">
                  {locale === 'ar' ? 'معايير الأمان والسلامة' : 'Safety Standards'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="hover:text-gold transition-colors inline-block py-1">
                  {dict.faq?.heading || (locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQs')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-gold transition-colors inline-block py-1">
                  {dict.nav.contact || (locale === 'ar' ? 'اتصل بخدمة العملاء' : 'Contact Support')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* PAYMENT BADGES STRIP (SHOW ONLY PAY ON ARRIVAL BY DEFAULT - PHASE 1.6) */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold">
              {locale === 'ar' ? 'طريقة الدفع (100% نقداً للسائق بالريال أو الدولار)' : 'Payment Method (100% Cash to Chauffeur in SAR or USD)'}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-lg bg-gold/15 border border-gold/40 text-gold text-xs font-bold inline-flex items-center gap-1.5">
                <HandCoins className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'الدفع نقداً للسائق عند الوصول (ريال سعودي / دولار أمريكي)' : 'Cash Paid Directly to Chauffeur on Arrival (SAR / USD)'}</span>
              </span>

              </div>
          </div>

          <div className="flex flex-col gap-1 text-xs text-slate-300">
            <span className="font-semibold text-white">
              {locale === 'ar' ? 'ضمان ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP Assurance'}
            </span>
            <span>
              {locale === 'ar'
                ? 'لا نطلب أية دفعة مقدمة؛ الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل (ريال سعودي أو دولار أمريكي).'
                : 'Zero upfront deposit required. Cash paid to the driver after the journey is completed and the customer reaches the requested destination (SAR or USD).'}
            </span>
          </div>
        </div>
      </div>

      {/* BEIGE TRUST STRIP (IN OBSIDIAN & GOLD THEME) */}
      <div className="border-y border-gold/20 bg-[#060A14] py-3.5 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
            <span>{dict.trust_strip.fixedPrices}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold shrink-0" />
            <span>{locale === 'ar' ? `${settings.airport_waiting_minutes || 60} دقيقة انتظار مجاني بالمطار` : `${settings.airport_waiting_minutes || 60} Min Airport Wait Time`}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
            <span>{dict.trust_strip.payOnArrival}</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-gold shrink-0" />
            <span>{dict.trust_strip.support247}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL & COPYRIGHT BAR */}
      <div className="container mx-auto px-4 max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 relative z-10">
        <p>
          © {new Date().getFullYear()} {locale === 'ar' ? 'ضيوف الرحمن VIP (Duyuf Alrahman VIP). جميع الحقوق محفوظة.' : 'Duyuf Alrahman VIP. All rights reserved.'}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <Link href={`/${locale}/privacy`} className="hover:text-gold transition-colors py-1">
            {dict.footer.privacy}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-gold transition-colors py-1">
            {dict.footer.terms}
          </Link>
          <Link href={`/${locale}/cancellation`} className="hover:text-gold transition-colors py-1">
            {dict.footer.refunds}
          </Link>
          <Link href={`/${locale}/cookies`} className="hover:text-gold transition-colors py-1">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
