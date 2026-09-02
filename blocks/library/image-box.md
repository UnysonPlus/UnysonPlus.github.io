---
title: Image Box
description: The Unyson+ Image Box block — an image, heading, text and button in one card, authored in the block editor and rendered by the image-box element.
---

# Image Box

An **image card** — a picture stacked over a heading, a short line of copy and an optional button — the workhorse of a feature grid or a "what you get" row. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Image Box element](/shortcodes/media-elements/image-box) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/image-box/front.png" alt="The Image Box block — a photo above a heading, text and a button" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Image (`image`) + Alt text (`image_alt`) | The picture, and its alt text — describe what it shows for screen readers and when it fails to load. |
| Image ratio (`image_ratio`) | Crop the image to a consistent aspect ratio across a grid. |
| Title (`title`, `title_tag`) + Subtitle (`subtitle`) | The heading, its HTML tag, and an eyebrow line. |
| Text (`text`) | The supporting copy. |
| Button (`button_label`, `button_style`) + Link (`link_url`, `link_target`, `link_behavior`) | An optional button, or make the whole card a link. |
| Hover effect (`hover_effect`, `transition_speed`) | The image's motion on hover. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/image-box {"upOptions":{"image":{...},"title":"Fast by default","subtitle":"FREE","text":"<p>An image, a heading and a short line of copy in one card.</p>","button_label":"Learn more","link_url":"#"}} /-->
```

The `image` value is a media reference (`{"attachment_id":123,"url":"…"}`), so use the block's image picker rather than typing it by hand.

## The image-box element

The block and the page builder's [Image Box element](/shortcodes/media-elements/image-box) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
