import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getChatSettingsAdmin, updateChatSettings, getChatSessions } from '@/lib/chat-settings';
import { getClientIp } from '@/lib/rate-limit';
import { logAuditEvent } from '@/lib/audit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const noStore={ 'Cache-Control':'private, no-store' };

export async function GET(request: Request) {
  const auth=await requireRole(request,['owner','admin']);
  if(auth.errorResponse)return auth.errorResponse;
  try{
    const {settings,version}=await getChatSettingsAdmin();
    return NextResponse.json({
      success:true,settings,version,
      // /tmp is not durable, and no real customer transcripts are invented.
      sessions:getChatSessions(), sessionsDurable:false,
    },{headers:noStore});
  }catch(err){
    console.error('Admin chat read error:',err);
    return NextResponse.json({success:false,error:'Unable to load saved chatbot settings'},
      {status:503,headers:noStore});
  }
}

export async function POST(request: Request) {
  const auth=await requireRole(request,['owner','admin']);
  if(auth.errorResponse)return auth.errorResponse;
  const body=await request.json().catch(()=>null);
  if(!body || typeof body!=='object'||Array.isArray(body)||
    !Object.prototype.hasOwnProperty.call(body,'expected_updated_at')) {
    return NextResponse.json({success:false,error:'Reload the chatbot configuration before publishing'},
      {status:400,headers:noStore});
  }
  try{
    const saved=await updateChatSettings(body.settings,body.expected_updated_at);
    try {
      await logAuditEvent({
        userEmail:auth.user.email,userRole:auth.user.role,
        action:'chatbot_settings_updated',resource:'chat_settings',
        oldValues:null,newValues:{enabled:saved.settings.enabled,version:saved.version},
        ip:getClientIp(request),
      });
    }catch(err){console.error('Chat settings persisted but audit write failed:',err);}
    return NextResponse.json({success:true,...saved},{headers:noStore});
  }catch(err){
    const message=err instanceof Error?err.message:'Unable to save chatbot settings';
    const conflict=message.includes('changed in another session');
    const invalid=message.includes('Invalid chatbot settings')||
      message.includes('valid previously loaded revision');
    return NextResponse.json({success:false,error:message},
      {status:conflict?409:invalid?400:503,headers:noStore});
  }
}
