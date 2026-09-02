---
title: Tag List
description: The Unyson+ Tag List block — A row of small tags from a list of lines — keywords, categories, skills or filters, authored in the block editor and rendered by the tag-list element.
---

# Tag List

A row of small tags from a list of lines — keywords, categories, skills or filters. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [tag-list element](/shortcodes/content-elements/tag-list) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/tag-list/front.png" alt="The Tag List block — five pill tags in a centred row" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/tag-list/inspector.png" alt="The Tag List block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Items (`items`) | One tag per line. Add a link with `Label | https://example.com` (a line without a `|` is plain text). |
| Design (`design`) + Marker (`marker`) | The tag style, and an optional leading marker. |
| Shape (`shape`) + Size (`size`) | Rounded / pill / square, and the tag size. |
| Alignment (`align`) + Gap (`gap`) | Row alignment and spacing between tags. |
| Hover (`hover`) + Colour (`tag_color`) | A hover lift, and the tag colour. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/tag-list {"upOptions":{"items":"Fast\nFree\nFlexible\nNo pro tier\n100+ elements","align":"center"}} /-->
```

## The tag-list element

The block and the page builder’s [Tag List element](/shortcodes/content-elements/tag-list) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
