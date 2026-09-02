---
title: Animated Heading
description: The Unyson+ Animated Heading block — a headline whose keyword rotates through a list with a typewriter or slide animation, authored in the block editor and rendered by the animated-heading element.
---

# Animated Heading

A headline with one word that **animates through a list** — "Build *websites* / *landing pages* / *blogs*" — using a typewriter, slide or fade effect, with an optional blinking caret. Great for a hero that needs to say several things at once. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [Animated Heading element](/shortcodes/content-elements/animated-heading) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/animated-heading/front.png" alt="The Animated Heading block — 'Build websites — fast.' with a rotating keyword" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.


| Option | What it does |
| --- | --- |
| Before / Words / After (`before_text`, `words`, `after_text`) | The static lead-in, the list of rotating words (one per line), and the static tail. |
| Tag (`tag`) + Alignment (`align`) | The wrapping element — a heading level or paragraph — and left / center / right. |
| Animation (`anim`, `speed`) | The effect — typewriter, slide, fade — and its speed. |
| Loop / Pause on hover / Randomize (`loop`, `pause_hover`, `randomize`) | Whether the list repeats, pauses on hover, and shuffles order. |
| Highlight (`highlight`, `accent_color`) | Emphasise the rotating word with an accent colour. |
| Caret (`caret_show`, `caret_style`, `caret_color`) | Show a blinking cursor after the word, and its look. |
| Colours (`text_color`) + Font size (`font_size_preset`) | Base text colour and a preset size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/animated-heading {"upOptions":{"before_text":"Build ","words":"websites\nlanding pages\nblogs","after_text":" — fast.","align":"center"}} /-->
```

## The animated-heading element

The block and the page builder's [Animated Heading element](/shortcodes/content-elements/animated-heading) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
