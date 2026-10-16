import { Cormorant_Garamond, Manrope, Amiri, Tajawal } from 'next/font/google';

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
});
