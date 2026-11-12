---
sidebar_position: 2.465
title: Painted
description: Paint shapes and lines with real brushes in Kinetic Scenes, a pencil, ink, marker, charcoal, crayon or pastel outline over a watercolour wash, a flat wash or hatching, and paint them on in front of the viewer.
keywords: [watercolour animation, watercolor animation, hand painted motion graphics, pencil drawing animation, brush stroke animation, paint on animation, kinetic scenes]
---

# Painted

**Painted** paints a shape or a line with real brushes: a pencil, ink, marker, charcoal, crayon or pastel outline over a
watercolour wash, a flat wash or hatching. The watercolour has what real paint has: an uneven edge that bleeds a little
into the paper, granulation where the pigment settled, a darker ring where it dried, and two pigments that separate
slightly across the wash.

<img src="/img/kinetic-scenes/painted.png" alt="Four painted shapes on cream paper: a green watercolour square with a pencil outline, a circle hatched in red ink, an orange square in flat marker, a blue watercolour square with a charcoal outline, and a brown crayon line below them" width="810" />

The paint is see-through, so it lies on whatever is under it the way watercolour lies on coloured paper. A painting is the
same on every play and in every export: each layer keeps its own brush marks.

## How to use it

1. Select a shape (a rectangle or circle) or a line.
2. Click **Paint it** in the Inspector. It adds a **Painted** clip that runs for the whole scene.
3. Select the clip to change the brush, the paint and the options below.

You can also drag **Painted** from the Ambient presets onto a layer. If you do, run the clip for the whole length the
layer should look painted.

## Paint it on

Set **Paint on** above 0 and the layer is painted in front of the viewer over that part of the clip: the outline is
drawn round the shape (from the top-left corner, clockwise) and the colour blooms in behind it from the left. A line is
drawn from its start to its end. **0.6** on a 3-second clip paints it on in the first 1.8 seconds, then it holds.

## Options

| Option | What it does | Default |
|---|---|---|
| **Brush** | The outline's brush: Pencil, Ink pen, Fineliner, Marker, Charcoal, Crayon, Pastel or Coloured pencil. | Pencil |
| **Fill** | Watercolour, Flat wash, Hatching or None. **Automatic** paints shapes in watercolour and leaves lines unfilled. | Automatic |
| **Outline** | Draw the outline. Turn it off for paint alone. | On |
| **Paint on (part of the clip)** | Paints it on over this part of the clip (see above). 0 shows it painted from the start. | 0 |
| **Outline colour** | The outline's colour. | The layer's outline colour, else near-black |
| **Paint colour** | The fill's colour. | The layer's fill colour |
| **Brush size** | How thick the outline (and the hatching) is. | 1 |
| **Watercolour bleed** | How far the wash spreads past the shape's edge, 0 to 1. | 0.25 |
| **Paper texture** | How much the pigment settles into the paper's grain, 0 to 1. | 0.5 |
| **Paint strength** | How dense the paint is: lower is paler and more see-through. | 1 |
| **Hatching gap**, **Hatching angle** | The spacing and direction of the hatching lines. | 7, -35° |
| **Variation** | A number that gives the layer a different set of brush marks. 0 picks one from the layer's id. | 0 |

## Painted or Hand-drawn?

Both make a scene look made by hand. [Hand-drawn](./sketch-and-physics.md#hand-drawn) redraws a shape in quick,
wobbly pencil with a scribbled fill, and can boil like a flip book. **Painted** is slower, richer artwork: real watercolour,
ink and charcoal. Use one or the other on a layer; the Inspector's buttons go away once either is on it.

## Limits

- **Shapes and lines.** Rectangles (rounded too), circles and ellipses, and line layers. Text, pictures and groups are
  not painted.
- **It paints in the browser with WebGL2**, which every current browser has. The paint engine (`scene-paint.js`, about
  112 KB, 42 KB compressed) loads only for scenes that use Painted, and a downloaded page carries it inside.
- **A painting is redrawn when its size changes**, and step by step while it paints on. A scene with dozens of large
  paintings painting on at once can drop frames in the live preview; an export is unaffected.
- The paint engine is [p5.brush](https://github.com/acamposuribe/p5.brush) by Alejandro Campos Uribe (MIT licence).
