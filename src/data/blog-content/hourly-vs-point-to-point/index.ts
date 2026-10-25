import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from '../types';
import { HOURLY_VS_TRANSFER_CONTENT_AR } from './ar';
import { HOURLY_VS_TRANSFER_CONTENT_EN } from './en';
import { HOURLY_VS_TRANSFER_CONTENT_MS } from './ms';
import { HOURLY_VS_TRANSFER_CONTENT_ID } from './id';
import { HOURLY_VS_TRANSFER_CONTENT_UR } from './ur';
import { HOURLY_VS_TRANSFER_CONTENT_FR } from './fr';
import { HOURLY_VS_TRANSFER_CONTENT_ES } from './es';
import { HOURLY_VS_TRANSFER_CONTENT_DE } from './de';
import { HOURLY_VS_TRANSFER_CONTENT_HI } from './hi';
import { HOURLY_VS_TRANSFER_CONTENT_TR } from './tr';

export const HOURLY_VS_TRANSFER_CONTENT: Record<Locale, LocalizedArticleBody> = {
  ar: HOURLY_VS_TRANSFER_CONTENT_AR,
  en: HOURLY_VS_TRANSFER_CONTENT_EN,
  ms: HOURLY_VS_TRANSFER_CONTENT_MS,
  id: HOURLY_VS_TRANSFER_CONTENT_ID,
  ur: HOURLY_VS_TRANSFER_CONTENT_UR,
  fr: HOURLY_VS_TRANSFER_CONTENT_FR,
  es: HOURLY_VS_TRANSFER_CONTENT_ES,
  de: HOURLY_VS_TRANSFER_CONTENT_DE,
  hi: HOURLY_VS_TRANSFER_CONTENT_HI,
  tr: HOURLY_VS_TRANSFER_CONTENT_TR,
};
