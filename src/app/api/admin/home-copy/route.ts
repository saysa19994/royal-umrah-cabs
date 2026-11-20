import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { getClientIp } from '@/lib/rate-limit';
import { logAuditEvent } from '@/lib/audit';
import { LOCALES, Locale } from '@/i18n/config';
import { HOME_COPY_FIELDS, getHomeCopyDefaults, HomeCopyOverrides } from '@/lib/home-copy';

export const dynamic='force-dynamic';
const noStore={ 'Cache-Control':'private,no-store' };

function selectedFields(blocks: unknown): HomeCopyOverrides {
  if (!blocks || typeof blocks !== 'object' || Array.isArray(blocks)) return {};
  const raw = blocks as Record<string, unknown>;
  return Object.fromEntries(Object.keys(HOME_COPY_FIELDS)
    .filter(key => typeof raw[key] === 'string' && (raw[key] as string).length <= 1500)
    .map(key => [key, raw[key]])) as HomeCopyOverrides;
}

export async function GET(request:NextRequest){
  const auth=await requireRole(request,['owner','admin','content_editor','translator']);
  if(auth.errorResponse)return auth.errorResponse;
  const locale=request.nextUrl.searchParams.get('locale')||'ar';
  if(!LOCALES.includes(locale as Locale))return NextResponse.json({error:'Unsupported language'},{status:400});

  try {
    // The edit form must not read a stale public cache or hide database outages.
    const {data,error}=await createServiceClient().from('page_content')
      .select('content_blocks,updated_at').eq('page_key','home_copy')
      .eq('language',locale).maybeSingle();
    if(error)throw new Error(error.message);
    return NextResponse.json({
      locale,fields:HOME_COPY_FIELDS,
      defaults:getHomeCopyDefaults(locale as Locale),
      values:selectedFields(data?.content_blocks),
      version:data?.updated_at || null,
    },{headers:noStore});
  }catch(err){
    console.error('Home copy admin read failed:',err);
    return NextResponse.json({error:'Unable to read saved homepage text; editing is disabled'},
      {status:503,headers:noStore});
  }
}

export async function PATCH(request:NextRequest){
  const auth=await requireRole(request,['owner','admin','content_editor','translator']);
  if(auth.errorResponse)return auth.errorResponse;
  const body=await request.json().catch(()=>null);
  if(!body||typeof body!=='object'||Array.isArray(body)||!LOCALES.includes(body.locale)){
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
  if(!Object.prototype.hasOwnProperty.call(body,'expected_updated_at') ||
    !(body.expected_updated_at===null ||
      (typeof body.expected_updated_at==='string' &&
       !Number.isNaN(Date.parse(body.expected_updated_at))))){
    return NextResponse.json({error:'Reload the saved homepage text before publishing changes'},
      {status:409,headers:noStore});
  }

  const locale=body.locale as Locale;
  const db=createServiceClient();
  try {
    const {data:existing,error:readError}=await db.from('page_content')
      .select('content_blocks,updated_at')
      .eq('page_key','home_copy').eq('language',locale).maybeSingle();
    if(readError)throw new Error(readError.message);
    const version=existing?.updated_at || null;
    if(version!==body.expected_updated_at){
      return NextResponse.json({error:'Another editor saved newer homepage text. Refresh and compare before saving.'},
        {status:409,headers:noStore});
    }

    const previous=selectedFields(existing?.content_blocks);
    // Preserve keys owned by other homepage features; the text editor may
    // only modify its allowlisted fields, not erase unrelated persisted data.
    const allPrevious=existing?.content_blocks && typeof existing.content_blocks==='object' &&
      !Array.isArray(existing.content_blocks)
      ? existing.content_blocks as Record<string,unknown> : {};
    const merged:Record<string,unknown>={...allPrevious,...body.values};
    const updated_at=new Date().toISOString();
    if(existing){
      // Atomic version check on a single language record.
      const {data:saved,error}=await db.from('page_content')
        .update({content_blocks:merged,updated_at})
        .eq('page_key','home_copy').eq('language',locale)
        .eq('updated_at',body.expected_updated_at)
        .select('updated_at').maybeSingle();
      if(error)throw new Error(error.message);
      if(!saved)return NextResponse.json({error:'A newer homepage edit was detected. Reload and compare.'},
        {status:409,headers:noStore});
    }else{
      const {error}=await db.from('page_content').insert({
        page_key:'home_copy',language:locale,
        // These three fields are NOT NULL and have no database default.
        seo_title:'',seo_description:'',h1:'',
        content_blocks:merged,updated_at,
      });
      if(error){
        if(error.code==='23505')return NextResponse.json({
          error:'Another editor saved this language first. Reload before publishing.',
        },{status:409,headers:noStore});
        throw new Error(error.message);
      }
    }

    try {
      await logAuditEvent({
        userEmail:auth.user.email,userRole:auth.user.role,action:'homepage_copy_updated',
        resource:'content',resourceId:'home_copy:'+locale,
        oldValues:Object.fromEntries(keys.map(k=>[k,(previous as Record<string,string|undefined>)[k]||null])),
        newValues:body.values,ip:getClientIp(request),
      });
    }catch(err){console.error('Homepage copy saved but audit log failed:',err);}
    revalidateTag('site_home_copy');
    revalidateTag('site_cms');
    revalidatePath('/'+locale,'page');
    return NextResponse.json({success:true,locale,values:selectedFields(merged),version:updated_at},
      {headers:noStore});
  }catch(err){
    console.error('Homepage copy persistence error:',err);
    return NextResponse.json({error:'Unable to persist homepage changes'},
      {status:503,headers:noStore});
  }
}
