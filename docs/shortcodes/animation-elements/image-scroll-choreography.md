---
title: Image Scroll Choreography
sidebar_position: 1
---

# Image Scroll Choreography

Pin foreground **images** to the screen and choreograph each one to the page scroll — it **appears**
(from below / a side / a fade), **holds** on its corner while the visitor scrolls a whole "chapter", then
**exits**, all at the scroll % you choose. Several images share one scroll timeline (a "kage"-style foreground
group), each anchored to a corner, pinned in a fixed layer your sections scroll underneath. Its typographic
sibling is [Text Scroll Choreography](./text-scroll-choreography.md), and they share the same pose engine.

<img src="/img/shortcodes/image-scroll-choreography-hero.png" alt="Image Scroll Choreography — a lantern and a tree pinned as foreground images while a chapter scrolls behind" width="1200" />

Tabs: **Images**, **Scene**, **Advanced**. Lives under the **Animation Engine** tab in the page builder.

:::tip[💡 Web dev tip: scroll-tied motion should still respect reduced motion]
A whole chapter choreographed to scroll position is a lot of movement, and some visitors have told their operating system they'd rather not see large parallax-style effects — that's what the `prefers-reduced-motion` media feature is for, and good sites read it before adding this kind of motion. UnysonPlus's Animation Engine already checks it for you, easing back the choreography instead of forcing it on everyone. [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
:::

:::tip[💡 Transparent PNG/WebP works best]
The images float over your page, so cut-out subjects on a transparent background look best. The whole
foreground is a **click-through** layer, so it never blocks the content beneath it.
:::

## How it works

Place the element where the sequence should **start**, then put your "chapter" sections **right after it** — the
element is a zero-height anchor and its images sit in a fixed layer your sections scroll under. **Scroll length
(screens)** is the runway; every image's *Appear / Hold / Exit* scroll % (0–100) maps onto it.

## Images tab

### Recipe — one-click composition

At the top of the tab, a **Recipe** picker turns the whole thing into one click: choose a ready-made
composition, add your images, and the recipe **poses and staggers every image for you** — spreading their
appear / hold / exit across the whole scroll automatically, for any number of images. The recipes are
**Parallax Rise**, **Corner Peek-a-boo**, **Zoom Focus**, **Diagonal Sweep** and **Alternating Sides**.
Your own images (and inset / z-index / flip) are kept. Leave it on **Custom** to hand-author each image
with the controls below.

Add one **image** per layer. Each has:

| Group | Options |
| --- | --- |
| **Placement** | **Anchor** (nine corners), **Width (% of screen)**, **Edge inset (%)**, **Stacking (z-index)**, **Flip horizontally**. |
| **Choreography** | **Appear by** + **Appear at (scroll %)**, **Entrance length (%)**, **Hold until (scroll %)**, **Exit by** + **Gone by (scroll %)**, **Hold size (%)**, **Tilt while held (°)**. |

*Appear by* / *Exit by* are directions (slide up / down / from a side), a fade, or a scale — and Exit can be
**Stay to the end**. The image slides from off its mark, holds fully-opaque on its anchor, then leaves.
*(A recipe fills all of these in for you.)*

## Scene tab

| Option | What it does |
| --- | --- |
| **Foreground layer (z-index)** | Stacking of the whole pinned foreground vs your sections. |
| **Scroll length (screens)** | How many screen-heights the choreography spans. |
| **Scroll smoothing** | 0 = frame-perfect; higher adds glide. |
| **Show choreography guide** | On-page authoring aid (markers + a live readout of scroll % and each image's state). Turn it off before publishing. |

### Live editor (in the guide)

With the guide on, **signed-in** editors get an **Edit (✎)** button on the guide HUD — a live,
scrub-tweak-and-retime timeline editor:

<img src="/img/shortcodes/image-scroll-choreography-editor.png" alt="The Scroll Choreography guide in edit mode — a scrub playhead at 34%, per-layer keyframe tracks with draggable diamond markers, each layer's X / Y / scale / turn / fade with minus and plus steppers, and Delete key / Copy keys buttons" width="334" />

- **Scrub** — a playhead that **freezes the scene at any %** without scrolling, so you can inspect the
  exact pose at, say, 50%.
- **Keyframe track** — each layer gets a **0–100% track with a diamond per keyframe**. **Drag** a diamond
  to retime that keyframe, **click** it to select it (and scrub the scene to it), **double-click** an empty
  spot on the track to **add** a keyframe there, and **Delete key** to remove the selected one.
- **± steppers** — nudge the selected keyframe's **X / Y / scale / turn / fade** and watch the pose change
  live.
- **Copy keys / Live** — copy the edited keyframes as JSON to paste back into the element, or **Live** to
  release the playhead and follow the real scroll again.
- **Drag it out of the way** — grab the **⠿ grip** at the top-left of the panel to move it anywhere on
  screen, so it never covers the corner you're posing into.

It's author-only (it rides on the logged-in-only guide) and never affects what visitors see.

## Advanced tab

**CSS ID**, **CSS Class** (target images with `.your-class .fw-choreo__layer`), and scoped **Custom CSS**
(`selector` = the scene).

## Accessibility & performance

Honours **prefers-reduced-motion** (rests each image on its held pose). The pose engine is self-contained (no
GSAP). The fixed layer is click-through.

## Live demo

In your local demos network: `animation-engine/image-scroll-choreography/`.
