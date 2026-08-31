---
title: Icon
sidebar_position: 27
---

# Icon

A single icon, with an optional title and badge — from an icon font, an SVG, an image or an emoji.

The block renders through the [`icon`](/shortcodes/media-elements/icon) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `icon` | The icon itself |
| `title` | Optional text beneath it |
| `aria_label` | What a screen reader announces |
| `icon_size` | Icon size, with a unit |
| `icon_badge_preset` | Badge shape and style behind the icon |
| `icon_color` | Icon colour |
| `title_color` | Title colour |
| `bg_color` | Background |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[Set `aria_label` when there is no title]
An icon with no text is invisible to a screen reader — a lock icon that means "secure" conveys
nothing at all to someone who cannot see it.

That is why the field is in the sidebar rather than one surface away: the setting that fixes the
problem should not be harder to reach than the setting that creates it. With a `title` set, the icon
is decorative and the label can be left blank.
:::

:::note[A blank square in the editor means a missing icon pack]
The icon font is loaded into the canvas along with the element's stylesheet. If an icon renders as an
empty box here but fine on the front end, the pack it belongs to has not been loaded — not a broken
block.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
