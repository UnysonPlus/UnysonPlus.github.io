---
title: Masonry Section
sidebar_position: 80
---

# Masonry Section

A section whose blocks flow into a staggered, Pinterest-style layout.

The block renders through the `masonry_section` element — the same PHP that runs in the page builder, so the front
end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `gap` | Space between items |
| `is_fullwidth` | Run edge to edge |
| `background` | The full background stack |
| `padding_top` | Space above |
| `padding_bottom` | Space below |

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

:::caution[The canvas arrangement is not the front-end arrangement]
Masonry positions are computed from the **rendered heights of real content**, which the editor's own
layout does not reproduce — the canvas simply stacks the children.

That is a difference by nature rather than by omission: no editor preview can place masonry items
without rendering them exactly as the front end does.
:::

:::note[`masonry_info` is not a setting]
It is an explanatory panel for the page builder's options modal, so it does not appear here.
:::