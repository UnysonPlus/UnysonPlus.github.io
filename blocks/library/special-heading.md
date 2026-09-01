---
title: Special Heading
description: The Unyson+ Special Heading block — A section heading with an overline, title and subtitle — the standard way to open a section, authored in the block editor and rendered by the special-heading element.
---

# Special Heading

A section heading with an overline, title and subtitle — the standard way to open a section. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [special-heading element](/shortcodes/content-elements/special-heading) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/special-heading/front.png" alt="The Special Heading block — an overline, title and subtitle, centred" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/special-heading/inspector.png" alt="The Special Heading block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Overline (`overline`) | A small eyebrow line above the title — with Uppercase (`overline_uppercase`), a Marker (`overline_marker`) and an Icon (`overline_icon`). |
| Title (`title`) + Heading level (`heading`) | The main heading text and its semantic level (H1–H6). |
| Subtitle (`subtitle`) | A supporting line below the title. |
| Alignment (`alignment`) | Left, Center, or Right. |
| Title / Subtitle size (`display_size`, `subtitle_size`) | Independent sizes for the two lines. |
| Element Spacing (`element_spacing`) + Max width (`block_max_width`) | Gap between the parts, and a readable max width. |
| Colours (`overline_color`, `title_color`, `subtitle_color`, `bg_color`) | Per-part colour pickers. |

The block also opts into WordPress **alignment** (Wide / Full) and **Margin / Padding**, which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object (keyed by the same paths the page builder uses); the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/special-heading {"upOptions":{"overline":"UNYSONPLUS","title":"Premium features — none of the premium price","subtitle":"A free WordPress framework with no pro tier.","alignment":"center"}} /-->
```

## The special-heading element

The block and the page builder’s [Special Heading element](/shortcodes/content-elements/special-heading) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
