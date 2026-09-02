---
title: Text Expander
description: The Unyson+ Text Expander block — Show a short excerpt with a Read more toggle that reveals the rest — for long copy, FAQs and disclosures, authored in the block editor and rendered by the text-expander element.
---

# Text Expander

Show a short excerpt with a Read more toggle that reveals the rest — for long copy, FAQs and disclosures. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [text-expander element](/shortcodes/content-elements/text-expander) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/text-expander/front.png" alt="The Text Expander block — an excerpt with a Read more button" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/text-expander/inspector.png" alt="The Text Expander block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Visible content (`visible_content`) | The excerpt shown up front. |
| Hidden content (`hidden_content`) | The rest, revealed on toggle. |
| Buttons (`btn_show`, `btn_hide`) + Icon (`toggle_icon`) | The show / hide labels and an optional caret. |
| Button position (`show_btn_position`, `hide_btn_position`) | Where each button sits. |
| Merge (`merge_boundary`) + Ellipsis (`show_ellipsis`) | Flow the hidden text inline after the excerpt, with a trailing “…”. |
| Click anywhere (`click_anywhere`) + Initially open (`initially_open`) | Toggle by clicking the text, and start expanded. |
| Colours (`visible_color`, `hidden_color`, `btn_color`) | Per-part colour pickers. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/text-expander {"upOptions":{"visible_content":"<p>UnysonPlus is a free WordPress framework…</p>","hidden_content":"<p>Every extension is free — no pro tier…</p>","btn_show":"Read more","btn_hide":"Read less"}} /-->
```

## The text-expander element

The block and the page builder’s [Text Expander element](/shortcodes/content-elements/text-expander) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
