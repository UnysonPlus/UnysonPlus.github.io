---
title: Section
sidebar_position: 59
---

# Section

The top-level band of content — a Section wraps rows, holds your columns, and carries the background, height and spacing for a strip of the page. Its options live across the **Layout**, **Spacing**, **Animations**, and **Advanced** tabs.

## Layout

- **Section Variant** — named visual preset for the band: *Default*, *Alt* (subtle off-white, for an alternating banded rhythm down the page), *Light* (force a light background + dark text), or *Dark* (force a dark background + light text). Pairs with Background below.
- **Full Width** — switch. On, the background spans edge-to-edge while the content stays in the container; off, the whole section is constrained to the container width.
- **Min Height** — minimum section height: *Auto (fit content)*, *40% / 60% / 80% of viewport*, *Full viewport (100vh)*, or *Custom…*. Choosing Custom reveals a **Custom Height** unit-input (px, %, vh, vw, rem, em — default `600px`). Use a viewport preset with centered columns for a hero. The viewport presets are **predefined utility classes** (`.section--minh-80`, etc.); only *Custom* emits a per-instance rule.
- **Columns Horizontal Alignment** — align the section's columns within the row: *Left / Default*, *Center*, or *Right*. Only visible when the columns don't already fill the row width (e.g. a single 1/2-width column).
- **Columns Vertical Alignment** — where the columns sit vertically when the section is taller than its content (most visible with a Min Height set): *Top / Default*, *Center*, or *Bottom*.
- **Background** — a `background-pro` control with stacking color, gradient, image and video layers (image over gradient over color). Image attachment *Fixed* gives a parallax effect; video renders muted and looping with an optional poster/fallback.

## Spacing

- **Top Spacing** — vertical breathing room above the section content.
- **Bottom Spacing** — vertical breathing room below the section content.
- **Gap** — overrides the site-wide Default Gap for every Bootstrap row inside this section, setting both horizontal and vertical column gap. Default is *Use Default Gap*.
- **Gap X (override)** — overrides Gap on the horizontal axis only (space between columns side-to-side). Inherits from Gap unless set.
- **Gap Y (override)** — overrides Gap on the vertical axis only (space between columns once they wrap onto new lines). Inherits from Gap unless set.

## How each option is output

A Section keeps the markup lean by routing each setting to the **most appropriate layer**, never a raw inline style unless the value is genuinely per-instance (the background image/gradient). There are four output mechanisms:

- **Predefined utility class** — a fixed-enum option (values never change) toggles a class that is already defined once in a static stylesheet. Reusable, cacheable, zero per-instance CSS.
- **Per-page dynamic file** — an arbitrary or user-library value (a Custom height, a named Container Width) is written as a `.u{hash}`-scoped rule into that page's generated stylesheet (`…/uploads/unysonplus/css/page-{id}.css`, aggregated by `dynamic-css.php`). Still fully editable via the option; just not inline.
- **Inline `style=`** — reserved for the Background layers only, because every section has a unique image/gradient/overlay.
- **Injected markup** — patterns and shape dividers render their own elements.

The table below lists every **Layout** and **Styling** option (the Animations and Advanced tabs are the shared, cross-shortcode controls and are omitted).

| Option | Tab | What it emits on render | Where the CSS lives |
|---|---|---|---|
| **Section Variant** | Layout | class `section--{variant}` on `<section>` | Preset rules generated in `css-tokens.php` (Theme Settings → Components → Section Styles); built-in `alt/light/dark` fallbacks in the section `styles.css` |
| **Full Width** | Layout | swaps the inner wrapper class: `fw-container` ↔ `fw-container-fluid` | Grid/theme CSS (`.fw-container` / `-fluid`) |
| **Container Width** | Layout | scoped `.u{hash} .fw-container{max-width:calc(<w> + 2×gutter)}` | **Per-page file** `page-{id}.css` — widths come from a **user-extensible** named-width library (+ Custom), so there's no fixed class set |
| **Min Height** (preset) | Layout | predefined class `.section--minh-{40\|60\|80\|100}` on `<section>` | Section **`styles.css`** |
| **Min Height** (Custom) | Layout | scoped `.u{hash}{min-height:<value>}` | **Per-page file** `page-{id}.css` |
| **Columns Horizontal Alignment** | Layout | class `section--cols{-md\|-lg}-{center\|right\|between\|around\|evenly}` | Section **`styles.css`** (sets `justify-content` on inner `.row`/`.fw-row`) |
| **Columns Vertical Alignment** | Layout | predefined class `section--valign-{stretch\|center\|bottom}` (Top emits none) | Section **`styles.css`** |
| **Column Order** (reverse) | Layout | classes `section--rev`, `section--rev-{md\|lg}-{on\|off}` | Section **`styles.css`** (`flex-direction:row-reverse`/`column-reverse`) |
| **Text Alignment** | Styling | Bootstrap utility class `text-{start\|center\|end}` on `<section>` | Theme/Bootstrap utilities (cascades to nested content) |
| **Background** — color / gradient / image / overlay | Styling | **inline** `background-*` on `<section>` (overlay ▸ image ▸ gradient ▸ color) via `sc_bg_pro_style()` | Inline (genuinely per-instance) |
| **Background** — video | Styling | class `background-video` + `data-background-options` (JSON) on `<section>`; injected video layer | Section **`background.css`** (Formstone) + **`styles.css`** |
| **Background Pattern** | Styling | injected `.pattern-layer` markup + flag class `upw-has-pattern` | Theme pattern library (Components → Background Patterns) |
| **Top / Bottom Shape Divider** | Styling | injected `.sc-shape-divider--{top\|bottom}` SVG + flag class `section--has-divider`; per-instance `height`/`transform`/`fill` inline on that SVG | Section **`styles.css`** (positioning) + inline (per-divider size/color) |
| **Top / Bottom Spacing** | Styling | responsive spacing utility classes (`pt-*` / `pb-*`) | Shared spacing pipeline utilities |
| **Gap** / **Gap X** / **Gap Y** | Styling | classes `section--gap{-md\|-lg}-{slug}`, `section--gap-x…`, `section--gap-y…` | Generated in `css-tokens.php` (`--bs-gutter-x/-y` overrides on inner `.row`s) |

:::note Why some values are classes and others go to the page file
**Min Height** and **Vertical Alignment** are fixed enums — a small, unchanging set of values — so each is a reusable predefined class. **Container Width** draws from a *user-extensible* named-width library (you can define your own widths in Theme Settings) and also accepts a Custom value, so there's no fixed class set; each section's chosen width is written to that page's generated stylesheet instead. Either way the value stays fully editable from the option — the difference is only *where the CSS is written*, never inline on the element.
:::

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
