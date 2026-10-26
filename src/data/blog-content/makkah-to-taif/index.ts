import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { MAKKAH_TAIF_CONTENT_AR } from './ar';
import { MAKKAH_TAIF_CONTENT_EN } from './en';
import { MAKKAH_TAIF_CONTENT_MS } from './ms';
import { MAKKAH_TAIF_CONTENT_ID } from './id';
import { MAKKAH_TAIF_CONTENT_UR } from './ur';
import { MAKKAH_TAIF_CONTENT_FR } from './fr';
import { MAKKAH_TAIF_CONTENT_ES } from './es';
import { MAKKAH_TAIF_CONTENT_DE } from './de';
import { MAKKAH_TAIF_CONTENT_HI } from './hi';
import { MAKKAH_TAIF_CONTENT_TR } from './tr';

export const MAKKAH_TAIF_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: MAKKAH_TAIF_CONTENT_AR,
  en: MAKKAH_TAIF_CONTENT_EN,
  ms: MAKKAH_TAIF_CONTENT_MS,
  id: MAKKAH_TAIF_CONTENT_ID,
  ur: MAKKAH_TAIF_CONTENT_UR,
  fr: MAKKAH_TAIF_CONTENT_FR,
  es: MAKKAH_TAIF_CONTENT_ES,
  de: MAKKAH_TAIF_CONTENT_DE,
  hi: MAKKAH_TAIF_CONTENT_HI,
  tr: MAKKAH_TAIF_CONTENT_TR,
};
