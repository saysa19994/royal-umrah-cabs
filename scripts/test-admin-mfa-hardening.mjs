import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const setup = readFileSync('src/app/api/admin/auth/setup-2fa/route.ts','utf8');
const verify = readFileSync('src/app/api/admin/auth/verify-2fa/route.ts','utf8');
const login = readFileSync('src/app/admin/login/page.tsx','utf8');

test('enrollment only succeeds through Supabase MFA', () => {
  assert.match(setup, /supabase\.auth\.mfa\.enroll\(/);
  assert.match(setup, /supabase\.auth\.mfa\.challenge\(/);
  assert.match(setup, /supabase\.auth\.mfa\.verify\(/);
  assert.match(setup, /currentLevel !== 'aal2'/);
  assert.doesNotMatch(setup, /generateTotpSecret|verifyTotp\(|totp-factor-owner/);
  assert.doesNotMatch(setup, /qrserver\.com|fetch\(qrImageUrl\)/);
  assert.match(setup, /data:image\/svg\+xml;base64,/);
});

test('MFA verification refuses invalid staff and requires AAL2', () => {
  assert.doesNotMatch(verify, /\|\| 'admin'/);
  assert.match(verify, /profile\.is_suspended/);
  assert.match(verify, /currentLevel === 'aal2'/);
  assert.match(verify, /f\.status === 'verified'/);
});

test('MFA enrollment QR remains a local data URL', () => {
  assert.match(login, /enrollQr/);
  assert.match(login, /data:image\/svg\+xml;base64,/);
});
