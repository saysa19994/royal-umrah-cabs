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

  // Periodic cleanup
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

// Clean memory every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => memoryStore.cleanup(), 5 * 60 * 1000);
}

/**
 * Shared rate limiting function.
 * If UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, uses Upstash REST API;
 * otherwise uses in-memory sliding store.
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
      console.warn('Upstash rate limit fallback to memory store:', e);
    }
  }

  return memoryStore.check(identifier, limit, windowSeconds * 1000);
}

/**
 * Helper to extract client IP from Next.js request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}
