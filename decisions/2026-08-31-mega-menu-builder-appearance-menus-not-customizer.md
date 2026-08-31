---
slug: mega-menu-builder-appearance-menus-not-customizer
title: "Why the Mega Menu builder stays in Appearance → Menus, not the Customizer"
authors: [jon]
tags: [architecture, header]
date: 2026-08-31
description: The mega menu controls show up in Appearance → Menus but not in Customize → Menus. Rather than rebuild the whole column/item/Settings-modal UI inside the Customizer, we keep the builder where it hooks cleanly and reserve any second surface for the block-editor navigation — the Customizer is a legacy surface.
---

**The question:** Would it be better to make the Customizer (Appearance → Customize → Menus) carry the
same mega menu settings and options as Appearance → Menus? Right now the mega controls only appear in
the classic menu editor.

<!-- truncate -->

## Context

WordPress has two menu editors, and the mega menu extension only enriches one of them:

1. **Appearance → Menus** (`nav-menus.php`) is **PHP-walker-driven**. The extension hooks
   `wp_edit_nav_menu_walker` to swap in its own admin walker — which is exactly why the "Use as Mega
   Menu" checkbox, the column/item fields, and the `fw.OptionsModal` "Settings" panel drop in cleanly.
2. **Customize → Menus** is **Backbone / JS-templated**. Its item controls are created and destroyed
   dynamically in the browser; there is no walker to hook, and every control has to be reimplemented as
   a JS template plus a Customizer setting.

So the Customizer shows only WordPress's built-in item fields — no mega controls.

## Options considered

| Option | Trade-off |
|---|---|
| **Full parity** — reimplement the whole builder (columns, content types, the Settings modal) inside the Customizer | Large, fragile JS integration on a surface WordPress is winding down; the modal needs a separate Customizer host; a cramped live-preview sidebar is the wrong shape for a multi-column builder. High cost, high maintenance. |
| **Keep it in Appearance → Menus, add a pointer** — leave the builder where it works; optionally a one-line *"edit in Appearance → Menus"* notice in the Customizer item control | Users get the full builder in the right place; a cheap notice stops the "where did my settings go?" confusion. |
| **Invest the second surface in the block editor instead** — support the `wp_navigation` block / Site Editor | Aligns with where WordPress is actually heading (FSE), not the legacy Customizer. |

## Decision

Keep the mega menu builder in **Appearance → Menus**. Do **not** build Customizer parity. If a second
editing surface is ever warranted, target the **block-editor / FSE navigation**, not the Customizer. A
small "these settings live in Appearance → Menus" pointer inside the Customizer item control is an
acceptable, cheap courtesy — but not a parallel builder.

## Why

- **The Customizer is legacy.** Menu and site editing are consolidating into the Site Editor and the
  `wp_navigation` block; the Customizer's menu panel is in maintenance mode. Rich work there is
  investment in a disappearing UI.
- **Effort is disproportionate to value.** The walker hook is a few dozen lines; a Customizer
  reimplementation is a parallel Backbone UI plus a modal host, carried forever.
- **It matches the field.** Max Mega Menu, UberMenu and QuadMenu all keep their builder in
  Appearance → Menus (or a dedicated screen), not the Customizer.
- **UX fit.** A multi-column, multi-content-type mega builder does not belong in a narrow live-preview
  sidebar.
