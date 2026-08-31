---
title: Icon Box
sidebar_position: 2
---

# Icon Box

An icon above a heading and text — the standard feature, service and benefit card, and the most-used marketing pattern in the element set.

The block renders through the [`icon_box`](/shortcodes/components/icon-box) element — the same PHP that runs in the page builder, so
the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `icon` | The icon itself — pick a font icon, emoji or image |
| `title` | Heading text |
| `title_tag` | Which heading level the title renders as (`h2`…`h6`, `div`) |
| `content` | The body copy — see the note on rich text below |
| `style` | Card design preset |
| `icon_align` | Where the icon sits relative to the title and text |
| `icon_size` | Icon size, with a unit |
| `box_style` | Border / box preset |
| `bg_color` | Card background |
| `icon_color` | Icon colour |
| `title_color` | Heading colour |
| `content_color` | Body text colour |
| `box_link` | Makes the whole card a link |
| `link_target` | Open that link in a new tab |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The content field edits markup, not rich text]
`content` is a [`wp-editor`](/options/option-types/wp-editor) option, and in a block sidebar it
edits the **HTML directly** rather than showing a WYSIWYG. That is deliberate — the reasoning is on
that option type's page. Plain text you type is wrapped in paragraphs when saved.
:::

:::note[The preview is inert]
Clicking the card in the canvas selects the **block**; it does not follow `box_link`. Visitors get
the working link on the front end.
:::
