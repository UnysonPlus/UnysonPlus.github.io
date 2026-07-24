---
slug: camera-pan-as-backdrop-motion-option
title: "The cinematic \"camera pan\" is a moving backdrop, not a camera — so we made it a Stage option"
authors: [jon]
tags: [animation, architecture]
date: 2026-07-24
description: "poly.app's mid-scroll shots feel like a camera gliding across a wooden desk. Watching the recording frame-by-frame, there is no camera — the whole backdrop simply pans and scales as you scroll. We first faked it with hand-written CSS on the demo's backdrop image, then promoted it to a first-class Animation Engine option: the scrollytelling Stage's Backdrop Motion (pan / dolly / pan+dolly + direction + intensity), scrubbed by the published story progress. This records why the illusion is worth generalising and why it belongs on the backdrop container, not the image."
---

**The question:** poly.app's desk sections look like a film camera slowly glides across the scene as
you scroll — a genuinely cinematic touch. Is that a real 3D camera move (rendered footage), and if
not, how do we reproduce it in UnysonPlus without baking a video?

<!-- truncate -->

## Context

Stepping through the 0:38–0:43 stretch of the recording frame-by-frame, the "camera move" is an
illusion: **the backdrop itself translates sideways and scales up a touch as the scroll advances.**
There is no perspective shift, no parallax between foreground and background layers — the whole still
image just pans and dollies. The user spotted this directly ("the camera panning is just an illusion
of the background moving"), which is exactly right and is the entire trick.

That reframes the problem. We don't need footage or a WebGL camera; we need to transform a *static*
backdrop by scroll progress. The scrollytelling Stage already publishes its 0→1 progress every frame
(the `--story-progress` CSS var and `el.__storyProgress`), so the demo's first cut was a few lines of
hand-CSS on the poly child theme: `transform: scale(calc(1.16 + var(--story-progress) * 0.1))
translateX(calc((var(--story-progress) - 0.5) * -14%))` on the backdrop `<img>`. It worked — and that
was the tell that this is a *reusable* capability, not a one-demo hack.

## Options considered

- **Leave it as per-site hand-CSS.** Cheapest, but every site that wants the effect re-derives the
  same transform math, has to know the `--story-progress` var exists, and risks stacking its transform
  against anything else on the image (a blur, a fit tweak). It also isn't discoverable in the builder.
- **Bake it as footage / a frame `sequence` backdrop.** Highest fidelity, but violates the standing
  rule that demo content stays live and user-replaceable, and it's heavy. A still image + a transform
  gets 95% of the look for kilobytes.
- **Promote it to a Stage option (chosen).** Add `backdrop_motion` (`none` / `pan` / `dolly` /
  `pan_dolly`) with `motion_direction` and `motion_intensity`, computed in the Stage's frame loop and
  applied to the backdrop **container**. Discoverable, reusable, and composes with the image's own CSS.

## Decision

Ship **Backdrop Motion** as a first-class scrollytelling Stage option. The module reads the three
data-attributes at render time and, in the same rAF loop that scrubs the backdrop, sets a
`scale(...) translate(...)` on the backdrop **container element** (not the `<img>`). The poly demo now
uses `backdrop_motion: 'pan_dolly'` and drops its hand-CSS transform, keeping only the blur on the
image.

## Why

- **The illusion is the mechanism.** Once you see the camera move *is* a moving backdrop, the honest
  implementation is a scroll-scrubbed transform — so the framework should own that math, not each site.
- **Container, not image, is the right layer.** Sites routinely style the backdrop image (blur for
  depth-of-field, `object-fit`). Transforming the *container* leaves the image's own CSS untouched, so
  the motion composes instead of fighting it. (The demo's first cut transformed the `<img>` and would
  have stacked against its blur rule — the migration to the option removed that footgun, and the kit
  doc now explicitly warns against writing a second transform on the image.)
- **It keeps the "live elements, not footage" promise.** A single still backdrop + a scrubbed
  transform reproduces poly's rendered camera glide while the backdrop stays a swappable Media layer —
  consistent with why we chose editable elements over baked cinematic footage in the first place.
- **Intensity + direction make it a general tool,** not a poly-specific constant: a gentle ~40 reads as
  a slow drift; higher values give a strong sweep, and the pan axis is author-chosen.

The broader pattern worth remembering: when a site's "expensive" motion turns out to be a simple
transform driven by scroll, the win is to expose the *published progress* (which the Stage already
does) and add a small, well-named option that scrubs against it — rather than either hand-coding it
per site or reaching for footage.
