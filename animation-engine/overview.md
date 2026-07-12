---
sidebar_position: 1
title: Overview
slug: /
---

# Animation Engine

The **Animation Engine** is a bundled UnysonPlus extension that turns the page builder into a full motion platform — scroll-driven animation, hover interactions, physics, a custom cursor, animated backgrounds, kinetic text, page transitions, and real-time 3D/WebGL/SVG elements. No code.

:::info It ships **off** by default
The engine is included with UnysonPlus but **inactive** until you switch it on: **WP Admin → UnysonPlus → Extensions → Animation Engine → Activate**. Keeping it off means none of its assets or options exist on sites that don't need them.

The one exception is [Entrance Animation](/animation-engine/entrance-animation) (Animate.css) — that's part of core and always available, engine or not.
:::

## What it adds

Once active, the engine adds effects in three places:

### On every element's *Animations* tab
Open any Section, Column or element → **Animations** tab:

| Capability | What it does |
| --- | --- |
| [Hover Interactions](./hover/index.md) | Pointer-driven effects — magnetic pull, 3D tilt, spotlight, image reveal, and more |
| [Physics Effects](./physics/index.md) | Spring/verlet motion — drag & throw, float, gravity, jelly, and 22 others |
| [Text Effects](./text-effects/index.md) | Kinetic typography — split reveals, scramble, typewriter, gradient, glitch, count-up, and dozens more |
| [Parallax Depth Layers](./parallax/index.md) | Multi-layer pointer/scroll depth — mark a Scene, give each child a Depth |
| [Marquee](./marquee/index.md) | A seamless ticker for any element's content — running text (incl. a true curved arc), logos, images; warp, drag, scroll-reactive |
| [3D Flip Card](./flip-card/index.md) | Flip any element in 3D to a back face — seven styles (flip, cube, fold, door, diagonal, pop, carousel); hover / click / scroll / auto |
| [Scroll Text Highlight](./scroll-text-highlight.md) | Light up text word-by-word as it scrolls through view — fill, fade, blur or marker sweep |
| [Motion Path](./motion-path/index.md) | Send an element travelling along a path — 37 shapes (wave, loop, spiral, star, stairs…) or a custom SVG path; drive by scroll, loop or on-view, with align-to-path |
| [Scroll Reveal](./scroll-reveal/index.md) | Un-mask an element as it scrolls into view — a clip-path wipe (up/down/left/right/iris/diagonal) or a Canvas "Pixelate In" for images |
| [Scroll Color Shift](./scroll-color-shift.md) | Section-level — the page background morphs section-to-section as you scroll |
| [Preloader](./preloader/index.md) | Site-wide loading screen shown until the page is ready, then animated away — spinner, bar, dots, counter, curtain, logo |

:::tip Adding animations — the inserter
The **Animations** tab is an **"Add Animation" inserter**. It starts empty with a **+ Add Animation** button — click it to browse a searchable, category-tabbed grid of effects (Entrance, Scroll, Pointer, Physics, Motion, Text) and pick one. It drops in as a configurable **card**, and you can **stack several** on one element (e.g. an Entrance *and* a Hover *and* a Scroll effect). Some modules (like **Hover**) can even be added **more than once** to combine their effects — Lift *and* Ripple together. Remove a card with its **×**. Effects you haven't added take no space, so the tab stays tidy no matter how many modules are installed.
:::

### On Sections
| Capability | What it does |
| --- | --- |
| [Animated Backgrounds](./backgrounds/index.md) *(Styling tab)* | A living background layered behind a container — aurora, particles, waves, mesh gradient, and 30+ more |
| [Infinite Scroll Loop](./scroll-loop.md) *(Animations tab)* | Loop full-height sections into a seamless, never-ending scroll (Lenis) |
| [Scrollytelling](./scrollytelling.md) *(Animations tab)* | Pin one column as a media panel while the other's steps scroll — the media transitions per step (29 styles) |

### Site-wide — *Theme Settings → Site-wide UX*
| Capability | What it does |
| --- | --- |
| [Custom Cursor](./cursor/index.md) | Replace the pointer with a custom cursor site-wide — 40+ styles |
| [Page Transitions](./page-transitions/index.md) | Full-screen transitions between pages — fade, slide, curtain, iris, and 20 more |
| [Scroll Progress](./scroll-progress/index.md) | A reading-progress indicator — 16 styles: bars, corner ring/gauge/battery, %-counter, reading-time, or section scroll-spy dots |

### New elements (builder palette → *Media Elements*)
| Element | What it does |
| --- | --- |
| [WebGL Object](./webgl-object.md) | Real-time WebGL — glass blob, liquid metal, shaders (Three.js) |
| [Model Viewer](./model-viewer.md) | Interactive 3D glTF/GLB models, with AR |
| [SVG Draw](./svg-draw/index.md) | Self-drawing line art that traces itself on scroll |
| [Image Sequence](./image-sequence.md) | Scroll-scrubbed frame playback — the product-reveal effect |

## Combining & stacking effects

There are two different ways to layer motion on one element:

**1. Combine *different* modules** — always available. Any element can carry several effects from different modules at once, each its own card: e.g. an **Entrance** animation *and* a **Hover** interaction *and* a **Scroll Reveal**. Just add each from the inserter.

**2. Stack *the same* module** — add one module more than once to combine its own effects. Its inserter tile stays available after you add it, so clicking it again drops a second configurable card. This only exists where the effects genuinely layer without fighting:

| Module | Stackable? | Notes |
| --- | --- | --- |
| **Hover Interaction** | ✅ Yes | Combine independent effects on one element — e.g. **Lift + Ripple + Glow Border**. Add Hover as many times as you like; each card picks a different effect and they all run together. One tip: two *motion* effects (Magnetic / 3D Tilt / Lift) fight over the element's transform, so pick one of those plus any number of decorations (Glow, Spotlight, Ripple, Underline, Color Shift, Image Reveal, Scramble). |
| Entrance, Scroll Effect, Physics, Parallax, Marquee, Text Effect, Scroll Reveal, 3D Flip Card | ❌ One per element | A second instance would fight the first over the same CSS property (transform / clip-path) or rebuild the same content, so these are single by design — their tile leaves the grid once added. |
| Sticky Card Stack, Horizontal Scroll, Infinite Scroll Loop | ❌ One per Section | Section-level — each targets the whole section's cards or scroll, so only one arrangement is possible. |

:::note Why not stack everything?
Stacking is offered only where it's genuinely useful. Forcing it on effects that share the same `transform`/`clip-path` or rebuild the same DOM would just make them clobber each other — so those stay one-per-element on purpose. **Hover** is the natural fit because its effects are independent layers.
:::

## Performance & accessibility

The engine is built to stay out of the way:

- **Loads only where used.** Every effect's CSS/JS is enqueued **only on pages that actually use it** — a page with no effects ships zero of these bytes. Heavy libraries (GSAP, Three.js, model-viewer) are vendored and load only for the pages that need them.
- **Reduced motion.** Everything respects `prefers-reduced-motion: reduce`, gated by the engine-wide **Respect reduced motion** setting (Theme Settings → Site-wide UX, default on). Effects fall back to a static frame or plain content.
- **Touch aware.** Pointer-driven effects (Hover, Cursor, pointer-following Physics) are skipped on touch screens, and an engine-wide **Disable on mobile** setting can turn motion off on phones.
- **Off-screen pause.** Continuous effects (backgrounds, ambient physics) pause when scrolled out of view and when the tab is hidden.
- **Editor-safe & flash-free.** Effects are suppressed in the builder canvas and use guards so there's no flash of un-animated content.

:::tip Control lives in the inserter
Effects are added **per element** from the **Add Animation** inserter — there's no global on/off panel to keep in sync, and nothing loads on a page that doesn't use it. Theme Settings → Site-wide UX keeps only the engine-wide **Engine** sub-tab (**Respect reduced motion**, **Disable on mobile**) plus the site-wide config tabs (**Cursor**, **Page Transitions**, **Scroll Progress**).
:::

:::tip Build your own
The engine is extensible — add your **own effect or module** from your child theme's `functions.php` and it shows up in the inserter automatically. See **[Add your own module / effect](./custom-modules.md)**.
:::
