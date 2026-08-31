---
title: Footer
sidebar_position: 5
slug: /theme-settings/footer
description: The Unyson+ theme footer — background and colors, the Pre / Main / Post footer rows with column ratios, and the copyright bar.
---

# Footer

The **Footer** tab builds the footer from a Layout sub-tab plus up to three stacked rows and a
copyright bar.

## Layout

**Footer → Layout** sets the footer's look:

| Setting | What it does |
| --- | --- |
| **Background** (`footer_background`) | A background-pro control (color, gradient, or image). |
| **Text / Link Color** | Default footer text and link colors (blank inherits). |
| **Border** | A top border shorthand (width, style, color) with a choice of which edges and how far it runs (full width, container, or a custom width). |
| **Padding Top / Bottom** | Space above and below the footer, from the spacing scale. |

## The footer rows

The footer stacks three optional **Footer Columns** rows, each with its own styling block:

- **Pre** (`pre_footer_columns`) — default 1 column.
- **Main** (`main_footer_columns`) — **default 3 columns**, the main widget/link area.
- **Post** (`post_footer_columns`) — default 1 column.

Each row is a column control: pick a **column count**, set the **ratio** between columns (a split
slider that sums to 100%), and fill each column with page-builder elements.

## Copyright

**Footer → Copyright** (`copyright_settings`) is a toggle (on by default) that reveals a small columns
control. Column one is pre-filled with a copyright line —
`© {{current_year}} <site>. All rights reserved.` — using [Dynamic Content](/dynamic-content) for
the year, so it stays current on its own.

:::tip[Element reference]
For each element type you can place in a bar/column (logo, menu, CTA, text, search, social icons, spacer…), see [Header & Footer Elements](/theme/header-footer-elements) — full detail, generated HTML, and examples.
:::
