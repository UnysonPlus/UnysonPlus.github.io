---
sidebar_position: 2
title: Motion vocabulary
slug: /3d-motion-roadmap/terminology
description: Plain-language definitions of scrub, pin, scrollytelling, motion timeline, real 3D vs CSS 3D, shaders, particles and more.
---

# Motion vocabulary

"3D motion" is a fuzzy phrase that covers several very different techniques. Here's the working
vocabulary — because the words map directly to the tools and the roadmap.

## Scroll-driven animation (the umbrella)

Any animation whose progress is tied to the **scroll position** rather than to a clock.

- **Scrollytelling / beats** — a page that advances through discrete "beats" of a story as you
  scroll: text scrolls past a pinned visual that changes per beat.
- **Scrub** — the animation's playhead is wired directly to the scrollbar. Scroll down plays it
  forward; scroll up rewinds it, frame-for-frame. This is what makes a camera move feel *controlled
  by scroll*.
- **Pin** — an element is frozen in place for a set scroll distance while things animate over or
  through it.
- **The premium recipe = pin + scrub + a sequenced timeline.** A section locks, a choreographed
  timeline plays across the pinned range, then releases. Almost every high-end scroll section is
  this.

:::tip You can already do this
[Scroll Motion](/animation-engine/) gives you genuine pin + scrub, and
[Scroll Story](/animation-engine/scrollytelling) gives you the pinned, beat-based cinematic stage.
:::

## Motion timeline

A tool concept: the ability to **sequence and keyframe several animated properties on one shared
time axis** — like After Effects or a video editor — with an easing curve per keyframe. Two flavours:

- **Code timeline** — you write the sequence in JavaScript (GSAP's `gsap.timeline()`). This is the
  reference implementation, and the engine already uses it internally.
- **Visual timeline / sequencer** — a GUI with tracks, keyframes and easing handles you scrub and
  edit live (like Theatre.js Studio, Rive's editor, or Spline's timeline). "Proper motion timeline"
  usually means this kind.

## Real 3D vs "CSS 3D"

- **Real 3D (WebGL)** — a GPU-rendered scene on a `<canvas>`: real geometry, lights, cameras,
  materials and shaders. True depth, reflections, particle clouds. Costs GPU and battery. This is
  what [WebGL Object](/animation-engine/webgl-object) and [Model Viewer](/animation-engine/model-viewer)
  use.
- **CSS 3D ("fake 3D")** — DOM elements tilted in a perspective box with `transform: rotate3d /
  translateZ`. Cheap, accessible, perfect for card flips, tilt, layered parallax depth and
  turntable-style rings — but they're flat planes in perspective, not a rendered scene. The
  [3D Gallery](/animation-engine/3d-gallery) and [Flip Card](/animation-engine/flip-card) live here.

<figure role="group" aria-label="Real 3D versus CSS 3D, compared" style="margin:1.5rem 0;">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cmp-t cmp-d" style="width:100%;height:auto;max-width:760px;font-family:var(--ifm-font-family-base, system-ui, sans-serif);">
<title id="cmp-t">Real 3D versus CSS 3D</title>
<desc id="cmp-d">CSS 3D is flat planes tilted in a perspective box — cheap and accessible, good for cards, tilt and rings. Real 3D (WebGL) is a camera moving through real geometry — true depth, lighting and reflections.</desc>
<rect x="8" y="12" width="356" height="276" rx="14" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<rect x="396" y="12" width="356" height="276" rx="14" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="186" y="46" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ifm-font-color-base)">CSS 3D — "fake" depth</text>
<polygon points="150,92 250,74 268,120 168,142" fill="#2F74E6" opacity="0.32"/>
<polygon points="140,120 240,102 258,148 158,170" fill="#2F74E6" opacity="0.55"/>
<polygon points="130,150 230,132 248,178 148,200" fill="#2F74E6" opacity="0.85"/>
<text x="186" y="238" text-anchor="middle" font-size="12.5" fill="var(--ifm-color-emphasis-800)">Flat planes tilted in a perspective box</text>
<text x="186" y="262" text-anchor="middle" font-size="11" fill="var(--ifm-color-emphasis-600)">Cheap · accessible · cards, tilt, rings</text>
<text x="574" y="46" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ifm-font-color-base)">Real 3D (WebGL)</text>
<line x1="470" y1="188" x2="712" y2="188" stroke="var(--ifm-color-emphasis-300)" stroke-width="1.5" stroke-dasharray="4 5"/>
<rect x="440" y="126" width="34" height="28" rx="4" fill="#7C4DFF"/>
<polygon points="474,132 490,124 490,156 474,148" fill="#7C4DFF"/>
<path d="M494,140 C540,116 585,176 632,150" fill="none" stroke="#7C4DFF" stroke-width="2.5" stroke-dasharray="5 5" marker-end="url(#cmp-arrow)"/>
<polygon points="612,112 640,124 612,136 584,124" fill="#0FA36B" opacity="0.9"/>
<polygon points="584,124 612,136 612,170 584,158" fill="#0FA36B" opacity="0.6"/>
<polygon points="612,136 640,124 640,158 612,170" fill="#0FA36B" opacity="0.75"/>
<circle cx="678" cy="152" r="22" fill="#0FA36B"/>
<circle cx="670" cy="144" r="7" fill="#ffffff" opacity="0.4"/>
<text x="574" y="238" text-anchor="middle" font-size="12.5" fill="var(--ifm-color-emphasis-800)">A camera moving through real geometry</text>
<text x="574" y="262" text-anchor="middle" font-size="11" fill="var(--ifm-color-emphasis-600)">True depth · lighting · reflections</text>
<circle cx="380" cy="150" r="19" fill="var(--ifm-background-color)" stroke="var(--ifm-color-emphasis-300)" stroke-width="1.5"/>
<text x="380" y="155" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ifm-color-emphasis-700)">vs</text>
<defs>
<marker id="cmp-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#7C4DFF"/></marker>
</defs>
</svg>
<figcaption style="text-align:center;font-size:.85rem;color:var(--ifm-color-emphasis-600);margin-top:.5rem;">Both are legitimate — CSS 3D gives lots of "depth" for almost no cost; real WebGL is reserved for the moments that truly need a rendered scene.</figcaption>
</figure>

Both are legitimate. CSS 3D delivers a lot of "depth" for almost no performance cost; real WebGL is
reserved for the moments that truly need a rendered scene.

## The rest of the words

| Term | What it means |
| --- | --- |
| **Camera moves** | Dolly (push in/out), pan, orbit, fly-through. Scrubbing a WebGL camera along a path = the "cinematic scroll." |
| **Parallax** | Background layers move slower than foreground for a sense of depth. |
| **Particles** | Many small sprites driven by math/physics — dust, sparks, morphing point clouds. |
| **Shaders (GLSL)** | Tiny GPU programs that create distortion, liquid/gooey, gradient-mesh and image-transition effects. |
| **Physics** | Spring/inertia simulation — weighty cursor followers, magnetic buttons, draggable momentum. |
| **Page transitions** | Animating between pages instead of a hard reload (fade / slide / morph). |

Next: [what the engine can do with all of this today →](./current-capabilities)
