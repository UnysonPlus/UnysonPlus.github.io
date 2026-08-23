#!/usr/bin/env node
/**
 * gen-theme-settings-mapping.mjs — regenerate the AI Dev Kit "Theme Settings Mapping" docs.
 *
 * Reads ai-dev-kit/_data/theme-settings-mapping.json (the hand-curated mirror of the Site
 * Converter's design-system extraction cross-referenced against the theme's option groups)
 * and emits:
 *
 *   ai-dev-kit/theme-settings-mapping/index.md          — overview + coverage-by-tab table
 *   ai-dev-kit/theme-settings-mapping/<tab>.md          — one page per converter-populated tab
 *   ai-dev-kit/theme-settings-mapping/_category_.json   — sidebar category
 *
 * The .md files are GENERATED — never hand-edit them. Edit the JSON, then re-run:
 *     node scripts/gen-theme-settings-mapping.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA = join(ROOT, 'ai-dev-kit', '_data', 'theme-settings-mapping.json');
const OUTDIR = join(ROOT, 'ai-dev-kit', 'theme-settings-mapping');

const data = JSON.parse(readFileSync(DATA, 'utf8'));
const ST = data.statuses;
const TC = data.tabCoverage;

const GENERATED = '<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->';
const statusCell = (s) => `${ST[s].emoji} ${ST[s].label}`;
const tabBadge = (c) => `${TC[c].emoji} ${TC[c].label}`;

function coverage(tab) {
  const c = { native: 0, 'via-css': 0, unmapped: 0, auto: 0 };
  for (const o of tab.options) c[o.status] = (c[o.status] || 0) + 1;
  const denom = c.native + c['via-css'] + c.unmapped;
  const pct = denom ? Math.round((c.native / denom) * 100) : 0;
  return { ...c, denom, pct };
}

if (existsSync(OUTDIR)) rmSync(OUTDIR, { recursive: true, force: true });
mkdirSync(OUTDIR, { recursive: true });

// --- _category_.json -----------------------------------------------------------
writeFileSync(
  join(OUTDIR, '_category_.json'),
  JSON.stringify(
    { label: 'Theme Settings Mapping', position: 4.6, link: { type: 'doc', id: 'theme-settings-mapping/index' } },
    null,
    2
  ) + '\n'
);

// --- per-tab pages -------------------------------------------------------------
for (const tab of data.tabs) {
  const cov = coverage(tab);
  const rows = tab.options
    .map((o) => `| \`${o.key}\` | \`${o.type}\` | ${statusCell(o.status)} | ${o.source || '—'} |`)
    .join('\n');

  const md = `---
title: ${tab.tab} — Theme Settings mapping
sidebar_label: ${tab.tab}
slug: /theme-settings-mapping/${tab.slug}
description: How the UnysonPlus Site Converter fills the Theme Settings ${tab.tab} tab (\`${tab.storageKey}\`) from a source design — option by option, with coverage.
hide_table_of_contents: true
---

${GENERATED}

# ${tab.tab} — Theme Settings mapping

**${tab.location}** · storage key \`${tab.storageKey}\`

${tab.intro}

## Coverage

**${cov.native}/${cov.denom} mapped from the source** (${cov.pct}%) — ${ST['via-css'].emoji} ${cov['via-css']} via CSS · ${ST.unmapped.emoji} ${cov.unmapped} default/manual · ${ST.auto.emoji} ${cov.auto} auto.

| Option | Type | Status | Derived from / note |
| --- | --- | --- | --- |
${rows}
${tab.recognizerNotes ? `\n${tab.recognizerNotes}\n` : ''}
### Status legend

${Object.values(ST).map((s) => `- ${s.emoji} **${s.label}** — ${s.blurb}`).join('\n')}

← Back to [Theme Settings Mapping](./index.md)
`;
  writeFileSync(join(OUTDIR, `${tab.slug}.md`), md);
}

// --- index ---------------------------------------------------------------------
const pageRows = data.tabs.map((tab) => {
  const c = coverage(tab);
  return `| **${tab.group}** | [${tab.tab}](./${tab.slug}.md) | ${tabBadge(tab.coverage)} | ${ST.native.emoji} ${c.native} native · ${c.pct}% |`;
});
const otherRows = (data.otherTabs || []).map(
  (t) => `| ${t.group} | ${t.tab} | ${tabBadge(t.coverage)} | ${t.note || '—'} |`
);
const allRows = [...pageRows, ...otherRows].join('\n');

const indexMd = `---
title: Theme Settings Mapping
sidebar_label: Overview
slug: /theme-settings-mapping
description: How the UnysonPlus Site Converter fills Theme Settings from a source design — which tabs it populates (Colors, Typography…) and, per tab, which options are mapped, reproduced via CSS, or left manual.
---

${GENERATED}

# Theme Settings Mapping

A conversion doesn't just rebuild pages — it also sets up the site's **design system** in Theme
Settings (the palette, typography, and layout tokens every element then consumes). Theme Settings is
large, and the converter deliberately populates only the **design-system** tabs; the rest (header /
footer chrome, blog, pages, misc) come from the generated child theme or are set by hand.

This section shows **which tabs the converter populates**, and — for each populated tab — an
option-by-option coverage table.

${Object.values(TC).map((t) => `- ${t.emoji} **${t.label}**`).join(' · ')}

${Object.values(ST).map((s) => `- ${s.emoji} **${s.label}** — ${s.blurb}`).join('\n')}

> Generated from the converter's design-system extraction (with a PHP↔JS parity twin) cross-referenced
> against the theme's option groups. Converting a source? See also
> [Element Mapping](../element-mapping/index.md) and [How It Works](../how-it-works.md).

## Coverage by tab

| Group | Tab | Coverage | Detail / note |
| --- | --- | --- | --- |
${allRows}
`;
writeFileSync(join(OUTDIR, 'index.md'), indexMd);

console.log(`Wrote ${OUTDIR}\\{index, ${data.tabs.map((t) => t.slug).join(', ')}}.md (${data.tabs.length} populated tab${data.tabs.length === 1 ? '' : 's'}, ${(data.otherTabs || []).length} listed).`);
