---
title: Flip Box
description: The Unyson+ Flip Box block — A card with two faces that flips on hover or click, authored in the block editor and rendered by the flip-box element.
---

# Flip Box

A card with two faces that flips on hover or click. Like every block in the library, it is a second *authoring* surface, not a second *renderer*: the canvas preview and the front end are both produced by the [flip-box element](/shortcodes/interactive-elements/flip-box) — the same server-side code as the page builder — so the output is identical either way.

<img src="/img/blocks/flip-box/front.png" alt="The Flip Box block — a front face with an icon, title and text" width="1210" />

## Configure it

Select the block and open the **Settings** (block) tab. The whole sidebar is generated from the element’s option schema, so it stays in step with the page builder.

<img src="/img/blocks/flip-box/inspector.png" alt="The Flip Box block settings sidebar" width="300" />

## Options

| Option | What it does |
| --- | --- |
| Front (`front_icon`, `front_title`, `front_text`) | The resting face — icon, heading and text. |
| Back (`back_icon`, `back_title`, `back_text`) | The revealed face, plus a **Button** (`button_label`, `button_url`). |
| Trigger (`trigger`) + Direction (`flip_direction`) | Flip on hover or click, and which way it turns. |
| Motion (`flip_speed`, `flip_easing`, `parallax`) | Flip speed, easing, and an optional parallax tilt. |
| Height (`height`) + Rounded (`rounded`) + Box Style (`box_style`) | Card height, corner rounding and preset. |
| Faces (`front_bg`, `front_image`, `back_bg`, `back_image`) + Colours | Per-face background, image and text colours. |

The block also opts into WordPress **Margin / Padding** (and, where it makes sense, alignment), which inherit the site’s design system from `theme.json`.

## Sample content

A block stores only what you change as one `upOptions` object; the element’s declared defaults fill in the rest at render time. The demo above is:

```html
<!-- wp:unysonplus/flip-box {"upOptions":{"front_icon":{"type":"icon-font","icon-class":"fa-solid fa-gift"},"front_title":"Free, forever","front_text":"<p>Every extension is included — no pro tier.</p>","back_title":"Download what you need","back_text":"<p>Add only the extensions a project uses.</p>","button_label":"Learn more","button_url":"#"}} /-->
```

## The flip-box element

The block and the page builder’s [Flip Box element](/shortcodes/interactive-elements/flip-box) are two doors onto the same code. Its full option, markup and behaviour reference is documented there.
