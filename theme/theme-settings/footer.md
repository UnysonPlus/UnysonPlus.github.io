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
| **Boxed Body** (`footer_body_box`) | Off by default. On, the footer's content rows (Pre / Main / Post — and, with **Copyright Inside the Panel**, the copyright bar) sit in **one inset panel**: a max width and a side gutter (the panel is `min(Max Width, 100% - 2 × gutter)`), its own vertical / horizontal padding, a background (colour, gradient or image) painted over the footer background, a border on all four edges, a corner radius and a drop shadow. The footer's Padding Top / Bottom becomes the space *around* the panel, and the bars inside drop their container gutter — the panel padding is the gutter. |

### Boxed Body

The "card footer" pattern — a bordered or tinted panel floating on the footer background with the columns and the
bottom bar inside it — is one switch. Turn **Boxed Body** on, give the panel a max width (leave it empty to use the
site Container Width), a gutter, its padding, and whatever skin the design calls for. Set the rows inside it to
**Full Width** in their styling block so they span the panel exactly. If the copyright line belongs inside the panel
(under a divider), turn on **Copyright Inside the Panel** and give the copyright bar a top border in its own styling
block — it becomes the panel's bottom row instead of a flush bar under it.

## The footer rows

The footer stacks three optional **Footer Columns** rows, each with its own styling block:

- **Pre** (`pre_footer_columns`) — default 1 column.
- **Main** (`main_footer_columns`) — **default 3 columns**, the main widget/link area.
- **Post** (`post_footer_columns`) — default 1 column.

Each row is a column control: pick a **column count**, set the **ratio** between columns (a split
slider that sums to 100%), and fill each column with page-builder elements.

Each row's styling block also has a **Column Alignment** (Top / Middle / Bottom): how the columns line up
vertically when their heights differ. A tall lead heading beside a short row of links usually wants **Bottom**, so
the links sit on the heading's baseline instead of floating at the top of the column.

## Copyright

**Footer → Copyright** (`copyright_settings`) is a toggle (on by default) that reveals a small columns
control. Column one is pre-filled with a copyright line —
`© {{current_year}} <site>. All rights reserved.` — using [Dynamic Content](/dynamic-content) for
the year, so it stays current on its own.

:::tip[Element reference]
For each element type you can place in a bar/column (logo, menu, CTA, text, search, social icons, spacer…), see [Header & Footer Elements](/theme/header-footer-elements) — full detail, generated HTML, and examples.
:::
