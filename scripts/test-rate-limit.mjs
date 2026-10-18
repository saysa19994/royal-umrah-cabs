import assert from 'node:assert/strict';

/**
 * Unit tests for sliding-window rate limiting
 */

class TestSlidingWindowLimiter {
  constructor() {
    this.store = new Map();
  }

  async check(key, limit, windowMs) {
    const now = Date.now();
    const windowStart = now - windowMs;

    let timestamps = this.store.get(key) || [];
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
}

async function runRateLimitTests() {
  console.log('--- Testing Sliding Window Rate Limiter ---');
  const limiter = new TestSlidingWindowLimiter();

  // Test 1: Basic limit enforcement
  console.log('Test 1: Enforce limit (3 requests per 1000ms)');
  const res1 = await limiter.check('test_ip_1', 3, 1000);
  assert.equal(res1.success, true, 'First request should succeed');
  assert.equal(res1.remaining, 2, 'Remaining should be 2');

  const res2 = await limiter.check('test_ip_1', 3, 1000);
  assert.equal(res2.success, true, 'Second request should succeed');
  assert.equal(res2.remaining, 1, 'Remaining should be 1');

  const res3 = await limiter.check('test_ip_1', 3, 1000);
  assert.equal(res3.success, true, 'Third request should succeed');
  assert.equal(res3.remaining, 0, 'Remaining should be 0');

  const res4 = await limiter.check('test_ip_1', 3, 1000);
  assert.equal(res4.success, false, 'Fourth request should be blocked');
  assert.equal(res4.remaining, 0);
  console.log('  -> PASS: Successfully blocked 4th request');

  // Test 2: Separate keys per IP and Account (never lock email globally)
  console.log('Test 2: Key isolation (attacker IP cannot lock victim account on different IP)');
  const attackerIp = '198.51.100.1';
  const victimIp = '203.0.113.5';
  const targetEmail = 'admin@royalumrahcabs.com';

  const attackerKey = `login_acc:${attackerIp}:${targetEmail}`;
  const victimKey = `login_acc:${victimIp}:${targetEmail}`;

  // Attacker exhausts attempts
  for (let i = 0; i < 5; i++) {
    await limiter.check(attackerKey, 5, 5000);
  }
  const attackerBlocked = await limiter.check(attackerKey, 5, 5000);
  assert.equal(attackerBlocked.success, false, 'Attacker should be blocked');

  // Legitimate user on another IP should still succeed
  const victimAllowed = await limiter.check(victimKey, 5, 5000);
  assert.equal(victimAllowed.success, true, 'Legitimate user on different IP must NOT be blocked');
  console.log('  -> PASS: Key isolation prevents cross-IP account denial-of-service');

  // Test 3: Expiry is not indefinitely pushed forward on every blocked ping
  console.log('Test 3: Sliding window does not renew expiry on blocked requests');
  const shortKey = 'short_window_test';
  const t0 = Date.now();
  await limiter.check(shortKey, 1, 300);
  const blocked1 = await limiter.check(shortKey, 1, 300);
  assert.equal(blocked1.success, false);

  // Wait 350ms for window to slide out
  await new Promise((resolve) => setTimeout(resolve, 350));
  const recovered = await limiter.check(shortKey, 1, 300);
  assert.equal(recovered.success, true, 'Request should succeed once window has elapsed');
  console.log('  -> PASS: Window slides properly and allows new requests');

  console.log('All rate limiting tests passed!\n');
}

runRateLimitTests().catch((err) => {
  console.error('Rate limit test failed:', err);
  process.exit(1);
});
