---
title: Container
sidebar_position: 77
---

# Container

A width-constrained wrapper around other blocks — Section without the dividers and effects.

The block renders through the `container` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `is_fullwidth` | Run edge to edge |
| `min_height` | Minimum height |
| `column_halign` | Horizontal alignment of the columns |
| `column_valign` | Vertical alignment of the columns |
| `reverse_columns` | Reverse the column order |
| `background` | The full background stack |
| `background_pattern` | An overlaid pattern |
| `padding_top` | Space above |
| `padding_bottom` | Space below |
| `gap` | Space between columns |
| `gap_x` | Horizontal gap |
| `gap_y` | Vertical gap |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::caution[A container previews as an outline, not as itself]
Every other Unyson+ block previews with a server-rendered picture of the finished element. A container
cannot: its purpose is to hold **other blocks**, and those have to stay editable in place.

So the canvas shows a neutral dashed outline with the real, editable children inside — **not** the
element's background, padding, width or design preset. Those are applied by PHP on the front end.

That is deliberate. Approximating the wrapper's styling in JavaScript would be a second implementation
of the element's CSS, guaranteed to disagree with the first the moment either changes. An outline that
is honestly neutral beats a preview that is subtly wrong. Preview the page to see the real thing.
:::

:::note[The children reach PHP the same way the page builder's do]
`save()` stores the children's markup in post content, the render callback receives it as `$content`,
and the element renders it inside its wrapper with `do_shortcode()` — exactly as it does for a
container built in the page builder.
:::

:::note[Section or Container?]
Reach for Container when the band needs a width and a background and nothing else. Section adds shape
dividers, background effects and a design variant — worth its extra options only when you use them.
:::