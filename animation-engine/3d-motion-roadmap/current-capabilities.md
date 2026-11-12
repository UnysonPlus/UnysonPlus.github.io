---
sidebar_position: 3
title: What the engine does today
slug: /3d-motion-roadmap/current-capabilities
description: An accurate map of the Animation Engine's current motion capabilities, grouped by scope.
---

# What the engine does today

An accurate map of what already exists, grouped by scope. The point of this page: the base is broad,
which is exactly why the [focus areas](./focus-areas) are so specific.

<figure role="group" aria-label="The Animation Engine's capabilities grouped by scope" style="margin:1.5rem 0;">
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cm-t cm-d" style="width:100%;height:auto;max-width:760px;font-family:var(--ifm-font-family-base, system-ui, sans-serif);">
<title id="cm-t">Animation Engine capabilities by scope</title>
<desc id="cm-d">Node-level effects on every element; section-level orchestration; site-wide effects; and real 3D and special elements.</desc>
<line x1="380" y1="110" x2="380" y2="186" stroke="var(--ifm-color-emphasis-300)" stroke-width="2"/>
<line x1="380" y1="234" x2="380" y2="310" stroke="var(--ifm-color-emphasis-300)" stroke-width="2"/>
<line x1="230" y1="210" x2="318" y2="210" stroke="var(--ifm-color-emphasis-300)" stroke-width="2"/>
<line x1="442" y1="210" x2="530" y2="210" stroke="var(--ifm-color-emphasis-300)" stroke-width="2"/>
<rect x="318" y="186" width="124" height="48" rx="24" fill="var(--ifm-color-primary)"/>
<text x="380" y="205" text-anchor="middle" font-size="12.5" font-weight="700" fill="#ffffff">Animation</text>
<text x="380" y="222" text-anchor="middle" font-size="12.5" font-weight="700" fill="#ffffff">Engine</text>
<rect x="250" y="20" width="260" height="90" rx="12" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="270" y="50" font-size="12" font-weight="700" letter-spacing="0.4" fill="#2F74E6">NODE-LEVEL — every element</text>
<text x="270" y="74" font-size="11.5" fill="var(--ifm-color-emphasis-700)">Scroll Motion · Hover · Interactions</text>
<text x="270" y="94" font-size="11.5" fill="var(--ifm-color-emphasis-700)">Text FX · Physics · Reveal · Confetti</text>
<rect x="20" y="165" width="210" height="90" rx="12" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="34" y="193" font-size="12" font-weight="700" fill="#7C4DFF">SECTION-LEVEL</text>
<text x="34" y="217" font-size="11" fill="var(--ifm-color-emphasis-700)">Scrollytelling · Card Stack</text>
<text x="34" y="236" font-size="11" fill="var(--ifm-color-emphasis-700)">Horizontal · Backgrounds</text>
<rect x="530" y="165" width="210" height="90" rx="12" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="544" y="193" font-size="12" font-weight="700" fill="#B26A00">3D &amp; SPECIAL</text>
<text x="544" y="217" font-size="11" fill="var(--ifm-color-emphasis-700)">WebGL Object · Model Viewer</text>
<text x="544" y="236" font-size="11" fill="var(--ifm-color-emphasis-700)">Motion Gallery · Image Sequence</text>
<rect x="250" y="310" width="260" height="90" rx="12" fill="var(--ifm-color-emphasis-100)" stroke="var(--ifm-color-emphasis-200)"/>
<text x="270" y="340" font-size="12" font-weight="700" fill="#0FA36B">SITE-WIDE</text>
<text x="270" y="364" font-size="11.5" fill="var(--ifm-color-emphasis-700)">Cursor · Page Transitions</text>
<text x="270" y="384" font-size="11.5" fill="var(--ifm-color-emphasis-700)">Preloader · Scroll Progress · Smooth Scroll</text>
</svg>
<figcaption style="text-align:center;font-size:.85rem;color:var(--ifm-color-emphasis-600);margin-top:.5rem;">The engine adds motion in four places — on every element, across a section, site-wide, and as real 3D / special elements.</figcaption>
</figure>

## The core it's built on

| Foundation | What it powers |
| --- | --- |
| **GSAP + ScrollTrigger + SplitText** | The industry-standard animation core — drives [Scroll Motion](/animation-engine/scroll-motion)'s scrub, pin and text reveals. |
| **Three.js (real WebGL)** | [WebGL Object](/animation-engine/webgl-object) — refractive glass/metal objects, particle systems, full-screen shaders. |
| **Google `<model-viewer>`** | [Model Viewer](/animation-engine/model-viewer) — glTF/GLB models with orbit, HDR lighting, and AR. |
| **Lenis smooth-scroll** | Site-wide [Smooth Scroll](/animation-engine/smooth-scroll) and [Scroll Loop](/animation-engine/scroll-loop) — momentum scrolling and seamless section scroll, sharing one Lenis instance. |

## On every element's *Animations* tab

- **Scroll Motion** — genuine scroll **scrub**, **pin** (with pin length), parallax, velocity-skew,
  colour-scrub, count-ups, and SplitText staggers, plus an advanced tier with curated easing curves.
- **[Scroll Keyframes](/animation-engine/scroll-keyframes)** — the builder's mini motion timeline: move
  any element through Start / Middle / End keyframed states as you scroll, each with its own easing,
  auto-driven from a Scrollytelling Full-screen Stage or the element's own viewport travel. Also a
  one-click **Pin · Hold · Exit** choreography.
- **[Entrance](/animation-engine/entrance-animation)** and **[Exit](/animation-engine/exit-animation)**
  animations (core) — 56 entrances and 43 exits, with the entrance replaying when the element comes back.
- **[Interactions](/animation-engine/interactions)** and **[States](/animation-engine/states)** — a
  hover, click, load, in-view or scrolled-past trigger that animates this element *and others*, named
  states for tabs and drawers, per-device amounts and site-wide reuse by class.
- **[Hover Interactions](/animation-engine/hover)** — 43 pointer effects: spotlight, lift, 3D
  tilt, magnetic pull, glow-border, glitch, text-scramble, WebGL image displace — stackable.
- **[Text Effects](/animation-engine/text-effects)** — kinetic typography: shimmer, typewriter,
  scramble, wave, split reveals, glitch, variable-font weight, 3D flip.
- **[Physics](/animation-engine/physics)** — spring/verlet motion: drag & throw, slingshot, float,
  orbit, gravity, jelly.
- **[Scroll Reveal](/animation-engine/scroll-reveal)** (22 clip-path, pixelate and dissolve reveals),
  **[Scroll Text Highlight](/animation-engine/scroll-text-highlight)** (word-by-word highlight),
  **[Scroll → CSS Variable](/animation-engine/scroll-var)** (scroll progress for your own CSS).
- **[Parallax](/animation-engine/parallax)**, **[Marquee](/animation-engine/marquee)**,
  **[Motion Path](/animation-engine/motion-path)** (travel an SVG path, scroll-scrub option),
  **[Flip Card](/animation-engine/flip-card)** (CSS-3D), **[Painted](/animation-engine/painted)**
  (hand-drawn marks), **[Confetti](/animation-engine/confetti)** (26 burst styles) and
  **[Kinetic Scenes Preset](/animation-engine/kinetic-preset)** (39 Studio presets on any element).

## Section-level orchestration

- **[Scrollytelling](/animation-engine/scrollytelling)** — the flagship. Its Full-screen Stage is a pinned
  full-screen stage where each column is a full-viewport scene played in order over a **scrubbed
  backdrop** (numbered frames, scrubbed video, or image), with beats, persistent layers, and a
  published scroll-progress value that child elements can scrub against. Includes the pan/dolly
  **camera-glide** over a still backdrop.
- **[Card Stack](/animation-engine/sticky-stack)** (deck-of-cards pin),
  **[Horizontal Scroll](/animation-engine/horizontal-scroll)** (incl. a 3D perspective wall),
  **[Scroll Loop](/animation-engine/scroll-loop)** (Lenis smooth + snap),
  **[Scroll Color Shift](/animation-engine/scroll-color-shift)**, and animated
  **[Backgrounds](/animation-engine/backgrounds)** (35 Canvas/CSS effects, layered up to 12 deep, on any
  Section, Bleed Section, Masonry Section or Row).
- **[Motion Sequence](/animation-engine/motion-sequence)** — assembles a Section's children into a single
  `gsap.timeline()` on one trigger (play-once, or scrub-and-pin), tuned by an "overlap" control. Visual
  timelines now exist too: the [Scroll Timeline](/animation-engine/scroll-timeline) for scroll motion and
  the Live Editor's [Interaction timeline](/extensions/live-editor) for Interactions.

## Site-wide

- **[Smooth Scroll](/animation-engine/smooth-scroll)** (site-wide Lenis momentum),
  **[Cursor](/animation-engine/cursor)** (42 styles), **[Page Transitions](/animation-engine/page-transitions)**,
  **[Preloader](/animation-engine/preloader)**, **[Scroll Progress](/animation-engine/scroll-progress)**,
  **[Viewport Units](/animation-engine/viewport-units)** (stable `--vh` / `--vw`), and **site-wide
  [Interactions](/animation-engine/interactions)** (made once, applied by class on every page).

## Real 3D & special elements

- **[WebGL Object](/animation-engine/webgl-object)** — real Three.js: glass/metal objects, image
  particles, full-screen shaders (plasma, aurora, fluid, image-distort), pointer + scroll reactive,
  with automatic quality drop and a poster fallback.
- **[Model Viewer](/animation-engine/model-viewer)** — glTF/GLB with orbit, HDR lighting, baked
  animation clips, **AR ("view in your space")**, hotspots and material variants.
- **[Motion Gallery](/animation-engine/motion-gallery)** — 53 CSS-3D designs: ring / wall / sphere / orbit /
  scatter / stack / device layouts, scroll-scrubbable and able to sync to a Scrollytelling beat.
- **[Rive](/animation-engine/rive)** — interactive, stateful vector animations (live inputs, data
  binding, asset swaps, JS control) at 60fps and tiny file sizes.
- **[Kinetic Scene](/animation-engine/studio-scene)** — a motion-graphics scene made in Kinetic Scenes.
- **[Interactive Reveal](/animation-engine/interactive-reveal)** (exploded / peel / assemble layer reveals with
  hotspots), **[Parallax Scene](/animation-engine/parallax-scene)** (a layered image diorama),
  **[Image](/animation-engine/image-scroll-choreography)** and **[Text Scroll Choreography](/animation-engine/text-scroll-choreography)**
  (foreground images or text that appear, hold and exit on scroll).
- **[Image Sequence](/animation-engine/image-sequence)** (frame-scrub "video from stills"),
  **[SVG Draw](/animation-engine/svg-draw)** (self-drawing line art, scroll-scrub) and
  **[SVG Morph](/animation-engine/svg-morph)** (a shape morphing into another).

## Extensible

The list above isn't closed. New per-element effects and Motion Gallery designs register from a
**child theme**, through the same hooks the built-ins use — and an AI agent can discover the natives
first and grow the engine from real demand. See **[Extending the engine](./extending-the-engine)**.

:::note[The takeaway]
This is a wide, capable base — more complete than most WordPress motion tools. That's *why* the
roadmap can be narrow and specific: a few high-leverage moves, not a rebuild.
:::

Next: [where we're leveling up →](./focus-areas)
