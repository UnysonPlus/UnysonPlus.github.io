---
title: Timeline
description: The Unyson+ Timeline block — A vertical timeline of dated entries with markers and cards, authored in the block editor and rendered by the timeline element.
---

# Timeline

A vertical timeline of dated entries with markers and cards. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [timeline element](/shortcodes/interactive-elements/timeline) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/timeline/front.png" alt="The Timeline block — three dated entries in alternating cards" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/timeline/inspector.png" alt="The Timeline block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Items (`items`) | Each with a **Date**, a **Title**, **Text**, and an optional **Icon**. |
| Design (`design`) | Alternating sides, or all on one side. |
| Marker (`marker`) + Card style (`card_style`) | The dot/icon on the line, and the entry-card look. |
| HowTo schema (`howto_schema`) | Emit `HowTo` structured data when the timeline is a how-to. |
| Icon badge (`icon_badge_preset`) + Accent (`accent_color`) + Line (`line_color`) | Marker badge, accent, and the spine colour. |
| Colours (`date_color`, `title_color`, `text_color`, `card_bg`) + Font size (`font_size_preset`) | Per-part colours and a preset size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/timeline {"upOptions":{"items":[{"date":"2015","title":"Unyson released","text":"<p>The original free framework ships.</p>"},{"date":"2024","title":"UnysonPlus","text":"<p>A modern rewrite — page builder, blocks and 100+ elements.</p>"},{"date":"2026","title":"Native blocks","text":"<p>Every element as a Gutenberg block — all free.</p>"}]}} /-->
```

## The timeline element

The block and the page builder’s [Timeline element](/shortcodes/interactive-elements/timeline) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
