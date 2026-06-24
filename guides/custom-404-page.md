---
title: Design a custom 404 page
description: Build a branded 404 page with the Unyson+ Theme Builder and a conditional rule, no template file editing.
---

# Design a custom 404 page

A custom 404 turns a dead end into a helpful page (search box, popular links, a friendly message).
With the [Theme Builder](/docs/extensions/theme-builder) you design it visually and assign it to the
404 condition, no template file editing.

## Steps

1. Install **Theme Builder** (Unyson+ → Extensions → Download), then open the **Theme Builder** menu.
2. **Body Templates → Add New**. Build your 404 layout with the page builder, a heading ("Page not
   found"), a [Site Search](/docs/shortcodes/header-footer-elements) element, a button back home, and
   whatever else helps. **Publish**.
3. **Theme Builder → Add Template**. Set its **Body** slot to your new body template; leave
   Header/Footer as *Inherit* so your normal chrome stays.
4. Set **Used On** with the conditional tag **404 page** (`is_404`). Save.

Now any missing URL renders your custom body inside your normal header and footer.

:::tip Same pattern for other special pages
The same approach builds custom **search results**, **author**, and **archive** pages, just change
the Used On condition (`is_search`, author archive, a post-type archive, …). See
[Theme Builder → conditional assignment](/docs/extensions/theme-builder/conditional-assignment).
:::

## See also

- [Theme Builder](/docs/extensions/theme-builder)
- [Build a sticky site header](./sticky-header.md)
