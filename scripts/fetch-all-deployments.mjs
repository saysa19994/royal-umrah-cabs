import { execSync } from 'child_process';
import fs from 'fs';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const projectId = 'prj_UTPKhRaSTayxCtYNGPKirQx0Nqva';

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

async function run() {
  console.log('Querying project details...');
  const proj = callApi(`/v9/projects/${projectId}`);
  console.log('Project targets:', proj?.targets?.production?.id);
  console.log('Project domains count:', proj?.targets?.production?.alias?.length);

  let allDeployments = [];
  let nextTimestamp = null;
  let page = 1;

  while (true) {
    let url = `/v6/deployments?projectId=${projectId}&limit=100`;
    if (nextTimestamp) {
      url += `&until=${nextTimestamp}`;
    }
    console.log(`Fetching page ${page} (until: ${nextTimestamp || 'start'})...`);
    const data = callApi(url);
    if (!data || !data.deployments || data.deployments.length === 0) {
      console.log('No more deployments returned.');
      break;
    }
    allDeployments.push(...data.deployments);
    console.log(`Page ${page} fetched ${data.deployments.length} deployments. Total so far: ${allDeployments.length}`);
    
    if (!data.pagination || !data.pagination.next || data.pagination.next === nextTimestamp) {
      console.log('End of pagination reached.');
      break;
    }
    nextTimestamp = data.pagination.next;
    page++;
    if (page > 50) break;
  }

  // Deduplicate
  const map = new Map();
  for (const d of allDeployments) {
    map.set(d.uid, d);
  }
  const unique = Array.from(map.values());
  console.log(`Total unique deployments found for royal-umrah-cabs: ${unique.length}`);

  // Inspect each deployment
  const detailed = unique.map(d => {
    return {
      uid: d.uid,
      name: d.name,
      url: d.url,
      target: d.target, // 'production' or null/undefined
      state: d.state || d.readyState,
      createdAt: d.createdAt,
      createdAtIso: new Date(d.createdAt).toISOString(),
      branch: d.meta?.githubCommitRef || d.meta?.gitCommitRef || 'unknown',
      commitSha: d.meta?.githubCommitSha || d.meta?.gitCommitSha || 'unknown',
      commitMsg: d.meta?.githubCommitMessage || d.meta?.gitCommitMessage || '',
      source: d.source || 'unknown',
      alias: d.alias || [],
      isProductionTarget: d.target === 'production',
      isCurrentLiveProduction: d.uid === proj?.targets?.production?.id,
    };
  });

  fs.writeFileSync('scripts/royal-deployments-inventory.json', JSON.stringify({
    project: {
      id: proj.id,
      name: proj.name,
      liveProductionDeploymentId: proj?.targets?.production?.id,
      framework: proj.framework,
    },
    totalCount: detailed.length,
    deployments: detailed
  }, null, 2));

  console.log('Successfully saved inventory to scripts/royal-deployments-inventory.json');
}

run();
