---
title: Theme Settings Mapping
sidebar_label: Overview
slug: /theme-settings-mapping
description: How the UnysonPlus Site Converter fills Theme Settings from a source design — which tabs it populates (Colors, Typography…) and, per tab, which options are mapped, reproduced via CSS, or left manual.
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Theme Settings Mapping

A conversion doesn't just rebuild pages — it also sets up the site's **design system** in Theme
Settings (the palette, typography, and layout tokens every element then consumes). Theme Settings is
large, and the converter deliberately populates only the **design-system** tabs; the rest (header /
footer chrome, blog, pages, misc) come from the generated child theme or are set by hand.

This section shows **which tabs the converter populates**, and — for each populated tab — an
option-by-option coverage table.

- ✅ **Populated** · - 🟡 **Partial** · - ⚪ **Manual**

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

> Generated from the converter's design-system extraction (with a PHP↔JS parity twin) cross-referenced
> against the theme's option groups. Converting a source? See also
> [Element Mapping](../element-mapping/index.md) and [How It Works](../how-it-works.md).

## Coverage by tab

| Group | Tab | Coverage | Detail / note |
| --- | --- | --- | --- |
| **General** | [Colors](./colors.md) | ✅ Populated | ✅ 7 native · 88% |
| General | Typography & Fonts | ✅ Populated | Heading + body font families and the Display / body type scale are derived from the source. Detail page coming next. |
| General | Backgrounds (Site / Section / Footer) | ✅ Populated | The converter runs a background detector across body / sections / footer and writes the site background (`site_background`) + per-section band fills — colour, gradient, photo, OR video (background videos are sideloaded to the media library so they stay editable in the Background → Video picker). The body background is written once as a global Theme Setting so the whole site inherits it. The theme-generator emits `body { background-color: var(--site-bg-color, …) }` (no `!important`) so a later edit still wins. |
| General | Layout | 🟡 Partial | Container / content width may be carried; most layout options are set by hand. |
| General | Base | ⚪ Manual | Selection / scrollbar / focus colours — opt-in, set by hand. |
| General | Settings · Pages · Sidebar · Social | ⚪ Manual | Behavioural / structural defaults — not derived from a source design. |
| Header | Header (Identity, Layout, Top/Bottom bar, Menu, Mega Menu…) | ⚪ Manual | The header chrome comes from the generated child theme + captured menus, not Theme Settings design keys. |
| Footer | Footer (Layout, Pre / Main / Post / Copyright, Widgets…) | 🟡 Partial | The footer chrome (columns, menus, widgets) comes from the generated child theme + captured menus. The footer **background fill and muted text colour ARE derived** from the source footer (`detect_footer_style` / `footer_background`). |
| Content | Blog · Single · Archives · Pages | ⚪ Manual | Post/archive layout defaults — not part of a page conversion. |
| Misc | Misc | ⚪ Manual | Miscellaneous toggles — set by hand. |
