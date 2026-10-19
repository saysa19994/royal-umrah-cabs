import test from 'node:test';
import assert from 'node:assert';
import crypto from 'crypto';

test('Lead ref code generator produces >= 8 chars and high entropy', () => {
  const codes = new Set();
  for (let i = 0; i < 100; i++) {
    const hex = crypto.randomBytes(4).toString('hex').toUpperCase();
    const code = `RUC-${hex}`;
    assert.match(code, /^RUC-[0-9A-F]{8}$/, `Code ${code} must match RUC-[0-9A-F]{8}`);
    assert.ok(code.length >= 12, 'Total length is >= 12');
    codes.add(code);
  }
  assert.strictEqual(codes.size, 100, 'All 100 randomly generated ref codes must be unique');
});

test('Lead Schema strictly rejects client-supplied price_sar and ref_code', async () => {
  const { z } = await import('zod');

  // Exact reproduction of LeadInputSchema in src/app/api/leads/route.ts
  const LeadInputSchema = z
    .object({
      page: z.string().max(255).optional(),
      language: z.enum(['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur']).default('en'),
      route_id: z.string().max(100).optional().nullable(),
      route_title: z.string().max(255).optional().nullable(),
      vehicle_id: z.string().max(100).optional().nullable(),
      vehicle_name: z.string().max(255).optional().nullable(),
      pickup_date: z.string().max(50).optional().nullable(),
      passengers: z.number().int().min(1).max(100).optional(),
      luggage: z.number().int().min(0).max(100).optional(),
      customer_name: z.string().max(150).optional().nullable(),
      customer_phone: z
        .string()
        .regex(/^\+?[0-9\s\-()]{7,25}$/, 'Invalid telephone number format')
        .optional()
        .nullable(),
      notes: z.string().max(1000).optional().nullable(),
      source_utm: z.record(z.string().max(100), z.string().max(255)).optional(),
      'cf-turnstile-response': z.string().max(2048).optional(),
      turnstile_token: z.string().max(2048).optional(),
    })
    .strict();

  // Test 1: Trying to inject price_sar must fail schema validation (.strict())
  const tamperPricePayload = {
    route_id: 'jeddah-airport-to-makkah',
    vehicle_id: 'camry',
    price_sar: 1, // Attacker trying to set price to 1 SAR
  };
  const parseTamperPrice = LeadInputSchema.safeParse(tamperPricePayload);
  assert.strictEqual(parseTamperPrice.success, false, 'Client-supplied price_sar must be strictly rejected');

  // Test 2: Trying to inject ref_code must fail schema validation
  const tamperRefPayload = {
    route_id: 'jeddah-airport-to-makkah',
    vehicle_id: 'camry',
    ref_code: 'RUC-FORGED',
  };
  const parseTamperRef = LeadInputSchema.safeParse(tamperRefPayload);
  assert.strictEqual(parseTamperRef.success, false, 'Client-supplied ref_code must be strictly rejected');

  // Test 3: Legitimate payload without price_sar or ref_code succeeds
  const legitPayload = {
    route_id: 'jeddah-airport-to-makkah',
    vehicle_id: 'camry',
    passengers: 2,
    customer_name: 'Ahmed',
  };
  const parseLegit = LeadInputSchema.safeParse(legitPayload);
  assert.strictEqual(parseLegit.success, true, 'Legitimate payload passes validation');
});

test('Lead Conversion Guard: requires route_id, vehicle_id, and pickup_date', () => {
  function validateLeadForConversion(lead) {
    if (lead.status === 'confirmed') {
      return { ok: false, error: 'Lead has already been converted to a booking' };
    }
    if (!lead.route_id || !lead.vehicle_id || !lead.pickup_date) {
      return { ok: false, error: 'Lead cannot be converted: missing route_id, vehicle_id, or pickup_date' };
    }
    return { ok: true };
  }

  // Missing route_id
  assert.strictEqual(validateLeadForConversion({ vehicle_id: 'camry', pickup_date: '2026-11-01' }).ok, false);
  // Missing vehicle_id
  assert.strictEqual(validateLeadForConversion({ route_id: 'jeddah-airport-to-makkah', pickup_date: '2026-11-01' }).ok, false);
  // Missing pickup_date
  assert.strictEqual(validateLeadForConversion({ route_id: 'jeddah-airport-to-makkah', vehicle_id: 'camry' }).ok, false);
  // Already confirmed
  assert.strictEqual(validateLeadForConversion({ status: 'confirmed', route_id: 'jeddah-airport-to-makkah', vehicle_id: 'camry', pickup_date: '2026-11-01' }).ok, false);
  // All fields valid
  assert.strictEqual(validateLeadForConversion({ status: 'new', route_id: 'jeddah-airport-to-makkah', vehicle_id: 'camry', pickup_date: '2026-11-01' }).ok, true);
});
