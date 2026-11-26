---
title: Freeform (Div)
sidebar_position: 6
description: "Freeform sections in Unyson+: set a Div's Display to Freeform and drag every element exactly where you want it in the Live Editor, with snapping guides and layers; on smaller screens it stacks in reading order."
---

# Freeform (Div)

**Freeform** is a Display choice of the Flexbox Div (Section, Block, Flexbox or Grid tile → **Display → Freeform
(place freely)**). Inside it, elements are not lined up by rows and columns: each one sits **where you drag it**, as
on a design canvas. Use it for a hero with a headline overlapping a picture, a collage, a poster-like layout, or
decorations placed at an exact spot.

<img src="/img/shortcodes/freeform-desktop.png" alt="A freeform section on a desktop: a heading, text and a button on the left, a large green star placed on the right" width="580" />

On screens smaller than the **Stack Below** size, the same elements **stack one under another in reading order**
(top to bottom, then left to right), so the section still reads well on a phone:

<img src="/img/shortcodes/freeform-phone.png" alt="The same section on a phone: the star first (it sits highest), then the heading, the text and the button" width="195" />

## Live demo

**▶ [See a freeform section on the demos site](https://demos.unysonplus.com/shortcodes/flexbox/#sc-freeform)**: open it
on a phone, or narrow the window, to see it stack.

## Placing elements (Live Editor)

Add elements to the Freeform Div as usual, then in the [Live Editor](/extensions/live-editor#freeform):

- **Drag** an element to move it. **Snapping guides** (pink lines) appear when its left edge, centre or right edge
  lines up with the canvas or with another element, and the same for top, middle and bottom; a read-out shows its
  position. Hold **Alt** while dragging to place it without snapping.
- **Resize**: select it and drag the grip on its right edge to change its width.
- **Nudge** with the arrow keys (1 px, **Shift** for 10 px).
- **Layers**: right-click → **Bring to front**, **Bring forward**, **Send backward**, **Send to back** decide which
  element covers which where they overlap.

Each move is one step on Undo (Ctrl+Z). An element that has not been placed yet sits at the top of the canvas until
you drag it.

## Options (Div → Layout, shown when Display is Freeform)

| Option | Default | What it does |
| --- | --- | --- |
| **Canvas Height** | 560 px | The height of the area elements are placed in (px or vh). |
| **Stack Below** | Tablet | Under this size the elements stack: **Tablet** stacks on tablets and phones (under 992 px), **Phone** only on phones (under 768 px), **Never** keeps them placed freely on every screen. |
| **Stacked Gap** | 24 px | Space between the elements once they stack. |

## How positions are kept

Each element stores its own box: its left edge and width in **% of the canvas width** (so the layout scales with the
window), its top in **px** from the canvas top, and its layer. The section stays ordinary HTML: no extra wrappers, and
the elements keep their own markup, in reading order for screen readers and search engines.

## Limits

- Placement is done in the **Live Editor** (the backend builder lists the elements but has no canvas to drag on).
- Because widths follow the window and the top positions are fixed, text that wraps onto more lines on a narrower
  desktop can run into the element below. Leave some room, or choose a larger **Stack Below** size.
- An element moved out of a Freeform Div keeps its saved box, which does nothing elsewhere; it is used again if the
  element goes back into a Freeform Div.
