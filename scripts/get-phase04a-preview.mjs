import { execSync } from 'child_process';
const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const deploymentId = 'dpl_GQfwAZEKeY5tuankXeDzZSTEnHNj';
const res = execSync(`npx vercel api "/v13/deployments/${deploymentId}?teamId=${teamId}"`, { encoding: 'utf8' });
const json = JSON.parse(res);
console.log('Preview URL: https://' + json.url);
console.log('Aliases:', json.alias);
console.log('ReadyState:', json.readyState);
