#!/usr/bin/env node
/**
 * gen-php-api.mjs — regenerate the "API Reference" docs (PHP functions + hooks) from the
 * extractor's data file.
 *
 * Reads   reference/_data/php-api.json   (produced by scripts/extract-php-api.php)
 * Emits   reference/index.md
 *         reference/functions/{index,<group>}.md  + _category_.json
 *         reference/hooks/{index,<group>}.md       + _category_.json
 *
 * The .md files are GENERATED — never hand-edit. Re-run the two steps after a framework change:
 *   D:/xampp/php/php.exe scripts/extract-php-api.php "D:/Web Dev/unysonplus/framework" reference/_data/php-api.json
 *   node scripts/gen-php-api.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'reference', '_data', 'php-api.json');
const OUT = join(ROOT, 'reference');

const data = JSON.parse(readFileSync(DATA, 'utf8'));
const GEN = '<!-- ⚠️ GENERATED — do not edit by hand. Edit the framework docblocks, then run: php scripts/extract-php-api.php … && node scripts/gen-php-api.mjs -->';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
// MDX-escape: docblock prose contains raw <select>/<option>/{…} that MDX would parse as JSX.
const mdx = (s) => String(s == null ? '' : s).replace(/[<>{}]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '{': '&#123;', '}': '&#125;' }[c]));
// Table-cell text: MDX-safe, single line, escaped pipes.
const esc = (s) => mdx(s).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
// Block prose: MDX-safe, newlines preserved.
const prose = (s) => mdx(String(s == null ? '' : s).trim());
// Raw code (signatures) — goes inside a ```php fence, so it is literal; do NOT escape.
const escBlock = (s) => String(s == null ? '' : s).trim();
// A stable, readable anchor id for a symbol heading.
const fnId = (name) => name.replace(/[^A-Za-z0-9_]/g, '-');
const hookId = (name) => 'h-' + name.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// group name -> { functions[], hooks[] }
const byGroupFns = {};
for (const f of data.functions) (byGroupFns[f.group] ||= []).push(f);
const byGroupHooks = {};
for (const h of data.hooks) (byGroupHooks[h.group] ||= []).push(h);
const fnGroups = Object.keys(byGroupFns).sort((a, b) => byGroupFns[b].length - byGroupFns[a].length);
const hookGroups = Object.keys(byGroupHooks).sort((a, b) => byGroupHooks[b].length - byGroupHooks[a].length);

if (existsSync(OUT)) {
  // wipe only the generated md + category files, keep _data/
  for (const sub of ['functions', 'hooks']) {
    const d = join(OUT, sub);
    if (existsSync(d)) rmSync(d, { recursive: true, force: true });
  }
}
mkdirSync(join(OUT, 'functions'), { recursive: true });
mkdirSync(join(OUT, 'hooks'), { recursive: true });

// ---- one FUNCTION detail block -------------------------------------------------
function fnBlock(f) {
  const lines = [];
  lines.push(`### \`${f.name}\` {#${fnId(f.name)}}`);
  const badges = [];
  if (f.pluggable) badges.push('🔌 pluggable');
  if (f.deprecated) badges.push('⚠️ deprecated' + (f.deprecated !== 'yes' ? ` — ${esc(f.deprecated)}` : ''));
  if (f.since) badges.push(`since ${esc(f.since)}`);
  if (badges.length) lines.push(`*${badges.join(' · ')}*`);
  lines.push('');
  lines.push('```php');
  lines.push(escBlock(f.signature));
  lines.push('```');
  if (f.summary) { lines.push(''); lines.push(prose(f.summary)); }
  if (f.desc) { lines.push(''); lines.push(prose(f.desc)); }
  if (f.params && f.params.length) {
    lines.push('');
    lines.push('| Parameter | Type | Description |');
    lines.push('| --- | --- | --- |');
    for (const p of f.params) lines.push(`| \`${esc(p.name)}\` | ${p.type ? `\`${esc(p.type)}\`` : '—'} | ${esc(p.desc) || '—'} |`);
  }
  if (f.return && (f.return.type || f.return.desc)) {
    lines.push('');
    lines.push(`**Returns** ${f.return.type ? `\`${esc(f.return.type)}\`` : ''} ${esc(f.return.desc)}`.trim());
  }
  lines.push('');
  lines.push(`<small>Source: \`${f.file}:${f.line}\`</small>`);
  lines.push('');
  return lines.join('\n');
}

// ---- one HOOK detail block -----------------------------------------------------
function hookBlock(h) {
  const lines = [];
  lines.push(`### \`${h.name}\` {#${hookId(h.name)}}`);
  lines.push(`*${h.type === 'action' ? '🎬 action' : '🧪 filter'}${h.sites > 1 ? ` · ${h.sites} call sites` : ''}*`);
  if (h.summary) { lines.push(''); lines.push(prose(h.summary)); }
  lines.push('');
  lines.push('```php');
  lines.push(h.type === 'action'
    ? `add_action( '${h.name}', $callback );`
    : `add_filter( '${h.name}', $callback );`);
  lines.push('```');
  lines.push(`<small>Fired in: \`${h.file}:${h.line}\`</small>`);
  lines.push('');
  return lines.join('\n');
}

// ---- FUNCTIONS: per-group pages + index ---------------------------------------
writeFileSync(join(OUT, 'functions', '_category_.json'),
  JSON.stringify({ label: 'Functions', position: 2, link: { type: 'doc', id: 'functions/index' } }, null, 2) + '\n');

fnGroups.forEach((g, gi) => {
  const fns = byGroupFns[g].slice().sort((a, b) => a.name.localeCompare(b.name));
  const jump = fns.map((f) => `| [\`${f.name}\`](#${fnId(f.name)}) | ${esc(f.summary) || '—'} |`).join('\n');
  const md = `---
title: ${g} — functions
sidebar_label: ${g}
slug: /functions/${slug(g)}
description: Public PHP helper functions in the UnysonPlus ${g} subsystem — signatures, parameters, and return values.
hide_table_of_contents: true
---

${GEN}

# ${g} — functions

**${fns.length} public function${fns.length === 1 ? '' : 's'}.** ${fns.filter((f) => f.pluggable).length} are 🔌 pluggable (\`function_exists()\`-guarded, so a theme/child can override them).

| Function | Summary |
| --- | --- |
${jump}

---

${fns.map(fnBlock).join('\n')}
← Back to [Functions overview](./index.md)
`;
  writeFileSync(join(OUT, 'functions', `${slug(g)}.md`), md);
});

const fnIndexRows = fnGroups
  .map((g) => `| [${g}](./${slug(g)}.md) | ${byGroupFns[g].length} | ${byGroupFns[g].filter((f) => f.pluggable).length} |`)
  .join('\n');
writeFileSync(join(OUT, 'functions', 'index.md'), `---
title: Functions
sidebar_label: Overview
slug: /functions
description: The UnysonPlus public PHP helper functions, grouped by subsystem — ${data.counts.functions} functions across the framework.
---

${GEN}

# PHP Functions

The framework's public helper functions (prefixed \`fw_\` / \`unysonplus_\` / \`upw_\` / \`sc_\` / \`fw_ext_\`),
grouped by subsystem. **${data.counts.functions} functions** in total. Each entry shows its signature,
parameters, return value, and source location.

- 🔌 **pluggable** — wrapped in \`if ( ! function_exists( … ) )\`, so a theme or child theme can redefine it.

> Generated from the framework's PHPDoc + a token scan. See also the [Hooks reference](../hooks/index.md)
> for actions & filters.

## Functions by subsystem

| Subsystem | Functions | Pluggable |
| --- | --- | --- |
${fnIndexRows}
`);

// ---- HOOKS: per-group pages + index -------------------------------------------
writeFileSync(join(OUT, 'hooks', '_category_.json'),
  JSON.stringify({ label: 'Hooks (Actions & Filters)', position: 3, link: { type: 'doc', id: 'hooks/index' } }, null, 2) + '\n');

hookGroups.forEach((g) => {
  const hks = byGroupHooks[g].slice().sort((a, b) => a.name.localeCompare(b.name));
  const jump = hks.map((h) => `| [\`${h.name}\`](#${hookId(h.name)}) | ${h.type} | ${esc(h.summary) || '—'} |`).join('\n');
  const md = `---
title: ${g} — hooks
sidebar_label: ${g}
slug: /hooks/${slug(g)}
description: Actions and filters exposed by the UnysonPlus ${g} subsystem.
hide_table_of_contents: true
---

${GEN}

# ${g} — hooks

**${hks.length} hook${hks.length === 1 ? '' : 's'}** — ${hks.filter((h) => h.type === 'action').length} actions · ${hks.filter((h) => h.type === 'filter').length} filters.

| Hook | Type | Summary |
| --- | --- | --- |
${jump}

---

${hks.map(hookBlock).join('\n')}
← Back to [Hooks overview](./index.md)
`;
  writeFileSync(join(OUT, 'hooks', `${slug(g)}.md`), md);
});

const hookIndexRows = hookGroups
  .map((g) => `| [${g}](./${slug(g)}.md) | ${byGroupHooks[g].length} | ${byGroupHooks[g].filter((h) => h.type === 'action').length} | ${byGroupHooks[g].filter((h) => h.type === 'filter').length} |`)
  .join('\n');
writeFileSync(join(OUT, 'hooks', 'index.md'), `---
title: Hooks (Actions & Filters)
sidebar_label: Overview
slug: /hooks
description: Every action and filter the UnysonPlus framework exposes for extension and theme authors — ${data.counts.hooks} hooks, grouped by subsystem.
---

${GEN}

# Hooks — Actions & Filters

Every **action** (🎬) and **filter** (🧪) the framework exposes for extension and theme authors —
the real extensibility surface. **${data.counts.hooks} hooks** in total, grouped by subsystem.

- 🎬 **action** — \`add_action( 'name', \$cb )\`; fires at a point in the flow (do something).
- 🧪 **filter** — \`add_filter( 'name', \$cb )\`; passes a value through for you to modify (return it).

> Generated from the framework's \`do_action\` / \`apply_filters\` calls (framework-owned hooks only —
> WordPress-core hooks are excluded). See also the [Functions reference](../functions/index.md).

## Hooks by subsystem

| Subsystem | Hooks | Actions | Filters |
| --- | --- | --- | --- |
${hookIndexRows}
`);

// ---- top-level Overview --------------------------------------------------------
writeFileSync(join(OUT, 'index.md'), `---
title: API Reference
sidebar_label: Overview
sidebar_position: 1
slug: /
description: The UnysonPlus PHP API reference — every public helper function and every action/filter hook, generated from the framework source.
---

${GEN}

# API Reference

A generated reference to the UnysonPlus framework's **public PHP surface** — the functions and hooks
theme and extension authors build against. It is produced from the framework's PHPDoc and a source
scan, so it always matches the shipped code (never hand-written).

## What's here

- **[Functions](./functions/index.md)** — ${data.counts.functions} public helper functions
  (\`fw_\` / \`unysonplus_\` / \`upw_\` / \`sc_\` / \`fw_ext_\`), grouped by subsystem, with signatures,
  parameters, return values and source locations. Pluggable (\`function_exists\`-guarded) functions are flagged.
- **[Hooks](./hooks/index.md)** — ${data.counts.hooks} actions & filters, grouped by subsystem — the
  supported extension points.

## What's not here

This is a **contract** reference: the public API + hooks. Internal implementation helpers,
anonymous closures, and WordPress-core hooks are intentionally excluded — read the source for those.
For *how to build* with the framework, see the **Manual**, **The Theme**, and **AI Dev Kit** sections.

> **Regenerating:** run \`php scripts/extract-php-api.php "…/unysonplus/framework" reference/_data/php-api.json\`
> then \`node scripts/gen-php-api.mjs\`. The \`.md\` files are generated — edit the framework docblocks, not the output.
`);

console.log(`Wrote reference/: ${data.counts.functions} functions across ${fnGroups.length} groups, ${data.counts.hooks} hooks across ${hookGroups.length} groups.`);
