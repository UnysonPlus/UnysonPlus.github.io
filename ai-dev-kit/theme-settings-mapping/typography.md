---
title: Typography & Fonts — Theme Settings mapping
sidebar_label: Typography & Fonts
slug: /theme-settings-mapping/typography
description: How the UnysonPlus Site Converter fills the Theme Settings Typography & Fonts tab (`typography`) from a source design — option by option, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Typography & Fonts — Theme Settings mapping

**Theme Settings → General → Typography** · storage key `typography`

The Typography tab sets the site fonts and type scale. The converter derives the **heading font family** and writes it to `typography.heading_font`; the **body font** is enforced by the generated child theme’s scoped CSS.

## Coverage

**1/7 mapped from the source** (14%) — 🟡 1 via CSS · ⚪ 5 default/manual · ⚙️ 0 auto.

| Option | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `heading_font` | `typography` | ✅ Native | Heading font family, from the source headings → `typography.heading_font` |
| `body` | `typography` | 🟡 Via CSS | Body font enforced by the generated child-theme CSS (`body { font-family … }`); the native family may stay “inherit” |
| `h1–h6` | `typography` | ⚪ Unmapped | Per-heading size overrides — the type scale goes to Components → Text Styles instead |
| `body_link` | `compact color` | ⚪ Unmapped | Default (uses the palette) |
| `body_link_hover` | `compact color` | ⚪ Unmapped | Default |
| `body_link_underline` | `select` | ⚪ Unmapped | Default (hover) |
| `custom_fonts` | `addable-box` | ⚪ Unmapped | Non-Google fonts are not registered here automatically |

The type **scale** the converter distils from the source headings and paragraphs is written to the shortcodes’ **[Text Styles](/theme/components/text-styles)** component (the Display / Lead / Small roles), **not** the per-heading overrides on this tab. Link colours and per-heading size overrides are left at the theme defaults.

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Theme Settings Mapping](./index.md)
