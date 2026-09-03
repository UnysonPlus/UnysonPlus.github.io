---
title: Scroll Indicator
description: The Unyson+ Scroll Indicator block — an animated "scroll down" cue with a label and chevron that invites visitors to keep scrolling, authored in the block editor and rendered by the page builder.
---

# Scroll Indicator

An animated **"scroll down" cue** — a short label and a bouncing chevron that invites visitors to keep going, usually at the bottom of a hero. Click it to smooth-scroll to the next section. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are produced by the same server-side code as the page builder, so the output is identical either way.

<img src="/img/blocks/scroll-indicator/front.png" alt="The Scroll Indicator block — a Scroll to descend label above an animated chevron" width="1210" />

## Options

Select the block and open the **Settings** (block) tab; the whole sidebar is generated from the element's option schema, so it stays in step with the page builder.

| Option | What it does |
| --- | --- |
| Text (`text`, `title`) | The label above the icon (e.g. "Scroll to descend"). |
| Icon (`icon`, `icon_color`, `icon_size`) | The cue glyph — a chevron by default. |
| Layout (`layout`, `stacked`, `inline`) | Stack the label above the icon, or place them inline. |
| Animation (`animation`, `bounce`, `pulse`, `nudge`) | The motion that draws the eye. |
| Target (`target`) | The section to smooth-scroll to when clicked. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site's design system from `theme.json`.

:::tip[💡 Web dev tip: motion should respect user preferences]
Some people set "reduce motion" at the OS level because animation makes them dizzy. Wrap non-essential motion in a `@media (prefers-reduced-motion: reduce)` query and dial it down — the browser exposes that preference so you can honour it. A gentle cue is helpful; a relentless bounce for someone who asked for calm is not. [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) · [Web Dev Basics: Accessibility](/learn/accessibility)
:::

## Sample content

A block stores only what you change as one `upOptions` object; the element's declared defaults fill in the rest at render time. The demo above uses the defaults:

```html
<!-- wp:unysonplus/scroll-indicator {"upOptions":{}} /-->
```
