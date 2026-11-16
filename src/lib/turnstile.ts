/**
 * Cloudflare Turnstile token verification helper.
 * Validates the cf-turnstile-response token submitted with public forms.
 * Rejects any request missing a token.
 * In production: NEVER falls back to test keys. Missing keys return 503 Service Unavailable.
 */

const DEV_TEST_SECRET = '1x0000000000000000000000000000000AA';

// Cloudflare publishes predictable test credentials. Never accept them in a
// production or Vercel preview runtime, where NODE_ENV is 'production'.
const TEST_SECRET_KEYS = new Set([
  '1x0000000000000000000000000000000AA',
  '2x0000000000000000000000000000000AA',
  '3x0000000000000000000000000000000AA',
]);
const TEST_SITE_KEYS = new Set([
  '1x00000000000000000000AA',
  '2x00000000000000000000AB',
  '1x00000000000000000000BB',
  '2x00000000000000000000BB',
  '3x00000000000000000000FF',
]);

export function isProductionTurnstileConfigured(): boolean {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim() || '';
  const site = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || '';
  return Boolean(
    secret && site &&
    !secret.includes('placeholder') &&
    !site.includes('placeholder') &&
    !TEST_SECRET_KEYS.has(secret) &&
    !TEST_SITE_KEYS.has(site)
  );
}

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

  // Production must never bypass bot verification when credentials are missing.
  if (isProd && !isProductionTurnstileConfigured()) {
    return { success: false, error: 'Anti-bot verification is temporarily unavailable', status: 503 };
  }

  // Missing or whitespace-only tokens are always rejected, including development.
  if (!token || !token.trim()) {
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
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return { success: false, error: 'Verification service temporarily unavailable', status: 503 };
    }

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
