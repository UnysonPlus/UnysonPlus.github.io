---
title: Search
sidebar_position: 66
---

# Search

A site search form — either always visible inline, or a compact icon that expands on click. Options live under the **Content** and **Advanced** tabs.

:::tip[💡 Web dev tip: a search box needs a label and a role]
Even when the design hides it, a search field needs a real (possibly visually-hidden) `<label>`, and wrapping it in `role="search"` marks it as a landmark people can jump to. A magnifying-glass button with no text needs an accessible name like "Search". [MDN: the search role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/search_role)
:::

## Content

<img src="/img/shortcodes/site-search-content.png" alt="Search options panel — Content tab" width="1200" />

- **Style** — **Inline Form (always visible)** (default) shows the search field at all times; **Icon (expands on click)** shows a search icon that reveals the field when clicked.
- **Placeholder Text** — the field's placeholder; defaults to `Search …`.

## Advanced

Custom CSS class/ID, responsive visibility toggles, custom attributes, and margin/padding.
