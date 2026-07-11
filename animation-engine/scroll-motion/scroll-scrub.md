---
sidebar_position: 7
title: Scroll Scrub
---

# Scroll Scrub

Ties an animation's **progress to the scrollbar** — scrubbing it forwards and backwards as you scroll, so the motion is fully under the visitor's control.

<img src="/img/animations/scroll-scrub-options.png" alt="Scroll Scrub — Scroll Motion options panel" width="840" />

## Options

| Option | Notes |
| --- | --- |
| **What to animate** | Fade in · Scale up · Rotate · Slide up |
| **Intensity** | Strength of the effect |
| **Start animating** | Scroll position where it begins |

## Set it up

1. Open the element (often an image) → **Animations** tab → **Scroll Motion (GSAP)**.
2. Set **Scroll Effect** to **Scroll Scrub**.
3. Pick **What to animate** (e.g. *Scale up*) and an **Intensity**.
4. **Save** — the effect now tracks the scroll position.

:::tip
Scroll Scrub feels best with [Smooth Scroll](./smooth-scroll) enabled, which removes the stepped feel of a mouse wheel.
:::
