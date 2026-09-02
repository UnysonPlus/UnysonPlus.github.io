---
title: Badge
description: The Unyson+ Badge block — A small pill of text — a label, announcement or status marker, optionally linked, authored in the block editor and rendered by the badge element.
---

# Badge

A small pill of text — a label, announcement or status marker, optionally linked. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [badge element](/shortcodes/content-elements/badge) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/badge/front.png" alt="The Badge block — a "NEW" tag beside an announcement message" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/badge/inspector.png" alt="The Badge block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Tag (`tag_text`) + Message (`message`) | A leading tag and the message beside it. |
| Link (`link`) | Make the whole badge a link. |
| Icons (`leading_icon`, `trailing_icon`) | Optional icons before and after. |
| Style (`style`) + Tag style (`tag_style`) | The pill look, and how the leading tag is treated. |
| Shape (`shape`) + Size (`size`) + Alignment (`align`) | Rounded / pill / square, the size, and alignment. |
| Hover (`hover`) | An optional hover lift. |
| Colours (`pill_color`, `text_color`, `tag_color`) + `aria_label` | Colours and an accessible label. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/badge {"upOptions":{"tag_text":"NEW","message":"Every extension is free — no pro tier","align":"center"}} /-->
```

## The badge element

The block and the page builder’s [Badge element](/shortcodes/content-elements/badge) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
