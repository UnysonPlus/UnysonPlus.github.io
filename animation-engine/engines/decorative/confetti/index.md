---
sidebar_position: 5
title: Confetti
slug: /confetti
description: A celebratory particle burst fired from any element on scroll, click, page load or hover. 26 styles, from flat confetti to gold foil, sakura petals and fireflies.
---

# Confetti

**Confetti** fires a celebratory burst of particles from an element: when it scrolls into view, when it is clicked, when the page loads or when it is hovered. Use it on a "Thank you" message, a pricing card, a launch announcement or a sign-up button.

It draws on one shared canvas over the page, with no library, and loads only on pages that use it.

## Where to find it

Open any element (or Section / Column) → **Animations** → **Add Animation** → **Ambient** → **Confetti**. Pick a style; its options appear underneath. Remove it with the card's **×**.

## Styles

**26 styles** in four groups, plus **5 Bursts** (below):

| Group | Styles | Best on |
| --- | --- | --- |
| **Classic** | Confetti · Stars · Fireworks · Streamers · Hearts · Snow | Flat or illustrated backgrounds |
| **Realistic & Foil** | Realistic Confetti · Gold Foil · Silver Foil · Rose Gold · Holographic · Triangles · Hexagons · Money · Serpentine | Photos: 3D tumbling paper with sheen and shadow |
| **Nature** | Sakura Petals · Autumn Leaves · Realistic Snow · Rain | Seasonal pages |
| **Glow & Sparkle** | Glitter · Bokeh · Fairy Dust · Fireflies · Embers · Champagne · Bubbles | Dark backgrounds (soft additive light) |
| **Bursts** | Ring, sparks and lines · Ring · Sparks · Lines · Confetti pop | Buttons and icons: a quick pop on click or hover |

## Options

Every style shares the same options:

| Option | Default | What it does |
| --- | --- | --- |
| **Fire on** | Scroll into view | What sets off the burst. Pick one or more: **Scroll into view**, **Click**, **Page load**, **Hover**. |
| **Particle count** | 90 | How many particles (20–400). |
| **Spread (°)** | 70 | How wide the burst fans out (20–360; 360 = all directions). |
| **Power** | 45 | How fast the particles launch (15–100). |
| **Lifetime (s)** | 3 | How long each particle lives (1–7 s). |
| **Colours** | Brand | Brand · Rainbow · Gold · Pastel · Monochrome · Silver · Natural. Used by the colour-flexible styles; themed styles (Gold Foil, Sakura, Embers…) keep their own colours. |
| **Replay on scroll** | Off | Fire again every time the element comes back into view (Scroll into view trigger). |

## Bursts

A **burst** is a short pop from the centre of the element: a **Ring** that grows and fades, **Sparks** that fly out
and shrink, **Lines** that shoot out, all three together (**Ring, sparks and lines**), or a small **Confetti pop**.
It lasts a fraction of a second, so it suits a button (a "Like", "Add to cart" or "Subscribe" press) or an icon.
Bursts have their own options:

| Option | Default | What it does |
| --- | --- | --- |
| **Fire on** | Click | As above: Click, Hover, Page load, Scroll into view. |
| **Rays / sparks** | 10 | How many rays or sparks (3–60). The confetti pop throws three times as many pieces. |
| **Size (px)** | 70 | How far the burst reaches from the centre of the element (10–400). |
| **Duration (s)** | 0.6 | How long it plays (0.15–3). |
| **Thickness (px)** | 3 | The width of the ring and the lines, and the size of the sparks (1–16). |
| **Colours** | Brand | The colour set, as above. |
| **One colour** | — | Optional: the whole burst in one colour (the swatches are your Theme Settings colours). |

A burst can also be a **step in an Interaction** (Do → **Burst from it**), so it can go with other steps: a button
that presses in and then bursts, an icon that grows and sparkles on hover. See
[Interactions → Burst steps](/animation-engine/interactions#burst-steps).

**→ [See them on the Interactions demo page](https://demos.unysonplus.com/animation-engine/interactions/)** (scroll to *Bursts*).

## Example

A "You're on the list!" heading after a sign-up: **Confetti → Gold Foil**, **Fire on: Page load**, Particle count 140, Spread 120. On a pricing card, use **Fire on: Click** and **Hover** together so the burst follows the visitor.

## Limits

- **Reduce motion:** visitors who ask for less motion see no burst (and no Burst step).
- A burst is drawn over the page at the element's centre; it follows the element if the page scrolls while it plays.
- Very high counts (300+) can drop frames on slow phones; 60–150 is plenty for most uses. The drawing loop sleeps whenever no particles are alive.
- The burst is decoration only: its canvas lets clicks through and is hidden from screen readers.
