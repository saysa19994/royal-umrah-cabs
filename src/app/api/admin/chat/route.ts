import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getChatSettings, updateChatSettings, getChatSessions } from '@/lib/chat-settings';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin']);
  if (auth.errorResponse) return auth.errorResponse;
  try {
    const settings = getChatSettings();
    const sessions = getChatSessions();
    return NextResponse.json({ success: true, settings, sessions }, {headers:{'Cache-Control':'private, no-store'}});
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve chat settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin']);
  if (auth.errorResponse) return auth.errorResponse;
  try {
    const body = await request.json();
    const updated = updateChatSettings(body);
    return NextResponse.json({ success: true, settings: updated }, {headers:{'Cache-Control':'private, no-store'}});
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update chat settings' }, { status: 500 });
  }
}
