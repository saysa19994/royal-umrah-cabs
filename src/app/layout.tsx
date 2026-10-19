import type { Metadata } from 'next';
import { cormorant, manrope, amiri, tajawal } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app'),
  title: 'Royal Umrah Cabs | Private Umrah Chauffeur & Pilgrim Transport',
  description: 'Private Umrah taxi and luxury chauffeur transport in Makkah, Madinah, and Jeddah Airport (KAIA).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${cormorant.variable} ${manrope.variable} ${amiri.variable} ${tajawal.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-bg text-body antialiased selection:bg-gold-soft selection:text-ink">
        {children}
      </body>
    </html>
  );
}
