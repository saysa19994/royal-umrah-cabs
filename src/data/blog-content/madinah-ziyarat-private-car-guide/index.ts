import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { MADINAH_ZIYARAT_CONTENT_AR } from './ar';
import { MADINAH_ZIYARAT_CONTENT_EN } from './en';
import { MADINAH_ZIYARAT_CONTENT_MS } from './ms';
import { MADINAH_ZIYARAT_CONTENT_ID } from './id';
import { MADINAH_ZIYARAT_CONTENT_UR } from './ur';
import { MADINAH_ZIYARAT_CONTENT_FR } from './fr';
import { MADINAH_ZIYARAT_CONTENT_ES } from './es';
import { MADINAH_ZIYARAT_CONTENT_DE } from './de';
import { MADINAH_ZIYARAT_CONTENT_HI } from './hi';
import { MADINAH_ZIYARAT_CONTENT_TR } from './tr';

export const MADINAH_ZIYARAT_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: MADINAH_ZIYARAT_CONTENT_AR,
  en: MADINAH_ZIYARAT_CONTENT_EN,
  ms: MADINAH_ZIYARAT_CONTENT_MS,
  id: MADINAH_ZIYARAT_CONTENT_ID,
  ur: MADINAH_ZIYARAT_CONTENT_UR,
  fr: MADINAH_ZIYARAT_CONTENT_FR,
  es: MADINAH_ZIYARAT_CONTENT_ES,
  de: MADINAH_ZIYARAT_CONTENT_DE,
  hi: MADINAH_ZIYARAT_CONTENT_HI,
  tr: MADINAH_ZIYARAT_CONTENT_TR,
};
