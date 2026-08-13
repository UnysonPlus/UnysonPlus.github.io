---
title: Table Presets
sidebar_position: 11
slug: /components/table-presets
description: The Unyson+ Table Presets library — reusable table skins that emit a .tbl-{slug} class covering header, body, stripes, hover, footer and caption.
---

# Table Presets

**Theme Settings → Components → Table Presets** is a library of reusable **table skins**. Each preset
produces a **`.tbl-{slug}`** class you pick on a **Table** (Table Options → Table Preset), covering the
**Header / Body / Striped / Hover / Footer / Caption** skins plus grid lines, frame, corner radius and
cell padding.


![Theme Settings → Components → Table Presets](/img/theme/components/table-presets.png)

## How it's coded

Stored under **`table_presets`**, a [`table-presets`](/docs/options/option-types/table-style-picker)
option (`components-table.php`). Each preset groups the per-region color/skin fields (header fill + text,
body, stripe tint, row hover, footer, caption) and the structural fields (grid, frame, radius, padding).
Colors reference your [Color Presets](./color-presets.md).

## The output CSS

`unysonplus_build_presets_css_string()` emits a `.tbl-{slug}` rule set targeting the table's regions
(`.tbl-{slug} > table > thead`, `tbody tr:nth-child(even)`, `tr:hover`, `tfoot`, `caption`…), plus the
frame / radius / padding. It's written to the shared cached `presets-{hash}.css` — see the
[shared pipeline](./index.md#how-the-whole-system-works-shared-pipeline).

:::note[Converter reuse]
The Site Converter wraps a verbatim `<table>` in the default table preset's `.tbl-{slug}` skin so an
imported table renders styled instead of bare.
:::

## How it's picked

A Table's **Table Preset** control is the
[`table-style-picker`](/docs/options/option-types/table-style-picker) (live preview of every
`.tbl-{slug}`).

## Related

- [Page Builder Elements](/docs/shortcodes/overview) · [`table-style-picker`](/docs/options/option-types/table-style-picker) · [Components overview](./index.md)
