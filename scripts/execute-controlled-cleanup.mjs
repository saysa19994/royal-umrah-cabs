import { execSync } from 'child_process';
import https from 'https';
import fs from 'fs';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const projectId = 'prj_UTPKhRaSTayxCtYNGPKirQx0Nqva';

const approvedDeletionIds = [
  'dpl_2rfGZuykSMxgqHiUUAWJQaKELFuW',
  'dpl_R2kwhKeeRCcqZQMLvKGsTgxQSo2K',
  'dpl_E9jjADVan9gNEdt9kSfGKEEgjXCf',
  'dpl_B93ug4aYVu2jBZ6Bj4nnA7uxyN1N',
  'dpl_7hQGeivJSD7G1TDvrcEGmDhcxQiV',
  'dpl_DnaWWBZKwpHgLvxALYRdZiYPL6Qi',
  'dpl_8mGyj2cdtzRb73WnRnAB6jgB29BH',
];

const protectedProductionId = 'dpl_98mGY3gCvJUkUCdjkSDXzwG8KdD3';
const protectedActivePreviewId = 'dpl_ARgNs62mbLqe78mprQHxyru8xUUo';

function callApi(path, method = 'GET') {
  try {
    const sep = path.includes('?') ? '&' : '?';
    const fullPath = `${path}${sep}teamId=${teamId}`;
    const methodFlag = method === 'DELETE' ? '-X DELETE ' : '';
    const cmd = `npx vercel api ${methodFlag}"${fullPath}"`;
    const res = execSync(cmd, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    return JSON.parse(res);
  } catch (err) {
    return { error: err.message };
  }
}

function probeHttp(url) {
  return new Promise((resolve) => {
    https.get(url, { timeout: 10000 }, (res) => {
      resolve({ statusCode: res.statusCode, headers: res.headers });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function main() {
  console.log('========================================================');
  console.log('STEP 1: FINAL PRE-DELETE LIVE ASSERTION CHECKS');
  console.log('========================================================');

  // 1. Verify Project & Current Production
  const proj = callApi(`/v9/projects/${projectId}`);
  if (!proj || proj.id !== projectId) {
    console.error('FATAL: Project lookup failed!');
    process.exit(1);
  }
  if (proj.targets?.production?.id !== protectedProductionId) {
    console.error(`FATAL: Production ID changed! Expected ${protectedProductionId}, got ${proj.targets?.production?.id}`);
    process.exit(1);
  }
  console.log(`[PASS] Project: ${proj.name} (${proj.id})`);
  console.log(`[PASS] Production ID: ${proj.targets?.production?.id} (Verified Protected)`);

  // 2. Verify Domains Routing
  const aliases = callApi(`/v3/aliases?projectId=${projectId}`);
  const wwwAlias = aliases?.aliases?.find(a => a.alias === 'www.duyufalrahmanvip.com');
  if (!wwwAlias || wwwAlias.deploymentId !== protectedProductionId) {
    console.error(`FATAL: www.duyufalrahmanvip.com is not mapped to ${protectedProductionId}!`);
    process.exit(1);
  }
  console.log(`[PASS] Domain www.duyufalrahmanvip.com -> ${wwwAlias.deploymentId}`);

  // 3. Verify All 7 Candidate Deployments
  for (const id of approvedDeletionIds) {
    if (id === protectedProductionId || id === protectedActivePreviewId) {
      console.error(`FATAL: Protected deployment ID in deletion list: ${id}`);
      process.exit(1);
    }
    const d = callApi(`/v13/deployments/${id}`);
    if (d.error || d.projectId !== projectId) {
      console.error(`FATAL: Pre-check failed for candidate ${id}:`, d.error || 'Project mismatch');
      process.exit(1);
    }
    console.log(`[PASS] Candidate ${id}: verified existing on ${proj.name} (${d.meta?.githubCommitRef || d.target || 'preview'})`);
  }

  console.log('\n========================================================');
  console.log('STEP 2: CONTROLLED INDEPENDENT DELETIONS');
  console.log('========================================================');

  const deletionResults = [];

  for (const id of approvedDeletionIds) {
    console.log(`Deleting ${id}...`);
    const delRes = callApi(`/v13/deployments/${id}`, 'DELETE');
    const timestamp = new Date().toISOString();
    console.log(`Result for ${id}:`, JSON.stringify(delRes));
    deletionResults.push({
      id,
      timestamp,
      response: delRes,
      success: !delRes.error && (delRes.state === 'DELETED' || delRes.uid === id || delRes.id === id)
    });
  }

  console.log('\n========================================================');
  console.log('STEP 3: POST-DELETION VERIFICATION OF THE 7 CANDIDATES');
  console.log('========================================================');

  const postCheckResults = [];
  for (const id of approvedDeletionIds) {
    const check = callApi(`/v13/deployments/${id}`);
    const isGone = check.error?.includes('404') || check.state === 'DELETED';
    console.log(`Checking ${id}: ${isGone ? 'CONFIRMED DELETED/NOT ACTIVE' : 'Status: ' + check.state}`);
    postCheckResults.push({ id, isGone, status: check.state || 'NOT_FOUND_OR_DELETED' });
  }

  console.log('\n========================================================');
  console.log('STEP 4: LIVE PRODUCTION HEALTH & DOMAIN CHECKS');
  console.log('========================================================');

  const homeProbe = await probeHttp('https://duyufalrahmanvip.com/ar');
  console.log(`Home Page (https://duyufalrahmanvip.com/ar): Status ${homeProbe.statusCode}`);

  const bookingProbe = await probeHttp('https://duyufalrahmanvip.com/ar/booking');
  console.log(`Booking Page (https://duyufalrahmanvip.com/ar/booking): Status ${bookingProbe.statusCode}`);

  const wwwProbe = await probeHttp('https://www.duyufalrahmanvip.com/ar');
  console.log(`WWW Domain (https://www.duyufalrahmanvip.com/ar): Status ${wwwProbe.statusCode}`);

  console.log('\n========================================================');
  console.log('STEP 5: REMAINING DEPLOYMENTS INVENTORY');
  console.log('========================================================');

  const remDeps = callApi(`/v6/deployments?projectId=${projectId}&limit=100`);
  const remainingList = (remDeps?.deployments || []).map(d => ({
    uid: d.uid,
    target: d.target,
    state: d.state || d.readyState,
    branch: d.meta?.githubCommitRef || 'unknown',
    url: d.url,
    created: new Date(d.createdAt).toISOString()
  }));
  console.log(`Total remaining deployments in project: ${remainingList.length}`);
  console.log(JSON.stringify(remainingList, null, 2));

  const finalSummary = {
    executionTimestamp: new Date().toISOString(),
    deletionResults,
    postCheckResults,
    probes: {
      home: homeProbe.statusCode,
      booking: bookingProbe.statusCode,
      www: wwwProbe.statusCode
    },
    remainingDeploymentsCount: remainingList.length,
    remainingDeployments: remainingList
  };

  fs.writeFileSync('scripts/controlled-cleanup-execution-summary.json', JSON.stringify(finalSummary, null, 2));
  console.log('\nSaved execution log to scripts/controlled-cleanup-execution-summary.json');
}

main();
