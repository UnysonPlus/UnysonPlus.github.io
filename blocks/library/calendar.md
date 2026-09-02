---
title: Calendar
description: The Unyson+ Calendar block — A month calendar with events, and an optional upcoming list, authored in the block editor and rendered server-side.
---

# Calendar

A month calendar with events, and an optional upcoming list. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [calendar element](/shortcodes/content-elements/calendar) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/calendar/front.png" alt="The Calendar block — a month grid with navigation" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/calendar/inspector.png" alt="The Calendar block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Events (`events`) | Dated entries to mark on the calendar, each with a title and link. |
| Design (`design`) + Start of week (`start_week`) | The calendar style, and whether weeks start on Sunday or Monday. |
| Upcoming list (`show_list`, `list_limit`) | Show a list of the next events under the grid, capped to a count. |
| Colours (`accent_color`, `text_color`) + Font size (`font_size_preset`) | Accent and text colours, and a preset size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/calendar {"upOptions":{}} /-->
```

## The calendar element

The block and the page builder’s [Calendar element](/shortcodes/content-elements/calendar) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
