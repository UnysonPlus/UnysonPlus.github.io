---
title: Portfolio Grid
sidebar_position: 83
---

# Portfolio Grid

A filterable grid of portfolio projects — the work index.

The block renders through the `portfolio` element — the same PHP that runs in the page builder, so the front
end is identical either way.

:::caution[Needs the Portfolio extension]
This element ships with the **Portfolio** extension, which is **inactive by default**. Activate it
under *Unyson+ → Extensions* and the block appears in the inserter.

With the extension off the block does not register at all — deliberately, so it cannot appear as an
inserter entry with an empty sidebar that renders nothing.
:::

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `categories` | Restrict to these project categories |
| `count` | How many to show |
| `featured_only` | Only featured projects |
| `orderby` | Sort field |
| `order` | Ascending or descending |
| `pagination` | Paginate the grid |
| `link_to` | Where a project links |
| `layout` | Grid layout |
| `columns` | How many per row |
| `ratio` | Thumbnail crop ratio |
| `hover` | Hover effect |
| `gap` | Space between items |
| `image_size` | Which registered image size |
| `show_filters` | Show category filter buttons |
| `show_summary` | Show each project summary |
| `show_category` | Show each project category |
| `text_color` | Text colour |
| `bg_color` | Background |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[The query runs for real in the editor]
The canvas shows this site's actual projects. What it does **not** do is filter or paginate: both
replace what the grid is showing, so the preview would stop being a preview of the query you are
editing.
:::

:::note[An empty grid usually means an empty query]
No projects yet, or categories narrower than the projects that exist. The block says which rather
than rendering nothing.
:::
