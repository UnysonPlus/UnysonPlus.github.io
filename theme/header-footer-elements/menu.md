---
title: Menu
sidebar_position: 3
slug: /header-footer-elements/menu
description: The Unyson+ header/footer Menu element — renders a chosen WordPress menu; coding, generated HTML, and Hide On / CSS Class examples.
---

# Menu

Renders a **specific WordPress menu** (chosen by id) inside a header bar or footer column. Use this
when you want to place a particular menu directly, rather than a theme location.

## Where the code lives

| | |
| --- | --- |
| **Type key** | `menu` |
| **Fields** | `menu_id` (select of *Appearance → Menus*) |
| **Rendered by** | `unysonplus_render_menu()` in `inc/includes/header-builder.php` (via `unysonplus_nav_menu()`) |

## How it works

The renderer reads `menu_id` and hands it to the theme's nav renderer, which outputs the menu's
`<nav>` / `<ul>` markup (with the theme's dropdown / mega / accordion submenu behavior). It's wrapped
in the shared [`.header-element` wrapper](./index.md#the-wrapper-every-element-shares).

## Example 1 — basic

**Settings:** Menu → *Main Menu* (id `12`).

```php
array(
  'element_type'      => array( 'element' => 'menu', 'menu' => array( 'menu_id' => '12' ) ),
  'visibility'        => array(),
  'element_css_class' => '',
)
```

```html
<div class="header-element header-element--menu">
  <nav class="up-nav">
    <ul class="menu">…the "Main Menu" items…</ul>
  </nav>
</div>
```

## Example 2 — with Hide On + CSS Class

**Hide On: phones** (common — the menu moves into the off-canvas drawer there), **CSS Class:
`primary-nav`**.

```php
array(
  'element_type'      => array( 'element' => 'menu', 'menu' => array( 'menu_id' => '12' ) ),
  'visibility'        => array( 'hide-xs' ),
  'element_css_class' => 'primary-nav',
)
```

```html
<div class="header-element header-element--menu hide-xs primary-nav">
  <nav class="up-nav"><ul class="menu">…</ul></nav>
</div>
```

## Related

- [Menu Area](./menu-area.md) — render whatever menu is assigned to a theme location instead.
- [Overview](./index.md) — the shared wrapper, Hide On, CSS Class.
