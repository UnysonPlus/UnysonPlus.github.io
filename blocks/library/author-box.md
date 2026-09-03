---
title: Author Box
description: The Unyson+ Author Box block — A rich author card — avatar, name, bio and a link to all their posts, authored in the block editor and rendered by the page builder.
---

# Author Box

A rich author card — avatar, name, bio and a link to all their posts. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Author Box element](/shortcodes/components/author-box) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/author-box/front.png" alt="The Author Box block — an author card with avatar, name and bio" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Source (`source`) | The current post's author, or a specific user. |
| Design (`design`, avatar shape, card style) | The card layout and avatar treatment. |
| Colours + Typography | Palette and type scale for the card. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Reads the current post
This block outputs data from the **post in context**, so it renders where a post is being viewed — a single post, or a post inside a query loop or template. On a plain page there is no post for it to read.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/author-box {"upOptions":{}} /-->
```

## The author box element

The block and the page builder's [Author Box element](/shortcodes/components/author-box) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
