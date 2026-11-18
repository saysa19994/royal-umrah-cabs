import { execSync } from 'child_process';

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

// Check team billing / usage
console.log('=== Checking user / team info ===');
const userRes = callApi('/v2/user');
console.log('User:', userRes?.user?.username, userRes?.user?.email);

const teamRes = callApi(`/v2/teams/${teamId}`);
console.log('Billing tier:', teamRes?.billing?.plan);
console.log('Billing period:', teamRes?.billing?.period);

// Check project usage / metrics
console.log('=== Checking project details ===');
const proj = callApi(`/v9/projects/${projectId}`);
console.log('Project framework:', proj?.framework);
console.log('Project targets:', proj?.targets);

// Let's check usage endpoint
const now = Date.now();
const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
const fromIso = new Date(thirtyDaysAgo).toISOString();
const toIso = new Date(now).toISOString();

const metricTypes = [
  'data_cache_read',
  'data_cache_write',
  'data_cache',
  'fast_data_transfer',
  'edge_requests',
  'edge_middleware_invocations',
  'serverless_function_execution',
  'function_duration',
  'function_invocations'
];

for (const m of metricTypes) {
  const usage = callApi(`/v2/usage?type=${m}&from=${fromIso}&to=${toIso}&projectId=${projectId}`);
  if (usage && !usage.error && usage.data) {
    console.log(`Metric ${m}: data points = ${usage.data.length}`);
    if (usage.data.length > 0) {
      console.log(`Sample ${m}:`, JSON.stringify(usage.data.slice(-3)));
    }
  } else {
    // console.log(`Metric ${m}: no data or error`, usage?.error || 'empty');
  }
}
