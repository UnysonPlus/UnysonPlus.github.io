---
sidebar_position: 8.55
title: Sticky Card Stack
slug: /sticky-stack
---

# Sticky Card Stack

:::tip Try it live
Scroll a deck of cards in the **[Sticky Card Stack playground](./playground.mdx)** — drag the vertical
scroll and watch each card pin in turn while the covered ones transform. Switch between all 11 styles
and tune the pin offset, stagger and intensity. It runs the real cover() + per-style transforms.
:::

The Apple / Stripe **"deck of cards" scroll effect** — pin a Section's columns one after another as you scroll, so each card sticks and the ones beneath it transform. **11 styles**, pure CSS + one passive scroll listener, **no library**.

## Where to find it

It's a **Section-level** control: build a Section with **2+ full-width columns** as the cards, then open the Section → **Animations** tab → **Sticky Card Stack** → pick a style (default **Off**).

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

- **Pin offset (px)** — the gap from the top of the viewport where each card pins.
- **Stagger (px)** — how much each stacked card peeks below the one above.
- **Intensity** — the strength of the chosen style (how much covered cards scale / dim / blur / tilt, how wide the deck fans, etc.).

## How it works

Each card is `position: sticky` with a staggered `top`, so they pin in turn as you scroll. A passive, rAF-throttled scroll listener measures **how far each card is covered** by the next one (0 → 1) and applies the chosen style's transform. It honours **reduce motion** (the cards simply stack, no transform).
