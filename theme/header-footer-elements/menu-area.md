---
title: Menu Area
sidebar_position: 4
slug: /header-footer-elements/menu-area
description: The Unyson+ header Menu Area element — renders the menu assigned to a theme location; coding, generated HTML, and Hide On / CSS Class examples.
---

# Menu Area

Renders whatever WordPress menu is **assigned to a theme location** (Primary, Secondary, Footer, or any
registered location). Unlike [Menu](./menu.md) (which points at a specific menu id), this follows the
*location*, so swapping the assigned menu under *Appearance → Menus* updates it automatically.
Header-only.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `menu_area` |
| **Fields** | `menu_location` (select; default `primary`) |
| **Rendered by** | `unysonplus_render_menu_area()` in `inc/includes/header-builder.php`; the `primary` location renders inline via `unysonplus_render_primary_menu_inline()` |

## How it works

The renderer reads `menu_location` and calls `unysonplus_nav_menu( $location )`. When the location is
`primary`, it renders the primary menu inline (and shows an admin-only "assign a menu" notice if none
is set). Wrapped in the shared [`.header-element` wrapper](./index.md#the-wrapper-every-element-shares).

## Example 1 — basic

**Settings:** Location → *Primary*.

```php
array(
  'element_type'      => array( 'element' => 'menu_area', 'menu_area' => array( 'menu_location' => 'primary' ) ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="header-element header-element--menu_area">
  <nav class="up-nav"><ul class="menu">…the menu assigned to "Primary"…</ul></nav>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones**, **CSS Class: `main-nav`**.

```php
array(
  'element_type'      => array( 'element' => 'menu_area', 'menu_area' => array( 'menu_location' => 'primary' ) ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'main-nav',
)
```

```html
<div class="header-element header-element--menu_area hide-xs main-nav">
  <nav class="up-nav"><ul class="menu">…</ul></nav>
</div>
```

## Related

- [Menu](./menu.md) · [Overview](./index.md)
