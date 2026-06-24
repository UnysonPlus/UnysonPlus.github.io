---
title: Build a sticky site header
description: Design a global header with the Unyson+ Theme Builder and make it stick (or shrink) on scroll, assigned across your whole site.
---

# Build a sticky site header

A sticky header stays visible as visitors scroll. With the [Theme Builder](/docs/extensions/theme-builder)
you design the header visually and assign it site-wide, with a sticky scroll behavior.

## Steps

1. Install **Theme Builder** (Unyson+ → Extensions, it shows a **Download** card), then open the new
   **Theme Builder** admin menu.
2. **Header Presets → Add New**. Build the header with the page builder using the Header/Footer
   elements: **Site Logo**, **Navigation Menu**, **Site Search**, **Social Icons**, **Menu Toggle**.
3. In the **Header Type & Behavior** box, set **Scroll Behavior → Sticky** (or **Sticky + Shrink** to
   shrink it once scrolled). **Publish**.
4. **Theme Builder → Add Template**. Set its **Header** slot to your new preset; leave Body/Footer as
   *Inherit / None*.
5. Set **Used On** to apply it site-wide (a default / all rule) and save.

The header now renders everywhere and sticks on scroll. When no template matches a page, your **Theme
Settings** header is the fallback, so the site always has a working header.

## See also

- [Theme Builder](/docs/extensions/theme-builder) — templates, conditions, and the fallback chain
- [Header / Footer Elements](/docs/shortcodes/header-footer-elements) — the building blocks
- [Design a custom 404 page](./custom-404-page.md) — another Theme Builder template
