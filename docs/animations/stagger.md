---
sidebar_position: 3
title: Stagger children
---

# Stagger children

Cascades a container's **items** in one after another — ideal for a row of cards, a feature list, or an image **grid**. By default it **auto-detects the real grid items**, so it works on a Gallery, Masonry Section, Logo Grid or Posts grid out of the box — even though those render their tiles inside an inner grid wrapper (and often next to a title).

<img src="/img/animations/stagger-options.png" alt="Stagger children — Scroll Motion options panel" width="840" />

## Options

| Option | Notes |
| --- | --- |
| **Apply to** | **Grid items (auto-detect)** *(default)* · **Direct children only** — see [Which items cascade](#which-items-cascade) |
| **Direction** | Up · Down · From the left · From the right · No movement |
| **Style** | Subtle · Standard · Dramatic (same presets as [Reveal](./reveal#style-presets)) |
| **Distance** | How far each item travels (px) |
| **Time between items** | Gap between each item as they cascade in (seconds) |
| **Cascade from** | First to last · Last to first · Center outward · Edges inward |
| **Start animating** | How far into view before it plays |
| **Run on mobile** | Disable on phones if it feels heavy |

## Which items cascade

The **Apply to** control decides what gets staggered:

- **Grid items (auto-detect)** — the default. Stagger looks *inside* the element and finds the real repeated items: it drills through single-wrapper layout layers and picks the largest group of same-tag siblings. So on a **Gallery** (`wrapper → grid → figures`) it cascades the image tiles, not the whole grid as one block — and a heading beside the grid doesn't fool it. Use this for galleries, masonry, logo grids, posts, or any element whose items are nested.
- **Direct children only** — cascades the element's *immediate* children as-is. Use this for a **Column** of stacked blocks or a **Row** of columns, where the items you want are already the direct children.

## Set it up

### On a grid (Gallery, Masonry, Logo Grid…)

1. Add the **Gallery** (or Masonry Section, Logo Grid, Posts) element.
2. Open it → **Animations** tab → **Scroll Motion (GSAP)**.
3. Set **Scroll Effect** to **Stagger children**, leave **Apply to** on **Grid items (auto-detect)**.
4. Tune **Time between items** (0.1–0.2s reads well) and try **Center outward** / **Edges inward** for the fancy cascades.
5. **Save** — the tiles cascade in as the grid scrolls into view.

### On a plain container (Column / Row / Section)

1. Put your items (cards, columns, blocks) inside one **Column** or **Section**.
2. Open that container → **Animations** tab → **Scroll Motion (GSAP)**.
3. Set **Scroll Effect** to **Stagger children**. If the items are the container's direct children, set **Apply to** to **Direct children only**.
4. Tune the timing and **Save**.

:::note
Apply Stagger to the **container**, not to each item. With **Grid items (auto-detect)** it finds the repeated items for you; with **Direct children only** it uses the element's immediate children.
:::
