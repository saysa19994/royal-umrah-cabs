import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

const files = [
  'final-route-inventory-reconciliation.csv',
  'final-guide-count-reconciliation.csv',
  'final-ziyarat-rendered-html-audit.csv',
  'final-all-locale-sitemap-audit.csv',
  'final-all-locale-sitemap-summary.json',
  'final-deployment-identity-verification.json',
  'final-coaster-customer-facing-safety-check.md',
  'final-seo-acceptance-gate.md',
  // And the 2 new ones requested in this prompt:
  'final-ziyarat-ssg-vs-sitemap-reconciliation.csv',
  'final-guide-ssg-vs-sitemap-reconciliation.csv'
];

const targetCommit = '79eba8f050232e5a3e9d7be34f36c4d95fef0512';

// Get files in commit 79eba8f
const committedFilesRaw = execSync(`git ls-tree -r --name-only ${targetCommit}`, { encoding: 'utf8' });
const committedSet = new Set(committedFilesRaw.split('\n').map(s => s.trim()));

// Get tracked files in index
const trackedFilesRaw = execSync('git ls-files', { encoding: 'utf8' });
const trackedSet = new Set(trackedFilesRaw.split('\n').map(s => s.trim()));

const results = [];

for (const fname of files) {
  const relPath = `docs/seo/${fname}`;
  const fullPath = path.join('docs/seo', fname);
  const existsInWorktree = fs.existsSync(fullPath);
  const trackedByGit = trackedSet.has(relPath);
  const committedInExpectedSha = committedSet.has(relPath);

  let fileHash = 'N/A';
  if (existsInWorktree) {
    const buf = fs.readFileSync(fullPath);
    fileHash = crypto.createHash('sha256').update(buf).digest('hex');
  }

  let verificationStatus = 'PASS WITH LIMITATION (UNCOMMITTED_LOCAL_WORKSPACE)';
  if (committedInExpectedSha) {
    verificationStatus = 'PASS (COMMITTED_IN_TARGET_SHA)';
  } else if (!existsInWorktree) {
    verificationStatus = 'FAIL (MISSING_IN_WORKTREE)';
  }

  results.push({
    filename: fname,
    exists_in_worktree: existsInWorktree ? 'TRUE' : 'FALSE',
    tracked_by_git: trackedByGit ? 'TRUE' : 'FALSE',
    committed_in_expected_sha: committedInExpectedSha ? 'TRUE' : 'FALSE',
    file_hash: fileHash,
    verification_status: verificationStatus
  });
}

console.log(JSON.stringify(results, null, 2));
fs.writeFileSync('docs/seo/commit-artifact-verification.json', JSON.stringify(results, null, 2), 'utf8');
