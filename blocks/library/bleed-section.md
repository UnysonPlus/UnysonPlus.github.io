---
title: Bleed Section
---

# Bleed Section

A section with an image bleeding off one edge and content on the other — the split hero.

The block renders through the `bleed_section` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `bleed_image` | The bleeding image |
| `bleed_image_alt` | Alt text for it |
| `bleed_image_side` | Which edge it bleeds off |
| `bleed_image_ratio` | How much width it takes |
| `bleed_image_position` | How the image is anchored |
| `bleed_image_lazy` | Lazy-load it |
| `bleed_mobile_stacking` | Which comes first once stacked |
| `bleed_min_height` | Minimum height |
| `is_fullwidth` | Run edge to edge |
| `background` | The full background stack |
| `bleed_overlay_color` | Tint over the image |
| `bleed_overlay_opacity` | How strong that tint is |
| `bleed_vertical_align` | Vertical alignment of the content |
| `bleed_content_padding` | Padding around the content |

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

:::caution[`bleed_mobile_stacking` is invisible until it matters]
Once the image and content stack, one of them comes first — and the default is not always the one you
want. A section whose text introduces its image reads backwards if the image lands on top.

Set it deliberately, then check it narrow.
:::

:::note[The bleed image is not drawn in the canvas]
Only the editable content side appears, inside the outline. `bleed_image_alt` sits beside the image
for the same reason Image Box's does: alt text written when the image is chosen is alt text that gets
written.
:::