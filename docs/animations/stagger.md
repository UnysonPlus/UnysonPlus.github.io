---
sidebar_position: 3
title: Stagger children
---

# Stagger children

Cascades the element's **direct children** in one after another — ideal for a row of cards, a feature list, or a grid.

<img src="/img/animations/stagger-options.png" alt="Stagger children — Scroll Motion options panel" width="840" />

## Options

| Option | Notes |
| --- | --- |
| **Direction** | Up · Down · From the left · From the right · No movement |
| **Style** | Subtle · Standard · Dramatic (same presets as [Reveal](./reveal#style-presets)) |
| **Distance** | How far each child travels (px) |
| **Time between items** | Gap between each child as they cascade in (seconds) |
| **Cascade from** | First to last · Last to first · Center outward · Edges inward |
| **Start animating** | How far into view before it plays |
| **Run on mobile** | Disable on phones if it feels heavy |

## Set it up

1. Put your items (cards, columns, blocks) inside one **Column** or **Section**.
2. Open that container → **Animations** tab → **Scroll Motion (GSAP)**.
3. Set **Scroll Effect** to **Stagger children**.
4. Tune **Time between items** (0.1–0.2s reads well) and **Cascade from**.
5. **Save** — the direct children cascade in on scroll.

:::note
Stagger animates the **direct children** of the element it's applied to. Apply it to the container, not to each child.
:::
