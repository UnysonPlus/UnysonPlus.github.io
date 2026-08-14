---
title: Spacer
sidebar_position: 13
slug: /header-footer-elements/spacer
description: The Unyson+ header Spacer element — a flexible gap that pushes elements apart; coding, generated HTML, and Hide On / CSS Class examples.
---

# Spacer

A **flexible gap** that pushes the elements around it apart within a header slot — the usual way to
separate, say, the logo on the left from the menu and CTA on the right. It has **no fields**.
Header-only.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `spacer` |
| **Fields** | none |
| **Rendered by** | inline in `unysonplus_render_header_element()` (`inc/includes/header-builder.php`) |

## How it works

It emits a single decorative span that the header CSS grows to fill the available space:

```html
<span class="header-spacer" aria-hidden="true"></span>
```

## Example 1 — basic

```php
array(
  'element_type'      => array( 'element' => 'spacer', 'spacer' => array() ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="header-element header-element--spacer">
  <span class="header-spacer" aria-hidden="true"></span>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `push`**.

```php
array(
  'element_type'      => array( 'element' => 'spacer', 'spacer' => array() ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'push',
)
```

```html
<div class="header-element header-element--spacer hide-xs push">
  <span class="header-spacer" aria-hidden="true"></span>
</div>
```

## Related

- [Divider](./divider.md) — a visible separator instead of a gap. · [Overview](./index.md)
