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
    return { error: err.message };
  }
}

async function run() {
  console.log('=== 1. CURRENT ALIASES ROUTING MAP ===');
  const aliases = callApi(`/v3/aliases?projectId=${projectId}`);
  console.log('Total aliases returned:', aliases?.aliases?.length);
  const aliasRouting = (aliases?.aliases || []).map(a => ({
    alias: a.alias,
    deploymentId: a.deploymentId,
    createdAt: new Date(a.createdAt).toISOString(),
  }));
  console.log(JSON.stringify(aliasRouting, null, 2));

  console.log('\n=== 2. PROJECT DOMAINS ===');
  const domains = callApi(`/v9/projects/${projectId}/domains`);
  console.log(JSON.stringify(domains, null, 2));

  console.log('\n=== 3. QUERYING USAGE TYPES DISCOVERY ===');
  // Attempt invalid type to see if Vercel API returns list of supported types
  const testType = callApi('/v2/usage?type=invalid_type_test');
  console.log('Invalid type response:', JSON.stringify(testType));

  console.log('\n=== 4. TEST CANDIDATE USAGE METRICS ===');
  const candidateTypes = [
    'deployment_storage',
    'storage',
    'artifacts',
    'builds',
    'data_cache',
    'serverless_function_execution',
    'edge_middleware_invocations',
    'fast_data_transfer',
    'web_analytics_events'
  ];

  const usageResults = {};
  for (const t of candidateTypes) {
    const res = callApi(`/v2/usage?type=${t}`);
    if (res && !res.error) {
      usageResults[t] = res;
    }
  }

  fs.writeFileSync('scripts/storage-forensic-deep-dive.json', JSON.stringify({
    aliasRouting,
    domains,
    usageDiscovery: testType,
    usageResults
  }, null, 2));

  console.log('\nSaved deep-dive results to scripts/storage-forensic-deep-dive.json');
}

run();
