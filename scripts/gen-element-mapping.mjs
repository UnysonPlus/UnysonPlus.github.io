#!/usr/bin/env node
/**
 * gen-element-mapping.mjs — regenerate the AI Dev Kit "Element Mapping Reference" page.
 *
 * Reads ai-dev-kit/_data/element-mapping.json (the hand-curated mirror of the Site
 * Converter's recognizer + block-builder registries) and emits ai-dev-kit/element-mapping.md.
 *
 * The .md is GENERATED — never hand-edit it. Edit the JSON, then re-run:
 *     node scripts/gen-element-mapping.mjs
 *
 * When the converter gains/loses a recognizer, update the JSON in the same change so the
 * public table can't drift from the code (mirrors this project's docs-sync discipline).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'ai-dev-kit', '_data', 'element-mapping.json');
const OUT = join(ROOT, 'ai-dev-kit', 'element-mapping.md');

const data = JSON.parse(readFileSync(DATA, 'utf8'));
const rows = [...data.elements].sort((a, b) => a.priority - b.priority);

const becomesCell = (e) =>
  e.becomesDoc ? `[\`${e.becomes}\`](${e.becomesDoc})` : `\`${e.becomes}\``;
const optsCell = (e) => (e.nativeOptions || []).join(', ');

// --- Summary table -------------------------------------------------------------
const tableHead =
  '| Priority | Recognizer | Matches when | Becomes | Native options set | Fallback |\n' +
  '| --- | --- | --- | --- | --- | --- |';
const tableRows = rows
  .map(
    (e) =>
      `| ${e.priority} | \`${e.recognizer}\` | ${e.matchesWhen} | ${becomesCell(e)} | ${optsCell(e)} | ${e.fallback} |`
  )
  .join('\n');

// --- Per-element detail ---------------------------------------------------------
const detail = rows
  .map((e) => {
    const lines = [];
    lines.push(`### ${e.becomesLabel || e.becomes} — \`${e.becomes}\``);
    lines.push('');
    lines.push(`- **Recognizer:** \`${e.recognizer}\` (priority ${e.priority})`);
    lines.push(`- **Matches when:** ${e.matchesWhen}`);
    lines.push(`- **Becomes:** ${becomesCell(e)}`);
    lines.push(`- **Native options set:** ${optsCell(e)}`);
    lines.push(`- **Recognizer block shape:** \`${e.blockShape}\``);
    lines.push(`- **Fallback:** ${e.fallback}`);
    if (e.notes) lines.push(`- **Notes:** ${e.notes}`);
    return lines.join('\n');
  })
  .join('\n\n');

const md = `---
title: Element Mapping Reference
sidebar_label: Element Mapping
sidebar_position: 4.5
slug: /element-mapping
description: How the UnysonPlus Site Converter deterministically recognizes a source element and translates it into a native page-builder shortcode — recognizer, match rule, and the options it sets.
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json,
     then run: node scripts/gen-element-mapping.mjs -->

# Element Mapping Reference

When you convert a site, the **Site Converter** doesn't screenshot the source — it **recognizes**
each block and rebuilds it as a **native UnysonPlus shortcode** with real, editable options. This page
lists what the deterministic converter recognizes and what each pattern becomes.

How to read it:

- **Priority** — relative evaluation order (lower runs first). Specialized structural recognizers
  (tables, pricing grids, accordions…) take the low numbers; the text primitives below run later; and
  \`code_block\` is the **universal fallback** for anything unmapped, so nothing is ever lost.
- **Matches when** — the signal the recognizer keys on.
- **Becomes** — the page-builder shortcode it produces (links to its reference).
- **Native options set** — the actual options populated, proving it's editable native output, not a
  frozen copy.
- **Fallback** — what it degrades to when it can't build the ideal element.

> This table is generated from the converter's recognizer + block-builder registries (with a PHP↔JS
> parity twin in the to-pages path). It's **expanding** — more elements are documented here as the set
> is filled in. Converting a source? See also [How It Works](./how-it-works.md).

## Supported mappings

${tableHead}
${tableRows}

## Details

${detail}
`;

writeFileSync(OUT, md);
console.log(`Wrote ${OUT} (${rows.length} element${rows.length === 1 ? '' : 's'}).`);
