---
title: Posts
---

# Posts

A query-driven grid or list of posts — a blog index, a related-articles strip, a filtered archive. Core has Query Loop; this is the one with card layouts, live filters and image treatments.

The block renders through the [`posts`](/shortcodes/components/posts) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `use_current_query` | Use the page's own query instead of building one |
| `post_type` | Which post type |
| `taxonomy_filter` | Restrict by taxonomy terms |
| `taxonomy_relation` | AND or OR across those terms |
| `include_ids` | Only these posts |
| `exclude_ids` | Never these posts |
| `author_ids` | Restrict by author |
| `date_range` | Restrict by date |
| `posts_per_page` | How many to show |
| `offset` | Skip this many first |
| `orderby` | Sort field |
| `order` | Ascending or descending |
| `exclude_current` | Leave out the post being viewed |
| `sticky_handling` | What to do with sticky posts |
| `design` | Layout family, and its settings |
| `card` | Card style, and its settings |
| `card_rows` | Which rows a card shows, and in what order |
| `box_style` | Card box / border preset |
| `image_style` | Image treatment preset |
| `image_size` | Which registered image size |
| `image_ratio` | Crop ratio |
| `card_padding` | Card padding |
| `text_align` | Text alignment |
| `mobile_layout_override` | A different layout on small screens |
| `title_tag` | Heading level for card titles |
| `cat_position` | Where the category chip sits |
| `cat_max` | How many categories to show |
| `meta_items` | Which meta to print — date, author, comments |
| `meta_layout` | How that meta is arranged |
| `date_format` | Date format |
| `excerpt_source` | Where the excerpt comes from |
| `excerpt_length` | Excerpt length |
| `excerpt_suffix` | What follows a trimmed excerpt |
| `readmore` | Read-more link style, and its settings |
| `readmore_text` | Read-more text |
| `pagination` | Pagination style, and its settings |
| `live_filters` | Show filter controls to visitors |
| `filters_position` | Where those filters sit |
| `no_results_text` | What to say when nothing matches |
| `text_color` | Body text colour |
| `bg_color` | Background |
| `title_color` | Title colour |
| `excerpt_color` | Excerpt colour |
| `meta_color` | Meta colour |
| `accent_color` | Accent colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The query runs for real in the editor]
The canvas shows actual posts from this site, not a mock. That is the whole reason this block is
worth having over a placeholder — you can see whether the query returns what you meant.

What it does **not** do: pagination does not paginate, and live filters do not filter. Both would
swap the preview's contents for a different set of posts, leaving you unsure which query you were
looking at.
:::

:::note[`meta_items` is a checkbox list]
It is a [`checkboxes`](/options/option-types/checkboxes) option — tick the meta you want. Only
ticked entries are stored.
:::

:::note[Caching stays in the page builder]
`cache_output` and `cache_hours` are not exposed here. A cached block previewing a stale query in the
editor is a confusing first encounter with caching, and the setting is better made once, deliberately,
where the whole page is in view.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
