---
title: Highlight Text
description: The Unyson+ Highlight Text block — A run of text with an animated highlight — marker, underline, circle and more, authored in the block editor and rendered by the highlight-text element.
---

# Highlight Text

A run of text with an animated highlight — marker, underline, circle and more. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [highlight-text element](/shortcodes/content-elements/highlight-text) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/highlight-text/front.png" alt="The Highlight Text block — "completely free" with a marker highlight" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/highlight-text/inspector.png" alt="The Highlight Text block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Prefix / Text / Suffix (`prefix`, `text`, `suffix`) | The plain lead-in, the **highlighted** run, and the tail. |
| Effect (`fx`) | The highlight style — marker, underline, circle, strike-through and more. |
| Tag (`tag`) | The wrapping element — a heading level or a paragraph. |
| Alignment (`align`) | Left, Center, or Right. |
| Colours (`text_color`, `accent_color`) + Font size (`font_size_preset`) | Text and highlight colours, and a preset size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/highlight-text {"upOptions":{"prefix":"Premium features, ","text":"completely free","suffix":".","align":"center"}} /-->
```

## The highlight-text element

The block and the page builder’s [Highlight Text element](/shortcodes/content-elements/highlight-text) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
