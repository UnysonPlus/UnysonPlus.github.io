---
title: Button
sidebar_position: 2
description: The Unyson+ Button block — a theme-styled call-to-action with presets, sizes, shapes, an optional icon and hover animation, authored in the block editor and rendered by the button element.
---

# Button

A call-to-action styled from your theme’s button presets — not a one-off you have to
re-style every time. Choose a preset, a size and a shape, add an optional icon, and it
inherits the look defined once in **Theme Settings → General → Buttons**.

Like every block in the library, it is a second *authoring* surface onto the
[button element](/shortcodes/components/button): the editor preview and the front end are
the same server-rendered output, so nothing drifts from the page builder.

<img src="/img/blocks/button/front.png" alt="A blue primary Button block reading “Get UnysonPlus — Free”" width="241" />

Add it from the inserter (**+** → search *Button* → the one under **Unyson+**), then set
the label and link in the block settings.

<img src="/img/blocks/button/inspector.png" alt="The Button block settings — label, link, style, size and shape" width="300" />

## Options

### Content

| Option | What it does |
| --- | --- |
| **Button Label** (`label`) | The text on the button. Leave empty for an icon-only button. |
| **Button Link** (`link`) | Destination — a full URL, a relative path, an `#anchor`, or `mailto:` / `tel:`. The default `#` links nowhere. |
| **Open in New Window** (`target`) | Open the link in a new tab. Recommended for external links. |
| **Button Icon** (`icon`) | An optional icon (icon font, emoji, SVG or image) shown beside the label. |
| **Icon Position** (`icon_position`) | **Before** or **After** the label. Arrows read best after; leading glyphs before. |

### Styling

| Option | What it does |
| --- | --- |
| **Button Style** (`style`) | A preset from **Theme Settings → Buttons**, including the outline variants. Each choice previews the real button. |
| **Button Size** (`size`) | A size preset from Theme Settings. |
| **Button Shape** (`shape`) | Corner rounding — keep the size’s radius, or override with **Pill**, **Rounded** or **Square**. |
| **Button Width** (`width`) | **Auto** (fits the label), **Full Width** (spans its container), or **Custom**. |
| **Alignment** (`alignment`) | Left / Center / Right within its container. |
| **State** (`state`) | Author the **normal** or **hover** appearance. |
| **Hover Animation** (`hover_animation`) | An optional motion effect on hover. |

### WordPress block supports

- **Alignment** — Wide / Full.
- **Dimensions** — Margin and Padding.
- **Global Styles** — inherits the theme’s palette and typography from `theme.json`.

## Sample content

The demo above is one primary, large, centered button. This is what the block saves —
a single `upOptions` object keyed by the same paths the page builder uses:

```html
<!-- wp:unysonplus/button {"upOptions":{"label":"Get UnysonPlus — Free","link":"#","alignment":"center","size":"lg"}} /-->
```

A freshly inserted block stores only what you change; the element’s declared defaults
(style, size, shape) fill in the rest at render time.

## Relationship to the button element

The block and the page builder’s [button element](/shortcodes/components/button) are two
doors onto the same code — every option, class and behaviour documented there is true
here; the block simply exposes those options as a generated inspector.
