---
slug: footer-auto-width-columns-outside-the-12-grid
title: "Why footer columns got an 'Auto Width' mode outside the 12-grid"
authors: [jon]
tags: [footer, architecture, live-editor]
date: 2026-07-20
description: The footer Column Ratio slider stores free-form percentages but snaps every width to the nearest Bootstrap twelfth at render time, so a "brand block beside three content-sized link lists" (30/23/23/24) silently collapsed to four equal quarters. Rather than build a whole new flex-section container, we added an opt-in "Auto Width" mode to the existing column control — content-sized flex columns distributed by a Distribution select — which reproduces the source's justify-content:space-between layout exactly while leaving the twelfths ratio as the default.
---

**The question:** The footer Column Ratio slider can't reproduce a real design's columns
(a wide brand block beside three content-sized link lists). Do we hit a grid limitation — and
if so, do we build a new flex container/section, or fix the existing column control?

<!-- truncate -->

## Context

Rebuilding a marketing footer, the source band was a plain flex row:

```css
footer .cols { display:flex; justify-content:space-between; gap:40px }
/* children are content-sized: brand ≈280px, then three ~110–128px link lists */
```

The UnysonPlus footer builder offers a **Column Ratio** split-slider. It *looks* free-form —
you drag dividers and it shows fractions — and it stores real percentages
(`{w:30},{w:23},{w:23},{w:24}`). But at render time `unysonplus_footer_widths_to_grid()`
**snaps every width to the nearest twelfth** and reconciles the total to 12:

```
30% → round(30/100 × 12)=4    23%→3    23%→3    24%→3    total 13
→ largest absorbs −1 → [3,3,3,3] → fw-col-md-3 × 4 = four equal quarters
```

So 30/23/23/24 renders as **1/4·1/4·1/4·1/4**. The grid can express twelfths and (via a
special case) fifths — nothing else. "One column slightly wider than three equal ones" is
simply not on the twelfths lattice, so the brand block lost all emphasis. The limitation is real.

## Options considered

1. **Emit the raw percentages** (a `flex-basis:<w>%` per column instead of `fw-col-md-N`).
   Unlocks any fixed ratio, small change. But the source isn't a *fixed* ratio at all — DevTools
   showed content-sized columns with `space-between` doing the distribution, not 24/25/25/26.
   A fixed % would only approximate it and still clump content to the left of each cell.
2. **A new flex `section`/container type** with content-sized columns and `justify-content`.
   Matches the source's model literally and generalizes, but it's a large new surface (option
   schema, UI, render, docs, screenshots) for what is, today, one footer band.
3. **Add an opt-in "Auto Width" mode to the existing column control.** When on, the ratio is
   ignored: columns become `flex:0 0 auto` (content-sized) and the row is a flex layout whose
   spread is a small **Distribution** select (space-between / around / center / start / end).

## Decision

Option 3. `unysonplus_footer_columns_field` gained an **Auto Width (fit to content)** switch plus
a **Distribution** select; `footer-builder.php` bypasses the twelfths snap when it's on, emitting
a `footer-row--auto` flex row (`justify-content:var(--fa-justify)`) with `footer-col--auto`
content-sized columns. The twelfths ratio stays the **default**, so no existing footer changes;
Auto is purely additive and works on all four bars (pre / main / post / copyright).

## Why

- **It matches the source's actual layout model**, not an approximation — content-hugging columns
  distributed by the row, which is exactly what `justify-content:space-between` does. Emitting a
  fixed % (option 1) would reproduce neither the widths nor the distribution.
- **Smallest lever that fully solves it.** A whole flex-section container (option 2) is the right
  home for that model *someday*, but building it speculatively for one band is the same mistake as
  swapping a working layout wholesale to gain one thing. Auto mode reuses the entire existing
  column/element/mobile-stacking machinery; it's one switch, one select, one render branch, ~20
  lines of CSS.
- **Self-contained and safe.** The Auto row/column CSS defines its own flex layout (no dependency
  on the Bootstrap grid classes it replaces), and the mode is opt-in, so the twelfths default and
  every saved footer are untouched.

The larger "flex container/section with justify-content" remains a reasonable future feature —
but it should be triggered by a real need for content-sized distribution *in page content*, not
built ahead of one.
