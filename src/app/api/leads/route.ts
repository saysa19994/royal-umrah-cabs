import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logLeadAndGenerateWhatsAppUrl } from '@/lib/whatsapp-routing';
import { rateLimit, getClientIp, checkRequiredEnv } from '@/lib/rate-limit';
import { verifyTurnstileToken } from '@/lib/turnstile';

export const dynamic = 'force-dynamic';

// Whitelist-only schema with strict rejection of unknown properties
const LeadInputSchema = z
  .object({
    page: z.string().max(255).optional(),
    language: z.enum(['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr']).default('en'),
    route_id: z.string().max(100).optional().nullable(),
    route_title: z.string().max(255).optional().nullable(),
    vehicle_id: z.string().max(100).optional().nullable(),
    vehicle_name: z.string().max(255).optional().nullable(),
    pickup_date: z.string().max(50).optional().nullable(),
    passengers: z.number().int().min(1).max(100).optional(),
    luggage: z.number().int().min(0).max(100).optional(),
    customer_name: z.string().max(150).optional().nullable(),
    customer_phone: z
      .string()
      .regex(/^\+?[0-9\s\-()]{7,25}$/, 'Invalid telephone number format')
      .optional()
      .nullable(),
    notes: z.string().max(1000).optional().nullable(),
    source_utm: z.record(z.string().max(100), z.string().max(255)).optional(),
    'cf-turnstile-response': z.string().max(2048).optional(),
    turnstile_token: z.string().max(2048).optional(),
  })
  .strict(); // Rejects unknown fields strictly

export async function POST(req: NextRequest) {
  try {
    // 1. Fail-closed check: required environment secrets in production
    const envCheck = checkRequiredEnv();
    if (!envCheck.ok && envCheck.response) {
      return envCheck.response;
    }

    const clientIp = getClientIp(req);

    // 2. Rate limiting: 10 leads per 5 minutes per IP
    const rl = await rateLimit(`lead_sub:${clientIp}`, 10, 300);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    let jsonBody;
    try {
      jsonBody = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload' },
        { status: 400 }
      );
    }

    // 3. Strict Zod validation
    const parsed = LeadInputSchema.safeParse(jsonBody);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input fields',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = parsed.data;

    // 4. Turnstile anti-bot verification
    const turnstileToken = validatedData['cf-turnstile-response'] || validatedData.turnstile_token;
    const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileCheck.success) {
      return NextResponse.json(
        { success: false, error: turnstileCheck.error || 'Verification failed.' },
        { status: 400 }
      );
    }

    const result = await logLeadAndGenerateWhatsAppUrl(validatedData);
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
