---
title: Image Content
description: The Unyson+ Image Content block — a two-column image-and-text row that stacks on mobile, authored in the block editor and rendered by the image-content element.
---

# Image Content

A **two-column row** — an image on one side, rich text on the other — that stacks cleanly on mobile. The go-to layout for an "about" section, a feature explainer, or any image-beside-copy pairing. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Image Content element](/shortcodes/media-elements/image-content) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/image-content/front.png" alt="The Image Content block — an image beside a heading and paragraph" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Image (`image`) | The picture for the media column. |
| Content (`content`) | The rich text for the other column. |
| Layout (`layout`, `column_ratio`, `gap`) | Image left or right, the split between columns, and the gap. |
| Vertical align (`vertical_align`) + Breakpoint (`breakpoint`) | How the columns line up, and the width at which they stack. |
| Image styling (`image_ratio`, `image_fit`, `image_radius`, `image_shadow`, `image_style`) | Crop, fit, corners, shadow and a saved image style. |
| Content styling (`content_align`, `content_bg`, `content_color`, `content_padding`, `content_max_width`) | Alignment, colours, padding and measure for the text side. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/image-content {"upOptions":{"image":{...},"title":"Text beside an image","content":"<p>A two-column layout that stacks on mobile.</p>"}} /-->
```

The `image` value is a media reference (`{"attachment_id":123,"url":"…"}`), so use the block's image picker rather than typing it by hand.

## The image-content element

The block and the page builder's [Image Content element](/shortcodes/media-elements/image-content) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
