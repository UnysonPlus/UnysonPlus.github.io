---
title: Buttons — converter mapping
sidebar_label: Buttons
slug: /theme-settings-mapping/components/buttons
description: How the UnysonPlus Site Converter derives the Buttons preset library in Theme Settings → Components from a source design.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Buttons — converter mapping

**Theme Settings → Components → Buttons** · ✅ Populated

From the source’s real button skin (`build_button_presets`) — the fill, text colour, border, radius, padding and shadow of the actual buttons, plus S / M / L **size** presets. A Large size preset also repoints the header CTA so it matches the source’s chunky button.

Full reference: **[Buttons](/theme/components/buttons)** (how it’s coded + examples).

## Coverage

**7/9 derived from the source** (78%) — 🟡 1 via CSS · ⚪ 1 default/manual · ⚙️ 0 auto.

| Aspect | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `fill / background` | `colour` | ✅ Native | The button’s computed background |
| `text colour` | `colour` | ✅ Native | The button’s computed text colour |
| `border` | `border` | ✅ Native | Width / style / colour when the source button has one |
| `radius` | `unit` | ✅ Native | Corner radius |
| `padding` | `box` | ✅ Native | X / Y padding → informs the size presets |
| `shadow` | `box-shadow` | ✅ Native | Drop shadow when present |
| `font-family` | `typography` | 🟡 Via CSS | Only carried when it **deviates** from the body base font; otherwise inherited for free |
| `size presets (S/M/L)` | `button_sizes` | ✅ Native | Distinct button sizes clustered from the source |
| `hover / focus state` | `state` | ⚪ Unmapped | Left at the theme default |

← Back to [Components](./index.md)
