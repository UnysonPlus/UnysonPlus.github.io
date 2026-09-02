---
title: Code Block
description: The Unyson+ Code Block block — A formatted code sample, or raw HTML rendered into the page, authored in the block editor and rendered by the code-block element.
---

# Code Block

A formatted code sample, or raw HTML rendered into the page. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [code-block element](/shortcodes/content-elements/code-block) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/code-block/front.png" alt="The Code Block block — a syntax-highlighted PHP snippet" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/code-block/inspector.png" alt="The Code Block block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Code (`code`) | The code (or HTML) to show. |
| Render as code (`render_as_code`) | On = a formatted, highlighted code block; off = the HTML is rendered live into the page. |
| Language (`code_language`) | The syntax-highlighting language. |
| Beautify (`beautify`) | Auto-format the code before display. |
| Colours (`text_color`, `bg_color`) + Font size (`font_size_preset`) | Code colours and a preset size. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/code-block {"upOptions":{"code":"add_filter( 'fw_ext_backups_locations', function ( $locations ) {\n\treturn $locations;\n} );","code_language":"php","render_as_code":"yes"}} /-->
```

## The code-block element

The block and the page builder’s [Code Block element](/shortcodes/content-elements/code-block) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
