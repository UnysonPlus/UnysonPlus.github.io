---
sidebar_position: 1
title: Overview
slug: /animation-engine
---

# Animation Engine

The **Animation Engine** is a bundled UnysonPlus extension that turns the page builder into a full motion platform — scroll-driven animation, hover interactions, physics, a custom cursor, animated backgrounds, kinetic text, page transitions, and real-time 3D/WebGL/SVG elements. No code.

:::info It ships **off** by default
The engine is included with UnysonPlus but **inactive** until you switch it on: **WP Admin → UnysonPlus → Extensions → Animation Engine → Activate**. Keeping it off means none of its assets or options exist on sites that don't need them.

The one exception is [Entrance Animation](/docs/animations/entrance-animation) (Animate.css) — that's part of core and always available, engine or not.
:::

## What it adds

Once active, the engine adds effects in three places:

### On every element's *Animations* tab
Open any Section, Column or element → **Animations** tab:

| Capability | What it does |
| --- | --- |
| [Scroll Motion (GSAP)](/docs/animations) | Reveal, stagger, split-text, parallax, pin, scrub and more — scroll-linked motion via GSAP + ScrollTrigger |
| [Hover Interactions](./hover.md) | Pointer-driven effects — magnetic pull, 3D tilt, spotlight, image reveal, and more |
| [Physics Effects](./physics.md) | Spring/verlet motion — drag & throw, float, gravity, jelly, and 22 others |
| [Text Effects](./text-effects.md) | Kinetic typography — split reveals, scramble, typewriter, gradient, glitch, count-up, and dozens more |

### On containers (Sections / Rows) — *Styling* tab
| Capability | What it does |
| --- | --- |
| [Animated Backgrounds](./backgrounds.md) | A living background layered behind a container — aurora, particles, waves, mesh gradient, and 30+ more |

### Site-wide — *Theme Settings → Animations*
| Capability | What it does |
| --- | --- |
| [Custom Cursor](./cursor.md) | Replace the pointer with a custom cursor site-wide — 40+ styles |
| [Page Transitions](./page-transitions.md) | Full-screen transitions between pages — fade, slide, curtain, iris, and 20 more |

### New elements (builder palette → *Media Elements*)
| Element | What it does |
| --- | --- |
| [WebGL Object](./webgl-object.md) | Real-time WebGL — glass blob, liquid metal, shaders (Three.js) |
| [Model Viewer](./model-viewer.md) | Interactive 3D glTF/GLB models, with AR |
| [SVG Draw](./svg-draw.md) | Self-drawing line art that traces itself on scroll |

## Performance & accessibility

The engine is built to stay out of the way:

- **Loads only where used.** Every effect's CSS/JS is enqueued **only on pages that actually use it** — a page with no effects ships zero of these bytes. Heavy libraries (GSAP, Three.js, model-viewer) are vendored and load only for the pages that need them.
- **Reduced motion.** Everything respects `prefers-reduced-motion: reduce`, gated by the engine-wide **Respect reduced motion** setting (Theme Settings → Animations, default on). Effects fall back to a static frame or plain content.
- **Touch aware.** Pointer-driven effects (Hover, Cursor, pointer-following Physics) are skipped on touch screens, and an engine-wide **Disable on mobile** setting can turn motion off on phones.
- **Off-screen pause.** Continuous effects (backgrounds, ambient physics) pause when scrolled out of view and when the tab is hidden.
- **Editor-safe & flash-free.** Effects are suppressed in the builder canvas and use guards so there's no flash of un-animated content.

:::tip Global settings
**Theme Settings → Animations** has a sub-tab per module (Physics, Interactions, Backgrounds, Text, Cursor, Page Transitions) with a master on/off, plus the engine-wide **Respect reduced motion** and **Disable on mobile** toggles.
:::
