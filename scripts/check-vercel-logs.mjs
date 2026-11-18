import { execSync } from 'child_process';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const deploymentId = 'dpl_2XWUBa9RN2EfQtQQD1fa9f1eBNgv'; // latest production deployment

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

// Check deployment events / logs
console.log('Checking deployment events...');
const events = callApi(`/v2/deployments/${deploymentId}/events?limit=20`);
console.log('Events type:', Array.isArray(events) ? `${events.length} items` : Object.keys(events));
if (Array.isArray(events) && events.length > 0) {
  console.log('Sample event:', events.slice(0, 3));
}
