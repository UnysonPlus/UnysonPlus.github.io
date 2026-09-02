---
title: Text Block
description: The Unyson+ Text Block — a rich paragraph of body copy with drop cap, lead style, multi-column and colour controls, authored in the block editor and rendered by the text-block element.
---

# Text Block

A rich block of body copy — a paragraph or several — with typographic controls the core Paragraph block doesn't have: a **drop cap**, a **lead** style, multiple **columns**, measured line length, and design-system colours. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Text Block element](/shortcodes/content-elements/text-block) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/text-block/front.png" alt="The Text Block — a paragraph with a drop cap and lead styling" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.


| Option | What it does |
| --- | --- |
| Text (`text`) | The body copy — a rich-text field, so links, bold and italics are allowed. |
| Alignment (`text_align`) + Max width (`max_width`) | Left / center / right / justify, and an optional measure so long lines stay readable. |
| Columns (`columns`) + Balance (`balance`) | Flow the text into 1–4 newspaper-style columns, optionally balanced to even heights. |
| Line height (`line_height`) + Paragraph spacing (`para_spacing`) | Vertical rhythm — space within and between paragraphs. |
| Lead (`lead`) | Render the copy at a larger "intro paragraph" size. |
| Drop cap (`dropcap`) | Enlarge the first letter as a decorative drop cap. |
| Link underline (`link_underline`) | Whether links inside the text are underlined. |
| Colours (`text_color`, `link_color`, `bg_color`) + Font size (`font_size_preset`) | Text, link and background colours, and a preset size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/text-block {"upOptions":{"text":"<p>UnysonPlus is a free WordPress framework — a drag-and-drop page builder, block-editor support and 100+ content elements, with no pro tier.</p>","dropcap":"yes","lead":"yes"}} /-->
```

## The text-block element

The block and the page builder's [Text Block element](/shortcodes/content-elements/text-block) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
