import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('GET and POST chat management must require owner/admin with MFA before data access', () => {
  const route=readFileSync('src/app/api/admin/chat/route.ts','utf8');
  const get=route.slice(route.indexOf('export async function GET'), route.indexOf('export async function POST'));
  const post=route.slice(route.indexOf('export async function POST'));
  for(const method of [get,post]) {
    assert.match(method,/requireRole\(request, \['owner', 'admin'\]\)/);
    assert.match(method,/if \(auth\.errorResponse\) return auth\.errorResponse/);
    assert.match(method,/private, no-store/);
  }
  assert.ok(get.indexOf('requireRole(') < get.indexOf('getChatSettings('));
  assert.ok(post.indexOf('requireRole(') < post.indexOf('updateChatSettings('));
});
