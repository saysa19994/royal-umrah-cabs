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
};

export function getBlogArticleContent(slug: string, locale: Locale): LocalizedArticleBody {
  const post = BLOG_CONTENT_BY_LOCALE[slug];
  if (!post) {
    return enContent;
  }
  return post[locale] || post.en || post.ar;
}
