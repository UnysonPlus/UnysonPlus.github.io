---
title: Icon
description: The Unyson+ Icon block — a single icon from any icon pack, sized and coloured, authored in the block editor and rendered by the icon element.
---

# Icon

A single **icon** — from Font Awesome or any installed icon pack — sized, coloured and optionally linked. Handy on its own, or as a building block in a heading or list. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Icon element](/shortcodes/media-elements/icon) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/icon/front.png" alt="The Icon block — a bolt glyph" width="64" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Icon (`icon`) | Pick the glyph from any installed icon pack. |
| Accessible label (`aria_label`) | Screen-reader text when the icon conveys meaning; leave empty for a purely decorative icon so assistive tech skips it. |
| Size (`size`) | The glyph size. |
| Colours (`bg_color`, `title_color`, …) | Icon and background colours. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/icon {"upOptions":{"icon":{"type":"icon-font","icon-class":"fa-solid fa-bolt"},"aria_label":"Speed"}} /-->
```

## The icon element

The block and the page builder's [Icon element](/shortcodes/media-elements/icon) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
