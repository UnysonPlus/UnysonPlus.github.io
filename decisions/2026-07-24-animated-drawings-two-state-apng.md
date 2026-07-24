---
slug: animated-drawings-two-state-apng
title: "Animated hand-drawn accents: two-state APNG (in → idle) with a cache-bust restart, not SVG"
authors: [jon]
tags: [architecture, javascript]
date: 2026-07-24
description: "poly.app animates its hand-drawn hero underline — it draws itself on when the hero appears, then settles into a subtle idle wave. Inspecting the source, poly does NOT use an animated SVG stroke; it ships TWO animated PNGs per drawing — a '…in.png' (the draw-on intro, played once) and a '…default.png' (the idle loop, always playing) — layered as two <img>s and toggled by JS. We matched that technique in the Poly demo: the idle APNG is the CSS background (so every underline subtly waves), and a tiny registry-driven runtime plays the intro APNG once when an element enters view — appending a fresh ?t=<now> to force the animated PNG to restart from frame 0 — then clears the inline style to hand back to the CSS idle loop. This documents the algorithm and why the cache-bust is the crux."
---

**The question:** poly.app's hero underline is a hand-drawn scribble that *draws itself on* when the
hero appears and then *idly waves*. How is that built, and how do we reproduce it — an animated SVG
path (stroke-dashoffset draw-on) or something else?

<!-- truncate -->

## Context

Inspecting poly's markup, the underline is not an SVG at all. It is two **animated PNGs (APNG)**
layered in a wrapper:

```html
<div class="relative">
  <img class="in-img … invisible" data-id="in-hero underline"   src="…/hero underline in.png">
  <img class="idle-img …"         data-id="idle-hero underline" src="…/hero underline default.png">
</div>
```

So poly authors each hand-drawn accent as a short **draw-on** clip (`…in.png`) and a looping
**idle** clip (`…default.png`), both exported as APNG, and a little JS toggles between the two
`<img>`s: the intro plays once when the section enters, then the idle loop takes over. Both files
carry an `acTL` chunk (confirmed) — they are genuinely animated PNGs, ~600×45.

Why APNG and not SVG here: these are *irregular, textured, multi-stroke doodles* (a double scribble
with pencil grain). Reproducing that as an SVG stroke-draw would mean hand-tracing paths and would
still miss the texture. A designer can draw and export the two clips directly; the web just plays
them. It's the right tool for hand-drawn assets.

## The reproduction algorithm (and the one non-obvious part)

We matched poly in the demo, but adapted to our CSS-background underline instead of two `<img>`s:

1. **Idle = the CSS background.** `…-idle.png` (the looping APNG) is set as the `<em>` underline's
   `background-image`, so every emphasized word subtly waves with no JS at all.
2. **Intro = a JS swap on enter.** A tiny registry-driven runtime (`[selector, name, ms]` rows)
   watches each registered element with an IntersectionObserver; on first enter it sets the
   background to `…-in.png`, then after the intro length clears the inline style so it hands back to
   the CSS idle loop.
3. **The crux — restart via a cache-bust query string.** An APNG plays once when it is first
   decoded and then holds its last frame; there is **no DOM API to rewind it**. To make the intro
   play *on enter* (not merely on page load), we append `?t=<Date.now()>` to the `…-in.png` URL, which
   the browser treats as a new resource and decodes fresh — restarting the animation from frame 0.
   Without that query string the draw-on would only ever fire once, on load, off-screen.

## Options considered

- **Animated SVG (stroke-dashoffset draw-on)** — clean and tiny, but can't reproduce a textured
  multi-stroke doodle without hand-tracing, and still looks like a vector line, not a pencil.
- **A single static PNG** (what the demo had) — no animation at all; the accent read as flat.
- **Two-state APNG (in → idle), poly's own approach** — chosen. Matches poly exactly, keeps the
  hand-drawn texture, and stays authorable by a designer (draw two clips, export APNG).

## Decision

Use **two APNGs per hand-drawn accent** — an idle loop set as the CSS background, and an intro
draw-on played once on enter via a cache-busted URL swap — then hand back to the idle loop. Keep the
intro list in a small registry so more drawings are one line each.

## Why

It reproduces poly's effect faithfully (texture and all), it is authorable from design tools rather
than hand-coded paths, and the whole runtime is a dozen lines. The single insight that makes it work
is that **an APNG restarts only when re-fetched**, so the enter-triggered draw-on hinges on the
cache-bust query string — the rest is just an IntersectionObserver and a timeout. If this graduates
from the demo into a framework feature (an "animated drawing" element), this is the mechanism to
generalize.
