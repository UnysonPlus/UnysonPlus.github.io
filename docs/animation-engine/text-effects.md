---
sidebar_position: 7
title: Text Effects
---

# Text Effects

Kinetic typography for any element's text — split-character reveals, scramble/decode, typewriter, gradient shimmer, glitch, count-up, rotating words, and dozens more. Self-contained vanilla JS, **no GSAP**.

## Where to find it

Open any element with text → **Animations** tab → **Text Effect**. It's a **popover of animated tiles**; leave it on **None** for none.

Global on/off: **Theme Settings → Animations → Text**.

## The effects

**38 effects.** A sampler by family:

- **Reveals:** Split Reveal · Blur Reveal · Mask Reveal · Flip 3D · Scale Pop · Slide · Bounce In · Random Order · Skew Reveal
- **Decode & type:** Scramble · Typewriter · Matrix Decode · Split-Flap · Count Up
- **Color & glow:** Shimmer · Gradient Flow · Rainbow · Neon Flicker · Marker Highlight · Fill Sweep · Outline → Fill · Color Wave · Chromatic
- **Motion & wobble:** Wave · Breathing · Jitter · Float · Letter Jump · Expand Spacing · Kinetic Scroll · Magnetic Letters
- **Variable-font:** Weight Sweep · Width Sweep
- **Special:** Glitch · Strike / Box · Rotating Words · Image Mask

### Common reveal options

The reveal family (Split Reveal, Blur, Mask, Flip 3D, Scale Pop, Slide, Bounce In, Random Order, Skew) shares a set:

| Option | Notes |
| --- | --- |
| **Split by** | Characters · Words · Lines |
| **Stagger** | Delay between each piece (s) |
| **Duration** | Length of each piece's animation (s) |
| **Trigger** | When scrolled into view · On page load |
| **Direction / From** | Where pieces rise/slide from (effect-dependent) |

Other effects have their own controls — e.g. **Typewriter** (speed, caret, loop), **Scramble** (duration), **Rotating Words** (word list + interval), **Count Up** (duration), **Gradient Flow** (three colors + speed), **Glitch** (trigger + intensity), **Image Mask** (an image the text becomes a window onto).

## Performance & accessibility

- **Loads only when used** — enqueued only on pages with a text effect.
- **Reduced motion** is honoured — text shows normally.
- **Trigger-aware:** most effects fire *when scrolled into view* rather than off-screen.
- **Touch:** honours the engine-wide **Disable on mobile** setting.

:::tip Bold, large text reads best
Character-split and mask effects (Image Mask, Split Reveal, Fill Sweep) look best on short, bold headings.
:::
