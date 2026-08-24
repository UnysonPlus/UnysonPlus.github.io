---
title: Image Box — converter mapping
sidebar_label: Image Box
slug: /element-mapping/image-box
description: How the UnysonPlus Site Converter maps a source image_box into the Image Box (`image_box`) shortcode — the recognizer rule and a full option-by-option coverage table.
hide_table_of_contents: true
---

<!-- ⚠️ GENERATED FILE — do not edit by hand. Edit ai-dev-kit/_data/element-mapping.json, then run: node scripts/gen-element-mapping.mjs -->

# Image Box — converter mapping

Source `image_box` → [`image_box`](/docs/shortcodes/media-elements/image-box). This page shows the recognizer rule and **every**
option on the shortcode, with how the converter fills it — so you can see at a glance which options
are mapped, which are reproduced via CSS, and which are left for manual editing.

## Recognizer

| | |
| --- | --- |
| **Priority** | 58 |
| **Recognizer** | `image_box` |
| **Matches when** | An image paired with a title + text (a media card / feature block — image beside or above a heading and copy). |
| **Becomes** | [`image_box`](/docs/shortcodes/media-elements/image-box) |
| **Recognizer block shape** | `{ img:{ src, alt, cls }, card:{ title, titleTag, text, link } }` |
| **Fallback** | Degrades to `code_block`. |

The image (with its alt), the title + heading tag, and the body text map natively. Skin (frame, overlay, hover, colours, image side/ratio) is left at defaults.

## Option coverage

**5/23 options mapped natively** (22%) — 🟡 0 via CSS · ⚠️ 9 gaps (derivable, not yet) · ⚪ 9 default · ⚙️ 3 auto.

:::tip[9 derivable gaps]
The ⚠️ rows below are options a source realistically expresses that the converter doesn't derive **yet** — the real to-do list for improving this element's fidelity. The ⚪ default rows are intentional (no reliable signal, or a UnysonPlus-specific choice).
:::


| Option | Tab | Type | Status | Mapped from / note |
| --- | --- | --- | --- | --- |
| `image` | Content | `upload` | ✅ Native | The source image (side-loaded) |
| `image_alt` | Content | `text` | ✅ Native | Alt text from the source `<img>` |
| `title` | Content | `text` | ✅ Native | Card title |
| `title_tag` | Content | `select` | ✅ Native | Source heading tag |
| `text` | Content | `wp-editor` | ✅ Native | Card body text |
| `icon` | Content | `icon` | ⚠️ Gap | presence and class of an <i>/svg icon element inside the box |
| `button_label` | Content | `text` | ⚠️ Gap | text content of the box's button/anchor CTA |
| `image_style` | Styling | `image-style-picker` | ⚪ Unmapped | Not matched to an Image Style preset |
| `image_side` | Layout | `select` | ⚠️ Gap | DOM order / flex-direction of image vs text block (left/right/top) |
| `image_ratio` | Layout | `select` | ⚠️ Gap | computed width:height aspect-ratio of the image element |
| `frame` | Styling | `select` | ⚪ Unmapped | Default |
| `overlay` | Styling | `switch` | ⚠️ Gap | presence of a semi-transparent color layer stacked over the image |
| `hover_effect` | Styling | `select` | ⚪ Unmapped | Default |
| `box_style` | Styling | `select` | ⚪ Unmapped | Default |
| `title_color` | Styling | `color` | ⚠️ Gap | computed color of the title element |
| `content_color` | Styling | `color` | ⚠️ Gap | computed color of the body/description text |
| `bg_color` | Styling | `color` | ⚠️ Gap | computed background-color of the box container |
| `link_url` | Link | `text` | ⚠️ Gap | href of the wrapping/CTA anchor |
| `spacing` | Styling | `spacing` | ⚪ Unmapped | Default |
| `animation` | Animations | `group` | ⚪ Unmapped | Default off |
| `css_class` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `css_id` | Advanced | `text` | ⚪ Unmapped | Default empty |
| `custom_css` | Advanced | `textarea` | ⚪ Unmapped | Not populated |
| `unique_id` | Advanced | `hidden` | ⚙️ Auto | Generated |
| `responsive_hide` | Advanced | `group` | ⚙️ Auto | Not set |
| `custom_attrs` | Advanced | `group` | ⚙️ Auto | Not set |

### Status legend

- ✅ **Native** — Set as the native option from the source.
- 🟡 **Via CSS** — Reproduced via scoped CSS / the styler; the native option is left empty (candidate to promote to a native mapping).
- ⚠️ **Gap** — A source signal exists, but the converter does not derive this yet — a mapping worth adding (a real TODO, not a limitation).
- ⚪ **Unmapped** — Left at default — no reliable source signal, or an intentional/UnysonPlus-specific choice with nothing to translate.
- ⚙️ **Auto** — Plumbing (unique id, custom attrs). Excluded from the coverage percentage.

← Back to [Element Mapping](./index.md)
