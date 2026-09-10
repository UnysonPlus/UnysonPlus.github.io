---
title: Widget Area
sidebar_position: 20
sidebar_custom_props: { icon: '/img/shortcode-icons/widget-area.svg' }
---

# Widget Area

Render a registered sidebar / widget area inside the page. Tabs: **Content**, **Styling**,
**Animations**, **Advanced**.

A **widget** is a small self-contained block WordPress can place in a **widget area** — a search box, a list of recent posts, a menu, a bit of custom HTML. A widget area (WordPress also calls it a *sidebar*) is *registered* by your theme or the [Sidebars extension](/extensions/sidebars), then this element drops that whole area into your page wherever you want it.

:::tip[💡 Web dev tip: secondary content deserves its own landmark]
Content that supports the main content but isn't the main content — a sidebar of recent posts, a related-links box — is exactly what the `<aside>` element (or an ARIA `complementary` landmark) is for, letting assistive-tech users jump straight past it to the primary content, or straight to it, instead of reading everything in one undifferentiated stream. UnysonPlus renders a widget area with that landmark role rather than a bare unlabelled `<div>`, keeping the page's structure meaningful. [MDN: the aside element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside)
:::

## Live demo

**▶ [See the Widget Area live on the demos site](https://demos.unysonplus.com/shortcodes/widget-area/)** — an interactive example you can click through.

## Content

<img src="/img/shortcodes/widget-area-content.png" alt="Widget Area options panel — Content tab" width="750" />

| Option | Notes |
| --- | --- |
| **Sidebar** | Select which registered sidebar / widget area to render |

## Styling

<img src="/img/shortcodes/widget-area-styling.png" alt="Widget Area options panel — Styling tab" width="750" />

Text Color, Background Color, and Margin & Padding.
