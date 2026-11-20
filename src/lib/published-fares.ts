import { unstable_cache } from 'next/cache';
import { createServiceClient } from '@/lib/supabase/service';

export type ApprovedFareMap = Record<string, Record<string, number>>;
const prefix='published_fare_';
function validId(id:string){return /^[a-z0-9_-]{1,100}$/.test(id);}
export function fareKey(route:string,vehicle:string){
  if(!validId(route)||!validId(vehicle))throw new Error('Invalid route or vehicle identifier');
  return prefix+route+'__'+vehicle;
}

export const getPublishedFareOverridesCached=unstable_cache(async():Promise<ApprovedFareMap>=>{
  const {data,error}=await createServiceClient().from('page_content')
    .select('page_key,content_blocks').like('page_key',prefix+'%')
    .eq('language','all').limit(800);
  if(error) {
    console.error('Published rate approvals unavailable:',error.message);
    return {};
  }
  const map:ApprovedFareMap={};
  for(const row of data||[]){
    const key=String(row.page_key||'').slice(prefix.length);
    const separator=key.lastIndexOf('__');if(separator<=0)continue;
    const route=key.slice(0,separator),vehicle=key.slice(separator+2);
    const blocks=row.content_blocks;
    const amount=blocks && typeof blocks==='object' && !Array.isArray(blocks)
      ?Number((blocks as Record<string,unknown>).price_sar):NaN;
    if(validId(route)&&validId(vehicle)&&Number.isFinite(amount)&&amount>0){
      (map[route]??={})[vehicle]=amount;
    }
  }
  return map;
},['published_prices_v1'],{tags:['site_prices'],revalidate:86400});

export async function getPublishedFare(route:string,vehicle:string):Promise<number|null> {
  const {data,error}=await createServiceClient().from('page_content').select('content_blocks')
    .eq('page_key',fareKey(route,vehicle)).eq('language','all').maybeSingle();
  if(error)throw new Error('Unable to verify the active published fare');
  if(!data)return null;
  const c=data.content_blocks;
  const n=c && typeof c==='object'&&!Array.isArray(c)?Number((c as Record<string,unknown>).price_sar):NaN;
  if(!Number.isFinite(n)||n<=0)throw new Error('Approved fare is invalid');
  return n;
}

export async function publishFares(values:{route_id:string;vehicle_id:string;price_sar:number}[]){
  for(const item of values) {
    if(!Number.isFinite(item.price_sar)||item.price_sar<=0)throw new Error('Fare must be greater than zero');
    fareKey(item.route_id,item.vehicle_id);
  }
  const stamp=new Date().toISOString();
  const {error}=await createServiceClient().from('page_content').upsert(values.map(v=>({
    page_key:fareKey(v.route_id,v.vehicle_id),language:'all',
    // page_content columns are NOT NULL in production: publishing a fare
    // must not fail or erase a legitimate price by sending NULL metadata.
    seo_title:'',seo_description:'',h1:'',
    content_blocks:{price_sar:v.price_sar,published_at:stamp},updated_at:stamp,
  })),{onConflict:'page_key,language'});
  if(error)throw new Error('Fare approval could not be saved: '+error.message);
}
