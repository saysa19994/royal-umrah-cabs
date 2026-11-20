import { createServiceClient } from '@/lib/supabase/service';
import { unstable_cache, revalidateTag } from 'next/cache';
import { z } from 'zod';

const SettingsSchema = z.object({
  enabled:z.boolean(),
  botName:z.string().trim().min(2).max(90),
  tone:z.enum(['warm_vip','concise_executive','hajj_umrah_focused']),
  greetingAr:z.string().trim().min(2).max(1200),
  greetingEn:z.string().trim().min(2).max(1200),
  quickActions:z.object({
    bookTransfer:z.boolean(),hourlyDriver:z.boolean(),trackBooking:z.boolean(),
    getPrice:z.boolean(),talkAgent:z.boolean(),faq:z.boolean(),
  }).strict(),
  costCapMonthlyUsd:z.number().finite().min(0).max(10000),
  maxTokens:z.number().int().min(100).max(4000),
}).strict();

const CHAT_KEY='chat_settings';
const CHAT_LOCALE='all';
const noStorePageSelect=() => createServiceClient().from('page_content')
  .select('content_blocks,updated_at')
  .eq('page_key',CHAT_KEY).eq('language',CHAT_LOCALE).maybeSingle();

export async function getChatSettingsAdmin(): Promise<{settings:ChatBotSettings;version:string|null}> {
  const {data,error}=await noStorePageSelect();
  if(error)throw new Error('Unable to retrieve persisted chat settings');
  if(!data)return {settings:DEFAULT_CHAT_SETTINGS,version:null};
  const parsed=SettingsSchema.safeParse(data.content_blocks);
  if(!parsed.success)throw new Error('Stored chatbot settings do not match the approved schema');
  return {settings:parsed.data,version:data.updated_at || null};
}

/** Read settings from the same durable source as the admin editor. */
export const getChatSettings = unstable_cache(async ():Promise<ChatBotSettings>=>{
  const latest=await getChatSettingsAdmin();
  return latest.settings;
},['site-chat-settings-v3'],{tags:['site_chat_settings'],revalidate:86400});

export async function updateChatSettings(
  raw:unknown, expectedVersion:unknown
):Promise<{settings:ChatBotSettings;version:string}>{
  const parsed=SettingsSchema.safeParse(raw);
  if(!parsed.success)throw new Error('Invalid chatbot settings');
  if(!(expectedVersion===null || (typeof expectedVersion==='string' &&
      !Number.isNaN(Date.parse(expectedVersion)))))
    throw new Error('A valid previously loaded revision is required');
  const db=createServiceClient();
  const {data:current,error:readError}=await noStorePageSelect();
  if(readError)throw new Error('Unable to retrieve persisted chat settings');
  if((current?.updated_at || null)!==expectedVersion)
    throw new Error('Chatbot settings changed in another session. Refresh before saving.');
  const now=Date.now(),prev=current?.updated_at?Date.parse(current.updated_at):0;
  const updated_at=new Date(Math.max(now,Number.isFinite(prev)?prev+1:now)).toISOString();
  if(current){
    const {data,error}=await db.from('page_content').update({
      content_blocks:parsed.data, updated_at,
    }).eq('page_key',CHAT_KEY).eq('language',CHAT_LOCALE)
      .eq('updated_at',expectedVersion as string)
      .select('updated_at').maybeSingle();
    if(error)throw new Error('Unable to save chatbot settings');
    if(!data)throw new Error('Chatbot settings changed in another session. Refresh before saving.');
  }else{
    const {error}=await db.from('page_content').insert({
      page_key:CHAT_KEY,language:CHAT_LOCALE,seo_title:'',seo_description:'',h1:'',
      content_blocks:parsed.data,updated_at,
    });
    if(error?.code==='23505')throw new Error('Chatbot settings changed in another session. Refresh before saving.');
    if(error)throw new Error('Unable to save chatbot settings');
  }
  revalidateTag('site_chat_settings');
  return {settings:parsed.data,version:updated_at};
}

// Conversation telemetry has no durable backing table yet. Do not pretend
// that cold-starts or parallel server instances preserve complete history.
const TMP_CHAT_SESSIONS = '/tmp/chat-bot-sessions.json';
let memorySessions: ChatSessionRecord[] = [];
let initialized = false;
function loadStoredChat():void{
  if(initialized)return;
  initialized=true;
  try{
    const fs=require('fs');
    if(fs.existsSync(TMP_CHAT_SESSIONS)){
      const rows=JSON.parse(fs.readFileSync(TMP_CHAT_SESSIONS,'utf8'));
      if(Array.isArray(rows))memorySessions=rows.slice(-100);
    }
  }catch { memorySessions=[]; }
}
export function logChatSession(record: ChatSessionRecord):void{
  loadStoredChat();
  const idx=memorySessions.findIndex(s=>s.id===record.id);
  if(idx>=0)memorySessions[idx]={...memorySessions[idx],...record};
  else memorySessions.unshift(record);
  memorySessions=memorySessions.slice(0,100);
  try{
    const fs=require('fs');
    fs.writeFileSync(TMP_CHAT_SESSIONS,JSON.stringify(memorySessions),'utf8');
  }catch{/* ephemeral best effort, never claim complete history */}
}
export function getChatSessions():ChatSessionRecord[]{
  loadStoredChat();
  return [...memorySessions];
}

export interface ChatBotSettings {
  enabled: boolean;
  botName: string;
  tone: 'warm_vip' | 'concise_executive' | 'hajj_umrah_focused';
  greetingAr: string;
  greetingEn: string;
  quickActions: {
    bookTransfer: boolean;
    hourlyDriver: boolean;
    trackBooking: boolean;
    getPrice: boolean;
    talkAgent: boolean;
    faq: boolean;
  };
  costCapMonthlyUsd: number;
  maxTokens: number;
}

export interface ChatSessionRecord {
  id: string;
  createdAt: string;
  locale: string;
  messagesCount: number;
  lastUserMessage: string;
  lastAssistantMessage: string;
  handoffOccurred: boolean;
  handoffRef?: string;
  ipMasked?: string;
}

export const DEFAULT_CHAT_SETTINGS: ChatBotSettings = {
  enabled: true,
  botName: 'رفيق ضيوف الرحمن / Rafeeq AI',
  tone: 'warm_vip',
  greetingAr: 'أهلاً بكم في ضيوف الرحمن VIP 🕋✨ أنا "رفيق"، مساعدكم الآلي الخاص لنقل العمرة والزيارة. كيف يمكنني خدمتكم في رحلتكم المباركة اليوم؟',
  greetingEn: 'Welcome to Duyuf Alrahman VIP 🕋✨ I am "Rafeeq", your dedicated pilgrimage chauffeur assistant. How may I assist you with your sacred journey today?',
  quickActions: {
    bookTransfer: true,
    hourlyDriver: true,
    trackBooking: true,
    getPrice: true,
    talkAgent: true,
    faq: true,
  },
  costCapMonthlyUsd: 50,
  maxTokens: 800,
};

const SettingsSchema = z.object({
  enabled:z.boolean(),
  botName:z.string().trim().min(2).max(90),
  tone:z.enum(['warm_vip','concise_executive','hajj_umrah_focused']),
  greetingAr:z.string().trim().min(2).max(1200),
  greetingEn:z.string().trim().min(2).max(1200),
  quickActions:z.object({
    bookTransfer:z.boolean(),hourlyDriver:z.boolean(),trackBooking:z.boolean(),
    getPrice:z.boolean(),talkAgent:z.boolean(),faq:z.boolean(),
  }).strict(),
  costCapMonthlyUsd:z.number().finite().min(0).max(10000),
  maxTokens:z.number().int().min(100).max(4000),
}).strict();

const CHAT_KEY='chat_settings';
const CHAT_LOCALE='all';
const noStorePageSelect=() => createServiceClient().from('page_content')
  .select('content_blocks,updated_at')
  .eq('page_key',CHAT_KEY).eq('language',CHAT_LOCALE).maybeSingle();

export async function getChatSettingsAdmin(): Promise<{settings:ChatBotSettings;version:string|null}> {
  const {data,error}=await noStorePageSelect();
  if(error)throw new Error('Unable to retrieve persisted chat settings');
  if(!data)return {settings:DEFAULT_CHAT_SETTINGS,version:null};
  const parsed=SettingsSchema.safeParse(data.content_blocks);
  if(!parsed.success)throw new Error('Stored chatbot settings do not match the approved schema');
  return {settings:parsed.data,version:data.updated_at || null};
}

/** Read settings from the same durable source as the admin editor. */
export const getChatSettings = unstable_cache(async ():Promise<ChatBotSettings>=>{
  const latest=await getChatSettingsAdmin();
  return latest.settings;
},['site-chat-settings-v3'],{tags:['site_chat_settings'],revalidate:86400});

export async function updateChatSettings(
  raw:unknown, expectedVersion:unknown
):Promise<{settings:ChatBotSettings;version:string}>{
  const parsed=SettingsSchema.safeParse(raw);
  if(!parsed.success)throw new Error('Invalid chatbot settings');
  if(!(expectedVersion===null || (typeof expectedVersion==='string' &&
      !Number.isNaN(Date.parse(expectedVersion)))))
    throw new Error('A valid previously loaded revision is required');
  const db=createServiceClient();
  const {data:current,error:readError}=await noStorePageSelect();
  if(readError)throw new Error('Unable to retrieve persisted chat settings');
  if((current?.updated_at || null)!==expectedVersion)
    throw new Error('Chatbot settings changed in another session. Refresh before saving.');
  const now=Date.now(),prev=current?.updated_at?Date.parse(current.updated_at):0;
  const updated_at=new Date(Math.max(now,Number.isFinite(prev)?prev+1:now)).toISOString();
  if(current){
    const {data,error}=await db.from('page_content').update({
      content_blocks:parsed.data, updated_at,
    }).eq('page_key',CHAT_KEY).eq('language',CHAT_LOCALE)
      .eq('updated_at',expectedVersion as string)
      .select('updated_at').maybeSingle();
    if(error)throw new Error('Unable to save chatbot settings');
    if(!data)throw new Error('Chatbot settings changed in another session. Refresh before saving.');
  }else{
    const {error}=await db.from('page_content').insert({
      page_key:CHAT_KEY,language:CHAT_LOCALE,seo_title:'',seo_description:'',h1:'',
      content_blocks:parsed.data,updated_at,
    });
    if(error?.code==='23505')throw new Error('Chatbot settings changed in another session. Refresh before saving.');
    if(error)throw new Error('Unable to save chatbot settings');
  }
  revalidateTag('site_chat_settings');
  return {settings:parsed.data,version:updated_at};
}

// Conversation telemetry has no durable backing table yet. Do not pretend
// that cold-starts or parallel server instances preserve complete history.
const TMP_CHAT_SESSIONS = '/tmp/chat-bot-sessions.json';
let memorySessions: ChatSessionRecord[] = [];
let initialized = false;
function loadStoredChat():void{
  if(initialized)return;
  initialized=true;
  try{
    const fs=require('fs');
    if(fs.existsSync(TMP_CHAT_SESSIONS)){
      const rows=JSON.parse(fs.readFileSync(TMP_CHAT_SESSIONS,'utf8'));
      if(Array.isArray(rows))memorySessions=rows.slice(-100);
    }
  }catch { memorySessions=[]; }
}
export function logChatSession(record: ChatSessionRecord):void{
  loadStoredChat();
  const idx=memorySessions.findIndex(s=>s.id===record.id);
  if(idx>=0)memorySessions[idx]={...memorySessions[idx],...record};
  else memorySessions.unshift(record);
  memorySessions=memorySessions.slice(0,100);
  try{
    const fs=require('fs');
    fs.writeFileSync(TMP_CHAT_SESSIONS,JSON.stringify(memorySessions),'utf8');
  }catch{/* ephemeral best effort, never claim complete history */}
}
export function getChatSessions():ChatSessionRecord[]{
  loadStoredChat();
  return [...memorySessions];
}
