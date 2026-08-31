---
title: Background Patterns
sidebar_position: 7
slug: /components/background-patterns
description: The Unyson+ Background Patterns library — reusable CSS/HTML patterns that become a .pattern-{id} decorative layer, with live iframe previews.
---

# Background Patterns

**Theme Settings → Components → Background Patterns** is a library of reusable **CSS/HTML background
patterns**. Each becomes a `.pattern-{id}` you draw as a decorative layer behind a **Section**,
**Container**, or the **site background**. (JavaScript-driven backgrounds aren't supported here — those
are the Animation Engine's job; this library is CSS + HTML only.)


![Theme Settings → Components → Background Patterns](/img/theme/components/background-patterns.png)

## How it's coded

An [`addable-box`](/options/option-types/addable-box) stored under **`background_patterns`**
(`components-patterns.php`). Each preset is `{ id, pattern_name, root_class, html, css }` — the user
pastes the HTML + CSS. The collapsed row renders a **live, isolated `<iframe srcdoc>` thumbnail** so
the pattern's CSS can't leak into wp-admin. Defaults come from `unysonplus_default_pattern_presets()`
(12 pure-CSS starters).

## The output

Each preset's CSS targets its own `.{root_class}` (`.pat-{id}`), producing a `.pattern-{id}` decorative
layer. On the front end the plugin renders that layer behind the section content (and
`unysonplus_render_site_background_pattern()` draws the chosen site-wide pattern in `wp_footer`). The
pattern CSS rides in the shared cached stylesheet — see the
[shared pipeline](./index.md#how-the-whole-system-works-shared-pipeline).

## How it's picked

Via a **popover preview picker** — a `multi-picker` (`popover: true`) whose `image-picker` choices come
from `unysonplus_pattern_imagepicker_choices()`. The Section/Container store `{ pattern: '<id>' }`. See
the full recipe in [Preset preview pickers](/options/option-types/popover/preset-preview-pickers).

## Related

- [Preset preview pickers](/options/option-types/popover/preset-preview-pickers) — how the picker is built.
- [Components overview](./index.md) — the shared pipeline.
