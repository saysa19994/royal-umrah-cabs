import { execSync } from 'child_process';
import fs from 'fs';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const projectId = 'prj_UTPKhRaSTayxCtYNGPKirQx0Nqva';

function callApi(endpoint) {
  try {
    const sep = endpoint.includes('?') ? '&' : '?';
    const cmd = `npx vercel api "${endpoint}${sep}teamId=${teamId}"`;
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

const validTypes = ["requests", "builds", "edge", "artifacts", "edge_config", "cron_jobs", "data_cache"];

const results = {};
for (const t of validTypes) {
  const data = callApi(`/v2/usage?type=${t}&from=${fromIso}&to=${toIso}&projectId=${projectId}`);
  results[t] = data;
}

fs.writeFileSync('scripts/vercel-usage-full.json', JSON.stringify(results, null, 2));
console.log('Saved vercel-usage-full.json. Summary:');
for (const t of validTypes) {
  const d = results[t];
  console.log(`- ${t}:`, Array.isArray(d?.data) ? `${d.data.length} items` : (d?.error || typeof d));
}
