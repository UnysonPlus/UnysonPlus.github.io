---
title: Widget Area
sidebar_position: 11
slug: /header-footer-elements/widget-area
description: The Unyson+ header/footer Widget Area element — renders a chosen WordPress sidebar; coding, generated HTML, and Hide On / CSS Class examples.
---

# Widget Area

Renders a chosen **WordPress widget area (sidebar)** inside a header bar or footer column — so you can
drop widgets (recent posts, a nav menu widget, an HTML widget, etc.) into the chrome. Common in
footers. Available in Header and Footer.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `widget_area` |
| **Fields** | `sidebar_id` (select; e.g. `footer-1`…`footer-5`, `header-1`…`header-3`, `sidebar-left/right`) |
| **Rendered by** | `unysonplus_render_widget_area()` (`inc/includes/footer-builder.php`) |

## How it works

If the chosen sidebar is active (has widgets), the renderer wraps `dynamic_sidebar()` output:

```html
<div class="footer-widget-area">…the widgets registered to {sidebar_id}…</div>
```

If the sidebar has no widgets, nothing is output.

## Example 1 — basic

**Settings:** Widget Area → *Footer 1*.

```php
array(
  'element_type'      => array( 'element' => 'widget_area', 'widget_area' => array( 'sidebar_id' => 'footer-1' ) ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="footer-element footer-element--widget_area">
  <div class="footer-widget-area">…widgets in "Footer 1"…</div>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `ftr-widgets`**.

```php
array(
  'element_type'      => array( 'element' => 'widget_area', 'widget_area' => array( 'sidebar_id' => 'footer-1' ) ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'ftr-widgets',
)
```

```html
<div class="footer-element footer-element--widget_area hide-xs ftr-widgets">
  <div class="footer-widget-area">…</div>
</div>
```

## Related

- [Overview](./index.md) — the shared wrapper, Hide On, CSS Class.
