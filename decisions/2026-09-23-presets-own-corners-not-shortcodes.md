---
slug: presets-own-corners-not-shortcodes
title: "Why the Image Box and Gallery stopped rounding their own corners"
authors: [jon]
tags: [shortcodes, color, back-compat, architecture]
date: 2026-09-23
description: "Both elements shipped a 6px corner radius baked into their base stylesheet. Because the Image Style preset renders inside the element's own frame, a preset with sharp corners could never remove it — larger radii showed, zero was silently overruled. The decision: the base is square and the preset owns the corners."
---

**The question:** The Image Box media frame draws a ~6px radius that a converted source does not have, and DevTools shows it coming from the element's own `.imgbox__media { border-radius: var(--imgbox-radius) }`. We already have an Image Style preset that carries corners. Should the shortcode just stop setting a radius?

<!-- truncate -->

## Context

Two elements were involved, and they failed the same way for slightly different reasons.

The **Image Box** wraps the Image Style preset *inside* its media frame:

```html
<div class="imgbox__media">          <!-- overflow:hidden; border-radius:6px -->
  <span class="imgs-wrap imgs-soft"> <!-- the preset: --imgs-radius -->
    <img …>
```

The preset's corners live on the inner `.imgs-wrap`. The outer frame clips at its own 6px regardless, so a preset asking for **square** corners was invisible: the frame still rounded the image. A preset asking for *bigger* corners worked, which is why this went unnoticed — the default only ever lost the argument in one direction.

The **Gallery** had the same default plus a second bug: its `rounded` value was an att the view read but the options never *declared*. The builder drops undeclared atts on save, so even data that said "square" rendered rounded, and the converter's own attempts to set it went nowhere.

## Options considered

**Keep the default and special-case the preset.** Teach the frame to drop its radius when a preset is present. It fixes the visible symptom, but it leaves two places that both believe they own corners, and the next element with an inner preset repeats the bug.

**Make the default configurable but non-zero.** A "Corners" option defaulting to 6px preserves today's look and gives users an escape hatch. It keeps a shortcode-level default fighting a preset-level one; a converted site still starts wrong, just fixably so.

**Make the base square and let the preset own corners.** One owner. The shortcode ships neutral; anything rounded is a deliberate, reusable choice stored in a preset (or, for the Gallery, a declared per-instance option that stands down when a preset is applied).

## Decision

The base is square. `--imgbox-radius` defaults to `0`, and the Gallery gained a real **Corners** option (Square · Rounded 6px · Rounded large 12px) that is ignored whenever an Image Style preset is set. The variable stays defined, so the `card` and `badge` designs — and any theme's Custom CSS — can still opt in.

## Why

A default that a preset cannot override is not a default; it is a hard-coded style wearing a variable's clothes. The test we kept coming back to is whether a user who picks "sharp corners" can actually get sharp corners, and before this they could not — from the UI, from a preset, or from the converter.

Square is also the honest neutral. A 6px radius is a design opinion, and the element applied it to every image on every site whether the design called for it or not; a converted source with sharp-edged photography came out subtly wrong everywhere, and the fix each time was per-element CSS that then outranked any later preset edit.

The cost is real and we took it deliberately: existing sites that relied on the implicit rounding lose it on update. It is one preset (or one Corners pick) to restore, it is recorded in the changelog as a behaviour change, and it buys a rule that now holds everywhere — **presets own the skin, elements own their structure**, the same rule that already governs button and box styling on converted sites.
