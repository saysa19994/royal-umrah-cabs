import type { Metadata } from 'next';
import { cormorant, manrope, amiri, tajawal } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com'),
  title: 'Royal Umrah Cabs | Private Umrah Chauffeur & Pilgrim Transport',
  description: 'Private Umrah taxi and luxury chauffeur transport in Makkah, Madinah, and Jeddah Airport (KAIA).',
  verification: {
    google: '8pd7FP8QmvXyHi6-R2uhh2tB5cAdgAdrHbBCDz9QMYE',
    other: {
      'msvalidate.01': 'C4DDA059F7EA445FDFCC5EB676171BFA',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
