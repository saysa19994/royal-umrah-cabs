import { NextResponse } from 'next/server';

/**
 * Shared In-Memory & Distributed Rate Limiter
 * Provides rate limiting by IP and by Account/Identifier.
 * Prevents account locking purely by email (uses IP + account combination).
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

class InMemoryRateLimiter {
  private store: Map<string, RateLimitRecord> = new Map();

  async check(
    key: string,
    limit: number,
    windowMs: number
  ): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now();
    const record = this.store.get(key);

    if (!record || record.resetAt <= now) {
      this.store.set(key, { count: 1, resetAt: now + windowMs });
      return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
    }

    if (record.count >= limit) {
      return { success: false, limit, remaining: 0, reset: record.resetAt };
    }

    record.count += 1;
    this.store.set(key, record);
    return { success: true, limit, remaining: limit - record.count, reset: record.resetAt };
  }

  cleanup() {
    const now = Date.now();
    this.store.forEach((v, k) => {
      if (v.resetAt <= now) {
        this.store.delete(k);
      }
    });
  }
}

const memoryStore = new InMemoryRateLimiter();

if (typeof setInterval !== 'undefined') {
  setInterval(() => memoryStore.cleanup(), 5 * 60 * 1000);
}

/**
 * Asserts required environment variables in production.
 * If critical infrastructure secrets are missing in production, returns a 503 Service Unavailable response.
 */
export function checkRequiredEnv(): { ok: boolean; response?: NextResponse } {
  if (process.env.NODE_ENV === 'production') {
    const missing: string[] = [];
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY.includes('placeholder')) {
      missing.push('SUPABASE_SERVICE_ROLE_KEY');
    }
    if (!process.env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY.includes('placeholder')) {
      missing.push('TURNSTILE_SECRET_KEY');
    }
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      missing.push('UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN');
    }

    if (missing.length > 0) {
      console.error(`[SECURITY CRITICAL FAIL-CLOSED] Missing required production environment variables: ${missing.join(', ')}`);
      return {
        ok: false,
        response: NextResponse.json(
          { error: 'Service temporarily unavailable due to server security requirements. Please try again shortly.' },
          { status: 503 }
        ),
      };
    }
  }
  return { ok: true };
}

/**
 * Shared rate limiting function.
 * If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, uses Upstash REST API;
 * otherwise uses in-memory sliding store in non-production.
 */
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const key = `rate_limit:${identifier}`;
      const url = `${upstashUrl}/pipeline`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          ['INCR', key],
          ['EXPIRE', key, windowSeconds],
        ]),
      });

      if (res.ok) {
        const data = await res.json();
        const currentCount = data[0]?.result || 1;
        const success = currentCount <= limit;
        return {
          success,
          limit,
          remaining: Math.max(0, limit - currentCount),
          reset: Date.now() + windowSeconds * 1000,
        };
      }
    } catch (e) {
      console.warn('Upstash rate limit error, falling back to memory store:', e);
    }
  }

  return memoryStore.check(identifier, limit, windowSeconds * 1000);
}

/**
 * Platform-safe client IP extractor.
 * Uses x-vercel-forwarded-for or x-real-ip before falling back to x-forwarded-for,
 * preventing spoofing via client-injected headers on Vercel/proxies.
 */
export function getClientIp(request: Request): string {
  // 1. Vercel edge trusted client header
  const vercelIp = request.headers.get('x-vercel-forwarded-for');
  if (vercelIp) {
    return vercelIp.split(',')[0].trim();
  }

  // 2. Direct upstream proxy real-ip header
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // 3. Fallback to standard x-forwarded-for
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return '127.0.0.1';
}
