---
title: Create a reusable content block
description: Build a block of content once with Unyson+ Snippets and reuse it across pages, edit it in one place and every page updates.
---

# Create a reusable content block

A reusable block, a CTA, a stats band, contact details, lets you build content once and embed it
anywhere. Edit the block in one place and every page that uses it updates automatically. In Unyson+
these are **Snippets**.

## Steps

1. Activate **Snippets** (Unyson+ → Extensions).
2. Go to **Snippets → Add New**, give it a title, and build its content with the Page Builder.
3. Choose **Template Kind → Block** and **Publish**. The editor shows the snippet's embed shortcode.
4. Embed it, two ways:
   - Drop the **Snippet** element into any column, or
   - Paste the shortcode anywhere:
     ```text
     [snippet id="123"]
     ```
5. Edit the snippet once; every place that embeds it updates.

## Reuse a whole section or column

To reuse an entire **Section** or **Column** at the root of a page (not inside a column), set the
snippet's **Template Kind** to **Section** or **Column** and insert it from the Page Builder's
**Templates** manager.

See [Snippets](/docs/extensions/snippets) and [Global Templates](/docs/extensions/global-templates).

## See also

- [Build a call-to-action section](./call-to-action-section.md) — a great candidate to make reusable
- [Theme Builder](/docs/extensions/theme-builder) — for reusable headers, footers, and body templates
