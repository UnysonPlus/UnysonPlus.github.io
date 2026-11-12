---
sidebar_position: 7
title: Text Effects
slug: /text-effects
---

# Text Effects

:::tip[Try it live]
Every effect below is interactive in the **[Text Effects playground](./playground.mdx)** —
pick an effect, tweak its options, and copy the generated sample.
:::

Kinetic typography for any element's text — split-character reveals, scramble/decode, typewriter, gradient shimmer, glitch, count-up, rotating words, and dozens more. Self-contained vanilla JS, **no GSAP**.

## Live demo

**→ [See it in the Animation Engine demos](https://demos.unysonplus.com/animation-engine/text-effects/)** — an interactive showcase you can explore.

## Where to find it

Open any element with text → **Animations** tab → **Add Animation** → **Entrance** → **Text Effect**. It's a **popover of animated tiles** in five tabs, with a search box; remove it with the card's **×** (or pick **None**).

## The effects

**38 effects**, in the picker's five tabs:

- **Reveal:** Blur Reveal · Mask Reveal · Split Reveal · Slide · Skew Reveal · Fill Sweep · Image Mask · Outline → Fill · Strike / Box · Marker Highlight
- **Motion:** Bounce In · Float · Wave · Jitter · Letter Jump · Scale Pop · Breathing · Kinetic Scroll · Magnetic Letters
- **Decode & Type:** Scramble · Random Order · Matrix Decode · Typewriter · Split-Flap · Count Up · Rotating Words
- **Color & Glow:** Chromatic · Color Wave · Gradient Flow · Neon Flicker · Rainbow · Shimmer · Spotlight · Glitch
- **Type & 3D:** Expand Spacing · Weight Sweep · Width Sweep · Flip 3D

### Common reveal options

The reveal family (Split Reveal, Blur, Mask, Flip 3D, Scale Pop, Slide, Bounce In, Random Order, Skew) shares a set:

| Option | Notes |
| --- | --- |
| **Split by** | Characters · Words · Lines |
| **Stagger (s)** | Delay between each piece: 0.005–0.12, default 0.03 |
| **Duration (s)** | Length of each piece's animation: 0.2–1.6, default 0.6 |
| **Sequence** | When the element has several paragraphs or lines: **All together**, or **One after another** (the stagger cascades from the first word to the last) |
| **Trigger** | Pick **one or more**: **Scroll into view**, **Page load**, **Click**, **Hover**. *Scroll into view* and *Page load* reveal the text once; *Click* and *Hover* replay it on each event |
| **From / Rise from** | Where pieces rise or slide from: Below, Above, Left or Right (effect-dependent) |

The same multi-choice **Trigger** is on Scramble, Typewriter, Count Up, Split-Flap and Matrix Decode. A few effects take a single trigger instead: **Marker Highlight**, **Strike / Box**, **Outline → Fill**, **Fill Sweep**, **Color Wave** and **Width Sweep** play on **Scroll into view** *or* **Hover**, and **Glitch** plays on **Hover** or **Always**.

Other effects have their own controls — e.g. **Typewriter** (speed, caret, loop), **Scramble** (duration), **Rotating Words** (word list + interval), **Count Up** (duration), **Gradient Flow** (three colors + speed), **Glitch** (trigger + intensity), **Image Mask** (an image the text becomes a window onto), **Spotlight** (a light that follows the pointer across the letters: base colour, **Radius** 60–400 px, **Softness** 0–100 %).

## Performance & accessibility

- **Loads only when used** — enqueued only on pages with a text effect.
- **Reduced motion** is honoured — text shows normally.
- **Trigger-aware:** most effects fire *when scrolled into view* rather than off-screen.
- **Phones:** honours the engine-wide **Disable heavy effects on mobile** setting (Theme Settings → Site-wide UX → Animation Engine).

:::tip[Bold, large text reads best]
Character-split and mask effects (Image Mask, Split Reveal, Fill Sweep) look best on short, bold headings.
:::
