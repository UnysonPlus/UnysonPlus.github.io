---
title: Icon Box
sidebar_position: 8
---

# Icon Box

An icon paired with a title and content — great for feature grids, service lists, and
highlights. Options are organized into tabs: **Content**, **Layout**, **Link & SEO**,
**Styling**, **Animations**, and **Advanced**.

## Layouts (Icon Position)

The **Icon Position** option sets where the icon sits relative to the title and content.
There are **six layouts**:

| Layout | Value | Best for |
| --- | --- | --- |
| Icon above title | `top-title` | Centred feature grids (default) |
| Icon inline, left of title | `inline-left` | Compact list-style rows |
| Icon inline, right of title | `inline-right` | Compact rows, icon trailing the title |
| Icon left of title & content | `stack-left` | Side layout — icon beside the whole block |
| Icon right of title & content | `stack-right` | Side layout, icon on the right |
| Icon between title and content (divider) | `between-title-content` | Icon acting as a separator |

:::note Screenshots — one per layout
Add a screenshot of each layout to `static/img/shortcodes/`, e.g.
`![Icon above title](/img/shortcodes/icon-box-top-title.png)`. Suggested filenames:
`icon-box-top-title`, `icon-box-inline-left`, `icon-box-inline-right`, `icon-box-stack-left`,
`icon-box-stack-right`, `icon-box-between-title-content`.
:::

## Icon Badge

A coloured background or outlined ring around the icon. Pair with **Icon Badge Color** in the
Styling tab. **Seven** options:

| Badge | Value |
| --- | --- |
| None | `none` |
| Solid Square | `solid-square` |
| Solid Rounded | `solid-rounded` |
| Solid Circle | `solid-circle` |
| Outline Square | `outline-square` |
| Outline Rounded | `outline-rounded` |
| Outline Circle | `outline-circle` |

Solid shapes fill the badge with the chosen colour (best with a light icon); Outline shapes
draw just a ring.

## Content tab

| Option | Type | Notes |
| --- | --- | --- |
| **Icon** | Icon picker | Pick a font icon from the library. Ignored if Custom Icon is filled. Recolour it via **Icon Color**. |
| **Custom Icon (Emoji / SVG)** | Text | Optional. Overrides the icon picker. Accepts an emoji (⭐) or inline SVG. Emoji/SVG colours are fixed. |
| **Title** | Text | The headline next to the icon. Leave empty for an icon-only box. |
| **Title HTML Tag** | Select | `H3` (default), `H4`, `H5`, `H6`, `Span (decorative)`, `Paragraph`. Keep headings in order for SEO. |
| **Content** | WYSIWYG | Optional body text; supports rich text and nested shortcodes. |

## Layout tab (alignment & responsive)

| Option | Type | Choices |
| --- | --- | --- |
| **Icon Alignment** | Alignment | Inherit / Left / Center / Right (applies to `top-title` and `between-title-content`) |
| **Title Alignment** | Alignment | Inherit / Left / Center / Right |
| **Content Alignment** | Alignment | Inherit / Left / Center / Right |
| **Stack on Mobile** | Switch | On (default) — moves the icon to the top on small screens, regardless of layout |

## Link & SEO tab

| Option | Type | Notes |
| --- | --- | --- |
| **Box Link URL** | Text | Optional. Makes the whole box clickable. Don't put other links inside Content when set. |
| **Open in New Tab** | Switch | Opens the box link in a new tab (best for external links). |
| **Link Rel Attribute** | Select | `None`, `Nofollow`, `Sponsored` — SEO hint for the link relationship. |

## Styling tab

Background Color, Font Size (preset), **Title Color**, **Content Color**, **Icon Color**
(font icons only), **Icon Badge Color**, and **Margin & Padding**. Colors accept a theme
preset or a one-off custom hex.

## Animations & Advanced tabs

Standard on every element: entrance **Animations** and an **Advanced** tab (custom CSS
class/ID and visibility controls).

## Screenshots

:::note
Drop additional screenshots into `static/img/shortcodes/` and embed them here.
:::
