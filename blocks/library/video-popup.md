---
title: Video Popup
---

# Video Popup

A poster image with a play button that opens the video in a lightbox — YouTube, Vimeo or a self-hosted file. Core has no equivalent block.

The block renders through the [`video_popup`](/shortcodes/media-elements/video-popup) element — the same PHP that runs in the page builder, so
the front end is identical either way.

## What the sidebar exposes

| Option | What it does |
| --- | --- |
| `poster` | The still image shown before play |
| `video_url` | YouTube, Vimeo or direct file URL |
| `play_label` | Optional text beside the play button |
| `caption` | Accessible label for the play control |
| `design` | Play button / overlay design preset |
| `ratio` | Aspect ratio of the poster area |
| `play_size` | Play button size |
| `rounded` | Corner rounding |
| `overlay` | Darkening overlay over the poster |
| `hover_zoom` | Zoom the poster slightly on hover |
| `accent_color` | Play button accent |
| `icon_color` | Play icon colour |
| `overlay_color` | Overlay colour |
| `label_color` | Label text colour |

Anything not listed stays available in the page builder, and **round-trips untouched** — the block
only writes the values you change, so an element styled in the builder keeps every setting this
sidebar does not show.

:::note[Before it is configured]
With neither a poster nor a video URL set, the preview shows the element's own prompt —
*"Add a poster image and a video URL."* That message comes from the shortcode itself, so there is
only one empty state to keep correct rather than a separate one in the editor.
:::

:::note[The preview is inert]
Clicking in the canvas selects the block rather than opening the lightbox. The video plays on the
front end.
:::
