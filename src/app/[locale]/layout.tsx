import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LOCALES, Locale, LOCALE_CONFIG, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingUI } from '@/components/layout/FloatingUI';
import { AiChatWidget } from '@/components/chat/AiChatWidget';
import { JsonLd } from '@/components/seo/JsonLd';
import { cormorant, manrope, amiri, tajawal, notoDevanagari, notoUrdu } from '@/app/fonts';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;

  if (!LOCALES.includes(locale as Locale)) return {};
  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.meta.seoTitle,
      template: `%s | ${dict.meta.brand}`,
    },
    description: dict.meta.seoDescription,
    authors: [{ name: 'Duyuf Alrahman VIP Chauffeur Team' }],
    creator: 'Duyuf Alrahman VIP',
    publisher: 'Duyuf Alrahman VIP',
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
    alternates: getLocalizedAlternates(validLocale),
    openGraph: {
      title: dict.meta.seoTitle,
      description: dict.meta.seoDescription,
      locale: {
        en: 'en_US',
        ar: 'ar_SA',
        ms: 'ms_MY',
        id: 'id_ID',
        fr: 'fr_FR',
        es: 'es_ES',
        de: 'de_DE',
        hi: 'hi_IN',
        ur: 'ur_PK',
        tr: 'tr_TR',
      }[validLocale] || 'en_US',
      alternateLocale: LOCALES.filter((l) => l !== validLocale).map(
        (l) =>
          ({
            en: 'en_US',
            ar: 'ar_SA',
            ms: 'ms_MY',
            id: 'id_ID',
            fr: 'fr_FR',
            es: 'es_ES',
            de: 'de_DE',
            hi: 'hi_IN',
            ur: 'ur_PK',
            tr: 'tr_TR',
          }[l] || 'en_US')
      ),
      url: `${baseUrl}/${validLocale}`,
      siteName: dict.meta.brand,
      images: [
        {
          url: `${baseUrl}/icon-512.png`,
          width: 512,
          height: 512,
          alt: `${dict.meta.brand} - VIP Pilgrim Transport`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.seoTitle,
      description: dict.meta.seoDescription,
      images: [`${baseUrl}/icon-512.png`],
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const settings = await getSiteSettings();
  const dir = LOCALE_CONFIG[validLocale].dir;
  const defaultCurrency = LOCALE_CONFIG[validLocale].defaultCurrency;

  return (
    <html
      lang={validLocale}
      dir={dir}
      className={`${cormorant.variable} ${manrope.variable} ${amiri.variable} ${tajawal.variable} ${notoDevanagari.variable} ${notoUrdu.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-bg text-body antialiased selection:bg-gold-soft selection:text-ink">
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
          <AiChatWidget locale={validLocale} />
        </CurrencyProvider>
      </body>
    </html>
  );
}
