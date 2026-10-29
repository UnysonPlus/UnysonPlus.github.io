---
sidebar_position: 0.5
title: Scroll Motion
slug: /scroll-motion
description: "Scroll Motion — GSAP + ScrollTrigger entrance and scroll-scrubbed motion on any page-builder element, from the Animations tab. Reveal, stagger, split text, parallax, pin, scrub, zoom and more, plus a Custom Code snippet."
keywords:
  - unyson+ scroll motion
  - gsap scrolltrigger wordpress
  - scroll animation page builder
  - scroll reveal parallax pin scrub
  - split text animation wordpress
---

# Scroll Motion

**Scroll Motion** adds **GSAP + ScrollTrigger** motion to any page-builder element — a Section, a
column, or a single element like a heading or image. Pick an effect from the element's **Animations**
tab and it plays either as an **entrance** (once, as the element scrolls into view) or **scrubbed**
(tied to the scrollbar, so it moves as you scroll). No code required, and nothing is loaded on a page
until an effect actually renders on it.

:::note[Requires the Animation Engine extension]
Scroll Motion is part of the **Animation Engine** extension, which ships inactive by default. Turn it
on under **Unyson+ → Extensions** first. While it's off, the Animations controls are present but do
nothing.
:::

## How to use it

1. Select any element in the builder and open its **Animations** tab.
2. Under **Scroll Motion**, pick an **effect** (the default is *None*).
3. Set the effect's options — direction, style, distance, timing — and save.
4. View the front end and scroll: entrance effects play once when the element reaches the viewport;
   scrub and parallax effects move continuously with the scroll.

Scroll Motion is independent of the core **Entrance** (Animate.css) animations — you can use either,
and Scroll Motion is the one to reach for when you want scroll-scrubbing, parallax, pinning, or text
splitting.

## Effects

The picker groups the effects by what they do:

**Reveal & Wipe** — `Reveal`, `Clip Wipe`, `Mask Wipe`, `Blur In`, `Expand`, `Zoom In`
: Bring an element in from hidden — slide/fade up, a clip-path wipe, a soft mask, a blur or scale.

**3D & Rotate** — `Flip`, `Rotate In`, `Scroll Spin`, `Tilt Scrub (3D)`, `Skew Settle`
: Rotation and 3D — flip on an axis, settle in from a rotation or skew, or spin/tilt tied to scroll.

**Scrub & Parallax** — `Scrub`, `Parallax`, `Pin`, `Velocity Skew`, `Color Scrub`
: Scroll-linked motion — drift layers at different speeds (parallax), pin an element while the page
scrolls past, scrub a transform with the scrollbar, or shift a colour between two values on scroll.

**Text & Count** — `Split Text`, `Stagger`, `Counter`
: Typographic motion — reveal text by characters, words or lines; stagger a group of children in one
after another; or count a number up as it enters view.

## Shared controls

Most **entrance** effects share a common set of controls, so they behave consistently:

- **Direction** — a 9-way choice (up / down / left / right, the four diagonals, or none).
- **Style** — a motion preset: `subtle`, `standard`, `dramatic`, `bounce`, or `elastic`.
- **Timing tail** — `delay`, a ScrollTrigger `start` position (default `top 85%`), `once` (play a
  single time), and `run on mobile`.

Scroll-linked effects (parallax, pin, scrub…) expose their own speed / length / intensity controls
instead of the entrance tail. Switching between effects never loses the options you set on the others.

## Advanced tier

Five effects — **Reveal, Stagger, Parallax, Pin, Scrub** — carry an optional **Advanced** panel that
stays collapsed to a single "Default" row until you need it. It adds:

- a curated **GSAP ease** (or a free-text custom ease),
- **scrub smoothing** for the scrub family (0 snaps to the scrollbar; a value eases it over that many
  seconds), and
- **ScrollTrigger markers** for debugging (only emitted for administrators).

Leaving it on "Default" stamps nothing — the element renders exactly as it would without the panel.
These same five effects also show a read-only **"Show generated GSAP"** panel that prints the actual
GSAP your current settings produce and updates live, as a learning aid.

## Custom Code (Motion Snippet)

For motion the presets don't cover, choose the **Custom Code** effect and write your own GSAP. Your
code runs with three things in scope:

- **`el`** — this element,
- **`tl`** — a `gsap.timeline()` already tied to a ScrollTrigger at your chosen start position (and
  linked to the scrollbar if you pick a scrubbed mode), and
- **`gsap`** — the library itself.

Add tweens to `tl` to choreograph, or use `gsap` for your own triggers. You also set the trigger
**start**, whether it **plays once or scrubs**, and whether it **runs on mobile**.

:::caution[Who can run custom code]
A Motion Snippet only *executes* for page authors allowed to save unfiltered HTML (administrators on a
single site). The option is always available to pick, but the code is inert on the front end unless the
author who saved it had that capability — so an untrusted editor can't inject running JavaScript. Custom
Code is also skipped when the visitor prefers reduced motion.
:::

## Good to know

- **Powered by GSAP + ScrollTrigger** (plus SplitText for Split Text). The runtime and its CSS load
  **only** on pages where a Scroll Motion effect actually renders, and are served minified.
- **One transform per element.** Scroll Motion drives the element's `transform`, so a Scroll Motion
  effect and a Physics or Parallax-layer transform on the *same* element don't combine — put them on
  different elements, or nest.
- **Counter** goes on a text/number element; **Color Scrub** animates either the text or background
  colour between two values you choose.
- Respect for **reduced motion** is built in.

:::tip[💡 Web dev tip: tie animation to scroll with ScrollTrigger]
Scroll-driven animation is its own discipline — an effect can *play once* on entry or *scrub* in lock-step
with the scrollbar, and the trigger's start/end positions decide when. GSAP's ScrollTrigger is the
standard tool for it, and the same ideas now have a native browser counterpart in scroll-driven
animations. [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)
:::
