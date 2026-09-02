---
title: Social Share
description: The Unyson+ Social Share block — Share buttons for the current page — pick the networks, shape and layout, authored in the block editor and rendered by the social-share element.
---

# Social Share

Share buttons for the current page — pick the networks, shape and layout. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [social-share element](/shortcodes/components/social-share) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/social-share/front.png" alt="The Social Share block — a labelled row of network share buttons" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/social-share/inspector.png" alt="The Social Share block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Networks (`networks`) | Which share buttons to show (Facebook, X, LinkedIn, WhatsApp, email…). |
| Share source (`share_source`, `custom_url`, `share_text`) | Share the current page or a custom URL, with optional share text. |
| Design (`design`) + Shape (`shape`) + Size (`size`) | Brand-coloured or neutral, circle / square, and the button size. |
| Layout (`layout`) + Labels (`show_label`) + Alignment (`align`) | Inline or stacked, with or without network names. |
| Colours (`custom_color`, `icon_color`) + Font size (`font_size_preset`) | Override the button and icon colours. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/social-share {"upOptions":{"show_label":"yes","align":"center"}} /-->
```

## The social-share element

The block and the page builder’s [Social Share element](/shortcodes/components/social-share) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
