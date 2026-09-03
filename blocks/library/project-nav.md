---
title: Project Navigation
description: The Unyson+ Project Navigation block — previous/next links between projects, authored in the block editor and rendered by the Portfolio extension.
---

# Project Navigation

**Previous / next links** between projects — so a visitor reading one project can step straight to the one before or after it. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/project-nav/front.png" alt="The Project Navigation block — previous and next project links" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Same category (`same_category`) | Restrict prev/next to projects in the same portfolio category. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Reads the current project
This block navigates from the **project in context**, so it renders on a single-project page (or a project template), where a "previous" and "next" project exist.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above uses the defaults:

```html
<!-- wp:unysonplus/project-nav {"upOptions":{}} /-->
```

## Part of the Portfolio extension

This block reads **Projects** — the custom post type the **[Portfolio](/extensions/portfolio)** extension registers. See also **[Related Projects](/blocks/library/related-projects)** and the **[Portfolio](/blocks/library/portfolio)** grid.
