import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const publicService = readFileSync('src/lib/reviews.ts', 'utf8');
const publicApi = readFileSync('src/app/api/reviews/route.ts', 'utf8');

test('public reviews read only existing legacy production columns', () => {
  assert.match(publicService, /\.eq\('is_approved', true\)/);
  assert.doesNotMatch(publicService, /\.eq\('status', 'published'\)/);
  assert.doesNotMatch(publicService, /\.select\([^)]*service_type/);
  assert.doesNotMatch(publicService, /\.select\([^)]*is_verified_booking/);
  assert.match(publicService, /is_verified_booking: false/);
});

test('review submission does not attempt incompatible INSERT first', () => {
  assert.match(publicApi, /is_approved: false/);
  assert.doesNotMatch(publicApi, /status: 'pending'/);
  assert.doesNotMatch(publicApi, /service_type: sanitizedService/);
  assert.doesNotMatch(publicApi, /booking_reference: sanitizedRef/);
  assert.match(publicApi, /Review insert failed/);
});
