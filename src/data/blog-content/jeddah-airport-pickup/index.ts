import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { AIRPORT_PICKUP_CONTENT_AR } from './ar';
import { AIRPORT_PICKUP_CONTENT_EN } from './en';
import { AIRPORT_PICKUP_CONTENT_MS } from './ms';
import { AIRPORT_PICKUP_CONTENT_ID } from './id';
import { AIRPORT_PICKUP_CONTENT_UR } from './ur';
import { AIRPORT_PICKUP_CONTENT_FR } from './fr';
import { AIRPORT_PICKUP_CONTENT_ES } from './es';
import { AIRPORT_PICKUP_CONTENT_DE } from './de';
import { AIRPORT_PICKUP_CONTENT_HI } from './hi';
import { AIRPORT_PICKUP_CONTENT_TR } from './tr';

export const AIRPORT_PICKUP_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: AIRPORT_PICKUP_CONTENT_AR,
  en: AIRPORT_PICKUP_CONTENT_EN,
  ms: AIRPORT_PICKUP_CONTENT_MS,
  id: AIRPORT_PICKUP_CONTENT_ID,
  ur: AIRPORT_PICKUP_CONTENT_UR,
  fr: AIRPORT_PICKUP_CONTENT_FR,
  es: AIRPORT_PICKUP_CONTENT_ES,
  de: AIRPORT_PICKUP_CONTENT_DE,
  hi: AIRPORT_PICKUP_CONTENT_HI,
  tr: AIRPORT_PICKUP_CONTENT_TR,
};
