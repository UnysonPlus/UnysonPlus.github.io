---
title: Project Results
---

# Project Results

A project's results or outcome figures.

The block renders through the `project_results` element — the same PHP that runs in the page builder, so the front
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
| `project_id` | Which project (empty = the current one) |

Anything not listed stays available in the page builder, and **round-trips untouched**.

:::note[It reads the current project]
Leave `project_id` empty and the element reads whichever project it finds itself in — which is what a
[Theme Builder](/extensions/theme-builder/body-templates) project template wants. Set it, and the
element pins that one project, which is what a landing page wants.

In an ordinary page with neither, there is no project to read, and the block says so rather than
rendering nothing.
:::

:::note[The content lives on the project]
This block places it; what it says is edited on the project itself.
:::
