import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LOCALES, Locale, LOCALE_CONFIG, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { ThemeProvider } from '@/context/ThemeContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { Header } from '@/components/layout/Header';
import { CinematicFooterCta } from '@/components/layout/CinematicFooterCta';
import { Footer } from '@/components/layout/Footer';
import { FloatingUI } from '@/components/layout/FloatingUI';
import { AiChatWidget } from '@/components/chat/AiChatWidget';
import { JsonLd } from '@/components/seo/JsonLd';
import { cormorant, manrope, amiri, tajawal, notoDevanagari, notoUrdu, playfair, inter, cairo, ibmPlexArabic } from '@/app/fonts';

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
    robots: process.env.VERCEL_ENV === 'preview' ? {index: false, follow: false, noarchive: true} : {
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
    verification: {
      google: '8pd7FP8QmvXyHi6-R2uhh2tB5cAdgAdrHbBCDz9QMYE',
      other: {
        'msvalidate.01': 'C4DDA059F7EA445FDFCC5EB676171BFA',
      },
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
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} ${amiri.variable} ${tajawal.variable} ${notoDevanagari.variable} ${notoUrdu.variable} ${playfair.variable} ${inter.variable} ${cairo.variable} ${ibmPlexArabic.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('duyuf_theme_preference');
                  document.documentElement.dataset.comfortMode = localStorage.getItem('duyuf_comfort_mode') === 'on' ? 'on' : 'off';
                  var theme = (saved === 'dark' || saved === 'light') ? saved : 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[var(--bg-base)] text-[var(--text-primary)] antialiased selection:bg-[#A0783E]/20 selection:text-[var(--text-primary)] transition-colors duration-200">
        <JsonLd locale={validLocale} dict={dict} settings={settings} />
        <ThemeProvider>
          <CurrencyProvider defaultCurrency={defaultCurrency}>
            <Header locale={validLocale} dict={dict} settings={settings} />
            <main className="flex-1">{children}</main>
            <CinematicFooterCta locale={validLocale} dict={dict} settings={settings} />
            <Footer locale={validLocale} dict={dict} settings={settings} />
            <FloatingUI
              locale={validLocale}
              dict={dict}
              whatsappNumber={settings.whatsapp_number}
            />
            <AiChatWidget locale={validLocale} />
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
