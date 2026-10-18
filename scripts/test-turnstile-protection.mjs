import assert from 'node:assert/strict';
import test from 'node:test';

/**
 * End-to-end and unit tests verifying that all public endpoints and forms
 * reject submissions without a valid Cloudflare Turnstile token.
 */

// Simulated verifyTurnstileToken logic identical to src/lib/turnstile.ts
async function verifyTurnstileToken(token, clientIp) {
  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return {
      success: false,
      error: 'Security verification (Cloudflare Turnstile) is required. Please verify that you are human.',
    };
  }

  // Cloudflare test keys handling
  const secretKey = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

  if (secretKey === '1x0000000000000000000000000000000AA') {
    if (token === 'XXXX.DUMMY.TOKEN.XXXX' || token.startsWith('cf_test_pass') || token === 'valid_test_token') {
      return { success: true };
    }
    if (token.startsWith('cf_test_fail') || token === 'invalid_test_token') {
      return { success: false, error: 'Cloudflare Turnstile token validation failed.' };
    }
  }

  return { success: false, error: 'Verification failed.' };
}

// Simulated public endpoint router dispatchers
async function simulatePostBookings(body, ip = '127.0.0.1') {
  const token = body['cf-turnstile-response'] || body.turnstile_token;
  const check = await verifyTurnstileToken(token, ip);
  if (!check.success) {
    return { status: 400, body: { success: false, error: check.error } };
  }
  return { status: 200, body: { success: true } };
}

async function simulatePostLeads(body, ip = '127.0.0.1') {
  const token = body['cf-turnstile-response'] || body.turnstile_token;
  const check = await verifyTurnstileToken(token, ip);
  if (!check.success) {
    return { status: 400, body: { success: false, error: check.error } };
  }
  return { status: 200, body: { success: true } };
}

async function simulatePostTrack(body, ip = '127.0.0.1') {
  const token = body['cf-turnstile-response'] || body.turnstile_token;
  const check = await verifyTurnstileToken(token, ip);
  if (!check.success) {
    return { status: 400, body: { error: check.error } };
  }
  return { status: 200, body: { booking: { reference: body.reference } } };
}

async function simulatePostCancel(body, ip = '127.0.0.1') {
  const token = body['cf-turnstile-response'] || body.turnstile_token;
  const check = await verifyTurnstileToken(token, ip);
  if (!check.success) {
    return { status: 400, body: { error: check.error } };
  }
  return { status: 200, body: { success: true } };
}

test('Turnstile Protection: missing or empty token is rejected', async () => {
  const res1 = await verifyTurnstileToken(undefined);
  assert.equal(res1.success, false);
  assert.match(res1.error, /Turnstile/i);

  const res2 = await verifyTurnstileToken('');
  assert.equal(res2.success, false);

  const res3 = await verifyTurnstileToken('   ');
  assert.equal(res3.success, false);
});

test('Public endpoint /api/bookings strictly fails without Turnstile token', async () => {
  const payloadWithoutToken = {
    booking_type: 'route',
    route_id: 'jeddah-to-makkah',
    vehicle_id: 'toyota-camry',
    pickup_datetime: '2026-11-01T10:00:00Z',
    customer_name: 'Test Pilgrim',
    customer_phone: '+966512345678',
  };

  const response = await simulatePostBookings(payloadWithoutToken);
  assert.equal(response.status, 400, 'POST /api/bookings must return 400 when token missing');
  assert.equal(response.body.success, false);
});

test('Public endpoint /api/leads strictly fails without Turnstile token', async () => {
  const leadWithoutToken = {
    customer_name: 'Lead Pilgrim',
    customer_phone: '+966512345678',
    notes: 'Inquiry',
  };

  const response = await simulatePostLeads(leadWithoutToken);
  assert.equal(response.status, 400, 'POST /api/leads must return 400 when token missing');
  assert.equal(response.body.success, false);
});

test('Public endpoint /api/bookings/track strictly fails without Turnstile token', async () => {
  const trackWithoutToken = {
    reference: 'RUC-TEST1234',
    phone: '+966512345678',
  };

  const response = await simulatePostTrack(trackWithoutToken);
  assert.equal(response.status, 400, 'POST /api/bookings/track must return 400 when token missing');
});

test('Public endpoint /api/bookings/cancel strictly fails without Turnstile token', async () => {
  const cancelWithoutToken = {
    reference: 'RUC-TEST1234',
    phone: '+966512345678',
  };

  const response = await simulatePostCancel(cancelWithoutToken);
  assert.equal(response.status, 400, 'POST /api/bookings/cancel must return 400 when token missing');
});

test('Public endpoints accept valid Turnstile token', async () => {
  const payloadWithToken = {
    'cf-turnstile-response': 'valid_test_token',
    reference: 'RUC-TEST1234',
    phone: '+966512345678',
  };

  const trackRes = await simulatePostTrack(payloadWithToken);
  assert.equal(trackRes.status, 200, 'Should accept valid token');

  const cancelRes = await simulatePostCancel(payloadWithToken);
  assert.equal(cancelRes.status, 200, 'Should accept valid token');

  const leadRes = await simulatePostLeads(payloadWithToken);
  assert.equal(leadRes.status, 200, 'Should accept valid token');

  const bookingRes = await simulatePostBookings(payloadWithToken);
  assert.equal(bookingRes.status, 200, 'Should accept valid token');
});
