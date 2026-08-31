---
title: Flip Box
sidebar_position: 73
---

# Flip Box

A card with two faces that flips on hover or click — a feature on the front, the detail on the back.

The block renders through the [`flip_box`](/shortcodes/interactive-elements/flip-box) element —
the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `front_icon` | Icon on the front face |
| `front_title` | Front heading |
| `front_title_tag` | Its heading level |
| `front_text` | Front body copy |
| `front_button_label` | A label on the front, if you want one |
| `back_icon` | Icon on the back face |
| `back_title` | Back heading |
| `back_title_tag` | Its heading level |
| `back_text` | Back body copy |
| `button_label` | Button on the back |
| `button_url` | Where it goes |
| `button_target` | Open in a new tab |
| `design_settings` | Design family, and the settings it needs |
| `flip_direction` | Which way it turns |
| `trigger` | Hover or click |
| `parallax` | Slight parallax as it turns |
| `flip_speed` | How fast |
| `flip_easing` | The easing curve |
| `height` | Card height |
| `rounded` | Corner rounding |
| `box_style` | Box / border preset |
| `icon_badge_preset` | Badge behind an icon |
| `front_bg` / `back_bg` | Face backgrounds |
| `front_image` / `back_image` | Face background images |
| `front_color` / `back_color` | Face text colours |
| `button_style` | Button preset |
| `button_size` | Button size |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::caution[Set `height` — both faces share one box]
The card is a single box showing one face at a time, so it is as tall as its **longer** face. Leave
the height unset and a short front sits in a card sized by the back, with a gap under the text that
appears for no visible reason.
:::

:::note[The canvas shows the front, and does not flip]
With `trigger` set to hover, a live preview would flip every time the pointer crossed the block on
its way to something else — and the back would be showing exactly when you clicked to select it.

Both faces are edited in the sidebar regardless of which one the canvas shows.
:::

:::note[`design_settings` is a popover]
It is a [`popover`](/options/option-types/popover): its inner options are rendered inline here
rather than in a floating panel, and stored exactly as the page builder stores them.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so use the Dimensions panel at the top of the sidebar.
:::
