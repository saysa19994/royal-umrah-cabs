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

function deleteSingleDeployment(id) {
  // Try with --dangerously-skip-permissions
  try {
    const cmd = `npx vercel api -X DELETE "/v13/deployments/${id}?teamId=${teamId}" --dangerously-skip-permissions`;
    const res = execSync(cmd, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    return { method: 'api_dangerously_skip_permissions', output: JSON.parse(res) };
  } catch (errApi) {
    // Fallback to vercel rm <id> -y
    try {
      const cmdRm = `npx vercel rm "${id}" --scope "${teamId}" -y`;
      const resRm = execSync(cmdRm, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
      return { method: 'cli_rm', output: resRm };
    } catch (errRm) {
      return { error: `API failed: ${errApi.message}; CLI failed: ${errRm.message}` };
    }
  }
}

function probeHttp(url) {
  return new Promise((resolve) => {
    https.get(url, { timeout: 10000 }, (res) => {
      resolve({ statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

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

async function run() {
  console.log('--- RE-CHECKING PRODUCTION PROTECTION ---');
  const proj = callApi(`/v9/projects/${projectId}`);
  if (proj?.targets?.production?.id !== protectedProductionId) {
    console.error('FATAL: Production ID changed!');
    process.exit(1);
  }
  console.log(`[VERIFIED] Production ID is ${protectedProductionId}`);

  console.log('\n--- EXECUTING DELETIONS INDEPENDENTLY ---');
  const deletionLog = [];

  for (const id of approvedDeletionIds) {
    if (id === protectedProductionId || id === protectedActivePreviewId) {
      console.error(`REFUSING to delete protected ID: ${id}`);
      continue;
    }
    console.log(`Deleting ${id}...`);
    const res = deleteSingleDeployment(id);
    const ts = new Date().toISOString();
    console.log(`Result for ${id}:`, JSON.stringify(res));
    deletionLog.push({ id, timestamp: ts, result: res });
  }

  console.log('\n--- VERIFYING POST-DELETION STATUS ---');
  const verificationLog = [];
  for (const id of approvedDeletionIds) {
    const check = callApi(`/v13/deployments/${id}`);
    const isDeleted = check.error?.includes('404') || check.state === 'DELETED';
    console.log(`Status of ${id}: ${isDeleted ? 'SUCCESSFULLY DELETED (404/DELETED)' : check.state || 'UNKNOWN'}`);
    verificationLog.push({ id, isDeleted, state: check.state || '404' });
  }

  console.log('\n--- VERIFYING LIVE PRODUCTION SITES ---');
  const home = await probeHttp('https://duyufalrahmanvip.com/ar');
  const booking = await probeHttp('https://duyufalrahmanvip.com/ar/booking');
  const www = await probeHttp('https://www.duyufalrahmanvip.com/ar');

  console.log(`Home (duyufalrahmanvip.com/ar): ${home.statusCode}`);
  console.log(`Booking (duyufalrahmanvip.com/ar/booking): ${booking.statusCode}`);
  console.log(`WWW (www.duyufalrahmanvip.com/ar): ${www.statusCode}`);

  console.log('\n--- FINAL REMAINING DEPLOYMENTS ---');
  const rem = callApi(`/v6/deployments?projectId=${projectId}&limit=100`);
  const remList = (rem?.deployments || []).map(d => ({
    uid: d.uid,
    target: d.target,
    state: d.state || d.readyState,
    branch: d.meta?.githubCommitRef || 'unknown',
    url: d.url
  }));
  console.log(`Remaining deployments count: ${remList.length}`);
  console.log(JSON.stringify(remList, null, 2));

  fs.writeFileSync('scripts/final-deletion-execution-log.json', JSON.stringify({
    executionTimestamp: new Date().toISOString(),
    deletionLog,
    verificationLog,
    probes: {
      home: home.statusCode,
      booking: booking.statusCode,
      www: www.statusCode
    },
    remainingCount: remList.length,
    remainingDeployments: remList
  }, null, 2));
}

run();
