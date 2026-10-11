#!/usr/bin/env node
/**
 * gen-roadmap.mjs — keep an extension roadmap honest, automatically.
 *
 * The generic form of gen-pos-roadmap.mjs. Pass the roadmap JSON; the JSON names its
 * extension (`extension`: the folder slug) and its push clone (`cloneDir`), so one
 * script serves every roadmap rendered with <Roadmap />:
 *
 *     node scripts/gen-roadmap.mjs src/data/visitor-insights-roadmap.json [--dry|--check]
 *
 * Status is derived from the real extension source tree, exactly as for POS Sync:
 *
 *   done         — every file in the task's `detect.files` exists AND every
 *                  `detect.symbols` pattern is found in its file
 *   in-progress  — some, but not all, of the above are satisfied
 *   planned      — none of it exists yet
 *
 * `"pin": true` leaves a task's status as written (work with no file footprint).
 *
 * Extension resolution order:
 *   1. env EXT_DIR
 *   2. <repo>/../../unysonplus/framework/extensions/<extension>   (working copy)
 *   3. <repo>/../<cloneDir>                                       (the push clone)
 *   4. d:/Web Dev/unysonplus/framework/extensions/<extension>
 *
 * A missing extension never fails: every task is then `planned`, which is correct
 * before any code exists.
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve, basename } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..');

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry');
const CHECK = argv.includes('--check');
const dataArg = argv.find((a) => !a.startsWith('--'));
if (!dataArg) {
  console.error('usage: node scripts/gen-roadmap.mjs <roadmap.json> [--dry|--check]');
  process.exit(2);
}
const DATA = resolve(REPO, dataArg);
const NAME = basename(DATA, '.json');

const data = JSON.parse(readFileSync(DATA, 'utf8'));
const before = JSON.stringify(data);

function findExtension() {
  const candidates = [
    process.env.EXT_DIR,
    resolve(REPO, '..', '..', 'unysonplus', 'framework', 'extensions', data.extension),
    data.cloneDir && resolve(REPO, '..', data.cloneDir),
    `d:/Web Dev/unysonplus/framework/extensions/${data.extension}`,
  ];
  for (const c of candidates) {
    if (c && existsSync(c) && statSync(c).isDirectory()) return c;
  }
  return null;
}

function hasSymbol(root, rel, pattern) {
  const abs = join(root, rel);
  if (!existsSync(abs)) return false;
  try {
    return new RegExp(pattern, 'i').test(readFileSync(abs, 'utf8'));
  } catch {
    return false;
  }
}

function evaluate(root, detect) {
  const files = detect?.files ?? [];
  const symbols = detect?.symbols ?? [];
  const total = files.length + symbols.length;
  if (!root || total === 0) return { met: 0, total, status: 'planned' };

  let met = 0;
  for (const f of files) if (existsSync(join(root, f))) met++;
  for (const s of symbols) if (hasSymbol(root, s.file, s.pattern)) met++;

  if (met === 0) return { met, total, status: 'planned' };
  if (met === total) return { met, total, status: 'done' };
  return { met, total, status: 'in-progress' };
}

function readVersion(root) {
  if (!root) return null;
  const manifest = join(root, 'manifest.php');
  if (!existsSync(manifest)) return null;
  const m = readFileSync(manifest, 'utf8').match(
    /\$manifest\s*\[\s*['"]version['"]\s*\]\s*=\s*['"]([^'"]+)['"]/i
  );
  return m ? m[1] : null;
}

const root = findExtension();
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

if (CHECK) {
  const stripTime = (s) => JSON.parse(s, (k, v) => (k === 'generatedAt' ? null : v));
  const stale = JSON.stringify(stripTime(before)) !== JSON.stringify(stripTime(serialized));
  if (stale) {
    console.error(`${NAME}: roadmap is STALE — run \`node scripts/gen-roadmap.mjs ${dataArg}\`.`);
    for (const c of changes) console.error(c);
    process.exit(1);
  }
  console.log(`${NAME}: roadmap is up to date.`);
  process.exit(0);
}

if (!DRY) writeFileSync(DATA, serialized);

console.log(
  root
    ? `${NAME}: scanned ${root}`
    : `${NAME}: extension not found — every task reported as planned (correct before any code exists).`
);
if (data.extensionVersion) console.log(`${NAME}: extension version ${data.extensionVersion}`);
console.log(
  `${NAME}: ${done} done, ${progress} in progress, ${planned} planned (${total} tasks, ${
    total ? Math.round((done / total) * 100) : 0
  }% complete)`
);
if (changes.length) {
  console.log(`${NAME}: status changes —`);
  for (const c of changes) console.log(c);
}
if (DRY) console.log(`${NAME}: --dry, nothing written.`);
