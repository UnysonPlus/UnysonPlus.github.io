---
title: Star Rating
description: The Unyson+ Star Rating block — A star rating with optional score, label and review count — for reviews, testimonials and comparison tables, authored in the block editor and rendered by the star-rating element.
---

# Star Rating

A star rating with optional score, label and review count — for reviews, testimonials and comparison tables. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [star-rating element](/shortcodes/components/star-rating) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/star-rating/front.png" alt="The Star Rating block — five filled stars with a score and review count" width="139" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/star-rating/inspector.png" alt="The Star Rating block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Rating (`rating`) + Max (`max`) | The score, out of a maximum (default 5). Supports halves. |
| Label (`label`) + Count text (`count_text`) | A leading label and a trailing “based on N reviews”. |
| Show value (`show_value`) | Print the numeric score beside the stars. |
| Design (`design`) + Size (`size`) + Alignment (`align`) | The symbol style, size, and alignment. |
| Colours (`fill_color`, `empty_color`, `text_color`) | Filled / empty star and text colours. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/star-rating {"upOptions":{"rating":"5","show_value":"yes","count_text":"based on 128 reviews","align":"center"}} /-->
```

## The star-rating element

The block and the page builder’s [Star Rating element](/shortcodes/components/star-rating) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
