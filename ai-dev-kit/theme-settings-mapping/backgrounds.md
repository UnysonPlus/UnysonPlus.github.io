---
title: Backgrounds (Site / Section / Footer) — Theme Settings mapping
sidebar_label: Backgrounds (Site / Section / Footer)
slug: /theme-settings-mapping/backgrounds
description: How the UnysonPlus Site Converter fills the Theme Settings Backgrounds (Site / Section / Footer) tab (`general_layout.site_background · footer_background`) from a source design — option by option, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Backgrounds (Site / Section / Footer) — Theme Settings mapping

**Theme Settings → General → Layout (Site Background) · per-Section · Footer** · storage key `general_layout.site_background · footer_background`

A background detector runs across the **body**, each **section**, and the **footer**, and writes the fills it finds — colour, gradient, photo, or video.

## Coverage

**4/5 mapped from the source** (80%) — 🟡 0 via CSS · ⚪ 1 default/manual · ⚙️ 0 auto.

| Option | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `general_layout.site_background` | `background-pro` | ✅ Native | The body background — colour / gradient / image, written once as a global setting |
| `(section band fills)` | `background-pro` | ✅ Native | Per-section colour / gradient / photo / video — stored on each Section, not Theme Settings |
| `footer_background` | `background-pro` | ✅ Native | The footer band’s background fill |
| `footer_text_color` | `compact color` | ✅ Native | The footer’s muted text colour |
| `site_background_pattern` | `multi-picker` | ⚪ Unmapped | Not derived — set by hand |

The body background is written **once** as a global Theme Setting (`general_layout.site_background`) so the whole site inherits it, and the theme-generator emits `body { background-color: var(--site-bg-color, …) }` **without** `!important` so a later edit still wins. Background **videos** are side-loaded to the Media Library so they stay editable in the Background → Video picker. Per-section band fills live on each **Section** element, not on a Theme Setting.

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Theme Settings Mapping](./index.md)
