---
slug: css-composed-logo-to-inline-svg
title: "Why a CSS-composed logo becomes an inline SVG, not a new logo mode"
authors: [jon]
tags: [conversion, architecture, option-types]
date: 2026-09-04
description: "Modern sites often draw the logo icon in pure CSS — nested absolutely-positioned divs with gradient fills, rounded corners and a small rotation, no image and no inline SVG — so the converter's image / inline-SVG / library-icon detectors captured nothing and the mark was lost (the wordmark fell back to the site name). The question was whether Theme Settings should grow a CSS-composed-logo mode to hold such marks; the decision is no — reconstruct the mark into a faithful inline SVG at capture time and route it through the existing icon+wordmark logo mode, because an inline SVG does everything a geometric CSS mark does (scalable, themeable, editable) while a general CSS-markup renderer would be brittle, un-editable, and redundant."
---

**The question:** ModFii's logo has no image at all — the icon is a stack of `<div>`s with gradient
backgrounds, rounded corners and a `rotate(3deg)`, beside a "Mod**Fii**" wordmark. The converter's logo
detector looks for an `<img>`, an inline `<svg>`, a library icon id, or wordmark text — a pure-CSS mark
matches none, so it was dropped and the wordmark fell back to the bare page title. Should **Theme
Settings gain a new "CSS-composed logo" mode** that stores and re-renders such nested-div/gradient markup?

<!-- truncate -->

## Context

The header logo is a single `header_logo` multi-picker with two modes: **`simple`** (an uploaded image
file — PNG/JPG/SVG) and **`custom`** (an inline-SVG icon + a wordmark lockup, with icon frame, colors,
layout, and a `logo_custom_css` escape hatch). The "icon + wordmark" pattern — exactly what ModFii is —
is therefore already a first-class citizen; the only gap was that nothing *captured* a mark drawn in CSS.

The mark itself is simple geometry: three layered rounded rectangles (a rotated gradient tile, an inset
page-coloured tile that reads as a frame, and a small centred gradient square). It carries its look
entirely in `background-image` gradients, `border-radius`, and a transform — all values the headless
capture already resolves per element, alongside each layer's rendered geometry.

## Options considered

- **Add a CSS-composed-logo mode to Theme Settings** that stores the nested-div/gradient markup and
  re-renders it. *Pro:* a literal reproduction. *Con:* brittle (it breaks the moment the source redesigns
  or the markup shifts), **un-editable** (nobody wants to hand-tune raw div/gradient HTML in an options
  panel), and **redundant** — an inline SVG expresses the same geometric mark but hostable, scalable,
  and themeable via `currentColor`. It would also be a new option surface to maintain for a case the
  existing `custom` mode already almost covers.
- **Rasterize the mark to a PNG** (screenshot its bounding box) and use the `simple` image mode. *Pro:*
  always produces *something*. *Con:* not scalable, not editable, and it dumps a raster into the Media
  Library for what is fundamentally vector art. Good as a fallback, wrong as the default.
- **Synthesize an inline SVG at capture time (chosen).** In the capture stage — where the live browser
  has real geometry — reconstruct the mark: each painted layer becomes an SVG `<rect>` (box relative to
  the mark, corner radius, rotation) filled with its own paint (a linear-gradient → an SVG
  `<linearGradient>`, else the solid colour). Stamp the finished SVG on the mark element; the converter
  lifts it verbatim into the existing `custom` mode's `logo_icon` (svg-inline), exactly like a real
  inline-SVG logo. The wordmark's two-tone accent ("Mod**Fii**") rides the already-existing accent-span
  capture.

## Decision

**No new Theme Settings mode.** Reconstruct the CSS mark into a faithful inline SVG at capture time and
route it through the existing icon + wordmark (`custom`) logo mode. The synthesis lives in **one place**
— the capture stage (`capture-extract.mjs`), where the geometry is — and both the PHP and JS builders
just consume the stamped SVG, so there is no duplicated geometry math. A raster screenshot of the mark's
bounding box is the fallback for a mark too illustrative to reconstruct. Making the link-less logo slot
detectable (mirroring the PHP brand-block finder) fell out of the same work, since a CSS-mark logo often
has no anchor.

## Why

The theme didn't need a new logo type — it needed the **converter** to be smart enough to turn a CSS
mark into the vector primitive the theme already renders. An inline SVG is strictly better than stored
CSS markup for this: it scales, it themes, it's editable in the same panel as every other logo, and it
matches how the plugin already handles the overwhelming majority of logos. A general CSS-markup renderer
would be a brittle, un-editable parallel path for the ~5% of logos drawn in CSS, when the 95% case —
"geometric icon + wordmark" — and that 5% both collapse cleanly onto SVG-synthesis + the existing
`custom` mode. Putting the synthesis in the capture stage (rather than duplicating it in the PHP and JS
mappers) keeps a single source of truth for the geometry, consistent with the converter's PHP↔JS parity
discipline.

*Status: Accepted.*
