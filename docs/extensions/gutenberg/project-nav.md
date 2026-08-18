---
title: Project Navigation
sidebar_position: 86
---

# Project Navigation

Previous and next links between projects.

The block renders through the `project_nav` element — the same PHP that runs in the page builder, so the front
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
| `same_category` | Stay within the current project's category |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[One option, and it is the whole decision]
Whether "next" means the next project overall, or the next in the same category. On a portfolio
spanning unrelated kinds of work, the second is almost always what a visitor expects.
:::

:::caution[Only renders on a single project]
It needs a current project to have neighbours, so it belongs in a project template. Anywhere else it
says so rather than rendering nothing.
:::
