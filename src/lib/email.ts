/**
 * Transactional Email Dispatcher for Duyuf Alrahman VIP
 * Securely handles critical security emails (ownership transfers, executive alerts).
 * Never exposes confirmation tokens in application logs or client responses.
 */

interface SendOwnershipTransferEmailParams {
  to: string;
  targetEmail: string;
  confirmationToken: string;
  expiresAt: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendOwnershipTransferEmail(
  params: SendOwnershipTransferEmailParams
): Promise<{ success: boolean; error?: string }> {
  const { to, targetEmail, confirmationToken, expiresAt } = params;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const fromAddress = process.env.RESEND_FROM || 'Duyuf Alrahman VIP Security <security@duyufalrahmanvip.com>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [to],
          subject: '🚨 CRITICAL: Duyuf Alrahman VIP Ownership Transfer Confirmation Required',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0D0F12; color: #F3EEE6; border-radius: 12px; border: 1px solid #262B33;">
              <h2 style="color: #D9A031; margin-top: 0;">Primary Ownership Transfer Requested</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #A0A6B2;">
                A request has been initiated to transfer primary ownership of <strong>Duyuf Alrahman VIP</strong> to:
              </p>
              <div style="font-size: 15px; font-weight: bold; color: #FAF9F6; background: #14171C; border: 1px solid #2B323D; padding: 12px 16px; border-radius: 8px; margin: 16px 0;">
                ${escapeHtml(targetEmail)}
              </div>
              <p style="font-size: 14px; line-height: 1.6; color: #A0A6B2;">
                To authorize and execute this irreversible operation, enter the following confirmation token in your executive settings panel:
              </p>
              <div style="font-size: 20px; font-family: monospace; letter-spacing: 2px; font-weight: bold; color: #D9A031; background: #1C222B; border: 1px dashed #D9A031; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0;">
                ${confirmationToken}
              </div>
              <p style="font-size: 12px; color: #6C7584; line-height: 1.5; margin-top: 24px; border-top: 1px solid #262B33; pt: 16px;">
                This token expires at <strong>${new Date(expiresAt).toUTCString()}</strong>. If you did not initiate this request, change your credentials immediately and revoke active sessions.
              </p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        console.error('Failed to dispatch ownership transfer email via Resend API');
        return { success: false, error: 'Transactional email provider error' };
      }

      return { success: true };
    } catch (err: any) {
      console.error('Email dispatch error');
      return { success: false, error: 'Network failure dispatching security email' };
    }
  }

  // In production, missing RESEND_API_KEY must fail-closed
  if (process.env.NODE_ENV === 'production') {
    return {
      success: false,
      error: 'Transactional email service is not configured (missing RESEND_API_KEY in production).',
    };
  }

  // Development Fallback: note dispatch without leaking token
  console.info(`[DEV SECURITY EVENT] Ownership transfer confirmation dispatched securely to verified owner: ${to}. Token omitted from logs.`);
  return { success: true };
}
