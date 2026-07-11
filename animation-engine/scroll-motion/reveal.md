---
sidebar_position: 2
title: Reveal
---

# Reveal

Fades and moves an element in as it scrolls into view. The **Style** preset layers a subtle scale-up and a clearing blur on top of the movement, so the reveal feels crafted rather than flat.

<img src="/img/animations/reveal-options.png" alt="Reveal — Scroll Motion options panel" width="840" />

## Options

| Option | Notes |
| --- | --- |
| **Direction** | Up · Down · From the left · From the right · No movement (fade only) |
| **Style** | Subtle · Standard · Dramatic — see [Style presets](#style-presets) |
| **Distance** | How far it travels as it fades in (px) |
| **Delay** | Wait before the motion starts |
| **Start animating** | How far into view before it plays |
| **Play once** | Off = replay every time it re-enters the viewport |
| **Run on mobile** | Disable on phones if it feels heavy |

## Style presets

| Style | Character |
| --- | --- |
| **Subtle** | Small scale, no blur, gentle ease, ~0.6s |
| **Standard** | Scale from 96%, soft 4px blur clears, `power3` ease, ~0.9s |
| **Dramatic** | Scale from 90%, 10px blur clears, `expo` ease, ~1.2s |

## Set it up

1. Open a **Section**, **Column** or element → **Animations** tab.
2. Under **Scroll Motion (GSAP)**, set **Scroll Effect** to **Reveal**.
3. Pick a **Direction** and a **Style** (start with *Standard*).
4. **Save** and view the page — the element animates in on scroll.
