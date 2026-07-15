---
slug: testimonial-ratings-inline-svg
title: "Why testimonial ratings render as inline SVG, not Font Awesome"
authors: [jon]
tags: [shortcodes, architecture]
date: 2026-07-15
description: Testimonial star ratings rendered as empty boxes on a live site because the theme didn't load Font Awesome. The choice was to enqueue Font Awesome (a webfont dependency) or render the stars as self-contained inline SVG. We switched to inline SVG so ratings render on any theme, and dropped the Font Awesome dependency from the shortcode entirely.
---

**The question:** The testimonial rating stars showed up as tofu (□□□□□) on a live site. Do we enqueue
Font Awesome so the `fa-star` glyphs resolve, or render the stars some other way that doesn't depend on a
webfont being present?

<!-- truncate -->

## Context

The rating renderer emitted `<i class="fa-solid fa-star">` and relied on a `font-awesome` style handle as an
enqueue dependency. But that dependency is a no-op if the theme never registers/enqueues Font Awesome — which
the live theme didn't — so the icon font wasn't there and the glyphs fell back to missing-character boxes.
The plugin's stated philosophy is self-contained, no-Bootstrap, theme-agnostic output; a hard dependency on a
webfont the theme may not ship runs against that.

## Options considered

- **Enqueue Font Awesome from the shortcode.** Makes the current markup work, but pulls a whole icon webfont
  onto the page for five stars, and bakes in a dependency other themes may already load (duplicated) or may
  not want at all.
- **Inline SVG stars.** Render each star as a small inline `<svg>` — filled for full, a 50% linear-gradient
  for half, outline for empty — coloured via `currentColor`. Self-contained, no external font, works on any
  theme, and styleable from the shortcode's own CSS.

## Decision

**Inline SVG.** `sc_render_rating()` now emits inline SVG stars (full / half / empty) coloured with
`currentColor`, and the `font-awesome` dependency was removed from the shortcode's enqueue.

## Why

The bug was a symptom of the real problem — depending on an asset we don't control. Inline SVG removes the
dependency instead of trying to satisfy it: no webfont request, correct rendering regardless of the active
theme, and full control over the half-star (a gradient fill) that an icon font gives only as a fixed glyph.
It's a handful of bytes per card, matches the plugin's self-contained philosophy, and means "ratings look
right everywhere" is true by construction rather than contingent on the theme.
