---
title: Tabs
description: The Unyson+ Tabs block — Tabbed panels with optional media, autoplay and deep links, authored in the block editor and rendered by the tabs element.
---

# Tabs

Tabbed panels with optional media, autoplay and deep links. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [tabs element](/shortcodes/interactive-elements/tabs) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/tabs/front.png" alt="The Tabs block — three horizontal underline tabs with the first active" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/tabs/inspector.png" alt="The Tabs block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Tabs (`tabs`) | The panels. Each has a **Title**, rich-text **Content**, and optional **Image**, **Badge**, **Icon**, plus **Active** and **Disabled** switches. |
| Design (`design`) + Orientation (`orientation`) | The tab style (underline, pills, boxed…) and horizontal or vertical. |
| Tab Width (`tab_width`) + Alignment (`alignment`) | Even / auto tab widths, and the tab-strip alignment. |
| Layout (`layout`) + Media Side (`media_side`) | Plain content panels, or content beside a per-tab image. |
| Activate On (`activate_on`) | Switch tabs on click or hover. |
| Autoplay (`autoplay`) + Interval (`autoplay_interval`) + Fade (`fade`) | Cycle tabs automatically, with a fade transition. |
| Deep Link (`deep_link`) + Remember (`remember`) | Open a tab from the URL hash, and remember the last-opened tab. |
| Mobile (`mobile`) | How the tab strip collapses on small screens. |

The block also opts into WordPress **alignment** (Wide / Full) and **Margin / Padding**, which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object (keyed by the same paths the page builder uses); the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/tabs {"upOptions":{"tabs":[{"tab_title":"Overview","tab_content":"<p>…</p>","is_active":"yes"},{"tab_title":"Features","tab_content":"<p>…</p>"},{"tab_title":"Pricing","tab_content":"<p>…</p>"}]}} /-->
```

## The tabs element

The block and the page builder’s [Tabs element](/shortcodes/interactive-elements/tabs) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
