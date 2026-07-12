---
sidebar_position: 6
title: Animated Backgrounds
slug: /backgrounds
---

# Animated Backgrounds

:::tip Try it live
Preview all **35 effects** in the **[Animated Backgrounds playground](./playground.mdx)** — pick an
effect, tweak its colors / density / speed, and watch it render behind sample content. It runs the
real canvas engine (the shared particle & metaball fields, plus every per-effect builder) and the
verbatim CSS effects, then copies the generated sample.
:::

A living, animated background layered **behind a container's content** — aurora, drifting particles, waves, a mesh gradient, a starfield, and 30+ more.

## Where to find it

Animated Backgrounds live on the **Styling tab**, right next to the normal **Background** control — on **container** elements only: **Section**, **Bleed Section**, **Masonry Section** and **Row**. Pick a **Background Effect** from the popover; leave it on **None** for none.

Global on/off: **Theme Settings → Site-wide UX → Backgrounds**.

## The effects

**36 effects.** A sampler by family:

- **Gradients & light:** Aurora · Gradient · Mesh Gradient · Conic · Glow Orbs · Light Rays · Nebula · Aurora Borealis · Cursor Spotlight
- **Particles & weather:** Particles · Constellation · Starfield · Snow / Petals · Confetti · Bubbles · Fireflies · Bokeh · Rain · Shooting Stars · Floating Shapes
- **Grids & geometry:** Dot Grid · Grid Lines · Perspective Grid · Hex Grid · Topographic · Circuit Board · Halftone
- **Waves & fluids:** Waves · Metaballs · Ripple · Flow Field
- **Tech / texture:** Grain · Scanlines · Matrix Rain · Orbits

Each effect exposes a few tasteful controls — typically **one to four colors** (theme color-preset pickers) and a **Speed**, plus effect-specific sliders like **Density**, **Gap**, **Amplitude**, **Angle** or **Radius**. Defaults are set so every effect looks good the moment you pick it.

## Set it up

1. Add or open a **Section** (or Row / Bleed / Masonry Section) → **Styling** tab.
2. Set **Background Effect** to an effect.
3. Adjust the colors and **Speed**; add your content on top as usual.
4. **Save** — the animation renders behind the section content.

## Performance & accessibility

- **Loads only when used** — enqueued only on pages with a background effect.
- **Reduced motion** renders a **static frame** instead of animating.
- **Off-screen pause:** the animation pauses when the section is scrolled out of view and when the tab is hidden.
- **Touch:** honours the engine-wide **Disable on mobile** setting.
