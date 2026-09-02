---
title: Post Terms
description: The Unyson+ Post Terms block — The current post's categories, tags or any taxonomy's terms, authored in the block editor and rendered server-side.
---

# Post Terms

The current post’s categories, tags or any taxonomy’s terms. It is a **dynamic content** block: the value comes from whichever post it sits in, so it works in a single post and in a [Theme Builder](/extensions/theme-builder) template alike. The editor preview and the front end are produced by the same server-side [dynamic content system](/extensions/theme-builder/dynamic-content) the page builder uses.

<img src="/img/blocks/post-terms/front.png" alt="The Post Terms block — the current post’s category" width="1210" />

## Options

| Option | What it does |
| --- | --- |
| Taxonomy (`taxonomy`) | Which taxonomy to list — categories, tags, or a custom one. |
| Prefix (`term_prefix`) + Separator (`term_separator`) | A lead-in and the divider between terms. |
| Link terms (`link_terms`) | Link each term to its archive. |
| Alignment (`text_align`) | Left, Center, or Right. |
| Colour (`text_color`) + Font size (`font_size_preset`) | Text colour and a preset size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/post-terms {"upOptions":{"taxonomy":"category","link_terms":"yes"}} /-->
```

## Dynamic content

This is one of the post-field blocks that read the current post. See [Dynamic content](/extensions/theme-builder/dynamic-content) for the full set and how they resolve inside templates.
