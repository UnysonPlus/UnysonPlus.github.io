---
slug: animation-engine-effect-recognizers
title: "Converting source motion: a deterministic Animation Engine effect-recognizer layer, not a frozen CSS shim"
authors: [jon]
tags: [conversion, architecture]
date: 2026-09-05
description: "A converted section (jukeboxburgers.com's #3 reel strip) is a horizontal auto-scrolling marquee. The Site Converter used to freeze it as a verbatim code block and fake the motion with an injected CSS-keyframes shim — pixel-faithful but a dead end: not editable, not the real engine, and every effect would need its own bespoke shim. The question was how to reproduce source MOTION. The decision is a deterministic effect-recognizer layer: pattern-match a known motion (marquee = an `animate-scroll`/`infinite`-translate loop on a flex row) and emit the matching native Animation Engine EFFECT on a real builder element (editable speed/direction/gap), keeping the verbatim block only as the fallback for motion not yet recognized. Marquee is the first effect; parallax, scroll-motion, text-effects and the rest follow the same shape."
---

**The question:** A converted section is a **horizontal auto-scrolling marquee** — jukeboxburgers.com's `#menu`-adjacent reel strip: a flex row of video cards looping left, pausing on hover. How should the deterministic converter reproduce continuous *motion* like this — and, more broadly, motion of any kind the Animation Engine can drive?

<!-- truncate -->

## Context

The strip was routed to a **verbatim `.sc-tw` code block**, and its motion was faked by a CSS-keyframes shim injected into the code builder (`@keyframes sc-scroll-left{…translateX(-50%)} .animate-scroll-left{animation:… infinite}`). It *looked* right, but it was a dead end:

- **Not editable** — a frozen block; no speed / direction / gap controls, no way to tune the ticker in the builder.
- **Not the real engine** — the site already ships an **Animation Engine** with a dedicated **Marquee module** (and ~30 others: parallax, scroll-motion, text-effects, physics…), applied as an *element effect* (`marquee` att → `sc-marquee` + `data-mq-*` via `sc_build_wrapper_attr`, with a runtime that builds the seamless-loop track). The shim reimplemented a worse version of that by hand.
- **Doesn't scale** — every motion (parallax, reveal, a logo wall, a ribbon ticker) would need its own bespoke CSS shim in the code builder. That's N special cases with no shared structure.

The converter already had *some* animation intelligence — an **entrance-animation** pass (`entrance_anim`: scroll-reveal fade-ins on widgets, with an optional AI path through the capture service). So the precedent for "detect intent → apply an engine effect" existed; what was missing was a **continuous/looping-motion** recognizer.

## Options considered

- **Keep the verbatim code block + CSS shim.** *Pro:* pixel-faithful, zero new recognizer code. *Con:* frozen, non-editable, bypasses the real engine, and needs a new bespoke shim per effect. Rejected as the primary path (kept only as a fallback).
- **Lean on the AI motion path.** Extend the existing capture-service AI animation detection to cover marquees. *Pro:* flexible, handles ambiguous motion. *Con:* non-deterministic, needs the service running, slower, and a marquee is a *crisp* structural pattern that doesn't need a model to read. Kept for genuinely ambiguous motion, not this.
- **A deterministic effect-recognizer layer.** Pattern-match a known motion and emit the matching **native Animation Engine effect** onto a real builder element. *Pro:* real engine, editable, reusable across every effect, deterministic and fast. *Con:* one recognizer to write per effect — but each is small and shares one shape.

## Decision

Build a **deterministic Animation Engine effect-recognizer layer**, with **marquee as the first effect**. A recognizer:

1. **Detects the pattern** from unambiguous signals — for marquee: an `animate-scroll-left/right` / `animate-marquee` class, or a computed `animation:… infinite`, on a flex row of items (and it resolves the actual animated *track*, which often sits one wrapper in). It deliberately does **not** fire on a plain `overflow-x` swipe strip — adding auto-motion the source never had would misrepresent it, so that case still becomes the verbatim block.
2. **Reads the parameters** — direction (left/right), gap (from `gap-N` / computed), a speed preset from the loop duration, pause-on-hover.
3. **Deduplicates** the items — seamless marquees ship a 2× copy of their items, and the engine runtime re-duplicates for the loop, so a raw 2× source would scroll a 4× track; the recognizer keeps one set (matched by video/image `src` or text).
4. **Emits a native element carrying the effect** — a container whose `marquee` att the framework turns into `sc-marquee` + `data-mq-*`; the item set rides inside it. The motion is now the real engine, and the effect is editable in the Animations tab.

The verbatim `.sc-tw` code block stays as the **fallback** for motion a recognizer doesn't (yet) claim, and the AI path stays for genuinely ambiguous cases. Result, verified: the reel strip renders as a live `sc-marquee` whose track transform animates, with the videos in a seamless loop — no shim, no frozen block.

## Why

The engine already models these effects as **element-level, editable behaviors** — so the faithful *and* useful move is to hand the source's motion to it, not to freeze a hand-rolled copy. The source patterns are **deterministic** (a marquee is a translate-loop on a row; parallax is a scroll-linked transform; a reveal is an in-view transition), so a model isn't needed to read them — pattern-matching is faster, reproducible, and testable. And the recognizer **layer** is the reusable structure the one-off shim never was: marquee proves the shape (detect → read params → dedup → emit the effect att on a real element), and parallax, scroll-motion, text-effects and the rest slot into the same shape. Fidelity of motion, editability, and reuse across every effect — for a small recognizer each — beat a pixel-faithful but frozen block that scales to none.

*Status: Accepted.*
