---
title: Icon Box
description: The Unyson+ Icon Box block — An icon above a heading and text — the standard feature, service and benefit card, authored in the block editor and rendered by the icon-box element.
---

# Icon Box

An icon above a heading and text — the standard feature, service and benefit card. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [icon-box element](/shortcodes/components/icon-box) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/icon-box/front.png" alt="The Icon Box block — a bolt icon above a heading and text, centred" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/icon-box/inspector.png" alt="The Icon Box block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Icon (`icon`) + Size (`icon_size`) + Alignment (`icon_align`) | The icon, how big it is, and where it sits. |
| Title (`title`) + Title Tag (`title_tag`) | The heading text and its level (H2–H6). |
| Content (`content`) | The rich-text body below the title. |
| Layout Style (`style`) | Icon position relative to the text — icon on top, or beside it. |
| Box Style (`box_style`) | Plain, or a card preset with background and border. |
| Box Link (`box_link`) + New tab (`link_target`) | Make the whole box a single link. |
| Colours (`icon_color`, `title_color`, `content_color`, `bg_color`) | Per-part colour pickers. |

The block also opts into WordPress **alignment** (Wide / Full) and **Margin / Padding**, which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object (keyed by the same paths the page builder uses); the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/icon-box {"upOptions":{"icon":{"type":"icon-font","icon-class":"fa-solid fa-bolt"},"title":"Free, forever","content":"<p>Every extension is free, with no pro tier — add only what you need.</p>","icon_align":"center","title_tag":"h3"}} /-->
```

## The icon-box element

The block and the page builder’s [Icon Box element](/shortcodes/components/icon-box) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
