---
title: Back to Top
sidebar_position: 16
slug: /header-footer-elements/back-to-top
description: The Unyson+ footer-only Back to Top element — a link that scrolls to the top of the page; coding, generated HTML, and Hide On / CSS Class examples.
---

# Back to Top

A **back-to-top** link for the footer — an up-chevron, with optional text, that jumps to the top of the
page. **Footer-only.**

## Where the code lives

| | |
| --- | --- |
| **Type key** | `back_to_top` |
| **Fields** | `back_to_top_text` (text; optional label beside the chevron) |
| **Rendered by** | `unysonplus_render_back_to_top()` (`inc/includes/footer-builder.php`) |

## How it works

It emits an anchor to `#top` with an inline up-chevron SVG and an accessible label (the text if set,
else "Back to top"). If a label is set, it also renders visibly next to the icon:

```html
<a href="#top" class="footer-back-to-top" aria-label="{label}">
  <svg …><!-- up chevron --></svg> <span>{text}</span>
</a>
```

## Example 1 — basic

**Settings:** Text → `Back to top`.

```php
array(
  'element_type'      => array( 'element' => 'back_to_top', 'back_to_top' => array( 'back_to_top_text' => 'Back to top' ) ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="footer-element footer-element--back_to_top">
  <a href="#top" class="footer-back-to-top" aria-label="Back to top">
    <svg …>…</svg> <span>Back to top</span>
  </a>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `to-top`**.

```php
array(
  'element_type'      => array( 'element' => 'back_to_top', 'back_to_top' => array( 'back_to_top_text' => 'Back to top' ) ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'to-top',
)
```

```html
<div class="footer-element footer-element--back_to_top hide-xs to-top">
  <a href="#top" class="footer-back-to-top" aria-label="Back to top"><svg …>…</svg> <span>Back to top</span></a>
</div>
```

## Related

- [Overview](./index.md) — the shared wrapper, Hide On, CSS Class.
