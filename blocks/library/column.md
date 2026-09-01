---
title: Column
---

# Column

A column inside a row, with a responsive width and its own content alignment.

The block renders through the `column` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `col_width` | Width, per breakpoint |
| `max_width` | Maximum width |
| `col_offset` | Offset from the left |
| `content_h` | Horizontal alignment of the content |
| `content_v` | Vertical alignment of the content |
| `content_direction` | Stack direction |
| `content_gap` | Space between the contents |
| `content_order` | Order among its siblings |
| `mobile_order` | Order once stacked |
| `full_height` | Fill the row height |
| `align_self` | Override the row alignment for this column |
| `text_align` | Text alignment |
| `bg_color` | Background |
| `border_preset` | Border preset |

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

:::caution[Width is the one thing the outline cannot show]
`col_width` is the whole point of a column, and the canvas draws every container at full width. Check
the layout in a page preview rather than in the editor.

A block placed on its own, outside a row, renders **full width** — the page builder normally supplies
a column's width from the row it sits in, and a block has no row.
:::

:::note[`col_width` and its siblings are responsive]
They are [`responsive`](/options/option-types/responsive) options: one value per breakpoint,
edited through the device tabs. A blank device inherits the smaller one — where the inner control
offers a blank choice, which these do.
:::