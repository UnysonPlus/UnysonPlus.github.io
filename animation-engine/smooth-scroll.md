---
sidebar_position: 8.6
title: Smooth Scroll
slug: /smooth-scroll
description: Site-wide inertia smooth-scrolling powered by Lenis — one Theme Settings toggle, with a Smoothness slider and touch/mobile controls.
---

# Smooth Scroll

Add **inertia smooth-scrolling** to the whole site — wheel and trackpad scrolling glides with a little
momentum instead of jumping, the way premium sites feel. It's powered by
[Lenis](https://lenis.darkroom.engineering/) and is a single site-wide switch.

This is different from the theme's **"Smooth Scroll for Anchor Links"** (which only eases jumps to
`#anchors`): this smooths *all* scrolling on the page.

:::note[Why it matters]
Browsers run scroll-linked effects slightly out of sync with native scroll, which causes micro-jitter
— the number-one "cheap vs. premium" tell. Smooth Scroll keeps the page and every scroll effect in
lockstep, frame-for-frame, so the whole site feels like one polished system.
:::

## Where to find it

**Theme Settings → Site-wide UX → Smooth Scroll → Smooth (inertia) scrolling → Yes.**

It's a site-wide setting (not a per-element option), and it takes effect on the **front end only** —
the Page Builder keeps normal scrolling so editing stays predictable.

## Options

| Option | Notes |
| --- | --- |
| **Smooth (inertia) scrolling** | The master switch (default **No**) |
| **Smoothness** | How floaty the scroll feels — lower is snappier (closer to native), higher glides longer. Default is a balanced middle |
| **Scroll speed (%)** | How far one wheel notch travels, relative to normal (50–200%, default 100%) |
| **Enable on touch devices** | Off by default — smoothing touch scrolling often feels wrong, so phones/tablets keep native scrolling unless you turn this on |

## How it works with the other scroll features

- **One scroll engine.** Smooth Scroll shares a single Lenis instance with the
  [Infinite Scroll Loop](/animation-engine/scroll-loop) module — enabling both never creates two
  competing smooth-scrollers.
- **Stays in sync with Scroll Motion.** On pages that also use
  [Scroll Motion](/animation-engine/) (GSAP + ScrollTrigger), Smooth Scroll drives ScrollTrigger from
  the same clock, so scrubbed and pinned effects track the smoothed scroll exactly — no lag or drift.
- **`position: sticky` keeps working.** Lenis keeps *native* scroll under the hood (that's why it's
  the industry standard), so pinned sections, sticky headers and anchor links all behave normally.

## Performance & accessibility

- **Loads only when enabled** — no assets ship on a site that leaves it off.
- **Respects reduced motion** — visitors who ask their OS to reduce motion get plain native scrolling,
  automatically.
- **Touch-safe** — native scrolling on phones/tablets unless you explicitly opt in.
