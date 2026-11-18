import { execSync } from 'child_process';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';

function callApi(path) {
  try {
    const sep = path.includes('?') ? '&' : '?';
    const fullPath = `${path}${sep}teamId=${teamId}`;
    const cmd = `npx vercel api "${fullPath}"`;
    const res = execSync(cmd, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    return JSON.parse(res);
  } catch (err) {
    console.error('API Error for:', path, err.message);
    return { error: err.message };
  }
}

console.log('--- 1. TEAM DETAILS ---');
const team = callApi(`/v2/teams/${teamId}`);
console.log('Team keys:', Object.keys(team || {}));
if (team?.billing) console.log('Team billing:', JSON.stringify(team.billing, null, 2));

console.log('--- 2. USAGE OVERVIEW / METRICS ---');
const now = Date.now();
const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
const fromIso = new Date(thirtyDaysAgo).toISOString();
const toIso = new Date(now).toISOString();

const edgeRes = callApi(`/v2/usage?type=edge&from=${fromIso}&to=${toIso}`);
console.log('Edge keys:', Object.keys(edgeRes || {}));

const artifactsRes = callApi(`/v2/usage?type=artifacts&from=${fromIso}&to=${toIso}`);
console.log('Artifacts data count:', artifactsRes?.data?.length);

const blobRes = callApi(`/v2/usage?type=storage_blob&from=${fromIso}&to=${toIso}`);
console.log('Blob storage:', JSON.stringify(blobRes, null, 2));
