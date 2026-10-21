import type { Metadata } from 'next';
import { cormorant, manrope, amiri, tajawal } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com'),
  title: 'Royal Umrah Cabs | Private Umrah Chauffeur & Pilgrim Transport',
  description: 'Private Umrah taxi and luxury chauffeur transport in Makkah, Madinah, and Jeddah Airport (KAIA).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
