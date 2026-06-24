---
title: Set global colors and fonts
description: Define your site's color palette and typography once in Unyson+ Theme Settings, and have the whole site and every builder element follow.
---

# Set global colors and fonts

Set your brand's palette and typography in one place and the entire site, including the page-builder
elements, follows. No per-element styling, no CSS.

## Colors

Your color **palette** lives in the Component Presets (Unyson+ → Extensions → Shortcodes → Settings).
Each named color becomes a reusable preset you can pick anywhere a color is chosen, and it emits a
`text-{name}` / `bg-{name}` utility class. Change a palette color once and everywhere it's used
updates.

## Typography

Open **Appearance → Theme Settings → General → Typography**. Set the family, size, weight,
line-height, letter-spacing, and color for **h1–h6** and **body** (with mobile tiers). Add
**Custom Fonts** (self-hosted `.woff2`) in the same area if you're not using a Google font.

## Layout & roundness

Still in **Theme Settings → General → Layout**: site width and background, the spacing scale,
container gutter, and **Border Roundness** (which drives the `--radius` tokens on cards, buttons,
inputs, and images).

## How it's applied

Everything you set is compiled into a **single generated stylesheet** (no inline-style soup), built
from CSS custom properties the theme generates from your settings. See
[How settings become CSS](/docs/theme/settings-to-css).

## Move a design between sites

Colors, fonts, header/footer, and custom CSS export as one file: **Theme Settings → Miscellaneous →
Export / Import**. See [Child themes → moving a design](/docs/theme/child-themes#moving-a-design-between-sites).

## See also

- [Theme Settings](/docs/theme/theme-settings)
- [Presets & design tokens](/docs/hooks/presets-and-tokens) — registering presets in code
