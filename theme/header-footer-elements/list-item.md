---
title: List Item
sidebar_position: 6
slug: /header-footer-elements/list-item
description: The Unyson+ header/footer List Item element — a line of text with an optional icon and an optional smart link (URL / email / phone). A run of them auto-groups into a semantic list. Supersedes the old Link and Icon Text elements.
---

# List Item

The **unified** header/footer row: a line of **text**, an optional **icon**, and an optional smart
**link** — a URL, an email (→ `mailto:`), or a phone number (→ `tel:`). One element expresses a menu
link, a plain text line, an icon+text contact row, or a clickable email/phone. It **supersedes the old
`link` and `icon_text` elements** (those still render for older saved layouts). Available in Header and
Footer.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `list_item` |
| **Fields** | `li_text`, `li_icon` ([icon](/options/option-types/icon)), `li_link_type` (`none`/`url`/`email`/`phone`), `li_link`, `li_target` (`_self`/`_blank`) |
| **Rendered by** | `unysonplus_render_list_item_element()` in `inc/includes/header-builder.php` |

## How it works

The optional icon renders from the full [icon](/options/option-types/icon) value (inline SVG,
library glyph, or a Font Awesome class) as `<span class="list-item__icon">`; the text is
`<span class="list-item__text">`. The **link type** decides the `href`: a `url` may open in a new tab
(explicit *Open in* = New tab, or an external host) with `rel="noopener noreferrer"`; `email` becomes an
antispam-encoded `mailto:`; `phone` becomes a digit-stripped `tel:`. With a link it renders an `<a>`,
otherwise a `<span>`:

```html
<a class="footer-link hf-link list-item" href="{href}">{icon} <span class="list-item__text">{text}</span></a>
<!-- or, with link type = none -->
<span class="list-item">{icon} <span class="list-item__text">{text}</span></span>
```

### Auto-grouping into a list

A run of **2 or more** consecutive List Item elements auto-groups into one semantic list at render — no
wrapper on each row (clean DOM):

```html
<ul class="footer-links footer-links-list">
  <li><a class="footer-link hf-link list-item" href="/services"><span class="list-item__text">Services</span></a></li>
  <li><a class="footer-link hf-link list-item" href="/shop"><span class="list-item__text">Shop</span></a></li>
  <li><a class="footer-link hf-link list-item" href="/about"><span class="list-item__text">About Us</span></a></li>
</ul>
```

A lone List Item stays a standalone link / span (not wrapped in a `<ul>`).

## Example 1 — a contact row (icon + phone link)

**Settings:** Icon → phone glyph, Text → `+1 555 010 4477`, Link type → *Phone*.

```php
array(
  'element_type' => array(
    'element'   => 'list_item',
    'list_item' => array(
      'li_icon'      => array( /* icon value: phone */ ),
      'li_text'      => '+1 555 010 4477',
      'li_link_type' => 'phone',
      'li_link'      => '', // blank → falls back to the visible text
    ),
  ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<li>
  <a class="footer-link hf-link list-item" href="tel:+15550104477">
    <span class="list-item__icon"><svg …>…</svg></span>
    <span class="list-item__text">+1 555 010 4477</span>
  </a>
</li>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `top-phone`**. On a List Item these ride on the `<li>` itself (the
element is [self-wrapped](./index.md) — no extra `<div>`), and `footer-element` is added so the
`.footer-element.hide-xs` visibility rule matches:

```php
array(
  'element_type' => array(
    'element'   => 'list_item',
    'list_item' => array(
      'li_text'      => '+1 555 010 4477',
      'li_link_type' => 'phone',
    ),
  ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'top-phone',
)
```

```html
<li class="footer-element hide-xs top-phone">
  <a class="footer-link hf-link list-item" href="tel:+15550104477">
    <span class="list-item__text">+1 555 010 4477</span>
  </a>
</li>
```

## Related

- [`icon` option type](/options/option-types/icon) · [Overview](./index.md)
