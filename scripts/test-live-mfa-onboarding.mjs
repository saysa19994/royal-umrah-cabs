import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');

test('owner must be able to enroll despite a stale profile TOTP boolean',()=>{
 const s=read('src/lib/auth/server-auth.ts');
 assert.match(s,/isOwnerOrAdmin && aalData\.nextLevel !== 'aal2'/);
 assert.doesNotMatch(s,/aalData\.nextLevel !== 'aal2' && !profile\.totp_enabled/);
 assert.match(s,/if \(!options\.allowEnrollmentFlow\)/);
 assert.match(s,/currentAal !== 'aal2'/);
});
test('new 2FA factor originates only in Supabase Auth, never local TOTP or third party',()=>{
 const s=read('src/app/api/admin/auth/setup-2fa/route.ts');
 assert.match(s,/await supabase\.auth\.mfa\.enroll\(/);
 assert.match(s,/await supabase\.auth\.mfa\.challenge\(/);
 assert.match(s,/await supabase\.auth\.mfa\.verify\(/);
 assert.match(s,/assurance\.data\?\.currentLevel !== 'aal2'/);
 assert.match(s,/factorId: enrolled\.data\.id/);
 assert.match(s,/private, no-store/);
 assert.doesNotMatch(s,/verifyTotp\(|generateTotpSecret\(|qrserver\.com|https:\/\/api\.qrserver/);
 assert.match(s,/eq\('auth_user_id', authResult\.user\.auth_user_id\)/);
 assert.match(s,/failClosed: true/);
});
test('login factor verification does not trust a missing staff profile or unverified AAL1',()=>{
 const s=read('src/app/api/admin/auth/verify-2fa/route.ts');
 assert.match(s,/profileError \|\| !profile \|\| profile\.is_suspended/);
 assert.match(s,/currentLevel === 'aal2'/);
 assert.match(s,/status: 403/);
});
