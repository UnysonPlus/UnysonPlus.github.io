---
title: Divider
sidebar_position: 6
sidebar_custom_props: { icon: '/img/shortcode-icons/divider.svg' }
---

# Divider

A horizontal separator, optionally with text or an icon. Tabs: **Content**, **Layout**,
**Styling**, **Animations**, **Advanced**.

<img src="/img/shortcodes/divider-backend.png" alt="Divider on the Page Builder canvas" width="936" />

:::tip[💡 Web dev tip: not every line on screen is a semantic `<hr>`]
An `<hr>` means "here is a real thematic break in the content" (like a scene change in a story), so a purely decorative rule drawn just for visual spacing shouldn't be one — it should carry `aria-hidden="true"` (or be plain CSS) so screen readers don't announce a break that isn't really there. UnysonPlus renders this element as presentational markup with the appropriate hidden state, so decorative dividers don't clutter the accessibility tree. [MDN: the hr element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr)
:::

## Content

<img src="/img/shortcodes/divider-content.png" alt="Divider options panel — Content tab" width="750" />

| Option | Choices |
| --- | --- |
| **Ruler Type** | Line / Divider, Whitespace |
| **Line Design** | Standard (Solid), Gradient Fade, Ornamental / Glyph, Inner Shadow |
| **Add Element** | None, Text / Title, Icon |
| **Divider Text** | Shown when Add Element = Text |
| **Select Icon** | Shown when Add Element = Icon |
| **Content Alignment** | Center, Left, Right |
| **Height (px)** | Thickness / whitespace height |

:::note[Screenshots — line designs]
Capture each **Line Design** and the text/icon variants: `divider-solid`,
`divider-gradient`, `divider-ornament`, `divider-shadow`, `divider-with-text`,
`divider-with-icon`.
:::

## Layout

<img src="/img/shortcodes/divider-layout.png" alt="Divider options panel — Layout tab" width="750" />

Margin Top/Bottom, Width (%), and spacing controls.

## Styling

<img src="/img/shortcodes/divider-styling.png" alt="Divider options panel — Styling tab" width="750" />

Line Color, Icon Color, Divider Text Color, Background Color, and Margin & Padding.
