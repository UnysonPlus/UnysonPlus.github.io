---
title: Snippet
description: The Unyson+ Snippet block — embeds a saved, reusable content Snippet by reference, authored in the block editor and rendered by the Snippets extension.
---

# Snippet

Embeds a **saved Snippet** — a reusable piece of content you build once and drop in anywhere. Edit the snippet in one place and every block that references it updates. Great for a shared CTA, a promo bar, or any block of markup you repeat across pages. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/snippet/front.png" alt="The Snippet block — a reusable content card embedded by reference" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Snippet (`id`) | Which saved Snippet to embed — pick it by name in the block. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Needs the Snippets extension
This block embeds a **Snippet** — a reusable content item the **[Snippets](/extensions/snippets)** extension adds. Create a snippet first, then reference it here.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above embeds a saved snippet by its ID:

```html
<!-- wp:unysonplus/snippet {"upOptions":{"id":"296"}} /-->
```

Pick the snippet in the block's inspector rather than typing an ID by hand.

## Part of the Snippets extension

The Snippet block is the companion of **[Global Section](/blocks/library/global-section)**, both powered by the **[Snippets](/extensions/snippets)** extension. Use a Snippet for a reusable content block, and a Global Section for a shared header/body/footer band.
