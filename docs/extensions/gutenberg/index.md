---
sidebar_position: 1
title: Overview
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
| [**Blockquote**](./blockquote.md) | `blockquote` | A pull quote with author, role and source link |
| [**Badge**](./badge.md) | `badge` | A small pill of text — label, announcement or status marker |
| [**Tag List**](./tag-list.md) | `tag_list` | A row of small tags from a list of lines |
| [**Text Expander**](./text-expander.md) | `text_expander` | A short excerpt with a Read more toggle that reveals the rest |
| [**Special Heading**](./special-heading.md) | `special_heading` | An overline, title and subtitle — the standard way to open a section |
| [**Icon Box**](./icon-box.md) | `icon_box` | An icon above a heading and text — the standard feature or service card |
| [**Video Popup**](./video-popup.md) | `video_popup` | A poster image with a play button that opens the video in a lightbox |
| [**Star Rating**](./star-rating.md) | `star_rating` | A star rating with optional score, label and review count |
| [**Counter**](./counter.md) | `counter` | An animated number that counts up when scrolled into view |
| [**Before / After**](./before-after.md) | `before_after` | An image comparison slider — drag, hover or click to reveal |

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

Core 2.16.29 or later, with the **Shortcodes** extension active — the blocks render through it.

## Every block has a page

Each block above links to its own page listing **exactly which options its sidebar exposes**, and
anything block-specific worth knowing — an inert preview, an empty state, a setting that stays
page-builder-only.

That is a rule rather than a nicety: a block exposes a *curated subset* of its element's options, so
without a page there is no way to know what you get in the sidebar short of inserting one and
looking. Any new block ships with its page in the same change.
