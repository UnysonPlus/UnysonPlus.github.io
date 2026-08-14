---
title: Divider
sidebar_position: 14
slug: /header-footer-elements/divider
description: The Unyson+ header Divider element — a thin vertical separator between elements; coding, generated HTML, and Hide On / CSS Class examples.
---

# Divider

A thin **vertical separator** between header elements (e.g. a hairline between the phone number and the
social icons). It has **no fields**. Header-only.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `divider` |
| **Fields** | none |
| **Rendered by** | inline in `unysonplus_render_header_element()` (`inc/includes/header-builder.php`) |

## How it works

It emits a single span with a separator role, styled by the header CSS as a vertical rule:

```html
<span class="header-divider" role="separator" aria-orientation="vertical"></span>
```

## Example 1 — basic

```php
array(
  'element_type'      => array( 'element' => 'divider', 'divider' => array() ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="header-element header-element--divider">
  <span class="header-divider" role="separator" aria-orientation="vertical"></span>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `rule`**.

```php
array(
  'element_type'      => array( 'element' => 'divider', 'divider' => array() ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'rule',
)
```

```html
<div class="header-element header-element--divider hide-xs rule">
  <span class="header-divider" role="separator" aria-orientation="vertical"></span>
</div>
```

## Related

- [Spacer](./spacer.md) — an invisible flexible gap instead. · [Overview](./index.md)
