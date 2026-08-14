---
title: Footer Logo
sidebar_position: 15
slug: /header-footer-elements/footer-logo
description: The Unyson+ footer-only Footer Logo element — a dedicated footer logo image with its own width; coding, generated HTML, and Hide On / CSS Class examples.
---

# Footer Logo

A **dedicated footer logo** with its own image and display width — separate from the header
[Logo](./logo.md), so a footer can show a different (often lighter / monochrome) mark. **Footer-only.**

## Where the code lives

| | |
| --- | --- |
| **Type key** | `footer_logo` |
| **Fields** | `footer_logo_image` (upload), `footer_logo_width` (unit-input, default `12.5rem`) |
| **Rendered by** | `unysonplus_render_footer_logo()` (`inc/includes/footer-builder.php`) |

## How it works

The image is re-resolved from its attachment id on the current site (so a cloned/deployed site never
serves a stale URL), and the width is applied as a `max-width`. It renders a home link wrapping the
image (falling back to the site title lockup if the image is missing):

```html
<a href="{home}" class="footer-logo-link">
  <img class="footer-logo-img" src="{image}" style="max-width:{width}" alt="…" />
</a>
```

## Example 1 — basic

**Settings:** Image → a footer logo upload, Width → `10rem`.

```php
array(
  'element_type' => array(
    'element'     => 'footer_logo',
    'footer_logo' => array(
      'footer_logo_image' => array( 'attachment_id' => 512, 'url' => '…/footer-logo.svg' ),
      'footer_logo_width' => array( 'value' => '10', 'unit' => 'rem' ),
    ),
  ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="footer-element footer-element--footer_logo">
  <a href="https://example.com/" class="footer-logo-link">
    <img class="footer-logo-img" src="…/footer-logo.svg" style="max-width:10rem" alt="Acme" width="200" height="48" />
  </a>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `ftr-brand`**.

```php
array(
  'element_type' => array(
    'element'     => 'footer_logo',
    'footer_logo' => array(
      'footer_logo_image' => array( 'attachment_id' => 512 ),
      'footer_logo_width' => array( 'value' => '10', 'unit' => 'rem' ),
    ),
  ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'ftr-brand',
)
```

```html
<div class="footer-element footer-element--footer_logo hide-xs ftr-brand">
  <a href="https://example.com/" class="footer-logo-link">
    <img class="footer-logo-img" src="…/footer-logo.svg" style="max-width:10rem" alt="Acme" width="200" height="48" />
  </a>
</div>
```

## Related

- [Logo](./logo.md) — the header logo (reuses Site Identity). · [Overview](./index.md)
