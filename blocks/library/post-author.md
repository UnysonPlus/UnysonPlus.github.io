---
title: Post Author
description: The Unyson+ Post Author block — The current post's author — name and avatar, linked to their archive, authored in the block editor and rendered by the page builder.
---

# Post Author

The current post's author — name and avatar, linked to their archive. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/post-author/front.png" alt="The Post Author block — the article's author name and avatar" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Avatar + Name | Shows the author's avatar and display name, linked to their post archive. |
| Styling (`text_color`, `font_size_preset`, alignment) | Colour, size and alignment. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Reads the current post
This block outputs data from the **post in context**, so it renders where a post is being viewed — a single post, or a post inside a query loop or template. On a plain page there is no post for it to read.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/post-author {"upOptions":{}} /-->
```
