---
title: Avatar
sidebar_position: 38
---

# Avatar

A user avatar — an uploaded photo, a WordPress user's, initials or an icon — with an optional status dot and label.

The block renders through the [`avatar`](/shortcodes/components/avatar) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `mode_settings` | What the avatar is, and the fields that choice needs |
| `design` | Design preset |
| `shape` | Circle, rounded or square |
| `size` | Avatar size |
| `show_status` | Show a status dot |
| `show_label` | Show the name beside it |
| `initials_color_mode` | How initials colours are chosen |
| `ring_color` | Ring around the avatar |
| `initials_bg` | Initials background |
| `initials_color` | Initials colour |
| `label_color` | Label colour |
| `counter_bg` | Counter badge background |
| `counter_color` | Counter badge text |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`mode_settings` is a picker that reveals its own options]
It is a [`multi-picker`](/options/option-types/multi-picker): choosing an option reveals the
fields belonging to that choice, and **only the chosen branch is saved**.
:::

:::note[The colour options apply to some modes, not all]
`initials_bg` and `initials_color` do nothing for a photo avatar, and `ring_color` applies to every
mode. They sit after the picker rather than inside it because they are shared across several of its
branches — which is also why setting one may appear to do nothing until the mode changes.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
