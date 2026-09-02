---
title: Logo Grid
description: The Unyson+ Logo Grid block — a tidy grid or marquee of client/partner logos with optional grayscale, authored in the block editor and rendered by the logo-grid element.
---

# Logo Grid

A grid (or scrolling marquee) of **client, partner or sponsor logos** — each optionally linked, with a grayscale-until-hover treatment that keeps a mixed set of logos looking uniform. The classic "trusted by" strip. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Logo Grid element](/shortcodes/media-elements/logo-grid) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/logo-grid/front.png" alt="The Logo Grid block — a row of logos" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Logos (`logos`) | The list of logos. Each has an **image** (or inline **SVG**), a **name** (used as the alt text / label), and an optional **link**. |
| Columns (`columns`) + Gap (`gap`) | How many logos per row, and the spacing between them. |
| Logo height (`logo_height`) | A uniform height so mismatched logos line up. |
| Grayscale (`grayscale`) | Desaturate logos until hovered. |
| Labels (`show_labels`, `no_label`) | Show each logo's name beneath it. |
| Marquee (`autoplay`, `direction`, `speed`) | Scroll the logos continuously instead of a static grid. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/logo-grid {"upOptions":{"logos":[
  {"image":{...},"name":"Acme"},
  {"image":{...},"name":"Globex"}
]}} /-->
```

Each logo's `image` is a media reference (`{"attachment_id":123,"url":"…"}`), so add logos with the block's picker rather than typing them by hand.

## The logo-grid element

The block and the page builder's [Logo Grid element](/shortcodes/media-elements/logo-grid) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
