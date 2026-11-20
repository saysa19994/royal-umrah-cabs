import { NextResponse } from 'next/server';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';
import { getMergedSiteSettings } from '@/lib/dynamic-settings-store';

export const dynamic = 'force-dynamic';
const privateHeaders = { 'Cache-Control':'private, no-store' };

export async function GET(request: Request) {
  const authResult = await requireRole(request,['owner','admin']);
  if(authResult.errorResponse)return authResult.errorResponse;
  try {
    const {data,error}=await createServiceClient().from('site_settings')
      .select('*').eq('lock_id',true).maybeSingle();
    if(error || !data || !data.updated_at) {
      console.error('Cannot load saved admin settings:',error?.message || 'No saved settings row');
      return NextResponse.json({success:false,error:'Unable to load persisted settings. Editing is locked until the database recovers.'},
        {status:503,headers:privateHeaders});
    }
    return NextResponse.json({
      success:true,
      version:data.updated_at,
      settings:getMergedSiteSettings(data),
      system_status: {
        resend_configured:Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')),
        resend_from:process.env.RESEND_FROM || '',
      },
    },{headers:privateHeaders});
  }catch(err){
    console.error('Admin settings GET failed:',err);
    return NextResponse.json({success:false,error:'Unable to retrieve current saved settings'},
      {status:503,headers:privateHeaders});
  }
}

const SettingsUpdateSchema = z.object({
  phone: z.string().max(50).optional(),
  email: z.string().email().max(100).optional(),
  whatsapp_number: z.string().regex(/^\+?[0-9]{8,15}$/, 'Must be 8-15 digits').optional(),
  whatsapp_number_secondary: z.string().regex(/^\+?[0-9]{8,15}$/, 'Must be 8-15 digits').optional(),
  riyadh_enabled: z.boolean().optional(),
  taif_enabled: z.boolean().optional(),
  address_cities: z.array(z.string().max(50)).optional(),
  google_reviews_link: z.string().url().max(255).optional().or(z.literal('')),
  google_reviews_rating: z.number().min(0).max(5).optional(),
  google_reviews_count: z.number().int().min(0).optional(),
  free_cancellation_hours: z.number().int().min(0).max(168).optional(),
  currency_rates: z.record(z.string(), z.number().positive()).optional(),
  owner_notification_email: z.string().email().max(100).optional(),
  telegram_chat_id: z.string().max(100).optional(),
  lead_alert_minutes: z.number().int().min(1).max(1440).optional(),
  founder_enabled: z.boolean().optional(),
  // Feature Flags
  flight_tracking_enabled: z.boolean().optional(),
  complimentary_water: z.boolean().optional(),
  zamzam_water: z.boolean().optional(),
  complimentary_child_seat: z.boolean().optional(),
  malay_speaking_chauffeur: z.boolean().optional(),
  free_miqat_stop: z.boolean().optional(),
  online_card_payment_enabled: z.boolean().optional(),
  bank_transfer_payment_enabled: z.boolean().optional(),
  coaster_enabled: z.boolean().optional(),
  airport_waiting_minutes: z.number().int().min(15).max(180).optional(),
  promo_banner_enabled: z.boolean().optional(),
  promo_banner_text: z.string().max(255).optional(),
});

// Only columns that actually exist in the current production site_settings
// table may be edited here. Remaining UI settings require an approved migration
// or a separate durable CMS store: never pretend they were successfully saved.
const durableColumns = new Set([
  'phone','email','whatsapp_number','riyadh_enabled','address_cities',
  'google_reviews_link','google_reviews_rating','google_reviews_count',
  'free_cancellation_hours','currency_rates','owner_notification_email',
  'telegram_chat_id','lead_alert_minutes',
]);

export async function POST(request: Request) {
  const authResult = await requireRole(request,['owner']);
  if(authResult.errorResponse)return authResult.errorResponse;
  // Preview uses the production Supabase project today; never allow writes to
  // live settings even when the owner is logged in to the preview.
  if(process.env.VERCEL_ENV==='preview') {
    let host='';
    try{host=new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '').hostname;}catch{}
    const isolated=process.env.PREVIEW_DATABASE_ISOLATED==='true' &&
      host.endsWith('.supabase.co') &&
      host!=='skyhpzdeapmttgmvcoeh.supabase.co';
    if(!isolated) {
      return NextResponse.json({success:false,code:'PREVIEW_DATABASE_ISOLATION_REQUIRED',
        error:'Preview is read-only until an isolated staging database is connected.'},
        {status:423,headers:privateHeaders});
    }
  }

  const body=await request.json().catch(()=>null);
  if(!body || typeof body!=='object' || Array.isArray(body) ||
    !Object.prototype.hasOwnProperty.call(body,'expected_updated_at') ||
    typeof body.expected_updated_at!=='string' ||
    Number.isNaN(Date.parse(body.expected_updated_at)) ||
    !body.changes || typeof body.changes!=='object' || Array.isArray(body.changes)){
    return NextResponse.json({success:false,error:'Reload saved settings before editing'},
      {status:400,headers:privateHeaders});
  }
  const parsed=SettingsUpdateSchema.strict().safeParse(body.changes);
  if(!parsed.success) {
    return NextResponse.json({success:false,error:'Invalid settings submitted',details:parsed.error.flatten().fieldErrors},
      {status:400,headers:privateHeaders});
  }
  const unsupported=Object.keys(parsed.data).filter(key=>!durableColumns.has(key));
  if(unsupported.length) {
    return NextResponse.json({success:false,
      error:'These fields do not yet have persistent database columns: '+unsupported.join(', ')},
      {status:422,headers:privateHeaders});
  }
  if(!Object.keys(parsed.data).length) {
    return NextResponse.json({success:false,error:'No changed fields to save'},
      {status:400,headers:privateHeaders});
  }

  const changes:Record<string,unknown>={...parsed.data};
  if(typeof changes.whatsapp_number==='string') {
    changes.whatsapp_number=changes.whatsapp_number.replace(/[^0-9]/g,'');
  }

  try {
    const db=createServiceClient();
    const {data:current,error:readError}=await db.from('site_settings')
      .select('updated_at').eq('lock_id',true).maybeSingle();
    if(readError || !current) {
      return NextResponse.json({success:false,error:'Unable to check persisted settings version'},
        {status:503,headers:privateHeaders});
    }
    if(current.updated_at!==body.expected_updated_at) {
      return NextResponse.json({success:false,error:'Settings changed in another session. Reload before saving.'},
        {status:409,headers:privateHeaders});
    }
    const previousTime=Date.parse(current.updated_at);
    const updated_at=new Date(Math.max(Date.now(),Number.isFinite(previousTime)?previousTime+1:Date.now())).toISOString();
    const {data:saved,error:writeError}=await db.from('site_settings')
      .update({...changes,updated_at}).eq('lock_id',true)
      .eq('updated_at',body.expected_updated_at)
      .select('*').maybeSingle();
    if(writeError) {
      console.error('Admin settings persist error:',writeError.message);
      return NextResponse.json({success:false,error:'Database rejected the changes; nothing has been confirmed saved'},
        {status:503,headers:privateHeaders});
    }
    if(!saved) {
      return NextResponse.json({success:false,error:'Settings changed during save; reload before retrying'},
        {status:409,headers:privateHeaders});
    }
    for(const [key,value] of Object.entries(changes)) {
      if(JSON.stringify(saved[key])!==JSON.stringify(value)) {
        return NextResponse.json({success:false,error:'Saved settings did not match the expected values'},
          {status:503,headers:privateHeaders});
      }
    }
    try{
      await logAuditEvent({
        userEmail:authResult.user.email,userRole:authResult.user.role,
        action:'settings_update',resource:'settings',resourceId:'lock_id',
        newValues:changes,ip:getClientIp(request),
      });
    }catch(err){console.error('Settings saved but audit logging failed',err);}
    revalidateTag('site_settings');
    return NextResponse.json({success:true,version:saved.updated_at,
      settings:getMergedSiteSettings(saved)},{headers:privateHeaders});
  } catch(err) {
    console.error('Admin settings save failed:',err);
    return NextResponse.json({success:false,error:'Unable to persist settings'},
      {status:503,headers:privateHeaders});
  }
}
