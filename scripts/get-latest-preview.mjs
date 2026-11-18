import { execSync } from 'child_process';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const projectId = 'prj_UTPKhRaSTayxCtYNGPKirQx0Nqva';

try {
  const cmd = `npx vercel api "/v6/deployments?projectId=${projectId}&teamId=${teamId}&limit=5"`;
  const res = execSync(cmd, { encoding: 'utf8' });
  const json = JSON.parse(res);
  console.log('Latest 5 Deployments:');
  for (const d of json.deployments) {
    console.log({
      uid: d.uid,
      name: d.name,
      url: 'https://' + d.url,
      state: d.state,
      target: d.target,
      created: new Date(d.created).toISOString(),
      meta: {
        gitBranch: d.meta?.githubCommitRef || d.meta?.gitBranch,
        gitCommit: d.meta?.githubCommitSha?.slice(0, 7) || d.meta?.gitCommitSha?.slice(0, 7),
      }
    });
  }
} catch (e) {
  console.error('Failed to query Vercel API:', e.message);
}
