import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { VEHICLE_CAPACITY_CONTENT_AR } from './ar';
import { VEHICLE_CAPACITY_CONTENT_EN } from './en';
import { VEHICLE_CAPACITY_CONTENT_MS } from './ms';
import { VEHICLE_CAPACITY_CONTENT_ID } from './id';
import { VEHICLE_CAPACITY_CONTENT_UR } from './ur';
import { VEHICLE_CAPACITY_CONTENT_FR } from './fr';
import { VEHICLE_CAPACITY_CONTENT_ES } from './es';
import { VEHICLE_CAPACITY_CONTENT_DE } from './de';
import { VEHICLE_CAPACITY_CONTENT_HI } from './hi';
import { VEHICLE_CAPACITY_CONTENT_TR } from './tr';

export const VEHICLE_CAPACITY_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: VEHICLE_CAPACITY_CONTENT_AR,
  en: VEHICLE_CAPACITY_CONTENT_EN,
  ms: VEHICLE_CAPACITY_CONTENT_MS,
  id: VEHICLE_CAPACITY_CONTENT_ID,
  ur: VEHICLE_CAPACITY_CONTENT_UR,
  fr: VEHICLE_CAPACITY_CONTENT_FR,
  es: VEHICLE_CAPACITY_CONTENT_ES,
  de: VEHICLE_CAPACITY_CONTENT_DE,
  hi: VEHICLE_CAPACITY_CONTENT_HI,
  tr: VEHICLE_CAPACITY_CONTENT_TR,
};
