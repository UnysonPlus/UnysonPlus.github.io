---
title: Background Patterns — converter mapping
sidebar_label: Background Patterns
slug: /theme-settings-mapping/components/background-patterns
description: How the UnysonPlus Site Converter derives the Background Patterns preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Background Patterns — converter mapping

**Theme Settings → Components → Background Patterns** · ✅ Populated

Background Patterns is a reusable library of **CSS/HTML** background patterns — each becomes a `.pattern-{slug}` you can apply to a Section, Container or the site background. The converter captures the source’s decorative gradient / SVG tiles and rebuilds them as scoped, editable pattern presets (the PHP parity of the capture service’s JS `backgroundPatterns()`).

Full reference: **[Background Patterns](/theme/components/background-patterns)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-patterns.php` |
| **Converter method** | `FW_Site_Converter_Stitch::build_background_patterns()` |
| **Storage key** | `background_patterns` |
| **Produces** | a `.pattern-{slug}` class per preset — applied to a Section, Container, or the site background |

The converter scans the source for decorative background layers (gradients, inline / data-URI SVG tiles), extracts each as a scoped preset — a `<div>` carrying a root class + the captured declarations namespaced to that class — and records the section background it sat over as the editor **preview** colour. The mapper then injects the matching `.pattern-{slug}` overlay onto the section that used it. **JavaScript-driven** backgrounds are out of scope — those are the Animation Engine’s job.

## Coverage

**4/4 fields derived from the source** (100%) — 🟡 0 via CSS · ⚪ 0 default/manual · ⚙️ 1 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Pattern (`background_patterns` box)** | | | |
| `pattern_name` | `text` | ⚙️ Auto | Named sequentially — `Captured Pattern N` |
| `root_class` | `text` | ✅ Native | The scoping class for the pattern → `.pattern-{slug}` |
| `html` | `code-editor (htmlmixed)` | ✅ Native | The pattern markup — a `<div>` carrying the root class |
| `css` | `code-editor (css)` | ✅ Native | The captured background declarations (gradient / SVG tile) scoped to the root class |
| `preview_bg` | `color-picker` | ✅ Native | The captured section background the pattern sits over (editor preview only — not in output) |

:::note[Captured as editable code, not a screenshot]
Each pattern is rebuilt as real, scoped **HTML + CSS** you can open and edit — the class names are kept exactly and namespaced to the preset (and its `@keyframes` too), so nothing leaks into the rest of the site. The `preview_bg` is editor-only metadata (the section colour the pattern sat over) and never enters the output CSS.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
