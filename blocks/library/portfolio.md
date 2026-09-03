---
title: Portfolio
description: The Unyson+ Portfolio block — A filterable grid of portfolio projects — pulled straight from your Projects, with categories, hover effects and pagination, authored in the block editor and rendered by the Portfolio extension.
---

# Portfolio

A filterable grid of portfolio projects — pulled straight from your Projects, with categories, hover effects and pagination. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Portfolio element](/shortcodes/media-elements/portfolio-grid) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/portfolio/front.png" alt="The Portfolio block — a three-column grid of project cards" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Source (`count`, `categories`, `featured_only`, `order`, `orderby`) | Which projects to show, from which categories, and how many. |
| Layout (`layout`, `columns`, `gap`, `ratio`, `image_size`) | Grid columns, spacing and card image crop. |
| Cards (`show_category`, `show_summary`, `hover`, `link_to`) | What each card shows, its hover effect, and where it links. |
| Filters + Pagination (`show_filters`, `pagination`) | A category filter bar and paged loading. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Needs the Portfolio extension
This block reads **Projects** — the custom post type the **Portfolio** extension registers. Activate it, add a project or two, and fill in their details.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/portfolio {"upOptions":{"count":"3","columns":"3"}} /-->
```

## The portfolio element

The block and the page builder's [Portfolio element](/shortcodes/media-elements/portfolio-grid) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
