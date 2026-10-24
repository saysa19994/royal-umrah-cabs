import { Locale } from '@/i18n/config';
import { LocalizedArticleBody } from './types';
import { arContent } from './ar';
import { enContent } from './en';
import { msContent } from './ms';
import { idContent } from './id';
import { urContent } from './ur';
import { frContent } from './fr';
import { esContent } from './es';
import { deContent } from './de';
import { hiContent } from './hi';
import { trContent } from './tr';
import { MAKKAH_MADINAH_CONTENT } from './makkah-to-madinah';
import { MAKKAH_JEDDAH_CONTENT } from './makkah-to-jeddah';
import { VIP_CAR_CONTENT } from './vip-car-with-driver';
import { VEHICLE_CAPACITY_CONTENT } from './vehicle-capacity';

export const BLOG_CONTENT_BY_LOCALE: Record<string, Record<Locale, LocalizedArticleBody>> = {
  'vip-umrah-transport-jeddah-to-makkah': {
    ar: arContent,
    en: enContent,
    ms: msContent,
    id: idContent,
    ur: urContent,
    fr: frContent,
    es: esContent,
    de: deContent,
    hi: hiContent,
    tr: trContent,
  },
  'private-transfer-makkah-to-madinah': MAKKAH_MADINAH_CONTENT,
  'makkah-to-jeddah-airport-transfer': MAKKAH_JEDDAH_CONTENT,
  'vip-car-with-driver-saudi-arabia': VIP_CAR_CONTENT,
  'vehicle-capacity-passengers-luggage': VEHICLE_CAPACITY_CONTENT,
};

export function getBlogArticleContent(slug: string, locale: Locale): LocalizedArticleBody {
  const post = BLOG_CONTENT_BY_LOCALE[slug];
  if (!post) {
    return enContent;
  }
  return post[locale] || post.en || post.ar;
}
