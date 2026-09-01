---
title: Blockquote
---

# Blockquote

A pull quote with an author, role and source link — for testimonials, press quotes and callouts.
Core's Quote block gives you the text; this gives you the attribution and the designs.

The block renders through the [`blockquote`](/shortcodes/content-elements/blockquote) element —
the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `quote` | The quotation itself |
| `author` | Who said it |
| `role` | Their title or company |
| `source_url` | Link to the source |
| `design` | Quote design preset |
| `align` | Alignment |
| `show_mark` | Show the decorative quotation mark |
| `box_style` | Border / box preset |
| `max_width` | Constrain the quote's width |
| `quote_color` | Quote text colour |
| `author_color` | Attribution colour |
| `accent_color` | Accent (mark, rule) colour |
| `bg_color` | Background |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[A fresh block shows a sample quote]
The element ships a default quotation, so a newly inserted block previews real content rather than
an empty box. Replace it with your own — there is no separate "empty" state to get past.
:::
