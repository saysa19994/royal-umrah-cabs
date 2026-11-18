import { execSync } from 'child_process';
import fs from 'fs';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';

function callApi(path) {
  try {
    const sep = path.includes('?') ? '&' : '?';
    const fullPath = `${path}${sep}teamId=${teamId}`;
    const cmd = `npx vercel api "${fullPath}"`;
    const res = execSync(cmd, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    return JSON.parse(res);
  } catch (err) {
    return { error: err.message };
  }
}

const now = Date.now();
const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
const fromIso = new Date(thirtyDaysAgo).toISOString();
const toIso = new Date(now).toISOString();

console.log('Querying /v1/usage...');
const res = callApi(`/v1/usage?from=${fromIso}&to=${toIso}`);
console.log('Result keys:', Object.keys(res || {}));
fs.writeFileSync('scripts/v1-usage-result.json', JSON.stringify(res, null, 2));
