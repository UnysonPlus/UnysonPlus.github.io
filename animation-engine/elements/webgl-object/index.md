---
sidebar_position: 9
title: WebGL Object
slug: /webgl-object
---

# WebGL Object

:::tip[Try it live]
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
: Gradient Mesh · Plasma · Aurora · Fluid (pointer-reactive) · Dot Matrix / Halftone · Image Distortion · Image Transitions

**3D Scenes (scroll-driven)**
: Image Tunnel · Gallery Dolly · Product Orbit

Each style reveals its own parameters (e.g. Glass → *Refraction* & *Iridescence*, Liquid Metal → *Metalness* & *Roughness*, Particle Field → *Particle count*, *size* & a *Formation* (sphere / galaxy / ring / wave grid / cloud / helix), Plasma → *Scale/Flow/Contrast*, Image Distortion → an *Image* + *Strength*, **Image Transitions** → a list of *Images* + a *Transition* (fade / ripple / liquid dissolve / displace / wave), *Time per image*, *Transition length* and *Effect strength* — a looping slideshow that melts one image into the next on the GPU).

### Image Tunnel (scroll-driven camera)

A real 3D scene: your **images line a tunnel** and the **camera flies forward through them as the section
scrolls** — the first scroll-scrubbed camera scene in the engine. Drop it in as a Section background (or a
tall inline element), add a set of images, and scrolling past the section dollies the camera down the
corridor; distant images fade into depth fog. Parameters:

- **Images** — the set that lines the tunnel (they repeat to fill the depth).
- **Arrangement** — *Corridor* (images on alternating walls, angled toward you), *Spiral* (wrapped around
  the flight path), or *Straight ahead* (fly through a stack).
- **Image count** — how many planes fill the depth · **Depth spacing** — the gap between them (longer =
  a longer flight) · **Spread** — how far they sit from the centre line · **Image size** · **Depth fog** —
  how quickly far images melt into the background.

It reuses the element's Three.js renderer, the per-page WebGL budget, the mobile/low-power throttle and the
poster/CSS fallback, so it degrades gracefully where WebGL isn't available and respects reduced motion.

### Gallery Dolly (scroll-driven camera)

Images hang on a **gently curved wall** and the **camera glides sideways past them** as you scroll — a walk
down a gallery. Parameters: **Images**, **Image count**, **Rows** (one or two), **Spacing**, **Wall
distance**, **Curve** (bends the wall into a concave arc that hugs the path; 0 = flat), **Image size** and
**Depth fog**.

### Product Orbit (scroll-driven camera)

Your images face outward on a **ring** and the **camera orbits the centre** as you scroll — a turntable
reveal, one image swinging to the front after the next. Parameters: **Images**, **Ring radius**, **Camera
distance** (how far outside the ring the camera sits), **Orbit sweep** (how far around it travels over the
scroll), **Camera tilt**, **Image size** and **Depth fog**.

All three scenes share the same foundation — the element's Three.js renderer, the per-page WebGL budget, the
mobile/low-power throttle and the poster/CSS fallback — so they degrade gracefully and respect reduced motion.

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
