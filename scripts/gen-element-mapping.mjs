#!/usr/bin/env node
/**
 * gen-element-mapping.mjs — regenerate the AI Dev Kit "Element Mapping" docs.
 *
 * Reads ai-dev-kit/_data/element-mapping.json (the hand-curated mirror of the Site
 * Converter's recognizer + block-builder registries, cross-referenced against each
 * shortcode's options.php) and emits:
 *
 *   ai-dev-kit/element-mapping/index.md            — overview + coverage summary + recognizer table
 *   ai-dev-kit/element-mapping/<shortcode>.md      — one page per shortcode, full options coverage
 *   ai-dev-kit/element-mapping/_category_.json     — sidebar category
 *
 * The .md files are GENERATED — never hand-edit them. Edit the JSON, then re-run:
 *     node scripts/gen-element-mapping.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'ai-dev-kit', '_data', 'element-mapping.json');
const OUTDIR = join(ROOT, 'ai-dev-kit', 'element-mapping');

const data = JSON.parse(readFileSync(DATA, 'utf8'));
const ST = data.statuses;
// Higher priority runs FIRST in the converter, so present everything high→low (eval order).
const elements = [...data.elements].sort((a, b) => b.priority - a.priority);
const recognizersExtra = data.recognizersExtra || [];

const GENERATED = '<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->';
const slugOf = (e) => e.shortcode.replace(/_/g, '-');
const becomesLink = (e) => (e.doc ? `[\`${e.shortcode}\`](${e.doc})` : `\`${e.shortcode}\``);
const statusCell = (s) => `${ST[s].emoji} ${ST[s].label}`;

function coverage(e) {
  const c = { native: 0, 'via-css': 0, unmapped: 0, auto: 0 };
  for (const o of e.options) c[o.status] = (c[o.status] || 0) + 1;
  const denom = c.native + c['via-css'] + c.unmapped;
  const pct = denom ? Math.round((c.native / denom) * 100) : 0;
  return { ...c, denom, pct };
}

// --- fresh output dir ----------------------------------------------------------
if (existsSync(OUTDIR)) rmSync(OUTDIR, { recursive: true, force: true });
mkdirSync(OUTDIR, { recursive: true });

// --- _category_.json -----------------------------------------------------------
writeFileSync(
  join(OUTDIR, '_category_.json'),
  JSON.stringify(
    {
      label: 'Element Mapping',
      position: 4.5,
      link: {
        type: 'doc',
        id: 'element-mapping/index',
      },
    },
    null,
    2
  ) + '\n'
);

// --- per-shortcode pages -------------------------------------------------------
for (const e of elements) {
  const cov = coverage(e);
  const rows = e.options
    .map((o) => `| \`${o.key}\` | ${o.tab} | \`${o.type}\` | ${statusCell(o.status)} | ${o.source || '—'} |`)
    .join('\n');

  const md = `---
title: ${e.label} — converter mapping
sidebar_label: ${e.label}
slug: /element-mapping/${slugOf(e)}
description: How the UnysonPlus Site Converter maps a source ${e.recognizer} into the ${e.label} (\`${e.shortcode}\`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

${GENERATED}

# ${e.label} — converter mapping

Source \`${e.recognizer}\` → ${becomesLink(e)}. This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | ${e.priority} |
| **Recognizer** | \`${e.recognizer}\` |
| **Matches when** | ${e.matchesWhen} |
| **Becomes** | ${becomesLink(e)} |
| **Recognizer block shape** | \`${e.blockShape}\` |
| **Fallback** | ${e.fallback} |
${e.recognizerNotes ? `\n${e.recognizerNotes}\n` : ''}
## Option coverage

**${cov.native}/${cov.denom} options mapped natively** (${cov.pct}%) — ${ST['via-css'].emoji} ${cov['via-css']} via CSS · ${ST.unmapped.emoji} ${cov.unmapped} unmapped · ${ST.auto.emoji} ${cov.auto} auto.

| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
${rows}

### Status legend

${Object.values(ST).map((s) => `- ${s.emoji} **${s.label}** — ${s.blurb}`).join('\n')}

← Back to [Element Mapping](./index.md)
`;
  writeFileSync(join(OUTDIR, `${slugOf(e)}.md`), md);
}

// --- index page ----------------------------------------------------------------
// The Recognizers table lists the WHOLE registry (eval order, high→low): the curated elements above
// (which link to a full per-option page) plus the metadata-only `recognizersExtra`.
const extraBecomes = (e) => (e.doc ? `[\`${e.becomes}\`](${e.doc})` : `\`${e.becomes}\``);
const recogRows = [
  ...elements.map((e) => ({
    priority: e.priority,
    recognizer: e.recognizer,
    matchesWhen: e.matchesWhen,
    becomes: `[${e.label}](./${slugOf(e)}.md) → ${becomesLink(e)}`,
    fallback: e.fallback,
  })),
  ...recognizersExtra.map((e) => ({
    priority: e.priority,
    recognizer: e.recognizer,
    matchesWhen: e.matchesWhen,
    becomes: extraBecomes(e),
    fallback: e.fallback,
  })),
]
  .sort((a, b) => b.priority - a.priority)
  .map((r) => `| ${r.priority} | \`${r.recognizer}\` | ${r.matchesWhen} | ${r.becomes} | ${r.fallback} |`)
  .join('\n');

const covRows = elements
  .map((e) => {
    const c = coverage(e);
    return `| [${e.label}](./${slugOf(e)}.md) | ${becomesLink(e)} | ${ST.native.emoji} ${c.native} | ${ST['via-css'].emoji} ${c['via-css']} | ${ST.unmapped.emoji} ${c.unmapped} | **${c.pct}%** |`;
  })
  .join('\n');

const indexMd = `---
title: Element Mapping Reference
sidebar_label: Overview
slug: /element-mapping
description: How the UnysonPlus Site Converter recognizes each source element and maps it to a native page-builder shortcode — with per-shortcode, option-by-option coverage so you can see what's mapped, reproduced via CSS, or unmapped.
---

${GENERATED}

# Element Mapping Reference

When you convert a site, the **Site Converter** doesn't screenshot the source — it **recognizes** each
block and rebuilds it as a **native UnysonPlus shortcode**. This section documents what the
deterministic converter recognizes, what it becomes, and — per shortcode — **how each option is
filled**, so you can spot options that aren't mapped or are only reproduced via CSS.

How to read it:

- **Priority** — relative evaluation order (**higher runs first**). Specialized structural recognizers
  take the **high** numbers and are tried first; text primitives run later (lower numbers); anything no
  recognizer claims falls back to \`code_block\`, the **universal fallback**, so nothing is ever lost.
- The curated shortcodes below have their **own page** with a full option-by-option coverage table; the
  rest of the registry is listed in the [Recognizers](#recognizers) table with its rule and target.
- **Coverage** counts only design options (\`native + via-css + unmapped\`); auto plumbing is excluded.

${Object.values(ST).map((s) => `- ${s.emoji} **${s.label}** — ${s.blurb}`).join('\n')}

### Nothing is dropped silently

Two backstops guarantee no source content is lost:

- **\`code_block\` fallback** — anything no recognizer claims is preserved verbatim as a \`code_block\`, so
  it still renders while staying hand-editable.
- **Safety net + drop report** — after mapping, a salvage pass (\`salvage_dropped()\`) rescues any real
  text node that fell through, and the converter writes a **\`conversion-drops.json\`** coverage report
  into the bundle: what was *rescued* (real content the net had to recover) vs. *decorative* (safely
  skipped). The golden-fixture regression tests assert a **drop budget** so a recognizer change can't
  quietly start losing content.

> Generated from the converter's recognizer + block-builder registries (with a PHP↔JS parity twin in
> the to-pages path). This set is **expanding** — more shortcodes are added as they're documented.
> Converting a source? See also [Theme Settings Mapping](../theme-settings-mapping/index.md) (the
> design system side) and [How It Works](../how-it-works.md).

## Coverage at a glance

| Shortcode | Becomes | Native | Via CSS | Unmapped | Coverage |
| --- | --- | --- | --- | --- | --- |
${covRows}

## Recognizers

The **complete** recognizer registry, in evaluation order (higher runs first). Linked rows have a full
per-option coverage page; the rest document the recognizer rule and its target shortcode.

| Priority | Recognizer | Matches when | Becomes | Fallback |
| --- | --- | --- | --- | --- |
${recogRows}
`;
writeFileSync(join(OUTDIR, 'index.md'), indexMd);

console.log(`Wrote ${OUTDIR}\\{index, ${elements.map(slugOf).join(', ')}}.md (${elements.length} shortcode${elements.length === 1 ? '' : 's'}).`);
