---
title: Divider
description: The Unyson+ Divider block — A separator — a line, an icon, text or a shape, authored in the block editor and rendered by the divider element.
---

# Divider

A separator — a line, an icon, text or a shape. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [divider element](/shortcodes/content-elements/divider) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/divider/front.png" alt="The Divider block — a horizontal separator line" width="1210" />


## Options

| Option | What it does |
| --- | --- |
| Style (`style`) | A plain line, or a line with a centred icon, text or shape. |
| Width (`width`) | How wide the divider runs. |
| Spacing (`margin_top`, `margin_bottom`) | The gap above and below. |
| Colours (`line_color`, `icon_color`, `divider_text_color`, `bg_color`) | Line, icon, text and background colours. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/divider {"upOptions":{"style":"std","width":"100"}} /-->
```

## The divider element

The block and the page builder’s [Divider element](/shortcodes/content-elements/divider) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
