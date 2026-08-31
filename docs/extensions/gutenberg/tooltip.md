---
title: Tooltip
sidebar_position: 14
---

# Tooltip

Text or an icon that reveals a tooltip on hover, focus or click — for definitions, footnotes and the small print that would otherwise interrupt a sentence.

The block renders through the [`tooltip`](/shortcodes/interactive-elements/tooltip) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `trigger_type` | What carries the tooltip — text or an icon |
| `trigger_text` | The visible text |
| `trigger_icon` | The icon, for icon triggers |
| `tip_title` | Optional heading inside the tip |
| `tip_content` | The tip body |
| `design` | Tip design preset |
| `position` | Which side the tip appears on |
| `event` | What reveals it — hover, click or focus |
| `arrow` | Show the little pointer |
| `max_width` | Maximum tip width |
| `tip_bg` | Tip background |
| `tip_color` | Tip text colour |
| `accent_color` | Trigger accent colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The canvas shows the trigger, not the tip]
The tooltip markup is rendered but stays hidden, exactly as it is on a real page before anyone
hovers. To check the tip's wording and where it sits, preview the page.

A live preview would be worse than no preview here: with `event` set to hover, the tip would open
every time the pointer crossed the block on its way to something else.
:::

:::caution[`position` is a preference, not a guarantee]
A tip placed on a side with no room flips to the opposite side so it stays on screen. That is
deliberate, and it means a tip near the edge of a narrow column may not appear where you set it —
check it at the width your visitors actually use.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
