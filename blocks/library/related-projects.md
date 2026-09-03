---
title: Related Projects
description: The Unyson+ Related Projects block — a grid of projects related to the current one, authored in the block editor and rendered by the Portfolio extension.
---

# Related Projects

A grid of **other projects related to the one being viewed** — a natural "you might also like" at the foot of a project page, drawn from the same portfolio category. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/related-projects/front.png" alt="The Related Projects block — two related project cards" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Count (`count`) | How many related projects to show. |
| Heading (`heading`, `heading_tag`) | An optional heading above the grid (e.g. "Related work"). |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Reads the current project
This block relates to the **project in context**, so it renders on a single-project page (or a project template). It matches by portfolio category, so give your projects categories for the best results.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above shows two related projects:

```html
<!-- wp:unysonplus/related-projects {"upOptions":{"count":"2"}} /-->
```

## Part of the Portfolio extension

This block reads **Projects** — the custom post type the **[Portfolio](/extensions/portfolio)** extension registers. Its companions are **[Portfolio](/blocks/library/portfolio)** (the grid), **[Project Details](/blocks/library/project-details)**, **[Project Gallery](/blocks/library/project-gallery)**, **[Project Results](/blocks/library/project-results)** and **[Project Testimonial](/blocks/library/project-testimonial)**.
