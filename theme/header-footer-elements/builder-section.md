---
title: Builder Section
sidebar_position: 12
slug: /header-footer-elements/builder-section
description: The Unyson+ header/footer Builder Section element — embeds a saved page-builder layout into the chrome; coding, generated HTML, and Hide On / CSS Class examples.
---

# Builder Section

Embeds a **saved page-builder layout** (any builder page) directly into a header bar or footer column —
for chrome that's too rich for the simple elements (a multi-column footer built visually, a promo
band, etc.). Available in Header and Footer.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `builder_section` |
| **Fields** | `builder_post_id` (select of saved page-builder posts) |
| **Rendered by** | `unysonplus_render_builder_section()` (`inc/includes/header-footer-presets.php`) |

## How it works

It reads the chosen post id, confirms it's a builder post (and not a header/footer preset, which it
refuses to nest), then renders its builder content through `do_shortcode()`:

```html
<div class="up-builder-section">…the saved builder layout…</div>
```

## Example 1 — basic

**Settings:** Builder Section → the *Footer CTA* layout (post id `340`).

```php
array(
  'element_type'      => array( 'element' => 'builder_section', 'builder_section' => array( 'builder_post_id' => '340' ) ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="footer-element footer-element--builder_section">
  <div class="up-builder-section">…the "Footer CTA" builder output…</div>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `ftr-cta`**.

```php
array(
  'element_type'      => array( 'element' => 'builder_section', 'builder_section' => array( 'builder_post_id' => '340' ) ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'ftr-cta',
)
```

```html
<div class="footer-element footer-element--builder_section hide-xs ftr-cta">
  <div class="up-builder-section">…</div>
</div>
```

## Related

- [Overview](./index.md) — the shared wrapper, Hide On, CSS Class.
