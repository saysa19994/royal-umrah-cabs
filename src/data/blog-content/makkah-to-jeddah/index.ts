import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { MAKKAH_JEDDAH_CONTENT_AR } from './ar';
import { MAKKAH_JEDDAH_CONTENT_EN } from './en';
import { MAKKAH_JEDDAH_CONTENT_MS } from './ms';
import { MAKKAH_JEDDAH_CONTENT_ID } from './id';
import { MAKKAH_JEDDAH_CONTENT_UR } from './ur';
import { MAKKAH_JEDDAH_CONTENT_FR } from './fr';
import { MAKKAH_JEDDAH_CONTENT_ES } from './es';
import { MAKKAH_JEDDAH_CONTENT_DE } from './de';
import { MAKKAH_JEDDAH_CONTENT_HI } from './hi';
import { MAKKAH_JEDDAH_CONTENT_TR } from './tr';

export const MAKKAH_JEDDAH_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: MAKKAH_JEDDAH_CONTENT_AR,
  en: MAKKAH_JEDDAH_CONTENT_EN,
  ms: MAKKAH_JEDDAH_CONTENT_MS,
  id: MAKKAH_JEDDAH_CONTENT_ID,
  ur: MAKKAH_JEDDAH_CONTENT_UR,
  fr: MAKKAH_JEDDAH_CONTENT_FR,
  es: MAKKAH_JEDDAH_CONTENT_ES,
  de: MAKKAH_JEDDAH_CONTENT_DE,
  hi: MAKKAH_JEDDAH_CONTENT_HI,
  tr: MAKKAH_JEDDAH_CONTENT_TR,
};
