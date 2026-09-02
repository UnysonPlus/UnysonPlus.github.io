---
title: Social Icons
description: The Unyson+ Social Icons block — a row of linked social-profile icons, from Theme Settings or a manual list, authored in the block editor and rendered by the social-icons element.
---

# Social Icons

A row of **social-profile icons** — Facebook, X, Instagram, GitHub and so on — each an accessible link. Pull the list from your Theme Settings (so it matches the rest of the site) or define it right here. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Social Icons element](/shortcodes/header-footer-elements/social-icons) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/social-icons/front.png" alt="The Social Icons block — Facebook, X, Instagram and GitHub icons" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Source (`source`) | **Theme Settings** reuses the profiles configured site-wide; **Manual list** lets you define links here. |
| Profiles (`source/manual/profiles`) | Each entry is an **icon**, a **URL**, and an **accessible label** (screen-reader text like "Facebook"). |
| Size (`size`) + Style | Icon size and the button/bare style. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above uses a manual list:

```html
<!-- wp:unysonplus/social-icons {"upOptions":{"source":{"mode":"manual","manual":{"profiles":[
  {"icon":{"type":"icon-font","icon-class":"fa-brands fa-facebook"},"link":"#","label":"Facebook"},
  {"icon":{"type":"icon-font","icon-class":"fa-brands fa-x-twitter"},"link":"#","label":"X"},
  {"icon":{"type":"icon-font","icon-class":"fa-brands fa-instagram"},"link":"#","label":"Instagram"},
  {"icon":{"type":"icon-font","icon-class":"fa-brands fa-github"},"link":"#","label":"GitHub"}
]}}}} /-->
```

## The social-icons element

The block and the page builder's [Social Icons element](/shortcodes/header-footer-elements/social-icons) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
