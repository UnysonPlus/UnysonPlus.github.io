---
title: Call to Action
description: The Unyson+ Call to Action block — A heading, a message and a button — the standard conversion band, authored in the block editor and rendered by the call-to-action element.
---

# Call to Action

A heading, a message and a button — the standard conversion band. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [call-to-action element](/shortcodes/components/call-to-action) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/call-to-action/front.png" alt="The Call to Action block — a heading, message and button" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/call-to-action/inspector.png" alt="The Call to Action block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Title (`title`) + Message (`message`) | The headline and supporting line. |
| Button Label (`button_label`) + Link (`button_link`) + New tab (`button_target`) | The call-to-action button. |
| Column Split (`column_split`) | Stacked and centred, or text on the left with the button on the right. |
| Box Style (`box_style`) | Plain band, or a card with background and border. |
| Colours (`bg_color`, `title_color`, `message_color`) + Font size (`font_size_preset`) | Band colours and a preset size. |

The block also opts into WordPress **alignment** (Wide / Full) and **Margin / Padding**, which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object (keyed by the same paths the page builder uses); the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/call-to-action {"upOptions":{"title":"Build your first site today","message":"Install the free plugin and convert a design into a real, editable WordPress site.","button_label":"Get UnysonPlus — Free","button_link":"#"}} /-->
```

## The call-to-action element

The block and the page builder’s [Call to Action element](/shortcodes/components/call-to-action) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
