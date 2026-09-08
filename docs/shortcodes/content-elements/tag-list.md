---
title: Tag List
sidebar_position: 39
---

# Tag List

A list of short items rendered as pills, chips or an inline separated list — one item per line, with optional links. Tabs: **Content**, **Design**, **Styling**, **Animations**, **Advanced**.

:::tip[💡 Web dev tip: tags are a list, and link text should say where it goes]
A row of related keywords or categories is still a list semantically, so it should render as `<li>`s inside a `<ul>` (with each linked tag an `<a>` around real, descriptive text) rather than a row of bare `<span>`s — that's what lets a screen reader announce "list, 6 items" and lets a search engine follow each tag to its destination. Avoid vague link text like "click here" for a tag; the tag's own label is already the descriptive text, which is exactly what this element uses. [MDN: the ul element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)
:::

## Content

<img src="/img/shortcodes/tag-list-content.png" alt="Tag List options panel — Content tab" width="1200" />

- **Items** — one item per line. A line without a `|` is plain text; `Label | URL` turns that tag into a link (absolute or relative `/path/`). Blank lines are ignored. External links open in a new tab automatically.

## Design

<img src="/img/shortcodes/tag-list-design.png" alt="Tag List options panel — Design tab" width="1200" />

| Option | Choices |
| --- | --- |
| **Design** | Soft (tinted fill, default), Outline (bordered), Solid (filled), Subtle (light grey), Inline (no pill, dot-separated) |
| **Shape** | Pill (fully rounded, default), Rounded, Square — ignored by the Inline design |
| **Size** | Small, Medium (default), Large |
| **Alignment** | Left (default), Center, Right |
| **Gap** | Tight (default), Normal, Roomy |
| **Leading Marker** | None (default), Dot |
| **Hover Lift** | Subtle lift + accent on hover — most noticeable on linked tags. Default Off |

## Styling

<img src="/img/shortcodes/tag-list-styling.png" alt="Tag List options panel — Styling tab" width="1200" />

- **Tag Color** — drives the fill / border / text of every tag. Pick a Color Preset (recommended — it follows your brand) or a custom color. Leave empty for a neutral grey.
- **Margin & Padding** — spacing around the list. All Sides applies to every side; any per-side value overrides it for that direction.

## Animations

Standard entrance-animation controls (effect, duration, delay, offset).

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
