---
title: Post Date
description: The Unyson+ Post Date block — The current post's published or modified date, authored in the block editor and rendered server-side.
---

# Post Date

The current post’s published or modified date. It is a **dynamic content** block: the value comes from whichever post it sits in, so it works in a single post and in a [Theme Builder](/extensions/theme-builder) template alike. The editor preview and the front end are produced by the same server-side [dynamic content system](/extensions/theme-builder/dynamic-content) the page builder uses.

<img src="/img/blocks/post-date/front.png" alt="The Post Date block — the current post’s date" width="1210" />

## Options

| Option | What it does |
| --- | --- |
| Date type (`date_type`) | Show the **published** or the **modified** date. |
| Format (`date_format`) | The date format (defaults to the site setting). |
| Link to post (`link_to_post`) | Link the date to the post. |
| Alignment (`text_align`) | Left, Center, or Right. |
| Colour (`text_color`) + Font size (`font_size_preset`) | Text colour and a preset size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/post-date {"upOptions":{"date_type":"published"}} /-->
```

## Dynamic content

This is one of the post-field blocks that read the current post. See [Dynamic content](/extensions/theme-builder/dynamic-content) for the full set and how they resolve inside templates.
