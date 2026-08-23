---
title: Footer — Theme Settings mapping
sidebar_label: Footer
slug: /theme-settings-mapping/footer
description: How the UnysonPlus Site Converter fills the Theme Settings Footer tab (`footer_background · footer_text_color`) from a source design — option by option, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Footer — Theme Settings mapping

**Theme Settings → Footer → Layout** · storage key `footer_background · footer_text_color`

The Footer tab styles the footer band. The converter derives the footer’s **background fill** and **muted text colour**; the structural chrome (columns, menus, widgets) comes from the generated child theme + captured menus.

## Coverage

**2/7 mapped from the source** (29%) — 🟡 0 via CSS · ⚪ 5 default/manual · ⚙️ 0 auto.

| Option | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `footer_background` | `background-pro` | ✅ Native | Footer band background fill (from `detect_footer_style`) |
| `footer_text_color` | `compact color` | ✅ Native | Muted footer text colour |
| `footer_link_color` | `compact color` | ⚪ Unmapped | Default |
| `footer_border_top` | `multi-inline` | ⚪ Unmapped | Default |
| `footer_padding_top` | `select` | ⚪ Unmapped | Default |
| `footer_padding_bottom` | `select` | ⚪ Unmapped | Default |
| `(columns / menus / widgets)` | `Footer Columns` | ⚪ Unmapped | Built by the generated child theme + captured menus, not these keys |

The footer background and text colour come from `detect_footer_style()`. The footer’s rows / columns / menus are built by the generated child theme and the captured menus (see [Header & Footer Elements](/theme/header-footer-elements)), not these design keys.

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Theme Settings Mapping](./index.md)
