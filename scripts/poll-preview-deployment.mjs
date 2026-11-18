import { execSync } from 'child_process';

const teamId = 'team_4mpishXNVacXKUjGSmG6Hj6i';
const deploymentId = 'dpl_3jCXR7doNKWuqYZEP5CSquXmajy8';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function poll() {
  for (let i = 0; i < 40; i++) {
    try {
      const cmd = `npx vercel api "/v13/deployments/${deploymentId}?teamId=${teamId}"`;
      const res = execSync(cmd, { encoding: 'utf8' });
      const json = JSON.parse(res);
      console.log(`Poll ${i+1}: State = ${json.readyState || json.state}`);
      if (json.readyState === 'READY' || json.state === 'READY') {
        console.log('Preview Deployment is READY!');
        console.log('Preview URL: https://' + json.url);
        console.log('Aliases:', json.alias);
        return;
      }
      if (json.readyState === 'ERROR' || json.state === 'ERROR') {
        console.error('Preview Deployment FAILED:', json.errorMessage);
        process.exit(1);
      }
    } catch (e) {
      console.error('Polling error:', e.message);
    }
    await sleep(5000);
  }
}

poll();
