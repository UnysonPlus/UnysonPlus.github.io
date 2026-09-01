---
title: Icon Box
sidebar_position: 5
description: The Unyson+ Icon Box block — an icon, title and text as one feature card with layout, sizing, colours and an optional box link, rendered by the icon box element.
---

# Icon Box

The classic feature card — an **icon**, a **title** and a line of **text** — for a
“why us” row, a services grid, or a set of benefits. Choose the icon, the layout
(icon on top or beside the text), and optionally make the whole box a link.

Like every block in the library, it is a second *authoring* surface onto the
[icon box element](/shortcodes/components/icon-box): the editor preview and the front end
are the same server-rendered output.

<img src="/img/blocks/icon-box/front.png" alt="An Icon Box — a green bolt icon above the title “Free, forever” and a line of text" width="1210" />

Add it from the inserter (**+** → search *Icon Box* → the one under **Unyson+**), then set
the icon and text in the block settings.

<img src="/img/blocks/icon-box/inspector.png" alt="The Icon Box block settings — icon, title, content and layout" width="300" />

## Options

### Content

| Option | What it does |
| --- | --- |
| **Icon** (`icon`) | The icon — an icon font, emoji, SVG or uploaded image. |
| **Title** (`title`) | The card heading. |
| **Title Tag** (`title_tag`) | Its semantic heading level `H2`–`H6`. |
| **Content** (`content`) | The supporting text below the title (rich text). |
| **Box Link** (`box_link`) | Make the whole box a link to a URL. |
| **Link Target** (`link_target`) | Open that link in a new tab. |

### Layout & Styling

| Option | What it does |
| --- | --- |
| **Layout** (`style`) | Icon on **top** of the text or **beside** it. |
| **Icon Alignment** (`icon_align`) | Left / Center / Right placement of the icon. |
| **Icon Size** (`icon_size`) | The icon’s size. |
| **Box Style** (`box_style`) | The card treatment — plain, bordered, or a filled/elevated card. |
| **Colours** (`bg_color`, `icon_color`, `title_color`, `content_color`) | Box background and icon / title / text colours. |

### WordPress block supports

- **Alignment** — Wide / Full.  •  **Dimensions** — Margin and Padding.  •  Inherits the theme’s design system from `theme.json`.

## Sample content

The demo above is a centered bolt icon with a title and one line of text:

```html
<!-- wp:unysonplus/icon-box {"upOptions":{
  "icon":{"type":"icon-font","icon-class":"fa-solid fa-bolt"},
  "title":"Free, forever",
  "content":"<p>Every extension is free, with no pro tier — add only what you need.</p>",
  "icon_align":"center",
  "title_tag":"h3"
}} /-->
```

A freshly inserted block stores only what you change; the element’s declared defaults
fill in the rest at render time.

## Relationship to the icon box element

The block and the page builder’s [icon box element](/shortcodes/components/icon-box) are
two doors onto the same code — every option and class documented there is true here; the
block simply exposes those options as a generated inspector.
