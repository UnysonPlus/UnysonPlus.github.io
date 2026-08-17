---
title: Counter
sidebar_position: 5
---

# Counter

An animated number that counts up when it scrolls into view — for stats, milestones and results.

The block renders through the [`counter`](/docs/shortcodes/interactive-elements/counter) element — the same PHP that runs in the page builder, so
the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `number` | The value to count up to |
| `start` | The value the count begins at |
| `prefix` | Text before the number, e.g. `$` |
| `suffix` | Text after the number, e.g. `+` or `%` |
| `decimals` | Digits after the decimal point |
| `separator` | Insert thousands separators |
| `duration` | Animation length in milliseconds |
| `easing` | Count-up easing curve |
| `alignment` | Horizontal alignment |
| `number_font` | Typography for the number |
| `number_color` | Number colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The preview shows the final number, not the animation]
The canvas preview is deliberately static and shows the **target** value. Replaying the count-up
would reset it to the start value every time the editor scrolled the block into view, which reads as
the preview flickering while you work. Visitors see the animation.
:::
