import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getSiteSettingsCached } from '@/lib/settings';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey.includes('placeholder')) {
      return NextResponse.json({
        success: false,
        configured: false,
        error: 'RESEND_API_KEY is not configured in server environment variables. Please configure it in your Vercel/production settings.',
      }, { status: 400 });
    }

    const settings = await getSiteSettingsCached();
    const recipient = settings.owner_notification_email || settings.email || 'info@duyufalrahmanvip.com';
    const fromAddress = process.env.RESEND_FROM || 'Duyuf Alrahman VIP <notifications@duyufalrahmanvip.com>';

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipient],
        subject: 'Duyuf Alrahman VIP — Operational Test Email Dispatch',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0A0D14; color: #FAF9F6; border: 1px solid #D9A031; border-radius: 12px;">
            <h2 style="color: #D9A031; margin-top: 0;">Duyuf Alrahman VIP — Test Dispatch</h2>
            <p>This is a verified test email sent from the Duyuf Alrahman VIP Operations Portal.</p>
            <p><strong>Recipient:</strong> ${recipient}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p style="color: #34D399;">✓ Email infrastructure is connected and operational.</p>
          </div>
        `,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({
        success: false,
        configured: true,
        error: data.message || 'Resend API returned an error dispatching email',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      configured: true,
      message: `Test email successfully dispatched to ${recipient}`,
      id: data.id,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Internal server error',
    }, { status: 500 });
  }
}
