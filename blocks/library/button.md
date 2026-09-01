---
title: Button
description: The Unyson+ Button block — A link button with presets, sizes, icons and hover effects, authored in the block editor and rendered by the button element.
---

# Button

A link button with presets, sizes, icons and hover effects. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [button element](/shortcodes/components/button) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/button/front.png" alt="The Button block rendered on the front end — a large primary button" width="241" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/button/inspector.png" alt="The Button block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Label (`label`) | The button text. |
| Link (`link`) + New tab (`target`) | Where it goes, and whether it opens in a new tab. |
| Icon (`icon`) + Position (`icon_position`) | An optional icon before or after the label. |
| Style (`style`) | The preset look — primary, secondary, outline, ghost, link… |
| Size (`size`) | Small, Medium, Large or XL. |
| Shape (`shape`) | Rounded, Pill, or Square corners. |
| Width (`width`) + Alignment (`alignment`) | Auto or full-width, and left / center / right. |
| Hover Animation (`hover_animation`) | The effect on mouse-over (grow, sweep, …). |

The block also opts into WordPress **alignment** (Wide / Full) and **Margin / Padding**, which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object (keyed by the same paths the page builder uses); the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/button {"upOptions":{"label":"Get UnysonPlus — Free","link":"#","alignment":"center","size":"lg"}} /-->
```

## The button element

The block and the page builder’s [Button element](/shortcodes/components/button) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
