---
title: Featured Image
description: The Unyson+ Featured Image block — the current post's featured image, sized, styled and optionally linked, authored in the block editor and rendered by the page builder.
---

# Featured Image

The **current post's featured image** (its "thumbnail") — sized, styled and optionally linked to the post or the full-size file. Most useful inside a post or archive template, where it pulls whatever image that entry has set. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/featured-image/front.png" alt="The Featured Image block — a post's featured image" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Image size (`image_size`) | Which registered size to output — thumbnail, medium, large or full. |
| Image style (`image_style`) | Apply a saved Image Style — crop, corners, mask, filter — from Theme Settings. |
| Link to (`link_to`) | Link the image to the post, to the full-size file, or nowhere. |
| Alignment (`text_align`) | Left, center or right. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Needs a featured image
This block outputs the **current entry's** featured image, so it renders only where a post is in context (a single post, or a post inside a query loop) and that post has a featured image set.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above uses the defaults:

```html
<!-- wp:unysonplus/featured-image {"upOptions":{}} /-->
```
