---
sidebar_position: 11.9
title: Parallax Scene
slug: /parallax-scene
description: A layered foreground/background scene — stacked images that drift at different depths on scroll or with the pointer, reveal on entrance, sway gently, and can pin full-screen.
---

# Parallax Scene

**Parallax Scene** builds a diorama from stacked images: hills, trees, a character, clouds. Each layer drifts at its own **depth** as the page scrolls (or as the pointer moves), **reveals** with its own entrance when the scene comes into view, and can **sway** gently all the time, like leaves in a breeze. Use it for an art-directed hero, a backdrop behind content, or a full-screen scene that holds while you scroll through it.

## Where to find it

Builder palette → **Animation Engine** → **Parallax Scene**. It needs the Animation Engine extension. The edit window has two tabs: **Layers** and **Scene**.

## Layers tab

Add image layers **back to front** with **Add layer**. Usually you anchor each one to the bottom edge, give it a depth and an entrance, and optionally a sway. A transparent PNG or WebP works best, because the layers overlap.

**Position**

| Option | Default | What it does |
| --- | --- | --- |
| **Layer image** | — | The picture for this layer. |
| **Horizontal anchor** | Center | **Left**, **Center**, **Right**, or **Full width** (stretches across the scene). |
| **Offset X (%)** | 0 | Nudge sideways (−50 to 50). |
| **Vertical anchor** | Bottom | **Bottom**, **Center** or **Top**. |
| **Offset Y (%)** | 0 | Nudge up or down (−50 to 50). |
| **Width (% of scene)** | 40 | 5–140. Ignored when the anchor is Full width. |
| **Stacking (z-index)** | 1 | 0–20. Higher = in front. |
| **Flip horizontally** | No | Mirror the image. |
| **Opacity** | 100 | 0–100. |

**Motion**

| Option | Default | What it does |
| --- | --- | --- |
| **Parallax depth** | 30 | 0–100. 0 = fixed; higher = travels further on scroll (a closer, foreground layer). |
| **Entrance** | Rise up | How the layer reveals when the scene scrolls into view: **None**, **Rise up**, **Drop down**, **From left**, **From right**, **Fade**, **Scale in**. |
| **Exit** | Leave the way it entered | How it leaves as the scene scrolls back out: **Leave the way it entered** (mirrors the entrance), **Stay (parallax only)**, **Rise up**, **Drop down**, **To left**, **To right**, **Fade**, **Scale out**. |
| **Entrance / exit delay (ms)** | 0 | 0–1200. Give each layer a bigger delay to stagger them. |
| **Idle sway** | None | A gentle, always-on motion: **None**, **Sway (rotate)**, **Bob (up/down)**, **Drift (side)**. Good for foliage. |
| **Sway amount** | 3 | 0–12. |

## Scene tab

| Option | Default | What it does |
| --- | --- | --- |
| **Placement** | In flow | **In flow (a band on the page)**; **Fixed to viewport bottom** (content scrolls over it); or **Pinned** (holds full-screen while you scroll, then the layers scroll up and blur away). |
| **Scene height** | `60vh` | Any CSS length: `60vh`, `480px`, or `100vh` for a full-screen hero. For Pinned, this is the held height (use `100vh`). |
| **Hold length (Pinned only)** | Comfortable (2.5×) | How long it stays pinned, as multiples of its height: **Short (1.5×)**, **Medium (2×)**, **Comfortable (2.5×)**, **Long (3.5×)**, **Epic (5×)**. |
| **Motion source** | Scroll | **Scroll**, **Pointer**, **Scroll + Pointer**, or **None (static)**. |
| **Intensity (px)** | 60 | 0–240. How far the deepest layers travel at full scroll or pointer movement. |
| **Let clicks pass through** | Yes | Recommended when the scene sits behind content. |

## Example

A forest hero: Scene height `100vh`, Placement **Pinned**, Hold **Comfortable**. Layers, back to front:

1. A sky: Full width, depth 5, entrance Fade.
2. Far hills: depth 20, entrance Rise up.
3. Trees: anchored Left and Right (two layers), depth 50, Idle sway **Sway**, amount 3.
4. A character: anchored Center, depth 80, delay 300 ms.

## Limits

- **Reduce motion:** the parallax is skipped, and the sway and entrances are frozen. The layers just show.
- The layer images are decorative (empty alt text). Put the meaning in real text on or near the scene.
- Large layer images weigh the page down; size them close to how wide they actually show.
