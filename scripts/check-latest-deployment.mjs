import { execSync } from 'child_process';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const projectId = 'prj_UTPKhRaSTayxCtYNGPKirQx0Nqva';

const res = execSync(`npx vercel api "/v6/deployments?projectId=${projectId}&limit=3&teamId=${teamId}"`, { encoding: 'utf8' });
const json = JSON.parse(res);

for (const d of json.deployments || []) {
  console.log(`[${d.uid}] Branch: ${d.meta?.githubCommitRef} | State: ${d.state} | Target: ${d.target} | Msg: ${d.meta?.githubCommitMessage?.substring(0, 50)}...`);
}
