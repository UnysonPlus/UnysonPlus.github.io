---
title: Button
sidebar_position: 55
---

# Button

A link button — presets, sizes, shapes, icons and hover effects. Core has a Buttons block; this one uses your theme's button presets, so it matches everything else on the site.

The block renders through the [`button`](/docs/shortcodes/components/button) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `label` | Button text |
| `link` | Where it goes |
| `target` | Open in a new tab |
| `icon` | An optional icon |
| `icon_position` | Which side the icon sits on |
| `style` | Button preset |
| `size` | Button size |
| `shape` | Corner shape |
| `width` | Auto, full or a set width |
| `alignment` | Horizontal alignment |
| `state` | Normal, disabled or loading |
| `hover_animation` | What happens on hover |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The pickers show real buttons]
`style`, `size` and `hover_animation` render **actual buttons** in the sidebar, carrying the preset
classes — not colour swatches or names. That works because the generated preset CSS is enqueued in
wp-admin, and the hover-effect stylesheet is linked by its own control.

Hover a row in **Hover Animation** to see the effect; a hover effect has no resting appearance, which
is what makes it a hover effect.
:::

:::note[The preview is inert]
Clicking selects the block rather than following `link`, and the hover animation is not played — the
pointer has to land on the block to select it, so a live effect would fire constantly while you work.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
