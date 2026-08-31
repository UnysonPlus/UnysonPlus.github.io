---
title: Badge
sidebar_position: 9
---

# Badge

A small pill of text — a label, announcement or status marker, optionally linked and optionally
prefixed with a sub-tag ("NEW · We just shipped v2.0").

The block renders through the [`badge`](/shortcodes/content-elements/badge) element — the same
PHP that runs in the page builder, so the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `tag_text` | The leading sub-tag, e.g. “NEW” |
| `message` | The main text |
| `link` | Make the badge a link |
| `leading` | What appears at the start (icon, dot, nothing) |
| `leading_icon` | Icon at the start |
| `trailing_icon` | Icon at the end |
| `style` | Badge design preset |
| `shape` | Pill, rounded or square |
| `size` | Badge size |
| `align` | Alignment |
| `tag_style` | How the sub-tag is styled against the pill |
| `hover` | Hover behaviour |
| `pill_color` | Pill background |
| `text_color` | Text colour |
| `tag_color` | Sub-tag colour |
| `aria_label` | Accessible label when the text alone is not descriptive |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::caution[Three groups are deliberately page-builder only]
The element has 29 content options; the sidebar shows the ones that decide what the badge *is*.
Left out on purpose:

- **`link_target` and the `rel_*` switches** — link and SEO plumbing, easy to set wrongly without
  seeing the whole page.
- **The `schema_*` fields** — they emit structured data. Same reasoning as
  [Star Rating](./star-rating.md): worth a deliberate decision, not a sidebar toggle.
- **`dismissible` / `dismiss_id`** — a dismissal that persists per visitor needs an id chosen with
  care, and a half-set pair silently does nothing.
:::
