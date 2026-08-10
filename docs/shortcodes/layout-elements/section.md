---
title: Section
sidebar_position: 59
hide_table_of_contents: true
---

# Section

The top-level band of content — a Section wraps rows, holds your columns, and carries the background, height and spacing for a strip of the page. Its options live across the **Layout**, **Styling**, **Animations**, and **Advanced** tabs.

Each setting is routed to the leanest layer that fits it — never a raw inline style unless the value is genuinely per-instance. The four output mechanisms used below:

- **Predefined utility class** — a fixed-enum option (a small, unchanging set of values) toggles a class defined once in a static stylesheet. Reusable, cacheable, zero per-instance CSS.
- **Per-page dynamic file** — an arbitrary or user-library value (a Custom height, a named Container Width) is written as a `.u{hash}`-scoped rule into that page's generated stylesheet (`…/uploads/unysonplus/css/page-{id}.css`, aggregated by `dynamic-css.php`). Still fully editable from the option; just not inline.
- **Inline `style=`** — reserved for the Background layers, because every section has a unique image/gradient/overlay.
- **Injected markup** — patterns and shape dividers render their own elements.

The **Animations** and **Advanced** tabs are the shared, cross-shortcode controls and are omitted below.

## Layout

| Option | `atts` key | Control | Default | Responsive | Renders as | Stylesheet |
|---|---|---|---|---|---|---|
| **Section Variant** | `variant` | Section-style select | Default | No | class `section--{variant}` on `<section>` | Generated `uploads/unysonplus/css/presets-{hash}.css` (Section Styles library, by `css-tokens.php`) · `alt/light/dark` fallbacks in section `styles.css` |
| **Full Width** | `is_fullwidth` | switch | No | No | swaps inner wrapper class `fw-container` ↔ `fw-container-fluid` | Grid CSS — builder `frontend-grid.css` + theme `style.css` |
| **Container Width** | `container_width` | multi-picker (preset / Custom) | Inherit | No | scoped `.u{hash} .fw-container{max-width:calc(<w> + 2×gutter)}` | Per-page `uploads/unysonplus/css/page-{id}.css` |
| **Min Height** (preset) | `min_height` | multi-picker (preset / Custom) | Auto | No | predefined class `.section--minh-{40\|60\|80\|100}` | Section `styles.css` |
| **Min Height** (Custom) | `min_height` | multi-picker → Custom unit-input | Auto (`600px` when Custom) | No | scoped `.u{hash}{min-height:<value>}` | Per-page `uploads/unysonplus/css/page-{id}.css` |
| **Columns Horizontal Alignment** | `column_halign` | responsive image-picker | Default (left) | Yes (base/md/lg) | class `section--cols{-md\|-lg}-{center\|right\|between\|around\|evenly}` | Section `styles.css` |
| **Columns Vertical Alignment** | `column_valign` | image-picker | **Stretch** | No | predefined class `section--valign-{stretch\|center\|bottom}` (Top emits none) | Section `styles.css` |
| **Column Order** (reverse) | `reverse_columns` | responsive switch | No | Yes (base/md/lg) | classes `section--rev`, `section--rev-{md\|lg}-{on\|off}` | Section `styles.css` |

- **Section Variant** — named visual preset for the band: *Default*, *Alt* (subtle off-white, for an alternating banded rhythm down the page), *Light* (force a light background + dark text), or *Dark* (force a dark background + light text). Pairs with Background on the Styling tab.
- **Full Width** — switch. On, the background spans edge-to-edge while the content stays in the container; off, the whole section is constrained to the container width.
- **Container Width** — constrain this section's content band to a narrower width than the site-wide Container Width: a **named preset** from the Container Widths library (Theme Settings → Components → Section Styles → Container Widths) or *Custom* (a unit-input). *Inherit* uses the global width.
- **Min Height** — minimum section height: *Auto (fit content)*, *40% / 60% / 80% of viewport*, *Full viewport (100vh)*, or *Custom…*. Choosing Custom reveals a **Custom Height** unit-input (px, %, vh, vw, rem, em — default `600px`). The viewport presets are predefined utility classes (`.section--minh-80`, etc.); only *Custom* emits a per-instance rule. Use a viewport preset with centered columns for a hero.
- **Columns Horizontal Alignment** — align the section's columns within the row: *Left / Default*, *Center*, *Right*, *Between*, *Around*, or *Evenly*. Most visible when the columns don't already fill the row width. Per-breakpoint (base / tablet / desktop).
- **Columns Vertical Alignment** — where the content sits vertically when the section is taller than its content (most visible with a Min Height): *Top / Default*, *Center*, *Bottom*, or *Stretch* (columns grow to fill the height).
- **Column Order** — reverse the column order (e.g. swap an image/text pair), with independent per-breakpoint on/off overrides for tablet and desktop.

## Styling

| Option | `atts` key | Control | Default | Responsive | Renders as | Stylesheet |
|---|---|---|---|---|---|---|
| **Text Alignment** | `text_align` | alignment buttons | Inherit | No | Bootstrap class `text-{start\|center\|end}` (cascades to nested content) | Bootstrap utilities — theme `assets/css/bootstrap.min.css` |
| **Background** — color / gradient / image / overlay | `background` | `background-pro` | None | No | **inline** `background-*` (overlay ▸ image ▸ gradient ▸ color) via `sc_bg_pro_style()` | Inline `style=` — no stylesheet (genuinely per-instance) |
| **Background** — video | `background` | `background-pro` (video layer) | None | No | class `background-video` + `data-background-options` (JSON); injected video layer | Section `background.css` (Formstone) + `styles.css` |
| **Background Pattern** | `background_pattern` | multi-picker | None | No | injected `.pattern-layer` markup + flag class `upw-has-pattern` | Theme pattern-library CSS (Components → Background Patterns) |
| **Top / Bottom Shape Divider** | `divider_top` / `divider_bottom` | multi-picker (shape/color/height/flip) | None | No | injected `.sc-shape-divider--{top\|bottom}` SVG + flag class `section--has-divider` | Section `styles.css` (positioning) + inline `style=` (per-divider height/transform/fill) |
| **Top / Bottom Spacing** | `padding_top` / `padding_bottom` | spacing field | None | Yes | responsive spacing utility classes (`pt-*` / `pb-*`) | Bootstrap-scale utilities in `bootstrap.min.css`; arbitrary values → per-page `page-{id}.css` |
| **Gap** / **Gap X** / **Gap Y** | `gap` / `gap_x` / `gap_y` | responsive short-select | Use Default Gap / inherit | Yes | classes `section--gap{-md\|-lg}-{slug}`, `section--gap-x…`, `section--gap-y…` | Generated `uploads/unysonplus/css/presets-{hash}.css` (by `css-tokens.php`) |

- **Text Alignment** — sets the CSS `text-align` for all content in this section — headings, paragraphs and buttons inherit it together. *Inherit* forces nothing.
- **Background** — a `background-pro` control with stacking color, gradient, image and video layers (overlay over image over gradient over color). Image attachment *Fixed* gives a parallax effect; video renders muted and looping with an optional poster/fallback.
- **Background Pattern** — an optional decorative pattern layer painted behind the content (from the Background Patterns library).
- **Top / Bottom Shape Divider** — an SVG-shaped edge (tilt / curve / wave / triangle) at the section's top and/or bottom, each with its own color, height and horizontal flip.
- **Top Spacing / Bottom Spacing** — vertical breathing room above / below the section content.
- **Gap** — overrides the site-wide Default Gap for every Bootstrap row inside this section, setting both horizontal and vertical column gap. Default is *Use Default Gap*.
- **Gap X (override) / Gap Y (override)** — override Gap on just the horizontal / vertical axis. Each inherits from Gap unless set.

:::note Why some values are classes and others go to the page file
**Min Height** and **Vertical Alignment** are fixed enums — a small, unchanging set of values — so each is a reusable predefined class. **Container Width** draws from a *user-extensible* named-width library (you can define your own widths in Theme Settings) and also accepts a Custom value, so there's no fixed class set; each section's chosen width is written to that page's generated stylesheet instead. Either way the value stays fully editable from the option — the difference is only *where the CSS is written*, never inline on the element.
:::

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
