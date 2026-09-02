---
title: Media Image
description: The Unyson+ Media Image block — A single image with control over size, link, corners and loading, authored in the block editor and rendered by the media-image element.
---

# Media Image

A single image with control over size, link, corners and loading. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Media Image element](/shortcodes/media-elements/media-image) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/media-image/front.png" alt="The Media Image block — a single responsive image" width="340" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Image (`image`) | The picture to show. |
| Link (`link`, `target`) | Wrap the image in a link, optionally opening in a new tab. |
| Size (`size`, `width`, `height`) | The registered image size, and an explicit width/height if you need one. |
| Loading (`loading`, `fetchpriority`) | Lazy-load off-screen images, or prioritise a hero image that is above the fold. |
| Image style (`group_image_style`) | Apply a saved Image Style — crop, corners, mask, filter — from Theme Settings. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/media-image {"upOptions":{"image":{...}}} /-->
```

The `image` value is a media reference (`{"attachment_id":123,"url":"…"}`), so use the block's image picker rather than typing it by hand.

## The media image element

The block and the page builder's [Media Image element](/shortcodes/media-elements/media-image) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
