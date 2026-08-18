---
title: Table of Contents
sidebar_position: 54
---

# Table of Contents

A contents list built from the page's headings, with scrollspy, sticky positioning and collapsible sections.

The block renders through the [`toc`](/docs/shortcodes/content-elements/toc) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `title` | Heading above the list |
| `levels` | Which heading levels to collect |
| `hierarchical` | Nest sub-headings |
| `min_headings` | Do not render below this many headings |
| `numeration` | Number the entries |
| `numeration_suffix` | What follows each number |
| `collapsible` | Let visitors collapse it |
| `collapsed_default` | Start collapsed |
| `label_show` | Text for the expand control |
| `label_hide` | Text for the collapse control |
| `scope` | Which part of the page to scan |
| `scope_selector` | A custom selector for that scope |
| `smooth_scroll` | Animate the jump |
| `scroll_offset` | Offset for a fixed header |
| `scrollspy` | Highlight the section being read |
| `nofollow` | Mark the links nofollow |
| `noindex` | Keep the list out of search results |
| `width` | How wide the list runs |
| `custom_width` | A specific width |
| `float` | Float it beside the content |
| `sticky` | Keep it visible while scrolling |
| `sticky_offset` | Offset when stuck |
| `title_size` | Title size |
| `items_size` | Entry size |
| `bg_color` | Background |
| `border_color` | Border |
| `title_color` | Title colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[This is the one block whose preview cannot be accurate]
A table of contents is built from the headings of the page it sits on — and in the block editor those
headings live in **other blocks**, which the server does not see while rendering this one.

So the canvas shows the element's own placeholder rather than a list that would be wrong. Preview the
page to see the real contents. Everything else about the block — styling, position, options — previews
normally.
:::

:::note[`levels` is a checkbox list]
It is a [`checkboxes`](/docs/options/option-types/checkboxes) option. Collecting `h2` and `h3` is the
usual answer; collecting everything down to `h6` produces a contents list longer than some of the
sections it indexes.
:::

:::note[Set `scroll_offset` if the theme has a fixed header]
Without it, jumping to a heading puts that heading underneath the header. It is the most common
complaint about any in-page jump link.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
