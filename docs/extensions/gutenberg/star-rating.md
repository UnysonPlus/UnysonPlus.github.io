---
title: Star Rating
sidebar_position: 4
---

# Star Rating

A star rating with an optional score, label and review count — for reviews, testimonials and comparison tables.

The block renders through the [`star_rating`](/shortcodes/components/star-rating) element — the same PHP that runs in the page builder, so
the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `rating` | The score, as a slider |
| `max` | How many stars the scale runs to |
| `label` | Text shown beside the stars |
| `show_value` | Print the numeric score (e.g. 4.5/5) |
| `count_text` | Review-count text, e.g. “128 reviews” |
| `design` | Star style |
| `size` | Star size |
| `align` | Horizontal alignment |
| `fill_color` | Filled star colour |
| `empty_color` | Empty star colour |
| `text_color` | Label and score colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[Structured data stays in the page builder]
The element can emit review schema markup (`rating_schema`). That is not exposed here, because
search engines penalise review markup on content that is not a genuine review — it is a decision to
make deliberately, in the page builder, rather than to toggle casually in a sidebar.
:::
