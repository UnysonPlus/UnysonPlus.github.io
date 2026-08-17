---
sidebar_position: 9
title: Gutenberg Blocks
---

# Gutenberg Blocks

UnysonPlus elements normally live in the **Page Builder**. This extension makes a selected few
available as native **Gutenberg blocks** as well, so they can be used on sites — or by editors —
that work in the block editor.

It is deliberately additive. Activating it changes nothing about the page builder, the shortcodes
or any existing page.

## The blocks

| Block | Element | What it is |
| --- | --- | --- |
| **Video Popup** | `video_popup` | A poster image with a play button that opens the video in a lightbox |
| **Star Rating** | `star_rating` | A star rating with optional score, label and review count |
| **Counter** | `counter` | An animated number that counts up when scrolled into view |
| **Before / After** | `before_after` | An image comparison slider — drag, hover or click to reveal |

They appear under a **UnysonPlus** category in the block inserter.

## How a block relates to the element

Each block is a **dynamic block** that delegates its rendering to the existing shortcode:

```
Block editor          →  React inspector, generated from the option schema
Front end             →  PHP renders the shortcode, exactly as the page builder does
```

That split is the point. React handles *editing*; PHP still handles *rendering*, so a block can
never drift away from what the element actually outputs. There is no second implementation to keep
in sync — fix the shortcode and the block is fixed too.

:::note[The inspector is generated, not hand-built]
A block's sidebar is produced from the same option schema an `options.php` file declares, rendered
by the [React control layer](/docs/options/option-types/text#in-gutenberg-blocks-the-react-control).
Adding a block is therefore mostly a matter of choosing *which* options to expose — not writing a
settings UI.
:::

## What the sidebar shows

Each block exposes a **curated subset** of its element's options, not the whole schema. A page
builder panel is a wide, tabbed surface; a block sidebar is a narrow column, and every element also
carries shared Advanced and Animations tabs that would swamp it.

Anything not shown still **round-trips untouched**. The block only ever writes the values you
change, so an element styled in the page builder and then opened as a block keeps every setting the
sidebar does not display.

:::caution[Some options are page-builder only]
An option type with no React control shows a short "no React control yet" notice rather than a
broken field, and stays fully editable in the page builder. That is a coverage gap, not an error.

The composite types — repeaters (`addable-popup`), `multi-picker`, `wp-editor`, `code-editor` — are
the main ones, which is why blocks exist for elements whose interesting options are simple.
:::

## Previews are inert on purpose

A block's canvas preview is a **picture** of the element, not a working copy:

- **Before / After** would otherwise swallow the click that selects the block, and a drag on its
  handle would become a Gutenberg *block* drag.
- **Counter** would re-run its count-up every time the editor scrolls it into view, which reads as
  the preview flickering while you work.

Visitors get the fully interactive element on the front end.

## Requirements

Core 2.16.24 or later, with the **Shortcodes** extension active — the blocks render through it.
