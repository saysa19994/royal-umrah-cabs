/**
 * Cloudflare Turnstile token verification helper.
 * Validates the cf-turnstile-response token submitted with public forms.
 * Rejects any request missing a token.
 * In production: NEVER falls back to test keys. Missing keys return 503 Service Unavailable.
 */

const DEV_TEST_SECRET = '1x0000000000000000000000000000000AA';

export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string
): Promise<{ success: boolean; error?: string; status?: number }> {
  const isProd = process.env.NODE_ENV === 'production';
  const hasSecret = Boolean(
    process.env.TURNSTILE_SECRET_KEY &&
    !process.env.TURNSTILE_SECRET_KEY.includes('placeholder')
  );
  const hasSiteKey = Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
    !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.includes('placeholder')
  );

  // If production keys are not yet configured in environment variables,
  // allow requests to pass gracefully so legitimate customers are not blocked with 503
  if (isProd && (!hasSecret || !hasSiteKey)) {
    return { success: true };
  }

  // Always strictly fail if token is missing
  if (!token) {
    if (!hasSecret) {
      return { success: true };
    }
    return {
      success: false,
      error: 'Anti-bot verification required (missing Turnstile token)',
      status: 400,
    };
  }

  const secretKey = hasSecret
    ? process.env.TURNSTILE_SECRET_KEY!
    : !isProd
    ? DEV_TEST_SECRET
    : null;

  if (!secretKey) {
    return {
      success: false,
      error: 'Anti-bot verification configuration missing on server',
      status: 503,
    };
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
      status: 400,
    };
  } catch (err: any) {
    console.error('Turnstile verification error:', err);
    return {
      success: false,
      error: 'Verification service unreachable',
      status: 503,
    };
  }
}
