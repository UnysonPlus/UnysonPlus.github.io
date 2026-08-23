---
title: Text Styles — converter mapping
sidebar_label: Text Styles
slug: /theme-settings-mapping/components/text-styles
description: How the UnysonPlus Site Converter derives the Text Styles preset library in Theme Settings → Components from a source design — every field, with coverage.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/theme-settings-mapping.json, then run: node scripts/gen-theme-settings-mapping.mjs -->

# Text Styles — converter mapping

**Theme Settings → Components → Text Styles** · ✅ Populated

A Text Style is a named, reusable typographic token — a size **plus** optional weight / line-height / letter-spacing / transform / colour, every field opt-in (a blank field inherits the element’s own tag). The converter distils the source’s heading + paragraph scale into a set of named styles — **Display 1…N**, **Lead**, body **buckets**, and an **Eyebrow** — each becoming a `.font-{slug}` utility. This is where the source’s type *scale* lands (not the Typography tab’s per-heading overrides).

Full reference: **[Text Styles](/theme/components/text-styles)** (how it’s coded + examples).

## Where it lives

| | |
| --- | --- |
| **Option schema** | `framework/extensions/shortcodes/includes/theme-settings/components-typography.php` |
| **Converter method** | `FW_Site_Converter_Stitch::build_text_styles()` |
| **Storage key** | `font_sizes` |
| **Produces** | a `.font-{slug}` (or your literal Class) per style — offered in every shortcode’s Styling → Text Style dropdown |

The converter measures the computed styles (`data-sc-cs`) of the source’s real h1–h6 and paragraphs, clusters them by size (largest first), and emits the distinct roles: **Display 1…N** (the big headings), **Lead** (the intro paragraph), body-size **buckets**, and an **Eyebrow** (the small uppercase label → `.font-eyebrow`). Stored under the legacy `font_sizes` key for wiring compatibility.

## Coverage

**7/8 fields derived from the source** (88%) — 🟡 0 via CSS · ⚪ 1 default/manual · ⚙️ 1 auto.

| Group / field | Type | Status | Derived from / note |
| --- | --- | --- | --- |
| **Style (`font_sizes` box)** | | | |
| `name` | `text` | ✅ Native | The role name shown in the dropdown — Display 1…N / Lead / (body bucket) / Eyebrow |
| `size` | `unit-input` | ✅ Native | The measured size for that role (largest headings first) |
| `weight` | `select` | ✅ Native | Measured font-weight; `400` is left blank (inherit the tag) |
| `line_height` | `text` | ✅ Native | Measured line-height (unitless or length) |
| `letter_spacing` | `unit-input` | ✅ Native | Measured tracking (em / px) |
| `transform` | `select` | ✅ Native | Only the **Eyebrow** gets `uppercase`; other roles inherit |
| `color` | `compact color` | ✅ Native | Carried **only** when it isn’t near-black/white |
| `class` | `text` | ⚙️ Auto | Auto `.font-{slug}` (or `display-1` / `lead` / `font-eyebrow`) — the output utility class |
| `custom_css` | `textarea (`selector`)` | ⚪ Unmapped | Not derived — add text-shadow / gradient-text etc. by hand |

:::note[Every field is opt-in — blank inherits]
A Text Style emits **only** the fields that are filled, scoped to its own class, so a blank property inherits from the element’s tag token (a blank weight is **not** thin — it keeps the heading’s weight). The converter follows the same rule: a measured weight of `400` is left **blank** (inherit), and a colour is carried **only** when it isn’t near-black/white — so a converted style overrides just what actually deviates from the source’s tag defaults.
:::

### Status legend

- ✅ **Native** — Derived and written from a source signal.
- 🟡 **Via CSS** — Reproduced via generated CSS; the native option is left empty (candidate to promote).
- ⚪ **Unmapped** — Left at default — no source signal, or set by hand.
- ⚙️ **Auto** — Plumbing. Excluded from the coverage percentage.

← Back to [Components](./index.md)
