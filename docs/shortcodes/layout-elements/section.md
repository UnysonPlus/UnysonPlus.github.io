---
title: Section
sidebar_position: 59
---

# Section

The top-level band of content — a Section wraps rows, holds your columns, and carries the background, height and spacing for a strip of the page. Its options live across the **Layout**, **Spacing**, **Animations**, and **Advanced** tabs.

## Layout

- **Section Variant** — named visual preset for the band: *Default*, *Alt* (subtle off-white, for an alternating banded rhythm down the page), *Light* (force a light background + dark text), or *Dark* (force a dark background + light text). Pairs with Background below.
- **Full Width** — switch. On, the background spans edge-to-edge while the content stays in the container; off, the whole section is constrained to the container width.
- **Min Height** — minimum section height: *Auto (fit content)*, *40% / 60% / 80% of viewport*, *Full viewport (100vh)*, or *Custom…*. Choosing Custom reveals a **Custom Height** unit-input (px, %, vh, vw, rem, em — default `600px`). Use a viewport preset with centered columns for a hero.
- **Columns Horizontal Alignment** — align the section's columns within the row: *Left / Default*, *Center*, or *Right*. Only visible when the columns don't already fill the row width (e.g. a single 1/2-width column).
- **Columns Vertical Alignment** — where the columns sit vertically when the section is taller than its content (most visible with a Min Height set): *Top / Default*, *Center*, or *Bottom*.
- **Background** — a `background-pro` control with stacking color, gradient, image and video layers (image over gradient over color). Image attachment *Fixed* gives a parallax effect; video renders muted and looping with an optional poster/fallback.

## Spacing

- **Top Spacing** — vertical breathing room above the section content.
- **Bottom Spacing** — vertical breathing room below the section content.
- **Gap** — overrides the site-wide Default Gap for every Bootstrap row inside this section, setting both horizontal and vertical column gap. Default is *Use Default Gap*.
- **Gap X (override)** — overrides Gap on the horizontal axis only (space between columns side-to-side). Inherits from Gap unless set.
- **Gap Y (override)** — overrides Gap on the vertical axis only (space between columns once they wrap onto new lines). Inherits from Gap unless set.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
