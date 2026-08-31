---
title: Before / After
sidebar_position: 6
---

# Before / After

An image comparison slider — drag, hover or click to reveal the second image. Useful for retouching, renovations and product comparisons.

The block renders through the [`before_after`](/shortcodes/media-elements/before-after) element — the same PHP that runs in the page builder, so
the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `before_image` | The base image |
| `after_image` | The revealed image — use the same dimensions |
| `type/comparison/design` | Handle and label look |
| `type/comparison/orientation` | Split horizontally or vertically |
| `type/comparison/interaction` | Drag, hover or click to reveal |
| `type/comparison/handle_size` | Size of the drag handle |
| `type/comparison/show_labels` | Show the Before / After labels |
| `type/comparison/auto_intro` | Sweep the handle once on first view |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[Both images are required]
Until a Before and an After image are set, the block shows a placeholder rather than a broken
slider.
:::

:::caution[The preview is inert, and must be]
Left interactive, the slider's own pointer handlers would swallow the click that selects the block,
and dragging the handle would become a Gutenberg **block** drag — the element and the editor
fighting over the same gesture. The slider works normally on the front end.
:::

:::note[Option paths look different here]
This block's options are nested (`type/comparison/design`) rather than flat. That mirrors how the
element stores them; the block reads and writes the same paths, so values are shared with the page
builder either way.
:::
