---
title: Site Search
description: The Unyson+ Site Search block — a WordPress search form styled to the site, authored in the block editor and rendered by the site-search element.
---

# Site Search

A **search form** wired to WordPress's built-in search, styled to match the site — as an inline field or an icon that expands. Most useful in a header or footer, but it works anywhere. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Site Search element](/shortcodes/header-footer-elements/site-search) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/site-search/front.png" alt="The Site Search block — an inline search field" width="273" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Style (`style`) | Inline field, or an icon that expands into a field. |
| Placeholder (`placeholder`) | The prompt text shown in the empty field. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/site-search {"upOptions":{"placeholder":"Search the docs…"}} /-->
```

## The site-search element

The block and the page builder's [Site Search element](/shortcodes/header-footer-elements/site-search) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
