import { unstable_cache } from 'next/cache';
import type { Locale } from '@/i18n/config';
import { createServiceClient } from '@/lib/supabase/service';
import { royalHomepageArabic, royalHomepageEnglish } from '@/i18n/royal-homepage-copy';
import { royalHomepageEast } from '@/i18n/royal-homepage-copy-east';
import { royalHomepageWest } from '@/i18n/royal-homepage-copy-west';

const DEFAULT_COPY = { ar: royalHomepageArabic, en: royalHomepageEnglish, ...royalHomepageEast, ...royalHomepageWest };
export const HOME_COPY_FIELDS={
  heroLine1:'السطر الأول من عنوان الهيرو',
  heroLine2:'السطر الثاني من عنوان الهيرو',
  heroDescription:'الوصف أسفل الهيرو',
  fleetTitle:'عنوان قسم السيارات',
  journeyTitle:'عنوان قسم الرحلة',
  closeTitle:'عنوان قسم الختام',
  closeDescription:'وصف القسم الختامي',
} as const;

export type HomeCopyKey=keyof typeof HOME_COPY_FIELDS;
export type HomeCopyOverrides=Partial<Record<HomeCopyKey,string>>;
export function getHomeCopyDefaults(locale:Locale):Record<HomeCopyKey,string>{
  const copy=DEFAULT_COPY[locale]||DEFAULT_COPY.en;
  return Object.fromEntries(Object.keys(HOME_COPY_FIELDS).map(key=>[
    key,String((copy as unknown as Record<string,unknown>)[key]||''),
  ])) as Record<HomeCopyKey,string>;
}

export const getHomeCopyOverridesCached=unstable_cache(async(locale:Locale):Promise<HomeCopyOverrides>=>{
  const {data,error}=await createServiceClient().from('page_content')
    .select('content_blocks').eq('page_key','home_copy').eq('language',locale).maybeSingle();
  if(error){console.error('Home copy read error',error.message);return {};}
  const blocks=data?.content_blocks;
  if(!blocks||typeof blocks!=='object'||Array.isArray(blocks))return {};
  return Object.fromEntries(Object.keys(HOME_COPY_FIELDS).filter(key=>
    typeof (blocks as Record<string,unknown>)[key]==='string'
  ).map(key=>[key,(blocks as Record<string,unknown>)[key]])) as HomeCopyOverrides;
},['home_copy_locale_v1'],{tags:['site_cms','site_home_copy'],revalidate:86400});
