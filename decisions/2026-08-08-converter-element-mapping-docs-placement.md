---
slug: converter-element-mapping-docs-placement
title: "Where should the converter's element-mapping table live — the shortcode docs or the AI Dev Kit? And should it be generated?"
authors: [jon]
tags: [documentation, conversion, architecture]
date: 2026-08-08
description: We wanted to publicly document how the deterministic Site Converter recognizes a source block and rebuilds it as a native page-builder shortcode (Priority / Recognizer / Matches when / Becomes). The question was placement — a row on each /docs/shortcodes/<element> page, or one consolidated table — and whether to hand-write it or generate it. Decision — one consolidated "Element Mapping Reference" page in the AI Dev Kit section (not the per-shortcode user docs), generated from a single JSON data file that mirrors the converter's recognizer + block-builder registries, cross-linked once from the shortcodes overview.
---

**The question:** We want the docs site to explain how the **deterministic Site Converter** turns a
source element into a UnysonPlus shortcode — the `Priority / Recognizer / Matches when / Becomes`
table, plus the native options each mapping sets. Two open questions: **where** does it go — a row
added to each `/docs/shortcodes/<element>` page, or one consolidated table — and do we **hand-write**
it or **generate** it?

<!-- truncate -->

## Context

The mapping is defined in two registries inside the `site-converter` extension: the **recognizer
registry** (`class-fw-site-converter-stitch.php`, the "Matches when / Priority" half) and the
**block-builder registry** (`class-fw-site-converter-mapper.php` — `register_builder( role → shortcode )`
plus the `n_*` node builders), with a **PHP↔JS parity** twin in the to-pages path. So the data is
structured, priority-ordered, and lives in code that changes on its own cadence.

## Options considered

- **Placement A — a row per `/docs/shortcodes/<element>` page.** Puts the mapping next to the element
  it produces. But `/docs/shortcodes` is *user* documentation ("how do I use this element?"), the
  mapping is *converter* documentation ("how is a source block recognized?"), and the two change on
  different cadences. It also destroys the value of seeing the whole recognizer list in priority order,
  and many recognizers don't map 1:1 to a shortcode page (some become a section structure or an
  option-type value).
- **Placement B — one consolidated "Element Mapping Reference" page in the AI Dev Kit section.** Keeps
  the whole priority-ordered table in one place for the builder/agent audience, showcases the
  converter's breadth, and leaves the per-element user docs clean. Cross-linked once from the
  shortcodes overview for discoverability.
- **Authoring — hand-write vs. generate.** A hand-typed table would drift within a release or two,
  against this project's strong anti-drift / PHP↔JS-parity / docs-sync doctrine. Generating it from the
  registries keeps it honest.

## Decision

**Placement B, generated.** One **Element Mapping Reference** page at `/ai-dev-kit/element-mapping`,
**not** rows on the per-shortcode user docs. It is **generated** by `scripts/gen-element-mapping.mjs`
from a single hand-curated data file (`ai-dev-kit/_data/element-mapping.json`) that mirrors the
converter's recognizer + block-builder registries; the generated `.md` carries a "do not edit" banner.
The shortcodes overview links to it once via an admonition. The table seeds with the first two
primitives (`heading → special_heading`, `text → text_block`) and expands from there.

## Why

- **Audience & cadence fit.** Converter internals belong with the conversion methodology (AI Dev Kit),
  not the end-user element reference — and they track converter code, not a shortcode's option surface.
- **The whole table is the value.** Priority ordering only makes sense consolidated; splitting it per
  page would hide it.
- **Anti-drift.** Generating from one JSON mirror (the intended long-term source being the registries
  themselves) matches how the project already guards docs against going stale, and gives one edit point
  when the converter changes.
- **It sells the converter.** A single "look how many source patterns we translate natively" table is
  genuine marketing for the AI Dev Kit and Site Converter.

## Update (same day) — refined to per-shortcode pages with option-level coverage

A new requirement landed immediately: we want to **monitor which of a shortcode's options are not
mapped, or only reproduced via CSS**. A single flat table can't show that. So the structure became an
**Element Mapping** category — an **index** (coverage-at-a-glance + the recognizer table) plus **one
page per shortcode** carrying a full option-by-option coverage table. Each option is classified
`native` / `via-css` (reproduced through scoped CSS, native option left empty — a promote candidate) /
`unmapped` / `auto`, with a coverage percentage per shortcode. Same generator, same single JSON source
of truth — the JSON just gained an `options[]` array per shortcode, cross-referenced against each
shortcode's `options.php`. This keeps the "one generated source of truth, no drift" spirit of the
original decision while making the docs a real coverage-monitoring tool.
