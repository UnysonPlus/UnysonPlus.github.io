---
title: Divider
sidebar_position: 23
---

# Divider

A separator — a plain line, a line with an icon, a line with text, or a shape. Core has a Separator block; this is the one that can carry something.

The block renders through the [`divider`](/shortcodes/content-elements/divider) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `style` | What kind of divider, and the settings it needs |
| `width` | How wide the rule runs |
| `margin_top` | Space above |
| `margin_bottom` | Space below |
| `line_color` | Line colour |
| `icon_color` | Icon colour |
| `divider_text_color` | Text colour |
| `bg_color` | Background behind the divider |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`style` is a picker that reveals its own options]
It is a [`multi-picker`](/options/option-types/multi-picker): choosing an option reveals the
fields that belong to that choice, and **only the chosen branch's values are saved**. Switching
choices and switching back does not preserve what you typed in the branch you left — that is how the
option type has always behaved, and it is what keeps the saved value small.
:::

:::note[This block exposes its own margins, and that is on purpose]
Every other block leaves margin and padding to Gutenberg's Dimensions panel. For a divider, the space
around it *is* the element — it is most of what a divider is for — so `margin_top` and `margin_bottom`
are here, where people look for them.

The element's general `spacing` option is still omitted: core's Dimensions panel owns the block's
outer margin, while these two set the rule's own offsets.
:::

:::note[Width is relative to the container]
A divider set to 50% is half the width of whatever column it sits in. In the canvas that is the
block's own column, which may not be the width of the column it will finally live in — check it in a
page preview before adjusting.
:::
