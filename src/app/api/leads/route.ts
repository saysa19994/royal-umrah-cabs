import { NextRequest, NextResponse } from 'next/server';
import { logLeadAndGenerateWhatsAppUrl, LeadCreationPayload } from '@/lib/whatsapp-routing';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { verifyTurnstileToken } from '@/lib/turnstile';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // Rate limiting: 10 leads per 5 minutes per IP
    const rl = await rateLimit(`lead_sub:${clientIp}`, 10, 300);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = (await req.json()) as LeadCreationPayload & { 'cf-turnstile-response'?: string; turnstile_token?: string };

    // Turnstile anti-bot verification
    const turnstileToken = body['cf-turnstile-response'] || body.turnstile_token;
    const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileCheck.success) {
      return NextResponse.json(
        { success: false, error: turnstileCheck.error || 'Verification failed.' },
        { status: 400 }
      );
    }

    const result = await logLeadAndGenerateWhatsAppUrl(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /api/leads error:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process inquiry',
      },
      { status: 500 }
    );
  }
}
