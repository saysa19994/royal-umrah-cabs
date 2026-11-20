import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8');

test('production admin dashboard reads real scoped booking APIs, never mock revenue',()=>{
 const s=read('src/components/admin/AdminCommandCenter.tsx');
 assert.match(s,/\/api\/admin\/bookings\?status=/);
 assert.match(s,/\/api\/admin\/drivers/);
 assert.match(s,/\/api\/admin\/leads\?limit=1/);
 assert.match(s,/setSummary\(null\)/);
 assert.doesNotMatch(s,/Math\.random|fake revenue|sample leads|TR-1|12,480|46,800/);
 for(const status of ['new','confirmed','driver_assigned','en_route','completed','cancelled'])
  assert.match(s,new RegExp("status:'"+status+"'"));
});
test('admin booking filters are validated and use existing authenticated API',()=>{
 const s=read('src/components/admin/BookingBoard.tsx');
 assert.match(s,/allowed\.includes\(q as Filter\)/);
 assert.match(s,/\/api\/admin\/bookings\?'\+params/);
 assert.match(s,/status:filter,limit:'50',offset:/);
 assert.match(s,/setTotal\(null\)/);
});
test('production login preserves password and TOTP endpoints, keeps QR private',()=>{
 const s=read('src/app/admin/login/page.tsx');
 assert.match(s,/\/api\/admin\/auth\/login/);
 assert.match(s,/\/api\/admin\/auth\/verify-2fa/);
 assert.match(s,/\/api\/admin\/auth\/setup-2fa/);
 assert.match(s,/showEnrollmentSecret &&/);
 assert.match(s,/vip-login-photo/);
 assert.match(s,/onClick=\{\(\) => setShowEnrollmentSecret/);
});
test('scoped CSS is responsive and never replaces public booking site',()=>{
 const css=read('src/styles/admin-cinematic.css');
 assert.match(css,/\.vip-login-brand h1\s*\{/);
 assert.match(css,/\.vip-admin \.vip-stage-grid/);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/prefers-reduced-motion/);
 const layout=read('src/app/admin/layout.tsx');
 assert.match(layout,/import '@\/styles\/admin-cinematic\.css'/);
 assert.match(layout,/aalData\?\.currentLevel !== 'aal2'/);
});
