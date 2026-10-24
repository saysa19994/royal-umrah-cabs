import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { arMakkahMadinahContent } from './ar';
import { enMakkahMadinahContent } from './en';
import { msMakkahMadinahContent } from './ms';
import { idMakkahMadinahContent } from './id';
import { urMakkahMadinahContent } from './ur';
import { frMakkahMadinahContent } from './fr';
import { esMakkahMadinahContent } from './es';
import { deMakkahMadinahContent } from './de';
import { hiMakkahMadinahContent } from './hi';
import { trMakkahMadinahContent } from './tr';

export const MAKKAH_MADINAH_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: arMakkahMadinahContent,
  en: enMakkahMadinahContent,
  ms: msMakkahMadinahContent,
  id: idMakkahMadinahContent,
  ur: urMakkahMadinahContent,
  fr: frMakkahMadinahContent,
  es: esMakkahMadinahContent,
  de: deMakkahMadinahContent,
  hi: hiMakkahMadinahContent,
  tr: trMakkahMadinahContent,
};
