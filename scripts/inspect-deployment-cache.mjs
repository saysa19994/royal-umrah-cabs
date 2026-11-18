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
console.log('buildCacheSummary:', JSON.stringify(live.buildCacheSummary, null, 2));
console.log('lambdas count:', live.lambdas?.length);
if (live.lambdas && live.lambdas.length > 0) {
  console.log('First lambda sample:', live.lambdas[0]);
}
console.log('builds:', JSON.stringify(live.builds, null, 2));
