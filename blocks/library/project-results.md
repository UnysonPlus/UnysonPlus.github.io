---
title: Project Results
description: The Unyson+ Project Results block — A row of headline metrics for a project — the value-and-label 'stat' cards that prove the outcome, authored in the block editor and rendered by the Portfolio extension.
---

# Project Results

A row of headline metrics for a project — the value-and-label 'stat' cards that prove the outcome. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/project-results/front.png" alt="The Project Results block — headline outcome metrics" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Project (`project_id`) | Which project's results to show (defaults to the current project in a single-project template). |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Needs the Portfolio extension
This block reads **Projects** — the custom post type the **Portfolio** extension registers. Activate it, add a project or two, and fill in their details.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/project-results {"upOptions":{"project_id":"272"}} /-->
```

## Part of the Portfolio extension

This block reads from your **[Projects](/extensions/portfolio)** — the custom post type the Portfolio extension adds. Fill in a project's client, date, results and testimonial on the project itself, and this block renders them.
