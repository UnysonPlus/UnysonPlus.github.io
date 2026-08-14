---
title: Custom HTML
sidebar_position: 10
slug: /header-footer-elements/custom-html
description: The Unyson+ header/footer Custom HTML element — a raw HTML block (shortcodes run, images get dimensions); coding, generated HTML, and Hide On / CSS Class examples.
---

# Custom HTML

A **raw HTML** block for a header bar or footer column — for a badge strip, a small embed, or markup a
rich-text field cannot express. Shortcodes inside it run, and bare `<img>` tags get intrinsic
width/height added (to avoid layout shift). Available in Header and Footer.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `custom_html` |
| **Fields** | `custom_html_content` (textarea) |
| **Rendered by** | `unysonplus_render_custom_html()` in `inc/includes/header-builder.php` |

## How it works

The content is passed through `do_shortcode()` and `unysonplus_img_add_dimensions()` (which resolves
each local image's real size and adds `width`/`height`), then wrapped:

```html
<div class="header-custom-html">…your HTML (shortcodes expanded, images sized)…</div>
```

## Example 1 — basic

**Settings:** Content set to a small badge span.

```php
array(
  'element_type'      => array( 'element' => 'custom_html', 'custom_html' => array( 'custom_html_content' => '<span class="badge">New</span>' ) ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="header-element header-element--custom_html">
  <div class="header-custom-html"><span class="badge">New</span></div>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `promo`**.

```php
array(
  'element_type'      => array( 'element' => 'custom_html', 'custom_html' => array( 'custom_html_content' => '<span class="badge">New</span>' ) ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'promo',
)
```

```html
<div class="header-element header-element--custom_html hide-xs promo">
  <div class="header-custom-html"><span class="badge">New</span></div>
</div>
```

## Related

- [Text](./text.md) — a rich-editor alternative. · [Overview](./index.md)
