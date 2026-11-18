import { execSync } from 'child_process';
import fs from 'fs';

function callVercelApi(endpoint) {
  try {
    const raw = execSync(`npx vercel api "${endpoint}"`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    return JSON.parse(raw);
  } catch (err) {
    console.error('API call failed for:', endpoint, err.message);
    return null;
  }
}

async function main() {
  console.log('--- Traversing ALL deployments across Vercel account ---');
  let allDeployments = [];
  let nextTimestamp = null;
  let page = 1;

  while (true) {
    const endpoint = nextTimestamp 
      ? `/v6/deployments?until=${nextTimestamp}`
      : `/v6/deployments`;
    
    console.log(`Fetching page ${page} (until: ${nextTimestamp || 'start'})...`);
    const data = callVercelApi(endpoint);
    if (!data || !data.deployments || data.deployments.length === 0) {
      console.log('No more deployments returned.');
      break;
    }

    allDeployments.push(...data.deployments);
    console.log(`Page ${page} returned ${data.deployments.length} deployments. Cumulative: ${allDeployments.length}`);

    if (!data.pagination || !data.pagination.next || data.pagination.next === nextTimestamp) {
      console.log('Reached end of pagination.');
      break;
    }
    nextTimestamp = data.pagination.next;
    page++;
    if (page > 100) break; // safety
  }

  // Deduplicate by uid
  const uniqueMap = new Map();
  for (const d of allDeployments) {
    uniqueMap.set(d.uid, d);
  }
  const uniqueDeployments = Array.from(uniqueMap.values());
  console.log(`Total unique deployments: ${uniqueDeployments.length}`);

  // Breakdown by Project
  const byProject = {};
  for (const d of uniqueDeployments) {
    const proj = d.name || 'unknown';
    if (!byProject[proj]) byProject[proj] = [];
    byProject[proj].push(d);
  }

  const projectSummaries = {};
  for (const [proj, deps] of Object.entries(byProject)) {
    const byTarget = { production: 0, preview: 0 };
    const byState = {};
    const byBranch = {};

    for (const d of deps) {
      const target = d.target === 'production' ? 'production' : 'preview';
      byTarget[target]++;

      const st = d.state || d.readyState || 'unknown';
      byState[st] = (byState[st] || 0) + 1;

      const br = d.meta?.githubCommitRef || d.meta?.gitCommitRef || 'cli_or_unknown';
      byBranch[br] = (byBranch[br] || 0) + 1;
    }

    // Sort by created desc
    deps.sort((a, b) => b.createdAt - a.createdAt);

    projectSummaries[proj] = {
      count: deps.length,
      targets: byTarget,
      states: byState,
      topBranches: byBranch,
      oldest: new Date(deps[deps.length - 1].createdAt).toISOString(),
      newest: new Date(deps[0].createdAt).toISOString(),
    };
  }

  console.log('\n=== PROJECT BREAKDOWN ===');
  console.log(JSON.stringify(projectSummaries, null, 2));

  fs.writeFileSync('scripts/deployments-full.json', JSON.stringify({
    summary: projectSummaries,
    totalCount: uniqueDeployments.length,
    deployments: uniqueDeployments.map(d => ({
      uid: d.uid,
      name: d.name,
      url: d.url,
      target: d.target,
      state: d.state || d.readyState,
      createdAt: d.createdAt,
      createdAtIso: new Date(d.createdAt).toISOString(),
      branch: d.meta?.githubCommitRef || d.meta?.gitCommitRef,
      commitSha: d.meta?.githubCommitSha || d.meta?.gitCommitSha,
      commitMsg: d.meta?.githubCommitMessage || d.meta?.gitCommitMessage,
      source: d.source,
    }))
  }, null, 2));

  console.log('\nWrote full audit to scripts/deployments-full.json');
}

main().catch(console.error);
