#!/usr/bin/env node
/**
 * gen-pos-roadmap.mjs — keep the POS Sync roadmap honest, automatically.
 *
 * The roadmap published at /extensions/pos-sync/roadmap is rendered from
 * `src/data/pos-roadmap.json`. Rather than hand-maintaining a "done / not done" flag
 * (which always drifts from reality), this script INSPECTS THE REAL EXTENSION SOURCE
 * TREE and derives each task's status from what actually exists on disk:
 *
 *   done         — every file in the task's `detect.files` exists AND every
 *                  `detect.symbols` pattern is found in its file
 *   in-progress  — some, but not all, of the above are satisfied
 *   planned      — none of it exists yet
 *
 * A task with `"pin": true` is left exactly as written (use it for work that has no
 * detectable file footprint, e.g. a docs or research task).
 *
 * It also stamps the extension's current version (from its `manifest.php`) and the
 * time of the scan, so the published page can say how fresh it is.
 *
 * Run it:
 *     npm run roadmap:pos          # scan + rewrite the JSON
 *     npm run roadmap:pos -- --dry # report only, write nothing
 *     npm run roadmap:pos -- --check  # exit 1 if the JSON is stale (for CI / pre-push)
 *
 * The extension lives OUTSIDE this repo (both under d:\Web Dev\). Resolution order:
 *   1. env POS_EXT_DIR
 *   2. <repo>/../../unysonplus/framework/extensions/pos-sync   (working copy)
 *   3. <repo>/../UnysonPlus-POS-Sync-Extension                 (the push clone)
 *   4. d:/Web Dev/unysonplus/framework/extensions/pos-sync
 *
 * Nothing here fails the build when the extension is missing — before any code exists
 * the scan simply confirms every task is still `planned`, which is the correct answer.
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..');
const DATA = join(REPO, 'src', 'data', 'pos-roadmap.json');

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry');
const CHECK = argv.includes('--check');

// ---------------------------------------------------------------- locate the extension

function findExtension() {
  const candidates = [
    process.env.POS_EXT_DIR,
    resolve(REPO, '..', '..', 'unysonplus', 'framework', 'extensions', 'pos-sync'),
    resolve(REPO, '..', 'UnysonPlus-POS-Sync-Extension'),
    'd:/Web Dev/unysonplus/framework/extensions/pos-sync',
  ];
  for (const c of candidates) {
    if (c && existsSync(c) && statSync(c).isDirectory()) return c;
  }
  return null;
}

// ---------------------------------------------------------------- detection

/** True when `rel` exists inside the extension root. */
function has(root, rel) {
  return existsSync(join(root, rel));
}

/** True when `rel` exists AND its contents match `pattern` (a JS regex source string). */
function hasSymbol(root, rel, pattern) {
  const abs = join(root, rel);
  if (!existsSync(abs)) return false;
  try {
    return new RegExp(pattern, 'i').test(readFileSync(abs, 'utf8'));
  } catch {
    return false;
  }
}

/**
 * Score one task's detect block.
 * @returns {{met: number, total: number, status: string}}
 */
function evaluate(root, detect) {
  const files = detect?.files ?? [];
  const symbols = detect?.symbols ?? [];
  const total = files.length + symbols.length;

  if (!root || total === 0) return { met: 0, total, status: 'planned' };

  let met = 0;
  for (const f of files) if (has(root, f)) met++;
  for (const s of symbols) if (hasSymbol(root, s.file, s.pattern)) met++;

  if (met === 0) return { met, total, status: 'planned' };
  if (met === total) return { met, total, status: 'done' };
  return { met, total, status: 'in-progress' };
}

/** Read `$manifest['version']` out of the extension's manifest.php, if present. */
function readVersion(root) {
  if (!root) return null;
  const manifest = join(root, 'manifest.php');
  if (!existsSync(manifest)) return null;
  const m = readFileSync(manifest, 'utf8').match(
    /\$manifest\s*\[\s*['"]version['"]\s*\]\s*=\s*['"]([^'"]+)['"]/i
  );
  return m ? m[1] : null;
}

// ---------------------------------------------------------------- run

const root = findExtension();
const data = JSON.parse(readFileSync(DATA, 'utf8'));
const before = JSON.stringify(data);

let done = 0;
let progress = 0;
let planned = 0;
const changes = [];

for (const milestone of data.milestones) {
  for (const task of milestone.tasks) {
    const previous = task.status ?? 'planned';

    if (task.pin) {
      task.status = previous;
    } else {
      const { met, total, status } = evaluate(root, task.detect);
      task.status = status;
      task.progress = total ? `${met}/${total}` : null;
      if (status !== previous) changes.push(`  ${task.id}: ${previous} → ${status}`);
    }

    if (task.status === 'done') done++;
    else if (task.status === 'in-progress') progress++;
    else planned++;
  }
}

data.detected = Boolean(root);
data.extensionVersion = readVersion(root);
data.generatedAt = new Date().toISOString();

const total = done + progress + planned;
const serialized = JSON.stringify(data, null, 2) + '\n';

// --check: compare ignoring the timestamp, which changes on every run by design.
if (CHECK) {
  const stripTime = (s) => JSON.parse(s, (k, v) => (k === 'generatedAt' ? null : v));
  const stale = JSON.stringify(stripTime(before)) !== JSON.stringify(stripTime(serialized));
  if (stale) {
    console.error('gen-pos-roadmap: roadmap is STALE — run `npm run roadmap:pos`.');
    for (const c of changes) console.error(c);
    process.exit(1);
  }
  console.log('gen-pos-roadmap: roadmap is up to date.');
  process.exit(0);
}

if (!DRY) writeFileSync(DATA, serialized);

console.log(
  root
    ? `gen-pos-roadmap: scanned ${root}`
    : 'gen-pos-roadmap: extension not found — every task reported as planned (correct before any code exists).'
);
if (data.extensionVersion) console.log(`gen-pos-roadmap: extension version ${data.extensionVersion}`);
console.log(
  `gen-pos-roadmap: ${done} done, ${progress} in progress, ${planned} planned (${total} tasks, ${
    total ? Math.round((done / total) * 100) : 0
  }% complete)`
);
if (changes.length) {
  console.log('gen-pos-roadmap: status changes —');
  for (const c of changes) console.log(c);
}
if (DRY) console.log('gen-pos-roadmap: --dry, nothing written.');
