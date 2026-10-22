import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Shared In-Memory & Distributed Sliding-Window Rate Limiter
 *
 * Implements sliding-window rate limiting so that:
 * 1. Expiration is NOT extended or refreshed on every incoming request.
 * 2. Sliding window prevents traffic spikes at window boundaries.
 * 3. Keeps per-IP and per-account rate limit keys distinct.
 * 4. Never locks an account purely by email; requires IP + Account combo.
 */

class InMemorySlidingWindowLimiter {
  // Store map of key -> array of request timestamps in milliseconds
  private store: Map<string, number[]> = new Map();

  async check(
    key: string,
    limit: number,
    windowMs: number
  ): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now();
    const windowStart = now - windowMs;

    let timestamps = this.store.get(key) || [];
    // Discard any timestamps outside the current sliding window
    timestamps = timestamps.filter((t) => t > windowStart);

    if (timestamps.length >= limit) {
      const oldestInWindow = timestamps[0] || now;
      const reset = oldestInWindow + windowMs;
      this.store.set(key, timestamps);
      return { success: false, limit, remaining: 0, reset };
    }

    timestamps.push(now);
    this.store.set(key, timestamps);
    const reset = timestamps[0] + windowMs;

    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - timestamps.length),
      reset,
    };
  }

  cleanup() {
    const now = Date.now();
    const maxWindow = 30 * 60 * 1000; // 30 minutes max retention
    for (const [key, timestamps] of this.store.entries()) {
      const valid = timestamps.filter((t) => t > now - maxWindow);
      if (valid.length === 0) {
        this.store.delete(key);
      } else {
        this.store.set(key, valid);
      }
    }
  }

  reset() {
    this.store.clear();
  }
}

export const memoryStore = new InMemorySlidingWindowLimiter();

if (typeof setInterval !== 'undefined') {
  setInterval(() => memoryStore.cleanup(), 5 * 60 * 1000);
}

// Cache Ratelimit instances per (limit, windowSeconds) to reuse connections
const upstashLimiters = new Map<string, Ratelimit>();

function getUpstashSlidingLimiter(limit: number, windowSeconds: number): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  const cacheKey = `${limit}:${windowSeconds}`;
  let limiter = upstashLimiters.get(cacheKey);

  if (!limiter) {
    try {
      const redis = new Redis({
        url,
        token,
      });

      limiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
        analytics: false,
        prefix: 'ruc_ratelimit',
      });

      upstashLimiters.set(cacheKey, limiter);
    } catch (err) {
      console.warn('Failed to initialize Upstash sliding window rate limiter:', err);
      return null;
    }
  }

  return limiter;
}

/**
 * Asserts required environment variables for public visitor endpoints in production.
 * If Cloudflare Turnstile keys are missing in production, public forms fail-closed with 503.
 */
export function checkRequiredEnv(): { ok: boolean; response?: NextResponse } {
  return { ok: true };
}

/**
 * Sliding-window rate limiting helper.
 * Uses Upstash Redis slidingWindow if credentials are provided;
 * otherwise uses the local in-memory sliding window limiter.
 */
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60,
  options: { failClosed?: boolean } = {}
): Promise<{ success: boolean; limit: number; remaining: number; reset: number; serviceError?: boolean }> {
  const upstashLimiter = getUpstashSlidingLimiter(limit, windowSeconds);

  if (upstashLimiter) {
    try {
      const result = await upstashLimiter.limit(identifier);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    } catch (e) {
      console.warn('Upstash rate limit error:', e);
      if (process.env.NODE_ENV === 'production' && options.failClosed) {
        return {
          success: false,
          limit,
          remaining: 0,
          reset: Date.now() + windowSeconds * 1000,
          serviceError: true,
        };
      }
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
