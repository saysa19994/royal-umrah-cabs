import { execSync } from 'child_process';

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

const live = callApi('/v13/deployments/dpl_98mGY3gCvJUkUCdjkSDXzwG8KdD3');
console.log('--- LIVE DEPLOYMENT ---');
console.log('ID:', live.id);
console.log('URL:', live.url);
console.log('Target:', live.target);
console.log('Routes count:', live.routes?.length);
console.log('Lambdas/Functions:', Object.keys(live.functions || {}));
console.log('Alias:', live.alias);
console.log('Building at:', live.buildingAt, 'Ready:', live.ready);
console.log('Keys on deployment object:', Object.keys(live));

const old = callApi('/v13/deployments/dpl_2rfGZuykSMxgqHiUUAWJQaKELFuW'); // ERROR state
console.log('--- ERROR DEPLOYMENT ---');
console.log('ID:', old.id, 'State:', old.readyState || old.state);
