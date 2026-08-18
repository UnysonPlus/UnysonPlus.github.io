---
title: Image Sequence
sidebar_position: 50
---

# Image Sequence

A frame-by-frame image sequence scrubbed by scroll — a product spinning, a device unfolding, a process stepping through. The effect that made Apple product pages famous.

The block renders through the `image_sequence` element — the same PHP that runs in the page builder, so the front
end is identical either way.

:::caution[Needs the Animation Engine extension]
This element ships with the **Animation Engine**, which is **inactive by default**. Activate it under
*Unyson+ → Extensions* and the block appears in the inserter.

With the extension off the block does not register at all — deliberately, so it cannot appear as an
entry with an empty sidebar that renders nothing.
:::

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `frames_source` | Where the frames come from, and which ones |
| `mode` | How scroll maps to frames |
| `pin_length` | How much page scroll the sequence consumes |
| `direction` | Play forwards or backwards |
| `fit` | How frames fill the frame |
| `height` | Viewport height while pinned |
| `bg` | Background behind the frames |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`frames_source` is a picker]
It is a [`multi-picker`](/docs/options/option-types/multi-picker): a numbered URL pattern and a
media-library selection need genuinely different fields, and only the chosen branch is saved.
:::

:::caution[`pin_length` is the setting most worth testing on a phone]
It decides how much page scroll the sequence eats before the page moves on. A value that feels
cinematic on a desktop can make a phone feel stuck — the visitor scrolls, and nothing happens except
frames.

Tune it against the real page, at the width your visitors actually use.
:::

:::note[The canvas shows the first frame, unpinned]
This element is scroll-**driven**, not merely scroll-triggered: the frame shown is a function of
scroll position, and it pins the viewport while it plays. Live in the editor, that would hijack the
editor's own scrolling — you would lose the ability to scroll past the block.
:::
