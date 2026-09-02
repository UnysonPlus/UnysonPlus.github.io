---
title: Site Logo
description: The Unyson+ Site Logo block — the site's logo or name, linked home, authored in the block editor and rendered by the site-logo element.
---

# Site Logo

The site's **logo** (or, with no logo image set, its name) — linked back to the home page, with control over height and alignment. It reads from your WordPress **Site Identity** by default, so one change in the Customizer updates it everywhere. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Site Logo element](/shortcodes/header-footer-elements/site-logo) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/site-logo/front.png" alt="The Site Logo block — the site name linked home" width="286" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Source (`source`) | **Site Identity** uses the logo/name from the Customizer; **Custom** lets you set an image here. |
| Custom image (`custom_image`) | The logo image when the source is Custom. |
| Link to home (`link_home`) | Wrap the logo in a link to the home page. |
| Max height (`max_height`) | Cap the logo height. |
| Alignment (`alignment`) | Left, center or right. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above uses the defaults (Site Identity):

```html
<!-- wp:unysonplus/site-logo {"upOptions":{}} /-->
```

## The site-logo element

The block and the page builder's [Site Logo element](/shortcodes/header-footer-elements/site-logo) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
