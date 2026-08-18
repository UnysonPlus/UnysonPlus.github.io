---
title: Snippet
sidebar_position: 47
---

# Snippet

Output a saved snippet by name.

The block renders through the `snippet` element — the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `id` | Which snippet to output |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The same reference model as Global Section]
The content lives in the snippet. This block places it, and the editor preview shows the snippet's
current content.
:::

:::caution[A snippet can contain saved code]
What this renders is whatever the snippet renders — in the editor as well as on the front end.
Snippets are authored by administrators, and that is the boundary that makes it acceptable. It is not
a place to paste code from somewhere else and see what happens.
:::

:::note[Empty for a reason, and it tells you which]
No snippet chosen, a snippet deleted, a snippet unpublished, and a snippet that is genuinely empty are
four different situations. The editor names which one you have instead of showing four identical
blank blocks.
:::
