---
sidebar_position: 1
title: Overview
slug: /animations
---

# Scroll Motion (GSAP)

Every Section, Column and element has an **Animations** tab with a **Scroll Motion (GSAP)** block — pick an effect and you get scroll-driven motion powered by [GSAP](https://gsap.com/) + ScrollTrigger, the same engine behind countless award-winning sites. No code.

:::info Part of the Animation Engine
Scroll Motion is one module of the bundled **[Animation Engine](/docs/animation-engine)** extension — activate it (UnysonPlus → Extensions → Animation Engine) to get Scroll Motion plus Hover, Physics, Text Effects, Backgrounds, Cursor, Page Transitions and the 3D/WebGL/SVG elements.
:::

:::note A separate entrance-animation engine
The Animations tab also has an **[Entrance Animation](./entrance-animation.md)** block for one-shot [Animate.css](https://animate.style/) effects ("appear with X"). It's **always available** (part of core), independent of GSAP, and can be combined with a Scroll Motion effect on the same element.
:::

## The effects

| Effect | What it does |
| --- | --- |
| [Reveal](./reveal.md) | Fades and moves an element in as it scrolls into view |
| [Stagger children](./stagger.md) | Cascades a grid's or container's items in, one after another (auto-detects grid items) |
| [Split Text](./split-text.md) | Splits headings into characters / words / lines and reveals them in sequence |
| [Parallax](./parallax.md) | Drifts an element against the scroll for depth |
| [Pin](./pin.md) | Sticks an element in place while the page scrolls past |
| [Scroll Scrub](./scroll-scrub.md) | Ties an animation's progress to the scrollbar |
| [Smooth Scroll](./smooth-scroll.md) | Buttery inertia scrolling (Lenis), bridged into GSAP ScrollTrigger — per page or site-wide |

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
