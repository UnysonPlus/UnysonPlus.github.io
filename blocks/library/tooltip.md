---
title: Tooltip
description: The Unyson+ Tooltip block — Text or an icon that reveals a tooltip on hover, focus or click, authored in the block editor and rendered by the tooltip element.
---

# Tooltip

Text or an icon that reveals a tooltip on hover, focus or click. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [tooltip element](/shortcodes/interactive-elements/tooltip) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/tooltip/front.png" alt="The Tooltip block — a text trigger that reveals a tip" width="187" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/tooltip/inspector.png" alt="The Tooltip block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Trigger (`trigger_type`, `trigger_text`, `trigger_icon`) | The visible text or icon that reveals the tip. |
| Tip (`tip_title`, `tip_content`) | The tooltip’s heading and rich-text body. |
| Event (`event`) | Reveal on hover, focus or click. |
| Position (`position`) + Arrow (`arrow`) + Max width (`max_width`) | Where the tip appears, its pointer, and its width. |
| Design (`design`) + Colours (`tip_bg`, `tip_color`, `accent_color`) | Light / dark preset and colours. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/tooltip {"upOptions":{"trigger_text":"a free framework","tip_content":"<p>Every UnysonPlus extension is free — there is no pro tier.</p>"}} /-->
```

## The tooltip element

The block and the page builder’s [Tooltip element](/shortcodes/interactive-elements/tooltip) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
