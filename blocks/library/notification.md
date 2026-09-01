---
title: Notification
description: The Unyson+ Notification block — A dismissible notice — inline, an announcement bar or a floating toast, authored in the block editor and rendered by the notification element.
---

# Notification

A dismissible notice — inline, an announcement bar or a floating toast. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [notification element](/shortcodes/content-elements/notification) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/notification/front.png" alt="The Notification block — a green success notice with a label and message" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/notification/inspector.png" alt="The Notification block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Message (`message`) + Label (`label_text`) | The notice text, with an optional bold label. |
| Type (`type`) | Success, Info, or Warning — sets the colour scheme and default icon. |
| Icon (`icon`) + Border Style (`border_style`) | Override the icon, and the border treatment. |
| Display Mode (`display_mode`) + Layout (`layout`) | Inline, a top **announcement bar**, or a floating **toast**. |
| Dismissible (`dismissible`) + Auto-dismiss (`auto_dismiss`) + Persist (`persist_dismiss`) | Let visitors close it, close it on a timer, and remember the dismissal. |
| Colours (`bg_color`, `label_color`, `message_color`, `icon_color`) + Font size (`font_size_preset`) | Override the type colours and set a preset size. |

The block also opts into WordPress **Margin / Padding**, which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object (keyed by the same paths the page builder uses); the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/notification {"upOptions":{"label_text":"Heads up","message":"Every UnysonPlus extension is free — there is no pro tier to upgrade to.","type":"success"}} /-->
```

## The notification element

The block and the page builder’s [Notification element](/shortcodes/content-elements/notification) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
