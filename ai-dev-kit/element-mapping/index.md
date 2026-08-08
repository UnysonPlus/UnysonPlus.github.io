---
title: Element Mapping Reference
sidebar_label: Overview
slug: /element-mapping
description: How the UnysonPlus Site Converter recognizes each source element and maps it to a native page-builder shortcode — with per-shortcode, option-by-option coverage so you can see what's mapped, reproduced via CSS, or unmapped.
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Element Mapping Reference

When you convert a site, the **Site Converter** doesn't screenshot the source — it **recognizes** each
block and rebuilds it as a **native UnysonPlus shortcode**. This section documents what the
deterministic converter recognizes, what it becomes, and — per shortcode — **how each option is
filled**, so you can spot options that aren't mapped or are only reproduced via CSS.

How to read it:

- **Priority** — relative evaluation order (lower runs first). Specialized structural recognizers take
  the low numbers; text primitives run later; `code_block` is the **universal fallback**, so nothing
  is ever lost.
- Each shortcode has its **own page** with a full option-by-option coverage table.
- **Coverage** counts only design options (`native + via-css + unmapped`); auto plumbing is excluded.

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚪ **Unmapped** — Left at default — no source signal, or a decorative choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

> Generated from the converter's recognizer + block-builder registries (with a PHP↔JS parity twin in
> the to-pages path). This set is **expanding** — more shortcodes are added as they're documented.
> Converting a source? See also [Theme Settings Mapping](../theme-settings-mapping/index.md) (the
> design system side) and [How It Works](../how-it-works.md).

## Coverage at a glance

| Shortcode | Becomes | Native | Via CSS | Unmapped | Coverage |
| --- | --- | --- | --- | --- | --- |
| [Special Heading](./special-heading.md) | [`special_heading`](/docs/shortcodes/content-elements/special-heading) | ✅ 19 | 🟡 3 | ⚪ 13 | **54%** |
| [Text Block](./text-block.md) | [`text_block`](/docs/shortcodes/content-elements/text-block) | ✅ 4 | 🟡 4 | ⚪ 11 | **21%** |

## Recognizers

| Priority | Recognizer | Matches when | Becomes | Fallback |
| --- | --- | --- | --- | --- |
| 60 | `heading` | A semantic heading tag (`<h1>`–`<h6>`), or a text node the heuristics score as a heading. Level ≤ 2 becomes a page **Title** (larger Display type); level ≥ 3 a section heading. | [Special Heading](./special-heading.md) → [`special_heading`](/docs/shortcodes/content-elements/special-heading) | Degrades to `text_block`, then `code_block`. |
| 70 | `text` | A paragraph / body-copy block (typically `<p>` or a text container) that isn't a heading, button, or other recognized primitive. Short ALL-CAPS or eyebrow-classed text is refined to an **overline** instead. | [Text Block](./text-block.md) → [`text_block`](/docs/shortcodes/content-elements/text-block) | Degrades to `code_block`. |
