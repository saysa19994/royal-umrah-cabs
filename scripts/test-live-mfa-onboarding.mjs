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

test('rotating an exposed setup key revokes only unverified TOTP factors before enrollment',()=>{
 const route=read('src/app/api/admin/auth/setup-2fa/route.ts');
 assert.match(route,/factors\.data\?\.all/);
 assert.match(route,/factor\.factor_type !== 'totp' \|\| factor\.status !== 'unverified'/);
 assert.match(route,/await supabase\.auth\.mfa\.unenroll\(\{ factorId: factor\.id \}\)/);
 assert.ok(route.indexOf('await supabase.auth.mfa.unenroll(')<route.indexOf('await supabase.auth.mfa.enroll('));
 assert.match(route,/Unable to revoke the previous unfinished authenticator/);
 assert.match(route,/startsWith\('<svg'\)/);
 assert.match(route,/Buffer\.from\(qrCode, 'utf8'\)\.toString\('base64'\)/);
 assert.doesNotMatch(route,/qrserver\.com|api\.qrserver|https:\/\/quickchart/);
});

test('login never exposes the MFA seed automatically and supports new private QR rotation',()=>{
 const ui=read('src/app/admin/login/page.tsx');
 assert.match(ui,/const \[showEnrollmentKey, setShowEnrollmentKey\] = useState\(false\)/);
 assert.match(ui,/showEnrollmentKey && \(/);
 assert.match(ui,/onFocus=\{\(\) => setShowEnrollmentKey\(false\)\}/);
 assert.match(ui,/setEnrollQrImageUrl\(/);
 assert.match(ui,/Generate a new private QR \/ replace old setup/);
 assert.match(ui,/handleRotateEnrollment/);
 assert.match(ui,/Scan the new QR/);
});
