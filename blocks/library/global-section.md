---
title: Global Section
description: The Unyson+ Global Section block — embeds a saved Global Section (a reusable header/body/footer band) by reference, authored in the block editor and rendered by the Snippets extension.
---

# Global Section

Embeds a **saved Global Section** — a reusable band (a promo bar, a shared footer CTA, a header strip) you build once and reuse across the site. Change it in one place and every reference updates. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/global-section/front.png" alt="The Global Section block — a reusable call-to-action bar embedded by reference" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Global Section (`snippet_id`) | Which saved Global Section to embed — pick it by name in the block. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::note Needs the Snippets extension
This block embeds a **Global Section** — a reusable band the **[Snippets](/extensions/snippets)** extension adds. Create one first, then reference it here.
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above embeds a saved global section by its ID:

```html
<!-- wp:unysonplus/global-section {"upOptions":{"snippet_id":"299"}} /-->
```

Pick the section in the block's inspector rather than typing an ID by hand.

## Part of the Snippets extension

The Global Section block is the companion of **[Snippet](/blocks/library/snippet)**, both powered by the **[Snippets](/extensions/snippets)** extension. Use a Global Section for a shared header/body/footer band, and a Snippet for a reusable content block.
