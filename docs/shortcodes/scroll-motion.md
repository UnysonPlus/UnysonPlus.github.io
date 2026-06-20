---
sidebar_position: 7
title: Scroll Motion (GSAP)
---

# Scroll Motion (GSAP)

Every element's **Animations** tab carries two independent engines:

- **Entrance Animation** — one-shot [Animate.css](https://animate.style/) effects ("appear with X") that play once as the element scrolls into view.
- **Scroll Motion (GSAP)** — scroll-*driven* motion powered by [GSAP](https://gsap.com/) + ScrollTrigger: reveals, staggers, split-text headlines, parallax, pinning and scroll-scrubbing. This is the "award-site" vocabulary that CSS keyframes can't express.

The two are separate and can be used together on the same element (a CSS entrance **and** a GSAP scroll effect).

> **Loads only when used.** GSAP is bundled, not linked from a CDN, and it is enqueued **only on pages that actually use a Scroll Motion effect**. A page with no scroll motion ships zero GSAP bytes. The same is true per-plugin: Split Text's extra library loads only on pages that use Split Text.

## Where to find it

Open any Section, Column, or content element → **Animations** tab → the **Scroll Motion (GSAP)** block → **Scroll Effect** dropdown. Leave it on **None** for no motion (nothing loads).

```
Animations  ▸  Scroll Motion (GSAP)  ▸  Scroll Effect: [ None ▾ ]
                                          None
                                          Reveal
                                          Stagger children
                                          Split Text
                                          Parallax
                                          Pin
                                          Scroll Scrub
```

## The effects

### Reveal

Fades and moves the element in as it scrolls into view.

| Option | Notes |
| --- | --- |
| **Direction** | Up · Down · From the left · From the right · No movement (fade only) |
| **Style** | Subtle · Standard · Dramatic — see [Style presets](#style-presets) below |
| **Distance** | How far it travels as it fades in (px) |
| **Delay** | Wait before the motion starts |
| **Start animating** | How far into view before it plays (e.g. *near the bottom*, *halfway*) |
| **Play once** | Off = replay every time it re-enters the viewport |
| **Run on mobile** | Disable on phones if it feels heavy |

### Stagger children

Cascades the element's **direct children** in one after another — ideal for a row of cards or a list.

| Option | Notes |
| --- | --- |
| **Direction**, **Style**, **Distance**, **Start**, **Run on mobile** | As for Reveal |
| **Time between items** | Gap between each child (seconds) |
| **Cascade from** | First to last · Last to first · Center outward · Edges inward |

### Split Text

Splits an element's **headings** (or paragraphs) into **characters, words or lines** and reveals them in sequence — the classic animated-headline effect.

| Option | Notes |
| --- | --- |
| **Split by** | Characters · Words · Lines |
| **Apply to** | Headings (H1–H6) · Paragraphs · Headings + paragraphs |
| **Style** | Subtle · Standard · Dramatic |
| **Time between pieces** | Cascade speed (characters look good around 0.02–0.04s) |
| **Direction** | Rise up · Drop down |

> The split is **reverted once the animation completes**, restoring clean, selectable, accessible text — so the final markup stays un-bloated.

### Parallax

Drifts the element against the scroll for depth.

| Option | Notes |
| --- | --- |
| **Axis** | Vertical · Horizontal |
| **Strength** | How much it drifts relative to the scroll (try 10–30) |
| **Run on mobile** | Off by default |

### Pin

Sticks the element in place while the page scrolls past it.

| Option | Notes |
| --- | --- |
| **Pin length** | How long it stays pinned, in % of screen height (100 = one full screen of scrolling) |
| **Run on mobile** | Off by default |

### Scroll Scrub

Ties the animation's **progress to the scrollbar** — scrubbing it back and forth as you scroll.

| Option | Notes |
| --- | --- |
| **What to animate** | Fade in · Scale up · Rotate · Slide up |
| **Intensity** | Strength of the effect |
| **Start animating** | Scroll position where it begins |

## Style presets

**Reveal** and **Stagger** use a single **Style** dropdown that layers compound motion — a rise **plus** a subtle scale-up **plus** a clearing blur — on a per-style refined ease and duration. One dropdown turns a flat fade into crafted motion.

| Style | Character |
| --- | --- |
| **Subtle** | Small scale, no blur, gentle ease, ~0.6s |
| **Standard** | Scale from 96%, soft 4px blur clears, `power3` ease, ~0.9s |
| **Dramatic** | Scale from 90%, 10px blur clears, `expo` ease, ~1.2s |

## Smooth Scroll (Lenis)

Buttery inertia scrolling via [Lenis](https://lenis.darkroom.engineering/). When a page also uses Scroll Motion, Smooth Scroll is bridged into GSAP's ticker and ScrollTrigger so pinned and scrubbed effects stay perfectly in sync. Same-page anchor links scroll smoothly too.

It can be controlled at two levels:

- **Per page** — the **Smooth Scroll** box in the Page/Post editor: **Use site default · On · Off**.
- **Site-wide** — a **Smooth Scroll site-wide** switch on the Shortcodes extension **Settings** page (the global default).

A page set to **On**/**Off** overrides the global; otherwise it inherits the site-wide default. Like the GSAP effects, Lenis is **loaded only where it resolves to on**.

## Performance & accessibility

- **Conditional loading.** GSAP, ScrollTrigger, the Split Text plugin and Lenis each load only on the pages (and for the effects) that use them.
- **Reduced motion.** All effects respect `prefers-reduced-motion: reduce` — motion is skipped and content shows normally.
- **Editor-safe.** Animations are suppressed inside the Page Builder canvas so editing stays fast; they play on the front end.
- **Flash-free.** Effects that start hidden use a guard class so there's no flash of un-animated content before the script runs, and content stays visible if scripts fail to load.

:::tip Entrance animation vs. Scroll Motion
Use the **Entrance Animation** block for a quick one-shot "appear" effect. Reach for **Scroll Motion (GSAP)** when you want scroll-linked motion — staggered reveals, parallax, pinning, scrubbing or animated headlines.
:::
