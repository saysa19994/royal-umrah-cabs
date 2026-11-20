import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');

test('chat admin settings and transcript listings require an authenticated privileged owner',()=>{
 const route=read('src/app/api/admin/chat/route.ts');
 assert.match(route,/export async function GET\(request: Request\)/);
 assert.match(route,/export async function POST\(request: Request\)/);
 assert.equal((route.match(/requireRole\(request,\['owner','admin'\]\)/g)||[]).length,2);
 assert.match(route,/if\(auth\.errorResponse\)return auth\.errorResponse/);
 assert.match(route,/private, no-store/);
});

test('chat settings use durable versioned page_content, not a tmp file or in-memory store',()=>{
 const service=read('src/lib/chat-settings.ts');
 assert.match(service,/function getChatSettingsAdmin/);
 assert.match(service,/\.from\('page_content'\)/);
 assert.match(service,/\.eq\('updated_at',expectedVersion as string\)/);
 assert.match(service,/seo_title:'',seo_description:'',h1:''/);
 assert.match(service,/revalidateTag\('site_chat_settings'\)/);
 assert.doesNotMatch(service,/TMP_CHAT_SETTINGS|memorySettings|chat-bot-settings\.json/);
 assert.match(read('src/app/api/chat/route.ts'),/await getChatSettings\(\)/);
});

test('chat sessions do not contain fabricated customers or false analytics',()=>{
 const service=read('src/lib/chat-settings.ts');
 assert.doesNotMatch(service,/sess-84912|sess-84908|sess-84882/);
 assert.match(service,/return \[\.\.\.memorySessions\]/);
 const ui=read('src/app/admin/chat/page.tsx');
 assert.match(ui,/سجلات المحادثات الحالية مؤقتة/);
 assert.doesNotMatch(ui,/ : '100%'\}/);
});

test('chat admin saves read back persisted settings before claiming success',()=>{
 const route=read('src/app/api/admin/chat/route.ts');
 const ui=read('src/app/admin/chat/page.tsx');
 assert.match(route,/updateChatSettings\(body\.settings,body\.expected_updated_at\)/);
 assert.match(route,/status:conflict\?409/);
 assert.match(ui,/expected_updated_at:savedVersion/);
 assert.match(ui,/const stored=await fetchData\(\)/);
 assert.match(ui,/settingsLoaded/);
});
