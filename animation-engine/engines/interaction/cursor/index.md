---
sidebar_position: 5
title: Custom Cursor
slug: /cursor
---

# Custom Cursor

:::tip[Try it live]
Move your pointer around the **[Custom Cursor playground](./playground.mdx)** — pick from ~34 live
styles, tweak size / color / trail, toggle hover-grow, magnetic, blend and click FX, and copy the
generated sample. It runs the real per-style runtimes (dot-ring, spring, elastic, comet, particle
pools, swarm trails, rope, sticky, spotlight…).
:::

Replace the mouse pointer with a **custom cursor** across the whole site — from a simple dot-and-ring to trailing comets, gooey metaballs, image-reveal lenses and contextual labels.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/cursor/)** — an interactive showcase you can explore.

## Where to find it

It's **site-wide**: **Theme Settings → Site-wide UX → Cursor**. Turn on **Enable custom cursor** (off by default) and pick a **Style**. There's no per-element cursor setting — but any element can override the *Contextual Label* text with a `data-cursor-label="…"` attribute (Advanced → CSS, or a Code Block).

## Styles

**42 styles**, in the same seven tabs as the picker:

- **Dot & Ring:** Dot · Ring · Dot + Ring · Dual Ring · Dashed Ring · Elastic Ring · Bullseye
- **Targeting:** Crosshair · Brackets · Plus · Camera Reticle · Radar Pulse · Directional Arrow
- **Shapes:** Square · Diamond · Sparkle · Glow · Gradient
- **Trails:** Comet · Particle Trail · Confetti Trail · Motion Streak · Firefly · Bubbles · Afterimage · Word Trail
- **Fluid & Lens:** Blob · Spotlight · Glass Lens · Magnify Lens · Gooey Metaball · Ink Brush · Fluid Smear · Ripple Trail · Image Reveal · Invert Disc
- **Interactive:** Spring Dot · Rubber Band · Sticky Cursor · Contextual Label
- **Custom:** Custom Image · Glyph / Emoji

Every style shares a **Cursor color** (default `#2f74e6`) and a **Size (px)** (4–28, default 8).

Most styles just work; a few reveal extra controls (e.g. **Comet** → **Tail follow**, **Particle Trail** → density, **Dot + Ring** → **Ring trail**, **Elastic Ring** → **Stretchiness**, **Radar Pulse** → **Pulse interval**, **Afterimage** → **Echoes**, **Word Trail** → **Word** and **Font**, **Ink Brush** → **Brush width**, **Glass Lens** → radius & blur, **Contextual Label** → default label & font, **Magnify Lens** → zoom & scope, **Image Reveal** → reveal image & window radius).

## Global options

These apply to any style:

| Option | Notes |
| --- | --- |
| **Cursor color** | Theme color-preset picker (default blue) |
| **Size** | Base cursor size (px) |
| **Grow on hover** | Expands over links / buttons *(default on)* |
| **Magnetic snap** | Eases toward the center of a hovered button / link |
| **Difference blend** | Inverts against whatever's behind it |
| **Click ripple** | An expanding ring wherever you click |
| **Click burst** | A small particle burst on click |
| **Hide the native cursor** | *(default on)* |

## Performance & accessibility

- **Loads only when enabled** and a real style is chosen (never in the admin).
- **Touch:** hard-disabled on touch screens (no hover / coarse pointer).
- **Reduced motion:** trailing and easing collapse to instant.
