---
title: "Page Builder Roadmap"
slug: /page-builder/roadmap
sidebar_position: 2
sidebar_label: "Roadmap"
description: "Where the Unyson+ Page Builder is heading — a simpler, modern layout model built on one primitive (the Div), while every page you've already built keeps working."
---

# Page Builder Roadmap

This page is a living roadmap for the Page Builder's layout system. It's here so you can **see
what's coming and why**. Nothing below changes how your existing pages work — backward
compatibility is a hard rule (see [Bootstrap stays](#bootstrap-stays)).

:::note[Status legend]
🟢 **Shipped** &nbsp;·&nbsp; 🟡 **In progress** &nbsp;·&nbsp; ⚪ **Planned** &nbsp;·&nbsp; 🔵 **Exploring**
:::

## The direction: one simple layout primitive

Today the builder has **two** ways to lay things out side by side:

- the classic **Section → Row → Column** grid (you pick a column width — 1/2, 1/3, …), and
- the newer **Div** (a flexbox/grid container).

Two systems that both "do columns" is confusing — especially for new users. The direction is to
make the **Div the one layout primitive** for new work, and let the classic grid live on as a
fully-supported **legacy** option. The Div already does both modern layout modes:

- **Flex** — a one-dimensional row or stack (great for toolbars, button groups, cards that wrap).
- **Grid** — a two-dimensional column layout (the modern way to do "columns").

## How modern builders do columns (and what we're keeping)

You've probably noticed that newer builders stopped shipping a palette of fixed column
structures. Instead of picking "1/3 + 1/3 + 1/3" up front, you:

- **Elementor** → drop a **Flexbox/Grid Container**, set it to Grid, choose a column count.
- **Webflow / Framer** → a **Grid** or **Stack**, size each child (fill / fixed / span).
- **Gutenberg** → a **Group** block with a Flex or Grid layout.

The common thread: **the container is the layout; you set "how many columns," and children fill
the tracks** — no fraction math to learn. UnysonPlus is adopting that model with the Div's Grid
mode, while keeping what makes us different: **clean vanilla-CSS output (no utility-class bloat),
responsive by default, and the classic grid still available** for anyone who wants it.

The plan for columns, kept deliberately straightforward:

- Drop a **Div**, choose **Columns (Grid)**, pick **how many** (2, 3, 4…). Equal, responsive
  columns — done.
- Need an uneven split? Set one child's **span** (e.g. 8 / 4) — the twelfths are still there when
  you want them, just not required to get started.
- **Auto** columns fill the remaining space (the grid equivalent of "flex: 1").

## What's coming

| Phase | What | Status |
|---|---|---|
| Converter → flex layout | The **Site Converter** now rebuilds a source's content rows as flex **Div** rows instead of Bootstrap columns (sections/containers unchanged). | 🟡 In progress |
| Div = default wrapper | Dropping an element on an **empty canvas** wraps it in a **Div** (not Section → Column). Its HTML tag is set by context — `section` at the root, `div` when nested. | ⚪ Planned |
| Columns as Grid | Drop a Column into a Div and it becomes a **Grid** — the Div flips to `display:grid` and the column becomes a grid cell (`grid-column: span N`). "How many columns" replaces fraction-picking. | ⚪ Planned |
| Content width on the Div | A **Content Width** option so a full-width `section` Div can centre its content to a max-width — no extra wrapper, no accidental full-bleed. | ⚪ Planned |
| Live Editor parity | Every new behaviour works identically in the **backend builder** and the front-end **Live Page Editor**. | ⚪ Planned |
| Uneven / advanced grids | Per-child span, `auto-fit` responsive grids, and gap controls surfaced simply. | 🔵 Exploring |

## Bootstrap stays — nothing you built breaks {#bootstrap-stays}

This is not a migration you're forced into:

- Every existing **Section / Row / Column** page keeps rendering and editing exactly as it does
  today. The classic grid is **not** being removed.
- The two models **coexist**. New pages lead with the Div; older pages stay classic.
- A **"Convert to Grid Div"** action is planned for when you *want* to modernise a classic row —
  opt-in, never automatic.
- Column widths still work the way [Column widths &amp; the grid](./column-widths.md) describes;
  inside a Div they simply render as grid spans instead of Bootstrap grid classes.

## Principles guiding this

- **Straightforward for new users** — one obvious way to lay out a page, no dual systems in your face.
- **Nothing breaks** — backward compatibility is non-negotiable.
- **Clean output** — semantic HTML and vanilla CSS, not a wall of utility classes.
- **We can still be different** — adopt the good ideas from modern builders without copying their bloat.

:::info[Have an opinion?]
This roadmap will shift as the work lands and as feedback comes in. The order and scope of the
planned phases can change.
:::
