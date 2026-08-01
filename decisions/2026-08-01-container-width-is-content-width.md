---
slug: container-width-is-content-width
title: "Container Width means CONTENT width, not the outer box (gutter lives outside)"
authors: [jon]
tags: [architecture, back-compat]
date: 2026-08-01
description: "The theme's .fw-container put its left/right gutter INSIDE the max-width (Bootstrap's model), so a 'Container Width = 1280' setting rendered only ~1216px of content. Designers — and the Site Converter translating Tailwind's max-w-7xl — expect the number to be the content width. We moved the gutter outside the max-width (max-width: calc(width + 2*gutter)), so the setting now yields exactly that much content."
---

**The question:** the theme's **Container Width** setting (Theme Settings → General → Layout) drives
`.fw-container { max-width: … }`. But the container also carries a left/right **gutter** as padding, and
with `box-sizing: border-box` that padding is *inside* the max-width — so setting the width to **1280**
(to match a source's `max-w-7xl`) rendered only **~1216px** of actual content. Should "Container Width"
mean the **outer box** (Bootstrap's model, current) or the **content** width (Tailwind's model, expected)?

<!-- truncate -->

## Context

It surfaced converting a Wegic site whose sections use `max-w-7xl mx-auto px-8` — `max-w-7xl` (1280px) is
the **content** width, and `px-8` sits *outside* it. Our importer set Container Width = 1280 to match, but
the rebuilt section came out ~64px narrower than the source, and every element inside inherited the deficit.
Measuring confirmed it: a 1280 setting produced 1216 of content (1280 − 2×32px gutter).

The mismatch is conceptual: **Bootstrap's `.container` max-width is the outer edge** (content = max-width −
padding), whereas **Tailwind's `max-w-*` is the content edge** (padding is a separate, outer concern).
Modern design tools and anyone thinking "my content is 1280 wide" mean the Tailwind sense. So the setting's
label promised one thing and delivered another, and it made every converted site subtly too narrow.

## Options considered

- **Leave it (Bootstrap model), document that Container Width is the outer box.** Zero change, but the
  setting stays counter-intuitive and the Site Converter has to *compensate* (set width = source + gutter)
  on every conversion — a permanent band-aid that hides the real content width from the user.
- **`box-sizing: content-box` on the container.** Makes max-width the content width, but content-box is a
  surprising, bug-prone exception to the global `border-box` and can trip up nested padding math.
- **Add the gutter to the max-width — `max-width: calc(var(--container-max-desktop) + 2*var(--container-gutter))`.**
  Keeps `border-box`; the content ends up exactly the value set, and the gutter only shrinks it once the
  viewport is narrower than `width + 2·gutter` — precisely `max-w-7xl mx-auto px-8` behaviour.

## Decision

**Container Width is the CONTENT width; the gutter lives outside it.** The desktop and tablet
`.fw-container` / `.container` rules now use
`max-width: calc(var(--container-max-desktop, 1170px) + 2 * var(--container-gutter, clamp(1.25rem, 3vw, 2rem)))`
(and the tablet equivalent). The fluid / mobile-100% cases were already correct. So a 1280 setting renders
1280 of content, matching the source.

## Why

The setting should mean what it says. "Container Width" reads as *how wide my content is*, and every design
reference (Figma frames, Tailwind `max-w-*`, "my site is 1280 wide") uses that sense — so the converter can
translate `max-w-7xl → 1280` directly and the result matches, with no compensation layer. Adding the gutter
to the max-width (rather than content-box) keeps the global `border-box` invariant intact and is a one-line,
token-driven change.

**Status: Accepted.** Trade-off recorded: existing sites' content widens by up to 2·gutter (~64px) — e.g.
the 1170 default goes from ~1106 → 1170 of content. That's a one-time global shift, but it's the *correct*
width the setting always implied, so it's a fix rather than a regression.
