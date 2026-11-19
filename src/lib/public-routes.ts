import { unstable_cache } from 'next/cache';
import type { Locale } from '@/i18n/config';
import { createServiceClient } from '@/lib/supabase/service';
import { EXECUTIVE_ROUTES_DATA } from '@/data/executive-routes-data';

const ALL_LOCALES=['ar','en','ms','id','ur','fr','es','de','tr','hi'] as const;
type TranslatedRoute = Record<string,{origin?:string;destination?:string;title?:string}>;

type RouteRecord={
  id:string;origin_city:string;destination_city:string;
  origin_code:string|null;destination_code:string|null;
  estimated_duration_minutes:number|null;distance_km:number|null;
  is_active:boolean;display_order:number|null;translations:TranslatedRoute|null;
};

export type PublishedRoute = {
  slug:string; titleEn:string; titleAr:string;
  titles:Partial<Record<Locale,string>>;
  timeEn:string; timeAr:string;
  times:Partial<Record<Locale,string>>;
  distanceEn:string; distanceAr:string;
  distances:Partial<Record<Locale,string>>;
  origin_code:string;destination_code:string;
  hasDetails:boolean;
};

const legacy = EXECUTIVE_ROUTES_DATA.filter(item=>item.slug!=='riyadh-airport-transfer');

export const getRouteCatalogCached=unstable_cache(async ():Promise<RouteRecord[]|null>=>{
  const {data,error}=await createServiceClient().from('routes')
    .select('id,origin_city,destination_city,origin_code,destination_code,estimated_duration_minutes,distance_km,is_active,display_order,translations')
    .order('display_order');
  if(error){console.error('Public route catalog unavailable:',error.message);return null;}
  return (data||[]) as RouteRecord[];
},['site_routes_catalog_v2'],{tags:['site_routes'],revalidate:86400});

export async function getPublishedRoutes(locale:Locale):Promise<PublishedRoute[]>{
  const data=await getRouteCatalogCached();
  const byId=new Map((data||[]).map(r=>[r.id,r]));
  const published:PublishedRoute[]=[];
  for(const item of legacy){
    const row=byId.get(item.slug);
    if(row && !row.is_active) continue;
    const titles:Partial<Record<Locale,string>>={...item.titles};
    if(row){
      for(const language of ALL_LOCALES){
        const t=row.translations?.[language];
        if(t?.title)titles[language]=t.title;
        else if(t?.origin && t?.destination)titles[language]=t.origin+' → '+t.destination;
      }
      // English master fields are editable even if a translation was not provided.
      if(!row.translations?.en?.origin && !row.translations?.en?.title)
        titles.en=row.origin_city+' → '+row.destination_city;
    }
    published.push({
      slug:item.slug, titleEn:titles.en||item.titleEn,titleAr:titles.ar||item.titleAr,
      titles, timeEn:row?.estimated_duration_minutes?row.estimated_duration_minutes+' min':item.timeEn,
      timeAr:row?.estimated_duration_minutes?row.estimated_duration_minutes+' دقيقة':item.timeAr,
      times:row?.estimated_duration_minutes?{
        ...item.times,en:row.estimated_duration_minutes+' min',ar:row.estimated_duration_minutes+' دقيقة',
      }:item.times||{},
      distanceEn:row?.distance_km?row.distance_km+' km':item.distanceEn,
      distanceAr:row?.distance_km?row.distance_km+' كم':item.distanceAr,
      distances:row?.distance_km?{...item.distances,en:row.distance_km+' km',ar:row.distance_km+' كم'}:item.distances||{},
      origin_code:row?.origin_code||'',destination_code:row?.destination_code||'',hasDetails:true,
    });
  }

  for(const row of data||[]){
    if(!row.is_active || row.id==='riyadh-airport-transfer' || legacy.some(v=>v.slug===row.id))continue;
    const translations:Partial<Record<Locale,string>>={};
    for(const language of ALL_LOCALES){
      const t=row.translations?.[language];
      if(t?.title)translations[language]=t.title;
      else if(t?.origin && t?.destination)translations[language]=t.origin+' → '+t.destination;
    }
    if(!translations.en)translations.en=row.origin_city+' → '+row.destination_city;
    if(!translations.ar)translations.ar=row.origin_city+' ← '+row.destination_city;
    // Never show untranslated custom routes in other locale guides.
    if(locale!=='ar' && locale!=='en' && !translations[locale]) continue;
    published.push({
      slug:row.id,titleEn:translations.en||row.id,titleAr:translations.ar||row.id,
      titles:translations,timeEn:(row.estimated_duration_minutes||0)+' min',
      timeAr:(row.estimated_duration_minutes||0)+' دقيقة',
      times:{en:(row.estimated_duration_minutes||0)+' min',ar:(row.estimated_duration_minutes||0)+' دقيقة'},
      distanceEn:(row.distance_km||0)+' km',distanceAr:(row.distance_km||0)+' كم',
      distances:{en:(row.distance_km||0)+' km',ar:(row.distance_km||0)+' كم'},
      origin_code:row.origin_code||'',destination_code:row.destination_code||'',hasDetails:false,
    });
  }
  return published;
}
