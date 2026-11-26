---
title: Vector Shape
sidebar_position: 8
description: Draw your own shape in Unyson+ with a pen, rectangles, ellipses, polygons and stars, combine shapes with Union, Subtract, Intersect and Exclude, and keep the result as clean inline SVG.
---

# Vector Shape

Draw a shape of your own and place it on the page: a badge, a divider ornament, a simple logo mark, a cut-out
decoration. The element has a **drawing editor** with a pen (points and curve handles), rectangles, ellipses, polygons
and stars, and **Union, Subtract, Intersect and Exclude** to combine shapes. What you draw is saved as **clean inline
SVG**, so it stays sharp at every size, weighs a few hundred bytes, and needs no image file.

It sits in the **Media Elements** tab of the Page Builder.

<img src="/img/shortcodes/vector-shape-demo.png" alt="One drawing (a rectangle and a circle joined, with a star cut out, beside a triangle) shown as drawn, in one blue, and in dark ink" width="1200" />

:::tip[Looking for a ready-made icon?]
Use the [Icon](/shortcodes/media-elements/icon) element: its picker searches the bundled icon packs, and you can upload
your own SVG. Vector Shape is for a shape you **draw** or adjust yourself.
:::

## Live demo

**▶ [See the Vector Shape live on the demos site](https://demos.unysonplus.com/shortcodes/icon/#sc-vector-shape)**:
one drawing shown three times, as drawn, in **One colour** blue and in **One colour** dark ink.

## The drawing editor

Open the element's settings and choose **Draw / edit shape**. The editor fills the screen:

<img src="/img/shortcodes/vector-shape-editor.png" alt="The vector editor: tool bar along the top, a rectangle and circle joined with a star cut out, and a triangle drawn with the pen" width="1300" />

The line under the tool bar always says what the current tool does.

### Tools

| Tool | Key | How to use it |
| --- | --- | --- |
| **Select** | `V` | Click a shape to select it, **Shift+click** to add more, drag to move. Arrow keys nudge by 1px (**Shift** for 10). |
| **Points** | `A` | Drag a point or a curve handle to reshape a path. **Double-click** a point to switch it between sharp and smooth. |
| **Pen** | `P` | Click to add corner points, **drag** to pull out curve handles. Click the first point to close the shape; **Enter** or **Esc** finishes it open. |
| **Rectangle** | `R` | Drag to draw (**Shift** for a square). |
| **Ellipse** | `E` | Drag to draw (**Shift** for a circle). |
| **Polygon** | `G` | Drag from the centre. **Sides** (next to the tools) sets the number of sides. |
| **Star** | `S` | Drag from the centre. **Sides** sets the number of points. |

### Combining shapes

Select two or more shapes (Shift+click), then:

- **Union** joins them into one shape.
- **Subtract** cuts the upper shapes out of the lowest one (the star cut out of the demo above).
- **Intersect** keeps only the part they share.
- **Exclude** keeps everything except the part they share.

The result takes the look of the lowest shape. Use **Forward** and **Backward** to change which shape is lowest first.

### Colour, outline and order

- **Fill** sets the selected shapes' colour; tick **none** for no fill (an outline only).
- **Stroke** and **Width** add an outline (Width 0 = no outline).
- **Forward** / **Backward** move the selection up or down the stack; **Delete** (or the Delete key) removes it.
- **Undo** (`Ctrl+Z`) and **Redo** (`Ctrl+Shift+Z`) go back and forth through up to 80 steps.

**Save shape** writes the drawing into the element; **Cancel** leaves it as it was. Open the editor again later and the
drawing comes back as editable shapes.

### SVG code

**SVG code** under the preview shows the saved markup. Paste SVG there (from a design tool, for example) and it is
used as the shape; open **Draw / edit shape** afterwards to edit it. Whatever is saved, drawn or pasted, is
**sanitised on save**: scripts, event handlers and outside references are removed.

## Content

- **Shape**: the drawing (see above).
- **Description for screen readers**: what the shape shows, for example "Company logo". With a description the shape
  is announced as an image (`role="img"`); left empty it is treated as decoration and hidden from screen readers.
- **Link**: optional, makes the whole shape a link.

## Styling

- **Width**: px, %, em, rem or vw (default 160px). The height follows the shape's proportions.
- **Alignment**: Left (default), Centre or Right.
- **Colours**:
  - **As drawn** keeps every colour from the editor.
  - **One colour** paints every filled and outlined part in **Shape colour**, like an icon. Leave Shape colour empty
    to follow the surrounding text colour, so the shape changes with a dark section or a hover colour.
- **Shape colour**: a theme colour or a custom one, used by One colour.

## Advanced

The standard Advanced tab: CSS class and ID, responsive visibility, custom attributes, margin and padding, and custom
CSS. The wrapper has the class `vshape`; the SVG sits in `.vshape__svg`.

## Limits

- The editor draws flat shapes: fills, outlines and their colours. Gradients and text in pasted SVG are kept when you
  only paste, but the editor redraws the shape as plain paths when you edit it there.
- When the editor opens a pasted SVG, clipping masks are dropped and groups are flattened into separate shapes.
- An empty Vector Shape shows a notice to logged-in editors only; visitors see nothing.

## For developers

The drawing control is the [`vector-svg`](/options/option-types/vector-svg) option type, which any element or settings
page can use. The element's tag is `vector_shape`.
