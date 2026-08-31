---
title: Special Heading
sidebar_position: 2
---

# Special Heading

A section heading with an **overline**, **title** and **subtitle** — the standard way to open a
section. More capable than core's Heading block: it is one element that lays out all three parts
together, with their own sizes, colours and spacing.

The block renders through the [`special_heading`](/shortcodes/content-elements/special-heading)
element — the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `overline` | Small text above the title (an “eyebrow”) |
| `title` | The heading itself |
| `subtitle` | Supporting text below the title — edits markup, see below |
| `heading` | Which heading level the title renders as |
| `alignment` | Alignment for all three parts |
| `display_size` | Title size preset |
| `subtitle_size` | Subtitle size preset |
| `element_spacing` | Vertical rhythm between the parts |
| `overline_uppercase` | Force the overline to uppercase |
| `overline_marker` | Decorative marker beside the overline |
| `icon` | Icon shown with the title |
| `overline_icon` | Icon shown with the overline |
| `block_max_width` | Constrain the whole block's width |
| `bg_color` | Background |
| `overline_color` | Overline colour |
| `title_color` | Title colour |
| `subtitle_color` | Subtitle colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change.

:::note[Per-part alignment is page-builder only]
The element also has `overline_align`, `title_align` and `subtitle_align`, which override alignment
for each part individually. They are deliberately **not** exposed here: `alignment` already sets all
three, and four alignment controls in a narrow column invites setting one and wondering why another
disagrees. The per-part overrides remain in the page builder for layouts that need them.
:::

:::note[The subtitle edits markup, not rich text]
`subtitle` is a [`wp-editor`](/options/option-types/wp-editor) option, so in a block sidebar it
edits **HTML directly** rather than showing a WYSIWYG — the reasoning is on that option type's page.
Plain text you type is wrapped in paragraphs when saved.
:::

:::note[Before it is filled in]
Overline, title and subtitle all start empty, so a freshly inserted block would render *nothing* —
an invisible block you cannot see to click. Until one of the three has text, the canvas shows a
placeholder instead.
:::
