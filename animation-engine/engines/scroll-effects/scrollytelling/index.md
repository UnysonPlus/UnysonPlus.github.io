---
sidebar_position: 8.7
title: Scrollytelling
slug: /scrollytelling
---

# Scrollytelling

:::tip[Try it live]
Scrub a pinned-media story in the **[Scrollytelling playground](./playground.mdx)** — drag the
vertical scroll and the pinned panel swaps to each step; try all 23 CSS transitions (crossfade, zoom,
slide, flip, cube, iris, blinds, glitch…) and tune the side, transition, intensity, direction and
progress. It runs the real pin + per-step layer transitions.
:::

The scroll-story pattern of many product launch pages (and the classic "image pixel loading" reveal): **pin one column of a Section as a media panel** while the other column's **steps scroll past**, and the pinned media **transitions to match the active step**. It's the most recognizable "premium site" scroll device — a pinned visual that narrates as you read.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/scrollytelling/)** — an interactive showcase you can explore.

## Where to find it

It's a **Section-only** control (a pinned-media narrative only makes sense on a full Section, not a column or leaf element): open a **Section** → **Animations** tab → **Add Animation** → **Scroll** → **Scrollytelling**, then pick a style from the tile grid (remove it with the card's **×**).

It ships with the engine and loads its assets **only** on pages that use it.

## Two layouts

The **Layout** option picks how the story is built:

- **Media Panel + Steps** (the default, and the classic layout): one column pins as a media panel while the
  other column's steps scroll past. The rest of this page describes it first.
- **Full-screen Stage (scenes)**: **every column becomes a full-screen scene**. Scene 1, scene 2 and so on
  play in order as the visitor scrolls, pinned to the screen, with an optional **Backdrop** (an image
  sequence, a video or an image) scrubbing behind them. Build a Stage story with **one column per scene**.
  See [Full-screen Stage](#full-screen-stage) below.

## How it works — two columns, mapped by index

In the **Media Panel + Steps** layout, Scrollytelling rides your Section's existing **columns**. Build the Section with **two columns**:

- **One column is the media panel** (the pinned side). Its **direct children are the media layers** — stack **N images**; only the active one shows.
- **The other column is the steps** (the scrolling side). Its **direct children are the step blocks** — **N captions** (headings / text).

The mapping is **by index**: **step 1 shows media 1, step 2 shows media 2**, and so on. Just keep the counts aligned. The **Media side** option chooses which column is the pinned media (left / right / top).

:::tip[Keep each step to one element]
So the steps line up 1-to-1 with the media, make **each step a single element**. A **Special Heading** with a **CSS Class** set (Advanced tab) wraps its title + subtitle into one block — perfect for a step. If a caption renders as several sibling elements, the module still maps them proportionally, but one-element-per-step gives the cleanest pacing.
:::

## Styles

**29 transition styles** — how the pinned panel changes between steps:

| Group | Styles |
| --- | --- |
| **Fade & scale** | Crossfade, Zoom, Zoom Blur, Blur Swap, Duotone, Dissolve, Ken Burns |
| **Slide & motion** | Slide, Push, Cover, Curtain, Split, Horizontal Track |
| **3D** | Flip (3D), Cube (tumble), Tilt 3D, Page Turn |
| **Reveal / mask** | Clip Wipe, Iris, Barn Doors, Blinds |
| **FX** | Glitch, Flash, Scan (CRT), Color Shift |
| **Advanced** | Parallax Depth, Pixelate Resolve, Frame Sequence, Liquid (WebGL) |

A few are special: **Frame Sequence** and **Horizontal Track** are driven by continuous scroll *progress* (a flipbook / filmstrip); **Liquid** is a real-time WebGL displacement warp (falls back to a plain crossfade where WebGL isn't available); **Color Shift** hue-shifts the whole panel per step; **Pixelate Resolve** re-uses the Canvas pixel-in reveal.

## Options

| Option | Notes |
| --- | --- |
| **Media side** | Which column is the pinned media — **Media Left**, **Media Right**, or **Media Top** (stacked full-width). The other column holds the steps |
| **Media height** | Height of the pinned panel as a fraction of the viewport (60–100vh, default 100) |
| **Pin offset** | Gap from the top of the viewport where the panel pins — clears a sticky header (0–160px) |
| **Activate at** | Where in the viewport a step becomes active — its trigger line (20–80%, default 50) |
| **Transition** | Crossfade / transition duration between media states (0.2–1.2s, default 0.6) |
| **Intensity** | Strength of the chosen style — zoom amount, parallax rate, blur radius, drift distance, etc. (0–1, default 0.5) |
| **Progress indicator** | An optional step rail synced to the active step — **Dots** (default), **Bar**, or **None**. Click a dot to smooth-scroll to that step |
| **Direction** *(directional styles only)* | For Slide / Push / Cover / Clip Wipe / Curtain — which way the transition travels: **Default**, **Up**, **Down**, **Left**, **Right** |

## Full-screen Stage

With **Layout: Full-screen Stage (scenes)**, each column of the Section is a scene that fills the screen,
and the scenes play one after another while the stage stays pinned. Elements inside a scene can be moved
across its slice of the scroll with [Scroll Keyframes](/animation-engine/scroll-keyframes). These options
apply to the Stage layout only:

| Option | Notes |
| --- | --- |
| **Scene length (screens)** | How much scrolling each scene owns: 0.5–3, default 1. Higher = slower, more cinematic pacing |
| **Hand-off to next section** | How the story ends as you scroll past it: **Hold last frame (hard cut)** (default), or **Fade to section colour (smooth)**, which dissolves the ride into this Section's background so it flows into the next section. Tip: set the Section's background colour to match the next section |
| **Hand-off starts at (%)** | Fade only: how far through the story the fade begins, 50–95 %, default 78 |
| **Backdrop (stage)** | A media layer behind the scenes, scrubbed by story progress: **None**, **Image sequence — uploaded frames** (upload the frames in order), **Image sequence — numbered URL pattern** (a URL with `%d` for the frame number, plus Frame count, First frame number and Zero-pad digits; best for long sequences), **Video (scrubbed)** (an uploaded file or a URL; the video is paused and scrubbed by the scroll), or **Image (fixed)**. Each has a **Fit**: Cover or Contain |
| **Backdrop Motion** | Moves the backdrop as the story scrubs, like a camera gliding across it: **None (fixed)**, **Pan**, **Dolly (zoom in)** or **Pan + Dolly** |
| **Pan direction** | Pan and Pan + Dolly only: Left, Right, Up or Down |
| **Motion intensity** | How far the backdrop pans and how much it zooms: 0–100, default 50 |

## Set it up

1. Add a **Section** and split it into **two columns** (e.g. `1/2` + `1/2`).
2. In the **media column**, stack **N Images** (one per step). Blank the image **width/height** so they fill the panel.
3. In the **steps column**, add **N step blocks** (a **Special Heading** per step, each with a CSS Class so it's one element).
4. On the **Section** → **Animations** tab → **Add Animation** → **Scroll** → **Scrollytelling** → pick a **style**, set **Media side**, and (optionally) a **Direction** and **Progress** rail.
5. **Save** and view the page — scroll: the media panel pins while the captions scroll, and the image transitions per step.

## Performance & accessibility

- **Loads only when used** — the core + base CSS ship only on pages with a Scrollytelling section, and each **style adds only its own CSS/JS partial** on demand.
- **Pure CSS pin** — `position: sticky` + one `IntersectionObserver`; no scroll library. The advanced styles add a small Canvas/WebGL partial.
- **Reduced motion** — visitors who prefer reduced motion get a clean **linear stack** (media shown statically above each step; no pin, no transitions).
- **Mobile** — below a breakpoint the pin is dropped and the story reads as a normal stack; honours the engine's **Disable heavy effects on mobile** setting (Theme Settings → Site-wide UX → Animation Engine).
- **Editor-safe** — inside the Page Builder the section shows its media + steps normally so editing stays simple; the pin/transition run on the front end.
