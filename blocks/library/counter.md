---
title: Counter
sidebar_position: 3
description: The Unyson+ Counter block — an animated count-up stat with prefix/suffix, decimals, thousands separator and easing, authored in the block editor and rendered by the counter element.
---

# Counter

An animated statistic that counts up when it scrolls into view — “1,200+ sites”,
“99.9% uptime”, “$4.2M raised”. Set the target number, a prefix or suffix, and how it
animates.

Like every block in the library, it is a second *authoring* surface onto the
[counter element](/shortcodes/interactive-elements/counter): the editor preview and the
front end are the same server-rendered output.

<img src="/img/blocks/counter/front.png" alt="A Counter block showing 1,200+" width="161" />

Add it from the inserter (**+** → search *Counter* → the one under **Unyson+**), then set
the number and format in the block settings.

<img src="/img/blocks/counter/inspector.png" alt="The Counter block settings — number, prefix, suffix and format" width="300" />

## Options

### Content

| Option | What it does |
| --- | --- |
| **Number** (`number`) | The value to count up to — e.g. `45280`, `96`, `4.2`. Commas are ignored. |
| **Start From** (`start`) | The value the count begins at (default `0`). |
| **Prefix** (`prefix`) | Text before the number (e.g. `$`) — doubles as a left-hand caption. |
| **Suffix** (`suffix`) | Text after the number (e.g. `+`, `%`, `k`) — doubles as a right-hand caption. |

### Format

| Option | What it does |
| --- | --- |
| **Decimal Places** (`decimals`) | Digits after the decimal point — `0`–`3`. |
| **Thousands Separator** (`separator`) | Insert commas in large numbers (`45,280`). |
| **Duration (ms)** (`duration`) | Length of the count-up animation in milliseconds. |
| **Easing** (`easing`) | **Ease Out** (fast → slow), **Linear**, or **Ease In-Out**. |

### Style

| Option | What it does |
| --- | --- |
| **Alignment** (`alignment`) | Left / Center / Right — or **Inherit** to follow the parent. |
| **Number Font** (`number_font`) | Typography for the number. |
| **Number Color** (`number_color`) | Colour of the number. |

### WordPress block supports

- **Alignment** — Wide / Full.  •  **Dimensions** — Margin and Padding.  •  Inherits the theme’s design system from `theme.json`.

## Sample content

The demo above counts to `1,200+`, centered:

```html
<!-- wp:unysonplus/counter {"upOptions":{"number":"1200","suffix":"+","alignment":"center"}} /-->
```

A freshly inserted block stores only what you change; the element’s declared defaults
(duration, easing, separator) fill in the rest at render time.

## Relationship to the counter element

The block and the page builder’s [counter element](/shortcodes/interactive-elements/counter)
are two doors onto the same code — every option and behaviour documented there is true
here; the block simply exposes those options as a generated inspector.
