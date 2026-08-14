---
title: Icon Text
sidebar_position: 6
slug: /header-footer-elements/icon-text
description: The Unyson+ header/footer Icon Text element — an icon plus a line of text with an optional smart link (URL / email / phone); coding, generated HTML, and Hide On / CSS Class examples.
---

# Icon Text

An **icon + a line of text**, optionally a smart link — a URL, an email (→ `mailto:`), or a phone
number (→ `tel:`). Great for a contact detail, an address, opening hours, or a small labelled link in
the header/footer. Available in Header and Footer.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `icon_text` |
| **Fields** | `icontext_icon` ([icon](/docs/options/option-types/icon)), `icontext_text`, `icontext_link_type` (`none`/`url`/`email`/`phone`), `icontext_link` |
| **Rendered by** | `unysonplus_render_icon_text()` in `inc/includes/header-builder.php` |

## How it works

The icon is rendered from the full [icon](/docs/options/option-types/icon) value (inline SVG, library
glyph, or a Font Awesome class). The link type decides the `href`: an external `url` gets
`target="_blank" rel="noopener noreferrer"`; `email` becomes an antispam-encoded `mailto:`; `phone`
becomes a digit-stripped `tel:`. With a link it renders an `<a>`, otherwise a `<span>`:

```html
<a class="header-icon-text" href="{href}">{icon} <span>{text}</span></a>
<!-- or, with link type = none -->
<span class="header-icon-text">{icon} <span>{text}</span></span>
```

## Example 1 — basic

**Settings:** Icon → phone glyph, Text → `+1 555 010 4477`, Link type → *Phone*.

```php
array(
  'element_type' => array(
    'element'   => 'icon_text',
    'icon_text' => array(
      'icontext_icon'      => array( /* icon value: phone */ ),
      'icontext_text'      => '+1 555 010 4477',
      'icontext_link_type' => 'phone',
      'icontext_link'      => '', // blank → falls back to the visible text
    ),
  ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="header-element header-element--icon_text">
  <a class="header-icon-text" href="tel:+15550104477">
    <svg class="header-icon-text__icon" …>…</svg> <span>+1 555 010 4477</span>
  </a>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `top-phone`**.

```php
array(
  'element_type' => array(
    'element'   => 'icon_text',
    'icon_text' => array(
      'icontext_text'      => '+1 555 010 4477',
      'icontext_link_type' => 'phone',
    ),
  ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'top-phone',
)
```

```html
<div class="header-element header-element--icon_text hide-xs top-phone">
  <a class="header-icon-text" href="tel:+15550104477">
    <svg class="header-icon-text__icon" …>…</svg> <span>+1 555 010 4477</span>
  </a>
</div>
```

## Related

- [`icon` option type](/docs/options/option-types/icon) · [Overview](./index.md)
