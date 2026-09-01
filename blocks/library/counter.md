---
title: Counter
description: The Unyson+ Counter block — An animated number that counts up when it scrolls into view — for stats, milestones and results, authored in the block editor and rendered by the counter element.
---

# Counter

An animated number that counts up when it scrolls into view — for stats, milestones and results. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [counter element](/shortcodes/interactive-elements/counter) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/counter/front.png" alt="The Counter block rendered on the front end — an animated 1,200+ figure" width="161" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/counter/inspector.png" alt="The Counter block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Number (`number`) | The target value it counts up to. |
| Start (`start`) | The value it counts from (default 0). |
| Prefix / Suffix (`prefix`, `suffix`) | Text before / after the number — e.g. `$`, `+`, `%`. |
| Decimals (`decimals`) + Separator (`separator`) | Decimal places, and whether to group thousands (1,200). |
| Duration (`duration`) + Easing (`easing`) | How long the count-up runs, and its animation curve. |
| Alignment (`alignment`) | Left, Center, or Right. |
| Number Typography (`number_font`) + Colour (`number_color`) | Font and colour for the figure. |

The block also opts into WordPress **alignment** (Wide / Full) and **Margin / Padding**, which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object (keyed by the same paths the page builder uses); the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/counter {"upOptions":{"number":"1200","suffix":"+","alignment":"center"}} /-->
```

## The counter element

The block and the page builder’s [Counter element](/shortcodes/interactive-elements/counter) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
