---
title: Section
---

# Section

A full-width band that holds other blocks — the outermost layer of most pages, with backgrounds, shape dividers and effects.

The block renders through the `section` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `variant` | Section design variant |
| `is_fullwidth` | Run edge to edge |
| `container_width` | Inner content width |
| `min_height` | Minimum height |
| `column_halign` | Horizontal alignment of the columns |
| `column_valign` | Vertical alignment of the columns |
| `reverse_columns` | Reverse the column order |
| `background` | The full background stack |
| `background_pattern` | An overlaid pattern |
| `bg_effect` | A background effect |
| `divider_top` | Shape divider at the top |
| `divider_bottom` | Shape divider at the bottom |
| `text_align` | Text alignment |
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

:::note[`background` is five layers in one option]
It is a [`background-pro`](/options/option-types/background-pro) value: colour, gradient, image,
video and overlay, stacked. A layer is on when it has a value — there is no enable switch.
:::