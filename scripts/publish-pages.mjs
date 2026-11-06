// Publishes the site by hand: builds the static export from main and pushes it
// to the gh-pages branch, which GitHub Pages serves at horizon36596.org.
//
// This exists because GitHub Actions cannot start jobs while the team's GitHub
// account is billing-locked (since 2026-11-03), so .github/workflows/deploy.yml
// fails on every push and merging to main no longer publishes anything. Pages
// was switched on 2026-11-05 from "GitHub Actions" to "Deploy from a branch:
// gh-pages", whose own build still runs under the lock.
//
//   pnpm publish:pages
//
// Run it from an up-to-date main after merging. It refuses to publish local
// edits or commits that are not on origin/main, so the live site always matches
// a commit anyone can look up.
//
// When the lock is lifted, switch Pages back (Settings → Pages → Source:
// GitHub Actions) and stop using this; deploy.yml takes over again.

import { execSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd, cwd = ROOT) =>
  execSync(cmd, { cwd, stdio: ['ignore', 'pipe', 'inherit'] })
    .toString()
    .trim();

run('git fetch -q origin main gh-pages');
if (run('git rev-parse --abbrev-ref HEAD') !== 'main') {
  throw new Error('Switch to main first.');
}
if (run('git status --porcelain')) {
  throw new Error('Commit or stash local changes first.');
}
const sha = run('git rev-parse HEAD');
if (sha !== run('git rev-parse origin/main')) {
  throw new Error('Local main differs from origin/main. Pull or push first.');
}

// next/font fetches Google Fonts during the build and sometimes fails on a
// network blip, so give it a couple of retries before giving up.
for (let attempt = 1; ; attempt++) {
  try {
    rmSync(join(ROOT, 'out'), { recursive: true, force: true });
    execSync('pnpm build', { cwd: ROOT, stdio: 'inherit' });
    break;
  } catch (err) {
    if (attempt === 3) throw err;
    console.log(`\nBuild failed, retrying (${attempt + 1}/3)...\n`);
  }
}

const tree = mkdtempSync(join(tmpdir(), 'horizon-gh-pages-'));
try {
  run(`git worktree add -q "${tree}" origin/gh-pages --detach`);
  for (const entry of readdirSync(tree)) {
    if (entry !== '.git') rmSync(join(tree, entry), { recursive: true });
  }
  cpSync(join(ROOT, 'out'), tree, { recursive: true });
  run('git add -A', tree);
  if (!run('git status --porcelain', tree)) {
    console.log('\nLive site already matches main. Nothing to publish.');
  } else {
    run(
      `git commit -q -m "Publish site built from main ${sha.slice(0, 7)}"`,
      tree,
    );
    run('git push -q origin HEAD:gh-pages', tree);
    console.log(
      `\nPublished main ${sha.slice(0, 7)}. Live at https://horizon36596.org/ in about a minute.`,
    );
  }
} finally {
  run(`git worktree remove --force "${tree}"`);
}
