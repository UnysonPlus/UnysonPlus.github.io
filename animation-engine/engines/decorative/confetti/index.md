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

**26 styles** in four groups:

| Group | Styles | Best on |
| --- | --- | --- |
| **Classic** | Confetti · Stars · Fireworks · Streamers · Hearts · Snow | Flat or illustrated backgrounds |
| **Realistic & Foil** | Realistic Confetti · Gold Foil · Silver Foil · Rose Gold · Holographic · Triangles · Hexagons · Money · Serpentine | Photos: 3D tumbling paper with sheen and shadow |
| **Nature** | Sakura Petals · Autumn Leaves · Realistic Snow · Rain | Seasonal pages |
| **Glow & Sparkle** | Glitter · Bokeh · Fairy Dust · Fireflies · Embers · Champagne · Bubbles | Dark backgrounds (soft additive light) |

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

## Example

A "You're on the list!" heading after a sign-up: **Confetti → Gold Foil**, **Fire on: Page load**, Particle count 140, Spread 120. On a pricing card, use **Fire on: Click** and **Hover** together so the burst follows the visitor.

## Limits

- **Reduce motion:** visitors who ask for less motion see no burst.
- Very high counts (300+) can drop frames on slow phones; 60–150 is plenty for most uses. The drawing loop sleeps whenever no particles are alive.
- The burst is decoration only: its canvas lets clicks through and is hidden from screen readers.
