---
title: Highlight Text
sidebar_position: 13
---

# Highlight Text

A run of text with an animated highlight drawn behind or under it — marker sweep, underline, circle and more. The usual alternative is a background colour on a `<span>`, which is not the same thing at all.

The block renders through the [`highlight_text`](/shortcodes/content-elements/highlight-text) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `prefix` | Static text before the highlighted run |
| `text` | The highlighted text |
| `suffix` | Static text after it |
| `tag` | Which element it renders as |
| `fx` | The highlight effect |
| `align` | Horizontal alignment |
| `text_color` | Text colour |
| `accent_color` | Highlight colour |
| `accent2_color` | Second highlight colour, for effects that use two |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The preview shows the finished highlight, not the draw-on]
The effect draws itself when it scrolls into view. The canvas shows the end state, which is what a
reader sees a moment after the text arrives — and, unlike the animation, it does not replay every
time you change an option.
:::

:::note[`accent2_color` only applies to some effects]
Effects that use a single colour ignore it. Setting it does no harm; it simply has nothing to
colour.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
