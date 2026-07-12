---
sidebar_position: 9
title: WebGL Object
slug: /webgl-object
---

# WebGL Object

:::tip Try it live
Spin up real WebGL in the **[WebGL Object playground](./playground.mdx)** — switch between the glass
blob, liquid metal, distorted sphere, particle field and the full-screen shaders (gradient mesh,
plasma, aurora, fluid, dots); recolour them and tune the material / shader params, noise, auto-rotate,
pointer-follow and scroll-link. It runs the real Three.js runtime.
:::

A real-time **WebGL** element — a glass blob, liquid metal, a distorted sphere, a particle field, or a full-screen shader — that reacts to the pointer and scroll. Built on **Three.js** (vendored, loaded only when the element is on the page).

## Add it

Builder palette → **Media Elements** → **WebGL Object**.

## Styles

Pick a **Style** — two families:

**3D Objects**
: Glass Blob · Liquid Metal · Distorted Sphere · Particle Field

**Shaders (full-screen)**
: Gradient Mesh · Plasma · Aurora · Fluid (pointer-reactive) · Dot Matrix / Halftone · Image Distortion

Each style reveals its own parameters (e.g. Glass → *Refraction* & *Iridescence*, Liquid Metal → *Metalness* & *Roughness*, Particle Field → *Particle count* & *size*, Plasma → *Scale/Flow/Contrast*, Image Distortion → an *Image* + *Strength*).

## Options by tab

| Tab | What you configure |
| --- | --- |
| **Object** | Style + its params · Object size · Placement (inline element with a Height, or as a Section background) |
| **Appearance** | Primary / Secondary color · Background (transparent / solid / gradient) |
| **Motion** | Auto-rotate speed · Wobble amount & speed · React to scroll |
| **Interaction** | Follow pointer · Pointer strength · Parallax |
| **Performance** | Quality (Auto / High / Low) · Pixel-ratio cap (1× / 1.5× / 2×) · **Fallback image** |

## Performance & accessibility

- **Loads only when used** — `three.min.js` is enqueued only on pages with a WebGL Object.
- **Quality: Auto** lowers detail (and drops glass transmission) on weak or mobile GPUs.
- **Reduced motion / no WebGL:** the **Fallback image** is shown instead.
- Colors accept theme palette presets (resolved to a hex, since WebGL can't read CSS variables).
