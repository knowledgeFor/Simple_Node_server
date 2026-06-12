#!/usr/bin/env node
const { execSync } = require('child_process');

function run(cmd) {
  try {
    console.log(`> ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Command failed: ${cmd}`);
    process.exit(err.status || 1);
  }
}

// Fast local pre-add: skip full typecheck (kept for CI / pre-commit)
// 1) Fast lint and auto-fix (uses .eslintrc.fast.cjs)
run('npm run lint:fix-fast');

// 2) Format
run('npm run format');

// 3) NOTE: staging is intentionally skipped — run `git add .` when ready
console.log('Checks passed. You can now run `git add .` to stage files.');
