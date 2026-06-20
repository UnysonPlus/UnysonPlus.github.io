---
sidebar_position: 9
title: Global Templates
---

# Global Templates

A **Global Template** is a reusable, **synced** Section or Column. Drop it on as many pages as
you like, and editing it once updates every page that uses it — because each instance is a live
**reference** to a [Snippet](./snippets.md), not a copy.

This is different from a local **Template** (the existing *Save as Template* → *Load Template*),
which inserts an independent copy each time.

## Save a Section or Column as a Global Template

In the Page Builder, hover a **Section** or **Column** and click its **Save as Template** icon.
In the dialog, turn on **Save as Global Template** and give it a name.

<img src="/img/global-templates/save-as-global.png" alt="The Save as Template dialog with the Save as Global Template switch turned on" width="700" />

Saving creates a **Snippet** of the matching kind (Section or Column). You can also build one from
scratch under **Snippets** and set its **Template Kind** — see [Snippets](./snippets.md).

## Insert a Global Template

Open the **Templates** menu (top-right of the builder) and pick **Sections** or **Columns**. Your
global templates appear under **Load Template** with a violet bullet and a **(Global)** tag.

<img src="/img/global-templates/templates-manager.png" alt="The Templates manager listing global Section templates with a (Global) tag" width="540" />

Clicking one inserts a **synced reference**:

- A **Global Section** drops at the root of the page (just like a Section).
- A **Global Column** drops into a Section as a real column, so it keeps its width and sits in a
  row alongside other columns.

On the canvas a reference is marked with a violet accent and a **GLOBAL** badge, and shows a
preview of its content so you recognize it at a glance:

<img src="/img/global-templates/global-section-canvas.png" alt="A Global Section on the canvas with a GLOBAL badge and a content preview" width="936" />

## Edit a Global Template

Editing the underlying Snippet updates **every** page that references it. Click the **pencil**
(Edit Global Template) on a reference to open its Snippet in the builder, or edit it directly
under **Snippets**.

<img src="/img/global-templates/template-kind.png" alt="The Template Kind box on the Snippet editor" width="320" />

## Delete a Global Template

In the **Templates** menu, hover a global entry and click the **✕**. It's moved to **Trash**
(reversible) — pages that reference it simply stop showing it until you restore it.

## The Template Library

All global templates live under **Snippets**, where the **Kind** column and filter let you manage
a large library at a glance.

<img src="/img/global-templates/snippets-list.png" alt="The Snippets list showing the Kind column and filter" width="936" />

:::note
Global Templates require the **Snippets** extension (it activates automatically). Section and
Column kinds appear in the Templates manager; **Block** snippets are embedded inside a column with
the Snippet element instead.
:::
