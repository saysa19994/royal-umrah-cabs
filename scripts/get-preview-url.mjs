import { execSync } from 'child_process';
const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const res = execSync(`npx vercel api "/v13/deployments/dpl_6FdfDEYsLKYp38PsWzggAKU6HBAr?teamId=${teamId}"`, { encoding: 'utf8' });
const json = JSON.parse(res);
console.log('Preview URL: https://' + json.url);
console.log('Aliases:', json.alias);
console.log('State:', json.readyState);
console.log('Target:', json.target);
