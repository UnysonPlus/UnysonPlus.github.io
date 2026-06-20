---
sidebar_position: 8
title: Snippets
---

# Snippets

Build reusable Page Builder content once, then reuse it anywhere — and edit it from a single
place. A **Snippet** is a small piece of builder content (a CTA, a stats band, a feature card,
contact details…) that stays consistent across every page that uses it: change the snippet and
every page updates automatically.

Snippets double as the **Template Library** behind [Global Templates](./global-templates.md):
each snippet has a **kind** that decides how it's reused.

## Template kinds

When you create or edit a snippet, pick its **Template Kind** (right-hand box on the snippet
editor):

| Kind | Reuse it by… | Build it as… |
| --- | --- | --- |
| **Block** (default) | Dropping the **Snippet** element into a column, or `[snippet id="…"]` | Any content |
| **Section** | **Templates → Sections → (Global)** in the Page Builder | A full **Section** |
| **Column** | **Templates → Columns → (Global)** in the Page Builder | Just the column's contents (no Section wrapper) |

Section- and Column-kind snippets are **Global Templates** — see the
[Global Templates](./global-templates.md) page for the builder workflow.

## Create a snippet

1. Activate **Snippets** from **Unyson+ → Extensions**.
2. Go to **Snippets → Add New**, give it a title, and build its content with the Page Builder.
3. Choose a **Template Kind** (Block / Section / Column) and **Publish**.

The Snippets list shows each snippet's **Kind** and can be filtered by kind, so a large library
stays easy to scan.

## Embed a Block

For a **Block**-kind snippet, drop the **Snippet** element into any column (or paste the
shortcode anywhere):

```text
[snippet id="123"]
```

The snippet's own embed shortcode is shown in the **Snippet Shortcode** box on its editor.

Edit the snippet once and every place that embeds it updates.

:::tip
To reuse a whole **Section** or **Column** at the root of a page (not inside a column), set the
snippet's kind to **Section** or **Column** and insert it from the Page Builder's **Templates**
manager. See [Global Templates](./global-templates.md).
:::
