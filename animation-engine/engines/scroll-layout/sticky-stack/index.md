---
sidebar_position: 8.55
title: Sticky Card Stack
slug: /sticky-stack
---

# Sticky Card Stack

:::tip[Try it live]
Scroll a deck of cards in the **[Sticky Card Stack playground](./playground.mdx)** — drag the vertical
scroll and watch each card pin in turn while the covered ones transform. Switch between all 11 styles
and tune the pin offset, stagger and intensity. It runs the real cover() + per-style transforms.
:::

The **"deck of cards" scroll effect** seen on many product pages — pin a Section's columns one after another as you scroll, so each card sticks and the ones beneath it transform. **11 styles**, pure CSS + one passive scroll listener, **no library**.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/sticky-stack/)** — an interactive showcase you can explore.

## Where to find it

It's a **Section-level** control: build a Section with **2+ full-width columns** as the cards, then open the Section → **Animations** tab → **Add Animation** → **Scroll** → **Card Stack**, and pick a style (remove it with the card's **×**).

The module loads its runtime **only** on pages that use it, and only the one chosen style's tiny transform partial.

## The styles

| Style | What the covered cards do |
| --- | --- |
| **Card Stack** | Scale down slightly as they're covered — the classic deck. |
| **Scale & Fade** | Scale down *and* dim. |
| **Fade Under** | Dim to the back. |
| **Blur Under** | Blur (depth-of-field) as they recede. |
| **3D Tilt Back** | Tilt back in perspective, like pages laying down. |
| **Fan Deck** | The cards fan out around a pivot. |
| **Rotate Messy** | A hand-tossed, slightly-rotated pile. |
| **Side Offset** | Each card steps sideways. |
| **Peel Away** | The top card slides up and off (reverse z-order). |
| **Push Conveyor** | Cards push up and away like a conveyor. |
| **Grow In** | The next card grows in as the previous is covered. |

## Options

- **Pin offset (px)** — the gap from the top of the viewport where each card pins: 0–200, default 40.
- **Stagger (px)** — how much each stacked card peeks below the one above: 0–80, default 18.
- **Intensity** — the strength of the chosen style (how much covered cards scale / dim / blur / tilt, how wide the deck fans, etc.): 0–1, default 0.5.
- **First column is a heading** — keeps the Section’s first column out of the stack, so it can hold a heading or intro that scrolls normally above the cards (off by default). Any column with the CSS class `upw-ss-skip` (Advanced tab) is also left out, wherever it sits.

## How it works

Each card is `position: sticky` with a staggered `top`, so they pin in turn as you scroll. A passive, rAF-throttled scroll listener measures **how far each card is covered** by the next one (0 → 1) and applies the chosen style's transform. It honours **reduce motion** (the cards simply stack, no transform).
