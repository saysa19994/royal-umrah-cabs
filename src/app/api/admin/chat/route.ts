import { NextResponse } from 'next/server';
import { getChatSettings, updateChatSettings, getChatSessions } from '@/lib/chat-settings';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const settings = getChatSettings();
    const sessions = getChatSessions();
    return NextResponse.json({ success: true, settings, sessions });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve chat settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updated = updateChatSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update chat settings' }, { status: 500 });
  }
}
