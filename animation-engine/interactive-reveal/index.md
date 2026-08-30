---
sidebar_position: 11.6
title: Interactive Reveal
slug: /interactive-reveal
---

# Interactive Reveal

Stack transparent image **layers** and animate them apart — an **exploded / peel / assemble** product reveal — driven by **scroll, hover, drag or click**, with labelled **hotspots** pinned to the parts. The sibling to [Image Sequence](../image-sequence/index.md) (frame scrub) and [Model Viewer](../model-viewer/index.md) (3D): this is the lightweight **layered-2D** technique — a few PNGs and no library.

## Add it

Builder palette → **Media Elements** → **Interactive Reveal**.

## Layers

Each layer is one transparent **PNG / WebP** part, stacked back-to-front (top of the list = furthest back). At rest they sit together; on reveal each moves by its own amount.

| Per-layer option | Notes |
| --- | --- |
| **Image** | The part (transparent PNG/WebP). |
| **Move X / Y (%)** | Travel at full reveal, as a % of the layer's own size. Negative = left / up. |
| **Rotate (deg)** | Spin as it separates. |
| **Scale change (%)** | Grow (+) or shrink (−) at full reveal. |
| **Fade in on reveal** | Start transparent and fade to full opacity as it moves out. |

**Layers from** can be **Manual** (the list above) or a **Reveal Pack** — see [Reveal Packs](#reveal-packs).

## Hotspots

Labelled pins over the reveal (e.g. *"Neodymium driver"*) that fade in once the reveal passes their **Show at (%)** point. Positions are a % of the box; toggle a **Leader line** between the dot and its label. Labels are real text — good for accessibility and SEO.

## Motion

| Option | Notes |
| --- | --- |
| **Trigger** | **Scroll** (as it passes the viewport) · **Hover** (mouse / focus) · **Drag to scrub** · **Click to toggle** · **Autoplay loop** (pauses off-screen). |
| **Drag axis** | Horizontal or vertical (Drag only). |
| **Scroll behaviour** | *Play in view*, or **Pin & scrub** — holds the reveal full-screen and scrubs it as you scroll through (inline placement). |
| **Pin length (screens)** | How much scrolling the pinned reveal spans. |
| **Reverse** | Play exploded → assembled instead. |
| **Rest state (%)** | How separated the layers sit before the trigger runs. |
| **Speed (ms)** | Transition time for Hover / Toggle / Autoplay. |

## Placement

| Option | Notes |
| --- | --- |
| **Inline** | Flows in the content (default). |
| **Section background** | Fills the parent Section behind its content — set the Section to `position: relative`. |
| **Foreground overlay** | Sits in front of the content. |
| **Pointer events** | **Decorative** lets clicks pass through to content behind (use for Background / scroll). **Interactive** captures the pointer — required for Hover / Drag / Click, but blocks clicks under the overlap. |

Plus **Aspect ratio**, **Height**, **Max width**, **Alignment** and **Background**.

## Reveal Packs

Frames and layer sets can pile up fast, so Interactive Reveal (and Image Sequence) can pull assets from a **Reveal Pack** — a folder under `wp-content/uploads/unysonplus/reveal/` that **never touches the Media Library**.

- Manage packs at **Media → Reveal Packs**: upload a `.zip` of layer images, see the installed packs, delete them.
- A `pack.json` manifest (name, poster, and each layer's default offset) is optional — without one, a **radial auto-spread** is generated for you.
- A bundled **Demo Gadget** pack is installed automatically so you can try the element straight away (Layers from → **Reveal Pack**).

## Set it up

1. Export your product's parts as **transparent PNGs** (one per layer), roughly aligned on the same canvas.
2. Add **Interactive Reveal** → add the parts as **Layers** (or upload them as a **Reveal Pack**).
3. Give each layer a **Move / Rotate / Scale / Fade**, pick a **Trigger**, and add **Hotspots**.
4. **Save** — the parts sit assembled at rest and reveal on the trigger.

## Performance & accessibility

- Transform-only animation (translate / rotate / scale / opacity) on the compositor — no layout thrash; loads only on pages that use it.
- The **scroll** trigger rides the shared frame scheduler so it stays in lockstep with smooth scroll and the other scroll effects.
- **Reduced motion** renders the **fully-revealed static state** (internals + all hotspots visible) — the information without the movement.
- Drag suppresses page scrolling only while you're scrubbing; hotspot labels stay keyboard-focusable.
