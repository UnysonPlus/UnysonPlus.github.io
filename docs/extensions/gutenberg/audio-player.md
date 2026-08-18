---
title: Audio Player
sidebar_position: 33
---

# Audio Player

An audio player with a playlist, volume and an optional download link — for podcasts, tracks and recorded talks.

The block renders through the [`audio_player`](/docs/shortcodes/media-elements/audio-player) element — the same PHP that runs in the page builder, so the
front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `tracks` | The tracks — title, artist and the audio file |
| `design` | Player design preset |
| `autoplay` | Start playing on load |
| `loop` | Repeat at the end |
| `show_volume` | Show the volume control |
| `show_download` | Offer a download link |
| `rounded` | Corner rounding |
| `accent_color` | Controls and progress colour |
| `bg_color` | Player background |
| `text_color` | Text colour |
| `font_size_preset` | Text size preset |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[`tracks` is a repeater]
It is an [`addable-popup`](/docs/options/option-types/addable-popup): items expand in place in the
block sidebar rather than opening a modal, and store exactly the value the page builder stores.
:::

:::note[Nothing plays in the editor]
The preview is inert, and `autoplay` in particular is neutralised: a player that started by itself
would start again on every re-render — which, in a block editor, means on every keystroke in the
sidebar.
:::

:::caution[Think twice before using `autoplay`]
Browsers block unmuted autoplay, and audio that starts on its own is the reason they added the block.
The option is here because it exists and hiding it would not stop anyone — not because it is a good
default.
:::

:::note[A track needs a file]
Entries with no audio file or URL are why an otherwise-configured player shows "Add at least one
track" instead of rendering.
:::

:::note[Margin and padding come from Gutenberg]
The block declares core spacing support, so the element's own `spacing` option is not exposed here —
use the Dimensions panel at the top of the sidebar.
:::
