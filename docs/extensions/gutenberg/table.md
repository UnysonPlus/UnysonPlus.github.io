---
title: Table
sidebar_position: 81
---

# Table

A data table with sorting, search, pagination and a sticky header.

The block renders through the [`table`](/docs/shortcodes/content-elements/table) element — the same
PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `table` | The table itself — columns, rows and cells |
| `table_preset` | Table style preset |
| `frame_preset` | Frame around the table |
| `style_striped` | Alternate row shading |
| `style_hover` | Highlight the row under the pointer |
| `style_bordered` | Cell borders |
| `style_condensed` | Tighter rows |
| `sticky_header` | Keep the header visible while scrolling |
| `caption` | Caption text |
| `caption_position` | Above or below |
| `enable_sort` | Let visitors sort by column |
| `enable_search` | Add a search box |
| `enable_pagination` | Paginate long tables |
| `pagination_length` | Rows per page |
| `enable_length_change` | Let visitors change that |
| `enable_info` | Show the "showing X of Y" line |
| `text_color` | Cell text colour |
| `bg_color` | Background |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[Cells are edited in the sidebar, as a list of rows]
The [`table`](/docs/options/option-types/table) control lists each row's cells rather than drawing a
grid — a sidebar column is not a grid. Column alignment and width, and the header and footer row
counts, are here.

**Merging cells stays in the page builder**, where there is a grid to merge across. Merges made there
survive editing here untouched: the control spreads a cell when its text changes rather than
rebuilding it.
:::

:::note[Sorting, search and pagination do not work in the canvas]
All three replace what the table is showing, which in an editor means the preview stops being a
preview of the rows you are editing.
:::
