---
title: Modal Popup
---

# Modal Popup

A trigger — button, text link, icon or image — that opens content in a modal dialog. Core has no
modal block, and the usual substitute is a popup plugin that loads on every page whether or not one
is used.

The block renders through the [`modal_popup`](/shortcodes/interactive-elements/modal-popup)
element — the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `trigger_type` | What opens the modal — button, link, icon or image |
| `trigger_label` | Text on the trigger |
| `trigger_icon` | Icon for the trigger (icon and button triggers) |
| `trigger_image` | Image used as the trigger |
| `modal_title` | Heading at the top of the dialog |
| `modal_content` | The dialog body — basic HTML allowed |
| `design` | Dialog design preset |
| `size` | Dialog width — small, medium, large |
| `open_animation` | How the dialog appears — zoom, fade, slide up |
| `open_on_load` | Open the modal automatically on page load |
| `open_delay` | Milliseconds to wait before auto-opening |
| `close_overlay` | Close when the backdrop is clicked |
| `accent_color` | Trigger / accent colour |
| `overlay_color` | Backdrop colour |
| `modal_bg` | Dialog background |
| `modal_color` | Dialog text colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The canvas shows the trigger, not the modal]
The dialog markup is rendered, but hidden — exactly as it is on a real page before anyone clicks. To
see the dialog itself, preview the page.

`open_on_load` is also why the preview must stay inert: a live preview of a popup set to open
automatically would cover the editor with a dialog every time the block re-rendered, which is to say
on every keystroke in the sidebar.
:::

:::caution[`open_delay` only does something with `open_on_load` on]
The two are one setting in two parts. A delay with nothing to trigger does nothing at all, and
auto-open with no delay fires the instant the page paints — which visitors experience as a popup
ambush. Set them together, and give people a second or two to see the page first.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
