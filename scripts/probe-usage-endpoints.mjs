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
    return { error: err.message };
  }
}

const endpoints = [
  '/v1/usage',
  '/v2/usage/overview',
  '/v1/accounts/usage',
  '/v3/usage',
  '/v1/billing/usage',
  '/v2/billing/usage',
  '/v1/billing/overview',
  '/v2/invoices/current'
];

for (const ep of endpoints) {
  const res = callApi(ep);
  if (!res.error) {
    console.log(`Endpoint ${ep} SUCCESS:`, Object.keys(res));
  } else {
    // print status code
    const m = res.error.match(/\((\d{3})\)/);
    console.log(`Endpoint ${ep}:`, m ? m[1] : 'failed');
  }
}
