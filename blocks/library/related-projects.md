---
title: Related Projects
---

# Related Projects

Other projects related to this one.

The block renders through the `related_projects` element — the same PHP that runs in the page builder, so the front
end is identical either way.

:::caution[Needs the Portfolio extension]
This element ships with the **Portfolio** extension, which is **inactive by default**. Activate it
under *Unyson+ → Extensions* and the block appears in the inserter.

With the extension off the block does not register at all — deliberately, so it cannot appear as an
inserter entry with an empty sidebar that renders nothing.
:::

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `count` | How many to show |
| `heading` | Heading above them |
| `heading_tag` | Its heading level |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::caution[Relatedness comes from the current project]
It is derived from the current project's taxonomy terms, so this element only means anything where a
current project exists — a project template, or a single project page. Elsewhere it says so.
:::
