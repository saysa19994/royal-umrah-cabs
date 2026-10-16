import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LOCALES, Locale, LOCALE_CONFIG } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingUI } from '@/components/layout/FloatingUI';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!LOCALES.includes(locale as Locale)) return {};
  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';

  return {
    title: {
      default: dict.meta.seoTitle,
      template: `%s | ${dict.meta.brand}`,
    },
    description: dict.meta.seoDescription,
    alternates: {
      canonical: `${baseUrl}/${validLocale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        'ms-MY': `${baseUrl}/ms`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.meta.seoTitle,
      description: dict.meta.seoDescription,
      locale: validLocale === 'ar' ? 'ar_SA' : validLocale === 'ms' ? 'ms_MY' : 'en_US',
      url: `${baseUrl}/${validLocale}`,
      siteName: dict.meta.brand,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const settings = await getSiteSettings();
  const dir = LOCALE_CONFIG[validLocale].dir;
  const defaultCurrency = LOCALE_CONFIG[validLocale].defaultCurrency;

  return (
    <div lang={validLocale} dir={dir} className="min-h-screen flex flex-col">
      <CurrencyProvider defaultCurrency={defaultCurrency}>
        <Header locale={validLocale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={validLocale} dict={dict} settings={settings} />
        <FloatingUI
          locale={validLocale}
          dict={dict}
          whatsappNumber={settings.whatsapp_number}
        />
      </CurrencyProvider>
    </div>
  );
}
