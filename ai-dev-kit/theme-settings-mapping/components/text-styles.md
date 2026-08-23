---
title: Text Styles — converter mapping
sidebar_label: Text Styles
slug: /theme-settings-mapping/components/text-styles
description: How the UnysonPlus Site Converter derives the Text Styles preset library in Theme Settings → Components from a source design.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Text Styles — converter mapping

**Theme Settings → Components → Text Styles** · ✅ Populated

The **display scale** + eyebrow distilled from the source’s headings and paragraphs (`build_text_styles`) — the Display / Lead / Small roles the elements consume (this is where the type scale lands, not the Typography tab’s per-heading overrides).

Full reference: **[Text Styles](/theme/components/text-styles)** (how it’s coded + examples).

## Coverage

**5/6 derived from the source** (83%) — 🟡 0 via CSS · ⚪ 1 default/manual · ⚙️ 0 auto.

| Aspect | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| `size scale` | `unit` | ✅ Native | Distinct heading / display sizes from the source |
| `weight` | `select` | ✅ Native | Measured font-weight per role |
| `line-height` | `unit` | ✅ Native | Measured line-height |
| `letter-spacing` | `unit` | ✅ Native | Measured tracking |
| `eyebrow style` | `preset` | ✅ Native | The small uppercase label pattern when the source uses one |
| `colour` | `colour` | ⚪ Unmapped | Left to the palette / element |

← Back to [Components](./index.md)
