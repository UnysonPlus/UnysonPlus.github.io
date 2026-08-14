---
title: Search
sidebar_position: 7
slug: /header-footer-elements/search
description: The Unyson+ header/footer Search element — an inline WordPress search form; coding, generated HTML, and Hide On / CSS Class examples.
---

# Search

An inline **site search form** (a text input + a magnifier button) that submits a standard WordPress
search. It has **no fields** — it's a self-contained form. Available in Header and Footer.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `search` |
| **Fields** | none (`element_type[search]` = `{}`) |
| **Rendered by** | `unysonplus_render_search()` in `inc/includes/header-builder.php` |

## How it works

The renderer emits a `GET` form pointed at the site root with an `s` search field and a submit button
carrying an inline magnifier SVG — a plain, accessible WordPress search:

```html
<form role="search" method="get" class="header-search-form" action="https://example.com/">
  <input type="search" class="header-search-input" placeholder="Search..." value="" name="s" />
  <button type="submit" class="header-search-btn" aria-label="Search">
    <svg …><!-- magnifier --></svg>
  </button>
</form>
```

## Example 1 — basic

```php
array(
  'element_type'      => array( 'element' => 'search', 'search' => array() ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="header-element header-element--search">
  <form role="search" method="get" class="header-search-form" action="https://example.com/">
    <input type="search" class="header-search-input" placeholder="Search..." name="s" />
    <button type="submit" class="header-search-btn" aria-label="Search"><svg …>…</svg></button>
  </form>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `hdr-search`**.

```php
array(
  'element_type'      => array( 'element' => 'search', 'search' => array() ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'hdr-search',
)
```

```html
<div class="header-element header-element--search hide-xs hdr-search">
  <form role="search" method="get" class="header-search-form" action="https://example.com/">…</form>
</div>
```

## Related

- [Overview](./index.md) — the shared wrapper, Hide On, CSS Class.
