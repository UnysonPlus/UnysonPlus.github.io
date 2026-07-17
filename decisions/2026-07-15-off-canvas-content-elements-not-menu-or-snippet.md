---
slug: off-canvas-content-elements-not-menu-or-snippet
title: "Why the off-canvas panel takes elements, not a menu-or-snippet toggle"
authors: [jon]
tags: [header, option-types, architecture]
date: 2026-07-15
description: The off-canvas drawer only ever rendered a menu. Rather than add a "menu OR snippet" select, we gave it the same element list the header columns use — and added a Snippet element to the shared registry so it works everywhere.
---

**The question:** Can we make the Off-Canvas header mode more flexible? Right now it only displays
the menu. Can it display Snippets — I want the ability to add shortcodes or custom info in that
panel. Perhaps a select where the user chooses *default menu* or *snippet*, and for snippet a
dropdown of snippets?

<!-- truncate -->

## Context

The drawer panel rendered exactly one thing — a nav menu — and it does **not** pull from the Main
Header columns (those live in the header bar). So there was no way to put a CTA, social icons or any
custom markup in it.

Two findings shaped the answer:

1. **The drawer is shared.** Ten header templates render the same panel — it's the *entire* menu in
   Off-Canvas mode and the *mobile drawer* in every other mode (top, overlay, vertical, builder…).
   Whatever we add lands on all of them.
2. **The header already has an element system.** Columns are composed from an "Add element" popup
   (Menu, CTA Button, Social Icons, Search, Custom HTML, Builder Section…) with per-element options,
   drag-ordering, and a filter (`unysonplus_hf_elements`) for addons. The drawer was the one part of
   the chrome that bypassed it and hardcoded a menu.

## Options considered

| Option | Trade-off |
|---|---|
| **Menu OR Snippet select** (the original idea) | Simple, but *either/or*. Real panels want menu **plus** extras (a CTA, social, phone). You'd have to rebuild the whole menu inside a snippet just to add one button under it. |
| **Element list** (same control as a header column) | Compose menu + snippet + button + anything, in any order, with the UI users already know. No new paradigm. |

## Decision

Give the drawer an **"Off-Canvas Content" element list** — literally the same `addable-popup` control
a header column uses — and add a **Snippet element to the shared element registry** (a dropdown of
published snippets, rendered via `fw_ext_snippets_render()`). Because the Snippet element lives in the
registry, it works in the **drawer, header columns and footer** at once. A **Trigger Icon** option
(icon-v2) was added alongside, and the toggle button was extracted into one shared
`unysonplus_render_menu_toggle()` instead of being duplicated across the templates.

The setting applies to the **shared drawer** (so your mobile menu can have a CTA too), and it is
**backward-compatible**: leaving the list empty renders exactly what that mode always rendered. The
fallback is per-mode on purpose — off-canvas falls back to the Off-Canvas menu, overlay to the
Overlay menu, top/vertical to Primary — so nothing regresses and no migration is needed.

## Why

An either/or select would have hit its ceiling immediately, and "add a snippet slot to the drawer"
would have been a one-off feature. Reusing the element system solved the actual request (**arbitrary
content, including shortcodes**) with *less* new surface area, stayed consistent with how the rest of
the chrome is built, and the Snippet element paid off three times over instead of once. Extracting the
toggle was the same instinct: change the markup in one place rather than let ten copies drift.
