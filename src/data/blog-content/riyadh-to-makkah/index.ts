import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { RIYADH_MAKKAH_CONTENT_AR } from './ar';
import { RIYADH_MAKKAH_CONTENT_EN } from './en';
import { RIYADH_MAKKAH_CONTENT_MS } from './ms';
import { RIYADH_MAKKAH_CONTENT_ID } from './id';
import { RIYADH_MAKKAH_CONTENT_UR } from './ur';
import { RIYADH_MAKKAH_CONTENT_FR } from './fr';
import { RIYADH_MAKKAH_CONTENT_ES } from './es';
import { RIYADH_MAKKAH_CONTENT_DE } from './de';
import { RIYADH_MAKKAH_CONTENT_HI } from './hi';
import { RIYADH_MAKKAH_CONTENT_TR } from './tr';

export const RIYADH_MAKKAH_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: RIYADH_MAKKAH_CONTENT_AR,
  en: RIYADH_MAKKAH_CONTENT_EN,
  ms: RIYADH_MAKKAH_CONTENT_MS,
  id: RIYADH_MAKKAH_CONTENT_ID,
  ur: RIYADH_MAKKAH_CONTENT_UR,
  fr: RIYADH_MAKKAH_CONTENT_FR,
  es: RIYADH_MAKKAH_CONTENT_ES,
  de: RIYADH_MAKKAH_CONTENT_DE,
  hi: RIYADH_MAKKAH_CONTENT_HI,
  tr: RIYADH_MAKKAH_CONTENT_TR,
};
