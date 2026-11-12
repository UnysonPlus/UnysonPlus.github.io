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
column, or a single element like a heading or image. Pick an effect from the **Scroll Effect** card on the
element's **Animations** tab and it plays either as an **entrance** (once, as the element scrolls into view) or **scrubbed**
(tied to the scrollbar, so it moves as you scroll). No code required, and nothing is loaded on a page
until an effect actually renders on it.

:::note[Requires the Animation Engine extension]
Scroll Motion is part of the **Animation Engine** extension, which ships inactive by default. Turn it
on under **Unyson+ → Extensions** first. While it's off, the Animations controls are present but do
nothing.
:::

## How to use it

1. Select any element in the builder and open its **Animations** tab.
2. Click **Add Animation** → **Scroll** → **Scroll Effect** (this is Scroll Motion), and pick an **effect**
   from the tile grid (it has a search box; hover a tile to preview it larger).
3. Set the effect's options — direction, style, distance, timing — and save. To remove it, delete the card
   with its **×**.
4. View the front end and scroll: entrance effects play once when the element reaches the viewport;
   scrub and parallax effects move continuously with the scroll.

Scroll Motion is independent of the core **Entrance** (Animate.css) animations — you can use either,
and Scroll Motion is the one to reach for when you want scroll-scrubbing, parallax, pinning, or text
splitting.

## Effects

**19 effects** (plus Custom Code), in the picker's tabs:

**Reveal & Wipe** — `Reveal`, `Clip Wipe`, `Mask Wipe`, `Blur In`, `Expand / Grow`, `Zoom In`
: Bring an element in from hidden — slide/fade up, a clip-path wipe, a soft mask, a blur or scale.

**3D & Rotate** — `Flip In (3D)`, `Rotate In`, `Scroll Spin`, `Tilt Scrub (3D)`, `Skew Settle`
: Rotation and 3D — flip on an axis, settle in from a rotation or skew, or spin/tilt tied to scroll.

**Scrub & Parallax** — `Scrub`, `Parallax`, `Pin`, `Velocity Skew`, `Color Scrub`
: Scroll-linked motion — drift layers at different speeds (parallax), pin an element while the page
scrolls past, scrub a transform with the scrollbar, or shift a colour between two values on scroll.

**Text & Count** — `Count Up`, `Split Text`, `Stagger`
: Typographic motion — reveal text by characters, words or lines; stagger a group of children in one
after another; or count a number up as it enters view.

**Code** — `Custom Code`
: Write your own GSAP (see [Custom Code](#custom-code-motion-snippet) below). The tile only appears for
authors who may save unfiltered HTML.

## Shared controls

- **Direction** and **Style** are on **Reveal** and **Stagger**. Direction is a 9-way choice (up, down,
  left, right, the four diagonals, or *No movement (fade only)*); Style is a motion preset: Subtle,
  Standard (the default), Dramatic, Bounce (overshoot) or Elastic (springy). **Split Text** has Style too,
  with its own Direction (Rise up / Drop down).
- **The timing tail.** The one-shot entrance effects (Reveal, Stagger, Zoom In, Rotate In, Blur In, Clip
  Wipe, Mask Wipe, Skew Settle, Flip In (3D), Expand / Grow) end with the same controls: **Delay (seconds)**,
  **Start animating** (*Default — near bottom of screen* = `top 85%`; or as soon as it enters, a little
  later, when it reaches the middle, well into view), **Play once** (off = replay every time it scrolls
  back into view) and **Run on mobile**.
- **Scroll-linked effects** (Parallax, Pin, Scrub, Scroll Spin, Tilt Scrub (3D), Velocity Skew, Color
  Scrub) move with the scrollbar, so they have their own strength / length controls and **Run on mobile**
  instead of the tail. Run on mobile starts **off** for Parallax, Pin, Tilt Scrub and Velocity Skew.

Switching between effects never loses the options you set on the others.

## Per-effect options

| Effect | Its own options |
| --- | --- |
| **Reveal** | Direction, Distance (px, default 50), Style |
| **Stagger** | **Apply to** (*Grid items (auto-detect)* or *Direct children only*), Direction, Distance (default 50), **Time between items** (default 0.12 s), **Cascade from** (First to last, Last to first, Center outward, Edges inward), Style |
| **Split Text** | **Split by** (Characters, Words, Lines), **Apply to** (Headings, Paragraphs, or both), **Piece animation** (Slide up, Flip 3D, Scale pop, Blur in, Rotate in, Random per piece), **Time between pieces** (default 0.03 s), Direction (Rise up / Drop down), Start animating |
| **Count Up** | **Count style** (Plain count, or Odometer — each digit rolls), **Count duration** (0.5–6 s, default 2), **Start from** (default 0), **Prefix** and **Suffix** (e.g. `$`, `%`), **Thousands separator**, Start counting, **Count once** |
| **Parallax** | **Axis** (Vertical / Horizontal), **Strength (%)** (1–100, default 20), **Add motion** (Drift only, + Rotate, + Scale), **Fade with drift** |
| **Pin** | **Pin length** (% of screen height, default 100 = one screen of scrolling), **Fade at edges** |
| **Scrub** | **What to animate** (Fade in, Scale up, Rotate, Slide up, Blur → sharp, Skew → straight), **Intensity** (default 20), Start animating |
| **Zoom In** | **Zoom** (in from small, or out from large), **Start scale** (0.2–0.95, default 0.6) |
| **Rotate In** | **Rotation** (2–30°, default 8), **Spin from** (counter-clockwise / clockwise) |
| **Blur In** | **Blur** (2–40 px, default 12) |
| **Clip Wipe** | **Wipe from**: bottom → up, top → down, right → left, left → right, Iris (circle open), Diagonal, Rounded box |
| **Mask Wipe** | **Wipe from** (four directions), **Edge softness** (0–60 %, default 25; 0 = a hard wipe) |
| **Skew Settle** | **Skew axis** (vertical / horizontal), **Skew** (2–30°, default 8), **Distance** (default 40 px) |
| **Flip In (3D)** | **Flip axis** (vertical hinge Y / horizontal hinge X), **Flip from** (one side / the other), **Start angle** (30–120°, default 90 = edge-on) |
| **Expand / Grow** | **Grow direction** (horizontal scaleX / vertical scaleY), **Grow from** (Left, Center, Right, Top, Bottom) — for bars and underlines |
| **Scroll Spin** | **Turns** (0.25–4, default 1), **Direction** (clockwise / counter-clockwise) |
| **Tilt Scrub (3D)** | **Tilt axis** (Y / X), **Tilt** (3–45°, default 12) |
| **Velocity Skew** | **Max skew** (4–45°, default 20), **Skew axis** — leans with scroll speed and springs back when you stop |
| **Color Scrub** | **Colour** (Text colour / Background colour), **From colour** and **To colour** |

In a Section with **Motion Sequence** on, Reveal and Stagger also show **In a Motion Sequence**: *After
the previous step* or *With the previous step*.

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
- **Count Up** goes on a text/number element; **Color Scrub** animates either the text or background
  colour between two values you choose.
- Respect for **reduced motion** is built in.

:::tip[💡 Web dev tip: tie animation to scroll with ScrollTrigger]
Scroll-driven animation is its own discipline — an effect can *play once* on entry or *scrub* in lock-step
with the scrollbar, and the trigger's start/end positions decide when. GSAP's ScrollTrigger is the
standard tool for it, and the same ideas now have a native browser counterpart in scroll-driven
animations. [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)
:::
