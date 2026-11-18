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
    console.error('API Error for:', path, err.message);
    return null;
  }
}

const inventory = JSON.parse(fs.readFileSync('scripts/royal-deployments-inventory.json', 'utf8'));

console.log(`Inspecting all ${inventory.deployments.length} deployments...`);

const results = [];

for (const d of inventory.deployments) {
  console.log(`Checking ${d.uid} (${d.branch} - ${d.state})...`);
  const dep = callApi(`/v13/deployments/${d.uid}`);
  if (!dep) continue;

  const cacheSize = dep.buildCacheSummary?.save?.compressedSizeBytes || 0;
  const cacheFiles = dep.buildCacheSummary?.save?.fileCount || 0;
  const aliases = dep.alias || [];
  const isLive = d.isCurrentLiveProduction;
  const isProd = d.isProductionTarget;

  results.push({
    uid: d.uid,
    url: d.url,
    createdAtIso: d.createdAtIso,
    branch: d.branch,
    commitSha: d.commitSha,
    commitMsg: d.commitMsg,
    state: d.state,
    target: d.target,
    isCurrentLiveProduction: isLive,
    isProductionTarget: isProd,
    aliases: aliases,
    cacheSizeBytes: cacheSize,
    cacheSizeMB: (cacheSize / (1024 * 1024)).toFixed(2),
    cacheFiles: cacheFiles,
  });
}

fs.writeFileSync('scripts/deployments-detailed-audit.json', JSON.stringify(results, null, 2));
console.log('Finished detailed audit. Wrote to scripts/deployments-detailed-audit.json');
