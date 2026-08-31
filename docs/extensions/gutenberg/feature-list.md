---
title: Feature List
sidebar_position: 25
---

# Feature List

A list of features with icons or markers — what is included, what a plan covers, why to choose this one. One column or several.

The block renders through the [`feature_list`](/shortcodes/components/feature-list) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `items` | The features — marker, title and supporting text |
| `design` | List design preset |
| `orientation` | Vertical list or horizontal row |
| `icon_position` | Where the marker sits relative to the text |
| `icon_style` | What the marker is |
| `columns` | How many columns |
| `dividers` | Rules between items |
| `zebra` | Alternate row shading |
| `spacing_size` | Space between items |
| `box_style` | Box / border preset |
| `icon_badge_preset` | Badge behind an icon marker |
| `marker_color` | Marker colour |
| `marker_size` | Marker size, with a unit |
| `text_color` | Title colour |
| `sub_color` | Supporting-text colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`items` is a repeater]
It is an [`addable-popup`](/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::note[`marker_size` carries a unit]
It is a [`unit-input`](/options/option-types/unit-input): a number *and* a unit, where the number
half is stored as a string so an unset size stays distinguishable from a zero one. Clearing the field
means "use the design's own size", not "make it 0".
:::

:::note[Check `columns` in a page preview]
The canvas column is rarely the width of the column the list will finally sit in, so a three-column
list can look cramped in the editor and fine on the page, or the reverse.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
