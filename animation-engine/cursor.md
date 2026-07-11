---
sidebar_position: 5
title: Custom Cursor
---

# Custom Cursor

Replace the mouse pointer with a **custom cursor** across the whole site — from a simple dot-and-ring to trailing comets, gooey metaballs, image-reveal lenses and contextual labels.

## Where to find it

It's **site-wide**: **Theme Settings → Site-wide UX → Cursor**. Turn on **Enable custom cursor** (off by default) and pick a **Style**. There's no per-element cursor setting — but any element can override the *Contextual Label* text with a `data-cursor-label="…"` attribute (Advanced → CSS, or a Code Block).

## Styles

**40+ styles**, from minimal to expressive:

- **Minimal:** Dot · Ring · Dot + Ring · Dual Ring · Bullseye · Crosshair · Brackets · Square · Dashed Ring · Plus · Diamond
- **Glow & gradient:** Glow · Gradient · Blob · Spotlight · Glass Lens · Invert Disc
- **Trails:** Comet · Particle Trail · Afterimage · Firefly · Confetti Trail · Bubbles · Motion Streak · Word Trail
- **Playful / physics:** Elastic Ring · Spring Dot · Rubber Band · Gooey Metaball · Sparkle
- **Targeting:** Directional Arrow · Radar Pulse · Camera Reticle
- **Content-aware:** Contextual Label · Sticky Cursor · Image Reveal · Magnify Lens
- **Artistic:** Ink Brush · Fluid Smear · Ripple Trail
- **Custom:** Custom Image · Glyph / Emoji

Most styles just work; a few reveal extra controls (e.g. **Comet** → tail length, **Particle Trail** → density, **Glass Lens** → radius & blur, **Contextual Label** → default label & font, **Magnify Lens** → zoom & scope, **Image Reveal** → reveal image & window radius).

## Global options

These apply to any style:

| Option | Notes |
| --- | --- |
| **Cursor color** | Theme color-preset picker (default blue) |
| **Size** | Base cursor size (px) |
| **Grow on hover** | Expands over links / buttons *(default on)* |
| **Magnetic snap** | Eases toward the center of a hovered button / link |
| **Difference blend** | Inverts against whatever's behind it |
| **Click ripple** | An expanding ring wherever you click |
| **Click burst** | A small particle burst on click |
| **Hide the native cursor** | *(default on)* |

## Performance & accessibility

- **Loads only when enabled** and a real style is chosen (never in the admin).
- **Touch:** hard-disabled on touch screens (no hover / coarse pointer).
- **Reduced motion:** trailing and easing collapse to instant.
