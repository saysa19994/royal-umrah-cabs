import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { getClientIp } from '@/lib/rate-limit';
import { logAuditEvent } from '@/lib/audit';
import { LOCALES, Locale } from '@/i18n/config';
import { HOME_COPY_FIELDS, getHomeCopyDefaults, getHomeCopyOverridesCached, HomeCopyOverrides } from '@/lib/home-copy';

export const dynamic='force-dynamic';

export async function GET(request:NextRequest){
  const auth=await requireRole(request,['owner','admin','content_editor','translator']);
  if(auth.errorResponse)return auth.errorResponse;
  const locale=request.nextUrl.searchParams.get('locale')||'ar';
  if(!LOCALES.includes(locale as Locale))return NextResponse.json({error:'Unsupported language'},{status:400});
  return NextResponse.json({
    locale,fields:HOME_COPY_FIELDS,
    defaults:getHomeCopyDefaults(locale as Locale),
    values:await getHomeCopyOverridesCached(locale as Locale),
  },{headers:{'Cache-Control':'private,no-store'}});
}

export async function PATCH(request:NextRequest){
  const auth=await requireRole(request,['owner','admin','content_editor','translator']);
  if(auth.errorResponse)return auth.errorResponse;
  const body=await request.json().catch(()=>null);
  if(!body||typeof body!=='object'||!LOCALES.includes(body.locale)){
    return NextResponse.json({error:'Invalid locale'},{status:400});
  }
  if(!body.values||typeof body.values!=='object'||Array.isArray(body.values)){
    return NextResponse.json({error:'Missing content values'},{status:400});
  }
  const keys=Object.keys(body.values);
  if(!keys.length||keys.some(key=>!Object.hasOwn(HOME_COPY_FIELDS,key)||
    typeof body.values[key]!=='string'||body.values[key].length>1500)){
    return NextResponse.json({error:'Invalid editable field or text too long'},{status:400});
  }
  const locale=body.locale as Locale;
  const db=createServiceClient();
  const {data:existing,error:readError}=await db.from('page_content').select('content_blocks')
    .eq('page_key','home_copy').eq('language',locale).maybeSingle();
  if(readError)return NextResponse.json({error:'Unable to read saved content'},{status:503});
  const previous=existing?.content_blocks && typeof existing.content_blocks==='object' && !Array.isArray(existing.content_blocks)
    ?existing.content_blocks as Record<string,unknown>:{};
  const merged:HomeCopyOverrides={...previous,...body.values};
  const {error}=await db.from('page_content').upsert({
    page_key:'home_copy',language:locale,content_blocks:merged,updated_at:new Date().toISOString(),
  },{onConflict:'page_key,language'});
  if(error)return NextResponse.json({error:'Unable to save home page content'},{status:503});
  await logAuditEvent({
    userEmail:auth.user.email,userRole:auth.user.role,action:'homepage_copy_updated',
    resource:'content',resourceId:'home_copy:'+locale,
    oldValues:Object.fromEntries(keys.map(k=>[k,previous[k]||null])),
    newValues:body.values,ip:getClientIp(request),
  });
  revalidateTag('site_home_copy');
  revalidateTag('site_cms');
  revalidatePath('/'+locale,'page');
  return NextResponse.json({success:true,locale,values:merged},
    {headers:{'Cache-Control':'private,no-store'}});
}
