---
sidebar_position: 6
title: Animated Backgrounds
slug: /backgrounds
---

# Animated Backgrounds

:::tip[Try it live]
Preview all **35 effects** in the **[Animated Backgrounds playground](./playground.mdx)** — pick an
effect, tweak its colors / density / speed, and watch it render behind sample content. It runs the
real canvas engine (the shared particle & metaball fields, plus every per-effect builder) and the
verbatim CSS effects, then copies the generated sample.
:::

A living, animated background layered **behind a container's content** — aurora, drifting particles, waves, a mesh gradient, a starfield, and 30+ more.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/backgrounds/)** — an interactive showcase you can explore.

## Where to find it

Animated Backgrounds live on the **Animations** tab: **Add Animation → Ambient → Background Effect**. The card only appears on **container** elements: **Section**, **Bleed Section**, **Masonry Section** and **Row**. Pick an effect from its popover; remove the card (×) to turn it off.

**Layer them:** add the **Background Effect** card again to stack another effect on top, up to **12 layers** per container (for example a gradient with particles over it).

## The effects

**35 effects**, in the same five tabs as the picker:

- **Gradient & Glow:** Aurora · Aurora Borealis · Gradient · Conic · Mesh Gradient · Nebula · Glow Orbs · Cursor Spotlight · Light Rays
- **Particles:** Particles · Confetti · Bubbles · Bokeh · Fireflies · Snow / Petals · Rain · Shooting Stars · Constellation · Starfield
- **Geometric:** Dot Grid · Grid Lines · Hex Grid · Perspective Grid · Halftone · Circuit Board · Topographic
- **Motion & Fluid:** Flow Field · Waves · Ripple · Metaballs · Floating Shapes · Orbits
- **Digital FX:** Matrix Rain · Grain · Scanlines

Each effect exposes a few tasteful controls — typically **one to four colors** (theme color-preset pickers) and a **Speed**, plus effect-specific sliders like **Density**, **Gap**, **Amplitude**, **Angle** or **Radius**. Defaults are set so every effect looks good the moment you pick it.

## Set it up

1. Add or open a **Section** (or Row / Bleed / Masonry Section) → **Animations** tab.
2. Click **Add Animation → Ambient → Background Effect** and pick an effect. (Add the card again to layer another effect.)
3. Adjust the colors and **Speed**; add your content on top as usual.
4. **Save** — the animation renders behind the section content.

## Performance & accessibility

- **Loads only when used** — enqueued only on pages with a background effect.
- **Reduced motion** renders a **static frame** instead of animating.
- **Off-screen pause:** the animation pauses when the section is scrolled out of view and when the tab is hidden.
- **Phones:** honours the engine-wide **Disable heavy effects on mobile** setting (Theme Settings → Site-wide UX → Animation Engine).
