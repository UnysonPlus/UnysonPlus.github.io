---
title: Nav Menu
description: The Unyson+ Nav Menu block — a WordPress menu rendered anywhere, horizontal or vertical, with dropdowns and mega-menu support, authored in the block editor and rendered by the nav-menu element.
---

# Nav Menu

A **WordPress menu** rendered anywhere on the page — pick a menu you built under **Appearance → Menus** (or a theme location) and show it horizontally, vertically, or as a dropdown, with submenu and mega-menu support. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Nav Menu element](/shortcodes/header-footer-elements/nav-menu) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/nav-menu/front.png" alt="The Nav Menu block — a horizontal navigation menu" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Menu source (`menu_source`) | Pick a **menu** by name, or a theme **location**. |
| Orientation (`orientation`, `alignment`) | Horizontal or vertical, and how the items align. |
| Depth + Submenus (`depth`, `submenu_style`, `dropdown`, `accordion`, `mega`) | How many levels to show and how submenus open — dropdown, accordion or mega menu. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above shows a menu by its ID, horizontally:

```html
<!-- wp:unysonplus/nav-menu {"upOptions":{"menu_source":{"type":"menu","menu":{"menu_id":"31"}},"orientation":"horizontal","alignment":"center"}} /-->
```

Pick the menu in the block's inspector rather than typing an ID by hand.

## The nav-menu element

The block and the page builder's [Nav Menu element](/shortcodes/header-footer-elements/nav-menu) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
