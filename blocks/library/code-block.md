---
title: Code Block
---

# Code Block

A formatted code sample — or raw HTML rendered straight into the page.

The block renders through the [`code_block`](/shortcodes/content-elements/code-block) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `code` | The code |
| `render_as_code` | Show it as code, or execute it as markup |
| `beautify` | Reformat it before display |
| `code_language` | Which language to highlight as |
| `text_color` | Text colour |
| `bg_color` | Background |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::caution[`render_as_code` decides whether the value is *shown* or *executed*]
Off, the field's contents are rendered into the page as markup. That is the point of the element for
embeds and one-off HTML — and it is worth knowing which way the switch is set before pasting anything
into the field.
:::

:::note[The sidebar field is a plain monospace textarea]
The page builder gives this option a syntax-highlighting editor; the block sidebar does not. The
reasoning is on the [`code-editor`](/options/option-types/code-editor) page — briefly, wrapping
WordPress's CodeMirror in a React component risks an unrelated re-render wiping the buffer, and for a
code field that means losing what you typed.

The rendered output in the canvas is identical either way.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
