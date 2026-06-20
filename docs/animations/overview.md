---
sidebar_position: 1
title: Overview
slug: /animations
---

# Animations

Every element's **Animations** tab carries two independent engines:

- **Entrance Animation** — one-shot [Animate.css](https://animate.style/) effects ("appear with X") that play once as the element scrolls into view.
- **Scroll Motion (GSAP)** — scroll-*driven* motion powered by [GSAP](https://gsap.com/) + ScrollTrigger. This is the "award-site" vocabulary that CSS keyframes can't express.

The two are separate and can be combined on the same element (a CSS entrance **and** a GSAP scroll effect).

## The Scroll Motion effects

| Effect | What it does |
| --- | --- |
| [Reveal](./reveal.md) | Fades and moves an element in as it scrolls into view |
| [Stagger children](./stagger.md) | Cascades an element's direct children in, one after another |
| [Split Text](./split-text.md) | Splits headings into characters / words / lines and reveals them in sequence |
| [Parallax](./parallax.md) | Drifts an element against the scroll for depth |
| [Pin](./pin.md) | Sticks an element in place while the page scrolls past |
| [Scroll Scrub](./scroll-scrub.md) | Ties an animation's progress to the scrollbar |
| [Smooth Scroll](./smooth-scroll.md) | Buttery inertia scrolling (Lenis), per-page or site-wide |
| [Animated Counters](./counters.md) | Numbers that count up when scrolled into view |

## Where to find it

Open any Section, Column, or content element → **Animations** tab → the **Scroll Motion (GSAP)** block → **Scroll Effect** dropdown. Leave it on **None** for no motion.

```
Animations  ▸  Scroll Motion (GSAP)  ▸  Scroll Effect: [ None ▾ ]
```

## Performance &amp; accessibility

- **Loads only when used.** GSAP is bundled (not a CDN) and enqueued **only on pages that use a Scroll Motion effect** — a page with no scroll motion ships zero GSAP bytes. Heavier plugins (Split Text, Lenis) load only on the pages that use *them*.
- **Reduced motion.** All effects respect `prefers-reduced-motion: reduce` — motion is skipped and content shows normally.
- **Editor-safe.** Animations are suppressed inside the Page Builder canvas so editing stays fast; they play on the front end.
- **Flash-free.** Effects that start hidden use a guard so there's no flash of un-animated content, and content stays visible if scripts fail to load.

:::tip Entrance animation vs. Scroll Motion
Use the **Entrance Animation** block for a quick one-shot "appear" effect. Reach for **Scroll Motion (GSAP)** when you want scroll-linked motion — staggered reveals, parallax, pinning, scrubbing or animated headlines.
:::
