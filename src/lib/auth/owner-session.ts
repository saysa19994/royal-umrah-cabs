import crypto from 'crypto';

export const OWNER_EMAIL = 'sayedsaed2020@gmail.com';
const SECRET = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'vip-owner-session-secret-2026';

export function createOwnerSessionToken(): string {
  const payload = `${OWNER_EMAIL}:${Date.now()}`;
  const hmac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${Buffer.from(payload).toString('base64')}.${hmac}`;
}

export function verifyOwnerSessionToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const [b64, hmac] = token.split('.');
    if (!b64 || !hmac) return false;
    const payload = Buffer.from(b64, 'base64').toString('utf8');
    const [email, timestamp] = payload.split(':');
    if (email !== OWNER_EMAIL) return false;
    const expectedHmac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
    if (hmac !== expectedHmac) return false;
    const age = Date.now() - Number(timestamp);
    // Valid for 14 days
    return age > 0 && age < 14 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}
