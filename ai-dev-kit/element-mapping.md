---
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
  `code_block` is the **universal fallback** for anything unmapped, so nothing is ever lost.
- **Matches when** — the signal the recognizer keys on.
- **Becomes** — the page-builder shortcode it produces (links to its reference).
- **Native options set** — the actual options populated, proving it's editable native output, not a
  frozen copy.
- **Fallback** — what it degrades to when it can't build the ideal element.

> This table is generated from the converter's recognizer + block-builder registries (with a PHP↔JS
> parity twin in the to-pages path). It's **expanding** — more elements are documented here as the set
> is filled in. Converting a source? See also [How It Works](./how-it-works.md).

## Supported mappings

| Priority | Recognizer | Matches when | Becomes | Native options set | Fallback |
| --- | --- | --- | --- | --- | --- |
| 60 | `heading` | A semantic heading tag (`<h1>`–`<h6>`), or a text node the heuristics score as a heading. Level ≤ 2 is treated as a page **Title** (larger Display type); level ≥ 3 as a section heading. | [`special_heading`](/docs/shortcodes/content-elements/special-heading) | `title` (rich text), `level` (h1–h6), `align`, `title_weight` (font-weight), `css_class`, native **spacing** (top/bottom margins) | Degrades to `text_block`, then `code_block`. |
| 70 | `text` | A paragraph / body-copy block (typically `<p>` or a text container) that isn't a heading, button, or other recognized primitive. Short ALL-CAPS or eyebrow/kicker-classed text is refined to an **overline** instead. | [`text_block`](/docs/shortcodes/content-elements/text-block) | `content` (rich HTML), `max_width`, `align`, **Text Style preset** (`font_size_preset`) when a body role is matched | Degrades to `code_block`. |

## Details

### Special Heading — `special_heading`

- **Recognizer:** `heading` (priority 60)
- **Matches when:** A semantic heading tag (`<h1>`–`<h6>`), or a text node the heuristics score as a heading. Level ≤ 2 is treated as a page **Title** (larger Display type); level ≥ 3 as a section heading.
- **Becomes:** [`special_heading`](/docs/shortcodes/content-elements/special-heading)
- **Native options set:** `title` (rich text), `level` (h1–h6), `align`, `title_weight` (font-weight), `css_class`, native **spacing** (top/bottom margins)
- **Recognizer block shape:** `{ t:'heading', html|text, level, align, cls, wrapCls, cs }`
- **Fallback:** Degrades to `text_block`, then `code_block`.
- **Notes:** Font family / size / weight / line-height / letter-spacing / color / transform / alignment are re-asserted at specificity 0 (the "hi-fi base"), so it looks identical out of the box while staying editable through Theme Settings and the heading's own options.

### Text Block — `text_block`

- **Recognizer:** `text` (priority 70)
- **Matches when:** A paragraph / body-copy block (typically `<p>` or a text container) that isn't a heading, button, or other recognized primitive. Short ALL-CAPS or eyebrow/kicker-classed text is refined to an **overline** instead.
- **Becomes:** [`text_block`](/docs/shortcodes/content-elements/text-block)
- **Native options set:** `content` (rich HTML), `max_width`, `align`, **Text Style preset** (`font_size_preset`) when a body role is matched
- **Recognizer block shape:** `{ t:'text', html|text, maxWidth, align, cs }`
- **Fallback:** Degrades to `code_block`.
- **Notes:** Vertical margins ride the unified styler; font / color / line-height re-assert at specificity 0. When a Text Style preset is assigned, `font-size` is dropped from the base so the editable preset owns the size instead of a frozen per-node value.
