---
title: Special Heading
sidebar_position: 4
description: The Unyson+ Special Heading block — an overline (eyebrow), title and subtitle as one composed section header, with icons, sizing and colours, rendered by the special heading element.
---

# Special Heading

A section header as one composed unit — an **overline** (eyebrow), a **title**, and a
**subtitle** — instead of three separate blocks you have to align by hand. Set the
heading level for SEO independently of the visual size.

Like every block in the library, it is a second *authoring* surface onto the
[special heading element](/shortcodes/content-elements/special-heading): the editor
preview and the front end are the same server-rendered output.

<img src="/img/blocks/special-heading/front.png" alt="A centered Special Heading — overline “UNYSONPLUS”, a title, and a subtitle" width="1210" />

Add it from the inserter (**+** → search *Special Heading* → the one under **Unyson+**),
then write the three lines in the block settings.

<img src="/img/blocks/special-heading/inspector.png" alt="The Special Heading block settings — overline, title, subtitle and title tag" width="300" />

## Options

### Content

| Option | What it does |
| --- | --- |
| **Overline** (`overline`) | The small eyebrow label above the title. Leave empty to hide. |
| **Title** (`title`) | The heading text. You can wrap part of it in inline HTML (an `<em>` or a coloured `<span>`) to emphasise a word. |
| **Subtitle** (`subtitle`) | A short supporting line under the title. For longer copy use a Text Block. |
| **Title Tag** (`heading`) | The semantic level `H1`–`H6` — SEO/structure only, not size. One `H1` per page. |

### Icons

| Option | What it does |
| --- | --- |
| **Overline Icon** (`overline_icon`) | An icon beside the overline (icon font, emoji, SVG or image), before or after the text. |
| **Title Icon** (`icon`) | An icon beside the title, kept as a separate field so the heading text stays clean and semantic. |

### Layout & Styling

| Option | What it does |
| --- | --- |
| **Alignment** (`alignment`) | Left / Center / Right for the whole unit. |
| **Title Display Size** (`display_size`) | The visual size of the title, independent of its tag. |
| **Subtitle Size** (`subtitle_size`) | The visual size of the subtitle. |
| **Element Spacing** (`element_spacing`) | The gap between overline, title and subtitle. |
| **Overline Uppercase** (`overline_uppercase`) | Force the overline to uppercase. |
| **Overline Marker** (`overline_marker`) | A rule / kicker mark on the overline. |
| **Max Width** (`block_max_width`) | Constrain the heading’s width for tidy line-lengths. |
| **Colours** (`bg_color`, `overline_color`, `title_color`, `subtitle_color`) | Background and per-line text colours. |

### WordPress block supports

- **Alignment** — Wide / Full.  •  **Dimensions** — Margin and Padding.  •  Inherits the theme’s design system from `theme.json`.

## Sample content

The demo above is a centered overline / title / subtitle:

```html
<!-- wp:unysonplus/special-heading {"upOptions":{
  "overline":"UNYSONPLUS",
  "title":"Premium features — none of the premium price",
  "subtitle":"A free WordPress framework with no pro tier.",
  "alignment":"center"
}} /-->
```

A freshly inserted block stores only what you change; the element’s declared defaults
fill in the rest at render time.

## Relationship to the special heading element

The block and the page builder’s [special heading element](/shortcodes/content-elements/special-heading)
are two doors onto the same code — every option and class documented there is true here;
the block simply exposes those options as a generated inspector.
