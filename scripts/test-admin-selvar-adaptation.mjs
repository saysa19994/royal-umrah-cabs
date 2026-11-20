import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read = p => readFileSync(p, 'utf8');

test('operations pipeline is driven by actual overview counts, not sample CRM metrics',()=>{
  const s=read('src/components/admin/AdminCommandCenter.tsx');
  for(const status of ['new','confirmed','driver_assigned','en_route','completed','cancelled']){
    assert.match(s,new RegExp("status:'"+status+"'"));
  }
  assert.match(s,/const count=metrics\?\.\[status\]/);
  assert.match(s,/read\('\/api\/admin\/overview'\)/);
  assert.match(s,/href=\{'\/admin\/bookings\?status='\+encodeURIComponent\(status\)\}/);
  assert.doesNotMatch(s,/sample deals|fake revenue|Math\.random\(/i);
});

test('pipeline deep links select a validated booking status',()=>{
  const s=read('src/components/admin/BookingOperationsPage.tsx');
  assert.match(s,/const requestedStatus = params\.get\('status'\)/);
  assert.match(s,/statuses\.includes\(requestedStatus as Status\)/);
  assert.match(s,/setStatus\(requestedStatus as Status\)/);
  assert.match(s,/new URLSearchParams\(\{ status, limit:/);
});

test('operations dashboard fails closed instead of showing stale counts on fetch errors',()=>{
  const s=read('src/components/admin/AdminCommandCenter.tsx');
  assert.match(s,/setMetrics\(null\);\s*setDispatch\(null\);\s*setReport\(null\);\s*setActiveDrivers\(null\);/);
  assert.match(s,/aria-label="مراحل الحجوزات المسجلة"/);
  assert.match(s,/aria-label="التنقل السريع بين أعمال الإدارة"/);
});

test('cinematic login heading contrast and mobile-first operations board',()=>{
  const css=read('src/styles/admin-cinematic.css');
  assert.match(css,/\.vip-login-brand h1 \{[\s\S]*?color:#fff8ed !important;/);
  assert.match(css,/\.vip-admin \.vip-stage-grid/);
  assert.match(css,/@media\(max-width:760px\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});
