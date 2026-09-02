---
title: Table of Contents
description: The Unyson+ Table of Contents block — an auto-built, linked outline of a page's headings with scroll-spy, authored in the block editor and rendered by the toc element.
---

# Table of Contents

An **auto-built table of contents** — it scans the page's headings and lists them as smooth-scrolling links, with an optional scroll-spy that highlights the section you're reading. Drop it at the top of a long article or in a sticky sidebar. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Table of Contents element](/shortcodes/content-elements/toc) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/toc/front.png" alt="The Table of Contents block — a linked outline of page headings" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Scope (`scope`, `scope_selector`, `min_headings`) | Which headings to include — the whole page or a container — and a minimum count before the TOC shows. |
| Levels (`levels`, `hierarchical`) | Which heading levels to list, and whether to nest them. |
| Numbering (`numeration`, `bullets`, `decimal`, `roman`, `upper_alpha`) | Numbered, lettered or bulleted items. |
| Behavior (`collapsible`, `collapsed_default`, `sticky`, `scrollspy`, `smooth_scroll`, `scroll_offset`) | Collapse, stick while scrolling, highlight the active section, and scroll smoothly. |
| Header (`label_show`, `label_hide`) | The "Contents" title and show/hide toggle labels. |
| Colours + Typography (`link_color`, `link_active_color`, `bg_color`, `title_color`, `items_size`) | The palette and type scale. |
| SEO (`noindex`, `nofollow`) | Keep the on-page anchors out of search where you need to. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::tip[💡 Web dev tip: a table of contents is built from your headings]
A good TOC is only as good as your heading structure. Use one `<h1>` per page, then nest `<h2>`/`<h3>` in order without skipping levels — the TOC (and screen-reader users navigating by heading) rely on that hierarchy. [MDN: heading elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) · [Web Dev Basics: Semantic HTML](/learn/semantic-html)
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above lists the page's headings with the defaults:

```html
<!-- wp:unysonplus/toc {"upOptions":{}} /-->
```

## The table-of-contents element

The block and the page builder's [Table of Contents element](/shortcodes/content-elements/toc) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
