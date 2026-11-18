import { execSync } from 'child_process';
import fs from 'fs';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const projectId = 'prj_UTPKhRaSTayxCtYNGPKirQx0Nqva';

const candidateIds = [
  'dpl_2rfGZuykSMxgqHiUUAWJQaKELFuW',
  'dpl_R2kwhKeeRCcqZQMLvKGsTgxQSo2K',
  'dpl_E9jjADVan9gNEdt9kSfGKEEgjXCf',
  'dpl_B93ug4aYVu2jBZ6Bj4nnA7uxyN1N',
  'dpl_7hQGeivJSD7G1TDvrcEGmDhcxQiV',
  'dpl_DnaWWBZKwpHgLvxALYRdZiYPL6Qi',
  'dpl_8mGyj2cdtzRb73WnRnAB6jgB29BH',
];

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

console.log('=== 1. VERIFYING LIVE PRODUCTION & ACTIVE PREVIEW (MUST NOT BE TOUCHED) ===');
const proj = callApi(`/v9/projects/${projectId}`);
const liveProdId = proj?.targets?.production?.id;
console.log('Live Production ID:', liveProdId);
console.log('Live Production Domains:', proj?.targets?.production?.alias);

const activeBranch = 'feat/luxury-command-center-v2';
const activeMainBranch = 'main';

console.log('\n=== 2. VERIFYING THE 7 CANDIDATES ===');
const auditResults = [];

for (const id of candidateIds) {
  const d = callApi(`/v13/deployments/${id}`);
  if (d.error) {
    console.error(`ID ${id} failed:`, d.error);
    auditResults.push({ id, exists: false, error: d.error });
    continue;
  }

  const belongsToProject = d.projectId === projectId;
  const isLiveProd = d.id === liveProdId;
  const branch = d.meta?.githubCommitRef || d.meta?.gitCommitRef || 'unknown';
  const aliases = d.alias || [];
  const hasDomainAlias = aliases.some(a => a.includes('duyufalrahmanvip.com'));

  auditResults.push({
    id: d.id,
    url: d.url,
    exists: true,
    belongsToProject,
    projectName: d.name,
    target: d.target, // null or 'production'
    state: d.readyState || d.state,
    branch,
    commitSha: d.meta?.githubCommitSha || d.meta?.gitCommitSha,
    isLiveProd,
    hasDomainAlias,
    aliases,
    cacheSizeBytes: d.buildCacheSummary?.save?.compressedSizeBytes || 0,
    created: new Date(d.createdAt).toISOString()
  });
}

console.log(JSON.stringify(auditResults, null, 2));

fs.writeFileSync('scripts/final-verification-check-results.json', JSON.stringify({
  liveProductionId: liveProdId,
  verifiedCandidates: auditResults,
  timestamp: new Date().toISOString()
}, null, 2));

console.log('\nSaved verification to scripts/final-verification-check-results.json');
