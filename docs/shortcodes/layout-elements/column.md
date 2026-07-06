---
title: Column
sidebar_position: 63
---

# Column

A responsive column inside a row, with fine-grained control over width, offset, alignment and position across breakpoints. The column width itself (twelfths plus a single one-fifth `1_5`) is set from the builder's width tiles; the remaining controls live across the **Layout**, **Styling**, **Animations**, and **Advanced** tabs.

## Layout

- **Full Height** — switch (default No). Stretches the column's inner content area to the full height of its row, so colored cards line up at equal heights next to siblings (adds Bootstrap `h-100`). No effect on a single-column row.
- **Content Direction** — an image-picker: *Stacked* (default — elements stack vertically) or *Inline* (elements sit side-by-side in a row, wrapping if they don't fit). Inline previews side-by-side in the builder canvas too, not just on the front end. In Inline mode the flex axes swap, so **Content Alignment** drives the horizontal distribution while **Content Vertical Alignment** works on the cross axis.
- **Content Alignment** — align the whole column's content at once: *Default*, *Left*, *Center*, or *Right*. The simplest way to center a column, including a Special Heading's overline.
- **Content Vertical Alignment** — position elements within the column height: *Top / Default*, *Middle*, *Bottom*, or *Space Between*. Middle / Bottom / Space Between only show when the column is taller than its content.
- **Gap** — space between the column's elements, using the site Gap Scale. Works in both directions; takes effect once the column has 2+ elements. Default is *None*.
- **Column Vertical Alignment** — align this column against its row siblings: *Default* (stretch to match the tallest), *Top*, *Middle*, or *Bottom*. Only visible when the row has unequal-height columns.
- **Mobile Order** — reorder this column on phones (under 576px): *Default*, *First*, a number `1`–`12`, or *Last*. Columns return to their normal order on larger screens.
- **Width — Phone / Tablet / Desktop** — per-breakpoint width overrides (popover image-pickers). Each offers *Default*, `1/12`–`12/12`, or *Auto*. Mobile-first: **Phone is the base** and applies at all widths, **Tablet** overrides from md (≥768px) up, **Desktop** from lg (≥992px) up; a device left on *Default* inherits the smaller one.
- **Offset — Phone / Tablet / Desktop** — per-breakpoint indent (popover image-pickers). Each offers *None* or `1/12`–`11/12`, pushing the column right by that many twelfths at the matching breakpoint.
- **Position** — CSS position: *Default*, *Static*, *Relative*, *Absolute*, *Sticky* (stays in view while scrolling, with an automatic top-0 offset), or *Fixed*.
- **Z-Index** — stacking order; higher numbers sit on top. Only has effect with a Position other than Default.

## Styling

- **Background Color** — a compact color picker for the column's background.
- **Box Preset** — a reusable box style (border, corners, shadow and optional background fill, with a Default/Hover state) defined in Theme Settings → Components → Box Presets, applied as a `.boxp-{name}` class on the column's inner card wrapper. Default is *None*.
- **Margin & Padding** — a `spacing` control: *All Sides* applies to every side at once; any per-side value (Top, Right, Bottom, Left) overrides it for that direction.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding. Also includes an **Inner Wrapper Class** field (placed after CSS Class) — when set, an inner `<div>` is rendered around the column content carrying those classes (e.g. `card p-4 rounded-3`) without affecting the Bootstrap grid wrapper.
