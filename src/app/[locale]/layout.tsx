import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LOCALES, Locale, LOCALE_CONFIG } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingUI } from '@/components/layout/FloatingUI';
import { JsonLd } from '@/components/seo/JsonLd';

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
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.meta.seoTitle,
      template: `%s | ${dict.meta.brand}`,
    },
    description: dict.meta.seoDescription,
    authors: [{ name: 'Royal Umrah Cabs Dispatch Team' }],
    creator: 'Royal Umrah Cabs',
    publisher: 'Royal Umrah Cabs',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${validLocale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        ms: `${baseUrl}/ms`,
        fr: `${baseUrl}/fr`,
        es: `${baseUrl}/es`,
        id: `${baseUrl}/id`,
        hi: `${baseUrl}/hi`,
        de: `${baseUrl}/de`,
        ur: `${baseUrl}/ur`,
        'en-GB': `${baseUrl}/en`,
        'en-US': `${baseUrl}/en`,
        'en-CA': `${baseUrl}/en`,
        'en-IN': `${baseUrl}/en`,
        'en-PK': `${baseUrl}/en`,
        'fr-FR': `${baseUrl}/fr`,
        'fr-CA': `${baseUrl}/fr`,
        'es-ES': `${baseUrl}/es`,
        'de-DE': `${baseUrl}/de`,
        'id-ID': `${baseUrl}/id`,
        'ms-MY': `${baseUrl}/ms`,
        'hi-IN': `${baseUrl}/hi`,
        'ur-PK': `${baseUrl}/ur`,
        'ar-SA': `${baseUrl}/ar`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.meta.seoTitle,
      description: dict.meta.seoDescription,
      locale: validLocale === 'ar' ? 'ar_SA' : validLocale === 'ms' ? 'ms_MY' : 'en_US',
      alternateLocale: validLocale === 'en' ? ['ar_SA', 'ms_MY'] : validLocale === 'ar' ? ['en_US', 'ms_MY'] : ['en_US', 'ar_SA'],
      url: `${baseUrl}/${validLocale}`,
      siteName: dict.meta.brand,
      images: [
        {
          url: `${baseUrl}/assets/images/staria_exterior.jpg`,
          width: 1200,
          height: 630,
          alt: `${dict.meta.brand} - VIP Pilgrim Transport`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.seoTitle,
      description: dict.meta.seoDescription,
      images: [`${baseUrl}/assets/images/staria_exterior.jpg`],
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
      <JsonLd locale={validLocale} dict={dict} settings={settings} />
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
