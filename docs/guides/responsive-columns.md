---
title: Build a responsive multi-column layout
description: Create responsive columns and rows in the Unyson+ Page Builder, with widths that wrap cleanly on tablet and mobile.
---

# Build a responsive multi-column layout

Columns let you place content side by side, a three-up feature row, a two-column "image + text", a
pricing grid. The Unyson+ [Page Builder](/docs/page-builder) makes them responsive by default.

## Steps

1. Edit a page and open the **Unyson Builder**.
2. Drag a **Section** onto the canvas, then a **Row** inside it.
3. Drag **Column** elements into the row, or pick a ready-made width from the **Layout Elements**
   palette (`1/2`, `1/3`, `1/4`, …). For a three-up row, use three `1/3` columns.
4. Drop content into each column (a heading, an Icon Box, a Text Block).
5. **Update** and view, the columns sit side by side on desktop and stack on smaller screens.

## Widths to know

- Use the standard fractions: `1/1`, `1/2`, `1/3`, `2/3`, `1/4`, `3/4`, `1/6`, `5/6`.
- There's exactly one fifth: **`1/5`** (20%), so **five** `1/5` columns make a clean 5-across row.
  There is no `2/5` / `3/5` / `4/5`.
- Don't fake equal columns with a custom width, pick a real fraction so the grid stays valid.

## Responsive behavior

By default the columns flex-wrap on smaller screens. Use the **Desktop / Tablet / Phone** toggle in
the builder to preview each breakpoint, and the column's **per-device width** options to change how a
column behaves on tablet or mobile.

Full detail: [Column widths & the grid](/docs/page-builder/column-widths).

## See also

- [How the Page Builder works](/docs/page-builder/how-it-works)
- [Build a call-to-action section](./call-to-action-section.md)
