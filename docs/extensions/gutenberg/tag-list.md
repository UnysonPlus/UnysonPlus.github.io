---
title: Tag List
sidebar_position: 10
---

# Tag List

A row of small tags built from a list of lines — keywords, categories, skills or filters.

The block renders through the [`tag_list`](/shortcodes/content-elements/tag-list) element — the
same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `items` | The tags, **one per line** |
| `design` | Tag design preset |
| `shape` | Pill, rounded or square |
| `size` | Tag size |
| `align` | Alignment of the row |
| `gap` | Spacing between tags |
| `marker` | Optional marker before each tag |
| `hover` | Hover effect |
| `tag_color` | Tag colour |

This is the whole content set — the element is small enough that curating it would only hide things
for no gain.

:::note[One tag per line]
`items` is a plain text field where each line becomes a tag. That is the same format the page
builder uses, so lists move between the two without editing.
:::
