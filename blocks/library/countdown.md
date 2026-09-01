---
title: Countdown
description: The Unyson+ Countdown block — A countdown to a date and time, with per-unit labels and a completed state, authored in the block editor and rendered by the countdown element.
---

# Countdown

A countdown to a date and time, with per-unit labels and a completed state. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [countdown element](/shortcodes/interactive-elements/countdown) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/countdown/front.png" alt="The Countdown block — days, hours, minutes and seconds counting down" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/countdown/inspector.png" alt="The Countdown block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Target (`target`) | The date and time it counts down to. |
| Units (`show_days`, `show_hours`, `show_minutes`, `show_seconds`) | Which units to display. |
| Unit labels (`label_days` … `label_seconds`) | The wording under each number. |
| On complete (`on_complete`) + Completed text (`complete_text`) | What happens at zero — hide the timer, or show a message. |
| Alignment (`alignment`) | Left, Center, or Right. |
| Box preset (`box_preset`) | An optional card around each unit. |
| Typography + colours (`number_font`, `label_font`, `number_color`, `label_color`) | Fonts and colours for the digits and labels. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/countdown {"upOptions":{"target":"2026-12-31 23:59:59","alignment":"center"}} /-->
```

## The countdown element

The block and the page builder’s [Countdown element](/shortcodes/interactive-elements/countdown) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
