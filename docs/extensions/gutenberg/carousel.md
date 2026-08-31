---
title: Carousel
sidebar_position: 24
---

# Carousel

A slider of image or content slides, with arrows, dots, autoplay and per-breakpoint slide counts.

The block renders through the [`carousel`](/shortcodes/interactive-elements/carousel) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `slides` | The slides — image, heading, text and link |
| `per_page` | Slides visible at once on desktop |
| `per_page_tablet` | Slides visible on tablet |
| `per_page_mobile` | Slides visible on mobile |
| `gap` | Space between slides |
| `height` | Fixed slide height, if you want one |
| `arrows` | Show previous / next arrows |
| `pagination` | Show the dots |
| `autoplay` | Advance by itself |
| `interval` | How long each slide is held |
| `speed` | Transition duration |
| `pause_hover` | Pause autoplay while hovered |
| `loop` | Wrap around at the ends |
| `drag` | Allow dragging / swiping |
| `effect` | Slide or fade |
| `overlay` | Darken slides behind their text |
| `overlay_opacity` | How dark that overlay is |
| `heading_color` | Slide heading colour |
| `text_color` | Slide text colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`slides` is a repeater]
It is an [`addable-popup`](/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::note[The carousel does not move in the canvas]
It shows the first slide, held, and dragging does not scroll it. Both would collide with the editor's
own gestures for selecting and moving a block — and holding it still means an option change does not
restart a rotation you were half-way through watching.
:::

:::caution[Set all three `per_page` values, not just the desktop one]
They are one responsive decision in three parts. A carousel that shows four slides on a phone because
only `per_page` was set is exactly the failure the tablet and mobile values exist to prevent — and it
is not visible in a desktop-width canvas.
:::

:::note[`pause_hover` does nothing without `autoplay`]
There is nothing to pause on a carousel that only moves when the visitor moves it.
:::
