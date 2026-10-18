/**
 * Cloudflare Turnstile token verification helper.
 * Validates the cf-turnstile-response token submitted with public forms.
 * Rejects any request missing a token, and uses Cloudflare test secret key in development.
 */

const DEV_TEST_SECRET = '1x0000000000000000000000000000000AA';

export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  // Always strictly fail if token is missing
  if (!token) {
    return { success: false, error: 'Anti-bot verification required (missing Turnstile token)' };
  }

  const secretKey =
    process.env.TURNSTILE_SECRET_KEY && !process.env.TURNSTILE_SECRET_KEY.includes('placeholder')
      ? process.env.TURNSTILE_SECRET_KEY
      : process.env.NODE_ENV !== 'production'
      ? DEV_TEST_SECRET
      : null;

  if (!secretKey) {
    return { success: false, error: 'Anti-bot verification configuration missing on server' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const outcome = await res.json();
    if (outcome.success) {
      return { success: true };
    }

    return {
      success: false,
      error: 'Anti-bot verification failed. Please refresh and try again.',
    };
  } catch (err: any) {
    console.error('Turnstile verification error:', err);
    return { success: false, error: 'Verification service unreachable' };
  }
}
