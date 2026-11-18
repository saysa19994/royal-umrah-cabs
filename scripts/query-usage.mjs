import { execSync } from 'child_process';

const now = Date.now();
const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
const fromIso = new Date(thirtyDaysAgo).toISOString();
const toIso = new Date(now).toISOString();

const types = ['artifacts', 'builds', 'data_cache'];

for (const type of types) {
  try {
    const cmd = `npx vercel api "/v2/usage?type=${type}&from=${fromIso}&to=${toIso}"`;
    const res = execSync(cmd, { encoding: 'utf8' });
    console.log(`=== TYPE: ${type} ===`);
    console.log(res);
  } catch (err) {
    console.error(`Failed ${type}:`, err.message);
  }
}
