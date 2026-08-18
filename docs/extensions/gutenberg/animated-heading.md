---
title: Animated Heading
sidebar_position: 10
---

# Animated Heading

A heading with static text and a run of words that rotate through a list — typewriter, slide, flip
and a dozen more. The usual way to get this in Gutenberg is a plugin that ships its own typing
library; here it is the element you already have.

The block renders through the [`animated_heading`](/docs/shortcodes/content-elements/animated-heading)
element — the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `before_text` | Static text before the rotating words |
| `words` | The rotating words — **one per line** |
| `after_text` | Static text after the rotating words |
| `tag` | Which heading level it renders as (`h1`…`h6`, `p`, `div`) |
| `anim` | The rotation animation |
| `speed` | How fast it cycles |
| `highlight` | How the rotating word is set apart — accent colour, underline, marker |
| `loop` | Rotate forever, or stop after one pass |
| `pause_hover` | Pause the rotation while the pointer is over it |
| `randomize` | Shuffle the word order rather than cycling in sequence |
| `caret_show` | Show the typing caret |
| `caret_style` | Caret shape — bar, block, underscore |
| `caret_color` | Caret colour (blank inherits the text colour) |
| `align` | Horizontal alignment |
| `text_color` | Text colour |
| `accent_color` | Highlight colour for the rotating word |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[Margin and padding come from Gutenberg, not the element]
The block declares core spacing support, so margin and padding are edited by Gutenberg's own controls
at the top of the sidebar. The element's own `spacing` option is deliberately **not** exposed, because
two controls for one thing in one sidebar — writing to two different places — is how a heading ends up
with spacing nobody can find the source of.
:::

:::note[The preview does not rotate, on purpose]
The canvas shows the first word, held. A headline that retyped itself every few seconds would move
while you were reading the sidebar, and because every option change re-renders the preview, the
animation would restart from the beginning each time — which reads as the editor stuttering rather
than as a preview of anything. Visitors see the full rotation.
:::

:::caution[Do not stack a Text Effect on top of it]
This element runs its own rotation and does not need the Animation Engine. If you also apply an
Animation Engine **Text Effect** to it, the two animate the same characters and fight. Use one or the
other: this block for a rotating headline, a Text Effect for animating any other text.
:::
