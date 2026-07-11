---
sidebar_position: 4
title: Split Text
---

# Split Text

Splits an element's **headings** (or paragraphs) into **characters, words or lines** and reveals them in sequence — the classic animated-headline effect.

<img src="/img/animations/split-text-options.png" alt="Split Text — Scroll Motion options panel" width="840" />

## Options

| Option | Notes |
| --- | --- |
| **Split by** | Characters · Words · Lines |
| **Apply to** | Headings (H1–H6) · Paragraphs · Headings + paragraphs |
| **Style** | Subtle · Standard · Dramatic |
| **Time between pieces** | Cascade speed (characters look good around 0.02–0.04s) |
| **Direction** | Rise up · Drop down |
| **Start animating** | How far into view before it plays |

## Set it up

1. Add a **Section** (or element) containing the heading you want to animate.
2. Open it → **Animations** tab → **Scroll Motion (GSAP)**.
3. Set **Scroll Effect** to **Split Text**.
4. Choose **Split by** (Characters for the boldest effect) and **Apply to → Headings**.
5. **Save** — the heading assembles piece-by-piece on scroll.

:::tip Clean markup
The split is **reverted once the animation completes**, restoring normal, selectable, accessible text — so the final DOM stays un-bloated.
:::
