---
title: Site Search
---

# Site Search

A site search field. Results are handled by WordPress's own search page.

The block renders through the [`site_search`](/shortcodes/header-footer-elements/site-search) element — the same PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `style` | How the field looks |
| `placeholder` | What it says before anyone types |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[The field is inert in the editor]
It does not accept typing and the form does not submit — a search run from inside the editor would
navigate away from the post you are writing.
:::

:::note[Write a placeholder that says what is searchable]
"Search" is the default and it is fine. "Search 200+ recipes" is better, because it tells someone
what they will get. It is the cheapest copy improvement on most sites.
:::
