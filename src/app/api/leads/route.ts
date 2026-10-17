import { NextRequest, NextResponse } from 'next/server';
import { logLeadAndGenerateWhatsAppUrl, LeadCreationPayload } from '@/lib/whatsapp-routing';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadCreationPayload;
    const result = await logLeadAndGenerateWhatsAppUrl(body);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /api/leads error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to process lead',
      },
      { status: 500 }
    );
  }
}
