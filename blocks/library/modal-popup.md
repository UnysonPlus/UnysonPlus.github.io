---
title: Modal Popup
description: The Unyson+ Modal Popup block — A button, link, icon or image that opens content in a modal dialog, authored in the block editor and rendered by the modal-popup element.
---

# Modal Popup

A button, link, icon or image that opens content in a modal dialog. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [modal-popup element](/shortcodes/interactive-elements/modal-popup) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/modal-popup/front.png" alt="The Modal Popup block — an "Open the modal" trigger button" width="234" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/modal-popup/inspector.png" alt="The Modal Popup block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Trigger (`trigger_type`, `trigger_label`, `trigger_icon`, `trigger_image`) | What opens the modal — a button, link, icon or image. |
| Modal (`modal_title`, `modal_content`) | The dialog’s heading and rich-text body. |
| Design (`design`) + Size (`size`) + Animation (`open_animation`) | The dialog style, width, and how it opens. |
| Auto-open (`open_on_load`, `open_delay`) | Open the modal automatically after a delay — e.g. a welcome or offer. |
| Close on overlay (`close_overlay`) | Let a click on the dimmed background close it. |
| Colours (`accent_color`, `overlay_color`, `modal_bg`, `modal_color`) | Accent, overlay and dialog colours. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/modal-popup {"upOptions":{"trigger_label":"Open the modal","modal_title":"Welcome to UnysonPlus","modal_content":"<p>A free WordPress framework…</p>"}} /-->
```

## The modal-popup element

The block and the page builder’s [Modal Popup element](/shortcodes/interactive-elements/modal-popup) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
