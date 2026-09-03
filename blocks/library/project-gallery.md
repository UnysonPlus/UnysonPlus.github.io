---
title: Project Gallery
description: The Unyson+ Project Gallery block — A single project's image gallery, with a lightbox, authored in the block editor and rendered by the Portfolio extension.
---

# Project Gallery

A single project's image gallery, with a lightbox. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Project Gallery element](/shortcodes/media-elements/project-gallery) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/project-gallery/front.png" alt="The Project Gallery block — a two-column gallery of project images" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Project (`project_id`) | Which project's gallery to show (defaults to the current project in a single-project template). |
| Layout (`columns`, `columns_tablet`, `columns_mobile`, `gap`, `ratio`, `image_size`) | Responsive columns, spacing and image crop. |
| Lightbox + Captions (`lightbox`, `captions`) | Open images full-size, and show captions. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Needs the Portfolio extension
This block reads **Projects** — the custom post type the **Portfolio** extension registers. Activate it, add a project or two, and fill in their details.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/project-gallery {"upOptions":{"project_id":"272","columns":"2"}} /-->
```

## The project gallery element

The block and the page builder's [Project Gallery element](/shortcodes/media-elements/project-gallery) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
