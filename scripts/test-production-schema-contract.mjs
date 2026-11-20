import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const read = p => readFileSync(p, 'utf8');

// This contract is based on the live production schema inspected 2026-11-20:
// public.faqs does not exist, public.reviews has is_approved but no status,
// service_type or is_verified_booking. Never reintroduce speculative DB queries.
test('FAQ administration and public pages never query absent public.faqs',()=>{
  const files=[
    'src/lib/faq-service.ts',
    'src/app/api/admin/faqs/route.ts',
    'src/app/[locale]/faq/page.tsx',
  ];
  for(const file of files) assert.doesNotMatch(read(file),/\.from\(\s*['"]faqs['"]\s*\)/);
  assert.match(read('src/lib/faq-service.ts'),/\.from\('page_content'\)/);
});

test('review reads match the production is_approved-only schema',()=>{
  const service=read('src/lib/reviews.ts');
  const publicApi=read('src/app/api/reviews/route.ts');
  assert.match(service,/\.eq\('is_approved', true\)/);
  assert.doesNotMatch(service,/\.eq\('status',/);
  assert.doesNotMatch(service,/\.select\([^)]*(?:service_type|is_verified_booking|status)/);
  assert.doesNotMatch(publicApi,/status: 'pending'|is_verified_booking: true/);
  assert.match(publicApi,/status: result\.success \? 200 : 503/);
  assert.match(publicApi,/private, no-store/);
});

test('review admin never reports success on statistics failure or nonexistent update',()=>{
  const admin=read('src/app/api/admin/reviews/route.ts');
  assert.match(admin,/if \(countsErr \|\| !Array\.isArray\(allRows\)\)/);
  assert.match(admin,/if \(!updatedData\)/);
  assert.match(admin,/status === 'rejected'/);
  assert.match(admin,/status:422/);
  assert.match(admin,/: 0;/);
  assert.doesNotMatch(read('src/app/admin/reviews/page.tsx'),/handleUpdateStatus\(review\.id, 'rejected'\)/);
});

test('preview admin mutations cannot touch production Supabase by default',()=>{
  const auth=read('src/lib/auth/server-auth.ts');
  assert.match(auth,/process\.env\.VERCEL_ENV === 'preview'/);
  assert.match(auth,/PREVIEW_DATABASE_ISOLATED/);
  assert.match(auth,/configuredHost !== 'skyhpzdeapmttgmvcoeh\.supabase\.co'/);
  assert.match(auth,/PREVIEW_DATABASE_ISOLATION_REQUIRED/);
  assert.match(auth,/status: 423/);
});

test('admin login distinguishes a provider outage from an incorrect password',()=>{
  const login=read('src/app/api/admin/auth/login/route.ts');
  assert.match(login,/serviceUnavailable/);
  assert.match(login,/database error querying schema/);
  assert.match(login,/status: serviceUnavailable \? 503 : 401/);
  assert.match(login,/temporarily unavailable/);
});

test('all admin API routes require staff authorization except isolated login primitives',()=>{
  const allowedPublicAuth=new Set([
    'src/app/api/admin/auth/login/route.ts',
    'src/app/api/admin/auth/logout/route.ts',
    'src/app/api/admin/auth/verify-2fa/route.ts',
  ]);
  function walk(dir){
    return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>
      entry.isDirectory()?walk(join(dir,entry.name)):[join(dir,entry.name)]);
  }
  const routes=walk('src/app/api/admin').filter(p=>p.endsWith('/route.ts'));
  for(const path of routes){
    const source=read(path);
    if(!/export async function (GET|POST|PUT|PATCH|DELETE)/.test(source))continue;
    if(allowedPublicAuth.has(path))continue;
    assert.match(source,/requireRole\(/,`Protected staff authorization missing: ${path}`);
  }
});
