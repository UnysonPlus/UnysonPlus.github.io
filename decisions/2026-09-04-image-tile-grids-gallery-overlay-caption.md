---
slug: image-tile-grids-gallery-overlay-caption
title: "Why image-tile grids (a caption pinned over each photo) convert to the Gallery, with a new always-visible overlay caption mode"
authors: [jon]
tags: [conversion, shortcodes]
date: 2026-09-04
description: "A very common section shape is a grid of photo tiles, each with a title pinned to the bottom over a gradient scrim and a hover zoom (jukeboxburgers.com's 'Our Food Speaks For Itself' — Chicken & Waffles, Juicy Burgers, Monster Shakes, Mac & Cheese). The converter already mapped these to the Gallery shortcode and reproduced the grid, rounded corners and hover-zoom — but dropped the per-tile captions, because the Gallery only offered 'caption on hover' or 'caption below', not an always-visible overlay. The decision was which shortcode is right and how to reach 100%: keep the Gallery (it owns grid/zoom/lightbox/responsive columns) and ADD an 'Overlay (Always Visible)' caption mode, then teach the converter to detect the pattern and carry each tile's caption inline."
---

**The question:** A section is a grid of image tiles, each a photo with a **title overlaid on the bottom** (over a dark gradient scrim) and a gentle hover-zoom — jukeboxburgers.com's "Our Food Speaks For Itself" grid. What is the **best and proper shortcode** to reproduce this, and how do we make the deterministic converter translate it **100%**?

<!-- truncate -->

## Context

The converter already recognised the grid as an image-tile gallery and mapped it to the **Gallery** shortcode, reproducing the 2/4 responsive columns, the rounded corners, the hover-zoom and the lightbox. But the per-tile captions ("Chicken & Waffles", …) were **dropped**: the Gallery's `captions` option offered only `hover` (overlay revealed on hover) and `below` (caption under the image) — there was no **always-visible overlay** mode, which is exactly the look here (a permanent title over a gradient scrim). So the images came through but the labels vanished.

Two sub-questions fell out of this: (a) is the Gallery even the right shortcode, or should tiles-with-captions use something else (an icon_box card grid, a bespoke "image card" shortcode)? and (b) how does the caption *text* reach the Gallery, given Gallery captions are normally sourced from each image's Media-Library field, while the converter sideloads bare image files with no caption metadata?

## Options considered

- **A different shortcode per tile (icon_box / card grid).** Map each tile to a card with an image + heading. *Con:* a card is image-**then**-text in normal flow; it can't put the title *over* the photo with a scrim, and it loses the Gallery's lightbox / responsive column engine / design variants. Wrong structure for a photo tile.
- **Keep Gallery, reproduce the caption as raw overlay HTML.** Leave the tile as a verbatim code block. *Con:* on the offline PHP path the Tailwind scrim/overlay classes aren't reproduced, so it renders wrong; and it forfeits the editable native option.
- **Keep Gallery, ADD an always-visible overlay caption mode, carry captions inline (chosen).** The Gallery already had the `.fw-gallery__overlay` scrim markup for its hover mode — an always-on variant is a tiny addition. Add a fourth `captions` choice, "Overlay (Always Visible)", and let the converter feed each tile's caption **inline** on the gallery value (the view's normaliser prefers an inline caption over the attachment field), so no per-image Media-Library metadata is required.

## Decision

The Gallery is the right shortcode; extend it rather than replace it, and reach 100% in two layers:

- **Shortcode:** add a `captions` mode **"Overlay (Always Visible)"** (`overlay`) alongside `hover` and `below`. It reuses the existing `.fw-gallery__overlay` figcaption + gradient scrim, adding a `.fw-gallery--overlay-always` modifier whose CSS keeps the scrim + caption visible at rest (self-sufficient opacity, not dependent on the hover reveal). The gallery item normaliser (`sc_gallery_get_items`) now also accepts an **inline** `caption`/`title`/`alt`/`description` on the value, which overrides the Media-Library field — so a sideloaded photo with no excerpt still shows its caption.
- **Converter:** the image-grid recognizer already detected the overlay-caption pattern (a heading absolutely-positioned over a cover image); it now also **reads each tile's caption text** and **classifies the mode** — a hover-revealed overlay (`opacity-0` + `group-hover`) → `hover`, otherwise an always-visible one → `overlay`. The mapper carries the caption **inline** per gallery image and sets `captions` + `caption_source=caption`. Verified end-to-end on the jukebox grid: `captions=overlay`, all four tiles captioned.

This is a **PHP-path** fix. The capture-service (JS) path keeps media-bearing sections verbatim with the page's real CSS, so it already reproduced both the tiles and their captions; the divergence is intentional (verbatim vs. offline Tailwind reproduction), so no JS twin was needed.

## Why

The either/or in "which shortcode?" is a false one: the Gallery already owns 90% of this pattern (grid, responsive columns, rounded corners, hover-zoom, lightbox, design variants) and even had the scrim overlay markup — the only missing 10% was *persisting* the caption. Adding a mode is far cheaper and more faithful than reproducing the tile by hand or bending a card grid into a shape it can't hold. Carrying the caption **inline** (rather than writing it onto each sideloaded attachment's excerpt) keeps the converter's media pipeline unchanged, survives the same image being reused with different captions, and makes the caption an obvious, editable value on the element. The result is a section the user can keep tuning in the builder — change the scrim, the caption color, the columns — instead of a frozen screenshot of the source.

*Status: Accepted.*
