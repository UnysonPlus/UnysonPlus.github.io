---
title: Flexbox
---

# Flexbox

A flex container that arranges its blocks along an axis — the layout tool for a row of unequal things.

The block renders through the `flexbox` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `direction` | Row or column |
| `reverse` | Reverse the direction |
| `wrap` | Allow wrapping |
| `justify_content` | Distribution along the main axis |
| `align_items` | Alignment across the cross axis |
| `align_content` | Alignment of wrapped lines |
| `align_self` | Override alignment for this box |
| `order` | Order among its siblings |
| `flex_grow` | How it grows to fill space |
| `gap` | Space between children |
| `width` | Width |
| `min_height` | Minimum height |
| `background` | The full background stack |
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

:::caution[This is the container the canvas shows least]
`direction`, `justify_content` and `align_items` are exactly what an outline cannot convey — the
children are laid out by the **editor**, not by the element's flex CSS.

Everything here is real on the front end and invisible in the canvas, so this is the block where
previewing the page matters most.
:::