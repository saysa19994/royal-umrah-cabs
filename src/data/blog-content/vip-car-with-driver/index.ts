import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { VIP_CAR_CONTENT_AR } from './ar';
import { VIP_CAR_CONTENT_EN } from './en';
import { VIP_CAR_CONTENT_MS } from './ms';
import { VIP_CAR_CONTENT_ID } from './id';
import { VIP_CAR_CONTENT_UR } from './ur';
import { VIP_CAR_CONTENT_FR } from './fr';
import { VIP_CAR_CONTENT_ES } from './es';
import { VIP_CAR_CONTENT_DE } from './de';
import { VIP_CAR_CONTENT_HI } from './hi';
import { VIP_CAR_CONTENT_TR } from './tr';

export const VIP_CAR_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: VIP_CAR_CONTENT_AR,
  en: VIP_CAR_CONTENT_EN,
  ms: VIP_CAR_CONTENT_MS,
  id: VIP_CAR_CONTENT_ID,
  ur: VIP_CAR_CONTENT_UR,
  fr: VIP_CAR_CONTENT_FR,
  es: VIP_CAR_CONTENT_ES,
  de: VIP_CAR_CONTENT_DE,
  hi: VIP_CAR_CONTENT_HI,
  tr: VIP_CAR_CONTENT_TR,
};
