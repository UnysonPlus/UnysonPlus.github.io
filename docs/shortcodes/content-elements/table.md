---
title: Table
sidebar_position: 14
sidebar_custom_props: { icon: '/img/shortcode-icons/table.svg' }
---

# Table

A data table with optional interactivity. Tabs: **Content**, **Table Options**, **Styling**,
**Animations**, **Advanced**.

:::tip[💡 Web dev tip: tables are for data, not layout]
A `<table>` should hold **tabular data** — rows and columns that relate to each other — never page layout (use CSS grid or flexbox to arrange a page). For accessibility, each column needs a header cell marked `scope="col"` (and row headers `scope="row"`) so a screen reader can announce *which* header a value belongs to, plus a `<caption>` naming the table. UnysonPlus outputs a real `<table>`, so these semantics carry straight through to the page. [MDN: HTML tables](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics)
:::

## Table Options

<img src="/img/shortcodes/table-table-options.png" alt="Table options panel — Table Options tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Table Preset** | A named style preset (or none) |
| **Frame (Border Preset)** | A border-frame preset (or none) |
| **Alternating Row Colors** | On/Off |
| **Row Hover Highlight** | On/Off |
| **Bordered** | On/Off |
| **Compact** | On/Off |
| **Sticky Header** | On/Off |
| **Caption** / **Caption Position** | Text; Below or Above the table |
| **Sorting** | On/Off |
| **Search / Filter** | On/Off |
| **Pagination** | On/Off |
| **Rows Per Page** / **Rows-Per-Page Selector** | Page size + selector |
| **Info Line** | "Showing x–y of z" |

:::note[Screenshots — presets & interactive features]
Capture a couple of presets and the interactive features: `table-preset-1`,
`table-bordered`, `table-with-search`, `table-paginated`.
:::

## Styling

<img src="/img/shortcodes/table-styling.png" alt="Table options panel — Styling tab" width="1200" />

Text Color, Background Color, and Margin & Padding.

## Content

![Table options panel — Content tab](/img/shortcodes/table-content.png)

## Content

<img src="/img/shortcodes/table-content.png" alt="Table options panel — Content tab" width="1200" />