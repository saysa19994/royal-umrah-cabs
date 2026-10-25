import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { UMRAH_CHECKLIST_CONTENT_AR } from './ar';
import { UMRAH_CHECKLIST_CONTENT_EN } from './en';
import { UMRAH_CHECKLIST_CONTENT_MS } from './ms';
import { UMRAH_CHECKLIST_CONTENT_ID } from './id';
import { UMRAH_CHECKLIST_CONTENT_UR } from './ur';
import { UMRAH_CHECKLIST_CONTENT_FR } from './fr';
import { UMRAH_CHECKLIST_CONTENT_ES } from './es';
import { UMRAH_CHECKLIST_CONTENT_DE } from './de';
import { UMRAH_CHECKLIST_CONTENT_HI } from './hi';
import { UMRAH_CHECKLIST_CONTENT_TR } from './tr';

export const UMRAH_CHECKLIST_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: UMRAH_CHECKLIST_CONTENT_AR,
  en: UMRAH_CHECKLIST_CONTENT_EN,
  ms: UMRAH_CHECKLIST_CONTENT_MS,
  id: UMRAH_CHECKLIST_CONTENT_ID,
  ur: UMRAH_CHECKLIST_CONTENT_UR,
  fr: UMRAH_CHECKLIST_CONTENT_FR,
  es: UMRAH_CHECKLIST_CONTENT_ES,
  de: UMRAH_CHECKLIST_CONTENT_DE,
  hi: UMRAH_CHECKLIST_CONTENT_HI,
  tr: UMRAH_CHECKLIST_CONTENT_TR,
};
