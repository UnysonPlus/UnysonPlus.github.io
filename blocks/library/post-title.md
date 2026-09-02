---
title: Post Title
description: The Unyson+ Post Title block — The current post's title, with a heading level and optional link, authored in the block editor and rendered server-side.
---

# Post Title

The current post’s title, with a heading level and optional link. It is a **dynamic content** block: the value comes from whichever post it sits in, so it works in a single post and in a [Theme Builder](/extensions/theme-builder) template alike. The editor preview and the front end are produced by the same server-side [dynamic content system](/extensions/theme-builder/dynamic-content) the page builder uses.

<img src="/img/blocks/post-title/front.png" alt="The Post Title block — the current post’s title as a heading" width="1210" />

## Options

| Option | What it does |
| --- | --- |
| Heading tag (`heading_tag`) | The level the title renders at — `H1`–`H6`. |
| Link to post (`link_to_post`) | Wrap the title in a link to the post. |
| Alignment (`text_align`) | Left, Center, or Right. |
| Colour (`text_color`) + Font size (`font_size_preset`) | Text colour and a preset size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/post-title {"upOptions":{"heading_tag":"h1","link_to_post":"yes"}} /-->
```

## Dynamic content

This is one of the post-field blocks that read the current post. See [Dynamic content](/extensions/theme-builder/dynamic-content) for the full set and how they resolve inside templates.
