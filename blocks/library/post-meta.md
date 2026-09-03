---
title: Post Meta Field
description: The Unyson+ Post Meta Field block — The value of a single custom field from the current post, with optional label text around it, authored in the block editor and rendered by the page builder.
---

# Post Meta Field

The value of a single custom field from the current post, with optional label text around it. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/post-meta/front.png" alt="The Post Meta Field block — a custom field value with a label" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Field name (`meta_key`) | The custom field (post meta key) to read from the current post. |
| Before / After (`before_text`, `after_text`) | Text placed around the value — e.g. "Reading time: " … " min". |
| Styling (`text_color`, `text_align`, `font_size_preset`) | Colour, alignment and size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Reads the current post
This block outputs data from the **post in context**, so it renders where a post is being viewed — a single post, or a post inside a query loop or template. On a plain page there is no post for it to read.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/post-meta {"upOptions":{"meta_key":"reading_time","before_text":"Reading time: "}} /-->
```
