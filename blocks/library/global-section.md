---
title: Global Section
---

# Global Section

A saved section placed by reference — define it once, use it on many pages, edit it in one place. Core has reusable blocks (patterns); this is the page-builder equivalent, and the two sets of saved content stay separate.

The block renders through the `global_section` element — the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `snippet_id` | Which saved section to place |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[One option, because that is the whole element]
The content lives in the saved section, not in this block. Editing it there updates every page that
places it — which is the difference between this and copying a block.
:::

:::note[The preview can change without the block changing]
The canvas renders the chosen section's **current** content. Edit the section elsewhere and every
block pointing at it shows the new version next time it renders. That is the point of the element,
and it is worth knowing before wondering why a page looks different from when you left it.
:::

:::caution[An unpublished section renders nothing — and now says so]
Moving a saved section back to draft removes it from every page that places it. On the front end that
is silent, by design. In the editor the block now names the reason, including the section's title, so
a page that has quietly lost a chunk is diagnosable rather than mysterious.
:::
